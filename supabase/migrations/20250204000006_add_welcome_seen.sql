-- Adicionar campo para controlar se o usuário já viu a página de boas-vindas
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
    END IF;
END $$;

-- Comentário para documentação
COMMENT ON COLUMN public.profiles.welcome_seen IS 'Indica se o usuário já viu a página de boas-vindas após o primeiro login';
