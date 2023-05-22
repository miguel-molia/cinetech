<!-- Affichage des éléments d'un film selon son id  -->
<?php if (isset($_GET['page'])) { ?>



  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Films</title>
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

      
      <h2>Tous les films</h2>


      <div class="prec_suiv">


      <ul class="pagination">
        <li class="page-item"><a class="page-link" id="precedent-film"> Prev </a></li>
        <li class="page-item"><a class="page-link" id="suivant-film"> Next </a></li>
      </ul>

    </div>

      <div id="films"></div>

      
    
    </main>


    

    <footer>



    </footer>
  <script src="script.js"></script>
  
  </body>

  </html>
  
<?php } ?>