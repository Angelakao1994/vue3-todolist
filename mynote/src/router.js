import { createRouter, createWebHistory } from 'vue-router'
import NoteGrid from './components/noteGrid.vue'
import AddNote from './components/addNote.vue'
import EditNote from './components/editNote.vue'
import SearchNote from './components/searchNote.vue';
import Calendar from './components/calendar.vue';
// 連結到不同頁面
const routes = [
  { path: "/", name: "grid", component: NoteGrid },
  { path: "/add", name: "add", component: AddNote },
  { path: "/edit/:id", name: "edit", props: true, component: EditNote },
  { path: "/search", name: "search", props: true, component: SearchNote },
  { path: "/calendar", name: "calendar", props: true, component: Calendar },
];
const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router