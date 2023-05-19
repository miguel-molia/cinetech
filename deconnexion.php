<?php 
  
  // Démarrer la session
  session_start();
 
  // Vérifier si la session n'est pas vide
  if(!empty($_SESSION)){
    
    // Libérer toutes les variables de session
    session_unset();
 
    // Détruire toutes les données de la session
    session_destroy();
 
    
 
  }

  // Rediriger l'utilisateur vers la page d'accueil
  header('Location:index.php');
?>