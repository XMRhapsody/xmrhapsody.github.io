<template>
  <div class="gallery-container">
    <h2 class="section-title">{{ lang === 'zh' ? '我的图片' : 'My Gallery' }}</h2>
    
    <div v-if="loading" class="loading">
      <p>{{ lang === 'zh' ? '加载中...' : 'Loading...' }}</p>
    </div>
    
    <div v-else-if="error" class="error">
      <p>{{ lang === 'zh' ? '无法加载图片。请稍后再试。' : 'Could not load images. Please try again later.' }}</p>
    </div>
    
    <div v-else class="gallery-grid">
      <div v-for="(image, index) in images" :key="index" class="gallery-item">
        <div class="image-container" @click="openLightbox(index)">
          <img :src="image.url" :alt="image.title" class="gallery-image">
          <div class="image-overlay">
            <h3 class="image-title">{{ image.title }}</h3>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Lightbox -->
    <div v-if="lightboxOpen" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="lightbox-close" @click="closeLightbox">&times;</button>
        <button v-if="currentIndex > 0" class="lightbox-prev" @click="prevImage">&lsaquo;</button>
        <img :src="images[currentIndex].url" :alt="images[currentIndex].title" class="lightbox-image">
        <button v-if="currentIndex < images.length - 1" class="lightbox-next" @click="nextImage">&rsaquo;</button>
        <div class="lightbox-caption">
          <h3>{{ images[currentIndex].title }}</h3>
          <p>{{ images[currentIndex].description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      error: null,
      images: [
        {
          title: 'test',
          description: '我的女装照',
          url: '/images/test.png'
        }
      ],
      lightboxOpen: false,
      currentIndex: 0,
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
    
    // 模拟加载过程
    setTimeout(() => {
      this.loading = false
    }, 500)
  },
  methods: {
    openLightbox(index) {
      this.currentIndex = index
      this.lightboxOpen = true
      document.body.style.overflow = 'hidden'
    },
    closeLightbox() {
      this.lightboxOpen = false
      document.body.style.overflow = ''
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++
      }
    },
    prevImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    }
  }
}
</script>

<style scoped>
.gallery-container {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding: 1.5rem;
  height: 100%;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #24292f;
  border-bottom: 1px solid #e1e4e8;
  padding-bottom: 0.75rem;
}

.loading, .error {
  text-align: center;
  padding: 2rem 0;
  color: #586069;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-item {
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: translateY(-5px);
}

.image-container {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3/2;
  cursor: pointer;
}

.gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-container:hover .gallery-image {
  transform: scale(1.1);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-container:hover .image-overlay {
  opacity: 1;
}

.image-title {
  margin: 0;
  font-size: 1rem;
  font-weight: 500;
}

/* Lightbox styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  display: block;
  border-radius: 4px;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.lightbox-prev, .lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-prev {
  left: -60px;
}

.lightbox-next {
  right: -60px;
}

.lightbox-caption {
  color: white;
  margin-top: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  .gallery-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
  .lightbox-prev {
    left: -30px;
  }
  
  .lightbox-next {
    right: -30px;
  }
}
</style> 