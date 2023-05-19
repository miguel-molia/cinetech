<?php
// Démarrer une session
session_start();

// Inclure le fichier header.php
require("header.php");

// Inclure le fichier bdd.php qui contient les informations de connexion à la base de données
include("bdd.php");

// Vérifier si le formulaire a été soumis
if (isset($_POST['connexion'])) {

  // Récupérer les données saisies dans le formulaire
  $login = $_POST['login'];
  $password = $_POST['password'];

  // Initialiser le tableau des erreurs
  $error = [];

  // Vérifier si le champ login est vide
  if (empty($login)) {
    $error[] = "Veuillez indiquer le nom d'utilisateur";
  }

  // Vérifier si le champ mot de passe est vide
  if (empty($password)) {
    $error[] = ' Veuillez indiquer le mot de passe';
  }

  // Si aucun message d'erreur n'a été détecté
  if (empty($error)) {

    // Rechercher l'utilisateur dans la base de données
    $connectUser = $bdd->prepare("SELECT * FROM utilisateurs WHERE login = ?");
    $connectUser->execute([$login]);
    $connectUserData = $connectUser->fetch(PDO::FETCH_ASSOC);

    // Vérifier si l'utilisateur existe et si le mot de passe est correct
    if ($connectUserData && password_verify($password, $connectUserData['password'])) {

      // Supprimer le mot de passe de l'utilisateur de la variable $connectUserData
      unset($connectUserData['password']);

      // Enregistrer les données de l'utilisateur dans la session
      $_SESSION['user'] = $connectUserData;

      // Rediriger l'utilisateur vers la page d'accueil
      header('Location: index.php');
    } else {
      // Ajouter un message d'erreur
      $error[] = "Email ou mot de passe incorrect";
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
  <title>Connexion</title>
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




  </header>

  <main>

    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
              <div class="card-body p-5 text-center">

                <div class="mb-md-5 mt-md-4 pb-5">

                  <h2 class="fw-bold mb-2 text-uppercase">Connexion</h2>

                  <form method="POST">

                    <div class="form-outline form-white mb-4">
                      <input type="text" name="login" class="form-control form-control-lg" />
                      <label class="form-label" for="login">Nom d'utilisateur</label>
                    </div>

                    <div class="form-outline form-white mb-4">
                      <input type="password" name="password" class="form-control form-control-lg" />
                      <label class="form-label" for="password">Mot de Passe</label>
                    </div>



                    <button class="btn btn-outline-light btn-lg px-5" name="connexion" type="submit">Se connecter</button>

                  </form>

                  <!-- Parcourir le tableau des messages d'erreur -->
                  <?php foreach ($error as $key => $errValue) { ?>
                      
                      <!-- Créer un paragraphe avec la classe CSS "err-message" et afficher le message d'erreur -->
                      <p class='err-mesage'> <?= $errValue ?> </p>
                    <?php } ?>

                  

                </div>

                <div>
                  <p class="mb-0">Vous n'avez pas de compte?<a href="inscription.php" class="text-white-50 fw-bold"> Inscrivez-vous</a>
                  </p>
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


<?php
