import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { User, Dumbbell, Calendar } from 'lucide-react';

interface TrainingPersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function TrainingPersonalizationModal({ isOpen, onClose, onComplete }: TrainingPersonalizationModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [sexo, setSexo] = useState<'masculino' | 'feminino' | ''>('');
  const [frequenciaTreino, setFrequenciaTreino] = useState<string>('');

  const frequenciasTreino = [
    { value: '1-3', label: '1 a 3 vezes por semana', description: 'Treino moderado' },
    { value: '4', label: '4 vezes por semana', description: 'Treino intermediário' },
    { value: '5', label: '5 vezes por semana', description: 'Treino avançado' },
    { value: '6-7', label: '6 a 7 vezes por semana', description: 'Treino avançado' },
    { value: 'casa', label: 'Treino em casa', description: 'Exercícios sem equipamentos' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Validações
    if (!sexo) {
      toast({
        title: "Selecione o sexo",
        description: "Por favor, selecione seu sexo para personalizar seus treinos.",
        variant: "destructive"
      });
      return;
    }

    if (!frequenciaTreino) {
      toast({
        title: "Selecione a frequência",
        description: "Por favor, selecione quantas vezes por semana você quer treinar.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Dados de treino a serem salvos:', {
        sexo: sexo,
        frequencia_treino: frequenciaTreino,
        treino_personalizado: true,
        user_id: user.id
      });

      // Primeiro, verificar se o perfil existe
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 means "no rows found"
        throw fetchError;
      }

      // Se o perfil não existe, criar um novo
      if (!existingProfile) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            user_id: user.id,
            nome: 'Usuário', // Nome padrão
            sexo: sexo,
            frequencia_treino: frequenciaTreino,
            treino_personalizado: true
          });
        
        if (insertError) throw insertError;
      } else {
        // Se o perfil existe, atualizar
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            sexo: sexo,
            frequencia_treino: frequenciaTreino,
            treino_personalizado: true
          })
          .eq('user_id', user.id);
        
        if (updateError) throw updateError;
      }

      toast({
        title: "Treinos personalizados! 💪",
        description: "Agora você terá acesso a treinos específicos para você.",
      });

      onComplete();
    } catch (error: any) {
      toast({
        title: "Erro ao salvar dados",
        description: error.message || "Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white text-gray-900 shadow-2xl rounded-lg border-0">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Personalize seus treinos</CardTitle>
          <CardDescription className="text-gray-600">
            Para oferecer treinos específicos pra você, precisamos saber alguns dados.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sexo */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-gray-700">
                <User className="w-4 h-4" />
                Sexo
              </Label>
              <RadioGroup value={sexo} onValueChange={(value) => setSexo(value as 'masculino' | 'feminino')}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="masculino" id="masculino" />
                  <Label htmlFor="masculino" className="text-gray-700 cursor-pointer">
                    Masculino
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="feminino" id="feminino" />
                  <Label htmlFor="feminino" className="text-gray-700 cursor-pointer">
                    Feminino
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Frequência de Treino */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-4 h-4" />
                Quantas vezes por semana consegue treinar?
              </Label>
              <RadioGroup value={frequenciaTreino} onValueChange={setFrequenciaTreino}>
                {frequenciasTreino.map((freq) => (
                  <div key={freq.value} className="flex items-start space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <RadioGroupItem value={freq.value} id={freq.value} className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor={freq.value} className="text-gray-700 cursor-pointer font-medium">
                        {freq.label}
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">{freq.description}</p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-800 hover:bg-gray-300"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-400 to-purple-500 hover:opacity-90 text-white"
                disabled={loading}
              >
                {loading ? <Dumbbell className="mr-2 h-4 w-4 animate-spin" /> : null}
                Personalizar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
