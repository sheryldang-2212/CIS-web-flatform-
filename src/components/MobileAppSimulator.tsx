import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import './MobileAppSimulator.css';

interface MobileAppSimulatorProps {
  email: string;
  onClose: () => void;
}

export default function MobileAppSimulator({ email, onClose }: MobileAppSimulatorProps) {
  type StepType = 'intro' | 'auth_method_login' | 'auth_method_signup' | 'login' | 'signup' | 'terms' | 'setup_profile' | 'onboarding_quiz' | 'consent' | 'success' | 'declined';
  
  const [step, setStep] = useState<StepType>('intro');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Terms & Profile state
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [profileName, setProfileName] = useState('');
  
  // Quiz state
  const [quizAnswer, setQuizAnswer] = useState('');
  const [consentOptions, setConsentOptions] = useState({
    generalHealth: false,
    lifestyle: false,
    medicalConditions: false,
    allergies: false
  });

  const isConsentValid = Object.values(consentOptions).some(val => val);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('consent');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('terms');
  };

  const handleConsent = () => {
    setStep('success');
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-overlay sim-overlay" onClick={onClose}>
      {/* Mobile Device Frame */}
      <div className="sim-device" onClick={e => e.stopPropagation()}>
        <div className="sim-notch"></div>
        <div className="sim-screen">
          
          {step === 'intro' && (
            <div className="sim-intro-view">
              <div className="sim-intro-graphic">
                {/* Abstract representation of the flower chart */}
                <div className="sim-chart-abstract">
                  <div className="sim-chart-center">82<span>Score</span></div>
                  <div className="sim-petal p1"></div>
                  <div className="sim-petal p2"></div>
                  <div className="sim-petal p3"></div>
                  <div className="sim-petal p4"></div>
                </div>
              </div>
              <div className="sim-intro-content">
                <h1 className="sim-title">Your health, at a glance</h1>
                <p className="sim-subtitle">See your key health markers in one simple view: organized, easy to read, and always up to date.</p>
                
                <div className="sim-dots">
                  <span className="sim-dot active"></span>
                  <span className="sim-dot"></span>
                  <span className="sim-dot"></span>
                </div>
                
                <button className="sim-btn-primary active" onClick={() => setStep('auth_method_signup')}>
                  Explore My Health
                </button>
                <button className="sim-btn-secondary mt-3" onClick={() => setStep('auth_method_login')}>
                  I already have an account
                </button>
              </div>
            </div>
          )}

          {(step === 'auth_method_login' || step === 'auth_method_signup') && (
            <div className="sim-auth-method-view">
              <div className="sim-auth-method-content">
                <h1 className="sim-title">{step === 'auth_method_login' ? 'Login' : 'Get Started'}</h1>
                <p className="sim-subtitle">
                  {step === 'auth_method_login' 
                    ? 'Welcome back. Sign in to see how you\'re doing today.' 
                    : 'Create an account to check your health at a glance and know what to do next.'}
                </p>
                
                <button 
                  className="sim-btn-primary active mt-6" 
                  onClick={() => setStep(step === 'auth_method_login' ? 'login' : 'signup')}
                >
                  <span className="sim-icon-placeholder">✉</span> {step === 'auth_method_login' ? 'Login' : 'Sign up'} with Email
                </button>
                <button className="sim-btn-secondary mt-3">
                  <span className="sim-icon-placeholder">📱</span> {step === 'auth_method_login' ? 'Login' : 'Sign up'} with Mobile
                </button>
                
                <div className="sim-divider">
                  <span>Or continue with</span>
                </div>
                
                <div className="sim-social-btns">
                  <button className="sim-social-btn">G</button>
                  <button className="sim-social-btn line-color">L</button>
                </div>
                
                <p className="sim-bottom-text">
                  {step === 'auth_method_login' ? (
                    <>Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setStep('auth_method_signup'); }}>Sign up now</a></>
                  ) : (
                    <>Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); setStep('auth_method_login'); }}>Login</a></>
                  )}
                </p>
              </div>
              <div className="sim-bg-graphics"></div>
            </div>
          )}

          {step === 'login' && (
            <div className="sim-login-view">
              <div className="sim-login-content">
                <h1 className="sim-title">Login</h1>
                <p className="sim-subtitle">Sign in using your registered email address.</p>
                
                <form className="sim-form" onSubmit={handleLogin}>
                  <div className="sim-form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={email}
                      readOnly
                      className="sim-input"
                    />
                  </div>
                  
                  <div className="sim-form-group">
                    <label>Password</label>
                    <div className="sim-input-with-icon">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="sim-input"
                      />
                      <button 
                        type="button" 
                        className="sim-icon-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  
                  <div className="sim-login-options">
                    <label className="sim-checkbox">
                      <input 
                        type="checkbox" 
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="sim-checkmark"></span>
                      Remember me
                    </label>
                    <a href="#" className="sim-forgot-link">Forgot password</a>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`sim-btn-primary ${password ? 'active' : ''}`}
                    disabled={!password}
                  >
                    Login
                  </button>
                  <button type="button" className="sim-btn-secondary" onClick={() => setStep('auth_method_login')}>
                    Back
                  </button>
                </form>
                
                <p className="sim-bottom-text">
                  Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); setStep('auth_method_signup'); }}>Sign up now</a>
                </p>
              </div>
              <div className="sim-bg-graphics"></div>
            </div>
          )}

          {step === 'signup' && (
            <div className="sim-login-view">
              <div className="sim-login-content">
                <h1 className="sim-title">Sign Up</h1>
                <p className="sim-subtitle">Register using your email address.</p>
                
                <form className="sim-form" onSubmit={handleSignup}>
                  <div className="sim-form-group">
                    <label>Email</label>
                    <input 
                      type="email" 
                      value={email}
                      readOnly
                      className="sim-input"
                    />
                  </div>
                  
                  <div className="sim-form-group">
                    <label>Password</label>
                    <div className="sim-input-with-icon">
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Create password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="sim-input"
                      />
                      <button 
                        type="button" 
                        className="sim-icon-btn"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <div className="sim-form-group">
                    <label>Confirm Password</label>
                    <input 
                      type="password" 
                      placeholder="Confirm password"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="sim-input"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`sim-btn-primary ${(password && confirmPassword && password === confirmPassword) ? 'active' : ''}`}
                    disabled={!password || password !== confirmPassword}
                  >
                    Continue
                  </button>
                  <button type="button" className="sim-btn-secondary" onClick={() => setStep('auth_method_signup')}>
                    Back
                  </button>
                </form>
              </div>
              <div className="sim-bg-graphics"></div>
            </div>
          )}

          {step === 'terms' && (
            <div className="sim-wizard-view">
              <div className="sim-wizard-content">
                <h2 className="sim-title">Terms & Conditions</h2>
                <div className="sim-terms-box">
                  <p>Welcome to Health Hub. By using our application, you agree to the following terms and conditions.</p>
                  <p>1. <strong>Privacy Policy:</strong> Your health data is encrypted and securely stored. We do not sell your personal data to third parties.</p>
                  <p>2. <strong>Data Usage:</strong> Your data is used exclusively to provide you with insights into your health and to facilitate care with your chosen providers.</p>
                  <p>3. <strong>User Responsibilities:</strong> You are responsible for keeping your account credentials secure.</p>
                </div>
                
                <label className="sim-checkbox mt-4 mb-6">
                  <input 
                    type="checkbox" 
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <span className="sim-checkmark"></span>
                  I agree to the Terms of Service and Privacy Policy
                </label>
                
                <button 
                  className={`sim-btn-primary ${termsAccepted ? 'active' : ''}`}
                  disabled={!termsAccepted}
                  onClick={() => setStep('setup_profile')}
                >
                  Accept
                </button>
              </div>
            </div>
          )}

          {step === 'setup_profile' && (
            <div className="sim-wizard-view">
              <div className="sim-wizard-content">
                <h2 className="sim-title">Set up Profile</h2>
                <p className="sim-subtitle">Tell us a bit about yourself.</p>
                
                <div className="sim-form-group mt-4">
                  <label>Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter your full name"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="sim-input"
                  />
                </div>
                
                <div className="sim-form-group">
                  <label>Date of Birth</label>
                  <input 
                    type="date" 
                    className="sim-input"
                  />
                </div>

                <div className="sim-form-group">
                  <label>Gender</label>
                  <select className="sim-input">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div style={{ flex: 1 }}></div>
                
                <button 
                  className={`sim-btn-primary ${profileName ? 'active' : ''}`}
                  disabled={!profileName}
                  onClick={() => setStep('onboarding_quiz')}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 'onboarding_quiz' && (
            <div className="sim-wizard-view">
              <div className="sim-wizard-content">
                <h2 className="sim-title">Onboarding Quiz</h2>
                <p className="sim-subtitle">Help us personalize your experience.</p>
                
                <div className="sim-form-group mt-6">
                  <label style={{ fontSize: '16px', marginBottom: '16px' }}>What is your primary health goal?</label>
                  
                  <div className="sim-quiz-options">
                    {['General Wellness', 'Managing a condition', 'Weight loss', 'Fitness & Training'].map(opt => (
                      <button 
                        key={opt}
                        className={`sim-quiz-btn ${quizAnswer === opt ? 'selected' : ''}`}
                        onClick={() => setQuizAnswer(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div style={{ flex: 1 }}></div>
                
                <button 
                  className={`sim-btn-primary ${quizAnswer ? 'active' : ''}`}
                  disabled={!quizAnswer}
                  onClick={() => setStep('consent')}
                >
                  Finish
                </button>
              </div>
            </div>
          )}

          {step === 'consent' && (
            <div className="sim-consent-view">
              <div className="sim-consent-header">
                <h2>Data Access Request</h2>
              </div>
              <div className="sim-consent-content">
                <div className="sim-clinic-icon">
                  <div className="sim-clinic-avatar">DC</div>
                </div>
                <h3>Downtown Clinic</h3>
                <p className="sim-consent-desc">
                  Downtown Clinic is requesting access to your Health Hub patient profile to provide you with better care.
                </p>
                
                <div className="sim-consent-details">
                  <h4>Select the data you wish to share:</h4>
                  <div className="sim-consent-options">
                    <label className="sim-checkbox-large">
                      <input 
                        type="checkbox" 
                        checked={consentOptions.generalHealth}
                        onChange={(e) => setConsentOptions({...consentOptions, generalHealth: e.target.checked})}
                      />
                      <span className="sim-checkmark-large"></span>
                      General Health
                    </label>
                    <label className="sim-checkbox-large">
                      <input 
                        type="checkbox" 
                        checked={consentOptions.lifestyle}
                        onChange={(e) => setConsentOptions({...consentOptions, lifestyle: e.target.checked})}
                      />
                      <span className="sim-checkmark-large"></span>
                      Lifestyle
                    </label>
                    <label className="sim-checkbox-large">
                      <input 
                        type="checkbox" 
                        checked={consentOptions.medicalConditions}
                        onChange={(e) => setConsentOptions({...consentOptions, medicalConditions: e.target.checked})}
                      />
                      <span className="sim-checkmark-large"></span>
                      Medical conditions
                    </label>
                    <label className="sim-checkbox-large">
                      <input 
                        type="checkbox" 
                        checked={consentOptions.allergies}
                        onChange={(e) => setConsentOptions({...consentOptions, allergies: e.target.checked})}
                      />
                      <span className="sim-checkmark-large"></span>
                      Allergies
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="sim-consent-actions">
                <p className="sim-consent-terms">
                  By clicking Agree, you consent to sharing your medical data with this clinic. You can revoke this anytime.
                </p>
                <button 
                  className={`sim-btn-primary ${isConsentValid ? 'active' : ''}`} 
                  onClick={handleConsent}
                  disabled={!isConsentValid}
                >
                  Agree & Connect
                </button>
                <button className="sim-btn-secondary" onClick={() => setStep('declined')}>
                  Decline
                </button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="sim-success-view">
              <div className="sim-success-circle">
                <Check size={48} color="white" />
              </div>
              <h2>Successfully Linked!</h2>
              <p>Your patient record is now connected to Downtown Clinic.</p>
            </div>
          )}

          {step === 'declined' && (
            <div className="sim-success-view" style={{ backgroundColor: '#ef4444' }}>
              <div className="sim-success-circle">
                <X size={48} color="white" />
              </div>
              <h2>Access Declined</h2>
              <p>You have chosen not to share your health records with Downtown Clinic.</p>
              <button 
                className="sim-btn-primary active mt-6" 
                style={{ backgroundColor: 'white', color: '#ef4444', width: 'auto', padding: '12px 32px' }}
                onClick={onClose}
              >
                Close Simulator
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
