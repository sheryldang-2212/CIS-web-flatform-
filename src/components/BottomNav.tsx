import React from 'react';
import { Home, MessageSquare, FileText, User } from 'lucide-react';
import './BottomNav.css';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'report', label: 'Report', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-container">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              <div className="nav-icon-wrapper">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className="nav-icon" />
              </div>
              <span className="nav-label text-caption">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
