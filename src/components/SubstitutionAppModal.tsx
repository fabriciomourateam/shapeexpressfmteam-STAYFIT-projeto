import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Apple, ExternalLink, RefreshCw } from 'lucide-react';

interface SubstitutionAppModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubstitutionAppModal({ isOpen, onClose }: SubstitutionAppModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showWarning, setShowWarning] = useState(true);

  const handleIframeLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setHasError(false);
    // Força o reload do iframe
    const iframe = document.getElementById('substitution-iframe') as HTMLIFrameElement;
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  const handleOpenInNewTab = () => {
    window.open('https://quantocomer.com.br/fabriciomoura/', '_blank');
  };

  // Esconder aviso após 5 segundos
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowWarning(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-6xl bg-white text-gray-900 shadow-2xl rounded-lg max-h-[95vh] overflow-hidden border-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-lg">
              <Apple className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl text-gray-900">App de Substituição de Alimentos</CardTitle>
              <p className="text-gray-600 mt-1">
                Calculadora inteligente para substituições nutricionais
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              className="h-8 w-8 p-0 hover:bg-gray-100"
              title="Recarregar"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleOpenInNewTab}
              className="h-8 w-8 p-0 hover:bg-gray-100"
              title="Abrir em nova aba"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 hover:bg-gray-100"
              title="Fechar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 h-[calc(95vh-120px)] relative">
          {/* Aviso sobre compatibilidade */}
          {showWarning && (
            <div className="absolute top-2 left-2 right-2 z-20 animate-in slide-in-from-top-2 duration-300">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-yellow-800 text-xs">!</span>
                  </div>
                  <span className="text-yellow-800 font-medium">
                    Se houver problemas de carregamento, use o botão "Abrir em nova aba" no canto superior direito.
                  </span>
                  <button
                    onClick={() => setShowWarning(false)}
                    className="ml-auto text-yellow-600 hover:text-yellow-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Carregando app de substituição...</p>
                <p className="text-gray-500 text-sm mt-2">
                  Se demorar muito, tente abrir em nova aba
                </p>
              </div>
            </div>
          )}

          {hasError ? (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Erro ao carregar o app</h3>
                <p className="text-gray-600 mb-4">
                  Não foi possível carregar o app de substituição. Tente novamente ou abra em uma nova aba.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={handleRefresh}
                    variant="outline"
                    className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Tentar Novamente
                  </Button>
                  <Button
                    onClick={handleOpenInNewTab}
                    className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir em Nova Aba
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              id="substitution-iframe"
              src="https://quantocomer.com.br/fabriciomoura/"
              className="w-full h-full border-0 rounded-lg"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="App de Substituição de Alimentos"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
              referrerPolicy="no-referrer-when-downgrade"
              loading="lazy"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
