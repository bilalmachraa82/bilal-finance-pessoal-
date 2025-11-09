
import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { ChatInterface } from './components/ChatInterface';
import { ReceiptScanner } from './components/ReceiptScanner';
import { MessageSquare, ScanLine, LayoutDashboard } from 'lucide-react';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'chat' | 'scanner'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <ChatInterface />;
      case 'scanner':
        return <ReceiptScanner />;
      default:
        return <Dashboard />;
    }
  };
  
  const NavButton = ({ tabName, icon, label }: { tabName: 'dashboard' | 'chat' | 'scanner', icon: React.ElementType, label: string }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex flex-col items-center justify-center space-y-1 w-full p-2 rounded-xl transition-all duration-300 ${activeTab === tabName ? 'text-[#00FF88]' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
    >
      <Icon as={icon} className="w-6 h-6" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen text-slate-100 font-sans p-4 md:p-6 lg:p-8 flex flex-col max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-slate-200 to-slate-400">Bilal Finance AI</h1>
            <p className="text-slate-400 text-sm">Welcome back, Bilal Machraa</p>
        </div>
        <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-[#00FF88]/50" style={{backgroundImage: `url(https://picsum.photos/id/237/200/200)`}}></div>
      </header>
      
      <main className="flex-grow overflow-y-auto pb-24">
        {renderContent()}
      </main>
      
      <footer className="fixed bottom-0 left-0 right-0 p-3 bg-slate-900/50 backdrop-blur-lg border-t border-slate-700/50 md:hidden">
        <nav className="flex justify-around items-center max-w-md mx-auto">
            <NavButton tabName="dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavButton tabName="chat" icon={MessageSquare} label="AI Chat" />
            <NavButton tabName="scanner" icon={ScanLine} label="Scan" />
        </nav>
      </footer>
    </div>
  );
};

export default App;
