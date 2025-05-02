<template>
  <div class="repo-list">
    <h2 class="section-title">{{ translations.sectionTitle[lang] }}</h2>
    
    <div v-if="loading" class="loading">
      <p>{{ translations.loading[lang] }}</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <div v-else>
      <div v-if="repos.length === 0" class="no-repos">
        <p>{{ translations.noRepos[lang] }}</p>
      </div>
      
      <div v-else class="repos-container">
        <div v-for="repo in repos" :key="repo.id" class="repo-card">
          <div class="repo-header">
            <h3 class="repo-name">
              <a :href="repo.html_url" target="_blank" rel="noopener noreferrer">{{ repo.name }}</a>
            </h3>
            <span v-if="repo.fork" class="fork-badge">Fork</span>
          </div>
          
          <p v-if="repo.description" class="repo-description">{{ repo.description }}</p>
          
          <div class="repo-stats">
            <div v-if="repo.language" class="repo-language">
              <span class="language-color" :style="{ backgroundColor: getLanguageColor(repo.language) }"></span>
              <span>{{ repo.language }}</span>
            </div>
            
            <div class="repo-stars" v-if="repo.stargazers_count > 0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="icon">
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path>
              </svg>
              <span>{{ repo.stargazers_count }}</span>
            </div>
            
            <div class="repo-forks" v-if="repo.forks_count > 0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="icon">
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
              </svg>
              <span>{{ repo.forks_count }}</span>
            </div>
            
            <div class="repo-updated-at">
              {{ translations.updatedAt[lang] }} {{ formatDate(repo.updated_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: 'en',
      repos: [],
      loading: true,
      error: null,
      translations: {
        sectionTitle: {
          zh: "仓库列表",
          en: "Repository List"
        },
        loading: {
          zh: "加载中...",
          en: "Loading..."
        },
        noRepos: {
          zh: "没有可显示的仓库",
          en: "No repositories to display"
        },
        updatedAt: {
          zh: "更新于",
          en: "Updated on"
        }
      },
      languageColors: {
        "JavaScript": "#f1e05a",
        "TypeScript": "#2b7489",
        "HTML": "#e34c26",
        "CSS": "#563d7c",
        "Python": "#3572A5",
        "Java": "#b07219",
        "C": "#555555",
        "C++": "#f34b7d",
        "PHP": "#4F5D95",
        "Ruby": "#701516",
        "Go": "#00ADD8",
        "Swift": "#ffac45",
        "Kotlin": "#F18E33",
        "Rust": "#dea584",
        "Vue": "#42b883"
      }
    }
  },
  async mounted() {
    // 只在客户端执行
    if (process.client) {
      // 从本地存储中读取语言设置
      this.lang = localStorage.getItem('language') || 'en'
    }
    
    // 监听语言变化事件
    this.$root.$on('language-changed', (newLang) => {
      this.lang = newLang
    })
    
    try {
      // 首先尝试从缓存中获取数据
      if (process.client) {
        try {
          const cachedRepos = JSON.parse(localStorage.getItem('github_repos'));
          if (cachedRepos && cachedRepos.data && cachedRepos.timestamp) {
            const cacheAge = Date.now() - cachedRepos.timestamp;
            // 缓存如果不超过1小时则使用缓存数据
            if (cacheAge < 3600000) {
              console.log('使用缓存的仓库数据');
              this.repos = cachedRepos.data;
              this.loading = false;
              return;
            }
          }
        } catch (cacheErr) {
          console.warn('读取缓存仓库数据失败:', cacheErr);
        }
      }
      
      // 获取GitHub仓库数据
      const response = await this.$axios.get('/users/XMRhapsody/repos', {
        params: {
          sort: 'updated',
          per_page: 6
        }
      });
      
      this.repos = response.data;
      this.loading = false;
      
      // 将数据缓存到本地存储
      if (process.client) {
        try {
          localStorage.setItem('github_repos', JSON.stringify({
            data: this.repos,
            timestamp: Date.now()
          }));
        } catch (storageErr) {
          console.warn('缓存仓库数据到本地存储失败:', storageErr);
        }
      }
    } catch (err) {
      // 尝试使用可能存在的较旧缓存数据
      if (process.client) {
        try {
          const cachedRepos = JSON.parse(localStorage.getItem('github_repos'));
          if (cachedRepos && cachedRepos.data) {
            console.log('使用较旧的缓存仓库数据');
            this.repos = cachedRepos.data;
            this.loading = false;
            return;
          }
        } catch (cacheErr) {
          console.warn('读取缓存仓库数据失败:', cacheErr);
        }
      }
      
      this.error = this.lang === 'zh' ? '无法加载仓库数据' : 'Failed to load repository data';
      this.loading = false;
      console.error('GitHub API 错误:', err);
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      const locale = this.lang === 'zh' ? 'zh-CN' : 'en-US'
      return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    getLanguageColor(language) {
      return this.languageColors[language] || "#858585"
    }
  }
}
</script>

<style scoped>
.repo-list {
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  height: 100%;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #24292f;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 0.5rem;
}

.loading, .error, .no-repos {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #555;
}

.error {
  color: #e53e3e;
}

.repos-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-height: none;
  overflow-y: visible;
}

.repo-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.repo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.repo-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.repo-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.repo-name a {
  color: #0969da;
  text-decoration: none;
}

.repo-name a:hover {
  text-decoration: underline;
}

.fork-badge {
  font-size: 0.75rem;
  background-color: #eaeaea;
  color: #57606a;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  margin-left: 0.75rem;
  flex-shrink: 0;
}

.repo-description {
  font-size: 0.95rem;
  color: #57606a;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3em;
}

.repo-stats {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.85rem;
  color: #57606a;
}

.repo-language, .repo-stars, .repo-forks {
  display: flex;
  align-items: center;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}

.language-color {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 0.35rem;
  flex-shrink: 0;
}

.repo-stars .icon, .repo-forks .icon {
  margin-right: 0.35rem;
  fill: currentColor;
  flex-shrink: 0;
}

.repo-updated-at {
  font-size: 0.8rem;
  color: #6e7781;
  margin-top: 0.5rem;
  width: 100%;
}

/* 小屏幕使用单列布局 */
@media (max-width: 479px) {
  .repos-container {
    grid-template-columns: 1fr;
  }
}

/* 中等屏幕使用两列布局 */
@media (min-width: 480px) and (max-width: 991px) {
  .repos-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 大屏幕使用灵活布局 */
@media (min-width: 992px) {
  .repos-container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (min-width: 1200px) {
  .repo-list {
    height: 100%;
  }
}
</style> 