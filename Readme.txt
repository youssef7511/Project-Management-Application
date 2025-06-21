Application de Gestion de Projets
Cette application web permet de gérer facilement plusieurs projets en un seul endroit. Elle offre une interface utilisateur intuitive pour ajouter, modifier, supprimer et suivre l'état de vos projets.
Fonctionnalités

Ajout de projet : créez un nouveau projet avec un nom, une description, des dates de début et de fin, et un état initial.
Liste des projets : visualisez tous vos projets sous forme de cartes bien organisées.
Modification de projet : mettez à jour les informations d'un projet existant à tout moment.
Suppression de projet : retirez les projets que vous ne souhaitez plus suivre.
Gestion des états : suivez facilement l'état de chaque projet (En attente, En cours, Terminé).
Sauvegarde locale : tous vos projets sont automatiquement sauvegardés dans le stockage local de votre navigateur (localStorage).
Interface responsive : utilisez l'application sur n'importe quel appareil (ordinateur, tablette, smartphone).



Structure des fichiers

index.html : contient la structure de la page web
styles.css : contient tous les styles pour l'interface utilisateur
script.js : contient toute la logique de l'application

Guide d'utilisation
Ajouter un projet

Clique sur le bouton "Ajouter un projet" en haut de la page.
Remplissez le formulaire avec les informations de votre projet :

Nom du projet (obligatoire)
Description (facultative)
Date de début (obligatoire)
Date de fin (obligatoire)
État (En attente, En cours, Terminé)


Cliquez sur "Enregistrer" pour créer le projet.

Modifier un projet

Sur la carte du projet que vous souhaitez modifier, clique sur le bouton "Modifier".
Mettez à jour les informations dans le formulaire qui s'affiche.
Clique sur "Enregistrer" pour appliquer les modifications.

Supprimer un projet

Sur la carte du projet que vous souhaitez supprimer, clique sur le bouton "Supprimer".
Confirme la suppression dans la boîte de dialogue qui apparaît.

Changer l'état d'un projet
Pour changer l'état d'un projet :

Clique sur le bouton "Modifier" du projet concerné.
Sélectionne le nouvel état dans le menu déroulant.
Clique sur "Enregistrer" pour appliquer le changement.

Considérations techniques

L'application utilise HTML5, CSS3 et JavaScript vanilla (aucune bibliothèque externe n'est requise).
Les données sont stockées localement dans le navigateur via localStorage.
Interface responsive adaptée à tous les appareils.

Personnalisation
on peut  facilement personnaliser l'apparence de l'application en modifiant les variables CSS définies au début du fichier styles.css :
css:root {
    --primary-color: #4361ee;
    --secondary-color: #3f37c9;
    --success-color: #4cc9f0;
    --danger-color: #f72585;
    --warning-color: #f8961e;
    --light-color: #f8f9fa;
    --dark-color: #343a40;
    --border-radius: 8px;
}