<?php session_start(); ?>

<nav>

<div class="myheader">
    <h1 id="title">CINETECH</h1>
    <a href="index.php"><img src="style/images/tmdb.svg" alt=""></a>
    <form action="search.php" method="get">
            <input type="search" placeholder="Rechercher" name="search" id="search">
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


