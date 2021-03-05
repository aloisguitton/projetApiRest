# Projet de dashboard connecté

## Démarrer le projet
> npm install
> 
> npm start

## Arborescence 
### Route
Contient toutes les routes qui seront appelées par l'utilisateur. Il faut aussi déclarer les routes dans app.js. 

**userController**
> router.get('allUser', userCtrl.getAllUsers);

*Appelle la function getAllUsers du controlleur userController*


**Exemple app.js:**
> const userRouter = require ('./routes/userRouter');
>
> app.user('/user', userRouter);

### Controlleur
Les controlleurs permettent de faire le lien entre route et model.

Ils sont en charge de renvoyer la réponse à l'utilisateur. Dans "Services/Responses" se trouve trois fonction *success*, *error*, *unauthorized*. On peut appeler ses fonctionnes pour retourner les bons code de réponse au client.

### Model
Le dossier model contient les fonctions qui traitent les donneés. On peut retourner des informations au controlleur avec *return* ou l'utilisateur de *promise*

###models/db.js
Contient les définissions de la base de données SQLite3. 
