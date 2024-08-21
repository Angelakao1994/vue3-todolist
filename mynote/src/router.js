import { createRouter, createWebHistory } from 'vue-router'
import NoteGrid from './components/noteGrid.vue'
import AddNote from './components/addNote.vue'
import EditNote from './components/editNote.vue'
import SearchNote from './components/searchNote.vue';
import Login from './components/login.vue'
import Signup from './components/signup.vue'

// 連結到不同頁面
const routes = [
  {
    path: "/",
    name: "grid",
    component: NoteGrid,
    meta: { requiresAuth: true },
  },
  // 新增
  {
    path: "/add",
    name: "add",
    component: AddNote,
    meta: { requiresAuth: true },
  },
  // 編輯
  {
    path: "/edit/:id",
    name: "edit",
    props: true,
    component: EditNote,
    meta: { requiresAuth: true },
  },
  // 查詢
  {
    path: "/search",
    name: "search",
    props: true,
    component: SearchNote,
    meta: { requiresAuth: true },
  },
  { path: "/login", name: "login", props: true, component: Login },
  { path: "/signup", name: "signup", props: true, component: Signup },
];
const router = createRouter({
  routes,
  history: createWebHistory()
})

// 處理登入及未登入能看到的頁面
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem("user");
  console.log(`跳轉至 ${to.path}頁面, 現在是否登入: ${isLoggedIn}`);

  if (to.meta.requiresAuth && !isLoggedIn) {
    // 如果路由需要驗證且用戶未登入，重定向到登入頁面
    next("/login");
  } else if (to.path === "/login" && isLoggedIn) {
    // 如果用戶已登入且嘗試訪問登入頁面，重定向到主頁
    next("/");
  } else {
    next(); // 繼續導航
  }
});

export default router