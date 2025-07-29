// auth.js - Gestion de l'authentification avec le backend simulé

// Assurez-vous que auth-backend.js est chargé avant ce fichier
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si l'utilisateur est déjà connecté
    checkAuthStatus();
    
    // Gestion des formulaires de connexion/inscription
    setupAuthForms();
});

function checkAuthStatus() {
    if (window.authBackend && authBackend.isAuthenticated()) {
        // Utilisateur connecté
        updateAuthUI(true);
    } else {
        // Utilisateur non connecté
        updateAuthUI(false);
    }
}

function setupAuthForms() {
    // Formulaire de connexion
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Formulaire d'inscription
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Connexion Google
    const googleLoginBtn = document.getElementById('googleLogin');
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', handleGoogleLogin);
    }
    
    // Inscription Google
    const googleRegisterBtn = document.getElementById('googleRegister');
    if (googleRegisterBtn) {
        googleRegisterBtn.addEventListener('click', handleGoogleRegister);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Afficher un indicateur de chargement
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Connexion en cours...';
    submitButton.disabled = true;
    
    // Utiliser le backend simulé
    if (window.authBackend) {
        authBackend.login(email, password)
            .then(result => {
                console.log('Connexion réussie:', result);
                showNotification('Succès', 'Connexion réussie !', 'success');
                
                // Rediriger vers la page d'accueil
                setTimeout(() => {
                    window.location.href = '../../index.html';
                }, 1000);
            })
            .catch(error => {
                console.error('Erreur de connexion:', error);
                showNotification('Erreur', error.message, 'error');
            })
            .finally(() => {
                // Réinitialiser le bouton
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation simple
    if (password !== confirmPassword) {
        showNotification('Erreur', 'Les mots de passe ne correspondent pas', 'error');
        return;
    }
    
    // Afficher un indicateur de chargement
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Inscription en cours...';
    submitButton.disabled = true;
    
    // Utiliser le backend simulé
    if (window.authBackend) {
        const userData = { firstName, lastName, email, password };
        
        authBackend.register(userData)
            .then(result => {
                console.log('Inscription réussie:', result);
                showNotification('Succès', 'Compte créé avec succès !', 'success');
                
                // Rediriger vers la page de connexion
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            })
            .catch(error => {
                console.error('Erreur d\'inscription:', error);
                showNotification('Erreur', error.message, 'error');
            })
            .finally(() => {
                // Réinitialiser le bouton
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    }
}

function handleGoogleLogin() {
    // Afficher un indicateur de chargement
    const googleButton = document.getElementById('googleLogin');
    const originalText = googleButton.innerHTML;
    googleButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion avec Google...';
    googleButton.disabled = true;
    
    // Utiliser le backend simulé
    if (window.authBackend) {
        authBackend.loginWithGoogle()
            .then(result => {
                console.log('Connexion Google réussie:', result);
                showNotification('Succès', 'Connexion Google réussie !', 'success');
                
                // Rediriger vers la page d'accueil
                setTimeout(() => {
                    window.location.href = '../../index.html';
                }, 1000);
            })
            .catch(error => {
                console.error('Erreur de connexion Google:', error);
                showNotification('Erreur', 'Connexion Google échouée', 'error');
            })
            .finally(() => {
                // Réinitialiser le bouton
                googleButton.innerHTML = originalText;
                googleButton.disabled = false;
            });
    }
}

function handleGoogleRegister() {
    // Afficher un indicateur de chargement
    const googleButton = document.getElementById('googleRegister');
    const originalText = googleButton.innerHTML;
    googleButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription avec Google...';
    googleButton.disabled = true;
    
    // Utiliser le backend simulé
    if (window.authBackend) {
        authBackend.registerWithGoogle()
            .then(result => {
                console.log('Inscription Google réussie:', result);
                showNotification('Succès', 'Inscription Google réussie !', 'success');
                
                // Rediriger vers la page d'accueil
                setTimeout(() => {
                    window.location.href = '../../index.html';
                }, 1000);
            })
            .catch(error => {
                console.error('Erreur d\'inscription Google:', error);
                showNotification('Erreur', 'Inscription Google échouée', 'error');
            })
            .finally(() => {
                // Réinitialiser le bouton
                googleButton.innerHTML = originalText;
                googleButton.disabled = false;
            });
    }
}

function updateAuthUI(isAuthenticated) {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    
    if (isAuthenticated && loginBtn && signupBtn) {
        const user = authBackend.getCurrentUser();
        loginBtn.textContent = user ? user.email : 'Compte';
        loginBtn.classList.remove('btn-outline');
        loginBtn.classList.add('btn-primary');
        
        signupBtn.textContent = 'Déconnexion';
        signupBtn.classList.remove('btn-primary');
        signupBtn.classList.add('btn-outline');
        
        // Ajouter un gestionnaire pour la déconnexion
        signupBtn.onclick = function(e) {
            e.preventDefault();
            if (window.authBackend) {
                authBackend.logout()
                    .then(result => {
                        console.log('Déconnexion réussie:', result);
                        showNotification('Succès', 'Vous avez été déconnecté', 'success');
                        updateAuthUI(false);
                        
                        // Recharger la page pour mettre à jour l'interface
                        setTimeout(() => {
                            location.reload();
                        }, 1000);
                    })
                    .catch(error => {
                        console.error('Erreur de déconnexion:', error);
                        showNotification('Erreur', 'Déconnexion échouée', 'error');
                    });
            }
        };
    } else if (loginBtn && signupBtn) {
        loginBtn.textContent = 'Connexion';
        loginBtn.classList.add('btn-outline');
        loginBtn.classList.remove('btn-primary');
        loginBtn.onclick = function() {
            window.location.href = 'src/pages/login.html';
        };
        
        signupBtn.textContent = 'Inscription';
        signupBtn.classList.add('btn-primary');
        signupBtn.classList.remove('btn-outline');
        signupBtn.onclick = function() {
            window.location.href = 'src/pages/register.html';
        };
    }
}

function showNotification(title, message, type = 'info') {
    // Utiliser le système de notification existant s'il est disponible
    if (window.portfolio && typeof window.portfolio.showNotification === 'function') {
        window.portfolio.showNotification(title, message, type);
    } else {
        // Fallback: alert ou console
        if (type === 'error') {
            console.error(`${title}: ${message}`);
        } else {
            console.log(`${title}: ${message}`);
        }
        
        // Afficher une alerte si ce n'est pas une erreur
        if (type !== 'error') {
            alert(`${title}: ${message}`);
        }
    }
}