# Rocket Web Stats

Rocket Web Stats transforme vos données Rocket League en un site visuel.

## Requirements

- BakkesMod : https://bakkesplugins.com/
- Plugin GameStats : https://bakkesplugins.com/plugins/view/532
- Terminal (avec **NPM** et **Node.js**)

## Installation :

#### 1. GameStats

Récuperer le chemin du dossier où vos données sont sauvegarder grace à Game Stats \
(Bakkesmod [F2] -> Plugins -> GameStats -> Chemin d'accès)

#### 2. Node.js et NPM

Cloner le repo GitHub, creer un nouveau projet avec ``` npm init ``` \
*Soyez sur que npm est installé (https://nodejs.org/fr/download/)* \
Pour pouvoir lancer le projet, vous devrez installer les paquets suivant :
- csv-parser
- dotenv
- ejs
- express
- fs
- json
- path

``` npm install csv-parser dotenv ejs express fs json path ```

#### 3. Dans votre dossier

Une fois le projet installé avec NPM, vous devrez creer un fichier ```.env``` \
et mettre à l'intérieur de ce fichier le chemin d'accès de vos fichiers souhaités : \
```SAVEDFILEPATH=<folderpath>``` \
Exemple : \
```SAVEDFILEPATH=Folder/SavedFiles```

#### 4. Terminé

Si vous avez suivi toute les étapes, vous devrez pouvoir lancer le programme \
à l'aide de la commande ```node server.js``` directement dans le terminal 

Vous devriez donc voir vos statistiques à l'adresse : http://localhost:3000/ \
__Merci.__

### Auteur:
- Marc-Alexandre BAEHR