import React from 'react';
import BottomNav from './BottomNav';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  return (
    <div className="app-container">
      <main className="main-content hide-scrollbar">
        {children}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
