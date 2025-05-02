<template>
  <div class="github-profile">
    <div v-if="loading" class="loading">
      <p>{{ translations.loading[lang] }}</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <div v-else class="profile-container">
      <div class="profile-header">
        <img :src="profile.avatar_url" alt="头像" class="avatar" />
        <div class="name-container">
          <h1 class="name">{{ profile.name || profile.login }}</h1>
          <p class="username">@{{ profile.login }}</p>
          <p v-if="profile.bio" class="bio">{{ profile.bio }}</p>
        </div>
      </div>
      
      <div class="profile-details">
        <div v-if="profile.location" class="detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="icon">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
          </svg>
          <span>{{ profile.location }}</span>
        </div>
        
        <div v-if="profile.blog" class="detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="icon">
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
          </svg>
          <a :href="formatBlogUrl(profile.blog)" target="_blank" rel="noopener noreferrer">{{ profile.blog }}</a>
        </div>
        
        <div v-if="profile.email" class="detail-item">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="icon">
            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
          </svg>
          <a :href="`mailto:${profile.email}`">{{ profile.email }}</a>
        </div>
      </div>
      
      <div class="profile-stats">
        <div class="stat-item">
          <span class="stat-count">{{ profile.public_repos }}</span>
          <span class="stat-label">{{ translations.stats.repos[lang] }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-count">{{ profile.followers }}</span>
          <span class="stat-label">{{ translations.stats.followers[lang] }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-count">{{ profile.following }}</span>
          <span class="stat-label">{{ translations.stats.following[lang] }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: 'zh',
      profile: null,
      loading: true,
      error: null,
      translations: {
        loading: {
          zh: "加载中...",
          en: "Loading..."
        },
        stats: {
          repos: {
            zh: "仓库",
            en: "Repos"
          },
          followers: {
            zh: "粉丝",
            en: "Followers"
          },
          following: {
            zh: "关注",
            en: "Following"
          }
        }
      }
    }
  },
  async mounted() {
    // 从本地存储中读取语言设置
    this.lang = localStorage.getItem('language') || 'zh'
    
    // 监听语言变化事件
    this.$root.$on('language-changed', (newLang) => {
      this.lang = newLang
    })
    
    try {
      const response = await this.$axios.get('/users/XMRhapsody')
      this.profile = response.data
      this.loading = false
    } catch (err) {
      this.error = this.lang === 'zh' ? '无法加载个人资料数据' : 'Failed to load profile data'
      this.loading = false
      console.error('GitHub API 错误:', err)
    }
  },
  methods: {
    formatBlogUrl(url) {
      if (!url) return ''
      return url.startsWith('http') ? url : `https://${url}`
    }
  }
}
</script>

<style scoped>
.github-profile {
  max-width: 100%;
  margin: 0 auto;
  padding: 2rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #555;
}

.error {
  color: #e53e3e;
}

.profile-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  padding: 2rem;
}

.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.name-container {
  margin-left: 2rem;
}

.name {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
  color: #333;
}

.username {
  font-size: 1.2rem;
  color: #6e7781;
  margin: 0.5rem 0;
}

.bio {
  font-size: 1.1rem;
  color: #24292f;
  margin-top: 0.5rem;
}

.profile-details {
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: #57606a;
}

.detail-item .icon {
  margin-right: 0.5rem;
  fill: currentColor;
}

.detail-item a {
  color: #0969da;
  text-decoration: none;
}

.detail-item a:hover {
  text-decoration: underline;
}

.profile-stats {
  display: flex;
  border-top: 1px solid #eaeaea;
  padding-top: 1.5rem;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-count {
  display: block;
  font-size: 1.5rem;
  font-weight: 600;
  color: #24292f;
}

.stat-label {
  font-size: 0.9rem;
  color: #57606a;
}

@media (max-width: 600px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .name-container {
    margin-left: 0;
    margin-top: 1rem;
  }
}
</style> 