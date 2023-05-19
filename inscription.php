<?php

// Inclure le fichier contenant les informations de connexion à la base de données
require "bdd.php";

// Démarrer une session
session_start();

// Vérifier si le bouton de validation du formulaire a été cliqué
if (isset($_POST['valider'])) {

  // Récupérer les données du formulaire
  $login = $_POST['login'];
  $c_password = $_POST['c_password'];
  $password = $_POST['password'];

  // Tableau pour stocker les messages d'erreur
  $error = [];

  // Vérifier que le champ nom d'utilisateur n'est pas vide
  if (empty($login)) {
    $error[] = "Veuillez indiquer le nom d'utilisateur";
  }

  // Vérifier que le champ mot de passe n'est pas vide
  if (empty($password)) {
    $error[] = 'Veuillez indiquer le mot de passe';
  }

  // Vérifier que le champ de confirmation du mot de passe n'est pas vide
  if (empty($c_password)) {
    $error[] = 'Veuillez indiquer la confirmation du mot de passe';
  }

  // Vérifier qu'il n'y a pas d'erreurs
  if (empty($error)) {
    // Vérifier que les mots de passe saisis correspondent
    if ($password !== $c_password) {
      $error[] = 'Les mots de passe ne correspondent pas';
    } else {
      // Préparer la requête SQL pour vérifier si le nom d'utilisateur existe déjà
      $checkLogin = $bdd->prepare("SELECT * from utilisateurs WHERE login = ?");
      $checkLogin->execute([$login]);
      $result = $checkLogin->fetch(PDO::FETCH_ASSOC);

      // Vérifier si le nom d'utilisateur existe déjà
      if ($checkLogin->rowCount() != 0) {
        $error[] = 'Le nom d\'utilisateur est déjà pris';
      } else {
        // Hasher le mot de passe saisi
        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        // Préparer la requête SQL pour ajouter l'utilisateur à la base de données
        $register = $bdd->prepare("INSERT INTO `utilisateurs`(`login`, `password`) VALUES (?,?)");
        $register->execute([$login, $password_hash]);
      }
    }
  }
}

?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inscription</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.css" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />

</head>

<body>
  <header>

    <?php require("./header.php");  ?>


  </header>

  <main>

    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
              <div class="card-body p-5 text-center">

                <div class="mb-md-5 mt-md-4 pb-5">

                  <h2 class="fw-bold mb-2 text-uppercase">Inscription</h2>

                  <form method="POST">

                    <div class="form-outline form-white mb-4">
                      <input type="text" name="login" class="form-control form-control-lg" />
                      <label class="form-label" for="login">Nom d'utilisateur</label>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input type="password" name="password" class="form-control form-control-lg" />
                      <label class="form-label" for="password">Mot de Passe</label>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input type="password" name="c_password" class="form-control form-control-lg" />
                      <label class="form-label" for="c_password">Confirmer Mot de Passe</label>
                    </div>

                    <!-- Parcourir le tableau des messages d'erreur -->
                    <?php foreach ($error as $key => $errValue) { ?>
                      
                      <!-- Créer un paragraphe avec la classe CSS "err-message" et afficher le message d'erreur -->
                      <p class='err-mesage'> <?= $errValue ?> </p>
                    <?php } ?>


                    <button class="btn btn-outline-light btn-lg px-5" name="valider" type="submit">S'inscrire</button>
                  </form>

                 

                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

  </main>

</body>

</html>