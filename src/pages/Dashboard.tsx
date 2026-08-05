import { useState } from 'react';
import { Sun, Bell, Star, Activity, Flame, Droplets, Heart, Dna } from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('latest');

  const categories = [
    { id: 'all', label: 'All', icon: Star, value: '00' },
    { id: 'lifestyle', label: 'Lifestyle', icon: Activity, value: '00' },
    { id: 'metabolic', label: 'Metabolic', icon: Flame, value: '00' },
    { id: 'hematologic', label: 'Hematologic', icon: Droplets, value: '00' },
    { id: 'cardio', label: 'Cardio', icon: Heart, value: '00' },
    { id: 'neuro', label: 'Neuro', icon: Dna, value: '00' },
  ];

  return (
    <div className="flex flex-col h-full hide-scrollbar">
      <div className="dashboard-header">
        <div className="header-top">
          <Sun size={28} className="icon-sunburst" />
          <button className="icon-button">
            <Bell size={20} className="text-navy" />
          </button>
        </div>
        
        <div className="header-text">
          <h1 className="text-h1 mb-1">Hello Patrick</h1>
          <p className="text-body text-muted">Latest result: Jan 8, 2026</p>
        </div>
      </div>

      <div className="dashboard-card hide-scrollbar">
        <div className="tabs-container">
          <button 
            className={`tab-item ${activeTab === 'latest' ? 'active' : ''}`}
            onClick={() => setActiveTab('latest')}
          >
            Latest Result
          </button>
          <button 
            className={`tab-item ${activeTab === 'trend' ? 'active' : ''}`}
            onClick={() => setActiveTab('trend')}
          >
            Trend
          </button>
        </div>

        <div className="categories-slider hide-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.id} className="category-item">
                <div className="category-icon-bg">
                  <Icon size={12} className="icon-small" />
                  <span className="value">{cat.value}</span>
                </div>
                <span className="category-label">{cat.label}</span>
              </div>
            );
          })}
        </div>

        <div className="chart-container">
          <div className="ring-outer">
            <div className="ring-middle">
              <div className="ring-inner">
                <div className="chart-center">
                  <span className="chart-value">00</span>
                  <span className="chart-label">from 100</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
