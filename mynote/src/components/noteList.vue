<script setup>
import { ref, onMounted, watch } from 'vue'
import { noteStore } from '../store/noteStore'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore'

const router = useRouter()
const userStore = useUserStore()
const emit = defineEmits(['selectNote'])
const todoStore = noteStore()
const { pinnedNotes } = storeToRefs(todoStore)
const { markedPin, deleteNote, selectedNote } = todoStore

const isLoggedIn = ref(false)
let selectedNoteId = null

// 在組件初次掛載時檢查用戶是否已登入?
onMounted(() => {
  userStore.login()
  if (!userStore.isLoggedIn) {
    router.push({ name: 'login' })
  }
})

// 監視登入狀態的變化
watch(() => userStore.isLoggedIn, (newVal) => {
  if (!newVal) {
    router.push({ name: 'login' })
  }
})

const selectNote = (note) => {
  emit('selectNote', 'note');
};

const showDeleteModal = (note) => {
  selectedNoteId = note.id
  const modal = new bootstrap.Modal(document.getElementById('deleteModal'))
  modal.show()
}

const confirmDelete = () => {
  if (selectedNoteId != null) {
    todoStore.deleteNote(selectedNoteId)
  } else {
    modal.innerHTML("找不到此筆資料!")
  }
  const modal = document.getElementById('deleteModal')
  modal.classList.remove('show');
  document.querySelector('.modal-backdrop').classList.remove('show');
  router.push({ name: "grid" });
}



</script>

<template>
  <div v-if="userStore.isLoggedIn" class="container space-grotesk">
    <div class="d-flex justify-content-center align-items-center mb-3">
      <!-- 新增按鈕連結到addNote -->
      <div class="add-btn">
        <router-link to="add">
          <button class="btn d-flex align-items-center">
            <h4>
              <i class="fa-solid fa-notes-medical"></i>
              <span>新增代辦事項</span>
            </h4>
          </button>
        </router-link>
      </div>
    </div>
    <!-- 手風琴 -->
    <div class="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
            <i class="fa-solid fa-star"></i> 重要事項
          </button>
        </h2>
        <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
          data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div v-for="pinned in pinnedNotes" class="list-group-item d-flex justify-content-between align-items-center"
              @click="selectNote(pinned)">
              <span>{{ pinned.title }}</span>
              <div class="icon-list">
                <i class="fa-solid fa-thumbtack" @click.stop="markedPin(pinned.id)"></i>
                <i class="fa-solid fa-trash-can" @click.stop="showDeleteModal(pinned)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header" id="headingTwo">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            <i class="fa-solid fa-layer-group"></i> 所有事項
          </button>
        </h2>
        <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo"
          data-bs-parent="#accordionExample">
          <div class="accordion-body">
            <div v-for="note in todoStore.notes"
              class="note-item d-flex justify-content-between align-items-center list-group-item">
              <span>{{ note.title }}</span>
              <div class="icon-list">
                <i class="fa-solid fa-thumbtack" @click="markedPin(note.id)"></i>
                <i class="fa-solid fa-trash-can" @click="showDeleteModal(note)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 手風琴 -->
  </div>
  <div v-else class="container space-grotesk">
    <h5>請先登入才能看到側邊內容</h5>
  </div>
  <!-- 刪除視窗modal -->
  <div class="modal fade" tabindex="-1" id="deleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">刪除資料</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>確定刪除此筆資料?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="confirmDelete">確定</button>
        </div>
      </div>
    </div>
  </div>
  <!-- 刪除視窗modal -->
</template>

<style scoped>
.fa-notes-medical {
  color: rgb(88, 133, 201);
}

.btn,
.add-btn .btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.add-btn h4 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-btn i {
  font-size: 24px;
  margin-bottom: 5px;
  transition: all 0.3s;
}

.add-btn span {
  margin-top: 5px;
}

/* 添加 hover 效果 */
.add-btn .btn:hover {
  transform: scale(1.1);
}

.add-btn span:hover {
  color: #18cc01;
}

/* 手風琴按鈕的樣式 */
.accordion-button {
  color: rgb(94, 94, 94);
}

.accordion-button:not(.collapsed) {
  background-color: #e0e0e0;
}

/* 移除手風琴按鈕的聚焦外框 */
.accordion-button:focus {
  box-shadow: none;
  outline: none;
}

.note-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-group-item {
  color: rgb(94, 94, 94);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.7rem;
}

.icon-list {
  display: flex;
  gap: 0.2rem;
}


.fa-star {
  color: #ffd103;
}

.fa-layer-group {
  color: #18cc01;
}

.fa-thumbtack,
.fa-trash-can {
  cursor: pointer;
  margin-left: 15px;
  padding-left: 5px;
  font-size: 18px;
}

.fa-thumbtack:hover,
.fa-trash-can:hover {
  color: rgb(247, 0, 255);
  transition: all 0.3s;
  font-size: 20px;
}
</style>