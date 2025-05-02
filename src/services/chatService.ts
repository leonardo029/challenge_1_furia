import { Message } from '../types/types';

export const chatService = {
  sendMessage: async (message: string, sessionId: string = ''): Promise<string> => {
    try {
      const response = await fetch('https://leonardomoreira.app.n8n.cloud/webhook/furia-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message,
          sessionId
        }),
      });

      if (!response.ok) throw new Error('Erro ao se comunicar com o n8n');

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      throw error;
    }
  },

  createUserMessage: (content: string): Message => ({
    id: Date.now().toString(),
    content,
    isBot: false,
  }),

  createBotMessage: (content: string): Message => ({
    id: (Date.now() + 1).toString(),
    content,
    isBot: true,
  }),

  getWelcomeMessage: (): Message => ({
    id: Date.now().toString(),
    content: "Olá **Furioso(a)!** 👋\nComo posso ajudá-lo?",
    isBot: true,
  })
};