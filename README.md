# laMovieApp

## Prérequis

Avant de lancer l'application Angular, assurez-vous d'avoir les éléments suivants installés sur votre machine :

### 1. Node.js et npm

L'application Angular nécessite Node.js et npm pour fonctionner. Assurez-vous d'avoir Node.js installé (version 16 ou supérieure recommandée). Vous pouvez le vérifier avec les commandes suivantes :

```bash
node -v
npm -v
```

Si Node.js et npm ne sont pas installés, vous pouvez les télécharger depuis :
https://nodejs.org/

### 2. Angular CLI

Installez Angular CLI globalement sur votre machine si ce n'est pas encore fait :

```bash
npm install -g @angular/cli
```

Vérifiez l'installation en exécutant :

ng version

### 3. Backend Java + MySQL + IA Ollama

L'application Angular se connecte à un backend

Suivez la documentation du backend pour le configurer et le démarrer avant d'exécuter l'application Angular.

```bash
https://github.com/sfbad/fullStackYnov
```

Installation du Projet

Clonez le projet depuis le dépôt :

```bash
git clone https://github.com/massiferrouk/Projet-Film-AI.git
cd ia-movie-app
```

Installez les dépendances du projet :

```bash
npm install
```

Configuration

L'application Angular doit être configurée pour communiquer avec l'API backend.

Ouvrez le fichier src/environments/environment.ts et assurez-vous que l'URL de l'API est correcte :

```bash
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1/chat'
};
```

Si votre backend tourne sur un autre port, modifiez l'URL en conséquence.

Lancer l'Application

Une fois la configuration terminée, vous pouvez démarrer l'application en exécutant :

```bash
ng serve
```

L'application sera accessible à l'adresse suivante dans votre navigateur :

```bash
http://localhost:4200
```

Vérification du Fonctionnement

Assurez-vous que le backend est bien démarré et accessible sur

```bash
http://localhost:8080
```

Vérifiez que MySQL et Ollama sont bien lancés

Testez une requête en utilisant l'interface Angular pour générer un scénario via l'IA

### Remarque

Si vous rencontrez des problèmes de connexion avec l'API backend, assurez-vous que :

Le serveur backend est bien en cours d'exécution

Les CORS sont configurés correctement dans le backend

L'URL de l'API est correcte dans environment.ts