import React from 'react';
import { X } from 'lucide-react';
import { Message } from '../types/types';
import { MessageItem, LoadingIndicator } from './MessageComponents';
import MessageInput from './MessageInput';
import iconFuria from '/assets/images/favicon.ico';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isLoading,
  onClose,
  onSendMessage,
}) => {
  return (
    <div className="fixed bottom-24 right-6 w-80 md:w-96 bg-gray-900 rounded-lg shadow-xl z-40 border border-white overflow-hidden transition-all duration-300 animate-fadeIn">
      <div className="bg-black p-4 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src={iconFuria} alt="Logo FURIA" className="w-4" />
          <h3 className="text-white font-medium">FURIA Chat</h3>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="h-80 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}
          {isLoading && <LoadingIndicator />}
        </div>

        <MessageInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;