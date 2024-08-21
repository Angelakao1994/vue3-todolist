import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import axios from "axios";
import VueAxios from "vue-axios";
// 引入 Vee Validate 元件跟功能
import {Form, Field, ErrorMessage, defineRule, configure} from 'vee-validate'
// 引入 Vee Validate 全部所有驗證規則
import * as AllRules from '@vee-validate/rules'
// 引入 Vee Validate 多國語系功能
import { localize, setLocale } from '@vee-validate/i18n'
// 引入 Vee Validate 繁體中文語系檔
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// Vee Validate 表單驗證語法開始
// 定義規則（加入全部規則）
Object.keys(AllRules).forEach(rule => {
    if (rule !== "default" && typeof AllRules[rule] === "function") {
      // 使用AllRules[rule]註冊每個規則
      defineRule(rule, AllRules[rule]);
    }
})
// 加入 Vee Validate 繁體中文語系檔
configure({
    generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
    validateOnInput: true // 欄位輸入內容時，會立即進行驗證）
})

// 設定預設語系
setLocale('zh_TW')


createApp(App)
  .use(createPinia())
  .use(router)
  .use(VueAxios, axios)
  .component("VForm", Form)
  .component("VField", Field)
  .component("ErrorMessage", ErrorMessage)
  .mount("#app");
