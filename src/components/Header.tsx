import { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, User, Shield, ArrowLeftRight, LogOut } from 'lucide-react';
import './Header.css';

interface HeaderProps {
  activeTab: string;
  currentClinic: any;
  currentRole: string;
  setActiveTab: (tab: string) => void;
  setSettingsTab: (tab: string) => void;
  setShowSettingsModal: (show: boolean) => void;
  setShowContextModal?: (show: boolean) => void;
  onLogout?: () => void;
}

export default function Header({ 
  currentClinic, 
  currentRole,
  activeTab: _activeTab,
  setActiveTab: _setActiveTab,
  setSettingsTab,
  setShowSettingsModal,
  setShowContextModal,
  onLogout
}: HeaderProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileClick = () => {
    if (setSettingsTab && setShowSettingsModal) {
      setSettingsTab('profile');
      setShowSettingsModal(true);
    }
    setShowProfileDropdown(false);
  };

  const handleSecurityClick = () => {
    if (setSettingsTab && setShowSettingsModal) {
      setSettingsTab('security');
      setShowSettingsModal(true);
    }
    setShowProfileDropdown(false);
  };

  const handleSwitchContextClick = () => {
    if (setShowContextModal) {
      setShowContextModal(true);
    }
    setShowProfileDropdown(false);
  };

  return (
    <header className="header">
      <div className="header-search">
        <Search className="search-icon" size={20} />
        <input type="text" placeholder="Search patients, appointments, labs..." />
      </div>
      
      <div className="header-actions">
        <button className="icon-btn">
          <Bell size={20} />
          <span className="badge"></span>
        </button>
        
        <div className="divider"></div>
        
        <button className="lang-btn">
          <img src="https://flagcdn.com/w20/gb.png" alt="English" className="flag-icon" />
          <span>EN</span>
          <ChevronDown size={16} />
        </button>
        
        <div className="profile-dropdown-container" ref={profileDropdownRef}>
          <button 
            className={`user-profile ${showProfileDropdown ? 'active' : ''}`}
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className="avatar">SC</div>
            <span className="user-name">Sarah Chen</span>
            <ChevronDown size={16} className="text-muted" />
          </button>

          {showProfileDropdown && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-header">
                <span className="profile-name">Sarah Chen</span>
                <span className="profile-email">sarah.chen@email.com</span>
                <span className="profile-context">{currentClinic?.name} &middot; {currentRole}</span>
              </div>
              
              <div className="profile-dropdown-body">
                <button className="profile-menu-item" onClick={handleProfileClick}>
                  <User size={16} className="menu-icon" />
                  <span>My Profile</span>
                </button>
                <button className="profile-menu-item" onClick={handleSecurityClick}>
                  <Shield size={16} className="menu-icon" />
                  <span>Account & Security</span>
                </button>
                <button className="profile-menu-item" onClick={handleSwitchContextClick}>
                  <ArrowLeftRight size={16} className="menu-icon" />
                  <span>Switch Clinic & Role</span>
                </button>
              </div>
              
              <div className="profile-dropdown-footer">
                <button className="profile-menu-item text-danger" onClick={onLogout}>
                  <LogOut size={16} className="menu-icon" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
