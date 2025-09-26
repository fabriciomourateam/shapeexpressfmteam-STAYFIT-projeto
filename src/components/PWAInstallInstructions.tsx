import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone, Download, Share, Plus, Settings } from 'lucide-react';

export function PWAInstallInstructions() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Smartphone className="w-3 h-3 mr-1" />
          Como Instalar
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            📱 Instalar Shape Express
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Android Chrome */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center text-white text-xs font-bold">A</div>
                Android (Chrome)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <p>Toque no menu (⋮) no navegador</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <p>Selecione "Adicionar à tela inicial"</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <p>Toque em "Adicionar"</p>
              </div>
            </CardContent>
          </Card>

          {/* iOS Safari */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center text-white text-xs font-bold">🍎</div>
                iOS (Safari)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <p>Toque no botão de compartilhar (□↗)</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <p>Role para baixo e toque em "Adicionar à Tela de Início"</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <p>Toque em "Adicionar"</p>
              </div>
            </CardContent>
          </Card>

          {/* Vantagens */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-yellow-800">
                ✨ Vantagens do App
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-yellow-700">
              <p>• Acesso rápido direto da tela inicial</p>
              <p>• Funciona offline (cache inteligente)</p>
              <p>• Notificações push (em breve)</p>
              <p>• Experiência nativa</p>
              <p>• Sem necessidade de app store</p>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button 
              onClick={() => setIsOpen(false)}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
            >
              Entendi! 🚀
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
