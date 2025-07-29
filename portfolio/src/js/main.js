// main.js - Fonctionnalités principales du portfolio

class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupDarkMode();
        this.setupChatWidget();
        this.setupNotifications();
    }

    // Configuration du menu mobile
    setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navList = document.querySelector('.nav-list');
        
        if (menuToggle && navList) {
            menuToggle.addEventListener('click', () => {
                navList.style.display = navList.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    }

    // Défilement fluide pour les ancres
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Mode sombre automatique selon l'heure
    setupDarkMode() {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Vérifier l'heure actuelle (mode sombre entre 19h et 7h)
        const hour = new Date().getHours();
        const isNightTime = hour >= 19 || hour < 7;
        
        if (prefersDarkScheme.matches || isNightTime) {
            document.body.classList.add('dark-mode');
        }
        
        // Écouter les changements de préférence système
        prefersDarkScheme.addEventListener('change', (e) => {
            if (e.matches) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        });
    }

    // Widget de chat
    setupChatWidget() {
        const chatWidget = document.getElementById('chatWidget');
        const chatButton = document.createElement('button');
        chatButton.className = 'chat-button';
        chatButton.innerHTML = '<i class="fas fa-comment"></i>';
        chatButton.title = 'Ouvrir le chat';
        
        document.body.appendChild(chatButton);
        
        chatButton.addEventListener('click', () => {
            chatWidget.style.display = 'flex';
            this.loadChatMessages();
        });
        
        document.getElementById('closeChat').addEventListener('click', () => {
            chatWidget.style.display = 'none';
        });
        
        document.getElementById('sendMessage').addEventListener('click', () => {
            this.sendMessage();
        });
        
        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    loadChatMessages() {
        const messagesContainer = document.querySelector('.chat-messages');
        messagesContainer.innerHTML = `
            <div class="message received">
                <div class="message-content">
                    Bonjour ! Comment puis-je vous aider ?
                </div>
                <div class="message-time">Maintenant</div>
            </div>
        `;
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (message) {
            const messagesContainer = document.querySelector('.chat-messages');
            const messageElement = document.createElement('div');
            messageElement.className = 'message sent';
            messageElement.innerHTML = `
                <div class="message-content">${message}</div>
                <div class="message-time">Maintenant</div>
            `;
            
            messagesContainer.appendChild(messageElement);
            input.value = '';
            
            // Simuler une réponse automatique
            setTimeout(() => {
                const responseElement = document.createElement('div');
                responseElement.className = 'message received';
                responseElement.innerHTML = `
                    <div class="message-content">
                        Merci pour votre message. Je vous répondrai dès que possible.
                    </div>
                    <div class="message-time">Maintenant</div>
                `;
                messagesContainer.appendChild(responseElement);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
            
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Notifications
    setupNotifications() {
        // Cette fonction sera implémentée dans notifications.js
    }

    // Afficher une notification
    showNotification(title, message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        notification.innerHTML = `
            <div class="notification-header">
                <h4 class="notification-title">${title}</h4>
                <button class="notification-close">&times;</button>
            </div>
            <p>${message}</p>
        `;
        
        container.appendChild(notification);
        
        // Fermer au clic sur le bouton
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });
        
        // Fermer automatiquement après 5 secondes
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialisation du portfolio
document.addEventListener('DOMContentLoaded', () => {
    window.portfolio = new Portfolio();
    
    // Afficher une notification de bienvenue
    setTimeout(() => {
        window.portfolio.showNotification(
            'Bienvenue !',
            'Bienvenue sur mon portfolio. N\'hésitez pas à explorer mes projets et à me contacter.',
            'success'
        );
    }, 1000);
});