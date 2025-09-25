import { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

interface Exercicio {
  nome: string;
  series: number;
  repeticoes: string;
  peso: string;
  execucao?: string;
}

interface DiaTreino {
  dia: number;
  nome: string;
  grupo: string;
  exercicios: Exercicio[];
}

interface DiasTreino {
  titulo: string;
  frequencia: string;
  observacao?: string;
  tipo: string;
  duracao: string;
  genero?: 'masculino' | 'feminino';
  dias: DiaTreino[];
}

type TipoTreino = '1-3' | '4' | '5' | '6-7' | 'casa';

// Treinos masculinos baseados na frequência
const treinosDataMasculino: Record<TipoTreino, DiasTreino> = {
  '1-3': {
    titulo: 'Treino 1-3x por Semana',
    frequencia: 'Frequência: 1-3x por semana',
    tipo: 'academia',
    duracao: '60-75 minutos',
    dias: [
      {
        dia: 1,
        nome: 'Peito + Ombro',
        grupo: 'Peito, Ombros',
        exercicios: [
          { nome: 'Supino Inclinado com Barra', series: 4, repeticoes: '15/12/10/8 repetições (aumentando a carga a cada série)', peso: '70%', execucao: 'https://www.youtube.com/shorts/XSiWdufUFQ8' },
          { nome: 'Crucifixo Inclinado com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/hV21YJFt6MI' },
          { nome: 'Supino Reto com Halteres', series: 4, repeticoes: '12/12/10/10', peso: '70%', execucao: 'https://www.youtube.com/shorts/hlV6f0kHmeo' },
          { nome: 'Crucifixo Máquina', series: 3, repeticoes: '12/10/8', peso: '60%', execucao: 'https://www.youtube.com/shorts/MENdoLpyj7c' },
          { nome: 'Crossover Polia Alta', series: 4, repeticoes: '12/10/8/6 (aumentando a carga a cada série) + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/55nyV_aosNk' },
          { nome: 'Desenvolvimento com Halteres Sentado', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/5I7ogOjvdnc' },
          { nome: 'Elevação Frontal Alternada', series: 3, repeticoes: '10-12', peso: '50%', execucao: 'https://www.youtube.com/shorts/GqZRmCow0rw' },
          { nome: 'Elevação Lateral com Halteres', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/ot9nwSC1JnA' }
        ]
      },
      {
        dia: 2,
        nome: 'Costas + Trapézio e Post. Ombro',
        grupo: 'Costas, Trapézio, Posterior de Ombro',
        exercicios: [
          { nome: 'Puxada Aberta Barra Reta', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/_2MfZAj98tk' },
          { nome: 'Puxada Neutra Triângulo', series: 3, repeticoes: '10-12', peso: '70%', execucao: 'https://www.youtube.com/shorts/ySLFHxmJ_Sc' },
          { nome: 'Remada Unilateral com Halteres no Banco Inclinado (Serrote)', series: 3, repeticoes: '8-10', peso: '70%', execucao: 'https://www.youtube.com/watch?v=RSBM-o4vpyc&ab_channel=AcademiaSportCenterIgrejinha' },
          { nome: 'Remada Máquina (Pegada Pronada)', series: 4, repeticoes: '12/10/8/6', peso: '70%', execucao: 'https://www.youtube.com/shorts/r4EmE8I74BQ' },
          { nome: 'Remada Baixa Triângulo', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/7lc8Ow4vIwA' },
          { nome: 'Crucifixo Invertido Máquina', series: 3, repeticoes: '12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/wUT3hmnzq3c' },
          { nome: 'Encolhimento com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/x9Im5d1H-Xw' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 4, repeticoes: 'Até a falha', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' }
        ]
      },
      {
        dia: 3,
        nome: 'Pernas e Panturrilha',
        grupo: 'Pernas Completo',
        exercicios: [
          { nome: 'Agachamento Smith', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/1oipoiTpbJA' },
          { nome: 'Leg Press 45°', series: 3, repeticoes: '12/10/8', peso: '80%', execucao: 'https://www.youtube.com/shorts/D9WR6PoMYxs' },
          { nome: 'Cadeira Extensora', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/PzIfB9MiiX8' },
          { nome: 'Cadeira Flexora', series: 3, repeticoes: '8-10', peso: '70%', execucao: 'https://www.youtube.com/shorts/T46yKiz8laY' },
          { nome: 'Mesa Flexora', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '70%', execucao: 'https://www.youtube.com/shorts/IXg1PQ_5gmw' },
          { nome: 'Panturrilha no Leg Press Horizontal', series: 6, repeticoes: '20/15/12/10/8/30 + Rest pause (ao final da última séries, descanse 10 segundos e sem reduzir a carga faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/PkXChiAQDh8' },
          { nome: 'Abdominal Infra com as Pernas Flexionadas com Elevação de Quadril', series: 3, repeticoes: 'Até a falha', peso: '0%', execucao: 'https://www.youtube.com/shorts/iZ5jYOH2ODM' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 3, repeticoes: '10-12', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' }
        ]
      }
    ]
  },
  '4': {
    titulo: 'Treino 4x por Semana',
    frequencia: 'Frequência: 4x por semana',
    tipo: 'academia',
    duracao: '60-75 minutos',
    dias: [
      {
        dia: 1,
        nome: 'Peito + Ombro',
        grupo: 'Peito, Ombros',
        exercicios: [
          { nome: 'Supino Inclinado com Barra', series: 4, repeticoes: '15/12/10/8 repetições (aumentando a carga a cada série)', peso: '70%', execucao: 'https://www.youtube.com/shorts/XSiWdufUFQ8' },
          { nome: 'Crucifixo Inclinado com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/hV21YJFt6MI' },
          { nome: 'Supino Reto com Halteres', series: 4, repeticoes: '12/12/10/10', peso: '70%', execucao: 'https://www.youtube.com/shorts/hlV6f0kHmeo' },
          { nome: 'Crucifixo Máquina', series: 3, repeticoes: '12/10/8', peso: '60%', execucao: 'https://www.youtube.com/shorts/MENdoLpyj7c' },
          { nome: 'Crossover Polia Alta', series: 4, repeticoes: '12/10/8/6 (aumentando a carga a cada série) + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/55nyV_aosNk' },
          { nome: 'Desenvolvimento com Halteres Sentado', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/5I7ogOjvdnc' },
          { nome: 'Elevação Frontal Alternada', series: 3, repeticoes: '10-12', peso: '50%', execucao: 'https://www.youtube.com/shorts/GqZRmCow0rw' },
          { nome: 'Elevação Lateral com Halteres', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/ot9nwSC1JnA' }
        ]
      },
      {
        dia: 2,
        nome: 'Costas + Trapézio e Post. Ombro',
        grupo: 'Costas, Trapézio, Posterior de Ombro',
        exercicios: [
          { nome: 'Puxada Aberta Barra Reta', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/_2MfZAj98tk' },
          { nome: 'Puxada Neutra Triângulo', series: 3, repeticoes: '10-12', peso: '70%', execucao: 'https://www.youtube.com/shorts/ySLFHxmJ_Sc' },
          { nome: 'Remada Unilateral com Halteres no Banco Inclinado (Serrote)', series: 3, repeticoes: '8-10', peso: '70%', execucao: 'https://www.youtube.com/watch?v=RSBM-o4vpyc&ab_channel=AcademiaSportCenterIgrejinha' },
          { nome: 'Remada Máquina (Pegada Pronada)', series: 4, repeticoes: '12/10/8/6', peso: '70%', execucao: 'https://www.youtube.com/shorts/r4EmE8I74BQ' },
          { nome: 'Remada Baixa Triângulo', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/7lc8Ow4vIwA' },
          { nome: 'Crucifixo Invertido Máquina', series: 3, repeticoes: '12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/wUT3hmnzq3c' },
          { nome: 'Encolhimento com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/x9Im5d1H-Xw' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 4, repeticoes: 'Até a falha', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' }
        ]
      },
      {
        dia: 3,
        nome: 'Braços + Abdômen',
        grupo: 'Bíceps, Tríceps, Abdômen',
        exercicios: [
          { nome: 'Tríceps Testa na Polia com Corda', series: 4, repeticoes: '15/12/10/8', peso: '60%', execucao: 'https://www.youtube.com/shorts/etTuALjH3bo' },
          { nome: 'Tríceps Francês Unilateral na Polia', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/_dtPoiFWZT4' },
          { nome: 'Tríceps na Polia com Barra Reta', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/M88Bt4MMpkI' },
          { nome: 'Rosca Scott com Barra W', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/qhRLio6bCRo' },
          { nome: 'Rosca Alternada com Halteres', series: 3, repeticoes: '8-10', peso: '60%', execucao: 'https://www.youtube.com/shorts/WUrn8iFf1js' },
          { nome: 'Rosca Direta na Polia (Barra Reta)', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/x6JCKfdzPJE' },
          { nome: 'Rosca Inversa Barra W', series: 3, repeticoes: '10-12', peso: '50%', execucao: 'https://www.youtube.com/shorts/2izIqLamdiA' },
          { nome: 'Abdominal Prancha Isométrica', series: 4, repeticoes: '60 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/uxPlAbWFUDs' }
        ]
      },
      {
        dia: 4,
        nome: 'Pernas e Panturrilha',
        grupo: 'Pernas Completo',
        exercicios: [
          { nome: 'Agachamento Smith', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/1oipoiTpbJA' },
          { nome: 'Leg Press 45°', series: 3, repeticoes: '12/10/8', peso: '80%', execucao: 'https://www.youtube.com/shorts/D9WR6PoMYxs' },
          { nome: 'Cadeira Extensora', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/PzIfB9MiiX8' },
          { nome: 'Cadeira Flexora', series: 3, repeticoes: '8-10', peso: '70%', execucao: 'https://www.youtube.com/shorts/T46yKiz8laY' },
          { nome: 'Mesa Flexora', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '70%', execucao: 'https://www.youtube.com/shorts/IXg1PQ_5gmw' },
          { nome: 'Panturrilha no Leg Press Horizontal', series: 6, repeticoes: '20/15/12/10/8/30 + Rest pause (ao final da última séries, descanse 10 segundos e sem reduzir a carga faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/PkXChiAQDh8' },
          { nome: 'Abdominal Infra com as Pernas Flexionadas com Elevação de Quadril', series: 3, repeticoes: 'Até a falha', peso: '0%', execucao: 'https://www.youtube.com/shorts/iZ5jYOH2ODM' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 3, repeticoes: '10-12', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' }
        ]
      }
    ]
  },
  '5': {
    titulo: 'Treino 5x por Semana',
    frequencia: 'Frequência: 5x por semana',
    tipo: 'academia',
    duracao: '60-75 minutos',
    dias: [
      {
        dia: 1,
        nome: 'Peito + Ombro',
        grupo: 'Peito, Ombros',
        exercicios: [
          { nome: 'Supino Inclinado com Barra', series: 4, repeticoes: '15/12/10/8 repetições (aumentando a carga a cada série)', peso: '70%', execucao: 'https://www.youtube.com/shorts/XSiWdufUFQ8' },
          { nome: 'Crucifixo Inclinado com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/hV21YJFt6MI' },
          { nome: 'Supino Reto com Halteres', series: 4, repeticoes: '12/12/10/10', peso: '70%', execucao: 'https://www.youtube.com/shorts/hlV6f0kHmeo' },
          { nome: 'Crucifixo Máquina', series: 3, repeticoes: '12/10/8', peso: '60%', execucao: 'https://www.youtube.com/shorts/MENdoLpyj7c' },
          { nome: 'Crossover Polia Alta', series: 4, repeticoes: '12/10/8/6 (aumentando a carga a cada série) + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/55nyV_aosNk' },
          { nome: 'Desenvolvimento com Halteres Sentado', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/5I7ogOjvdnc' },
          { nome: 'Elevação Frontal Alternada', series: 3, repeticoes: '10-12', peso: '50%', execucao: 'https://www.youtube.com/shorts/GqZRmCow0rw' },
          { nome: 'Elevação Lateral com Halteres', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/ot9nwSC1JnA' }
        ]
      },
      {
        dia: 2,
        nome: 'Costas + Trapézio e Post. Ombro',
        grupo: 'Costas, Trapézio, Posterior de Ombro',
        exercicios: [
          { nome: 'Puxada Aberta Barra Reta', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/_2MfZAj98tk' },
          { nome: 'Puxada Neutra Triângulo', series: 3, repeticoes: '10-12', peso: '70%', execucao: 'https://www.youtube.com/shorts/ySLFHxmJ_Sc' },
          { nome: 'Remada Unilateral com Halteres no Banco Inclinado (Serrote)', series: 3, repeticoes: '8-10', peso: '70%', execucao: 'https://www.youtube.com/watch?v=RSBM-o4vpyc&ab_channel=AcademiaSportCenterIgrejinha' },
          { nome: 'Remada Máquina (Pegada Pronada)', series: 4, repeticoes: '12/10/8/6', peso: '70%', execucao: 'https://www.youtube.com/shorts/r4EmE8I74BQ' },
          { nome: 'Remada Baixa Triângulo', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/7lc8Ow4vIwA' },
          { nome: 'Crucifixo Invertido Máquina', series: 3, repeticoes: '12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/wUT3hmnzq3c' },
          { nome: 'Encolhimento com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/x9Im5d1H-Xw' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 4, repeticoes: 'Até a falha', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' }
        ]
      },
      {
        dia: 3,
        nome: 'Braços + Abdômen',
        grupo: 'Bíceps, Tríceps, Abdômen',
        exercicios: [
          { nome: 'Tríceps Testa na Polia com Corda', series: 4, repeticoes: '15/12/10/8', peso: '60%', execucao: 'https://www.youtube.com/shorts/etTuALjH3bo' },
          { nome: 'Tríceps Francês Unilateral na Polia', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/_dtPoiFWZT4' },
          { nome: 'Tríceps na Polia com Barra Reta', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/M88Bt4MMpkI' },
          { nome: 'Rosca Scott com Barra W', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/qhRLio6bCRo' },
          { nome: 'Rosca Alternada com Halteres', series: 3, repeticoes: '8-10', peso: '60%', execucao: 'https://www.youtube.com/shorts/WUrn8iFf1js' },
          { nome: 'Rosca Direta na Polia (Barra Reta)', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/x6JCKfdzPJE' },
          { nome: 'Rosca Inversa Barra W', series: 3, repeticoes: '10-12', peso: '50%', execucao: 'https://www.youtube.com/shorts/2izIqLamdiA' },
          { nome: 'Abdominal Prancha Isométrica', series: 4, repeticoes: '60 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/uxPlAbWFUDs' }
        ]
      },
      {
        dia: 4,
        nome: 'Pernas e Panturrilha',
        grupo: 'Pernas Completo',
        exercicios: [
          { nome: 'Agachamento Smith', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/1oipoiTpbJA' },
          { nome: 'Leg Press 45°', series: 3, repeticoes: '12/10/8', peso: '80%', execucao: 'https://www.youtube.com/shorts/D9WR6PoMYxs' },
          { nome: 'Cadeira Extensora', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/PzIfB9MiiX8' },
          { nome: 'Cadeira Flexora', series: 3, repeticoes: '8-10', peso: '70%', execucao: 'https://www.youtube.com/shorts/T46yKiz8laY' },
          { nome: 'Mesa Flexora', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '70%', execucao: 'https://www.youtube.com/shorts/IXg1PQ_5gmw' },
          { nome: 'Panturrilha no Leg Press Horizontal', series: 6, repeticoes: '20/15/12/10/8/30 + Rest pause (ao final da última séries, descanse 10 segundos e sem reduzir a carga faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/PkXChiAQDh8' },
          { nome: 'Abdominal Infra com as Pernas Flexionadas com Elevação de Quadril', series: 3, repeticoes: 'Até a falha', peso: '0%', execucao: 'https://www.youtube.com/shorts/iZ5jYOH2ODM' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 3, repeticoes: '10-12', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' }
        ]
      },
      {
        dia: 5,
        nome: 'Peito + Ombro',
        grupo: 'Peito, Ombros',
        exercicios: [
          { nome: 'Supino Inclinado com Barra', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/XSiWdufUFQ8' },
          { nome: 'Crucifixo Inclinado com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/hV21YJFt6MI' },
          { nome: 'Supino Reto com Halteres', series: 4, repeticoes: '12/12/10/10', peso: '70%', execucao: 'https://www.youtube.com/shorts/hlV6f0kHmeo' },
          { nome: 'Crucifixo Máquina', series: 3, repeticoes: '12/10/8', peso: '60%', execucao: 'https://www.youtube.com/shorts/MENdoLpyj7c' },
          { nome: 'Crossover Polia Alta', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/55nyV_aosNk' },
          { nome: 'Desenvolvimento com Halteres Sentado', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/5I7ogOjvdnc' },
          { nome: 'Elevação Frontal Alternada', series: 3, repeticoes: '10-12', peso: '50%', execucao: 'https://www.youtube.com/shorts/GqZRmCow0rw' },
          { nome: 'Elevação Lateral com Halteres', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/ot9nwSC1JnA' }
        ]
      }
    ]
  },
  '6-7': {
    titulo: 'Treino 6x por Semana',
    frequencia: 'Frequência: 6x por semana',
    tipo: 'academia',
    duracao: '60-75 minutos',
    dias: [
      {
        dia: 1,
        nome: 'Peito + Ombro',
        grupo: 'Peito, Ombros',
        exercicios: [
          { nome: 'Supino Inclinado com Barra', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/XSiWdufUFQ8' },
          { nome: 'Crucifixo Inclinado com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/hV21YJFt6MI' },
          { nome: 'Supino Reto com Halteres', series: 4, repeticoes: '12/12/10/10', peso: '70%', execucao: 'https://www.youtube.com/shorts/hlV6f0kHmeo' },
          { nome: 'Crucifixo Máquina', series: 3, repeticoes: '12/10/8', peso: '60%', execucao: 'https://www.youtube.com/shorts/MENdoLpyj7c' },
          { nome: 'Crossover Polia Alta', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/55nyV_aosNk' },
          { nome: 'Desenvolvimento com Halteres Sentado', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/5I7ogOjvdnc' },
          { nome: 'Elevação Frontal Alternada', series: 3, repeticoes: '10-12', peso: '50%', execucao: 'https://www.youtube.com/shorts/GqZRmCow0rw' },
          { nome: 'Elevação Lateral com Halteres', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/ot9nwSC1JnA' }
        ]
      },
      {
        dia: 2,
        nome: 'Costas + Trapézio e Post. Ombro',
        grupo: 'Costas, Trapézio, Posterior de Ombro',
        exercicios: [
          { nome: 'Puxada Aberta Barra Reta', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/_2MfZAj98tk' },
          { nome: 'Puxada Neutra Triângulo', series: 3, repeticoes: '10-12', peso: '70%', execucao: 'https://www.youtube.com/shorts/ySLFHxmJ_Sc' },
          { nome: 'Remada Unilateral com Halteres no Banco Inclinado (Serrote)', series: 3, repeticoes: '8-10', peso: '70%', execucao: 'https://www.youtube.com/watch?v=RSBM-o4vpyc&ab_channel=AcademiaSportCenterIgrejinha' },
          { nome: 'Remada Máquina (Pegada Pronada)', series: 4, repeticoes: '12/10/8/6', peso: '70%', execucao: 'https://www.youtube.com/shorts/r4EmE8I74BQ' },
          { nome: 'Remada Baixa Triângulo', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/7lc8Ow4vIwA' },
          { nome: 'Crucifixo Invertido Máquina', series: 3, repeticoes: '12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/wUT3hmnzq3c' },
          { nome: 'Encolhimento com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/x9Im5d1H-Xw' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 4, repeticoes: 'Até a falha', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' }
        ]
      },
      {
        dia: 3,
        nome: 'Braços + Abdômen',
        grupo: 'Bíceps, Tríceps, Abdômen',
        exercicios: [
          { nome: 'Tríceps Testa na Polia com Corda', series: 4, repeticoes: '15/12/10/8', peso: '60%', execucao: 'https://www.youtube.com/shorts/etTuALjH3bo' },
          { nome: 'Tríceps Francês Unilateral na Polia', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/_dtPoiFWZT4' },
          { nome: 'Tríceps na Polia com Barra Reta', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/M88Bt4MMpkI' },
          { nome: 'Rosca Scott com Barra W', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/qhRLio6bCRo' },
          { nome: 'Rosca Alternada com Halteres', series: 3, repeticoes: '8-10', peso: '60%', execucao: 'https://www.youtube.com/shorts/WUrn8iFf1js' },
          { nome: 'Rosca Direta na Polia (Barra Reta)', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/x6JCKfdzPJE' },
          { nome: 'Rosca Inversa Barra W', series: 3, repeticoes: '10-12', peso: '50%', execucao: 'https://www.youtube.com/shorts/2izIqLamdiA' },
          { nome: 'Abdominal Prancha Isométrica', series: 4, repeticoes: '60 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/uxPlAbWFUDs' }
        ]
      },
      {
        dia: 4,
        nome: 'Pernas e Panturrilha',
        grupo: 'Pernas Completo',
        exercicios: [
          { nome: 'Agachamento Smith', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/1oipoiTpbJA' },
          { nome: 'Leg Press 45°', series: 3, repeticoes: '12/10/8', peso: '80%', execucao: 'https://www.youtube.com/shorts/D9WR6PoMYxs' },
          { nome: 'Cadeira Extensora', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/PzIfB9MiiX8' },
          { nome: 'Cadeira Flexora', series: 3, repeticoes: '8-10', peso: '70%', execucao: 'https://www.youtube.com/shorts/T46yKiz8laY' },
          { nome: 'Mesa Flexora', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '70%', execucao: 'https://www.youtube.com/shorts/IXg1PQ_5gmw' },
          { nome: 'Panturrilha no Leg Press Horizontal', series: 6, repeticoes: '20/15/12/10/8/30 + Rest pause (ao final da última séries, descanse 10 segundos e sem reduzir a carga faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/PkXChiAQDh8' },
          { nome: 'Abdominal Infra com as Pernas Flexionadas com Elevação de Quadril', series: 3, repeticoes: 'Até a falha', peso: '0%', execucao: 'https://www.youtube.com/shorts/iZ5jYOH2ODM' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 3, repeticoes: '10-12', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' }
        ]
      },
      {
        dia: 5,
        nome: 'Peito + Ombro',
        grupo: 'Peito, Ombros',
        exercicios: [
          { nome: 'Supino Inclinado com Barra', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/XSiWdufUFQ8' },
          { nome: 'Crucifixo Inclinado com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/hV21YJFt6MI' },
          { nome: 'Supino Reto com Halteres', series: 4, repeticoes: '12/12/10/10', peso: '70%', execucao: 'https://www.youtube.com/shorts/hlV6f0kHmeo' },
          { nome: 'Crucifixo Máquina', series: 3, repeticoes: '12/10/8', peso: '60%', execucao: 'https://www.youtube.com/shorts/MENdoLpyj7c' },
          { nome: 'Crossover Polia Alta', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/55nyV_aosNk' },
          { nome: 'Desenvolvimento com Halteres Sentado', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/5I7ogOjvdnc' },
          { nome: 'Elevação Frontal Alternada', series: 3, repeticoes: '10-12', peso: '50%', execucao: 'https://www.youtube.com/shorts/GqZRmCow0rw' },
          { nome: 'Elevação Lateral com Halteres', series: 4, repeticoes: '15/12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/ot9nwSC1JnA' }
        ]
      },
      {
        dia: 6,
        nome: 'Costas + Trapézio e Ombro Posterior',
        grupo: 'Costas, Trapézio, Posterior de Ombro',
        exercicios: [
          { nome: 'Puxada Aberta Barra Reta', series: 4, repeticoes: '15/12/10/8', peso: '70%', execucao: 'https://www.youtube.com/shorts/_2MfZAj98tk' },
          { nome: 'Puxada Neutra Triângulo', series: 3, repeticoes: '10-12', peso: '70%', execucao: 'https://www.youtube.com/shorts/ySLFHxmJ_Sc' },
          { nome: 'Remada Unilateral com Halteres no Banco Inclinado (Serrote)', series: 3, repeticoes: '8-10', peso: '70%', execucao: 'https://www.youtube.com/watch?v=RSBM-o4vpyc&ab_channel=AcademiaSportCenterIgrejinha' },
          { nome: 'Remada Máquina (Pegada Pronada)', series: 4, repeticoes: '12/10/8/6', peso: '70%', execucao: 'https://www.youtube.com/shorts/r4EmE8I74BQ' },
          { nome: 'Remada Baixa Triângulo', series: 4, repeticoes: '12/10/8/6 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '60%', execucao: 'https://www.youtube.com/shorts/7lc8Ow4vIwA' },
          { nome: 'Crucifixo Invertido Máquina', series: 3, repeticoes: '12/10/8 + Drop set (ao final da última série diminua 20% da carga e faça Até a falha total)', peso: '50%', execucao: 'https://www.youtube.com/shorts/wUT3hmnzq3c' },
          { nome: 'Encolhimento com Halteres', series: 3, repeticoes: '10-12', peso: '60%', execucao: 'https://www.youtube.com/shorts/x9Im5d1H-Xw' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 4, repeticoes: 'Até a falha', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' }
        ]
      }
    ]
  },
  'casa': {
    titulo: 'Treino em Casa',
    frequencia: '3 a 6x por semana',
    observacao: 'Ao terminar o treino 3 siga a sequência e retorne para o 1',
    tipo: 'casa',
    duracao: '60-75 minutos',
    dias: [
      {
        dia: 1,
        nome: 'Dia 1',
        grupo: 'Corpo Inteiro + Cardio',
        exercicios: [
          { nome: 'Polichinelo', series: 4, repeticoes: '45 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/guvPySViG7o' },
          { nome: 'Flexão de Braços', series: 4, repeticoes: '12-15 reps', peso: '0%', execucao: 'https://www.youtube.com/shorts/qqECekG4jMo' },
          { nome: 'Burpee', series: 4, repeticoes: '45 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/EiIWIEaIZe0' },
          { nome: 'Abdominal Canivete', series: 4, repeticoes: '12-15 reps', peso: '0%', execucao: 'https://www.youtube.com/shorts/51Ryd2Ds2CI' },
          { nome: 'Abdominal Bicicleta', series: 4, repeticoes: '45 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/OnQNhK0EkgK' },
          { nome: 'Prancha Isométrica', series: 4, repeticoes: '60 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/uxPlAbWFUDs' }
        ]
      },
      {
        dia: 2,
        nome: 'Dia 2',
        grupo: 'Corpo Inteiro + Cardio',
        exercicios: [
          { nome: 'Burpee', series: 4, repeticoes: 'até a exaustão', peso: '0%', execucao: 'https://www.youtube.com/shorts/EiIWIEaIZe0' },
          { nome: 'Tríceps Mergulho na Cadeira', series: 4, repeticoes: '12-15 reps', peso: '0%', execucao: 'https://www.youtube.com/shorts/z_T5hn0fqCE' },
          { nome: 'Escalador', series: 4, repeticoes: '45 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/fDo4sulRb04' },
          { nome: 'Corrida Estacionária', series: 4, repeticoes: '45 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/Wqg6rBCjVo0' },
          { nome: 'Abdominal Supra no Solo Pés Altos', series: 4, repeticoes: '12-15 reps', peso: '0%', execucao: 'https://www.youtube.com/shorts/PEFjJbjnmns' },
          { nome: 'Prancha Isométrica', series: 4, repeticoes: '60 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/uxPlAbWFUDs' }
        ]
      },
      {
        dia: 3,
        nome: 'Dia 3',
        grupo: 'Corpo Inteiro + Cardio',
        exercicios: [
          { nome: 'Polichinelo Frontal', series: 4, repeticoes: '45 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/-Rks8TC7YD8' },
          { nome: 'Flexão de Braços', series: 4, repeticoes: '12-15 reps', peso: '0%', execucao: 'https://www.youtube.com/shorts/qqECekG4jMo' },
          { nome: 'Lombar Solo Dinâmico', series: 4, repeticoes: '12-15 reps', peso: '0%', execucao: 'https://www.youtube.com/shorts/RaHn_82tANI' },
          { nome: 'Escalador', series: 4, repeticoes: '45 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/fDo4sulRb04' },
          { nome: 'Corrida Estacionária', series: 4, repeticoes: '45 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/Wqg6rBCjVo0' },
          { nome: 'Prancha Isométrica', series: 4, repeticoes: '60 segundos', peso: '0%', execucao: 'https://www.youtube.com/shorts/uxPlAbWFUDs' }
        ]
      }
    ]
  }
};

// Função para obter treinos baseados no perfil do usuário
export function getFilteredTrainings(profile: Profile | null) {
  if (!profile || !profile.sexo || !profile.frequencia_treino) {
    return {};
  }

  const sexo = profile.sexo;
  const frequencia = profile.frequencia_treino as TipoTreino;
  
  return {
    [frequencia]: treinosDataMasculino[frequencia] || treinosDataMasculino['1-3']
  };
}

// Função para obter treinos por gênero (para usuários não personalizados)
export function getTrainingsByGender(gender: 'masculino' | 'feminino') {
  return {
    'padrao': treinosDataMasculino['1-3']
  };
}
