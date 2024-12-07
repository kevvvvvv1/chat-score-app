import { Coach } from '../types/coach';

const responseTemplates = {
  greeting: [
    "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
    "Je suis ravi(e) de discuter avec vous !",
    "Bienvenue ! En quoi puis-je vous être utile ?",
  ],
  acknowledgment: [
    "Je comprends ce que vous ressentez.",
    "C'est une excellente observation.",
    "Votre point de vue est intéressant.",
  ],
  question: [
    "Pouvez-vous m'en dire plus à ce sujet ?",
    "Comment vous sentez-vous par rapport à cela ?",
    "Qu'est-ce qui vous fait penser cela ?",
  ],
  support: [
    "Je suis là pour vous écouter et vous aider.",
    "C'est tout à fait normal de ressentir cela.",
    "Prenons le temps d'explorer cela ensemble.",
  ],
  closing: [
    "N'hésitez pas si vous avez d'autres questions.",
    "Je suis là si vous souhaitez en parler davantage.",
    "Prenez soin de vous !",
  ],
};

const getRandomResponse = (category: keyof typeof responseTemplates): string => {
  const responses = responseTemplates[category];
  return responses[Math.floor(Math.random() * responses.length)];
};

export const getCoachResponse = (coach: Coach, userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  // Logique simple de réponse basée sur le contenu du message
  if (message.includes('bonjour') || message.includes('salut')) {
    return getRandomResponse('greeting');
  } else if (message.includes('?')) {
    return getRandomResponse('acknowledgment') + ' ' + getRandomResponse('question');
  } else if (message.includes('merci') || message.includes('au revoir')) {
    return getRandomResponse('closing');
  } else {
    return getRandomResponse('support') + ' ' + getRandomResponse('question');
  }
};