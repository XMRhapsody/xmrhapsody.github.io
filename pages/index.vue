<template>
  <div class="about-page">
    <header class="header">
      <h1 class="site-title">{{ lang === 'zh' ? '关于我' : 'About Me' }}</h1>
      <language-switcher class="language-switcher" />
    </header>
    
    <main class="main-content">
      <div class="content-container">
        <div class="profile-section">
          <github-profile />
        </div>
        <div class="repos-section">
          <repo-list />
        </div>
        <div class="projects-section">
          <project-list />
        </div>
        <div class="gallery-section">
          <gallery-list />
        </div>
      </div>
    </main>
    
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} XMRhapsody.</p>
    </footer>
  </div>
</template>

<script>
import GithubProfile from '~/components/GithubProfile.vue'
import RepoList from '~/components/RepoList.vue'
import ProjectList from '~/components/ProjectList.vue'
import GalleryList from '~/components/GalleryList.vue'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

export default {
  components: {
    GithubProfile,
    RepoList,
    ProjectList,
    GalleryList,
    LanguageSwitcher
  },
  data() {
    return {
      lang: 'en'
    }
  },
  mounted() {
    // 只在客户端执行
    if (process.client) {
      // 从本地存储中读取语言设置
      this.lang = localStorage.getItem('language') || 'en'
    }
    
    // 监听语言变化事件
    this.$root.$on('language-changed', (newLang) => {
      this.lang = newLang
    })
  },
  head() {
    return {
      title: this.lang === 'zh' ? 'XMRhapsody的个人简介' : 'XMRhapsody Profile'
    }
  }
}
</script>

<style>
html, body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f6f8fa;
  margin: 0;
  padding: 0;
  color: #24292f;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}
</style>

<style scoped>
.about-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #24292f;
  color: white;
  padding: 2rem 0;
  text-align: center;
  position: relative;
}

.language-switcher {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.site-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
  background-color: #f6f8fa;
}

.content-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0 1.5rem;
}

/* 小屏幕，单列布局 */
@media (max-width: 767px) {
  .content-container {
    grid-template-columns: 1fr;
    grid-template-areas:
      "profile"
      "repos"
      "projects"
      "gallery";
  }
  
  .profile-section {
    grid-area: profile;
  }
  
  .repos-section {
    grid-area: repos;
  }
  
  .projects-section {
    grid-area: projects;
  }
  
  .gallery-section {
    grid-area: gallery;
  }
}

/* 中等屏幕，两列布局 */
@media (min-width: 768px) and (max-width: 1199px) {
  .content-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "profile repos"
      "projects gallery";
  }
  
  .profile-section {
    grid-area: profile;
  }
  
  .repos-section {
    grid-area: repos;
  }
  
  .projects-section {
    grid-area: projects;
  }
  
  .gallery-section {
    grid-area: gallery;
  }
}

/* 大屏幕，四列布局 */
@media (min-width: 1200px) {
  .content-container {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas: "profile repos projects gallery";
  }
  
  .profile-section {
    grid-area: profile;
  }
  
  .repos-section {
    grid-area: repos;
  }
  
  .projects-section {
    grid-area: projects;
  }
  
  .gallery-section {
    grid-area: gallery;
  }
}

.footer {
  background-color: #24292f;
  color: #c9d1d9;
  text-align: center;
  padding: 1.5rem 2rem;
  font-size: 0.9rem;
}

.footer a {
  color: #58a6ff;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .language-switcher {
    position: static;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
}
</style> 