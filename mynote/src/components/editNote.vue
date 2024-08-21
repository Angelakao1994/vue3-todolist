<script setup>
import { ref, computed } from 'vue'
import { noteStore } from '../store/noteStore'
import { useRouter, useRoute } from 'vue-router';

const route = useRoute()
const router = useRouter()
const noteStore2 = noteStore()
const currentNote = computed(() => noteStore2.notes.find(note => note.id === parseInt(route.params.id)))
const newNoteTitle = ref(currentNote.value ? currentNote.value.title : '')
const newNoteContent = ref(currentNote.value ? currentNote.value.content : '')
const showSuccessAlert = ref(false)

function updateNote() {
  if (currentNote.value) {
    noteStore2.editNote(currentNote.value.id, newNoteTitle.value, newNoteContent.value)
    showSuccessAlert.value = true

    // 設置計時器用來顯示成功提示視窗
    setTimeout(() => {
      showSuccessAlert.value = false
      // 提示消失後再跳轉頁面
      router.push({ name: 'grid' })
    }, 1500)
  }
}
const clearPlaceholder = () =>{
  document.querySelector('#title')
  
}
const clearTextArea = () => {
  newNoteContent.value = ''
}

</script>
<template>
  <div class="container p-5 space-grotesk">
    <div class="alert alert-success text-left mb-3" role="alert" v-if="showSuccessAlert">更新成功</div>
    <div class="row">
      <h2 class="mb-5">編輯代辦事項</h2>
      <form @submit.prevent="updateNote">
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">名稱</label>
        <input v-model="newNoteTitle" type="text" class="form-control" id="exampleFormControlInput1"
          @focus="clearPlaceholder">
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">內容</label>
        <textarea v-model="newNoteContent" class="form-control" id="exampleFormControlTextarea1"
          rows="3"></textarea>
      </div>
      <button type="button" class="btn btn-warning" @click="updateNote()">編輯</button>
      </form>
    </div>
  </div>

</template>
<style scoped></style>