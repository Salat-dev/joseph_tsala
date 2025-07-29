// chat.js - Fonctionnalités du chat

class ChatManager {
    constructor() {
        this.messages = [];
        this.init();
    }

    init() {
        this.setupChatWidget();
        this.loadMessages();
    }

    // Configuration du widget de chat
    setupChatWidget() {
        // Le widget est déjà configuré dans main.js
        // Cette classe peut être étendue pour des fonctionnalités avancées
    }

    // Charger les messages
    loadMessages() {
        // Charger depuis localStorage ou une API
        const savedMessages = localStorage.getItem('chatMessages');
        if (savedMessages) {
            this.messages = JSON.parse(savedMessages);
        } else {
            // Messages par défaut
            this.messages = [
                {
                    id: 1,
                    text: 'Bonjour ! Bienvenue sur mon portfolio. Comment puis-je vous aider ?',
                    sender: 'bot',
                    timestamp: new Date().toISOString()
                }
            ];
        }
        this.displayMessages();
    }

    // Afficher les messages
    displayMessages() {
        const messagesContainer = document.querySelector('.chat-messages');
        if (!messagesContainer) return;
        
        messagesContainer.innerHTML = '';
        
        this.messages.forEach(message => {
            const messageElement = this.createMessageElement(message);
            messagesContainer.appendChild(messageElement);
        });
        
        // Faire défiler vers le bas
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Créer un élément de message
    createMessageElement(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender === 'user' ? 'sent' : 'received'}`;
        
        const date = new Date(message.timestamp);
        const timeString = date.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageElement.innerHTML = `
            <div class="message-content">${this.escapeHtml(message.text)}</div>
            <div class="message-time">${timeString}</div>
        `;
        
        return messageElement;
    }

    // Envoyer un message
    sendMessage(text) {
        if (!text.trim()) return;
        
        // Ajouter le message de l'utilisateur
        const userMessage = {
            id: Date.now(),
            text: text,
            sender: 'user',
            timestamp: new Date().toISOString()
        };
        
        this.messages.push(userMessage);
        this.saveMessages();
        this.displayMessages();
        
        // Simuler une réponse du bot
        setTimeout(() => {
            this.sendBotResponse();
        }, 1000);
    }

    // Réponse automatique du bot
    sendBotResponse() {
        const responses = [
            "Merci pour votre message. Je vous répondrai dès que possible.",
            "J'ai bien reçu votre message. Je reviens vers vous rapidement.",
            "Merci de m'avoir contacté. Je vais examiner votre demande.",
            "Votre message a été reçu. Je vous contacte bientôt."
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const botMessage = {
            id: Date.now(),
            text: randomResponse,
            sender: 'bot',
            timestamp: new Date().toISOString()
        };
        
        this.messages.push(botMessage);
        this.saveMessages();
        this.displayMessages();
    }

    // Sauvegarder les messages
    saveMessages() {
        localStorage.setItem('chatMessages', JSON.stringify(this.messages));
    }

    // Échapper le HTML pour la sécurité
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialisation du chat
document.addEventListener('DOMContentLoaded', () => {
    window.chatManager = new ChatManager();
    
    // Attacher les événements d'envoi de message
    const sendMessageBtn = document.getElementById('sendMessage');
    const messageInput = document.getElementById('messageInput');
    
    if (sendMessageBtn && messageInput) {
        sendMessageBtn.addEventListener('click', () => {
            const text = messageInput.value.trim();
            if (text) {
                window.chatManager.sendMessage(text);
                messageInput.value = '';
            }
        });
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const text = messageInput.value.trim();
                if (text) {
                    window.chatManager.sendMessage(text);
                    messageInput.value = '';
                }
            }
        });
    }
});