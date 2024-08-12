<script setup>
import ToolBar from './components/toolBar.vue';
import NoteList from './components/noteList.vue'
import Calendar from './components/calendar.vue'
</script>

<template>
  <!-- 引入navbar -->
  <ToolBar />
  <div class="container-fluid">
    <div class="row">
      <div class="col-3 p-5">
        <!-- 引入左側列表 -->
        <NoteList />
      </div>
      <div class="col-9 p-5">
        <!-- 引入右側卡片 -->
        <router-view></router-view>
        
      </div>
      <!-- footer -->
    </div>
  </div>

</template>

<style scoped></style>
