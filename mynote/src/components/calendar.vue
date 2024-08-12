<script setup>
import { useRouter } from 'vue-router'  // 引入 Vue Router
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ref, watch } from 'vue'
import { noteStore } from '../store/noteStore'

const calendarStore = noteStore()
const router = useRouter() 


const calendarOptions = ref({
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    dateClick: (info) => {
        onDateClick(info.dateStr)  // 这里使用了 info.dateStr 传递日期
    }
})

const updateCalendarEvents = () => {
    calendarOptions.value.events = calendarStore.notes.map(note => ({
        title: note.title,
        start: note.date,
        extendedProps: {
            content: note.content,
            isPinned: note.isPinned
        }
    }))
}

watch(() => calendarStore.notes, updateCalendarEvents, { deep: true })

// 點擊日期便可新增或編輯
const onDateClick = (date) => {
    router.push({ name: 'add', params: { date: date } });
}

// 初始化时调用一次
updateCalendarEvents()
</script>

<template>
    <FullCalendar :options="calendarOptions" />
</template>


<style scoped>
::v-deep .fc-daygrid-day:hover {
    cursor: pointer;
    background-color: rgb(252, 250, 225);
    transition: all 0.5s;
}

</style>


