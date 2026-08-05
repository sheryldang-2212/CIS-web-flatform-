
import './Splash.css';

interface SplashProps {
  onNavigate: (screen: string) => void;
}

export default function Splash({ onNavigate }: SplashProps) {
  return (
    <div className="splash-container">
      <div className="splash-image-area">
        {/* Placeholder for illustration */}
      </div>
      
      <div className="splash-content">
        <h1 className="splash-title">Know what deserves attention</h1>
        <p className="splash-text">
          Track trends over time and see what's on track and what may need a closer look.
        </p>
        
        <div className="pagination-dots">
          <div className="dot active"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        
        <button 
          className="btn-primary"
          onClick={() => onNavigate('signup')}
        >
          Explore My Health
        </button>
        <button 
          className="btn-outline"
          onClick={() => onNavigate('home')}
        >
          I already have an account
        </button>
      </div>
    </div>
  );
}
