const movieContainer = document.querySelector('.movie-thumb');

movieContainer.addEventListener('mouseover', (e) => {
    e.target.closest('li').lastElementChild.style.display = "block";
})

movieContainer.addEventListener('mouseout', (e) => {
    e.target.closest('li').lastElementChild.style.display = "none";
})

const getMovie = (userSearch, currentPage) => {
  return fetch(`https://www.omdbapi.com/?apikey=678105a7&s=${userSearch}&page=${currentPage}`)
  .then((results) => 
    results.json()
  )
  .then((data) => data.Search);
}

const getMovieDetails = (movieId) => {
  return fetch(`https://www.omdbapi.com/?apikey=678105a7&i=${movieId}`)
  .then(resp => resp.json())
}

const populateMovieList = (movies) => {
  movieContainer.textContent ="";
  movies.forEach(movie => {
    getMovieDetails(movie.imdbID)
    .then((movie) =>{
      movieContainer.insertAdjacentHTML(
        'beforeend',
        `
        <li class="movie">
          <img src="${movie.Poster === 'N/A' ? "images/freddy-flix.png" : movie.Poster}" alt="">
          <div class="details">
            <h2 class="title">${movie.Title}</h2>
            <h3 class="rating">Rating: ${movie.imdbRating}/10</h3>
            <p class="plot">
              "${movie.Plot}"
            </p>
          </div>
        </li>
        `
      ) 
    })
  })
}

const handleSearch = (event) => {
  event.preventDefault();
  const userSearch = document.querySelector('#search-pane').value
  const pagination = document.querySelector('.pagination');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let currentPage = 1;
  getTotalResults(userSearch)
  .then((data) => {
    if (data < 12) {
      pagination.style.display = "none";
    }
    
    if (data > 12) {
      pagination.style.display = "flex";
      prev.style.display = "none";
      next.style.display = "block";
    }    
  })
  getMovie(userSearch, currentPage)
  .then((movies) => populateMovieList(movies));

  next.addEventListener('click', () => {
    currentPage++;
    prev.style.display = "block";
    getMovie(userSearch, currentPage)
    .then((movies) => populateMovieList(movies));
    console.log(currentPage);
  });

  prev.addEventListener('click', () => {
    currentPage--;
    if (currentPage === 1) {
      prev.style.display = "none";
    }
    getMovie(userSearch, currentPage)
    .then((movies) => populateMovieList(movies));
    console.log(currentPage);
  });
}

const getTotalResults = (userSearch) => {
  return fetch(`https://www.omdbapi.com/?apikey=678105a7&s=${userSearch}`)
  .then((results) => 
    results.json()
  )
  .then((data) => data.totalResults);
}

const form = document.querySelector('form')
form.addEventListener('submit', handleSearch);


// math.ceil(totalResults / 10) > pageNumber
// page numbers
// promise.all
// Search error handling - text input value invalid
// no image / no rating / no plot give proper message
// cache search result