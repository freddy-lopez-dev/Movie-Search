const movieContainer = document.querySelector('.movie-thumb');

movieContainer.addEventListener('mouseover', (e) => {
    e.target.closest('li').lastElementChild.style.display = "block";
})

movieContainer.addEventListener('mouseout', (e) => {
    e.target.closest('li').lastElementChild.style.display = "none";
})


let page = 1;
let userSearch;

const getMovie = (userSearch) => {
  return fetch(`https://www.omdbapi.com/?apikey=678105a7&s=${userSearch}&page=${page}`)
  .then((results) => results.json());
}

const getMovieDetails = (movieId) => {
  return fetch(`https://www.omdbapi.com/?apikey=678105a7&i=${movieId}`)
  .then(resp => resp.json())
}

const generateMovieHTML = (movie) => {
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
}

const populateMovieList = (movies) => {
  movieContainer.textContent ="";
  movies.Search.forEach(movie => {
    getMovieDetails(movie.imdbID)
    .then((movie) =>{
      generateMovieHTML(movie);
    });
  });
  updatePaginationHTML(movies.totalResults);
}

function updatePaginationHTML(totalResults) {
  const paginationEl = document.querySelector('.pagination');
  paginationEl.textContent = '';

  if (page !== 1) {
    paginationEl.insertAdjacentHTML(
      'beforeend',
      `
      <button id="prev"><i class="fa fa-chevron-left"></i>Previous Page</button>
      `
    );
  }
  console.log(totalResults);
  if (page * 10 < totalResults) {
    paginationEl.insertAdjacentHTML(
      'beforeend',
      `
      <button id="next">Next Page<i class="fa fa-chevron-right"></i></button>
      `
    );
  }
}

function updatePageNumber(direction) {
  if (direction === 'prev') {
    page--;
  }

  if (direction === 'next') {
    page++;
  }
}

const handleSearch = (event) => {
  event.preventDefault();
  userSearch = document.querySelector('#search-pane').value
  getMovie(userSearch)
  .then((movies) => populateMovieList(movies));
}

function handlePaginationClick(event) {
  updatePageNumber(event.target.id);
  getMovie(userSearch).then((results) => populateMovieList(results));
}

const form = document.querySelector('form')
form.addEventListener('submit', handleSearch);

document
  .querySelector('.pagination')
  .addEventListener('click', handlePaginationClick);

// math.ceil(totalResults / 10) > pageNumber
// page numbers
// promise.all
// Search error handling - text input value invalid
// no image / no rating / no plot give proper message
// cache search result
