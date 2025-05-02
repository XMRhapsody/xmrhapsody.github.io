<template>
  <div class="about-page">
    <header class="header">
      <h1 class="site-title">关于我</h1>
    </header>
    
    <main class="main-content">
      <github-profile />
      <repo-list />
    </main>
    
    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} XMRhapsody.</p>
    </footer>
  </div>
</template>

<script>
import GithubProfile from '~/components/GithubProfile.vue'
import RepoList from '~/components/RepoList.vue'

export default {
  components: {
    GithubProfile,
    RepoList
  },
  head() {
    return {
      title: 'XMRhapsody的个人简介'
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
}

.site-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.main-content {
  flex: 1;
  padding: 2rem 0;
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
</style> 