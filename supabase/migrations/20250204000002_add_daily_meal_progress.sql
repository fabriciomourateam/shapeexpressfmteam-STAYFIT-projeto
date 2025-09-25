-- Criar tabela para progresso diário das refeições
CREATE TABLE public.progresso_refeicoes_diario (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  data DATE NOT NULL,
  refeicao_key VARCHAR(20) NOT NULL, -- refeicao01, refeicao02, etc
  alimento TEXT NOT NULL,
  consumido BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, data, refeicao_key, alimento)
);

-- Criar índices para otimizar consultas
CREATE INDEX idx_progresso_refeicoes_user_data ON public.progresso_refeicoes_diario(user_id, data);
CREATE INDEX idx_progresso_refeicoes_data ON public.progresso_refeicoes_diario(data);

-- Comentários para documentação
COMMENT ON TABLE public.progresso_refeicoes_diario IS 'Armazena o progresso diário das refeições de cada usuário';
COMMENT ON COLUMN public.progresso_refeicoes_diario.refeicao_key IS 'Chave da refeição (refeicao01, refeicao02, etc)';
COMMENT ON COLUMN public.progresso_refeicoes_diario.alimento IS 'Nome do alimento consumido';
COMMENT ON COLUMN public.progresso_refeicoes_diario.consumido IS 'Se o alimento foi consumido no dia';
