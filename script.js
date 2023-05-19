//declare constante qui stocke la clé en question

const cleapi = 'e440027325819bdc8e51f492e2bac3f9';

//declare constante qui stocke l'url en question, concaténé avec la const cleapi 
// const url = `https://api.themoviedb.org/3/movie/popular?api_key=${cleapi}&language=fr-FR`;

function FetchMoviesOrSeries(type,divMedia,params,page){
  
    fetch(`https://api.themoviedb.org/3/${type}/${params}?api_key=${cleapi}&language=fr-FR&page=${page}`)

    //Convertit les données de la réponse HTTP en JSON
    .then(response => response.json())

    //Traite les données JSON dans la fonction fléchée
    .then(data => {
        // console.log(type);
        // console.log(divMedia)
        // console.log(data); //j'affiche tous les elements de la reponse
        // console.log(data.results); //j'affiche le tableau des films de la reponse
        // console.log(data.results[0]); //j'affiche le premier element([0]) de mon tableau de film de la reponse
        // console.log(response.results[0].title);  //j'affiche le titre de mon premier element([0]) de mon tableau de film de la reponse
        // console.log("////////////////////////////////");
        // console.log(data);
        const divMediaById = document.getElementById(divMedia);
        console.log(divMediaById);

        //Parcourt chaque objet film dans l'objet 'results' de l'API
        data.results.forEach(media => {  
            // console.log(media)

            //Cree une const qui cible dans le dom l'id 'accueil-film'
            // console.log(divMediaById)
            
            //Si la const existe
            if(divMediaById){

               

                //Crée un nouvel élément HTML <img>
                let img = document.createElement('img');
                
                let a = document.createElement('a')
                

                //Crée un nouvel élément HTML <div>
                let div = document.createElement('div');

        
                

                //Attribut quelque chose a une variable, la c'est la source puis la source en question
                img.setAttribute('src','https://image.tmdb.org/t/p/original'+media.poster_path);

                //Attribut quelque chose a une variable, la c'est le style puis le style en question
                img.setAttribute('style','width:200px');
                
                


                // img.src = 'https://image.tmdb.org/t/p/original'+film.backdrop_path;
                // img.style = 'width:200px';
            a.setAttribute('href',`http://localhost:81/cinetech/detail.php?${type}=${media.id}`)
            a.setAttribute('class',`element-${type}`);
            
                // Définit le contenu HTML de l'élément <p> pour afficher le titre du film sous forme de lien hypertexte
            

            //Ajoute l'élément <img> au conteneur a 
            a.append(img);  

            //Ajoute l'élément a au conteneur div
            div.append(a);

            //Ajoute l'élément <div> au conteneur divFilmHomePage 
            divMediaById.append(div);

            }
            // console.log(media.title); // j'affiche chaque  [x]
            // console.log(element.title); // j'affiche chaque titre pour [x]

            // element.innertext = 
        });

    })
    //Gère les erreurs potentielles qui pourraient survenir
    .catch(error => {
        console.log(error);
        
      
    });

}



//Utilise la méthode fetch pour récupérer les données à partir de l'URL de l'API


const films = document.getElementById('films');
const series = document.getElementById('series');
const precedent = document.getElementById('precedent');
const suivant = document.getElementById('suivant');

// Vérifie si les variables films, precedent, et suivant existent et sont toutes vraies
if (films && precedent && suivant) {

    // Récupère l'URL complète de la page web actuelle
    const URL = window.location.href;
  
    // Sépare l'URL en une tableau de chaînes de caractères, en utilisant le signe "=" comme séparateur,
    // et récupère la deuxième partie (indice 1) qui correspond à la valeur du paramètre "id"
    const id = URL.split("=")[1];

 
  

    // Appelle la fonction FetchMoviesOrSeries avec les arguments 'movie', 'films', 'popular', et la valeur de la constante id
FetchMoviesOrSeries('movie', 'films', 'popular', id);

// Définit l'attribut 'href' de l'élément HTML precedent avec une nouvelle URL qui inclut la page précédente
precedent.setAttribute('href', `movie.php?page=${parseInt(id) - 1}`);

// Définit l'attribut 'href' de l'élément HTML suivant avec une nouvelle URL qui inclut la page suivante
suivant.setAttribute('href', `movie.php?page=${parseInt(id) + 1}`);


} 

if(series && precedent && suivant){
    const URL = window.location.href;
    const id = URL.split("=")[1];
  



    FetchMoviesOrSeries('tv','series','popular',id);
    
    precedent.setAttribute('href',`tv.php?page=${parseInt(id) - 1}`);

    suivant.setAttribute('href',`tv.php?page=${parseInt(id) + 1}`);


}


else {
    FetchMoviesOrSeries('movie','accueil-film','popular')
   
    
    FetchMoviesOrSeries('tv','accueil-serie','popular')
}










    