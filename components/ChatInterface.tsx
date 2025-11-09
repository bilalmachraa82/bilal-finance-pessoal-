
import React, { useState, useRef, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { USER_PROFILE_DATA } from '../constants';
import { getFinancialInsight } from '../services/geminiService';
import { Send, User, Bot, Loader } from 'lucide-react';
import { Icon } from './Icon';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Olá Bilal! Como posso ajudar a gerir as tuas finanças hoje?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await getFinancialInsight(input, USER_PROFILE_DATA);
      const aiMessage: Message = { text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { text: 'Ocorreu um erro. Por favor, tente novamente.', sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <GlassCard className="flex flex-col h-[75vh] max-h-[800px]">
      <h3 className="text-xl font-bold text-white mb-4 flex-shrink-0">Conversa Financeira</h3>
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && <Icon as={Bot} className="w-8 h-8 p-1.5 rounded-full bg-slate-700 text-[#00FF88] flex-shrink-0" />}
            <div className={`max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-violet-600 text-white rounded-br-none' : 'bg-slate-700 text-slate-200 rounded-bl-none'}`}>
              <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
            </div>
             {msg.sender === 'user' && <Icon as={User} className="w-8 h-8 p-1.5 rounded-full bg-slate-700 text-slate-300 flex-shrink-0" />}
          </div>
        ))}
         {isLoading && (
          <div className="flex items-start gap-3 justify-start">
            <Icon as={Bot} className="w-8 h-8 p-1.5 rounded-full bg-slate-700 text-[#00FF88] flex-shrink-0" />
            <div className="max-w-md p-3 rounded-2xl bg-slate-700 text-slate-200 rounded-bl-none">
              <Loader className="w-5 h-5 animate-spin text-[#00FF88]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 pt-4 border-t border-slate-700/50 flex-shrink-0 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Pergunta-me algo sobre as tuas finanças..."
          className="w-full bg-slate-800/50 border border-slate-600 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00FF88]/50"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading}
          className="p-3 bg-violet-600 rounded-xl text-white disabled:bg-slate-600 transition-all duration-300 transform hover:scale-105"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </GlassCard>
  );
};
