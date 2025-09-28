import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface CachedPage {
  pathname: string;
  content: React.ReactNode;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos
const MAX_CACHE_SIZE = 10; // Máximo 10 páginas em cache

export function usePageCache() {
  const [cache, setCache] = useState<Map<string, CachedPage>>(new Map());
  const location = useLocation();
  const currentPath = location.pathname;

  // Limpar cache expirado
  useEffect(() => {
    const now = Date.now();
    setCache(prevCache => {
      const newCache = new Map();
      
      for (const [key, value] of prevCache) {
        if (now - value.timestamp < CACHE_DURATION) {
          newCache.set(key, value);
        }
      }
      
      return newCache;
    });
  }, [currentPath]);

  const getCachedPage = (pathname: string): CachedPage | null => {
    return cache.get(pathname) || null;
  };

  const setCachedPage = (pathname: string, content: React.ReactNode) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      
      // Remover página mais antiga se cache estiver cheio
      if (newCache.size >= MAX_CACHE_SIZE) {
        const oldestKey = Array.from(newCache.keys())[0];
        newCache.delete(oldestKey);
      }
      
      newCache.set(pathname, {
        pathname,
        content,
        timestamp: Date.now()
      });
      
      return newCache;
    });
  };

  const clearCache = () => {
    setCache(new Map());
  };

  const clearPageCache = (pathname: string) => {
    setCache(prevCache => {
      const newCache = new Map(prevCache);
      newCache.delete(pathname);
      return newCache;
    });
  };

  return {
    getCachedPage,
    setCachedPage,
    clearCache,
    clearPageCache,
    currentPath
  };
}
