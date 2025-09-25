-- Adicionar campos de personalização ao perfil do usuário
DO $$ 
BEGIN
    -- Adicionar coluna altura se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'altura'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN altura NUMERIC(5,2);
        RAISE NOTICE 'Adicionada coluna altura';
    END IF;

    -- Adicionar coluna sexo se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'sexo'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN sexo VARCHAR(10) CHECK (sexo IN ('masculino', 'feminino'));
        RAISE NOTICE 'Adicionada coluna sexo';
    END IF;

    -- Adicionar coluna perfil_personalizado se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'perfil_personalizado'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN perfil_personalizado BOOLEAN NOT NULL DEFAULT FALSE;
        RAISE NOTICE 'Adicionada coluna perfil_personalizado';
    END IF;
END $$;

-- Criar índice para otimizar consultas por sexo (se não existir)
CREATE INDEX IF NOT EXISTS idx_profiles_sexo ON public.profiles(sexo);

-- Comentários para documentação
COMMENT ON COLUMN public.profiles.altura IS 'Altura do usuário em metros (ex: 1.75)';
COMMENT ON COLUMN public.profiles.sexo IS 'Sexo do usuário: masculino ou feminino';
COMMENT ON COLUMN public.profiles.perfil_personalizado IS 'Indica se o usuário já completou o onboarding de personalização';
