import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Coffee, Utensils, Apple, Trophy, ChevronDown, ChevronRight, CheckCircle2 } from 'lucide-react';
import { PersonalizationModal } from '@/components/PersonalizationModal';
import { SubstitutionAppModal } from '@/components/SubstitutionAppModal';
import { useProfile } from '@/hooks/use-profile';
import { useMealProgress } from '@/hooks/use-meal-progress';
import { getRecommendedDietPlan, getFilteredDietPlans } from '@/lib/dietUtils';

interface PlanoDetalhes {
  nome: string;
  descricao: string;
  faixaPeso: string;
  genero: 'masculino' | 'feminino';
  refeicoes: {
    refeicao01: string[];
    refeicao02: string[];
    refeicao03: string[];
    refeicao04: string[];
    refeicao05: string[];
  };
  horarios: string[];
  dicas: string[];
}

// Estrutura unificada com identificadores únicos
const todosOsPlanos: Record<string, PlanoDetalhes> = {
  // PLANOS MASCULINOS
  'masc-60kg': {
    nome: 'Plano até 60kg',
    descricao: 'Plano nutricional equilibrado para manutenção de peso',
    faixaPeso: 'Ideal para: até 60kg',
    genero: 'masculino',
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
  },

  'masc-70kg': {
    nome: 'Plano 60-70kg',
    descricao: 'Plano nutricional balanceado para energia sustentada',
    faixaPeso: 'Ideal para: 60kg - 70kg',
    genero: 'masculino',
    refeicoes: {
      refeicao01: [
        '1 Pão francês sem miolo (60g)',
        'Ovo inteiro - 3 unidades (150g)',
        'Mamão Papaia - 0.5 unidade média (155g)',
        'Café sem açúcar ou com adoçante - À vontade'
      ],
      refeicao02: [
        'Aveia - 30g',
        'Banana - 2 unidades médias (140g)'
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
        'Peito de frango cozido, assado ou grelhado - 100g',
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
  },

  'masc-80kg': {
    nome: 'Plano 70-80kg',
    descricao: 'Plano nutricional robusto para maior demanda energética',
    faixaPeso: 'Ideal para: 70kg - 80kg',
    genero: 'masculino',
    refeicoes: {
      refeicao01: [
        '1 Pão francês sem miolo (60g)',
        'Ovo inteiro - 3 unidades (150g)',
        'Mamão Papaia - 1 unidade média (310g)',
        'Café sem açúcar ou com adoçante - À vontade'
      ],
      refeicao02: [
        'Aveia - 30g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao03: [
        'Arroz branco ou integral cozido - 125g',
        'Feijão cozido - 80g',
        'Peito de frango cozido, assado ou grelhado - 100g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
        'Salada de folhas, tomate e cebola (sem azeite) - À vontade'
      ],
      refeicao04: [
        'Iogurte desnatado, zero ou light - 1 unidade (170ml)',
        'Granola Zero ou Light - 30g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao05: [
        'Arroz branco ou integral cozido - 100g',
        'Peito de frango cozido, assado ou grelhado - 100g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
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
      'Mantenha bem os alimentos',
      'Respeite os intervalos entre refeições'
    ]
  },

  'masc-80kg-veg': {
    nome: 'Plano 70-80kg (Vegetariano)',
    descricao: 'Plano nutricional vegetariano completo e balanceado',
    faixaPeso: 'Ideal para: 70kg - 80kg',
    genero: 'masculino',
    refeicoes: {
      refeicao01: [
        '1 Pão francês sem miolo (60g)',
        'Ovo inteiro - 3 unidades (150g)',
        'Mamão Papaia - 1 unidade média (310g)',
        'Café sem açúcar ou com adoçante - À vontade'
      ],
      refeicao02: [
        'Aveia - 30g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao03: [
        'Arroz branco ou integral cozido - 150g',
        'Feijão cozido - 80g',
        'Ovo inteiro - 2 unidades (100g)',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
        'Salada de folhas, tomate e cebola (sem azeite) - À vontade'
      ],
      refeicao04: [
        'Iogurte desnatado, zero ou light - 1 unidade (170ml)',
        'Granola Zero ou Light - 30g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao05: [
        'Arroz branco ou integral cozido - 100g',
        'Ovo inteiro - 2 unidades (100g)',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
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
  },

  'masc-90kg': {
    nome: 'Plano 80-90kg',
    descricao: 'Plano nutricional intensivo para alta demanda energética',
    faixaPeso: 'Ideal para: 80kg - 90kg',
    genero: 'masculino',
    refeicoes: {
      refeicao01: [
        '1 Pão francês sem miolo (60g)',
        'Ovo inteiro - 3 unidades (150g)',
        'Mamão Papaia - 1 unidade média (310g)',
        'Café sem açúcar ou com adoçante - À vontade'
      ],
      refeicao02: [
        'Aveia - 30g',
        'Banana - 2 unidades médias (140g)'
      ],
      refeicao03: [
        'Arroz branco ou integral cozido - 150g',
        'Feijão cozido - 80g',
        'Peito de frango cozido, assado ou grelhado - 150g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
        'Salada de folhas, tomate e cebola (sem azeite) - À vontade'
      ],
      refeicao04: [
        'Iogurte desnatado, zero ou light - 1 unidade (170ml)',
        'Granola Zero ou Light - 40g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao05: [
        'Arroz branco ou integral cozido - 100g',
        'Peito de frango cozido, assado ou grelhado - 125g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
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
      'Beba 3-4 litros de água por dia',
      'Evite frituras e doces',
      'Não pule refeições',
      'Respeite os intervalos entre refeições'
    ]
  },

  'masc-90kg+': {
    nome: 'Plano 90kg ou mais',
    descricao: 'Plano nutricional completo para máxima performance',
    faixaPeso: 'Ideal para: 90kg ou mais',
    genero: 'masculino',
    refeicoes: {
      refeicao01: [
        '1 Pão francês sem miolo (60g)',
        'Ovo inteiro - 3 unidades (150g)',
        'Mamão Papaia - 1 unidade média (310g)',
        'Café sem açúcar ou com adoçante - À vontade'
      ],
      refeicao02: [
        'Aveia - 30g',
        'Mel de abelha - 10g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao03: [
        'Arroz branco ou integral cozido - 150g',
        'Feijão cozido - 80g',
        'Peito de frango cozido, assado ou grelhado - 125g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
        'Salada de folhas, tomate e cebola (sem azeite) - À vontade'
      ],
      refeicao04: [
        'Iogurte desnatado, zero ou light - 1 unidade (170ml)',
        'Granola Zero ou Light - 40g',
        'Banana - 2 unidades médias (140g)'
      ],
      refeicao05: [
        'Arroz branco ou integral cozido - 150g',
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
      'Beba 3-4 litros de água por dia',
      'Evite frituras e doces',
      'Não pule refeições',
      'Respeite os intervalos entre refeições'
    ]
  },

  // PLANOS FEMININOS
  'fem-60kg': {
    nome: 'Plano até 60kg',
    descricao: 'Plano nutricional equilibrado para manutenção de peso',
    faixaPeso: 'Ideal para: até 60kg',
    genero: 'feminino',
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
  },

  'fem-70kg': {
    nome: 'Plano 60-70kg',
    descricao: 'Plano nutricional balanceado para energia sustentada',
    faixaPeso: 'Ideal para: 60kg - 70kg',
    genero: 'feminino',
    refeicoes: {
      refeicao01: [
        '1 Pão francês sem miolo (40g)',
        'Ovo inteiro - 2 unidades (100g)',
        'Mamão Papaia - 0.5 unidade média (155g)',
        'Café sem açúcar ou com adoçante - À vontade'
      ],
      refeicao02: [
        'Aveia - 15g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao03: [
        'Arroz branco ou integral cozido - 75g',
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
        'Peito de frango cozido, assado ou grelhado - 100g',
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
  },

  'fem-80kg': {
    nome: 'Plano 70-80kg',
    descricao: 'Plano nutricional robusto para maior demanda energética',
    faixaPeso: 'Ideal para: 70kg - 80kg',
    genero: 'feminino',
    refeicoes: {
      refeicao01: [
        '1 Pão francês sem miolo (40g)',
        'Ovo inteiro - 2 unidades (100g)',
        'Mamão Papaia - 0.5 unidade média (155g)',
        'Café sem açúcar ou com adoçante - À vontade'
      ],
      refeicao02: [
        'Aveia - 25g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao03: [
        'Arroz branco ou integral cozido - 100g',
        'Feijão cozido - 80g',
        'Peito de frango cozido, assado ou grelhado - 100g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
        'Salada de folhas, tomate e cebola (sem azeite) - À vontade'
      ],
      refeicao04: [
        'Iogurte desnatado, zero ou light - 1 unidade (170ml)',
        'Granola Zero ou Light - 30g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao05: [
        'Arroz branco ou integral cozido - 100g',
        'Peito de frango cozido, assado ou grelhado - 100g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
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
      'Mantenha bem os alimentos',
      'Respeite os intervalos entre refeições'
    ]
  },

  'fem-80kg-veg': {
    nome: 'Plano 70-80kg (Vegetariano)',
    descricao: 'Plano nutricional vegetariano completo e balanceado',
    faixaPeso: 'Ideal para: 70kg - 80kg',
    genero: 'feminino',
    refeicoes: {
      refeicao01: [
        '1 Pão francês sem miolo (40g)',
        'Ovo inteiro - 2 unidades (100g)',
        'Mamão Papaia - 0.5 unidade média (155g)',
        'Café sem açúcar ou com adoçante - À vontade'
      ],
      refeicao02: [
        'Aveia - 25g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao03: [
        'Arroz branco ou integral cozido - 100g',
        'Feijão cozido - 80g',
        'Ovo inteiro - 2 unidades (100g)',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
        'Salada de folhas, tomate e cebola (sem azeite) - À vontade'
      ],
      refeicao04: [
        'Iogurte desnatado, zero ou light - 1 unidade (170ml)',
        'Granola Zero ou Light - 30g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao05: [
        'Arroz branco ou integral cozido - 100g',
        'Ovo inteiro - 2 unidades (100g)',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
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
  },

  'fem-90kg': {
    nome: 'Plano 80-90kg',
    descricao: 'Plano nutricional intensivo para alta demanda energética',
    faixaPeso: 'Ideal para: 80kg - 90kg',
    genero: 'feminino',
    refeicoes: {
      refeicao01: [
        '1 Pão francês sem miolo (40g)',
        'Ovo inteiro - 3 unidades (150g)',
        'Mamão Papaia - 0.5 unidade média (155g)',
        'Café sem açúcar ou com adoçante - À vontade'
      ],
      refeicao02: [
        'Aveia - 25g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao03: [
        'Arroz branco ou integral cozido - 100g',
        'Feijão cozido - 80g',
        'Peito de frango cozido, assado ou grelhado - 125g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
        'Salada de folhas, tomate e cebola (sem azeite) - À vontade'
      ],
      refeicao04: [
        'Iogurte desnatado, zero ou light - 1 unidade (170ml)',
        'Granola Zero ou Light - 40g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao05: [
        'Arroz branco ou integral cozido - 100g',
        'Peito de frango cozido, assado ou grelhado - 125g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) - 100g',
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
      'Beba 3-4 litros de água por dia',
      'Evite frituras e doces',
      'Não pule refeições',
      'Respeite os intervalos entre refeições'
    ]
  },

  'fem-90kg+': {
    nome: 'Plano 90kg ou mais',
    descricao: 'Plano nutricional completo para máxima performance',
    faixaPeso: 'Ideal para: 90kg ou mais',
    genero: 'feminino',
    refeicoes: {
      refeicao01: [
        '1 pão francês sem miolo (40g)',
        'Ovo inteiro – 3 unidades (150g)',
        'Mamão Papaia – 0,5 unidade média (155g)',
        'Café sem açúcar ou com adoçante – À vontade'
      ],
      refeicao02: [
        'Aveia - 30g',
        'Mel de abelha - 10g',
        'Banana - 1 unidade média (70g)'
      ],
      refeicao03: [
        'Arroz branco ou integral cozido – 125g',
        'Feijão cozido – 80g',
        'Peito de frango cozido, assado ou grelhado – 125g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) – 100g',
        'Salada de folhas, tomate e cebola (sem azeite) – À vontade'
      ],
      refeicao04: [
        'Iogurte desnatado, zero ou light – 1 unidade (170ml)',
        'Granola Zero ou Light – 40g',
        'Banana – 2 unidade média (140g)'
      ],
      refeicao05: [
        'Arroz branco ou integral cozido – 125g',
        'Peito de frango cozido, assado ou grelhado – 150g',
        'Legumes crus ou cozidos (cenoura, beterraba, couve flor, brócolis, etc) – 150g',
        'Salada de folhas, tomate e cebola (sem azeite) – À vontade'
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
      'Beba 3-4 litros de água por dia',
      'Evite frituras e doces',
      'Não pule refeições',
      'Respeite os intervalos entre refeições'
    ]
  }
};

// Função para obter planos filtrados por gênero
const obterPlanosPorGenero = (genero: 'masculino' | 'feminino') => {
  const planosFiltrados = Object.entries(todosOsPlanos)
    .filter(([_, plano]) => plano.genero === genero)
    .reduce((acc, [key, plano]) => {
      // Remove o prefixo do gênero para manter a interface limpa
      const keyLimpa = key.replace(/^(masc|fem)-/, '');
      acc[keyLimpa] = plano;
      return acc;
    }, {} as Record<string, PlanoDetalhes>);
  
  return planosFiltrados;
};

export default function Dietas() {
  const { profile, isPersonalized, refreshProfile } = useProfile();
  const { alimentosMarcados, toggleAlimento, getProgressoRefeicao } = useMealProgress();
  const [planoSelecionado, setPlanoSelecionado] = useState('80kg');
  const [generoSelecionado, setGeneroSelecionado] = useState<'masculino' | 'feminino'>('masculino');
  const [showPersonalizationModal, setShowPersonalizationModal] = useState(false);
  const [showSubstitutionModal, setShowSubstitutionModal] = useState(false);
  
  // Estados para controlar refeições colapsáveis
  const [refeicoesAbertas, setRefeicoesAbertas] = useState<Record<string, boolean>>({
    refeicao01: false,
    refeicao02: false,
    refeicao03: false,
    refeicao04: false,
    refeicao05: false
  });

  // Verificar se precisa mostrar o modal de personalização
  useEffect(() => {
    // Removido o modal automático - usuário deve clicar no botão
    // if (profile && !isPersonalized) {
    //   setShowPersonalizationModal(true);
    // }
  }, [profile, isPersonalized]);

  // Estados de loading para evitar flash do conteúdo padrão
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Lógica de planos baseada no perfil personalizado
  const planosDetalhados = isPersonalized && profile?.sexo 
    ? obterPlanosPorGenero(profile.sexo as 'masculino' | 'feminino')
    : obterPlanosPorGenero(generoSelecionado);

  // Inicialização única para evitar múltiplos re-renders
  useEffect(() => {
    if (!isInitialized) {
      const initTimer = setTimeout(() => {
        setIsInitialized(true);
        setIsLoadingContent(false);
      }, 200);
      return () => clearTimeout(initTimer);
    }
  }, [isInitialized]);

  // Selecionar plano recomendado automaticamente se personalizado
  useEffect(() => {
    if (isPersonalized && profile && isInitialized) {
      const planoRecomendado = getRecommendedDietPlan(profile);
      if (planoRecomendado) {
        // Remover o prefixo do gênero para manter consistência com a interface
        const planoLimpo = planoRecomendado.replace(/^(masc|fem)-/, '');
        setPlanoSelecionado(planoLimpo);
      }
    }
  }, [isPersonalized, profile, isInitialized]);


  const plano = planosDetalhados[planoSelecionado];

  const handlePersonalizationComplete = () => {
    setShowPersonalizationModal(false);
    refreshProfile();
  };

  // Renderizar modal sempre
  const modalComponent = (
    <PersonalizationModal
      isOpen={showPersonalizationModal}
      onClose={() => setShowPersonalizationModal(false)}
      onComplete={handlePersonalizationComplete}
    />
  );

  // Verificação para mostrar mensagem de personalização quando não estiver personalizado
  if (profile && !isPersonalized) {
    return (
      <div 
        className="min-h-screen text-white p-6 pb-6 lg:pb-6 relative flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)`
        }}
      >
        {/* Padrão quadriculado premium */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '10px 10px'
          }}
        ></div>
        
        <div className="relative z-10 text-center max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Personalize sua Dieta
          </h1>
          
          <p className="text-gray-300 mb-8 text-lg">
            Para oferecer um plano alimentar específico para você, precisamos conhecer melhor seu perfil.
          </p>
          
          <Button
            onClick={() => setShowPersonalizationModal(true)}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:opacity-90 text-white px-8 py-3 text-lg font-semibold"
          >
            Personalizar Agora
          </Button>
        </div>
        
        {/* Modal renderizado aqui */}
        {modalComponent}
      </div>
    );
  }

  // Verificação de segurança para evitar erro quando plano não existir ou ainda carregando
  if (!plano || isLoadingContent || (isPersonalized && !profile?.sexo)) {
    return (
      <div
        className="min-h-screen text-white p-6 pb-6 lg:pb-6 relative"
        style={{
          background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)`
        }}
      >
        {/* Padrão quadriculado premium */}
        <div 
          className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '10px 10px'
          }}
        ></div>
        
        {/* Padrão mais sutil de pontos */}
        <div 
          className="absolute inset-0 opacity-15" 
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(203, 213, 225, 0.4) 0.5px, transparent 0.5px)`,
            backgroundSize: '8px 8px'
          }}
        ></div>
        
        <div className="relative z-10 flex items-center justify-center h-64">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-300 mb-2">Carregando dieta personalizada...</h2>
            <p className="text-gray-400">Preparando seu plano alimentar específico</p>
          </div>
        </div>
      </div>
    );
  }

  // Função para alternar refeição aberta/fechada
  const toggleRefeicao = (refeicao: string) => {
    setRefeicoesAbertas(prev => ({
      ...prev,
      [refeicao]: !prev[refeicao]
    }));
  };

  // Função para renderizar uma refeição colapsável
  const renderRefeicao = (refeicaoKey: string, titulo: string, descricao: string, emoji: string, cor: string) => {
    const cores = {
      orange: {
        card: 'from-orange-50 to-yellow-50 border-orange-200',
        icon: 'from-orange-400 to-yellow-400',
        dot: 'from-orange-400 to-yellow-400',
        hover: 'hover:bg-orange-100/50',
        checkbox: 'data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500',
        text: 'text-orange-600'
      },
      pink: {
        card: 'from-pink-50 to-rose-50 border-pink-200',
        icon: 'from-pink-400 to-rose-400',
        dot: 'from-pink-400 to-rose-400',
        hover: 'hover:bg-pink-100/50',
        checkbox: 'data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500',
        text: 'text-pink-600'
      },
      green: {
        card: 'from-green-50 to-emerald-50 border-green-200',
        icon: 'from-green-400 to-emerald-400',
        dot: 'from-green-400 to-emerald-400',
        hover: 'hover:bg-green-100/50',
        checkbox: 'data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500',
        text: 'text-green-600'
      },
      purple: {
        card: 'from-purple-50 to-violet-50 border-purple-200',
        icon: 'from-purple-400 to-violet-400',
        dot: 'from-purple-400 to-violet-400',
        hover: 'hover:bg-purple-100/50',
        checkbox: 'data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500',
        text: 'text-purple-600'
      },
      blue: {
        card: 'from-blue-50 to-cyan-50 border-blue-200',
        icon: 'from-blue-400 to-cyan-400',
        dot: 'from-blue-400 to-cyan-400',
        hover: 'hover:bg-blue-100/50',
        checkbox: 'data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500',
        text: 'text-blue-600'
      }
    };

    const corConfig = cores[cor as keyof typeof cores];
    const alimentos = plano.refeicoes[refeicaoKey as keyof typeof plano.refeicoes] || [];
    const progresso = getProgressoRefeicao(refeicaoKey, alimentos);

    return (
      <Card className={`bg-gradient-to-br ${corConfig.card} text-gray-900 hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
        <div className={`absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${corConfig.icon.replace('from-', 'from-').replace('to-', 'to-')}/30 rounded-full -translate-y-8 sm:-translate-y-10 translate-x-8 sm:translate-x-10`}></div>
        <Collapsible 
          open={refeicoesAbertas[refeicaoKey]} 
          onOpenChange={() => toggleRefeicao(refeicaoKey)}
        >
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-3 sm:pb-4 relative z-10 cursor-pointer hover:bg-orange-100/50 transition-colors rounded-t-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <CardTitle className="flex items-center gap-3 flex-1">
                  <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${corConfig.icon} shadow-lg`}>
                    <Coffee className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl">{emoji}</span>
                      <span className="diet-title text-gray-800 text-sm sm:text-base font-bold break-words">{titulo}</span>
                    </div>
                    <p className="diet-description text-gray-600 mt-1 text-xs sm:text-sm">{descricao}</p>
                  </div>
                </CardTitle>
                <div className="flex items-center justify-between sm:justify-end gap-3">
                  <div className={`flex items-center gap-2 text-xs sm:text-sm ${corConfig.text}`}>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{progresso.marcados}/{progresso.total}</span>
                  </div>
                  {refeicoesAbertas[refeicaoKey] ? (
                    <ChevronDown className={`w-5 h-5 ${corConfig.text}`} />
                  ) : (
                    <ChevronRight className={`w-5 h-5 ${corConfig.text}`} />
                  )}
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="space-y-3 relative z-10">
              {alimentos.map((item, index) => {
                const chave = `${refeicaoKey}-${item}`;
                const isChecked = alimentosMarcados[chave] || false;
                
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-orange-100 shadow-sm hover:shadow-md transition-all duration-200 hover:bg-white/90">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id={`${refeicaoKey}-${index}`}
                        checked={isChecked}
                        onCheckedChange={() => toggleAlimento(refeicaoKey, item)}
                        className={`${corConfig.checkbox} flex-shrink-0 mt-0.5`}
                      />
                      <label 
                        htmlFor={`${refeicaoKey}-${index}`}
                        className={`text-gray-800 diet-item font-medium leading-relaxed cursor-pointer flex-1 text-sm sm:text-base break-words transition-all duration-200 ${
                          isChecked ? 'line-through text-gray-500 opacity-70' : ''
                        }`}
                      >
                        {item}
                      </label>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    );
  };

  return (
    <div 
      className="min-h-screen text-white p-6 pb-6 lg:pb-6 relative"
      style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0c4a6e 100%)`
      }}
    >
      {/* Padrão quadriculado premium */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '10px 10px'
        }}
      ></div>
      
      {/* Padrão mais sutil de pontos */}
      <div 
        className="absolute inset-0 opacity-15" 
        style={{
          backgroundImage: `radial-gradient(circle at center, rgba(203, 213, 225, 0.4) 0.5px, transparent 0.5px)`,
          backgroundSize: '8px 8px'
        }}
      ></div>
      
      <div className="relative z-10 space-y-6">
        {/* Header com título centralizado e toggle de gênero */}
        <div className="text-center space-y-4 relative">
          {/* Toggle de Gênero - Só aparece se não estiver personalizado */}
          {!isPersonalized && (
            <div className="absolute top-0 right-0 sm:right-0 max-sm:relative max-sm:flex max-sm:justify-center max-sm:mb-4">
              <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 gap-1 max-sm:scale-90">
                <Toggle
                  pressed={generoSelecionado === 'masculino'}
                  onPressedChange={() => setGeneroSelecionado('masculino')}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${generoSelecionado === 'masculino'
                    ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  👨 Masculino
                </Toggle>
                <Toggle
                  pressed={generoSelecionado === 'feminino'}
                  onPressedChange={() => setGeneroSelecionado('feminino')}
                  className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap ${generoSelecionado === 'feminino'
                    ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                >
                  👩 Feminino
                </Toggle>
              </div>
            </div>
          )}

          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-bold">
            <Trophy className="w-5 h-5" />
            {isPersonalized ? 'Seu Plano Alimentar Personalizado' : 'Planos Alimentares Shape Express'}
          </div>
          <p className="text-gray-300 max-w-2xl mx-auto diet-item">
            {!isPersonalized && 'Planos nutricionais personalizados para todos os pesos. Escolha o plano ideal para seus objetivos.'}
          </p>
        </div>

        {/* Botões de Seleção - Só aparecem se não estiver personalizado */}
        {!isPersonalized && (
          <div className="flex flex-wrap gap-3 justify-center">
            {Object.entries(planosDetalhados).map(([key, plano]) => (
              <Button
                key={key}
                variant={planoSelecionado === key ? "default" : "outline"}
                onClick={() => setPlanoSelecionado(key)}
                className={`${planoSelecionado === key
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 hover:opacity-90 text-white'
                  : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                  }`}
              >
                <Apple className="w-4 h-4" />
                <span className="ml-2">{plano.nome}</span>
              </Button>
            ))}
          </div>
        )}

        {/* Refeições Colapsáveis */}
        <div className="space-y-4">
          {/* Refeição 01 */}
          {renderRefeicao('refeicao01', 'Refeição 01 - Café da Manhã', 'Energia para começar o dia', '☕', 'orange')}

          {/* Refeição 02 */}
          {renderRefeicao('refeicao02', 'Refeição 02 - Lanche da Manhã', 'Lanche da manhã', '🍎', 'pink')}

          {/* Refeição 03 */}
          {renderRefeicao('refeicao03', 'Refeição 03 - Almoço', 'Refeição principal do dia', '🍽️', 'green')}

          {/* Refeição 04 */}
          {renderRefeicao('refeicao04', 'Refeição 04 - Lanche da Tarde', 'Lanche da tarde', '🥤', 'purple')}

          {/* Refeição 05 */}
          {renderRefeicao('refeicao05', 'Refeição 05 - Jantar', 'Refeição noturna leve', '🌙', 'blue')}
        </div>

        {/* Informações Adicionais */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Horários */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500">
                  <Coffee className="w-5 h-5 text-white" />
                </div>
                Horários Recomendados
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {plano.horarios.map((horario, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  <span className="text-gray-300">{horario}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dicas */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-green-400 to-teal-500">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                Dicas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {plano.dicas.map((dica, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-teal-500 rounded-full"></div>
                  <span className="text-gray-300">{dica}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* App de Substituição de Alimentos */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-orange-400 to-red-500">
                  <Apple className="w-5 h-5 text-white" />
                </div>
                App de Substituição
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-gray-300 text-sm leading-relaxed">
                <p className="mb-3">
                  Descubra alternativas nutricionalmente equivalentes para seus alimentos favoritos com nossa calculadora inteligente.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                    <span>Substituições precisas</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                    <span>Baseado em dados nutricionais</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full"></div>
                    <span>Ideal para planejamento alimentar</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={() => setShowSubstitutionModal(true)}
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
              >
                <Apple className="w-4 h-4 mr-2" />
                Acessar App
                <span className="ml-2 text-xs">↗</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal do App de Substituição */}
      <SubstitutionAppModal
        isOpen={showSubstitutionModal}
        onClose={() => setShowSubstitutionModal(false)}
      />
    </div>
  );
}