import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { parseWeight } from '@/lib/weightUtils';
import { Crown, Trophy, Target, Dumbbell, Zap, Users, TrendingUp } from 'lucide-react';

export default function Login() {
  const { user, signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Formulários
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ nome: '', email: '', password: '', pesoInicial: '' });

  // Redirecionar se já estiver logado
  if (user && !loading) {
    return <Navigate to="/welcome" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(loginData.email, loginData.password);
    
    if (error) {
      toast({
        title: "Erro ao fazer login",
        description: error.message,
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Converter peso inicial para número se fornecido (usando função utilitária)
    const pesoInicial = signupData.pesoInicial ? parseWeight(signupData.pesoInicial) : undefined;

    const { error } = await signUp(signupData.email, signupData.password, signupData.nome, pesoInicial);
    
    if (error) {
      toast({
        title: "Erro ao criar conta",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Conta criada com sucesso!",
        description: "Você já pode fazer login e começar seu desafio."
      });
    }
    setIsLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
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
      <div className="w-full max-w-lg relative z-10">
        {/* Header com logo e título */}
        <div className="text-center mb-8">
          {/* Logo com coroa */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-2xl relative">
            <Crown className="w-10 h-10 text-white" />
            {/* Badge roxo no canto */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">7</span>
            </div>
          </div>
          
          {/* Título principal */}
          <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-3">Shape Express</h1>
          
          {/* Subtítulo com estrelas */}
          <p className="text-gray-200 drop-shadow-md mb-3">
            <span className="text-2xl">✨</span> Transforme seus hábitos em 7 dias <span className="text-2xl">✨</span>
          </p>
          
          {/* Descrição */}
          <p className="text-gray-400 text-sm">
            Junte-se a milhares de pessoas que já transformaram suas vidas
          </p>
        </div>

        {/* Card principal */}
        <Card className="bg-white border-gray-200 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900">Bem-vindo de volta</CardTitle>
            <CardDescription className="text-gray-600">
              Entre ou crie sua conta para começar sua jornada
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-lg">
                <TabsTrigger value="login" className="rounded-md">Entrar</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-md">Criar Conta</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-900 font-medium">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      className="bg-gray-50 border-gray-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-900 font-medium">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="********"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      className="bg-gray-50 border-gray-200"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    <Zap className="w-4 h-4" />
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-nome" className="text-gray-900 font-medium">Nome completo</Label>
                    <Input
                      id="signup-nome"
                      type="text"
                      placeholder="Seu nome"
                      value={signupData.nome}
                      onChange={(e) => setSignupData({ ...signupData, nome: e.target.value })}
                      className="bg-gray-50 border-gray-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-900 font-medium">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      className="bg-gray-50 border-gray-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-900 font-medium">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="********"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      className="bg-gray-50 border-gray-200"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-peso" className="text-gray-900 font-medium">Peso inicial (kg) - Opcional</Label>
                    <Input
                      id="signup-peso"
                      type="number"
                      step="0.1"
                      min="30"
                      max="300"
                      placeholder="Ex: 70.5"
                      value={signupData.pesoInicial}
                      onChange={(e) => setSignupData({ ...signupData, pesoInicial: e.target.value })}
                      className="bg-gray-50 border-gray-200"
                    />
                    <p className="text-xs text-gray-500">
                      Ajuda a personalizar seus planos de dieta e treino
                    </p>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 rounded-lg shadow-lg flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    <Zap className="w-4 h-4" />
                    {isLoading ? 'Criando conta...' : 'Criar Conta'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            {/* Seção de benefícios */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 text-center mb-6">O que você vai conquistar:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Target className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-semibold">Transformação completa</span><br />
                      em apenas 7 dias
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <TrendingUp className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-semibold">Tarefas Gamificadas</span><br />
                      Sistema de pontos e conquistas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Dumbbell className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-semibold">Planos Personalizados</span><br />
                      Treino e dieta sob medida
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Trophy className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-semibold">Ranking Global</span><br />
                      Compete com outros usuários
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rodapé */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Ao continuar, você concorda com nossos termos de uso
          </p>
        </div>
      </div>
    </div>
  );
}