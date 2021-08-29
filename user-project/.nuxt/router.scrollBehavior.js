

export default function(to, from, savedPosition) {
      if(to.hash || to.path.includes('privacy') || to.path.includes('about-us') || to.path.includes('conditions')){
        return { x: 0, y: 0 }
      }
    }
