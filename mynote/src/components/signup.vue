<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore.js'

const userStore = useUserStore()
const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

const isPassword = userStore.isPassword;

const signup = async () => {
    // 使用 isPassword 方法驗證密碼(userStore.js)
    const passwordError = isPassword(password.value);
    if (passwordError !== true) {
        alert(passwordError); // 顯示密碼錯誤信息
        return;
    }

    // 設定用戶資料
    userStore.name = name.value
    userStore.email = email.value
    userStore.password = password.value

    try {
        // 呼叫 signup 進行註冊(userStore.js)
        await userStore.signup()

        // 成功註冊後，跳至主頁
        router.push('/')
    } catch (error) {
        console.error(error);
        alert("註冊失敗");
    }
}

</script>


<template>
    <v-form id="form" ref="form" v-slot="{ errors }" @submit="signup">
        <h1 class="mb-4">註冊頁面</h1>
        <div class="mb-3">
            <v-field type="text" name="會員名稱" placeholder="請輸入會員名稱" class="px-3 pe-4 py-2 form-control" rules="required"
                v-model="name" :class="{ 'is-invalid': errors['會員名稱'] }"></v-field>
            <error-message name="會員名稱" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-3">
            <v-field type="text" name="email" placeholder="請輸入電子郵件" class="px-3 pe-4 py-2 form-control"
                rules="required|email" v-model="email" :class="{ 'is-invalid': errors.email }"></v-field>
            <error-message name="email" class="invalid-feedback"></error-message>
        </div>
        <div class="mb-4">
            <v-field type="password" name="密碼" placeholder="請輸入密碼" class="px-3 pe-4 py-2 form-control"
                :rules="isPassword" v-model="password" :class="{ 'is-invalid': errors.密碼 }"></v-field>
            <error-message name="密碼" class="invalid-feedback"></error-message>
        </div>
        <button class="btn btn-lg btn-primary w-75" type="submit">
            註冊
        </button>
    </v-form>
</template>

<style scoped></style>