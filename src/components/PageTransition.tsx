import { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageLoading } from './PageLoading';
import { usePageCache } from '@/hooks/use-page-cache';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);
  const location = useLocation();
  const { getCachedPage, setCachedPage, currentPath } = usePageCache();

  useEffect(() => {
    // Verificar se há cache para esta página
    const cachedPage = getCachedPage(currentPath);
    
    if (cachedPage) {
      // Usar conteúdo do cache imediatamente
      setDisplayChildren(cachedPage.content);
      setIsTransitioning(false);
    } else {
      // Iniciar transição quando a rota mudar
      setIsTransitioning(true);
      
      // Pequeno delay para permitir que a transição seja visível
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setCachedPage(currentPath, children);
        setIsTransitioning(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, children, currentPath, getCachedPage, setCachedPage]);

  return (
    <div className="relative">
      {/* Overlay de transição */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <PageLoading message="Carregando página..." />
        </div>
      )}
      
      {/* Conteúdo da página */}
      <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {displayChildren}
      </div>
    </div>
  );
}
