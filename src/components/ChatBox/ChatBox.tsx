'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FiX, FiSend, FiUser } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import styles from './ChatBox.module.scss';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  choices?: string[];
}

interface ChatSession {
  messages: Message[];
  userPreferences: {name?: string, interest?: string};
  conversationContext: string[];
}

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! Je suis l\'assistant IA de Kevin Mickael. Je peux vous aider avec ses projets, services, tarifs, et bien plus encore. Que souhaitez-vous savoir ?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState<{name?: string, interest?: string}>({});
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [currentChoices, setCurrentChoices] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    { text: '💰 Prix', message: 'Quels sont vos tarifs ?' },
    { text: '📋 Devis', message: 'Comment obtenir un devis gratuit ?' },
    { text: '💬 Parler directement', message: 'Ouvrir WhatsApp' },
    { text: '📩 Répondre à ce message', message: 'Comment puis-je vous répondre ?' }
  ];

  // Fonctions pour la gestion des cookies
  const setCookie = (name: string, value: string, days: number = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  // Sauvegarder la session
  const saveSession = useCallback(() => {
    const session: ChatSession = {
      messages,
      userPreferences,
      conversationContext
    };
    setCookie('chatSession', JSON.stringify(session));
  }, [messages, userPreferences, conversationContext]);

  // Charger la session
  const loadSession = useCallback(() => {
    const sessionData = getCookie('chatSession');
    if (sessionData) {
      try {
        const session: ChatSession = JSON.parse(sessionData);
        // Convertir les timestamps des chaînes JSON en objets Date
        const messagesWithDates = session.messages ? session.messages.map(msg => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        })) : [{
          id: '1',
          text: 'Bonjour ! Ravi de vous revoir ! Comment puis-je vous aider aujourd\'hui ?',
          isUser: false,
          timestamp: new Date(),
          choices: ['Voir mes projets', 'Demander un devis', 'Contacter Kevin', 'Poser une question']
        }];
        setMessages(messagesWithDates);
        setUserPreferences(session.userPreferences || {});
        setConversationContext(session.conversationContext || []);
      } catch (error) {
        console.error('Erreur lors du chargement de la session:', error);
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Charger la session au démarrage
  useEffect(() => {
    loadSession();
  }, [loadSession]);

  // Sauvegarder la session à chaque changement
  useEffect(() => {
    if (messages.length > 1) {
      saveSession();
    }
  }, [messages, userPreferences, conversationContext, saveSession]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);
    setShowSuggestions(false); // Masquer les suggestions après envoi

    // Ajouter au contexte de conversation
    setConversationContext(prev => [...prev.slice(-4), currentInput.toLowerCase()]);

    // Simulation d'une réponse intelligente avec délai variable
    const responseDelay = Math.random() * 1000 + 800; // 800ms à 1800ms
    setTimeout(() => {
      const responseData = generateIntelligentResponse(currentInput);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseData.text,
        isUser: false,
        timestamp: new Date(),
        choices: responseData.choices
      };
      setMessages(prev => [...prev, botResponse]);
      setCurrentChoices(responseData.choices || []);
      setIsTyping(false);
    }, responseDelay);
  };

  const handleSuggestionClick = (message: string) => {
    // Gestion spéciale pour WhatsApp
    if (message === 'Ouvrir WhatsApp') {
      // Ouvrir WhatsApp directement
      window.open('https://wa.me/23054593145', '_blank');
      
      // Ajouter le message utilisateur
      const userMessage: Message = {
        id: Date.now().toString(),
        text: message,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      
      // Réponse automatique
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'WhatsApp ouvert ! Vous pouvez maintenant discuter directement avec Kevin. 📱✨',
        isUser: false,
        timestamp: new Date(),
        choices: ['Demander un devis', 'Voir ses projets', 'Ses tarifs', 'Autre question']
      };
      setMessages(prev => [...prev, botResponse]);
      setShowSuggestions(false);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setShowSuggestions(false);

    // Ajouter au contexte de conversation
    setConversationContext(prev => [...prev.slice(-4), message.toLowerCase()]);

    // Simulation d'une réponse intelligente
    const responseDelay = Math.random() * 1000 + 800;
    setTimeout(() => {
      const responseData = generateIntelligentResponse(message);
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: responseData.text,
        isUser: false,
        timestamp: new Date(),
        choices: responseData.choices
      };
      setMessages(prev => [...prev, botResponse]);
      setCurrentChoices(responseData.choices || []);
      setIsTyping(false);
    }, responseDelay);
  };

  const generateIntelligentResponse = (userInput: string): { text: string; choices?: string[] } => {
    const input = userInput.toLowerCase();
    let response = '';
    let choices: string[] = [];

    // Reconnaissance des noms pour personnalisation
    const nameMatch = userInput.match(/je m'appelle ([a-zA-ZÀ-ÿ]+)|mon nom est ([a-zA-ZÀ-ÿ]+)/i);
    if (nameMatch) {
      const name = nameMatch[1] || nameMatch[2];
      setUserPreferences(prev => ({ ...prev, name }));
      response = `Enchanté ${name} ! Je retiens votre nom. Comment puis-je vous aider avec les services de Kevin ?`;
      choices = ['Voir ses projets', 'Demander un devis', 'Ses tarifs', 'Le contacter'];
      return { text: response, choices };
    }

    // Salutations personnalisées
    if (input.includes('bonjour') || input.includes('salut') || input.includes('hello')) {
      const greeting = userPreferences.name ? `Bonjour ${userPreferences.name} !` : 'Bonjour !';
      response = `${greeting} Ravi de vous rencontrer. Que souhaitez-vous savoir sur Kevin et ses services ?`;
      choices = ['Ses projets', 'Les tarifs', 'Ses compétences', 'Le contacter'];
      return { text: response, choices };
    }

    // Analyser les intentions avec plus de sophistication
    if (input.includes('contact') || input.includes('email') || input.includes('contacter')) {
      response = 'Contactez Kevin directement sur [WHATSAPP_LINK]WhatsApp[/WHATSAPP_LINK]';
      if (conversationContext.some(ctx => ctx.includes('urgent'))) {
        response += '\n\n⚡ Réponse rapide garantie !';
      }
      choices = ['Demander un devis', 'Voir ses projets', 'Ses tarifs', 'Autre question'];
    } else if (input.includes('projet') || input.includes('développement') || input.includes('site web') || input.includes('application')) {
      response = 'Kevin est spécialisé dans le développement web moderne avec React, Next.js et Node.js. Ses projets incluent des sites e-commerce, des applications web interactives et des portfolios créatifs. 💻';
      if (input.includes('e-commerce') || input.includes('boutique')) {
        response += ' Il a une expertise particulière en solutions e-commerce avec Shopify et WooCommerce.';
      }
      choices = ['Voir le portfolio', 'Demander un devis', 'Les technologies', 'Le contacter'];
    } else if (input.includes('tarif') || input.includes('prix') || input.includes('coût') || input.includes('budget')) {
      response = 'Voici les tarifs de Kevin (hébergement 1 an inclus) : \n• Site web/Portfolio : 7,000 MUR \n• Site complexe (API, chatbox, maps, galerie) : 13,000 MUR \n• Mini-applications web : 25,000 MUR \n\nDevis gratuit disponible ! 💰';
      choices = ['Demander un devis', 'Ses projets', 'Le contacter', 'Autre question'];
    } else if (input.includes('maurice') || input.includes('île maurice') || input.includes('mauritius')) {
      response = 'Kevin est basé à l\'île Maurice 🇲🇺 et travaille avec des clients locaux et internationaux. Il comprend parfaitement les besoins du marché mauricien et les défis des entreprises insulaires !';
      choices = ['Ses projets locaux', 'Travailler à distance', 'Le contacter', 'Ses tarifs'];
    } else if (input.includes('technologie') || input.includes('stack') || input.includes('outils')) {
      response = 'Kevin maîtrise : \n• Frontend: React, Next.js, TypeScript, Sass \n• Backend: Node.js, Express, MongoDB \n• Outils: Git, Docker, AWS \n• Design: Figma, Adobe Creative Suite 🛠️';
      choices = ['Voir ses projets', 'Formation possible', 'Demander un devis', 'Le contacter'];
    } else if (input.includes('expérience') || input.includes('années') || input.includes('portfolio')) {
      response = 'Kevin a plus de 5 ans d\'expérience en développement web. Il a travaillé avec des startups, PME et entreprises internationales. Consultez ses réalisations dans la section "Work" ! ⭐';
      choices = ['Voir le portfolio', 'Références clients', 'Demander un devis', 'Le contacter'];
    } else if (input.includes('merci') || input.includes('thanks')) {
      const name = userPreferences.name ? ` ${userPreferences.name}` : '';
      response = `De rien${name} ! N'hésitez pas si vous avez d'autres questions. Kevin sera ravi de discuter de votre projet ! 😊`;
      choices = ['Demander un devis', 'Le contacter', 'Voir ses projets', 'Autre question'];
    } else if (input.includes('au revoir') || input.includes('bye') || input.includes('à bientôt')) {
      const name = userPreferences.name ? ` ${userPreferences.name}` : '';
      response = `Au revoir${name} ! J'espère vous avoir aidé. N'hésitez pas à revenir si vous avez des questions ! 👋`;
      choices = ['Le contacter maintenant', 'Demander un devis', 'Revenir plus tard', 'Voir ses projets'];
    } else if (input.includes('aide') || input.includes('help') || input.includes('?')) {
      response = 'Je peux vous renseigner sur : \n• Les projets et services de Kevin \n• Les tarifs et devis \n• Les technologies utilisées \n• Comment le contacter \n\nQue souhaitez-vous savoir ? 🤔';
      choices = ['Ses projets', 'Les tarifs', 'Ses compétences', 'Le contacter'];
    } else {
      // Réponses contextuelles intelligentes
      const responses = [
        'C\'est une excellente question ! Pour une réponse détaillée, Kevin pourra vous expliquer cela directement.',
        'Intéressant ! Kevin sera le mieux placé pour vous donner des informations précises à ce sujet.',
        'Je note votre intérêt ! N\'hésitez pas à contacter Kevin pour approfondir cette discussion.',
        'Merci pour votre message ! Kevin sera ravi de vous apporter une réponse personnalisée.'
      ];
      response = responses[Math.floor(Math.random() * responses.length)] + ' 💬';
      choices = ['Le contacter', 'Demander un devis', 'Voir ses projets', 'Poser une autre question'];
    }

    // Gestion du contexte pour conversation suivie
    if (conversationContext.some(ctx => ctx.includes('tarif')) && !input.includes('tarif')) {
      response += '\n\n💡 Rappel : Kevin propose toujours un devis gratuit personnalisé.';
    }
    
    if (conversationContext.some(ctx => ctx.includes('projet')) && userPreferences.interest !== 'projects') {
      setUserPreferences(prev => ({ ...prev, interest: 'projects' }));
    }

    // Suggestions proactives basées sur le contexte
    if (conversationContext.length > 2 && !conversationContext.some(ctx => ctx.includes('contact'))) {
      response += '\n\n🔗 Vous semblez intéressé ! Voulez-vous que je vous donne les coordonnées de Kevin ?';
    }

    return { text: response, choices };
  };

  // Fonction pour rendre les liens cliquables
  const renderMessageWithLinks = (text: string) => {
    // Gérer les liens WhatsApp personnalisés
    const whatsappRegex = /\[WHATSAPP_LINK\](.*?)\[\/WHATSAPP_LINK\]/g;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Diviser d'abord par les liens WhatsApp personnalisés
    const whatsappParts = text.split(whatsappRegex);
    
    return whatsappParts.map((part, index) => {
      // Si c'est le texte entre les balises WhatsApp (index impair)
      if (index % 2 === 1) {
        return (
          <a
            key={index}
            href="#"
            className={styles.messageLink}
            onClick={(e) => {
              e.preventDefault();
              window.open('https://wa.me/23054593145', '_blank');
            }}
          >
            {part}
          </a>
        );
      }
      
      // Pour les autres parties, vérifier s'il y a des URL normales
      const urlParts = part.split(urlRegex);
      return urlParts.map((urlPart, urlIndex) => {
        if (urlRegex.test(urlPart)) {
          return (
            <a
              key={`${index}-${urlIndex}`}
              href={urlPart}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.messageLink}
              onClick={(e) => {
                e.preventDefault();
                window.open(urlPart, '_blank');
              }}
            >
              {urlPart}
            </a>
          );
        }
        return urlPart;
      });
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className={styles.chatBox}>
      {/* Bouton du chatbox avec logo - masqué quand ouvert */}
      {!isOpen && (
        <button
          className={styles.chatToggle}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ouvrir le chat"
        >
          <div className={styles.logoContainer}>
            <Image 
              src="/favicon.png" 
              alt="Logo Kevin Mickael - Développeur web professionnel à l'île Maurice"
              width={48}
              height={48}
              className={styles.mainLogo}
              priority
            />
            <div className={styles.pulseRing}></div>
            <HiSparkles className={styles.sparkleIcon} />
          </div>
        </button>
      )}

      {/* Fenêtre du chat */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.headerContent}>
                <Image 
                  src="/favicon.png" 
                  alt="Assistant IA Kevin - Support client intelligent"
                  width={32}
                  height={32}
                  className={styles.headerLogo}
                />
                <div>
                  <h3>Assistant Kevin</h3>
                  <span className={styles.status}>En ligne</span>
                </div>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chat"
            >
              <FiX size={20} />
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.message} ${
                  message.isUser ? styles.userMessage : styles.botMessage
                }`}
              >
                <div className={styles.messageIcon}>
                  {message.isUser ? (
                    <FiUser size={16} />
                  ) : (
                    <Image 
                      src="/favicon.png" 
                      alt="Avatar Assistant Kevin IA"
                      width={24}
                      height={24}
                      className={styles.botAvatar}
                    />
                  )}
                </div>
                <div className={styles.messageContent}>
                  <p>{renderMessageWithLinks(message.text)}</p>
                  <span className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  {/* Boutons de choix pour les messages du bot */}
                  {!message.isUser && message.choices && message.choices.length > 0 && (
                    <div className={styles.messageChoices}>
                      {message.choices.map((choice, index) => (
                        <button
                          key={index}
                          className={styles.choiceButton}
                          onClick={() => handleSuggestionClick(choice)}
                        >
                          {choice}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className={`${styles.message} ${styles.botMessage}`}>
                <div className={styles.messageIcon}>
                  <Image 
                    src="/favicon.png" 
                    alt="Assistant Kevin en train d'écrire"
                    width={24}
                    height={24}
                    className={styles.botAvatar}
                  />
                </div>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions rapides */}
          {showSuggestions && (
            <div className={styles.suggestionsContainer}>
              <div className={styles.suggestionsGrid}>
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className={styles.suggestionButton}
                    onClick={() => handleSuggestionClick(suggestion.message)}
                  >
                    {suggestion.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.inputContainer}>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tapez votre message..."
              className={styles.messageInput}
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              className={styles.sendButton}
              disabled={!inputValue.trim()}
              aria-label="Envoyer le message"
            >
              <FiSend size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
