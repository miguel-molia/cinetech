

const input = document.getElementById('search');
const form = document.getElementsByTagName('form');
  const autocompleteResultsContainer = document.getElementById('autocomplete-results');
    window.addEventListener('keyup',function(e){
      e.preventDefault();
      console.log(e.key)
  // if(e.key == 'Enter'){ 
  //   return false;
  // }
    });

  input.addEventListener('keyup', autocomplete);
 

  function autocomplete(event) {
    const query = input.value.trim();

    if (query.length < 1) {
      // Ne déclenche pas la recherche tant que l'utilisateur n'a pas saisi au moins 1 caractere
      autocompleteResultsContainer.innerHTML = '';
      return;
    }
    // Effectuer une requête à l'API de The Movie Database (TMDb)
    fetch('https://api.themoviedb.org/3/search/multi?api_key=e440027325819bdc8e51f492e2bac3f9&query=' + query)
      .then(response => response.json())
      .then(data => {
        const results = data.results.map(item => {
          if (item.media_type === 'movie') {
            return item.title;
          } else if (item.media_type === 'tv') {
            return item.name;
          } else if (item.media_type === 'person') {
            return item.name;
          }
        });

        showAutocompleteResults(results);
      })
      .catch(error => {
        console.error('Error fetching autocomplete data:', error);
      });
  }

  function showAutocompleteResults(results) {
    autocompleteResultsContainer.innerHTML = '';

    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.textContent = result;
      resultItem.classList.add('autocomplete-result');
      autocompleteResultsContainer.appendChild(resultItem);
    });
  }

// Fonction pour initialiser l'autocomplétion
function initializeAutocomplete() {
    // ...
    
    // Ecouteur d'événement pour les clics sur les résultats
    autocompleteResultsContainer.addEventListener('click', function(event) {
      // Récupérer l'élément cliqué
      const selectedResult = event.target.closest('.autocomplete-result');
      if (!selectedResult) return;
      
      // Récupérer le texte du résultat
      const resultText = selectedResult.textContent;
      
      // Récupérer l'ID du résultat en utilisant une requête à l'API de TMDb
      fetch(`https://api.themoviedb.org/3/search/multi?api_key=e440027325819bdc8e51f492e2bac3f9&query=${encodeURIComponent(resultText)}`)
        .then(response => response.json())
        .then(data => {
          // Récupérer le premier résultat correspondant au texte de recherche
          const result = data.results.find(item => item.title === resultText || item.name === resultText);
          if (!result) return;
          
          // Récupérer le type et l'ID du résultat
          const type = result.media_type;
          const id = result.id;
          
          // Redirection vers la page de détails en fonction du type et de l'ID
          if (type === 'movie') {
            window.location.href = `http://localhost:81/cinetech/detail.php?movie=${id}`;
          } else if (type === 'tv') {
            window.location.href = `http://localhost:81/cinetech/detail.php?tv=${id}`;
          } else {
            // Autre type de média, à adapter selon vos besoins
          }
        })
        .catch(error => {
          console.error('Error fetching result details:', error);
        });
    });
    
    // ...
  }
  
  // Appel pour initialiser l'autocomplétion
  initializeAutocomplete();

