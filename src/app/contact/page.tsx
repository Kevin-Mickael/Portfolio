"use client";

import React, { useState, FormEvent, useEffect } from 'react';
import { person } from "@/resources";
import { contact } from "@/resources/content";
import { Metadata } from "next";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}


const ContactPage: React.FC = () => {
  // Ajouter les styles globaux pour les placeholders et enlever l'outline
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      input,
      textarea {
        background: transparent !important;
      }
      input::placeholder,
      textarea::placeholder {
        color: var(--text-medium) !important;
      }
      
      input:focus,
      textarea:focus {
        outline: none !important;
        background: transparent !important;
      }
      
      input:focus-visible,
      textarea:focus-visible {
        outline: none !important;
        background: transparent !important;
      }
      
      @keyframes rotate {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      
      /* Responsive styles */
      @media (max-width: 768px) {
        .form-row {
          flex-direction: column !important;
          gap: 20px !important;
        }
        
        .form-container {
          padding: 0 16px !important;
        }
        
        .title {
          font-size: 48px !important;
          letter-spacing: -2px !important;
        }
      }
      
      @media (max-width: 480px) {
        .title {
          font-size: 36px !important;
          letter-spacing: -1px !important;
        }
        
        .form-container {
          padding: 0 12px !important;
        }
      }
      

    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (formStatus === 'success') {
      const timer = setTimeout(() => {
        setFormStatus('idle');
        window.location.reload();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [formStatus]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus('idle');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setFormStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  useEffect(() => {
    // Ajoute le script Tenor pour l'embed
    const script = document.createElement('script');
    script.src = 'https://tenor.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section style={{
      /* Variables de couleurs */
      '--primary-color': '#fbbf24',
      '--primary-hover': '#f59e0b',
      '--error-color': '#dc5151',
      '--text-dark': 'var(--neutral-on-background-strong)',
      '--text-medium': 'var(--neutral-on-background-weak)',
      '--bg-color': 'var(--page-background)',
      '--white': 'var(--page-background)',
      '--black': 'var(--neutral-on-background-strong)',
      
      /* Variables de couleurs light-purple */
      '--light-purple-100': '#ebe8fe',
      '--light-purple-200': '#ddd9fd',
      '--light-purple-300': '#ccc6fb',
      '--light-purple-400': '#bbb3fa',
      '--light-purple-500': '#aaa0f9',
      '--light-purple-600': '#9a8df8',
      '--light-purple-700': '#7867f5',
      
      /* Typographie */
      '--font-family': 'Inter, sans-serif',
      
      /* Styles de base de la section */
      padding: '104px 0 120px 0',
      backgroundColor: 'var(--bg-color)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    } as React.CSSProperties}>
      <div className="form-container" style={{
        width: '100%',
        maxWidth: '690px',
        padding: '0 20px',
        margin: '0 auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: '32px'
        }}>
          <h1 className="title" style={{
            fontFamily: 'var(--font-family)',
            fontWeight: '600',
            fontSize: '64px',
            lineHeight: '1.1',
            letterSpacing: '-3.2px',
            color: 'var(--black)',
            margin: '0',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px'
          }}>
            Contactez-nous
            <span style={{fontSize: '48px', lineHeight: '1'}}>✉️</span>
          </h1>
          <p style={{
            fontSize: '16px',
            fontFamily: 'var(--font-family)',
            fontWeight: '500',
            color: 'var(--text-dark)',
            margin: '0',
            textAlign: 'center'
          }}>
            Que vous ayez des questions, besoin d&apos;aide, ou simplement<br />
            envie de dire bonjour, je suis là pour vous aider !
          </p>
        </div>
        
        <form style={{ marginTop: '64px' }} onSubmit={handleSubmit}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px'
          }}>
            <div className="form-row" style={{
              display: 'flex',
              gap: '20px'
            }}>
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderRadius: '24px',
                  minHeight: '71px',
                  cursor: 'text',
                  position: 'relative',
                  zIndex: '1',
                  padding: '10px 14px',
                  border: '1px solid var(--neutral-alpha-weak)',
                  transition: 'box-shadow 300ms ease, border-color 300ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                  e.currentTarget.style.borderColor = 'var(--light-purple-300)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--neutral-alpha-weak)';
                }}
              >
                <label style={{
                  fontSize: '16px',
                  lineHeight: '22px',
                  color: 'var(--text-medium)',
                  fontWeight: '400',
                  pointerEvents: 'none'
                }} htmlFor="firstName">Prénom</label>
                <input
                  id="firstName"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'var(--font-family)',
                    lineHeight: '22.4px',
                    backgroundColor: 'transparent',
                    cursor: 'text',
                    border: 'none',
                    color: 'var(--text-dark)'
                  }}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  placeholder="Votre prénom"
                  onFocus={(e) => {
                    e.currentTarget.parentElement!.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                    e.currentTarget.parentElement!.style.borderColor = 'var(--light-purple-300)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.parentElement!.style.boxShadow = 'none';
                    e.currentTarget.parentElement!.style.borderColor = 'var(--neutral-alpha-weak)';
                  }}
                />
              </div>
              <div 
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  width: '100%',
                  backgroundColor: 'transparent',
                  borderRadius: '24px',
                  minHeight: '71px',
                  cursor: 'text',
                  position: 'relative',
                  zIndex: '1',
                  padding: '10px 14px',
                  border: '1px solid var(--neutral-alpha-weak)',
                  transition: 'box-shadow 300ms ease, border-color 300ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                  e.currentTarget.style.borderColor = 'var(--light-purple-300)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--neutral-alpha-weak)';
                }}
              >
                <label style={{
                  fontSize: '16px',
                  lineHeight: '22px',
                  color: 'var(--text-medium)',
                  fontWeight: '400',
                  pointerEvents: 'none'
                }} htmlFor="lastName">Nom</label>
                <input
                  id="lastName"
                  style={{
                    fontSize: '16px',
                    fontFamily: 'var(--font-family)',
                    lineHeight: '22.4px',
                    backgroundColor: 'transparent',
                    cursor: 'text',
                    border: 'none',
                    color: 'var(--text-dark)'
                  }}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                  onFocus={(e) => {
                    e.currentTarget.parentElement!.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                    e.currentTarget.parentElement!.style.borderColor = 'var(--light-purple-300)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.parentElement!.style.boxShadow = 'none';
                    e.currentTarget.parentElement!.style.borderColor = 'var(--neutral-alpha-weak)';
                  }}
                />
              </div>
            </div>
            
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
                backgroundColor: 'transparent',
                borderRadius: '24px',
                minHeight: '71px',
                cursor: 'text',
                position: 'relative',
                zIndex: '1',
                padding: '10px 14px',
                border: '1px solid var(--neutral-alpha-weak)',
                transition: 'box-shadow 300ms ease, border-color 300ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                e.currentTarget.style.borderColor = 'var(--light-purple-300)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--neutral-alpha-weak)';
              }}
            >
              <label style={{
                fontSize: '16px',
                lineHeight: '22px',
                color: 'var(--text-medium)',
                fontWeight: '400',
                pointerEvents: 'none'
              }} htmlFor="email">Email</label>
              <input
                id="email"
                style={{
                  fontSize: '16px',
                  fontFamily: 'var(--font-family)',
                  lineHeight: '22.4px',
                  backgroundColor: 'transparent',
                  cursor: 'text',
                  border: 'none',
                  color: 'var(--text-dark)'
                }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="votre@email.com"
                onFocus={(e) => {
                  e.currentTarget.parentElement!.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                  e.currentTarget.parentElement!.style.borderColor = 'var(--light-purple-300)';
                }}
                onBlur={(e) => {
                  e.currentTarget.parentElement!.style.boxShadow = 'none';
                  e.currentTarget.parentElement!.style.borderColor = 'var(--neutral-alpha-weak)';
                }}
              />
            </div>
            
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
                backgroundColor: 'transparent',
                borderRadius: '24px',
                minHeight: '71px',
                cursor: 'text',
                position: 'relative',
                zIndex: '1',
                padding: '10px 14px',
                border: '1px solid var(--neutral-alpha-weak)',
                transition: 'box-shadow 300ms ease, border-color 300ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                e.currentTarget.style.borderColor = 'var(--light-purple-300)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--neutral-alpha-weak)';
              }}
            >
              <label style={{
                fontSize: '16px',
                lineHeight: '22px',
                color: 'var(--text-medium)',
                fontWeight: '400',
                pointerEvents: 'none'
              }} htmlFor="subject">Sujet</label>
              <input
                id="subject"
                style={{
                  fontSize: '16px',
                  fontFamily: 'var(--font-family)',
                  lineHeight: '22.4px',
                  backgroundColor: 'transparent',
                  cursor: 'text',
                  border: 'none',
                  color: 'var(--text-dark)'
                }}
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Sujet de votre message"
                onFocus={(e) => {
                  e.currentTarget.parentElement!.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                  e.currentTarget.parentElement!.style.borderColor = 'var(--light-purple-300)';
                }}
                onBlur={(e) => {
                  e.currentTarget.parentElement!.style.boxShadow = 'none';
                  e.currentTarget.parentElement!.style.borderColor = 'var(--neutral-alpha-weak)';
                }}
              />
            </div>
            
            <div 
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                width: '100%',
                backgroundColor: 'transparent',
                borderRadius: '24px',
                minHeight: '133px',
                cursor: 'text',
                position: 'relative',
                zIndex: '1',
                padding: '10px 14px',
                border: '1px solid var(--neutral-alpha-weak)',
                transition: 'box-shadow 300ms ease, border-color 300ms ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                e.currentTarget.style.borderColor = 'var(--light-purple-300)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--neutral-alpha-weak)';
              }}
            >
              <label style={{
                fontSize: '16px',
                lineHeight: '22px',
                color: 'var(--text-medium)',
                fontWeight: '400',
                pointerEvents: 'none'
              }} htmlFor="message">Message</label>
              <textarea
                id="message"
                style={{
                  fontSize: '16px',
                  fontFamily: 'var(--font-family)',
                  lineHeight: '22.4px',
                  backgroundColor: 'transparent',
                  cursor: 'text',
                  border: 'none',
                  resize: 'vertical',
                  minHeight: '100px',
                  color: 'var(--text-dark)'
                }}
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Décrivez votre projet ou votre demande..."
                onFocus={(e) => {
                  e.currentTarget.parentElement!.style.boxShadow = 'var(--light-purple-300) 0 0 0 4px';
                  e.currentTarget.parentElement!.style.borderColor = 'var(--light-purple-300)';
                }}
                onBlur={(e) => {
                  e.currentTarget.parentElement!.style.boxShadow = 'none';
                  e.currentTarget.parentElement!.style.borderColor = 'var(--neutral-alpha-weak)';
                }}
              />
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            columnGap: '30px',
            minHeight: '52px',
            alignItems: 'center',
            marginTop: '46px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              minWidth: '170px'
            }}>
              <button 
                type="submit" 
                style={{
                  backgroundColor: 'var(--primary-color)',
                  fontSize: '18px',
                  fontFamily: 'var(--font-family)',
                  fontWeight: '400',
                  lineHeight: '28px',
                  color: 'var(--text-dark)',
                  display: 'flex',
                  columnGap: '5px',
                  alignItems: 'center',
                  borderRadius: '24px',
                  justifyContent: 'center',
                  height: '44px',
                  width: '170px',
                  padding: '8px 42px',
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'background-color 300ms ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-hover)';
                  // Animer la ligne
                  const line = e.currentTarget.querySelector('div[style*="height: 2px"]') as HTMLElement;
                  if (line) {
                    line.style.width = '20px';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-color)';
                  // Réinitialiser la ligne
                  const line = e.currentTarget.querySelector('div[style*="height: 2px"]') as HTMLElement;
                  if (line) {
                    line.style.width = '0';
                  }
                }}
              >
                <span>Envoyer</span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <div 
                    style={{
                      height: '2px',
                      width: '0',
                      backgroundColor: 'var(--text-dark)',
                      borderRadius: '77px',
                      transform: 'translateX(10px)',
                      transition: 'width 300ms ease-out'
                    }}
                  ></div>
                  <svg style={{
                    width: '16px',
                    height: '16px'
                  }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.2739 7.32172C12.6275 7.70479 12.6275 8.29522 12.2739 8.67829L7.19694 14.1783C6.82234 14.5841 6.18968 14.6094 5.78386 14.2348C5.37804 13.8602 5.35273 13.2275 5.72734 12.8217L10.1782 8L5.72734 3.17829C5.35273 2.77246 5.37804 2.13981 5.78386 1.7652C6.18968 1.3906 6.82234 1.4159 7.19694 1.82173L12.2739 7.32172Z" fill="currentColor" />
                    <rect width="1" height="2" rx="0.5" transform="matrix(-1 0 0 1 12 7)" fill="currentColor" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          
          {formStatus === 'success' && (
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              background: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              padding: '16px 20px',
              position: 'relative',
              maxWidth: '380px',
              margin: '40px auto 0 auto',
              minWidth: '320px',
            }}>
              <span style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#e7f9ef',
                flexShrink: 0,
                marginTop: 2
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="10" fill="#22c55e" fillOpacity="0.15"/><path d="M6 10.5L9 13.5L14 8.5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#222', fontSize: 16, marginBottom: 2 }}>Message envoyé avec succès !</div>
                <div style={{ color: '#6b7280', fontSize: 14 }}>Votre message a bien été transmis. Vous recevrez une réponse rapidement.</div>
              </div>
              <button onClick={() => setFormStatus('idle')} style={{
                position: 'absolute',
                right: 12,
                top: 12,
                background: 'transparent',
                border: 'none',
                color: '#9ca3af',
                fontSize: 18,
                cursor: 'pointer',
                fontWeight: 700,
                lineHeight: 1
              }} aria-label="Fermer la notification">×</button>
            </div>
          )}
          
          {formStatus === 'error' && (
            <div style={{
              color: 'var(--white)',
              fontFamily: 'var(--font-family)',
              fontSize: '20px',
              lineHeight: '30px',
              borderRadius: '18px',
              textAlign: 'center',
              fontWeight: '500',
              padding: '20px',
              marginTop: '48px',
              backgroundColor: 'var(--error-color)'
            }}>
              <p style={{ margin: '0' }}>Erreur l&apos;envoi</p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

// Styles globaux pour les placeholders
const globalStyles = `
  input::placeholder,
  textarea::placeholder {
    color: var(--text-medium) !important;
  }
`;

export default ContactPage;
