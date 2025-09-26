-- Script para corrigir a tabela progresso_exercicios_diario
-- Execute este script no Supabase SQL Editor

-- Criar tabela para progresso diário dos exercícios
CREATE TABLE IF NOT EXISTS public.progresso_exercicios_diario (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  treino_dia INTEGER NOT NULL, -- 1, 2, 3, 4, 5, 6, 7
  exercicio_nome TEXT NOT NULL,
  exercicio_index INTEGER NOT NULL, -- índice do exercício no array
  realizado BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraint para evitar duplicatas
  UNIQUE(user_id, data, treino_dia, exercicio_nome, exercicio_index)
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_progresso_exercicios_user_data 
ON public.progresso_exercicios_diario(user_id, data);

CREATE INDEX IF NOT EXISTS idx_progresso_exercicios_treino_dia 
ON public.progresso_exercicios_diario(treino_dia, exercicio_nome);

-- RLS (Row Level Security)
ALTER TABLE public.progresso_exercicios_diario ENABLE ROW LEVEL SECURITY;

-- Política RLS: usuários só podem ver/editar seus próprios dados
DROP POLICY IF EXISTS "Users can manage their own exercise progress" ON public.progresso_exercicios_diario;
CREATE POLICY "Users can manage their own exercise progress" 
ON public.progresso_exercicios_diario
FOR ALL 
USING (auth.uid() = user_id);

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para updated_at
DROP TRIGGER IF EXISTS update_progresso_exercicios_diario_updated_at ON public.progresso_exercicios_diario;
CREATE TRIGGER update_progresso_exercicios_diario_updated_at 
    BEFORE UPDATE ON public.progresso_exercicios_diario 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
