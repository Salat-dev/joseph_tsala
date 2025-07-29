// Fichier pour gérer l'authentification côté client (simulation de backend)
// Dans une vraie application, cela serait géré par un serveur avec une base de données

class AuthBackend {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }
    
    // Enregistrer un nouvel utilisateur
    register(userData) {
        return new Promise((resolve, reject) => {
            // Simulation d'un délai réseau
            setTimeout(() => {
                try {
                    // Vérifier si l'email existe déjà
                    const existingUser = this.users.find(user => user.email === userData.email);
                    if (existingUser) {
                        reject(new Error('Cet email est déjà utilisé'));
                        return;
                    }
                    
                    // Créer un nouvel utilisateur
                    const newUser = {
                        id: Date.now().toString(),
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        email: userData.email,
                        password: this.hashPassword(userData.password), // Dans la vraie vie, le hash se fait côté serveur
                        createdAt: new Date().toISOString()
                    };
                    
                    // Ajouter à la liste des utilisateurs
                    this.users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(this.users));
                    
                    resolve({
                        success: true,
                        message: 'Compte créé avec succès',
                        user: {
                            id: newUser.id,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            email: newUser.email
                        }
                    });
                } catch (error) {
                    reject(new Error('Erreur lors de l\'inscription'));
                }
            }, 1000);
        });
    }
    
    // Connexion d'un utilisateur
    login(email, password) {
        return new Promise((resolve, reject) => {
            // Simulation d'un délai réseau
            setTimeout(() => {
                try {
                    // Trouver l'utilisateur
                    const user = this.users.find(u => u.email === email);
                    if (!user) {
                        reject(new Error('Email ou mot de passe incorrect'));
                        return;
                    }
                    
                    // Vérifier le mot de passe (dans la vraie vie, on compare les hash)
                    if (user.password !== this.hashPassword(password)) {
                        reject(new Error('Email ou mot de passe incorrect'));
                        return;
                    }
                    
                    // Stocker l'utilisateur courant
                    this.currentUser = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    };
                    
                    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                    
                    resolve({
                        success: true,
                        message: 'Connexion réussie',
                        user: this.currentUser
                    });
                } catch (error) {
                    reject(new Error('Erreur lors de la connexion'));
                }
            }, 1000);
        });
    }
    
    // Déconnexion
    logout() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.currentUser = null;
                localStorage.removeItem('currentUser');
                resolve({ success: true, message: 'Déconnexion réussie' });
            }, 500);
        });
    }
    
    // Vérifier si l'utilisateur est connecté
    isAuthenticated() {
        return this.currentUser !== null;
    }
    
    // Obtenir l'utilisateur courant
    getCurrentUser() {
        return this.currentUser;
    }
    
    // Hash simple du mot de passe (NE PAS UTILISER EN PRODUCTION)
    // Dans une vraie application, le hash se fait côté serveur avec bcrypt ou équivalent
    hashPassword(password) {
        // Cette méthode est juste pour la démonstration
        // Dans la vraie vie, n'utilisez jamais cela pour le hash de mots de passe
        return btoa(password); // Base64 encoding (pas sécurisé!)
    }
    
    // Connexion avec Google (simulation)
    loginWithGoogle() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulation d'un utilisateur Google
                const googleUser = {
                    id: 'google_' + Date.now().toString(),
                    firstName: 'Utilisateur',
                    lastName: 'Google',
                    email: 'google.user@example.com',
                    provider: 'google'
                };
                
                this.currentUser = googleUser;
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                
                resolve({
                    success: true,
                    message: 'Connexion Google réussie',
                    user: googleUser
                });
            }, 1500);
        });
    }
    
    // Inscription avec Google (simulation)
    registerWithGoogle() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulation d'un utilisateur Google
                const googleUser = {
                    id: 'google_' + Date.now().toString(),
                    firstName: 'Nouvel',
                    lastName: 'Utilisateur',
                    email: 'new.google.user@example.com',
                    provider: 'google'
                };
                
                // Ajouter à la liste des utilisateurs
                this.users.push({
                    ...googleUser,
                    createdAt: new Date().toISOString()
                });
                localStorage.setItem('users', JSON.stringify(this.users));
                
                this.currentUser = googleUser;
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                
                resolve({
                    success: true,
                    message: 'Inscription Google réussie',
                    user: googleUser
                });
            }, 1500);
        });
    }
}

// Initialiser le backend d'authentification
const authBackend = new AuthBackend();

// Exporter pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthBackend, authBackend };
} else {
    window.authBackend = authBackend;
}