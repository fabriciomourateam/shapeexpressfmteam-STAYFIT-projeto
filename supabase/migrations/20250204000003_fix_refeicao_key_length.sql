-- Corrigir tamanho do campo refeicao_key na tabela progresso_refeicoes_diario
-- O campo estava limitado a 20 caracteres, mas os nomes dos alimentos são muito longos

-- Aumentar o tamanho do campo refeicao_key para 50 caracteres
ALTER TABLE public.progresso_refeicoes_diario 
ALTER COLUMN refeicao_key TYPE VARCHAR(50);

-- Atualizar comentário
COMMENT ON COLUMN public.progresso_refeicoes_diario.refeicao_key IS 'Chave da refeição (refeicao01, refeicao02, etc) - máximo 50 caracteres';
