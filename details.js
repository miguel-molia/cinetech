const API_KEY = 'e440027325819bdc8e51f492e2bac3f9'; // votre clé API TMDB

// Fonction pour récupérer les détails d'un film ou d'une série à partir de l'API TMDB
async function getMediaDetails(type, id) {
  const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=fr-FR`);
  const data = await response.json();
  console.log(data);

  return data;
}



// Fonction pour afficher les détails d'un film ou d'une série
function displayMediaDetails(media) {

  
  const titleElement = document.createElement('h1');
  titleElement.textContent = media.title || media.name;
  titleElement.setAttribute("id", "title_name");

  const releaseDateElement = document.createElement('p');
  const releaseDate = new Date(media.release_date);

  // Récupération et affichage des genres
  const genreElement = document.createElement('p');
  const lesGenres = media.genres;
  if (lesGenres && lesGenres.length > 0) {
    const genreNames = lesGenres.map(genre => genre.name).join(', ');
    genreElement.textContent = genreNames;
  } else {
    genreElement.innerHTML = `<span style="color: #ffff66;">Genre indisponible </span>`;
  }

  genreElement.setAttribute("id","genreElement");

  
  // Obtenez les différentes parties de la date
  const day = releaseDate.getDate().toString().padStart(2, '0');
  const month = (releaseDate.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés à partir de 0, donc ajoutez 1
  const year = releaseDate.getFullYear();
  
  // Formattez la date dans le format "jj-mm-aaaa"
  const formattedDate = `${day}-${month}-${year}`;
  
  releaseDateElement.innerHTML = `<span style="color: #ffff66;text-shadow: 2px 2px 4px black;">Date de sortie: </span>${formattedDate}`;
  
  
 

  

const overviewElement = document.createElement('p');
overviewElement.innerHTML = `<span style="color: #ffff66;text-shadow: 2px 2px 4px black;">Résumé: </span>${media.overview}`;
overviewElement.setAttribute("id", "resume_media");

const pop_element = document.createElement('p');
pop_element.innerHTML = `<span style="color: #ffff66;text-shadow: 2px 2px 4px black;">Popularité: </span>${media.popularity}`;

// Récupération et affichage des pays de production
const productionCountriesElement = document.createElement('p');
const productionCountries = media.production_countries;
if (productionCountries && productionCountries.length > 0) {
  const countryNames = productionCountries.map(country => country.name).join(', ');
  productionCountriesElement.innerHTML = `<span style="color: #ffff66;text-shadow: 2px 2px 4px black;">Pays de production: </span>${countryNames}`;
} else {
  productionCountriesElement.innerHTML = `<span style="color: #ffff66;text-shadow: 2px 2px 4px black;">Pays de production indisponible </span>`;
}

// media.genres.map(item => {
//   console.log(item.name);
// })




const posterElement = document.createElement('img');
posterElement.src = `https://image.tmdb.org/t/p/original${media.backdrop_path}`;

const containerElement = document.createElement('div');
containerElement.setAttribute("id", "resume");
containerElement.setAttribute("style", "background-image: url(" + posterElement.src + ")");

const containerElement2 = document.createElement('div');
containerElement2.setAttribute("id", "resume2");
containerElement.append(containerElement2);

containerElement2.append(titleElement);
containerElement2.append(releaseDateElement);
containerElement2.append(genreElement);
containerElement2.append(overviewElement);
containerElement2.append(pop_element);
containerElement2.append(productionCountriesElement);




  
 document.body.append(containerElement);
}



function en_commun(type, id) {
  fetch(`https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${API_KEY}&language=fr-FR`)
    .then(response => response.json())
    .then(data => {
      
      const containerElement3 = document.createElement("div");
      containerElement3.setAttribute('id','container_similar');
      
      
      const titre_similaire = document.createElement('h2');
      titre_similaire.textContent = 'Similaires';
      containerElement3.append(titre_similaire);

      if (type === 'movie') {
        for (let i = 0; i < 20; i++) {
          if (data.results[i].backdrop_path !== null) {
            const film = document.createElement('div');
            film.className = "scroll_card";

            film.innerHTML = `<a href="detail.php?movie=${data.results[i].id}"><img src="${config.image_base_url + data.results[i].poster_path}" class="img-fluid" >
                              <p class="head_card">${data.results[i].release_date}</p><p>Avis : ${data.results[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`;

            containerElement3.append(film);
          }
        }
      } else if (type === "tv") {
        for (let i = 0; i < 20; i++) {
          if (data.results[i].backdrop_path !== null) {
            const serie = document.createElement('div');
            serie.className = "scroll_card";

            serie.innerHTML = `<a href="detail.php?tv=${data.results[i].id}"><img src="${config.image_base_url + data.results[i].poster_path}" class="img-fluid" >
                              <p class="head_card">${data.results[i].first_air_date}</p><p>Avis : ${data.results[i].vote_average} <i class="fa-solid fa-star"></i></p></a>`;

            containerElement3.append(serie);
          }
        }
      }
      document.body.append(containerElement3);
    })
    .catch(error => {
      console.error(error);
    });
}


// function acteurs (type,)




const config = {
  image_base_url: "https://image.tmdb.org/t/p/original"
};

const URL = window.location.href;
const id = URL.split("=")[1];
const urlParams = new URLSearchParams(window.location.search);
const searchParams = urlParams.toString();
const paramKey = searchParams.split("=")[0];
// console.log(paramKey);

// Utilisation de la fonction pour récupérer les détails du film avec l'ID
getMediaDetails(paramKey, id)
  .then(media => {
    // console.log(media);
    displayMediaDetails(media);
    en_commun(paramKey, id);
  })
  .catch(error => {
    console.error(error);
  });


  




