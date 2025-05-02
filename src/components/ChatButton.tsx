import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Message } from '../types/types';
import { chatService } from '../services/chatService';
import ChatWindow from './ChatWindow';
import { v4 as uuidv4 } from 'uuid';

const ChatButton: React.FC = () => {
  const [isPulsing, setIsPulsing] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    setSessionId(uuidv4());
    
    const interval = setInterval(() => {
      setIsPulsing(prev => !prev);
    }, 2000);

    const handleToggleChat = () => {
      setIsOpen(true);
    };

    document.addEventListener('toggleChat', handleToggleChat);

    return () => {
      clearInterval(interval);
      document.removeEventListener('toggleChat', handleToggleChat);
    };
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([chatService.getWelcomeMessage()]);
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (message: string) => {
    const userMessage = chatService.createUserMessage(message);
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
  
    try {
      const botReply = await chatService.sendMessage(message, sessionId);
      const botMessage = chatService.createBotMessage(botReply);
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        chatService.createBotMessage('❌ Desculpe, algo deu errado. Tente novamente.')
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-white text-white shadow-lg hover:bg-white transition-all duration-300 flex items-center ${
          !isOpen && isPulsing ? 'animate-pulse' : ''
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-black" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6 text-black" />
            <span className="ml-2 font-medium text-black hidden md:inline">Chat with FURIA</span>
          </>
        )}
      </button>

      {isOpen && (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onClose={toggleChat}
          onSendMessage={handleSendMessage}
        />
      )}
    </>
  );
};

export default ChatButton;