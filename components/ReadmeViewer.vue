<template>
  <div class="readme-viewer">
    <h2 class="section-title">{{ translations.sectionTitle[lang] }}</h2>
    <div v-if="loading" class="loading">
      <p>{{ translations.loading[lang] }}</p>
    </div>
    <div v-else-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    <client-only>
      <div v-if="!loading && !error" class="readme-content" v-html="formattedContent"></div>
    </client-only>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lang: 'en',
      markdown: '',
      loading: true,
      error: null,
      translations: {
        sectionTitle: {
          zh: "关于我",
          en: "About Me"
        },
        loading: {
          zh: "加载中...",
          en: "Loading..."
        }
      }
    }
  },
  computed: {
    formattedContent() {
      if (!this.markdown) {
        return '';
      }
      
      // 处理图片路径，将相对路径转换为绝对路径
      let processedMarkdown = this.markdown.replace(
        /!\[(.*?)\]\((?!http)(.*?)\)/gim, 
        '![$1](https://raw.githubusercontent.com/XMRhapsody/XMRhapsody/main/$2)'
      );
      
      // 简单的 Markdown 解析函数
      let html = processedMarkdown
        // 标题
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // 强调
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // 列表
        .replace(/^\s*\n\* (.*)/gim, '<ul>\n<li>$1</li>\n</ul>')
        .replace(/^\s*\n- (.*)/gim, '<ul>\n<li>$1</li>\n</ul>')
        // 链接
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')
        // 图片
        .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img src="$2" alt="$1" loading="lazy" onerror="this.onerror=null;this.setAttribute(\'error\',\'\');this.title=\'图片加载失败\'" />')
        // 段落
        .replace(/^\s*\n([^\n]+)\n/gim, '<p>$1</p>\n')
        // 代码
        .replace(/`(.*?)`/gim, '<code>$1</code>')
        // 换行
        .replace(/\n/gim, '<br />');
        
      // 修复列表
      html = html.replace(/<\/ul>\s*<ul>/gim, '');
      
      return html;
    }
  },
  async mounted() {
    // 只在客户端执行
    if (process.client) {
      // 从本地存储中读取语言设置
      this.lang = localStorage.getItem('language') || 'en'
      
      // 监听语言变化事件
      this.$root.$on('language-changed', (newLang) => {
        this.lang = newLang;
      });
      
      try {
        // 尝试从缓存获取README
        try {
          const cachedReadme = JSON.parse(localStorage.getItem('github_readme'));
          if (cachedReadme && cachedReadme.data && cachedReadme.timestamp) {
            const cacheAge = Date.now() - cachedReadme.timestamp;
            // 使用不超过1天的缓存
            if (cacheAge < 86400000) {
              console.log('使用缓存的README数据');
              this.markdown = cachedReadme.data;
              this.loading = false;
              return;
            }
          }
        } catch (cacheErr) {
          console.warn('读取缓存README失败:', cacheErr);
        }
        
        // 获取 README 内容
        let response = await fetch('https://raw.githubusercontent.com/XMRhapsody/XMRhapsody/main/README.md');
        
        // 如果第一次请求失败，尝试使用备选方案
        if (!response.ok) {
          console.log('尝试使用备选API获取README...');
          response = await fetch('https://api.github.com/repos/XMRhapsody/XMRhapsody/readme', {
            headers: {
              'Accept': 'application/vnd.github.v3.raw'
            }
          });
        }
        
        if (!response.ok) {
          throw new Error(`无法获取README: ${response.status}`);
        }
        
        this.markdown = await response.text();
        this.loading = false;
        
        // 缓存README数据
        if (process.client) {
          try {
            localStorage.setItem('github_readme', JSON.stringify({
              data: this.markdown,
              timestamp: Date.now()
            }));
          } catch (storageErr) {
            console.warn('缓存README数据失败:', storageErr);
          }
        }
      } catch (err) {
        this.error = this.lang === 'zh' ? '无法加载 README 数据' : 'Failed to load README data';
        this.loading = false;
        console.error('README 加载错误:', err);
      }
    }
  }
}
</script>

<style scoped>
.readme-viewer {
  max-width: 100%;
  margin: 1rem auto 0;
  padding: 0;
}

.section-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #24292f;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 0.5rem;
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

.readme-content {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  overflow: visible;
}

.readme-content :deep(h1) {
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #eaeaea;
}

.readme-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.3rem;
  border-bottom: 1px solid #eaeaea;
}

.readme-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.2rem;
  margin-bottom: 0.8rem;
}

.readme-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.readme-content :deep(ul), .readme-content :deep(ol) {
  padding-left: 2rem;
  margin-bottom: 1rem;
}

.readme-content :deep(li) {
  margin-bottom: 0.5rem;
}

.readme-content :deep(code) {
  background-color: #f6f8fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.9em;
}

.readme-content :deep(pre) {
  background-color: #f6f8fa;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.readme-content :deep(a) {
  color: #0969da;
  text-decoration: none;
}

.readme-content :deep(a:hover) {
  text-decoration: underline;
}

.readme-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 5px;
  margin: 1rem 0;
  display: block;
  object-fit: contain;
  transition: opacity 0.3s ease;
}

.readme-content :deep(img[loading]) {
  opacity: 0.7;
}

.readme-content :deep(img[error]) {
  opacity: 0.5;
  position: relative;
  min-height: 100px;
  background-color: #f0f2f5;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}

.readme-content :deep(img[error])::before {
  content: attr(alt);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  padding: 10px;
  text-align: center;
}

.readme-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

.readme-content :deep(th), .readme-content :deep(td) {
  padding: 0.5rem;
  border: 1px solid #eaeaea;
}

.readme-content :deep(th) {
  background-color: #f6f8fa;
  font-weight: 600;
}

.readme-content :deep(blockquote) {
  border-left: 4px solid #dfe2e5;
  padding-left: 1rem;
  color: #6a737d;
  margin: 0 0 1rem;
}
</style> 