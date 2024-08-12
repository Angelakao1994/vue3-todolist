<!-- 新增筆記, 調用noteStore.js檔案內資料 -->
<script setup>
import { ref } from 'vue'
import { noteStore } from '../store/noteStore'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const newNoteTitle = ref('')
const newNoteContent = ref('')
const noteStore1 = noteStore()
const { notes } = storeToRefs(noteStore1)
const { addNote } = noteStore1

const handleAddNote = () => {
  if (newNoteTitle.value && newNoteContent.value) {
    const date = route.params.date
    addNote(newNoteTitle.value, newNoteContent.value, date)
    newNoteTitle.value = ''
    newNoteContent.value = ''
    router.push({ name: 'grid' })
  } else {
    alert('請輸入筆記名稱和內容')
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
    <div class="row">
      <h2 class="mb-5">Add Note {{ route.params.date }}</h2>
      <form @submit.prevent="handleAddNote">
        <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Note Name</label>
        <input v-model="newNoteTitle" type="text" class="form-control" id="exampleFormControlInput1"
          placeholder="note title" @focus="clearPlaceholder">
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Note Content</label>
        <textarea v-model="newNoteContent" class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="note content" @focus="clearTextArea"></textarea>
      </div>
      <button class="btn btn-warning" type="submit">Add</button>
        </form>
    </div>
  </div>
</template>
<style scoped></style>