<script setup>
import { ref } from 'vue';
import { noteStore } from '../store/noteStore'
import { useRouter } from 'vue-router';
const noteStore0 = noteStore()
const router = useRouter();
const keyword = ref("")
// 搜尋
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
    <div class="container-fluid space-grotesk">
      <router-link :to="{ name: 'grid' }" class="navbar-brand">
        <img class="logo" src="/note_logo.png" alt="">  
        <a class="navbar-brand" href="#">My Note</a>
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 右側搜尋欄 -->
      <div class="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
        <form class="d-flex" @submit.prevent="$emit('search', keyword)">
          <input class="form-control me-2" v-model="keyword" @keyup.enter="searchNotes()"  type="search" placeholder="Search" aria-label="Search" @focus="clearPlaceholder">
          <button class="btn btn-outline-success" type="submit" @click="searchNotes()"><i class="fa-solid fa-magnifying-glass"></i></button>
        </form>
      </div>
    </div>
  </nav>
</template>
<style scoped>
.navbar {
  padding: 0;
  height: 100px;
}
.logo {
  width: 60px;
  margin: 10px;
}
.navbar-brand{
  font-size: 34px;
  color: rgb(94, 94, 94);
}
.form-control{
  font-size: 20px;
  color: rgb(94, 94, 94);
}
</style>