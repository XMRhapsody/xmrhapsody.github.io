<template>
  <div class="language-switcher">
    <button 
      @click="switchLanguage('zh')" 
      :class="{ active: currentLanguage === 'zh' }"
      class="lang-btn"
    >
      中文
    </button>
    <button 
      @click="switchLanguage('en')" 
      :class="{ active: currentLanguage === 'en' }"
      class="lang-btn"
    >
      English
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLanguage: 'zh'
    }
  },
  created() {
    // 从本地存储读取语言设置，如果没有则默认为中文
    const savedLang = localStorage.getItem('language') || 'zh'
    this.currentLanguage = savedLang
    this.$root.$emit('language-changed', savedLang)
  },
  methods: {
    switchLanguage(lang) {
      this.currentLanguage = lang
      // 保存到本地存储
      localStorage.setItem('language', lang)
      // 发出语言改变事件，让其他组件可以监听和响应
      this.$root.$emit('language-changed', lang)
    }
  }
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  gap: 10px;
}

.lang-btn {
  background: transparent;
  border: 1px solid #c9d1d9;
  color: #c9d1d9;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.lang-btn:hover {
  background: rgba(201, 209, 217, 0.1);
}

.lang-btn.active {
  background: #58a6ff;
  color: white;
  border-color: #58a6ff;
}
</style> 