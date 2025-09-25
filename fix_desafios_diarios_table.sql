-- Script para criar a tabela desafios_diarios se não existir
-- Execute este SQL no Supabase Dashboard (SQL Editor)

-- Verificar se a tabela existe e criar se necessário
DO $$ 
BEGIN
    -- Criar tabela desafios_diarios se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'desafios_diarios'
    ) THEN
        CREATE TABLE public.desafios_diarios (
            id SERIAL PRIMARY KEY,
            user_id UUID NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
            data DATE NOT NULL,
            hidratacao BOOLEAN NOT NULL DEFAULT FALSE,
            sono_qualidade BOOLEAN NOT NULL DEFAULT FALSE,
            atividade_fisica BOOLEAN NOT NULL DEFAULT FALSE,
            seguiu_dieta BOOLEAN NOT NULL DEFAULT FALSE,
            registro_visual BOOLEAN NOT NULL DEFAULT FALSE,
            pontuacao_total INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
            UNIQUE(user_id, data)
        );
        
        RAISE NOTICE 'Tabela desafios_diarios criada com sucesso';
    ELSE
        RAISE NOTICE 'Tabela desafios_diarios já existe';
    END IF;
END $$;

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.desafios_diarios ENABLE ROW LEVEL SECURITY;

-- Criar políticas RLS se não existirem
DO $$
BEGIN
    -- Política para visualizar próprios desafios
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'desafios_diarios' 
        AND policyname = 'Users can view their own daily challenges'
    ) THEN
        CREATE POLICY "Users can view their own daily challenges" ON public.desafios_diarios
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    -- Política para inserir próprios desafios
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'desafios_diarios' 
        AND policyname = 'Users can insert their own daily challenges'
    ) THEN
        CREATE POLICY "Users can insert their own daily challenges" ON public.desafios_diarios
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    -- Política para atualizar próprios desafios
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename = 'desafios_diarios' 
        AND policyname = 'Users can update their own daily challenges'
    ) THEN
        CREATE POLICY "Users can update their own daily challenges" ON public.desafios_diarios
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Criar trigger para updated_at se não existir
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_desafios_diarios_updated_at'
    ) THEN
        CREATE OR REPLACE FUNCTION public.update_updated_at_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        CREATE TRIGGER update_desafios_diarios_updated_at
            BEFORE UPDATE ON public.desafios_diarios
            FOR EACH ROW
            EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;

-- Comentários para documentação
COMMENT ON TABLE public.desafios_diarios IS 'Tabela para armazenar desafios diários dos usuários';
COMMENT ON COLUMN public.desafios_diarios.hidratacao IS 'Usuário bebeu água suficiente no dia';
COMMENT ON COLUMN public.desafios_diarios.sono_qualidade IS 'Usuário teve boa qualidade de sono';
COMMENT ON COLUMN public.desafios_diarios.atividade_fisica IS 'Usuário praticou atividade física';
COMMENT ON COLUMN public.desafios_diarios.seguiu_dieta IS 'Usuário seguiu a dieta recomendada';
COMMENT ON COLUMN public.desafios_diarios.registro_visual IS 'Usuário fez registro visual (foto)';
COMMENT ON COLUMN public.desafios_diarios.pontuacao_total IS 'Pontuação total do dia (soma de todas as atividades)';
