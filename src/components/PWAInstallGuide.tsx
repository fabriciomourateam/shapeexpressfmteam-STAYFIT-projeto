import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Smartphone, Apple, Share, Plus, MoreHorizontal } from 'lucide-react';

interface PWAInstallGuideProps {
  isInstallable: boolean;
  isInstalled: boolean;
  onInstall: () => void;
}

export function PWAInstallGuide({ isInstallable, isInstalled, onInstall }: PWAInstallGuideProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Se o app pode ser instalado, mostra o botão normal
  if (isInstallable) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={onInstall}
        className="text-yellow-400 hover:text-yellow-300 text-xs"
      >
        📱 Instalar App
      </Button>
    );
  }

  // Se já está instalado, mostra confirmação
  if (isInstalled) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="text-green-400 text-xs"
        disabled
      >
        ✅ Já Instalado
      </Button>
    );
  }

  // Se não pode ser instalado, mostra orientações
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-yellow-400 hover:text-yellow-300 text-xs"
        >
          📱 Como Instalar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold text-gray-900">
            Como Instalar o App
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* iOS Instructions */}
          <Card className="border-blue-200 bg-blue-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-blue-800 text-sm">
                <Apple className="w-4 h-4" />
                Para iPhone (iOS)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-blue-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Abra o Safari</p>
                  <p className="text-xs text-blue-600">Use o navegador Safari (não Chrome ou outros)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">Toque no botão Compartilhar</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Share className="w-3 h-3" />
                    <span className="text-xs">Ícone na parte inferior da tela</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Selecione "Adicionar à Tela de Início"</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Plus className="w-3 h-3" />
                    <span className="text-xs">Role para baixo se necessário</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <p className="font-medium">Toque em "Adicionar"</p>
                  <p className="text-xs text-blue-600">O app aparecerá na sua tela inicial</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Android Instructions */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-green-800 text-sm">
                <Smartphone className="w-4 h-4" />
                Para Android
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-green-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <p className="font-medium">Abra o Chrome</p>
                  <p className="text-xs text-green-600">Use o navegador Chrome</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <p className="font-medium">Toque no menu (três pontos)</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MoreHorizontal className="w-3 h-3" />
                    <span className="text-xs">Canto superior direito</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <p className="font-medium">Selecione "Instalar app"</p>
                  <p className="text-xs text-green-600">Ou "Adicionar à tela inicial"</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <p className="font-medium">Confirme a instalação</p>
                  <p className="text-xs text-green-600">O app será instalado no seu dispositivo</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dica adicional */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Smartphone className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">💡 Dica:</p>
                <p className="text-xs mt-1">
                  Após a instalação, o app funcionará como um aplicativo nativo, 
                  com notificações e acesso offline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
