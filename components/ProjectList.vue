<template>
  <div class="project-list">
    <h2 class="section-title">{{ translations.sectionTitle[lang] }}</h2>
    
    <div class="projects-container">
      <div v-for="(project, index) in projects" :key="index" class="project-card">
        <div class="project-header">
          <h3 class="project-name">{{ project.name[lang] }}</h3>
          <span class="project-status" :class="getStatusClass(project.status[lang])">{{ project.status[lang] }}</span>
        </div>
        
        <p class="project-description">{{ project.description[lang] }}</p>
        
        <div class="project-links">
          <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer" class="project-link demo-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="icon">
              <path d="M14.851 11.923c-.179-.641-.521-1.246-1.025-1.749-1.562-1.562-4.095-1.563-5.657 0l-4.998 4.998c-1.562 1.563-1.563 4.095 0 5.657 1.562 1.563 4.096 1.561 5.656 0l3.842-3.841.333.009c.404 0 .802-.04 1.189-.117l-4.657 4.656c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-1.952-1.951-1.952-5.12 0-7.071l4.998-4.998c.975-.975 2.256-1.464 3.536-1.464 1.279 0 2.56.489 3.535 1.464.493.493.861 1.063 1.105 1.672l-.787.784zm-5.703.147c.178.643.521 1.25 1.026 1.562 1.562 1.563 4.096 1.561 5.656 0l4.999-4.998c1.563-1.562 1.563-4.095 0-5.657-1.562-1.562-4.095-1.563-5.657 0l-3.841 3.841-.333-.009c-.404 0-.802.04-1.189.117l4.656-4.656c.975-.976 2.256-1.464 3.536-1.464 1.279 0 2.56.489 3.535 1.464 1.951 1.951 1.951 5.119 0 7.071l-4.999 4.998c-.975.976-2.255 1.464-3.535 1.464-1.28 0-2.56-.488-3.535-1.464-.494-.495-.863-1.067-1.107-1.678l.788-.785z"/>
            </svg>
            {{ translations.demo[lang] }}
          </a>
          <a v-if="project.sourceUrl" :href="project.sourceUrl" target="_blank" rel="noopener noreferrer" class="project-link source-link">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" class="icon">
              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
            </svg>
            {{ translations.source[lang] }}
          </a>
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
      translations: {
        sectionTitle: {
          zh: '我的项目',
          en: 'My Projects'
        },
        demo: {
          zh: '项目演示',
          en: 'Demo'
        },
        source: {
          zh: '源码',
          en: 'Source Code'
        },
        statusMap: {
          'zh': {
            '已完成': 'status-completed',
            '开发中': 'status-in-progress',
            '计划中': 'status-planned'
          },
          'en': {
            'Completed': 'status-completed',
            'In Progress': 'status-in-progress',
            'Planned': 'status-planned'
          }
        }
      },
      projects: [
        {
          name: {
            zh: "支持多人同时编辑个人简历网站",
            en: "Multi-user Resume Website"
          },
          status: {
            zh: "已完成",
            en: "Completed"
          },
          description: {
            zh: "使用Next.js 14构建的个人简历网站，支持在线编辑和实时预览,采用Websocket通信,前后端一体",
            en: "A personal resume website built with Next.js 14, supporting online editing and real-time preview, using Websocket communication, full-stack solution"
          },
          demoUrl: "http://43.154.86.159/",
          sourceUrl: "https://github.com/XMRhapsody/resume-website"
        },
        {
          name: {
            zh: "关于我",
            en: "About Me"
          },
          status: {
            zh: "已完成",
            en: "Completed"
          },
          description: {
            zh: "基于Vue.js+GitHub Workflows的关于我界面",
            en: "About Me interface based on Vue.js + GitHub Workflows"
          },
          demoUrl: "https://about.xmrhapsody.cn/",
          sourceUrl: "https://github.com/XMRhapsody/xmrhapsody.github.io"
        },
        {
          name: {
            zh: "材质加载插件",
            en: "RMCMaterialLoadingPlugin"
          },
          status: {
            zh: "已完成",
            en: "Completed"
          },
          description: {
            zh: "基于Spigot材质分发插件，通过发包实现玩家选择是否加载材质(仿Hypixel)",
            en: "A Spigot-based texture distribution plugin that allows players to choose whether to load textures through packet sending (Hypixel-like)"
          },
          demoUrl: "https://www.minebbs.com/resources/hypixel-rmcmaterialloadingplugin.11364/",
          sourceUrl: "https://github.com/XMRhapsody/RMCMaterialLoadingPlugin"
        },
        {
          name: {
            zh: "Arcade插件重制",
            en: "Arcade Plugin Remake"
          },
          status: {
            zh: "计划中",
            en: "Planned"
          },
          description: {
            zh: "这插件5年前写的就再也没更新过了，当时刚学JAVA，现在全是屎山，计划重制",
            en: "This plugin was written 5 years ago and never updated. I was just learning JAVA at that time, and now it's all spaghetti code, planning to remake it"
          },
          demoUrl: "#",
          sourceUrl: "#"
        }
      ]
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
  methods: {
    getStatusClass(status) {
      // 根据当前语言找到对应的状态映射
      const statusMap = this.translations.statusMap[this.lang];
      return statusMap[status] || '';
    }
  }
}
</script>

<style scoped>
.project-list {
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

.projects-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  max-height: none;
  overflow-y: visible;
}

.project-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.25rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.project-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.project-name {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0;
  color: #24292f;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 70%;
}

.project-status {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
  flex-shrink: 0;
}

.status-completed {
  background-color: #dafbe1;
  color: #116329;
}

.status-in-progress {
  background-color: #fff8c5;
  color: #9a6700;
}

.status-planned {
  background-color: #ddf4ff;
  color: #0969da;
}

.project-description {
  font-size: 0.95rem;
  color: #57606a;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  min-height: 4.5em;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.9rem;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.project-link .icon {
  margin-right: 0.5rem;
  fill: currentColor;
  flex-shrink: 0;
}

.demo-link {
  background-color: #f6f8fa;
  color: #24292f;
}

.demo-link:hover {
  background-color: #eaeef2;
}

.source-link {
  background-color: #0969da;
  color: white;
}

.source-link:hover {
  background-color: #0855a3;
}

/* 小屏幕使用单列布局 */
@media (max-width: 479px) {
  .projects-container {
    grid-template-columns: 1fr;
  }
}

/* 中等屏幕使用两列布局 */
@media (min-width: 480px) and (max-width: 991px) {
  .projects-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 大屏幕使用三列布局 */
@media (min-width: 992px) {
  .projects-container {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .projects-container {
    grid-template-columns: 1fr;
    max-height: none;
    overflow-y: visible;
  }
}

@media (min-width: 1200px) {
  .project-list {
    height: 100%;
  }
}

/* 小屏幕上项目卡片内部布局调整 */
@media (max-width: 480px) {
  .project-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .project-status {
    margin-top: 0.5rem;
  }
  
  .project-links {
    flex-direction: column;
  }
}
</style> 