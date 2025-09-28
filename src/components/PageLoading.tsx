import { Loader2 } from 'lucide-react';

interface PageLoadingProps {
  message?: string;
  className?: string;
}

export function PageLoading({ 
  message = 'Carregando...', 
  className = '' 
}: PageLoadingProps) {
  return (
    <div className={`flex flex-col items-center justify-center min-h-[400px] ${className}`}>
      <div className="relative">
        {/* Spinner principal */}
        <div className="w-12 h-12 border-4 border-gray-200 border-t-yellow-500 rounded-full animate-spin"></div>
        
        {/* Spinner secundário para efeito de profundidade */}
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-yellow-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      
      <p className="mt-4 text-gray-400 text-sm font-medium">{message}</p>
      
      {/* Pontos animados */}
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
}
