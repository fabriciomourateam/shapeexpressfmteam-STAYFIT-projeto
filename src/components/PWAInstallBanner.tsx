import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePWA } from '@/hooks/use-pwa';
import { PWAInstallInstructions } from '@/components/PWAInstallInstructions';
import { Download, X, Smartphone, Trophy } from 'lucide-react';

export function PWAInstallBanner() {
  const { isInstallable, isInstalled, installApp } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);

  // Para teste: sempre mostrar o banner (comentar depois)
  // if (isInstalled || !isInstallable || isDismissed) {
  //   return null;
  // }

  // Versão de teste - sempre mostrar
  if (isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    await installApp();
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // Salvar no localStorage para não mostrar novamente
    localStorage.setItem('pwa-banner-dismissed', 'true');
  };

  // Verificar se foi dispensado anteriormente
  if (localStorage.getItem('pwa-banner-dismissed') === 'true') {
    return null;
  }

  return (
    <Card className="fixed bottom-20 left-4 right-4 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 border-yellow-400 shadow-2xl lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-white" />
              <h3 className="font-bold text-white text-sm">
                Instalar App
              </h3>
            </div>
            
            <p className="text-white/90 text-xs mb-3 leading-relaxed">
              Instale o Shape Express no seu celular para acesso rápido e notificações!
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={handleInstall}
                size="sm"
                className="bg-white text-yellow-600 hover:bg-white/90 font-semibold text-xs px-3 py-1.5 h-auto"
              >
                <Download className="w-3 h-3 mr-1" />
                Instalar
              </Button>
              
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
      </CardContent>
    </Card>
  );
}
