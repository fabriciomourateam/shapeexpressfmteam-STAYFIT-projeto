import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/use-auth';

interface ExerciseProgress {
  id: string;
  user_id: string;
  data: string;
  treino_dia: number;
  exercicio_nome: string;
  exercicio_index: number;
  realizado: boolean;
  created_at: string;
  updated_at: string;
}

export function useExerciseProgress() {
  const { user } = useAuth();
  const [progresso, setProgresso] = useState<ExerciseProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Buscar progresso do dia atual
  const fetchProgresso = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const hoje = new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('progresso_exercicios_diario')
        .select('*')
        .eq('user_id', user.id)
        .eq('data', hoje);

      if (error) throw error;

      setProgresso(data || []);
    } catch (err) {
      console.error('Erro ao buscar progresso dos exercícios:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Toggle do exercício (marcar/desmarcar)
  const toggleExercicio = useCallback(async (
    treinoDia: number,
    exercicioNome: string,
    exercicioIndex: number
  ) => {
    if (!user) return;

    try {
      const hoje = new Date().toISOString().split('T')[0];

      // Verificar se já existe um registro para este exercício hoje
      const { data: existingData } = await supabase
        .from('progresso_exercicios_diario')
        .select('*')
        .eq('user_id', user.id)
        .eq('data', hoje)
        .eq('treino_dia', treinoDia)
        .eq('exercicio_nome', exercicioNome)
        .eq('exercicio_index', exercicioIndex)
        .single();

      if (existingData) {
        // Atualizar registro existente
        const novoStatus = !existingData.realizado;
        
        const { error } = await supabase
          .from('progresso_exercicios_diario')
          .update({ realizado: novoStatus })
          .eq('id', existingData.id);

        if (error) throw error;

        // Atualizar estado local
        setProgresso(prev => 
          prev.map(item => 
            item.id === existingData.id 
              ? { ...item, realizado: novoStatus }
              : item
          )
        );
      } else {
        // Criar novo registro
        const { data: newData, error } = await supabase
          .from('progresso_exercicios_diario')
          .insert({
            user_id: user.id,
            data: hoje,
            treino_dia: treinoDia,
            exercicio_nome: exercicioNome,
            exercicio_index: exercicioIndex,
            realizado: true
          })
          .select()
          .single();

        if (error) throw error;

        // Atualizar estado local
        setProgresso(prev => [...prev, newData]);
      }
    } catch (err) {
      console.error('Erro ao atualizar progresso do exercício:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    }
  }, [user]);

  // Verificar se um exercício foi realizado hoje
  const isExercicioRealizado = useCallback((
    treinoDia: number,
    exercicioNome: string,
    exercicioIndex: number
  ) => {
    return progresso.some(item => 
      item.treino_dia === treinoDia &&
      item.exercicio_nome === exercicioNome &&
      item.exercicio_index === exercicioIndex &&
      item.realizado
    );
  }, [progresso]);

  // Calcular progresso do dia (quantos exercícios foram realizados)
  const getProgressoDia = useCallback((treinoDia: number, totalExercicios: number) => {
    const exerciciosRealizados = progresso.filter(item => 
      item.treino_dia === treinoDia && item.realizado
    ).length;
    
    return {
      realizados: exerciciosRealizados,
      total: totalExercicios,
      porcentagem: totalExercicios > 0 ? Math.round((exerciciosRealizados / totalExercicios) * 100) : 0
    };
  }, [progresso]);

  // Buscar progresso quando o usuário muda
  useEffect(() => {
    fetchProgresso();
  }, [fetchProgresso]);

  return {
    progresso,
    loading,
    error,
    toggleExercicio,
    isExercicioRealizado,
    getProgressoDia,
    refreshProgresso: fetchProgresso
  };
}
