import { Bell, BellOff, Clock, Droplets, Utensils, Dumbbell, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/hooks/use-notifications';

export function NotificationSettings() {
  const { isSupported, isEnabled } = useNotifications();

  if (!isSupported) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BellOff className="w-5 h-5" />
            Notificações não suportadas
          </CardTitle>
          <CardDescription className="text-gray-400">
            Seu navegador não suporta notificações push.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notificações Diárias
        </CardTitle>
        <CardDescription className="text-gray-400">
          Receba lembretes para manter sua rotina saudável.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {isEnabled ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-green-400" />
                <div className="text-center">
                  <p className="text-green-400 font-medium">Notificações Ativadas</p>
                  <p className="text-gray-400 text-sm">Você receberá lembretes diários automaticamente</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-white font-medium text-center">Seus lembretes diários:</h4>
              
              {/* Hidratação */}
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <Droplets className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white font-medium">Hidratação</p>
                  <p className="text-gray-400 text-sm">Lembrete para beber água</p>
                </div>
              </div>

              {/* Refeições */}
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <Utensils className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-white font-medium">Refeições</p>
                  <p className="text-gray-400 text-sm">Lembrete do almoço</p>
                </div>
              </div>

              {/* Treinos */}
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <Dumbbell className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-white font-medium">Treinos</p>
                  <p className="text-gray-400 text-sm">Hora do treino</p>
                </div>
              </div>

              {/* Planejamento */}
              <div className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-white font-medium">Planejamento</p>
                  <p className="text-gray-400 text-sm">Planejar refeições de amanhã</p>
                </div>
              </div>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium text-sm">Como funciona</p>
                  <p className="text-gray-400 text-xs mt-1">
                    As notificações são enviadas automaticamente todos os dias nos horários definidos 
                    para ajudar você a manter sua rotina saudável.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
              <Bell className="w-8 h-8 text-white" />
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Notificações em processo
              </h3>
              <p className="text-gray-400 text-sm">
                Aguardando permissão do navegador para ativar os lembretes diários.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
