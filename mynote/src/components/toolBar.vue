<script setup>
import { ref, reactive, onMounted, watch, computed } from 'vue';
import { noteStore } from '../store/noteStore'
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/userStore.js'

const state = reactive({
  isLoggedIn: false,
  keyword: ''
});

const noteStore0 = noteStore()
const router = useRouter();
const keyword = ref("")
const userStore = useUserStore()

// 在组件初次掛載時，檢查瀏覽器的 localStorage 中是否有用戶登入的資訊
onMounted(() => {
  // 若有登入isLoggedIn則為true, 未登入則為false
  state.isLoggedIn = !!localStorage.getItem('user');
});

// 使用 computed 來管理登入狀態
const isLoggedIn = computed(() => userStore.isLoggedIn);

// 處理登出狀態
const handleLogout = async () => {
  const confirmed = window.confirm("確定要登出?");
  if (confirmed) {
    try {
      // 執行登出的操作
      await userStore.logout();
      localStorage.removeItem('user');
      state.isLoggedIn = false;

      // 重新返回登入頁面
      router.push('/login').then(() => {
        window.location.reload(); // 刷新頁面
      });
    } catch (error) {
      console.error('登出失敗:', error);
    }
  } else {
    console.log('用戶取消登出');
  }
};

// 搜尋功能
const searchNotes = async () => {
  const results = await noteStore0.searchNotes(keyword.value);
  console.log(results)
  router.push({ name: 'search', params: { searchResults: results } });
}
// 清除Placeholder預設文字
const clearPlaceholder = () =>{
    document.querySelector('#keyword')
}
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light space-grotesk">
    <!-- 左側logo和名稱 -->
    <div class="container-fluid d-flex justify-content-between align-items-center">
      <router-link :to="{ name: 'grid' }" class="navbar-brand d-flex align-items-center">
        <img class="logo" src="/note_logo.png" alt="Logo">
        <span class="navbar-title">MyTodoList</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 右側搜尋欄和按鈕 -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a href="#" class="nav-link py-3 px-4" @click.prevent="isLoggedIn ? handleLogout() : () => { }">
              {{ isLoggedIn ? '登出' : '登入' }}
            </a>
          </li>
        </ul>
        <form class="d-flex me-3" @submit.prevent="searchNotes">
          <input class="form-control me-2" v-model="keyword" type="search" placeholder="搜尋" aria-label="Search">
          <button class="btn btn-outline-success" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
        <div class="d-flex align-items-center">
          <router-link :to="{ name: 'signup' }">
            <button type="button" class="btn btn-success me-2">註冊</button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  padding: 0.5rem 1rem;
  background-color: #f8f9fa;
}

.logo {
  width: 40px;
  margin-right: 10px;
}

.navbar-title {
  font-size: 1.5rem;
  color: rgb(94, 94, 94);
}

.form-control {
  font-size: 1rem;
  color: rgb(94, 94, 94);
}

.btn {
  font-size: 0.875rem;
}

/* 在小屏幕下調整按鈕和表單控件的大小 */
@media (max-width: 768px) {
  .form-control {
    width: 100%;
    margin-bottom: 0.5rem;
  }

  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

/* 在大屏幕上維持較大的字體和間距 */
@media (min-width: 769px) {
  .form-control {
    width: auto;
  }

  .btn {
    width: auto;
  }
}
</style>

