<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recherche</title>
    <link rel="stylesheet" href="style.css">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/6.2.0/mdb.min.css" rel="stylesheet" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&display=swap" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet">
</head>
<body>
    
</body>
</html>





<?php
session_start();
require ('./header.php');
if($_GET['search'] == ""){
    header('location: index.php');
}
?>
<main>
    <section class="search_section">
        <input type="hidden" value="<?=  $_GET['search']?>" id="searchTerm">
        <div class="res_search">
            <h1 class="number_result">Résulats pour : <?= $_GET['search']?></h1>
        </div>
        <h2 class="title_div">Les films</h2>
        <div class="grid_contain">
            <div class="search_cat_movie">
            </div>
        </div>

        <div class="pagination pagi_mov">
            <div class="prev disabled pr"><i class="fa-solid fa-angle-left"></i></div>
            <div class="current cu"></div>
            <div class="next ne"><i class="fa-solid fa-angle-right"></i></div>
        </div>


        <h2 class="title_div">Les séries</h2>
        <div class="grid_contain">
            <div class="search_cat_tv">
            </div>
        </div>

        <div class="pagination pagi_tv">
            <div class="prev_tv disabled_tv pr"><i class="fa-solid fa-angle-left"></i></div>
            <div class="current_tv cu"></div>
            <div class="next_tv ne"><i class="fa-solid fa-angle-right"></i></div>
        </div>

       
    </section>
</main>

