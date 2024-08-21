import { defineStore } from 'pinia'
import axios from "axios";

export const noteStore = defineStore("notes", {
  // 定義狀態(變數)
  state: () => ({
    notes: [
      {
        id: 1,
        title: "寫作業",
        content: "數學",
        isPinned: false,
      },
      {
        id: 2,
        title: "讀書",
        content: "React工具書",
        isPinned: true,
      },
      {
        id: 3,
        title: "複習",
        content: "Vue練習",
        isPinned: false,
      },
      {
        id: 4,
        title: "運動",
        content: "高爾夫",
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
    addNote(title, content) {
      if (!title) return;
      this.notes.push({
        id: Math.floor(Math.random() * 100000),
        title,
        content,
        isPinned: false,
      });
    },
    // 切換icon釘選狀態
    markedPin(id) {
      const i = this.notes.findIndex((note) => note.id === id);
      if (i !== -1) {
        this.notes[i].isPinned = !this.notes[i].isPinned;
      }
    },
    // 編輯內容
    editNote(id, title, content) {
      const i = this.notes.findIndex((note) => note.id === id);
      if (i !== -1) {
        this.notes[i].title = title;
        this.notes[i].content = content;
      }
    },
    // 刪除項目
    deleteNote(id) {
      const i = this.notes.findIndex((note) => note.id === id);
      if (i !== -1) {
        this.notes.splice(i, 1);
      }
    },
    // 搜尋
    searchNotes(keyword) {
      this.keyword = keyword.toLowerCase();
      this.searchResults = this.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(this.keyword) ||
          note.content.toLowerCase().includes(this.keyword)
      );
      console.log(this.searchResults);
    },
  },
});