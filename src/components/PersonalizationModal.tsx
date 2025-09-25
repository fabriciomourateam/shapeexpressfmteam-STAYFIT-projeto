import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';
import { User, Heart, Ruler } from 'lucide-react';

interface PersonalizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function PersonalizationModal({ isOpen, onClose, onComplete }: PersonalizationModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Form data - sexo e altura para registro
  const [sexo, setSexo] = useState<'masculino' | 'feminino' | ''>('');
  const [altura, setAltura] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    // Validações
    if (!sexo) {
      toast({
        title: "Selecione o sexo",
        description: "Por favor, selecione seu sexo para personalizar sua dieta.",
        variant: "destructive"
      });
      return;
    }

    if (!altura) {
      toast({
        title: "Informe a altura",
        description: "Por favor, informe sua altura para completar o perfil.",
        variant: "destructive"
      });
      return;
    }

    const alturaNum = parseFloat(altura);

    if (alturaNum < 1.0 || alturaNum > 2.5) {
      toast({
        title: "Altura inválida",
        description: "A altura deve estar entre 1.0m e 2.5m.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      console.log('Dados a serem salvos:', {
        sexo: sexo,
        altura: alturaNum,
        perfil_personalizado: true,
        user_id: user.id
      });

      // Primeiro, verificar se o perfil existe
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('user_id')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
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
            altura: alturaNum,
            perfil_personalizado: true
          });
        
        if (insertError) throw insertError;
      } else {
        // Se o perfil existe, atualizar
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            sexo: sexo,
            altura: alturaNum,
            perfil_personalizado: true
          })
          .eq('user_id', user.id);
        
        if (updateError) throw updateError;
      }

      toast({
        title: "Perfil personalizado! 🎉",
        description: "Agora você terá acesso a dietas específicas para você.",
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
      <Card className="w-full max-w-md bg-white shadow-2xl rounded-lg border-0">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-gray-900">Personalize sua experiência</CardTitle>
          <CardDescription className="text-gray-600">
            Para oferecer uma dieta específica pra você, precisamos saber mais alguns dados.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Altura */}
            <div className="space-y-2">
              <Label htmlFor="altura" className="flex items-center gap-2 text-gray-700">
                <Ruler className="w-4 h-4" />
                Altura (m)
              </Label>
              <Input
                id="altura"
                type="number"
                step="0.01"
                min="1.0"
                max="2.5"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="Ex: 1.75"
                className="text-gray-900"
                required
              />
            </div>

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

            {/* Botões */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
                disabled={loading}
              >
                Pular por enquanto
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:opacity-90 text-white"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Personalizar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
