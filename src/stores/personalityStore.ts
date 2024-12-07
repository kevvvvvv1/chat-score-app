import create from 'zustand';

interface PersonalityQuestion {
  id: number;
  question: string;
  options: string[];
  category: 'confiance' | 'sociabilite' | 'empathie' | 'authenticite';
}

interface PersonalityStore {
  currentQuestionIndex: number;
  answers: Record<number, number>;
  questions: PersonalityQuestion[];
  traits: Record<string, number>;
  getDetailedAnalysis: () => string[];
  setAnswer: (questionId: number, answerIndex: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;
  calculateTraits: () => void;
  resetTest: () => void;
}

const questions: PersonalityQuestion[] = [
  {
    id: 1,
    question: "👥 Dans un groupe de nouvelles personnes, comment vous sentez-vous généralement ?",
    options: [
      "🌟 Je me sens à l'aise et je vais naturellement vers les autres",
      "👀 Je préfère observer d'abord et m'intégrer progressivement",
      "😅 Je me sens un peu mal à l'aise mais je fais des efforts",
      "😰 Je trouve ça très difficile et stressant"
    ],
    category: 'sociabilite'
  },
  {
    id: 2,
    question: "💝 Quand on vous fait un compliment, quelle est votre réaction typique ?",
    options: [
      "🤗 Je l'accepte avec plaisir et je remercie sincèrement",
      "☺️ Je me sens un peu gêné(e) mais je l'accepte poliment",
      "🙈 J'ai tendance à le minimiser ou à le contredire",
      "😳 Je me sens très mal à l'aise et je ne sais pas quoi répondre"
    ],
    category: 'confiance'
  },
  {
    id: 3,
    question: "💭 Face à un désaccord dans une relation, comment réagissez-vous ?",
    options: [
      "🤝 J'exprime calmement mon point de vue et je cherche un compromis",
      "🤔 J'essaie d'éviter le conflit mais je peux en discuter si nécessaire",
      "🤐 Je garde mes opinions pour moi pour préserver la relation",
      "🏃 Je deviens défensif(ve) ou je me replie sur moi-même"
    ],
    category: 'authenticite'
  },
  {
    id: 4,
    question: "💫 Quand quelqu'un vous confie ses problèmes, que faites-vous ?",
    options: [
      "👂 J'écoute attentivement et j'essaie de comprendre ses émotions",
      "💡 Je donne des conseils et des solutions pratiques",
      "🤗 Je partage mes expériences similaires",
      "😕 Je ne sais pas trop comment réagir et ça me met mal à l'aise"
    ],
    category: 'empathie'
  },
  {
    id: 5,
    question: "🪞 Comment vous percevez-vous physiquement ?",
    options: [
      "✨ Je suis à l'aise avec mon apparence et je la valorise",
      "🌱 J'accepte mon apparence même si je voudrais améliorer certains aspects",
      "😔 Je suis souvent insatisfait(e) de mon apparence",
      "😣 J'ai beaucoup de mal à m'accepter physiquement"
    ],
    category: 'confiance'
  },
  {
    id: 6,
    question: "🗣️ Dans une conversation, comment gérez-vous les silences ?",
    options: [
      "😌 Je suis à l'aise avec les silences, ils font partie de l'échange",
      "💭 Je cherche naturellement à relancer la conversation",
      "😅 Les silences me mettent mal à l'aise et j'essaie de les éviter",
      "😰 Je panique intérieurement et je stresse beaucoup"
    ],
    category: 'sociabilite'
  },
  {
    id: 7,
    question: "💌 Comment exprimez-vous vos besoins dans une relation ?",
    options: [
      "💪 Je les exprime clairement et directement",
      "🤫 Je les suggère de manière indirecte",
      "🙏 J'attends que l'autre devine ou comprenne",
      "🙈 Je préfère ne pas les exprimer par peur de la réaction"
    ],
    category: 'authenticite'
  },
  {
    id: 8,
    question: "😢 Face à une personne qui pleure, quelle est votre réaction ?",
    options: [
      "🫂 Je me sens capable de la réconforter et de l'écouter",
      "🤝 Je veux aider mais je ne sais pas toujours comment",
      "😟 Je me sens mal à l'aise mais j'essaie d'être présent(e)",
      "🚶 Je préfère m'éloigner car je ne sais pas gérer ces situations"
    ],
    category: 'empathie'
  },
  {
    id: 9,
    question: "❤️ Quand quelqu'un vous montre de l'intérêt romantique ?",
    options: [
      "🥰 Je suis ouvert(e) et je montre aussi mon intérêt si je le ressens",
      "🤔 Je prends le temps d'analyser la situation avant de réagir",
      "😳 Je deviens nerveux(se) et j'ai du mal à savoir comment agir",
      "🏃‍♂️ Je me braque ou je fuis la situation"
    ],
    category: 'confiance'
  },
  {
    id: 10,
    question: "💭 Dans vos relations, quelle est votre plus grande peur ?",
    options: [
      "🔒 De perdre mon indépendance",
      "💔 D'être rejeté(e) ou abandonné(e)",
      "😟 De ne pas être à la hauteur",
      "🤕 D'être blessé(e) émotionnellement"
    ],
    category: 'authenticite'
  }
];

export const usePersonalityStore = create<PersonalityStore>((set, get) => ({
  currentQuestionIndex: 0,
  answers: {},
  questions,
  traits: {
    confiance: 0,
    sociabilite: 0,
    empathie: 0,
    authenticite: 0
  },

  getDetailedAnalysis: () => {
    const { traits, answers } = get();
    const analysis: string[] = [];

    // Analyse de la confiance en soi
    if (traits.confiance >= 75) {
      analysis.push("Vous avez une excellente confiance en vous qui vous permet d'aborder les relations sereinement. Cette assurance naturelle est un atout majeur dans votre vie sociale et amoureuse.");
    } else if (traits.confiance >= 50) {
      analysis.push("Votre niveau de confiance en vous est bon, même si parfois vous pouvez avoir des doutes. Continuez à cultiver cette confiance en vous concentrant sur vos qualités.");
    } else {
      analysis.push("Vous pourriez bénéficier de travailler sur votre confiance en vous. Rappelez-vous que chacun a ses qualités uniques et mérite d'être apprécié pour ce qu'il est.");
    }

    // Analyse de la sociabilité
    if (traits.sociabilite >= 75) {
      analysis.push("Votre aisance sociale est remarquable. Vous savez naturellement créer des liens et vous sentir à l'aise dans différentes situations sociales.");
    } else if (traits.sociabilite >= 50) {
      analysis.push("Vous avez une bonne capacité à socialiser, même si certaines situations peuvent vous mettre mal à l'aise. C'est tout à fait normal et cela n'empêche pas de créer des relations authentiques.");
    } else {
      analysis.push("Les situations sociales peuvent être source d'anxiété pour vous. Commencez par des petits pas et des situations où vous vous sentez en sécurité pour développer votre aisance sociale.");
    }

    // Analyse de l'empathie
    if (traits.empathie >= 75) {
      analysis.push("Votre grande capacité d'empathie est un atout précieux dans les relations. Vous savez naturellement comprendre et soutenir les autres.");
    } else if (traits.empathie >= 50) {
      analysis.push("Vous faites preuve d'une bonne empathie, ce qui vous permet de créer des connexions émotionnelles significatives avec les autres.");
    } else {
      analysis.push("Développer votre empathie pourrait enrichir vos relations. Essayez de vous mettre davantage à la place des autres et d'écouter activement leurs émotions.");
    }

    // Analyse de l'authenticité
    if (traits.authenticite >= 75) {
      analysis.push("Votre authenticité est une force majeure. Vous n'avez pas peur d'être vous-même et cela permet aux autres de se sentir en confiance avec vous.");
    } else if (traits.authenticite >= 50) {
      analysis.push("Vous savez être authentique tout en vous adaptant aux situations. C'est une qualité précieuse pour construire des relations durables.");
    } else {
      analysis.push("Vous pourriez gagner à vous exprimer plus librement et à assumer davantage qui vous êtes. L'authenticité attire naturellement les bonnes personnes dans notre vie.");
    }

    // Conseils personnalisés basés sur les réponses spécifiques
    const fearAnswer = answers[10]; // Réponse à la question sur les peurs
    if (fearAnswer === 0) {
      analysis.push("Votre désir d'indépendance est sain, mais n'oubliez pas qu'une relation épanouie peut aussi renforcer votre liberté personnelle.");
    } else if (fearAnswer === 1) {
      analysis.push("La peur du rejet est naturelle, mais ne la laissez pas vous empêcher de vous ouvrir aux autres. Chaque personne mérite d'être aimée pour ce qu'elle est.");
    } else if (fearAnswer === 2) {
      analysis.push("Ne vous mettez pas trop de pression pour être 'parfait(e)'. Les relations les plus authentiques se construisent sur l'acceptation mutuelle de nos imperfections.");
    } else if (fearAnswer === 3) {
      analysis.push("La vulnérabilité fait partie de l'amour. Plutôt que de la voir comme une faiblesse, considérez-la comme une force qui permet de créer des liens profonds.");
    }

    return analysis;
  },

  setAnswer: (questionId: number, answerIndex: number) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answerIndex }
    }));
  },

  nextQuestion: () => {
    set((state) => ({
      currentQuestionIndex: Math.min(state.currentQuestionIndex + 1, questions.length - 1)
    }));
  },

  previousQuestion: () => {
    set((state) => ({
      currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0)
    }));
  },

  calculateTraits: () => {
    const { answers } = get();
    const traits = {
      confiance: 0,
      sociabilite: 0,
      empathie: 0,
      authenticite: 0
    };

    // Calculer les traits en fonction des réponses
    Object.entries(answers).forEach(([questionId, answerIndex]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      if (question) {
        // Les réponses sont notées de 3 (meilleure) à 0 (plus difficile)
        const score = (3 - answerIndex) * 25; // Convertit en score sur 100
        traits[question.category] += score;
      }
    });

    // Moyenne pour chaque trait
    const questionsByCategory = questions.reduce((acc, q) => {
      acc[q.category] = (acc[q.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    Object.keys(traits).forEach(trait => {
      traits[trait as keyof typeof traits] = Math.round(
        traits[trait as keyof typeof traits] / questionsByCategory[trait] || 0
      );
    });

    set({ traits });
  },

  resetTest: () => {
    set({
      currentQuestionIndex: 0,
      answers: {},
      traits: {
        confiance: 0,
        sociabilite: 0,
        empathie: 0,
        authenticite: 0
      }
    });
  }
}));
