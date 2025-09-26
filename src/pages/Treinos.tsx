import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Toggle } from '@/components/ui/toggle';
import { Checkbox } from '@/components/ui/checkbox';
import { Dumbbell, Home, Building, Trophy, Award, Crown, Star, Flame, Play, Info, Settings, Clock } from 'lucide-react';
import { TrainingPersonalizationModal } from '@/components/TrainingPersonalizationModal';
import { useProfile } from '@/hooks/use-profile';
import { useExerciseProgress } from '@/hooks/use-exercise-progress';
import { getFilteredTrainings, getTrainingsByGender } from '@/lib/trainingUtils';

export default function Treinos() {
  const { profile, isTrainingPersonalized, refreshProfile } = useProfile();
  const { toggleExercicio, isExercicioRealizado, getProgressoDia } = useExerciseProgress();
  const [generoSelecionado, setGeneroSelecionado] = useState<'masculino' | 'feminino'>('masculino');
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);
  const [treinoAberto, setTreinoAberto] = useState<number | null>(null);

  const toggleTreino = (diaNumero: number) => {
    setTreinoAberto(treinoAberto === diaNumero ? null : diaNumero);
  };

  // Estados de loading para evitar flash do conteúdo padrão
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  // Verificar se precisa mostrar o modal de personalização
  useEffect(() => {
    if (profile && !isTrainingPersonalized) {
      // Não abrir automaticamente, deixar o usuário clicar no botão
      // setShowPersonalizationModal(true);
    }
    // Pequeno delay para garantir que a personalização foi aplicada
    const timer = setTimeout(() => setIsLoadingContent(false), 100);
    return () => clearTimeout(timer);
  }, [profile, isTrainingPersonalized]);

  // Verificação adicional para não mostrar conteúdo padrão durante transições
  useEffect(() => {
    // Quando não está personalizado mas há profile carregado, aguardar um pouco
    if (profile && !isTrainingPersonalized) {
      const timer = setTimeout(() => setIsLoadingContent(false), 200);
      return () => clearTimeout(timer);
    }
    
    // Quando está personalizado, liberar imediatamente
    if (profile && isTrainingPersonalized) {
      setIsLoadingContent(false);
    }
    // Pequeno delay para garantir que a personalização foi aplicada
    const timer = setTimeout(() => setIsLoadingContent(false), 100);
    return () => clearTimeout(timer);
  }, [profile, isTrainingPersonalized]);

  // Verificação adicional para não mostrar conteúdo padrão durante transições
  useEffect(() => {
    // Quando não está personalizado mas há profile carregado, aguardar um pouco
    if (profile && !isTrainingPersonalized) {
      const timer = setTimeout(() => setIsLoadingContent(false), 200);
      return () => clearTimeout(timer);
    }
  }, [profile, isTrainingPersonalized]);

  // Lógica de treinos baseada no perfil personalizado
  const treinosDetalhados = isTrainingPersonalized && profile?.sexo && profile?.frequencia_treino
    ? getFilteredTrainings(profile)
    : getTrainingsByGender(generoSelecionado);

  const treino = Object.values(treinosDetalhados)[0];

  const handlePersonalizationComplete = () => {
    setShowPersonalizationModal(false);
    refreshProfile();
  };

  // Renderizar modal sempre
  const modalComponent = (
    <TrainingPersonalizationModal
      isOpen={showPersonalizationModal}
      onClose={() => setShowPersonalizationModal(false)}
      onComplete={handlePersonalizationComplete}
    />
  );

  // Verificação para mostrar mensagem de personalização quando não estiver personalizado
  if (profile && !isTrainingPersonalized) {
    return (
      <div 
        className="min-h-screen text-white p-6 pb-6 lg:pb-6 relative flex items-center justify-center"
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
        
        <div className="relative z-10 text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Dumbbell className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Personalize seus Treinos
          </h1>
          
          <p className="text-gray-300 mb-8 text-lg">
            Para oferecer um plano de treino específico para você, precisamos conhecer melhor seu perfil e objetivos.
          </p>
          
          <Button
            onClick={() => setShowPersonalizationModal(true)}
            className="bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 text-white px-8 py-3 text-lg font-semibold"
          >
            Personalizar Agora
          </Button>
        </div>
        
        {/* Modal renderizado aqui */}
        {modalComponent}
      </div>
    );
  }

  // Verificação de segurança para evitar erro quando treino não existir ou ainda carregando
  if (!treino || isLoadingContent || (isTrainingPersonalized && (!profile?.sexo || !profile?.frequencia_treino))) {
    return (
      <div 
      
  // Verificação de segurança para evitar erro quando treino não existir ou ainda carregando
  if (!treino || isLoadingContent || (isTrainingPersonalized && (!profile?.sexo || !profile?.frequencia_treino))) {
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
        
        <div className="relative z-10 flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-300 mb-2">Carregando treinos personalizados...</h2>
            <p className="text-gray-400">Preparando seu plano de treino específico</p>
          </div>
        </div>
      </div>
    );
  }

  // Função para obter ícone do tipo de treino
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'academia': return <Building className="w-5 h-5" />;
      case 'casa': return <Home className="w-5 h-5" />;
      default: return <Dumbbell className="w-5 h-5" />;
    }
  };

  // Função para obter cor do tipo de treino
  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case 'academia': return 'from-blue-500 to-cyan-500';
      case 'casa': return 'from-green-500 to-emerald-500';
      default: return 'from-pink-500 to-orange-500';
    }
  };

  // Função para obter cores dos dias de treino
  const getDiaColors = (dia: number) => {
    const colors = [
      { card: 'from-red-50 to-pink-50', border: 'border-red-200', accent: 'from-red-400 to-pink-400', dot: 'from-red-400 to-pink-400', item: 'border-red-100', emoji: '💪' },
      { card: 'from-blue-50 to-cyan-50', border: 'border-blue-200', accent: 'from-blue-400 to-cyan-400', dot: 'from-blue-400 to-cyan-400', item: 'border-blue-100', emoji: '🏋️' },
      { card: 'from-green-50 to-emerald-50', border: 'border-green-200', accent: 'from-green-400 to-emerald-400', dot: 'from-green-400 to-emerald-400', item: 'border-green-100', emoji: '💥' },
      { card: 'from-purple-50 to-violet-50', border: 'border-purple-200', accent: 'from-purple-400 to-violet-400', dot: 'from-purple-400 to-violet-400', item: 'border-purple-100', emoji: '🔥' },
      { card: 'from-orange-50 to-yellow-50', border: 'border-orange-200', accent: 'from-orange-400 to-yellow-400', dot: 'from-orange-400 to-yellow-400', item: 'border-orange-100', emoji: '⚡' },
      { card: 'from-indigo-50 to-blue-50', border: 'border-indigo-200', accent: 'from-indigo-400 to-blue-400', dot: 'from-indigo-400 to-blue-400', item: 'border-indigo-100', emoji: '🎯' }
    ];
    return colors[(dia - 1) % colors.length];
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
        {/* Header com título centralizado e toggle de gênero */}
        <div className="text-center space-y-4 relative">
          {/* Toggle de Gênero - Só aparece se não estiver personalizado */}
          {!isTrainingPersonalized && (
        <div className="absolute top-0 right-0 sm:right-0 max-sm:relative max-sm:flex max-sm:justify-center max-sm:mb-4">
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 gap-1 max-sm:scale-90">
            <Toggle
              pressed={generoSelecionado === 'masculino'}
              onPressedChange={() => setGeneroSelecionado('masculino')}
                   className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${generoSelecionado === 'masculino'
                  ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              👨 Masculino
            </Toggle>
            <Toggle
              pressed={generoSelecionado === 'feminino'}
              onPressedChange={() => setGeneroSelecionado('feminino')}
                   className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${generoSelecionado === 'feminino'
                  ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-sm'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              👩 Feminino
            </Toggle>
          </div>
        </div>
           )}

        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold">
             <Dumbbell className="w-5 h-5" />
             {isTrainingPersonalized ? 'Seu Plano de Treino Personalizado' : 'Planos de Treino Shape Express'}
        </div>
           <p className="text-gray-100 max-w-2xl mx-auto diet-item">
             {!isTrainingPersonalized && 'Planos de treino personalizados para todos os níveis. Escolha o plano ideal para seus objetivos.'}
        </p>
      </div>

         {/* Card Superior de Informações */}
         <div className="flex justify-center mb-6">
           <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 w-full max-w-2xl">
        <div className="flex items-center justify-between">
              {/* Lado Esquerdo - Título e Frequência */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
          <div>
                  <h2 className="text-2xl font-bold text-white">
                    {treino.frequencia}
                  </h2>
                  {(treino as any).observacao && (
                    <p className="text-white/80 text-xs mt-1">
                      {(treino as any).observacao}
                    </p>
                  )}
          </div>
              </div>

               {/* Lado Direito - Tipo e Duração */}
               <div className="flex flex-col items-end gap-2">
                 <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                   {getTipoIcon(treino.tipo)}
                   <span className="ml-1 capitalize">{treino.tipo === 'academia' ? 'Academia' : 'Casa'}</span>
            </Badge>
                 <div className="flex items-center gap-1 text-white/90 text-sm">
                   <Clock className="w-4 h-4" />
                   <span>{treino.duracao}</span>
                 </div>
          </div>
        </div>
        
            {/* Botão de Orientações no Centro */}
            <div className="flex justify-center mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                variant="outline" 
                    className="bg-white/20 border-white/30 text-white hover:bg-white/30 hover:border-white/50 px-6 py-2 text-sm font-semibold"
              >
                <Info className="w-4 h-4 mr-2" />
                ORIENTAÇÕES IMPORTANTES
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white text-gray-900">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-yellow-600 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                      Orientações, Observações e Instruções: LEIA TUDO
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-6 text-gray-700">
                {/* Mentalidade de Treino */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <h3 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    🎯 MENTALIDADE DE TREINO
                  </h3>
                  <p className="text-sm text-blue-700 leading-relaxed mb-3">
                    Se dedique bastante nos treinos, foque totalmente em <strong>progressão de cargas e de esforço</strong>. Você deve literalmente <strong>DAR O MÁXIMO EM CADA TREINO</strong>, buscando fazer os movimentos de forma correta e dando seu melhor em cada treino que realizar, sempre focando em progredir nas cargas a cada treino, buscando a <strong>falha muscular</strong> em todos os exercícios.
                  </p>
                  <div className="bg-blue-100 border border-blue-200 rounded-lg p-3">
                    <p className="text-blue-800 font-semibold">
                      <strong>Falha = não conseguir realizar mais nenhuma repetição perfeita</strong>
                    </p>
                  </div>
                </div>

                {/* Como Identificar Falha */}
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-400 p-6 rounded-r-lg">
                      <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                    🎯 COMO IDENTIFICAR SE CHEGOU À FALHA
                  </h3>
                      <p className="text-sm text-green-700 leading-relaxed mb-3">
                        A ideia é você fazer as repetições previstas e não conseguir fazer mais nenhuma repetição com qualidade, pois faltará força para completar o movimento, falhando a musculatura.
                      </p>
                      <div className="bg-green-100 border border-green-200 rounded-lg p-4">
                        <h4 className="font-semibold text-green-800 mb-2">Exemplo prático:</h4>
                        <p className="text-sm text-green-700 mb-2">Se está prescrito para fazer 10 a 12 repetições:</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="text-green-600 font-bold">✅</span>
                            <span className="text-sm text-green-700">Caso faça 13 ou mais: significa que está leve, pode aumentar</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-red-600 font-bold">❌</span>
                            <span className="text-sm text-green-700">Caso faça 11 ou menos: significa que está pesado, pode diminuir um pouco</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-blue-600 font-bold">🎯</span>
                            <span className="text-sm text-green-700 font-semibold">Ideal: conseguir fazer exatamente 12 repetições e não conseguir fazer a 13ª com qualidade</span>
                          </div>
                        </div>
                  </div>
                </div>

                {/* Regras Fundamentais */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border-l-4 border-orange-400 p-6 rounded-r-lg">
                      <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
                    📋 REGRAS FUNDAMENTAIS
                  </h3>
                      <p className="text-sm text-orange-700 leading-relaxed mb-4">
                    Peço que siga exatamente como está previsto, <strong>sem acrescentar ou retirar séries nem exercícios</strong>.
                  </p>
                      <div className="bg-orange-100 border border-orange-200 rounded-lg p-4">
                        <h4 className="font-semibold text-orange-800 mb-3">Importante:</h4>
                        <ul className="space-y-2 text-sm text-orange-700">
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">1.</span>
                            <span>Sempre priorize técnica e amplitude de movimento</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">2.</span>
                            <span>Busque progressão de carga sempre que possível dentro da faixa de repetições prevista</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">3.</span>
                            <span>Mantenha 1 minuto ou mais de descanso entre as séries</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-orange-600 font-bold">4.</span>
                            <span><strong>NÃO TENHA MEDO DE USAR CARGAS ALTAS</strong>, pois é através disso que conseguiremos sinalizar da melhor maneira a hipertrofia. Precisamos fazer com que cada treino seja desafiador a ponto do seu corpo <strong>TER QUE ENTENDER QUE ELE DEVE EVOLUIR</strong> para suportar a pancada do treino que você está dando nele.</span>
                          </li>
                    </ul>
                  </div>
                </div>

                {/* Observações Importantes */}
                <div className="bg-gradient-to-r from-purple-50 to-violet-50 border-l-4 border-purple-400 p-6 rounded-r-lg">
                  <h3 className="font-bold text-purple-800 mb-4 flex items-center gap-2">
                    🔥 OBSERVAÇÕES IMPORTANTES PARA EXECUTAR EM CADA TREINO
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Aquecimento</h4>
                      <p className="text-sm text-purple-700">
                        <strong>No primeiro exercício do treino</strong> faça <strong>2 séries iniciais EXTRAS de 30 repetições</strong> como aquecimento, com uma carga leve/moderada
                      </p>
                    </div>

                    <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Descanso</h4>
                      <p className="text-sm text-purple-700">
                        O tempo <strong>MÍNIMO DE DESCANSO</strong> entre as séries e os exercícios é de <strong>60 A 90 SEGUNDOS</strong>
                      </p>
                    </div>

                    <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
                      <h4 className="font-semibold text-purple-800 mb-2">Cadência</h4>
                      <p className="text-sm text-purple-700 mb-2">
                        Faça uma <strong>cadência controlada</strong>, nem tão lenta e nem tão rápida
                      </p>
                          <p className="text-sm text-purple-700">
                        <strong>Exemplo:</strong> na extensora, 2 a 3 segundos na fase da subida e 2 a 3 segundos na fase da descida
                      </p>
                    </div>

                    <div className="bg-purple-100 border border-purple-200 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-800 mb-2">Progressão</h4>
                          <p className="text-sm text-purple-700">
                            <strong>SEMPRE BUSQUE PROGREDIR</strong> nas cargas a cada treino, aumentando a carga a cada série
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
           </Card>
      </div>

        {/* Dias de Treino */}
        <div className="space-y-4 sm:space-y-6">
          {treino.dias.map((dia, cardIndex) => {
          // Cores diferentes para cada card de treino
          const cardColors = [
            { bg: 'from-red-50 to-pink-50', border: 'border-red-200', accent: 'from-red-400 to-pink-400', dot: 'from-red-400 to-pink-400', item: 'border-red-100', emoji: '💪' },
            { bg: 'from-blue-50 to-cyan-50', border: 'border-blue-200', accent: 'from-blue-400 to-cyan-400', dot: 'from-blue-400 to-cyan-400', item: 'border-blue-100', emoji: '🏋️' },
            { bg: 'from-green-50 to-emerald-50', border: 'border-green-200', accent: 'from-green-400 to-emerald-400', dot: 'from-green-400 to-emerald-400', item: 'border-green-100', emoji: '💥' },
            { bg: 'from-purple-50 to-violet-50', border: 'border-purple-200', accent: 'from-purple-400 to-violet-400', dot: 'from-purple-400 to-violet-400', item: 'border-purple-100', emoji: '🔥' },
            { bg: 'from-orange-50 to-yellow-50', border: 'border-orange-200', accent: 'from-orange-400 to-yellow-400', dot: 'from-orange-400 to-yellow-400', item: 'border-orange-100', emoji: '⚡' },
            { bg: 'from-indigo-50 to-blue-50', border: 'border-indigo-200', accent: 'from-indigo-400 to-blue-400', dot: 'from-indigo-400 to-blue-400', item: 'border-indigo-100', emoji: '🎯' }
          ];
          const colors = cardColors[cardIndex % cardColors.length];
          
          return (
              <Card
                key={dia.dia}
                className={`bg-gradient-to-br ${colors.bg} ${colors.border} text-gray-900 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${colors.accent}/20 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10`}></div>
                <CardHeader className="pb-3 sm:pb-4 relative z-10 p-4 sm:p-6">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${colors.accent} shadow-lg`}>
                        <span className="text-white text-lg sm:text-xl font-bold">{dia.dia}</span>
                  </div>
                      <div className="flex-1">
                        <div 
                          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                          onClick={() => toggleTreino(dia.dia)}
                        >
                          <span className="text-xl sm:text-2xl">{colors.emoji}</span>
                          <span className="text-gray-800 font-bold text-sm sm:text-base">{dia.nome}</span>
                    </div>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1">{dia.grupo}</p>
                        {(() => {
                          const progresso = getProgressoDia(dia.dia, dia.exercicios.length);
                          return progresso.total > 0 ? (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto mt-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${progresso.porcentagem}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600 font-medium text-center sm:text-left">
                                {progresso.realizados}/{progresso.total} exercícios
                              </span>
                            </div>
                          ) : null;
                        })()}
                    </div>
            <Card
              key={dia.dia}
              className={`bg-gradient-to-br ${colors.bg} ${colors.border} text-gray-900 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03] hover:-translate-y-1 relative overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${colors.accent}/20 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10`}></div>
              <CardHeader className="pb-3 sm:pb-4 relative z-10 p-4 sm:p-6">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${colors.accent} shadow-lg`}>
                      <span className="text-white text-lg sm:text-xl font-bold">{dia.dia}</span>
                    </div>
                    <div className="flex-1">
                      <div 
                        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => toggleTreino(dia.dia)}
                      >
                        <span className="text-xl sm:text-2xl">{colors.emoji}</span>
                        <span className="text-gray-800 font-bold text-sm sm:text-base">{dia.nome}</span>
                      </div>
                    <p className="text-gray-600 text-sm mt-1">{dia.grupo}</p>
                    {(() => {
                      const progresso = getProgressoDia(dia.dia, dia.exercicios.length);
                      return progresso.total > 0 ? (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${progresso.porcentagem}%` }}
                            ></div>
                    </div>
                          <span className="text-xs text-gray-600 font-medium">
                            {progresso.realizados}/{progresso.total} exercícios
                          </span>
                        </div>
                      ) : null;
                    })()}
                  </div>
                </CardTitle>
              </CardHeader>
                
                {treinoAberto === dia.dia && (
              <CardContent className="space-y-3 relative z-10">
                    {dia.exercicios.map((exercicio, index) => {
                      const exercicioRealizado = isExercicioRealizado(dia.dia, exercicio.nome, index);
                      
                      return (
                        <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border ${colors.item} shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white/90 ${exercicioRealizado ? 'ring-2 ring-green-400 bg-green-50' : ''}`}>
                          <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3">
                            <div className="flex items-start gap-3 flex-1">
                              <Checkbox
                                checked={exercicioRealizado}
                                onCheckedChange={() => toggleExercicio(dia.dia, exercicio.nome, index)}
                                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-1 flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                  <h4 className="font-bold text-gray-800 leading-tight text-sm sm:text-base break-words">{exercicio.nome}</h4>
                                  {exercicioRealizado && (
                                    <span className="text-green-600 text-xs sm:text-sm font-semibold">✓ Concluído</span>
                                  )}
                      </div>
                                <div className="flex gap-1 sm:gap-2 flex-wrap">
                                  <Badge variant="outline" className="border-yellow-400 text-yellow-700 bg-yellow-50 font-semibold shadow-sm text-xs px-2 py-1">
                                    📊 {exercicio.series} séries
                                  </Badge>
                                  <Badge variant="outline" className="border-orange-400 text-orange-700 bg-orange-50 font-semibold shadow-sm text-xs px-2 py-1">
                                    🔄 {exercicio.repeticoes}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:ml-auto">
                      {exercicio.execucao && (
                                <Dialog>
                                  <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                                      onClick={(e) => e.stopPropagation()}
                                      className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 flex items-center gap-1 text-xs px-2 py-1 h-auto whitespace-nowrap"
                        >
                          <Play className="w-3 h-3" />
                                      <span className="hidden sm:inline">Ver Execução</span>
                                      <span className="sm:hidden">Ver</span>
                        </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-4xl">
                                    <DialogHeader>
                                      <DialogTitle>{exercicio.nome}</DialogTitle>
                                    </DialogHeader>
                                    <div className="aspect-video">
                                      <iframe
                                        src={exercicio.execucao.includes('youtube.com/shorts/')
                                          ? exercicio.execucao.replace('youtube.com/shorts/', 'youtube.com/embed/')
                                          : exercicio.execucao.includes('youtube.com/watch?v=')
                                          ? exercicio.execucao.replace('youtube.com/watch?v=', 'youtube.com/embed/')
                                          : exercicio.execucao
                                        }
                                        className="w-full h-full rounded-lg"
                                        allowFullScreen
                                        title={exercicio.nome}
                                      />
                                    </div>
                                  </DialogContent>
                                </Dialog>
                {dia.exercicios.map((exercicio, index) => {
                  const exercicioRealizado = isExercicioRealizado(dia.dia, exercicio.nome, index);
                  
                  return (
                    <div key={index} className={`bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border ${colors.item} shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white/90 ${exercicioRealizado ? 'ring-2 ring-green-400 bg-green-50' : ''}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 mb-3">
                        <div className="flex items-start gap-3 flex-1">
                          <Checkbox
                            checked={exercicioRealizado}
                            onCheckedChange={() => toggleExercicio(dia.dia, exercicio.nome, index)}
                            className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-1 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                              <h4 className="font-bold text-gray-800 leading-tight text-sm sm:text-base break-words">{exercicio.nome}</h4>
                              {exercicioRealizado && (
                                <span className="text-green-600 text-xs sm:text-sm font-semibold">✓ Concluído</span>
                              )}
                            </div>
                            <div className="flex gap-1 sm:gap-2 flex-wrap">
                              <Badge variant="outline" className="border-yellow-400 text-yellow-700 bg-yellow-50 font-semibold shadow-sm text-xs px-2 py-1">
                                📊 {exercicio.series} séries
                              </Badge>
                              <Badge variant="outline" className="border-orange-400 text-orange-700 bg-orange-50 font-semibold shadow-sm text-xs px-2 py-1">
                                🔄 {exercicio.repeticoes}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:ml-auto">
                      {exercicio.execucao && (
                            <Dialog>
                              <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                                  onClick={(e) => e.stopPropagation()}
                          className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 hover:border-red-300 flex items-center gap-1 text-xs px-2 py-1 h-auto whitespace-nowrap"
                        >
                          <Play className="w-3 h-3" />
                          <span className="hidden sm:inline">Ver Execução</span>
                          <span className="sm:hidden">Ver</span>
                        </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <DialogHeader>
                                  <DialogTitle>{exercicio.nome}</DialogTitle>
                                </DialogHeader>
                                <div className="aspect-video">
                                  <iframe
                                    src={exercicio.execucao.includes('youtube.com/shorts/')
                                      ? exercicio.execucao.replace('youtube.com/shorts/', 'youtube.com/embed/')
                                      : exercicio.execucao.includes('youtube.com/watch?v=')
                                      ? exercicio.execucao.replace('youtube.com/watch?v=', 'youtube.com/embed/')
                                      : exercicio.execucao
                                    }
                                    className="w-full h-full rounded-lg"
                                    allowFullScreen
                                    title={exercicio.nome}
                                  />
                                </div>
                              </DialogContent>
                            </Dialog>
                      )}
                    </div>
                    </div>
                  </div>
                      );
                    })}
              </CardContent>
                )}
            </Card>
          );
        })}
      </div>

        {/* Informações Adicionais */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Dicas para o Treino */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500">
              <span className="text-2xl">💡</span>
            </div>
                Dicas para o Treino
            </CardTitle>
          </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <span className="text-gray-300">Sempre faça aquecimento antes do treino</span>
            </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <span className="text-gray-300">Mantenha a execução correta dos exercícios</span>
            </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <span className="text-gray-300">Descanse de 48-72h entre treinos do mesmo grupo muscular</span>
            </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <span className="text-gray-300">Hidrate-se durante o treino</span>
            </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <span className="text-gray-300">Progrida gradualmente nas cargas</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                <span className="text-gray-300">Sempre busque chegar na falha muscular</span>
            </div>
          </CardContent>
        </Card>

        {/* Cardios */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-red-400 to-pink-500">
              <span className="text-2xl">❤️</span>
                </div>
              Cardios
            </CardTitle>
          </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-gray-300 font-semibold">▶️ APÓS O TREINO:</span>
      </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-gray-300 font-semibold">📍 OPÇÃO 01:</span>
                  <span className="text-gray-300"> 20 minutos de escada ou de caminhada rápida na esteira com a máxima inclinação que conseguir (sempre acima de 4º graus de inclinação), sem correr.</span>
            </div>
      </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-gray-300 font-semibold">📍 OPÇÃO 02 (para dias mais corridos):</span>
                  <span className="text-gray-300"> HIIT de 10 minutos na esteira ou na bike (1 minuto numa velocidade leve para 1 minuto na máxima velocidade)</span>
              </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="text-gray-300 font-semibold">📍 OPÇÃO 03:</span>
                  <span className="text-gray-300"> 30 minutos de bike, elíptico ou caminhada rápida na esteira ou na rua (sem inclinação).</span>
            </div>
                </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-2 h-2 bg-gradient-to-r from-red-400 to-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-300 font-semibold">⚠️ Não faça o cardio antes do treino.</span>
              </div>
                  <div>
                    <span className="text-gray-300 font-semibold">⚠️ Sempre mantenha uma intensidade a ponto de suar e da respiração se manter ofegante.</span>
                </div>
                  <div>
                    <span className="text-gray-300 font-semibold">⚠️ Caso não consiga fazer após o treino, pode fazer em um outro horário do dia, ou até mesmo em um dia sem treino.</span>
              </div>
              </div>
            </div>
          </CardContent>
        </Card>
              </div>
            </div>
              Dicas para o Treino
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="font-semibold text-yellow-400 mb-2">💪 Progressão de Cargas</h4>
                <p className="text-sm text-gray-100">
                  Sempre busque aumentar a carga a cada treino, mesmo que seja apenas 2,5kg. A progressão constante é fundamental para o crescimento muscular.
                </p>
            </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="font-semibold text-yellow-400 mb-2">⏰ Tempo de Descanso</h4>
                <p className="text-sm text-gray-100">
                  Respeite os intervalos de 60-90 segundos entre as séries. Isso garante a recuperação adequada para manter a intensidade.
                </p>
            </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="font-semibold text-yellow-400 mb-2">🎯 Técnica Primeiro</h4>
                <p className="text-sm text-gray-100">
                  Priorize sempre a execução correta antes de aumentar a carga. Uma boa técnica é mais importante que peso excessivo.
                </p>
            </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="font-semibold text-yellow-400 mb-2">🔥 Intensidade</h4>
                <p className="text-sm text-gray-100">
                  Dê o máximo em cada série, buscando a falha muscular. A intensidade é o que realmente importa para o crescimento.
                </p>
            </div>
            </div>
          </CardContent>
        </Card>

        {/* Cardios */}
        <Card className="bg-white/5 backdrop-blur-sm border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <div className="p-2 rounded-lg bg-gradient-to-r from-red-400 to-pink-500">
                <Flame className="w-5 h-5 text-white" />
              </div>
              Cardios
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-yellow-400 mb-3">🏃‍♂️ Opções de Cardio Pós-Treino</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-100 font-medium">Esteira (Caminhada Inclinada)</p>
                    <p className="text-xs text-gray-200">20 minutos, inclinação 8-12%, velocidade 4-6 km/h</p>
      </div>
              </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-100 font-medium">Bicicleta Ergométrica</p>
                    <p className="text-xs text-gray-200">20 minutos, resistência moderada, manter 70-80% da FC máxima</p>
            </div>
      </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-100 font-medium">Elíptico</p>
                    <p className="text-xs text-gray-200">20 minutos, resistência moderada, movimento fluido</p>
              </div>
              </div>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm text-red-200 font-medium">⚠️ Importante</p>
                  <p className="text-xs text-red-100 mt-1">
                    Faça o cardio APÓS o treino de musculação, nunca antes. 
                    Mantenha a intensidade moderada para não comprometer a recuperação muscular.
                  </p>
                  <p className="text-xs text-red-100 mt-1">
                    Caso não consiga fazer o cardio após o treino, pode fazer em um outro horário do dia.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}