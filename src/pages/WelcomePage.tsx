import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Target, Flame, Zap, ArrowRight, Play, SkipForward, Users } from 'lucide-react';

export default function WelcomePage() {
  const navigate = useNavigate();
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleStartChallenge = () => {
    navigate('/desafio-diario');
  };

  const handleSkipPresentation = () => {
    navigate('/desafio-diario');
  };

  const handleWatchOnYouTube = () => {
    window.open('https://www.youtube.com/watch?v=tIARHNm9dD4', '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-6 mb-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
            <Trophy className="w-4 h-4" />
            Desafio Shape Express
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            Bem-vindo ao Desafio!
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Assista ao vídeo de apresentação e comece sua jornada de transformação
          </p>
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm shadow-2xl">
            <CardContent className="p-0">
              <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                {!videoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                        <Play className="w-8 h-8 text-white ml-1" />
                      </div>
                      <p className="text-gray-300">Carregando vídeo...</p>
                    </div>
                  </div>
                )}
                <iframe
                  src="https://www.youtube.com/embed/tIARHNm9dD4?autoplay=0&rel=0&modestbranding=1"
                  className="w-full h-full"
                  allowFullScreen
                  title="Desafio 7 dias - Shape Express"
                  onLoad={() => setVideoLoaded(true)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={handleStartChallenge}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Começar o Desafio
          </Button>
          
          <Button
            onClick={handleSkipPresentation}
            variant="outline"
            className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600 hover:border-slate-500 px-8 py-4 text-lg font-semibold rounded-lg"
          >
            <SkipForward className="w-5 h-5 mr-2" />
            Pular Apresentação
          </Button>
        </div>

        {/* Motivational Text */}
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Prepare-se para uma jornada incrível de 7 dias que vai transformar seus hábitos e sua vida. Vamos começar?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-yellow-400/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">7</div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-semibold">Dias de Desafio</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-yellow-400/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-semibold">Foco nos Resultados</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-yellow-400/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
            <CardContent className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">∞</div>
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-semibold">Transformação</div>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Achieve Section */}
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900/95 to-black/95 border-slate-700 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">O que você vai conquistar:</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  <span className="text-lg">Hábitos saudáveis duradouros</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  <span className="text-lg">Melhora na qualidade do sono</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  <span className="text-lg">Mais energia e disposição</span>
                </div>
                <div className="flex items-center gap-3 text-gray-200">
                  <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                  <span className="text-lg">Resultados visíveis em 7 dias</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}