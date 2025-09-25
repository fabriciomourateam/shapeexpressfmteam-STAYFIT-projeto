-- Adicionar campos de personalização de treinos ao perfil do usuário
DO $$ 
BEGIN
    -- Adicionar coluna frequencia_treino se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'frequencia_treino'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN frequencia_treino VARCHAR(20) CHECK (frequencia_treino IN ('1-3', '4', '5', '6-7', 'casa'));
        RAISE NOTICE 'Adicionada coluna frequencia_treino';
    END IF;

    -- Adicionar coluna treino_personalizado se não existir
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'profiles' 
        AND column_name = 'treino_personalizado'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN treino_personalizado BOOLEAN NOT NULL DEFAULT FALSE;
        RAISE NOTICE 'Adicionada coluna treino_personalizado';
    END IF;
END $$;

-- Criar índice para otimizar consultas por frequencia_treino (se não existir)
CREATE INDEX IF NOT EXISTS idx_profiles_frequencia_treino ON public.profiles(frequencia_treino);

-- Comentários para documentação
COMMENT ON COLUMN public.profiles.frequencia_treino IS 'Frequência de treino do usuário: 1-3, 4, 5, 6-7, casa';
COMMENT ON COLUMN public.profiles.treino_personalizado IS 'Indica se o usuário já completou o onboarding de personalização de treinos';
