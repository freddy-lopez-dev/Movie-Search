// setup app

const movieContainer = document.querySelector('.movie-container');

movieContainer.addEventListener('mouseover', (e) => {
  e.target.closest('ul li').lastElementChild.style.display = "block";
})

movieContainer.addEventListener('mouseout', (e) => {
  e.target.closest('ul li').lastElementChild.style.display = "none";
})