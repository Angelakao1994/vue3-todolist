import { defineStore } from 'pinia'


export const noteStore = defineStore("notes", {
  // 定義狀態(變數)
  state: () => ({
    notes: [
      {
        id: 1,
        title: "Writing Homework",
        content: "Math",
        date: new Date().toISOString().split("T")[0],
        isPinned: false,
      },
      {
        id: 2,
        title: "Reading Book",
        content: "React Tool Book",
        date: new Date().toISOString().split("T")[0],
        isPinned: true,
      },
      {
        id: 3,
        title: "Review",
        content: "Vue Review",
        date: new Date().toISOString().split("T")[0],
        isPinned: false,
      },
      {
        id: 4,
        title: "Exercise",
        content: "Swimming",
        date: new Date().toISOString().split("T")[0],
        isPinned: true,
      },
    ],
    selectedNoteId: null,
    keyword: null, // 當前選擇的 note 索引值
    searchResults: [],
  }),
  // 讀取資料用
  getters: {
    pinnedNotes(state) {
      return state.notes.filter((note) => note.isPinned);
    },
    allNote(state) {
      return state.notes.filter((note) => !note.isPinned);
    },
  },
  // 變更資料用
  actions: {
    addNote(title, content, date) {
      if (!title) return;
      this.notes.push({
        id: Math.floor(Math.random() * 100000),
        title,
        content,
        date,
        isPinned: false,
      });
    },
    markedPin(id) {
      const i = this.notes.findIndex((note) => note.id === id);
      if (i !== -1) {
        this.notes[i].isPinned = !this.notes[i].isPinned;
      }
    },
    editNote(id, title, content, date) {
      const i = this.notes.findIndex((note) => note.id === id);
      if (i !== -1) {
        this.notes[i].title = title;
        this.notes[i].content = content;
        this.notes[i].date = date; // 更新日期
      }
    },
    deleteNote(id) {
      const i = this.notes.findIndex((note) => note.id === id);
      if (i !== -1) {
        this.notes.splice(i, 1);
      }
    },
    searchNotes(keyword) {
      this.keyword = keyword.toLowerCase();
      this.searchResults = this.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(this.keyword) ||
          note.content.toLowerCase().includes(this.keyword)
      );
      console.log(this.searchResults);
    },
    getNotesByDate(date) {
      return this.notes.filter(note => note.date === date);
    },
  },
});