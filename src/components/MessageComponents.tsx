import React from 'react';
import { User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types/types';
import iconFuria from '/assets/images/favicon.ico';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  return (
    <div
      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} items-start gap-2`}
    >
      {message.isBot ? (
        <img src={iconFuria} alt="Logo FURIA" className="w-4" />
      ) : (
        <User className="h-5 w-5 text-blue-500 mt-1 order-2" />
      )}
      <div
        className={`whitespace-pre-wrap max-w-[80%] rounded-lg p-3 ${
          message.isBot ? 'bg-gray-800 text-white' : 'bg-blue-500 text-white'
        }`}
      >
        <ReactMarkdown
          components={{
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-400 hover:text-blue-600"
              >
                {children}
              </a>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start items-start gap-2">
      <img src={iconFuria} alt="Logo FURIA" className="w-4" />
      <div className="bg-gray-800 text-white max-w-[80%] rounded-lg p-3">
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>
    </div>
  );
};