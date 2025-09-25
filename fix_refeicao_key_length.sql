-- Script para corrigir o tamanho do campo refeicao_key
-- Execute este SQL no Supabase Dashboard (SQL Editor)

-- Aumentar o tamanho do campo refeicao_key para 50 caracteres
ALTER TABLE public.progresso_refeicoes_diario 
ALTER COLUMN refeicao_key TYPE VARCHAR(50);

-- Atualizar comentário
COMMENT ON COLUMN public.progresso_refeicoes_diario.refeicao_key IS 'Chave da refeição (refeicao01, refeicao02, etc) - máximo 50 caracteres';

-- Verificar se a alteração foi aplicada
SELECT 
    column_name, 
    data_type, 
    character_maximum_length 
FROM information_schema.columns 
WHERE table_name = 'progresso_refeicoes_diario' 
AND column_name = 'refeicao_key';
