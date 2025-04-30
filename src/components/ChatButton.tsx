import React, { useState, useEffect } from 'react';
import { MessageSquare, X, Send, User } from 'lucide-react';
import iconFuria from '/assets/images/favicon.ico';

interface Message {
  id: string;
  content: string;
  isBot: boolean;
}

const ChatButton: React.FC = () => {
  const [isPulsing, setIsPulsing] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isBot: false
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      // To do - Solicitação POST genérica
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      if (!response.ok) throw new Error('Failed to send message');

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "Message received",
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Desculpe, não consegui processar sua mensagem no momento.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
        <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-gray-900 rounded-lg shadow-xl z-40 border border-white overflow-hidden transition-all duration-300 animate-fadeIn">
          <div className="bg-black p-4 flex justify-between items-center border-b border-gray-800">
            <div className="flex items-center gap-3">
              <img src={iconFuria} alt="Logo FURIA" className="w-4" />
              <h3 className="text-white font-medium">FURIA Chat</h3>
            </div>
            <button onClick={toggleChat} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="h-80 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} items-start gap-2`}
                >
                  {msg.isBot ? (
                    <img src={iconFuria} alt="Logo FURIA" className="w-4" />
                  ) : (
                    <User className="h-5 w-5 text-blue-500 mt-1 order-2" />
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.isBot
                        ? 'bg-gray-800 text-white'
                        : 'bg-blue-500 text-white'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start items-start gap-2">
                  <User className="h-5 w-5 text-blue-500 mt-1" />
                  <div className="bg-gray-800 text-white max-w-[80%] rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-gray-800 p-4">
              <div className="flex items-center space-x-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  className={`p-2 bg-blue-500 text-white rounded-lg transition-colors ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                  }`}
                  disabled={isLoading}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatButton;