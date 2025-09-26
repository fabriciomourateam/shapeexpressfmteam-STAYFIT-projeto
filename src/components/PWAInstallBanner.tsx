import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePWA } from '@/hooks/use-pwa';
import { PWAInstallInstructions } from '@/components/PWAInstallInstructions';
import { Download, X, Smartphone, Trophy } from 'lucide-react';

export function PWAInstallBanner() {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  // Lógica para mostrar o banner periodicamente
  useEffect(() => {
    const checkBannerVisibility = () => {
      const lastDismissed = localStorage.getItem('pwa-banner-dismissed');
      const lastShown = localStorage.getItem('pwa-banner-last-shown');
      const now = Date.now();
      
      // Se nunca foi dispensado, mostrar imediatamente
      if (!lastDismissed) {
        setShowBanner(true);
        return;
      }
      
      // Se foi dispensado, verificar se passou tempo suficiente (24 horas)
      const lastDismissedTime = parseInt(lastDismissed);
      const hoursSinceDismissed = (now - lastDismissedTime) / (1000 * 60 * 60);
      
      if (hoursSinceDismissed >= 24) {
        // Verificar se já foi mostrado hoje
        const lastShownTime = lastShown ? parseInt(lastShown) : 0;
        const hoursSinceLastShown = (now - lastShownTime) / (1000 * 60 * 60);
        
        if (hoursSinceLastShown >= 4) { // Mostrar a cada 4 horas
          setShowBanner(true);
          localStorage.setItem('pwa-banner-last-shown', now.toString());
        }
      }
    };

    checkBannerVisibility();
    
    // Verificar a cada 30 minutos
    const interval = setInterval(checkBannerVisibility, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Verificar se está instalado ou não é instalável
  if (isInstalled || !isInstallable) {
    return null;
  }

  // Se foi dispensado, não mostrar
  if (isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    await installApp();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setShowBanner(false);
    // Salvar timestamp de quando foi dispensado (não bloquear permanentemente)
    localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
  };

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              <h3 className="font-bold text-white text-xs sm:text-sm">
                Instalar App
              </h3>
            </div>
            
            <p className="text-white/90 text-xs mb-3 leading-relaxed">
              Instale o Shape Express no seu celular para acesso rápido e notificações!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="bg-white text-yellow-600 hover:bg-white/90 font-semibold text-xs px-3 py-1.5 h-auto w-full sm:w-auto"
              >
                <Download className="w-3 h-3 mr-1" />
                Instalar
              </Button>
              
              <div className="flex gap-2">
                <PWAInstallInstructions />
                
                <Button
                  onClick={handleDismiss}
                  variant="ghost"
                  size="sm"
                  className="text-white/80 hover:text-white hover:bg-white/10 text-xs px-2 py-1.5 h-auto"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
