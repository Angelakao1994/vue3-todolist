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
const showSuccessAlert = ref(false)


const handleAddNote = () => {
  if (newNoteTitle.value && newNoteContent.value) {
    const date = route.params.date
    addNote(newNoteTitle.value, newNoteContent.value, date)

    // 顯示成功提示窗
    showSuccessAlert.value = true

    // 設置計時器用來顯示成功提示視窗, 提示消失後再跳轉頁面
    setTimeout(()=>{
      showSuccessAlert.value = false
      // 重置輸入框
      newNoteTitle.value = ''
      newNoteContent.value = ''
      router.push({ name: 'grid' })
    }, 1500)
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
    <!-- 显示成功提示 -->
    <div class="alert alert-success text-left mb-3" role="alert" v-if="showSuccessAlert">
      新增成功
    </div>
    <div class="row">
      <h2 class="mb-5">新增代辦事項 {{ route.params.date }}</h2>
      <form @submit.prevent="handleAddNote">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">名稱</label>
          <input v-model="newNoteTitle" type="text" class="form-control" id="exampleFormControlInput1"
            placeholder="請輸入名稱" @focus="clearPlaceholder">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">內容</label>
          <textarea v-model="newNoteContent" class="form-control" id="exampleFormControlTextarea1" rows="3"
            placeholder="請輸入內容" @focus="clearTextArea"></textarea>
        </div>
        <button class="btn btn-warning" type="submit">新增</button>
      </form>
    </div>
  </div>
</template>
<style scoped></style>