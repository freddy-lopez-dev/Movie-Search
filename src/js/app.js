// setup app

const movieContainer = document.querySelector('.movie-thumb');

movieContainer.addEventListener('mouseover', (e) => {
    e.target.closest('li').lastElementChild.style.display = "block";
})

movieContainer.addEventListener('mouseout', (e) => {
    e.target.closest('li').lastElementChild.style.display = "none";
})

const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const userSearch = document.querySelector('#search-pane').value
  getMovie(userSearch)
  .then((movies) => {
    movieContainer.textContent ="";
    movies.forEach(movie => {
      movieContainer.insertAdjacentHTML(
        'beforeend',
        `
        <li class="movie">
          <img src="${movie.Poster}" alt="">
          <div class="details">
            <h2 class="title">${movie.Title}</h2>
            <h3 class="rating">Rating: 5.4/10</h3>
            <p class="plot">
              "${movie.Plot}"
            </p>
          </div>
        </li>
        `
      ) 
    })
  })
})

const getMovie = (userSearch) => {
  return fetch(`https://www.omdbapi.com/?apikey=678105a7&s=${userSearch}`)
  .then((results) => 
    results.json()
  )
  .then((data) => data.Search);
}