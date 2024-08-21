<script setup>
import { ref } from 'vue'
import { noteStore } from '../store/noteStore'
const todoStore = noteStore()

</script>

<template>
  <div class="container space-grotesk">   
    <h2>全部</h2>
    <div class="row my-5">
      <div v-for="note in todoStore.notes" class="col-3">
        <router-link :to="{name:'edit', params:{id: note.id}}">
        <div class="card">
          <div class="card-body">
            <i v-show="note.isPinned" class="fa-solid fa-heart fa-2x"></i>
            <h5>{{ note.title }}</h5>
            <hr />
            <p>{{ note.content }}</p>
          </div>
        </div>
      </router-link>
      </div>
    </div>
  </div>

</template>
<style scoped>

.card {
  padding: 5px;
  transition: all 0.3s;
}

.card:hover {
  background-color: rgba(219, 219, 219, 0.3);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  cursor: pointer;
}

.fa-solid {
  transform: rotate(25deg);
  color: crimson;
  position: absolute;
  right: -8px;
  top: -8px;
}
</style>