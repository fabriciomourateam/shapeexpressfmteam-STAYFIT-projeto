-- Script para adicionar o campo welcome_seen na tabela profiles
-- Execute este script no Supabase SQL Editor

-- Adicionar coluna welcome_seen se não existir
DO $$ 
BEGIN
    -- Adicionar coluna welcome_seen se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'welcome_seen'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN welcome_seen BOOLEAN NOT NULL DEFAULT FALSE;
        RAISE NOTICE 'Adicionada coluna welcome_seen';
    ELSE
        RAISE NOTICE 'Coluna welcome_seen já existe';
    END IF;
END $$;

-- Comentário para documentação
COMMENT ON COLUMN public.profiles.welcome_seen IS 'Indica se o usuário já viu a página de boas-vindas após o primeiro login';

-- Verificar se a coluna foi criada
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles' 
AND column_name = 'welcome_seen';
