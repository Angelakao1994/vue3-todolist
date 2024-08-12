<script setup>
import { noteStore } from '../store/noteStore'
const noteStore3 = noteStore()
</script>
<template>
    
    <main id="result" class="container d-flex justify-content-between pt-5 align-start flex-wrap space-grotesk">
        <h2 v-if="noteStore3.searchResults.length == 0">No related data found</h2>
        <div v-for="notes in noteStore3.searchResults" class="card mb-3" style="width: 30%; height: 15rem;">
            <router-link :to="{ name: 'edit', params: { id: notes.id } }">
                <div class="card-body">
                    <h5 class="card-title">{{notes.title}}</h5>
                    <hr>
                    <p class="card-text">{{notes.content}}</p>
                </div>
            </router-link>
        </div>
    </main>
</template>
<style scoped>
#result {
    width: 70%;
    margin: 0 auto;
}
.card {
    transition: all 0.3s;
}
.card:hover {
    background: #f1f1f1;
    box-shadow: 2px 2px 10px #999;
}
.card-body {
    transition: color 0.3s;
}
.card:hover .card-body {
    color: #006dfc;
}
.card:hover .card-body h5,
.card:hover .card-body p {
    color: #006dfc;
}
a {
    width: 100%;
}
h5, p {
    color: #000;
}
</style>