window.addEventListener("DOMContentLoaded", (event) => {

    /*Configuration des URL de l'API */
    const config = {
        // Clef de connexion à l'API en developper
        api_key: 'e440027325819bdc8e51f492e2bac3f9',
        // Url de base de l'API'
        api_base_url: 'https://api.themoviedb.org/3/',
        // Url de base des images de l'API en 1280p'
        image_base_url: 'https://image.tmdb.org/t/p/w1280',
        // Url de base des images de l'API en format original'
        original_image_base_url: 'https://image.tmdb.org/t/p/original'
    }
  
    // Const BASE_URL = url de base de l'API
    const BASE_URL = config.api_base_url
    // Const API_KEY = Clef de connexion à l'API en developper
    const API_KEY = config.api_key
  
    const SEARCH_URL_MOVIE = BASE_URL + 'search/movie?api_key=' + API_KEY
  
    const SEARCH_URL_TV = BASE_URL + 'search/tv?api_key=' + API_KEY
  
    const SEARCH_URL_PERSON = BASE_URL + 'search/person?api_key=' + API_KEY
  
    let search_result = document.querySelector('.search_cat_movie')
  
    let input = document.getElementById('searchTerm')
  
    let searchTerm = input.value
  
    let current = document.querySelector('.current');
    let next = document.querySelector('.next')
    let prev = document.querySelector('.prev')
  
    let pagi_mov = document.querySelector('.pagi_mov')
  
    let pagi_tv = document.querySelector('.pagi_tv')
  
    let pagi_person = document.querySelector('.pagi_person')
    
    current.innerHTML = 1
  
    let currentPage = 1
    
  
    next.addEventListener('click', () => {
        search_result.innerHTML = ""
        currentPage++
        current.innerHTML = '<p>'+ currentPage+'</p>'
        getMovies(currentPage)  
        prev.classList.remove('disabled')
        
    })
  
    prev.addEventListener('click', () => {
        if(currentPage > 1){
            search_result.innerHTML = ""
            currentPage--
            getMovies(currentPage)
            current.innerHTML = '<p>'+ currentPage+'</p>'
        }  else {
            prev.classList.add('disabled')
        }
    })
  
    function getMovies(current){
        fetch(SEARCH_URL_MOVIE + '&query=' + searchTerm + '&page=' + current)
        .then(response => response.json())
        .then(result => {
            
                current.textContent = result.page
                let total = result.total_pages
                if (result.total_results > 0){
                    let nbr_result = document.querySelector('.number_result')
                    nbr_result.innerHTML = "<span>" + result.total_results + '</span>' + ' résultats pour : ' + searchTerm
                    if (currentPage < total){
                        let movies = result.results
  
                        if (movies.length > 10){
                            for (let i = 0; i < 20; i++){
                                if(movies[i].poster_path == null){
                                    i++
                                }
                                search_result.innerHTML += `<a href="detail.php?movie=${movies[i].id}"><div><img src="${config.image_base_url + movies[i].poster_path}"></div></a>`
                                
                                search_result.style.paddingBottom = '5vh'
                            }
                        } else if (movies.length < 10){
                            for (let i = 0; i < movies.length; i++){
                                if(movies[i].poster_path == null){
                                    i++
                                }
                                search_result.innerHTML += `<a href="detail.php?movie=${movies[i].id}"><div><img src="${config.image_base_url + movies[i].poster_path}"></div></a>`
                                search_result.style.borderBottom = '1px solid #464141'
                                search_result.style.paddingBottom = '5vh'
                            }
                        }
                    } else {
                        currentPage = total -1
                    }
                } else {
                    pagi_mov.style.display = 'none'
                    search_result.innerHTML = '<h2 class="no_result">Aucun résultat.</h2>'
                }
            })
    }
  
    getMovies(currentPage)
  
  
   
    
    let search_result_tv = document.querySelector('.search_cat_tv')
  
    input = document.getElementById('searchTerm')
  
    searchTerm = input.value
  
    let current_tv = document.querySelector('.current_tv');
    let next_tv = document.querySelector('.next_tv')
    let prev_tv = document.querySelector('.prev_tv')
    
    current_tv.innerHTML = 1
  
    let currentPageTv = 1
    
  
    next_tv.addEventListener('click', () => {
        search_result_tv.innerHTML = ""
        currentPageTv++
        current_tv.innerHTML = '<p>'+ currentPageTv+'</p>'
        getTv(currentPageTv)  
        prev_tv.classList.remove('disabled')
        
    })
  
    prev_tv.addEventListener('click', () => {
        if(currentPageTv > 1){
            search_result_tv.innerHTML = ""
            currentPageTv--
            getTv(currentPageTv)
            current_tv.innerHTML = '<p>'+ currentPageTv+'</p>'
        }  else {
            prev_tv.classList.add('disabled')
        }
    })
  
    function getTv(current_tv){
        fetch(SEARCH_URL_TV + '&query=' + searchTerm + '&page=' + current_tv)
        .then(response => response.json())
        .then(result => {
            
                current_tv.textContent = result.page
  
                let total = result.total_pages
                if(result.total_results > 0){
                    let nbr_result = document.querySelector('.number_result')
                    nbr_result.innerHTML = "<span>" + result.total_results + '</span>' + ' résultats pour : ' + searchTerm
                    if (currentPage < total){
                        let tv = result.results
                        
                        if (tv.length > 10){
                            
                            for (let i = 0; i < 20; i++){
                                
                                if(tv[i].backdrop_path == null){
                                    i++
                                } else {
                                    search_result_tv.innerHTML += `<a href="detail.php?tv=${tv[i].id}"><div><img src="${config.image_base_url + tv[i].poster_path}"></div></a>`
                                    
                                    search_result_tv.style.paddingBottom = '5vh'
                                }
                                    
                            
                            }
                        } else if (tv.length < 10){
                            for (let i = 0; i < tv.length; i++){
                                if(tv[i].poster_path == null){
                                    i++
                                }
                                search_result_tv.innerHTML += `<a href="detail.php?tv=${tv[i].id}"><div><img src="${config.image_base_url + tv[i].poster_path}"></div></a>`
                               
                                search_result_tv.style.paddingBottom = '5vh'
                            }
                        }
                    } else {
                        currentPageTv = total -1
                    }
                } else {
                    pagi_tv.style.display = 'none'
                    search_result_tv.innerHTML = '<h2 class="no_result">Aucun résultat.</h2>'
                }
            })
    }
  
    getTv(currentPageTv)
  
  
     
    
     let search_result_person = document.querySelector('.search_cat_person')
  
     input = document.getElementById('searchTerm')
  
     searchTerm = input.value
  
     let current_person = document.querySelector('.current_person');
     let next_person = document.querySelector('.next_person')
     let prev_person = document.querySelector('.prev_person')
     
     current_person.innerHTML = 1
  
     let currentPageperson = 1
     
  
     next_person.addEventListener('click', () => {
         search_result_person.innerHTML = ""
         currentPageperson++
         current_person.innerHTML = '<p>'+ currentPageperson+'</p>'
         getPerson(currentPageperson)  
         prev_person.classList.remove('disabled')
         
     })
  
     prev_person.addEventListener('click', () => {
         if(currentPageperson > 1){
             search_result_person.innerHTML = ""
             currentPageperson--
             getPerson(currentPageperson)
             current_person.innerHTML = '<p>'+ currentPageperson+'</p>'
         }  else {
             prev_person.classList.add('disabled')
         }
     })
  
     function getPerson(current_person){
         fetch(SEARCH_URL_PERSON + '&query=' + searchTerm + '&page=' + current_person)
         .then(response => response.json())
         .then(result => {
             
                 current_person.textContent = result.page
  
                 let total = result.total_pages
                 if(result.total_results > 0){
                     let nbr_result = document.querySelector('.number_result')
                     nbr_result.innerHTML = "<span>" + result.total_results + '</span>' + ' résultats pour : ' + searchTerm
                     if (currentPageperson < total){
                         let person = result.results
                         
                         if (person.length > 10){
                             
                             for (let i = 0; i < 20; i++){
                                 
                                 if(person[i].profile_path == null){
                                     i++
                                 } else {
                                     search_result_person.innerHTML += `<a href="detail.php?person=${person[i].id}"><div>
                                     <img src="${config.image_base_url + person[i].profile_path}"><p>${person[i].name}</p></div></a>`
                                     
                                     search_result_person.style.paddingBottom = '5vh'
                                 }
                                     
                             
                             }
                         } else if (person.length < 10){
                             for (let i = 0; i < person.length; i++){
                                 if(person[i].poster_path == null){
                                     i++
                                 }
                                 search_result_person.innerHTML += `<a href="detail.php?person=${person[i].id}"><div>
                                 <img src="${config.image_base_url + person[i].profile_path}"><p>${person[i].name}</p></div></a>`
                                 
                                 search_result_person.style.paddingBottom = '5vh'
                             }
                         }
                     } else {
                         currentPageperson = total -1
                     }
                 } else {
                     pagi_person.style.display = 'none'
                     search_result_person.innerHTML = '<h2 class="no_result">Aucun résultat.</h2>'
                 }
             })
     }
  
     getPerson(currentPageperson)
  
  })