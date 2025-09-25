import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './use-auth';
import { Tables } from '@/integrations/supabase/types';

type ProgressoRefeicao = Tables<'progresso_refeicoes_diario'>;

interface UseMealProgressReturn {
  alimentosMarcados: Record<string, boolean>;
  loading: boolean;
  error: string | null;
  toggleAlimento: (refeicaoKey: string, alimento: string) => Promise<void>;
  getProgressoRefeicao: (refeicaoKey: string, alimentos: string[]) => { marcados: number; total: number };
  resetProgressoDiario: () => Promise<void>;
}

export function useMealProgress(): UseMealProgressReturn {
  const { user } = useAuth();
  const [alimentosMarcados, setAlimentosMarcados] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obter data atual no formato YYYY-MM-DD
  const getDataAtual = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Carregar progresso do dia atual
  const carregarProgressoDiario = useCallback(async () => {
    if (!user) {
      setAlimentosMarcados({});
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const dataAtual = getDataAtual();
      
      const { data, error: fetchError } = await supabase
        .from('progresso_refeicoes_diario')
        .select('*')
        .eq('user_id', user.id)
        .eq('data', dataAtual);

      if (fetchError) {
        throw fetchError;
      }

      // Converter array de progresso para objeto de alimentos marcados
      const progresso: Record<string, boolean> = {};
      data?.forEach(item => {
        const chave = `${item.refeicao_key}-${item.alimento}`;
        progresso[chave] = item.consumido;
      });

      setAlimentosMarcados(progresso);
    } catch (err: any) {
      setError(err.message || 'Erro ao carregar progresso');
      console.error('Erro ao carregar progresso:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Salvar progresso de um alimento
  const salvarProgressoAlimento = async (refeicaoKey: string, alimento: string, consumido: boolean) => {
    if (!user) return;

    try {
      const dataAtual = getDataAtual();
      const chave = `${refeicaoKey}-${alimento}`;

      // Usar upsert para inserir ou atualizar
      const { error } = await supabase
        .from('progresso_refeicoes_diario')
        .upsert({
          user_id: user.id,
          data: dataAtual,
          refeicao_key: refeicaoKey,
          alimento: alimento,
          consumido: consumido,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,data,refeicao_key,alimento'
        });

      if (error) {
        throw error;
      }

      // Atualizar estado local
      setAlimentosMarcados(prev => ({
        ...prev,
        [chave]: consumido
      }));
    } catch (err: any) {
      console.error('Erro ao salvar progresso:', err);
      setError(err.message || 'Erro ao salvar progresso');
    }
  };

  // Alternar estado de um alimento
  const toggleAlimento = async (refeicaoKey: string, alimento: string) => {
    const chave = `${refeicaoKey}-${alimento}`;
    const novoEstado = !alimentosMarcados[chave];
    
    await salvarProgressoAlimento(refeicaoKey, alimento, novoEstado);
  };

  // Obter progresso de uma refeição
  const getProgressoRefeicao = (refeicaoKey: string, alimentos: string[]) => {
    if (!alimentos || !Array.isArray(alimentos)) {
      return { marcados: 0, total: 0 };
    }
    
    const marcados = alimentos.filter(alimento => {
      const chave = `${refeicaoKey}-${alimento}`;
      return alimentosMarcados[chave] || false;
    }).length;
    
    return { marcados, total: alimentos.length };
  };

  // Resetar progresso diário (para testes ou admin)
  const resetProgressoDiario = async () => {
    if (!user) return;

    try {
      const dataAtual = getDataAtual();
      
      const { error } = await supabase
        .from('progresso_refeicoes_diario')
        .delete()
        .eq('user_id', user.id)
        .eq('data', dataAtual);

      if (error) {
        throw error;
      }

      setAlimentosMarcados({});
    } catch (err: any) {
      console.error('Erro ao resetar progresso:', err);
      setError(err.message || 'Erro ao resetar progresso');
    }
  };

  // Carregar progresso quando o usuário mudar
  useEffect(() => {
    carregarProgressoDiario();
  }, [carregarProgressoDiario]);

  return {
    alimentosMarcados,
    loading,
    error,
    toggleAlimento,
    getProgressoRefeicao,
    resetProgressoDiario
  };
}
