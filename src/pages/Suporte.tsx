import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { MessageCircle, Send, Loader2, Mail as MailIcon, Phone, Clock } from 'lucide-react';

export default function Suporte() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [mensagem, setMensagem] = useState('');
  const [titulo, setTitulo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [isEnviando, setIsEnviando] = useState(false);

  const handleEnviarDuvida = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mensagem.trim()) {
      toast({
        title: "❌ Mensagem vazia",
        description: "Por favor, digite sua dúvida antes de enviar.",
        variant: "destructive"
      });
      return;
    }

    if (!telefone.trim()) {
      toast({
        title: "❌ WhatsApp obrigatório",
        description: "Por favor, informe seu número do WhatsApp com DDD.",
        variant: "destructive"
      });
      return;
    }

    // Validar se tem DDD (pelo menos 10 dígitos)
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo.length < 10) {
      toast({
        title: "❌ DDD obrigatório",
        description: "Por favor, informe o DDD do seu WhatsApp (ex: 11 99999-9999).",
        variant: "destructive"
      });
      return;
    }

    setIsEnviando(true);

    try {
      // Formatar telefone: remover caracteres especiais e adicionar código do país
      const telefoneLimpo = telefone.replace(/\D/g, '');
      const telefoneFormatado = `55${telefoneLimpo}`;

      const payload = {
        usuario: user?.email || 'Anônimo',
        nome: user?.user_metadata?.nome || 'Usuário',
        telefone: telefoneFormatado,
        title: titulo.trim() || 'Nova dúvida',
        message: mensagem.trim(),
        data: new Date().toISOString(),
        origem: 'Shape Express App'
      };

      const response = await fetch('https://n8n.shapepro.shop/webhook/duvidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dúvida');
      }

      toast({
        title: "✅ Dúvida enviada com sucesso!",
        description: "Sua mensagem foi enviada. Você receberá nossa resposta pelo WhatsApp em breve.",
        duration: 5000
      });

      // Limpar formulário após envio bem-sucedido
      setMensagem('');
      setTitulo('');
      setTelefone('');
    } catch (error) {
      toast({
        title: "❌ Erro ao enviar dúvida",
        description: "Não foi possível enviar sua mensagem. Tente novamente em alguns minutos.",
        variant: "destructive",
        duration: 6000
      });
    } finally {
      setIsEnviando(false);
    }
  };

  return (
    <div 
      className="min-h-screen text-white p-6 pb-6 lg:pb-6 relative"
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)`
      }}
    >
      {/* Padrão quadriculado premium */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px'
        }}
      ></div>
      
      {/* Padrão mais sutil de pontos */}
      <div 
        className="absolute inset-0 opacity-15" 
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(203, 213, 225, 0.4) 0.5px, transparent 0.5px)`,
          backgroundSize: '8px 8px'
        }}
      ></div>
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
            <MessageCircle className="w-5 h-5" />
            Suporte FMTeam
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Suporte Completo
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Tire suas dúvidas sobre dieta, treino, acompanhamento ou qualquer questão técnica
          </p>
        </div>

        {/* Grid Principal */}
        <div className="grid gap-6 lg:grid-cols-2 max-w-6xl mx-auto">
          
          {/* Formulário de Dúvidas */}
          <Card className="bg-gradient-to-br from-slate-700/90 to-slate-800/90 border-slate-600 backdrop-blur-sm shadow-2xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white flex items-center justify-center gap-3">
                <MessageCircle className="w-6 h-6 text-yellow-400" />
                Envie sua Dúvida
              </CardTitle>
              <p className="text-gray-200">
                Escreva sua pergunta e receba nossa resposta pelo WhatsApp
              </p>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <form onSubmit={handleEnviarDuvida} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo" className="text-white font-medium">
                    Título da dúvida (opcional)
                  </Label>
                  <Input
                    id="titulo"
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex: Dúvida sobre alimentação pós-treino"
                    className="bg-white/20 border-slate-500 text-white placeholder-gray-300 focus:border-yellow-400 bg-slate-800/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone" className="text-white font-medium">
                    WhatsApp *
                  </Label>
                  <Input
                    id="telefone"
                    type="tel"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="Ex: (11) 99999-9999"
                    className="bg-white/20 border-slate-500 text-white placeholder-gray-300 focus:border-yellow-400 bg-slate-800/50"
                    required
                  />
                  <p className="text-gray-400 text-xs">
                    Obrigatório com DDD para receber resposta pelo WhatsApp
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem" className="text-white font-medium">
                    Sua dúvida *
                  </Label>
                  <Textarea
                    id="mensagem"
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    placeholder="Escreva sua dúvida detalhadamente aqui... Pode ser sobre dieta, treino, acompanhamento ou qualquer questão técnica."
                    className="min-h-[120px] bg-white/20 border-slate-500 text-white placeholder-gray-300 focus:border-yellow-400 resize-none bg-slate-800/50"
                    required
                  />
                  <p className="text-gray-300 text-sm">
                    {mensagem.length}/1000 caracteres
                  </p>
                </div>

                <Button 
                  type="submit"
                  disabled={isEnviando || !mensagem.trim() || !telefone.trim()}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  {isEnviando ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Dúvida
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Informações de Suporte */}
          <div className="space-y-6">
            {/* Tempo de Resposta */}
            <Card className="bg-gradient-to-br from-emerald-700/80 to-green-700/80 border-emerald-500/60 backdrop-blur-sm shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      ⚡ Resposta Rápida
                    </h3>
                    <p className="text-emerald-100 text-sm">
                      Resposta em até 24 horas úteis pelo WhatsApp
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Como Funciona */}
            <Card className="bg-gradient-to-br from-blue-700/80 to-cyan-700/80 border-blue-500/60 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-300" />
                  Como Funciona
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-white text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold text-white">1</div>
                  <p className="text-white">Escreva sua dúvida detalhadamente no formulário</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold text-white">2</div>
                  <p className="text-white">Clique em "Enviar Dúvida" para submeter</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center text-xs font-bold text-white">3</div>
                  <p className="text-white">Receba nossa resposta pelo WhatsApp em breve</p>
                </div>
              </CardContent>
            </Card>

            {/* Tipos de Dúvidas */}
            <Card className="bg-gradient-to-br from-purple-700/80 to-pink-700/80 border-purple-500/60 backdrop-blur-sm shadow-xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  🤔 Dúvidas Frequentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-white text-sm">
                <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                  <p className="text-white"><strong>• Treino:</strong> Execução de exercícios, séries, repetições</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                  <p className="text-white"><strong>• Dieta:</strong> Planejamento alimentar, substituições</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                  <p className="text-white"><strong>• Acompanhamento:</strong> Progresso, resultados, ajustes</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3 border border-white/10">
                  <p className="text-white"><strong>• Técnico:</strong> Erros, configurações, funcionamento</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Informativo */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-slate-600/60 backdrop-blur-sm shadow-xl">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-6 mb-4">
              <div className="flex items-center gap-2 text-white">
                <Phone className="w-5 h-5 text-yellow-400" />
                <span className="font-semibold text-white">WhatsApp</span>
              </div>
            </div>
            <p className="text-white">
              Suas dúvidas serão respondidas diretamente por mim e pela Equipe de Suporte especializado em nutrição e treino.
              Conte conosco para esclarecer qualquer questão!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
