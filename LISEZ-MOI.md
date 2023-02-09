# my-cv, un projet développé par Basile Carle

## Objectif de ce projet

Le but de ce micro-projet est de faire la démonstration, autours d’un élément factuel que tout le monde connait, le CV, des compétences que j’ai acquises grâce à ma formation initiale de développeur web et web mobile dans un cadre double : celui d’un passage de titre de Développeur Web et Web Mobile et de recherche d’emploi / alternance. Si la fonctionnalité la plus évidente est de présenter mon CV à un recruteur potentiel, il doit aussi me permettre de mieux suivre la relation avec le prospect (le recruteur) et de l’inciter à me contacter, prendre rendez-vous à travers les fonctionnalités développées sur cette application, me fournir un retour éventuel sur mon profil. Pour cela le recruteur pourra disposer d’un espace individuel sécurisé fournissant un historique des interactions qu’il aura eu. Le propriétaire du CV, disposera quant à lui d’une interface de gestion de ces interactions en tant qu’administrateur. Bien qu’en apparence répliquant des outils pleinement fonctionnels déjà disponibles sur le marché, la vertu de cet exercice appliqué est d’en faire un support personnalisé idéal de discussion avec le recruteur, tout en l’incitant de manière utilitaire à faire l’expérience des compétences que j’ai su développer. Développé en React sur le frontend et Node/express/mySQL pour le backend, ce projet est donc un projet fullstack développé de manière individuelle mais en s’imposant les principes de la méthode agile.

## installation et configuration

Ce projet s'appuie sur React sur le front et le couple express / mysql sur le back avec une architecture modèle controlleur pour la gestion des routes et l'accès au données

Pour configurer le projet :

1. Créer la base de donnée à partir du fichier database.sql
2. les dossier backend et frontend ont chacun leur propre fichier .env.sample à dupliquer et renommer en .env
   > Dans le backend, configurer les éléments de la base de donnée, à savoir :
   - PRIVATEKEY : clef privée à créer pour générer le token
   - DB_USER et DB_password
   - ADMIN_EMAIL : l'email utilisé par défaut pour identifier le destinataire des messages envoyés par l'utilisateur
     > Dans le Frontend, il n'y a rien à configurer à priori si le projet est déployé en local
3. executer npm run setup à la racine du dossier
4. lancer le projet avec npm run dev

Pour accéder à la page d'admin, il faut créer un utilisateur sur la page "/login" puis manuellement ajouter la valeur "admin" dans la colonne type dans la table user

> ex : UPDATE user SET type = "admin" WHERE email = "xxx" dans mysql

5. une fois loggué, l'admin est automatiquement redirigé vers la page d'admin sur laquelle il peut créer des disponibilités types par jour, sans quoi un utilisateur ne sera pas capable de prendre un rendez vous

## Fonctionnalités disponibles à ce jour

1. consultation du CV
2. afficher QRCode pour recupérer le CV sur mobile directement
3. Prise de rendez-vous par le biais du menu-burger
4. Création d'utilisateur sur la page "/login"
5. Connexion avec son compte utilisateur
6. Pour l'utilisateur admin, possibilité de configurer ses disponibilités, supprimer ou modifier un utilisateur enregistré et consulter les messages envoyés

## Fonctionnalités en développement

1. plus de possibilités de partage du CV
2. possibilités de laisser un avis
3. développement d'un espace utilisateur (non admin) complet pour consulter son historique, emmettre des recommandations, supprimer son compte si nécessaire
4. Pour l'admin, développement d'un dashboard permettant de suivre les statistiques de consultation du site
