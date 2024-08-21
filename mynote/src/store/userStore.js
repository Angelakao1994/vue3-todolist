import { defineStore } from "pinia";
import axios from "axios";

const apiUrl = "http://localhost:3000";
export const useUserStore = defineStore("users", {
  state: () => ({
    name: "",
    email: "",
    password: "",
    isLoggedIn: false,
  }),
  actions: {
    // 註冊
    async signup() {
      try {
        const { data: users } = await axios.get(`${apiUrl}/user`);
        const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
        const newId = maxId + 1;

        await axios.post(`${apiUrl}/user`, {
          id: newId,
          name: this.name,
          email: this.email,
          password: this.password,
        });

        alert("註冊成功");
      } catch (error) {
        console.log(error);
        alert("註冊失敗");
      }
    },
    // 登入
    async login() {
      try {
        const userExists = await this.checkUserExists(this.email);
        if (!userExists) return false;

        const { data: users } = await axios.get(`${apiUrl}/user`);
        const user = users.find(
          (user) => user.email === this.email && user.password === this.password
        );

        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.name = user.name;
          this.email = user.email;
          this.password = ""; // 清除密碼
          this.isLoggedIn = true; // 更新 isLoggedIn 狀態
          return true;
        }
        return false;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    // 登出
    async logout() {
      try {
        // 登出後, 依照localstorage裡的key做清除
        localStorage.removeItem("user");
        localStorage.removeItem("登入");
        this.name = "";
        this.email = "";
        this.password = "";
        this.isLoggedIn = false; // 更新 isLoggedIn 狀態
        // 觸發事件，告知其他組件狀態已更新
        const event = new Event("user-logout");
        window.dispatchEvent(event);
      } catch (error) {
        console.log(error);
      }
    },
    // 檢查用戶是否存在
    async checkUserExists(email) {
      try {
        const { data: users } = await axios.get(`${apiUrl}/user`);
        console.log("Fetched users:", users);
        console.log("Type of users:", Array.isArray(users));
        return users.some((user) => user.email === email);
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    // 自訂驗證規則-密碼需含大小寫英文字母
    isPassword(value) {
      // 檢查密碼長度是否至少六位數
      const lengthCheck = /^.{6,}$/;
      // 檢查密碼是否包含大小寫字母
      const passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])/;

      if (!lengthCheck.test(value)) {
        return "密碼至少需要六位數";
      }
      if (!passwordCheck.test(value)) {
        return "密碼需要包含大小寫英文字母";
      }
      return true;
    },

    // 表單送出按鈕
    async submitOrder() {
      // 檢查所有字段是否正確填寫
      if (this.name && this.email && this.password) {
        // 驗證密碼
        const passwordError = this.isPassword(this.password);
        if (passwordError !== true) {
          alert(passwordError);
          return;
        }
        try {
          // 提交表單
          const res = await axios.post(`${apiUrl}/user`, {
            name: this.name,
            email: this.email,
            password: this.password,
          });
          console.log(res);
          alert("註冊成功");
          // 網路請求成功後則清空表單欄位
          this.name = "";
          this.email = "";
          this.password = "";
        } catch (error) {
          console.log(error);
          alert("註冊失敗");
        }
      } else {
        alert("請確實填寫資料後提交");
      }
    },
  },
});
