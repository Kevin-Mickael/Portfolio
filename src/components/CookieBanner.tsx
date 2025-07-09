"use client";

import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true, // Toujours activé
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Vérifier si le cookie a déjà été accepté
    const checkCookie = document.cookie.includes('cookies-accepted=true');
    if (!checkCookie) {
      // Afficher le banner après 1 seconde
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsAccepted(true);
    }
  }, []);

  // Gestion simple du cookie accepté
  const setClientCookie = (name: string, value: string, days: number = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
  };

  const handleAccept = () => {
    setClientCookie('cookies-accepted', 'true');
    setIsAccepted(true);
    setIsVisible(false);
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleClose = () => {
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setCookieSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  if (!isVisible || isAccepted) {
    return null;
  }

  if (isMinimized) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        width: '60px',
        height: '60px',
        background: 'var(--page-background)',
        border: '1px solid var(--neutral-alpha-weak)',
        borderRadius: '16px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animation: 'slideIn 0.5s ease-out'
      }}
      onClick={handleExpand}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      >
        <div style={{
          fontSize: '24px'
        }}>
          🍪
        </div>
      </div>
    );
  }

  return (
    <div className={"cookie-banner"} style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      width: showSettings ? '400px' : '320px',
      background: 'var(--page-background)',
      border: '1px solid var(--neutral-alpha-weak)',
      borderRadius: '16px',
      padding: '20px',
      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      fontFamily: 'var(--font-family)',
      animation: 'slideIn 0.5s ease-out',
      transition: 'width 0.3s ease'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        {/* Bloc titre style accueil */}
        {/* SUPPRIMÉ : Bloc élégante et titres personnalisés */}
        {/* Fin bloc titre style accueil */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'linear-gradient(45deg, #fbbf24, #f59e0b)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}>
              🍪
            </div>
            <h3 style={{
              margin: '0',
              fontSize: '16px',
              fontWeight: '600',
              color: 'var(--neutral-on-background-strong)'
            }}>
              {showSettings ? 'Réglages Cookies' : 'Cookies'}
            </h3>
          </div>
          
          <button
            onClick={handleClose}
            style={{
              width: '24px',
              height: '24px',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--neutral-on-background-weak)',
              fontSize: '16px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--neutral-alpha-weak)';
              e.currentTarget.style.color = 'var(--neutral-on-background-strong)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--neutral-on-background-weak)';
            }}
          >
            ✕
          </button>
        </div>
        
        {!showSettings ? (
          <>
            <p style={{
              margin: '0',
              fontSize: '14px',
              lineHeight: '1.5',
              color: 'var(--neutral-on-background-weak)'
            }}>
              Nous utilisons des cookies pour améliorer votre expérience sur notre site. 
              Vous pouvez personnaliser vos préférences dans les réglages.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={handleSettings}
                style={{
                  padding: '10px 16px',
                  background: 'transparent',
                  color: 'var(--neutral-on-background-weak)',
                  border: '1px solid var(--neutral-alpha-weak)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-family)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--neutral-alpha-weak)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Réglages
              </button>
              <button
                onClick={handleAccept}
                style={{
                  padding: '10px 16px',
                  background: 'var(--light-purple-300)',
                  color: 'var(--neutral-on-background-strong)',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-family)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--light-purple-400)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--light-purple-300)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Accepter
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {/* Cookies Nécessaires */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--neutral-on-background-strong)',
                    marginBottom: '4px'
                  }}>
                    Cookies Nécessaires
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--neutral-on-background-weak)'
                  }}>
                    Essentiels au fonctionnement du site
                  </div>
                </div>
                <div style={{
                  width: '20px',
                  height: '20px',
                  background: '#10b981',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: 'white'
                }}>
                  ✓
                </div>
              </div>

              {/* Cookies Analytics */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--neutral-on-background-strong)',
                    marginBottom: '4px'
                  }}>
                    Cookies Analytics
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--neutral-on-background-weak)'
                  }}>
                    Nous aident à comprendre l&apos;utilisation du site
                  </div>
                </div>
                <label style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '40px',
                  height: '20px'
                }}>
                  <input
                    type="checkbox"
                    checked={cookieSettings.analytics}
                    onChange={(e) => handleSettingChange('analytics', e.target.checked)}
                    style={{
                      opacity: 0,
                      width: 0,
                      height: 0
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: cookieSettings.analytics ? '#10b981' : '#e5e7eb',
                    border: '2px solid',
                    borderColor: cookieSettings.analytics ? '#10b981' : '#d1d5db',
                    borderRadius: '20px',
                    transition: '0.3s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '16px',
                      width: '16px',
                      left: '2px',
                      bottom: '2px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: '0.3s',
                      transform: cookieSettings.analytics ? 'translateX(20px)' : 'translateX(0)',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }} />
                  </span>
                </label>
              </div>

              {/* Cookies Marketing */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--neutral-on-background-strong)',
                    marginBottom: '4px'
                  }}>
                    Cookies Marketing
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--neutral-on-background-weak)'
                  }}>
                    Utilisés pour la publicité personnalisée
                  </div>
                </div>
                <label style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '40px',
                  height: '20px'
                }}>
                  <input
                    type="checkbox"
                    checked={cookieSettings.marketing}
                    onChange={(e) => handleSettingChange('marketing', e.target.checked)}
                    style={{
                      opacity: 0,
                      width: 0,
                      height: 0
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: cookieSettings.marketing ? '#10b981' : '#e5e7eb',
                    border: '2px solid',
                    borderColor: cookieSettings.marketing ? '#10b981' : '#d1d5db',
                    borderRadius: '20px',
                    transition: '0.3s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '16px',
                      width: '16px',
                      left: '2px',
                      bottom: '2px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: '0.3s',
                      transform: cookieSettings.marketing ? 'translateX(20px)' : 'translateX(0)',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }} />
                  </span>
                </label>
              </div>

              {/* Cookies Préférences */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.05)',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--neutral-on-background-strong)',
                    marginBottom: '4px'
                  }}>
                    Cookies Préférences
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: 'var(--neutral-on-background-weak)'
                  }}>
                    Mémorisent vos choix et préférences
                  </div>
                </div>
                <label style={{
                  position: 'relative',
                  display: 'inline-block',
                  width: '40px',
                  height: '20px'
                }}>
                  <input
                    type="checkbox"
                    checked={cookieSettings.preferences}
                    onChange={(e) => handleSettingChange('preferences', e.target.checked)}
                    style={{
                      opacity: 0,
                      width: 0,
                      height: 0
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    cursor: 'pointer',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: cookieSettings.preferences ? '#10b981' : '#e5e7eb',
                    border: '2px solid',
                    borderColor: cookieSettings.preferences ? '#10b981' : '#d1d5db',
                    borderRadius: '20px',
                    transition: '0.3s'
                  }}>
                    <span style={{
                      position: 'absolute',
                      content: '""',
                      height: '16px',
                      width: '16px',
                      left: '2px',
                      bottom: '2px',
                      background: 'white',
                      borderRadius: '50%',
                      transition: '0.3s',
                      transform: cookieSettings.preferences ? 'translateX(20px)' : 'translateX(0)',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }} />
                  </span>
                </label>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => setShowSettings(false)}
                style={{
                  padding: '10px 16px',
                  background: 'transparent',
                  color: 'var(--neutral-on-background-weak)',
                  border: '1px solid var(--neutral-alpha-weak)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-family)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--neutral-alpha-weak)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Retour
              </button>
              <button
                onClick={handleAccept}
                style={{
                  padding: '10px 16px',
                  background: 'var(--light-purple-300)',
                  color: 'var(--neutral-on-background-strong)',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'var(--font-family)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--light-purple-400)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--light-purple-300)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Accepter
              </button>
            </div>
          </>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .cookie-banner {
          /* fallback for desktop, overridden by inline style */
        }
        @media (max-width: 768px) {
          .cookie-banner {
            /* On garde le style desktop : position en bas à gauche, coins arrondis, largeur fixe */
            left: 20px !important;
            right: auto !important;
            bottom: 20px !important;
            width: 90vw !important;
            max-width: 320px !important;
            border-radius: 16px !important;
            padding: 16px !important;
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}; 