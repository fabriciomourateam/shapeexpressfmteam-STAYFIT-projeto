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

  // Retorna a chave do plano no formato correto (masc-90kg, fem-90kg, etc.)
  const chavePlano = `${sexo === 'masculino' ? 'masc' : 'fem'}-${faixaPeso}`;
  
  return chavePlano;
}

// Função para filtrar planos baseado no perfil do usuário
export function getFilteredDietPlans(profile: Profile | null) {
  if (!profile || !profile.sexo) {
    return {};
  }

  // Retorna um plano padrão baseado no sexo e peso
  const peso = profile.peso_inicial || 70; // Fallback para 70kg se não tiver peso_inicial
  const faixaPeso = getWeightRange(peso);
  
  // Determinar a chave correta baseada no sexo e peso
  const chavePlano = `${profile.sexo === 'masculino' ? 'masc' : 'fem'}-${faixaPeso}`;
  
  // Importar os planos reais (isso será feito na página de dietas)
  // Por enquanto, retornar um objeto vazio para que a página use os planos reais
  return {};
}