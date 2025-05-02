<template>
  <div class="error-page">
    <div class="error-container">
      <h1 class="error-code">404</h1>
      <h2 class="error-title">页面未找到</h2>
      <p class="error-text">您访问的页面不存在或已被移动。</p>
      <nuxt-link to="/" class="back-button">返回首页</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
  layout: 'default'
}
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f6f8fa;
}

.error-container {
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  max-width: 500px;
  width: 100%;
}

.error-code {
  font-size: 6rem;
  font-weight: 700;
  color: #0969da;
  margin: 0;
  line-height: 1;
}

.error-title {
  font-size: 2rem;
  color: #24292f;
  margin: 1rem 0;
}

.error-text {
  font-size: 1.1rem;
  color: #57606a;
  margin-bottom: 2rem;
}

.back-button {
  display: inline-block;
  background-color: #0969da;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #0550ae;
}
</style> 