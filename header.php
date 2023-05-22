<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!-- <script src="./script.js"></script> -->
  <title>Document</title>
</head>
<body>

<header>

<?php session_start(); ?>

<nav>

<div class="myheader">
    <h1 id="title">CINETECH</h1>
    
    <form action="search.php" method="get">
  <input type="search" placeholder="Rechercher" name="search" id="search">
  <div id="autocomplete-results"></div>
  <button type="submit" class="fas fa-search"></button>
  
</form>


<div class="result" id="search-bar"></div>
<ul>
        <li><a class="active" href="index.php">
                <!-- <i class="fa-solid fa-house"> </i> -->
                <span class="navmob">Home </span></a></li>
        <li><a href="movie.php?page=1">Films</a></li>
        <li><a href="tv.php?page=1">Séries</a></li>
                
          <?php          
          if(!empty($_SESSION)) { ?> 
        <li><a href="deconnexion.php">Déconnexion </a></li>
           <?php } else { ?>
            <li><a href="connexion.php"><span class="navmob">Connexion </span></a></li>
         <li><a href="inscription.php">Inscription</a></li>
         
        <?php  } ?>
          

        
      </ul>

</div>

</nav> 

</header>



<!-- <script src="script.js"> </script>  -->
 <script src="autocompletion.js"> </script>
<!-- <script src="search.js"> </script>  -->
</body>
</html>







