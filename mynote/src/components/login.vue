<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore.js'
import { noteStore } from '../store/noteStore.js'

const userStore = useUserStore()
const noteStore1 = noteStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errors = ref({})

// 密碼驗證規則來自 userStore.js
const isPassword = userStore.isPassword;

const login = async (e) => {
    event.preventDefault() // 取消預設表單提交
    // 表單驗證
    errors.value = {}
    let valid = true

    // 使用正則表達式驗證規則進行驗證(email/password)
    if (!email.value) {
        errors.value.email = '請輸入電子郵件'
        valid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.value.email = '電子郵件格式不正確'
        valid = false
    }

    if (!password.value) {
        errors.value.password = '請輸入密碼'
        valid = false
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(password.value)) {
        errors.value.password = '密碼需要包含大小寫英文字母'
        valid = false
    }

    if (valid){
        // 使用 userStore.login() 方法來處理登入(userStore.js)
        userStore.email = email.value
        userStore.password = password.value

        // 使用 userStore.login() 方法來處理登入(userStore.js)
        const loginSuccessful = await userStore.login()

        if (loginSuccessful) {
            // 登入成功, 更新noteList及跳至會員主頁面
            alert("歡迎登入")
            // 儲存登入狀態到localstorage
            localStorage.setItem('登入', 'true') 
            router.push('/')
        } else {
            // 登入失敗，跳至註冊頁面
            alert("用戶不存在，請先註冊")
            router.push({ name: 'signup' })
        }
    } else {
        alert("請確實填寫資料後提交");
    }
    
}

</script>


<template>
    <v-form id="form" ref="form" v-slot="{ errors }" @submit="login">
        <h1 class="mb-4">登入頁面</h1>
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
            登入
        </button>
    </v-form>
</template>


<style scoped>
.invalid-feedback {
    color: red;
}
</style>