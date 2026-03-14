export type Dimension = 'clarity' | 'intuition' | 'risk' | 'alignment' | 'confidence';

export type Question = {
  id: number;
  text: string;
  dimension: Dimension;
  answers: { label: string; value: 1 | 2 | 3 }[];
};

export type QuizSubmission = Record<number, 1 | 2 | 3>;

export const questions: Question[] = [
  {
    id: 1,
    text: 'Quand une décision importante arrive, je clarifie mes objectifs avant d\'agir.',
    dimension: 'clarity',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  },
  {
    id: 2,
    text: 'J\'écoute mon intuition même quand je n\'ai pas toutes les données.',
    dimension: 'intuition',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  },
  {
    id: 3,
    text: 'Je suis prêt(e) à prendre des risques pour évoluer dans ma vie.',
    dimension: 'risk',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  },
  {
    id: 4,
    text: 'Mes décisions respectent mes valeurs profondes.',
    dimension: 'alignment',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  },
  {
    id: 5,
    text: 'Je me sens confiant(e) après avoir fait un choix important.',
    dimension: 'confidence',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  },
  {
    id: 6,
    text: 'Je distingue facilement ce qui est urgent de ce qui est essentiel.',
    dimension: 'clarity',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  },
  {
    id: 7,
    text: 'Je fais confiance à mes ressentis pour orienter mes choix de vie.',
    dimension: 'intuition',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  },
  {
    id: 8,
    text: 'Je peux sortir de ma zone de confort quand une opportunité se présente.',
    dimension: 'risk',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  },
  {
    id: 9,
    text: 'Je vérifie que mes décisions servent ma vision à long terme.',
    dimension: 'alignment',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  },
  {
    id: 10,
    text: 'Je peux décider sans rester bloqué(e) par la peur de me tromper.',
    dimension: 'confidence',
    answers: [
      { label: 'Rarement', value: 1 },
      { label: 'Parfois', value: 2 },
      { label: 'Souvent', value: 3 }
    ]
  }
];

export type Profile = {
  key: string;
  title: string;
  summary: string;
  vigilance: string[];
  recommendations: string[];
};

export const profiles: Profile[] = [
  {
    key: 'paralysie',
    title: 'Paralysie décisionnelle',
    summary: 'Vous ressentez une forte charge mentale face aux choix importants, ce qui ralentit vos actions.',
    vigilance: ['Surcharge d\'options', 'Peur de l\'erreur', 'Report des décisions clés'],
    recommendations: [
      'Limiter vos options à 2 ou 3 alternatives concrètes.',
      'Fixer une date limite de décision.',
      'Valider chaque choix avec un critère principal simple.'
    ]
  },
  {
    key: 'prudent',
    title: 'Décideur prudent',
    summary: 'Vous privilégiez la stabilité, la sécurité et l\'anticipation des risques.',
    vigilance: ['Évitement du changement', 'Opportunités manquées', 'Excès de contrôle'],
    recommendations: [
      'Tester le changement par petits pas.',
      'Identifier un risque acceptable par décision.',
      'Évaluer les bénéfices potentiels autant que les risques.'
    ]
  },
  {
    key: 'explorateur',
    title: 'Explorateur',
    summary: 'Vous aimez expérimenter et avancer par l\'action.',
    vigilance: ['Dispersion', 'Décisions impulsives', 'Manque de suivi'],
    recommendations: [
      'Ajouter un cadre de priorités hebdomadaire.',
      'Mesurer les impacts avant la prochaine étape.',
      'Conserver un cap aligné avec vos objectifs long terme.'
    ]
  },
  {
    key: 'intuitif',
    title: 'Décideur intuitif',
    summary: 'Votre instinct est un guide puissant dans vos choix personnels et professionnels.',
    vigilance: ['Biais émotionnels', 'Manque de vérification factuelle', 'Difficulté à expliquer ses choix'],
    recommendations: [
      'Compléter l\'intuition avec 1 à 2 données clés.',
      'Prendre du recul avant toute décision critique.',
      'Documenter vos motifs de décision pour progresser.'
    ]
  },
  {
    key: 'aligne',
    title: 'Décideur aligné',
    summary: 'Vous prenez des décisions cohérentes avec vos valeurs et votre vision de long terme.',
    vigilance: ['Rigidité potentielle', 'Perfectionnisme', 'Exigence élevée envers soi-même'],
    recommendations: [
      'Conserver de la flexibilité selon le contexte.',
      'Célébrer les décisions imparfaites mais justes.',
      'Continuer à ajuster vos choix avec feedback régulier.'
    ]
  }
];

export type DiagnosticResult = {
  averages: Record<Dimension, number>;
  radarData: { subject: string; value: number }[];
  score: number;
  profile: Profile;
};

export function evaluateQuiz(submission: QuizSubmission): DiagnosticResult {
  const sums: Record<Dimension, number> = {
    clarity: 0,
    intuition: 0,
    risk: 0,
    alignment: 0,
    confidence: 0
  };

  const counts: Record<Dimension, number> = {
    clarity: 0,
    intuition: 0,
    risk: 0,
    alignment: 0,
    confidence: 0
  };

  for (const question of questions) {
    const value = submission[question.id] ?? 0;
    sums[question.dimension] += value;
    counts[question.dimension] += 1;
  }

  const averages = {
    clarity: Number((sums.clarity / counts.clarity).toFixed(2)),
    intuition: Number((sums.intuition / counts.intuition).toFixed(2)),
    risk: Number((sums.risk / counts.risk).toFixed(2)),
    alignment: Number((sums.alignment / counts.alignment).toFixed(2)),
    confidence: Number((sums.confidence / counts.confidence).toFixed(2))
  };

  const rawScore = Object.values(averages).reduce((acc, val) => acc + val, 0);
  const score = Math.round((rawScore / 15) * 100);

  const radarData = [
    { subject: 'Clarté', value: averages.clarity },
    { subject: 'Intuition', value: averages.intuition },
    { subject: 'Risque', value: averages.risk },
    { subject: 'Alignement', value: averages.alignment },
    { subject: 'Confiance', value: averages.confidence }
  ];

  let profile = profiles[1];
  if (score < 35) profile = profiles[0];
  else if (score < 55) profile = profiles[1];
  else if (averages.intuition >= 2.6 && averages.clarity < 2.4) profile = profiles[3];
  else if (averages.risk >= 2.5 && averages.alignment < 2.6) profile = profiles[2];
  else if (score >= 75 && averages.alignment >= 2.6) profile = profiles[4];

  return {
    averages,
    radarData,
    score,
    profile
  };
}
