import { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

// Função para determinar a faixa de peso baseada no peso atual
export function getWeightRange(peso: number): string {
  if (peso <= 60) return '60kg';
  if (peso <= 70) return '70kg';
  if (peso <= 80) return '80kg';
  if (peso <= 90) return '90kg';
  if (peso <= 100) return '100kg';
  return '110kg';
}

// Função para obter o plano de dieta recomendado baseado no perfil
export function getRecommendedDietPlan(profile: Profile | null): string | null {
  if (!profile || !profile.peso_inicial || !profile.sexo) {
    return null;
  }

  const peso = profile.peso_inicial;
  const sexo = profile.sexo;
  const faixaPeso = getWeightRange(peso);

  // Retorna a chave do plano no formato esperado pela página de dietas
  return faixaPeso;
}

// Função para filtrar planos baseado no perfil do usuário
export function getFilteredDietPlans(profile: Profile | null) {
  if (!profile || !profile.sexo) {
    return {};
  }

  // Retorna um plano padrão baseado no sexo e peso
  const peso = profile.peso_inicial || 70; // Fallback para 70kg se não tiver peso_inicial
  const faixaPeso = getWeightRange(peso);
  
  // Plano padrão masculino
  const planoMasculino = {
    [faixaPeso]: {
      nome: `Plano ${faixaPeso}`,
      descricao: 'Plano nutricional personalizado para homens',
      faixaPeso: `Ideal para: ${faixaPeso}`,
      genero: 'masculino' as const,
      refeicoes: {
        refeicao01: [
          '1 Pão francês sem miolo (60g)',
          'Ovo inteiro - 2 unidades (100g)',
          'Mamão Papaia - 0.5 unidade média (155g)',
          'Café sem açúcar ou com adoçante - À vontade'
        ],
        refeicao02: [
          'Aveia - 20g',
          'Banana - 1 unidade média (70g)'
        ],
        refeicao03: [
          'Arroz branco ou integral cozido - 100g',
          'Feijão cozido - 50g',
          'Peito de frango cozido, assado ou grelhado - 100g',
          'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
          'Salada de folhas, tomate e cebola (sem azeite) - À vontade'
        ],
        refeicao04: [
          'Iogurte desnatado, zero ou light - 1 unidade (170ml)',
          'Aveia - 20g',
          'Banana - 1 unidade média (70g)'
        ],
        refeicao05: [
          'Peito de frango cozido, assado ou grelhado - 150g',
          'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 150g',
          'Salada de folhas, tomate e cebola (sem azeite) - À vontade'
        ]
      },
      horarios: [
        'Refeição 01: 7h – 9h',
        'Refeição 02: 10h – 11h',
        'Refeição 03: 12h – 14h',
        'Refeição 04: 15h – 17h',
        'Refeição 05: 19h – 21h'
      ],
      dicas: [
        'Beba 2-3 litros de água por dia',
        'Evite frituras e doces',
        'Não pule refeições',
        'Respeite os intervalos entre refeições'
      ]
    }
  };

  // Plano padrão feminino
  const planoFeminino = {
    [faixaPeso]: {
      nome: `Plano ${faixaPeso}`,
      descricao: 'Plano nutricional personalizado para mulheres',
      faixaPeso: `Ideal para: ${faixaPeso}`,
      genero: 'feminino' as const,
      refeicoes: {
        refeicao01: [
          '1 pão francês sem miolo (40g)',
          'Ovo inteiro – 2 unidades (100g)',
          'Mamão papaia – 0,5 unidade média (155g)',
          'Café sem açúcar ou com adoçante – à vontade'
        ],
        refeicao02: [
          'Aveia – 20g',
          'Banana – 1 unidade pequena (60g)'
        ],
        refeicao03: [
          'Arroz cozido – 80g',
          'Feijão cozido – 60g',
          'Peito de frango grelhado – 100g',
          'Legumes cozidos – à vontade',
          'Salada crua (folhas, tomate e cebola, sem azeite) – à vontade'
        ],
        refeicao04: [
          'Iogurte desnatado – 1 unidade (170ml)',
          'Granola light – 30g',
          'Banana – 1 unidade pequena (60g)'
        ],
        refeicao05: [
          'Arroz cozido – 80g',
          'Peito de frango grelhado – 100g',
          'Legumes cozidos – 100g',
          'Salada crua – à vontade'
        ]
      },
      horarios: [
        'Refeição 01: 7h – 9h',
        'Refeição 02: 10h – 11h',
        'Refeição 03: 12h – 14h',
        'Refeição 04: 15h – 17h',
        'Refeição 05: 19h – 21h'
      ],
      dicas: [
        'Beba 2-3 litros de água por dia',
        'Evite frituras e doces',
        'Não pule refeições',
        'Respeite os intervalos entre refeições'
      ]
    }
  };

  return profile.sexo === 'masculino' ? planoMasculino : planoFeminino;
}
