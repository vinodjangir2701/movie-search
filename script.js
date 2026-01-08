

// Selectors

let inputSerch = document.querySelector("input");
let movielist = document.querySelector(".movies-list");
const fallBackImg = './assest/img-not-found.svg';

// APIs 

const API_KEY = "2b87d147b1b0a845eebdf0287385c6ff";
const Top_Movie_API = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&
api_key=${API_KEY}&page=${Math.round(Math.random() * 20 + 1)}`;
const Img_Path = `https://image.tmdb.org/t/p/w1280`;
const Movie_Search_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;


// API fetch

async function fetchMovieData(API, type) {
  try {
    let response = await fetch(API);
    if (!response.ok) throw new Error(response.status);

    let data = await response.json();
    movielist.innerHTML = "";

    if (type === "top") {
      showTopMovieList(data.results);
    }

    if (type === "search") {
      showMovieDetails(data.results);
    }

  } catch (error) {
    console.error(error);
  }
}




/* ========================================================================
===========================================================================
===========================================================================
====================================== 1. API =============================
===========================================================================
===========================================================================
======================================================================== */



fetchMovieData(Top_Movie_API, "top");


function getMovieImg(path) {
  return path ? Img_Path + path : fallBackImg;
}

function showTopMovieList(results) {

  results.forEach(element => {

    let movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    movieCard.innerHTML = `<img class="poster" src="${getMovieImg(element.backdrop_path)}" alt="Movie Poster">
         <div class="glass-info">
          <h3>${element.title}</h3>
          <div class="meta">
            <span>${element.release_date.split("-")[0]}</span>
            <span class="rating">★ ${element.vote_average.toFixed(1)}</span>
          </div>
        </div>`

    movielist.append(movieCard);
  });

}


/* ========================================================================
===========================================================================
===========================================================================
====================================== 2. API =============================
===========================================================================
===========================================================================
======================================================================== */



// event call

inputSerch.addEventListener("input", function (e) {
  movielist.innerHTML = "";
  let movieName = inputSerch.value.trim();
  if (movieName === "") {
    fetchMovieData(Top_Movie_API, "top");
  }
  else {
    debouncedFetch(Movie_Search_API + movieName, "search");
  }
});


// Movie Search API Call debounce

function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);

    }, delay);
  }
}

const debouncedFetch = debounce(fetchMovieData, 500);


// Search Movie Dom list

function showMovieDetails(results) {

  results.forEach(element => {
    let movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `<img class="poster" src="${getMovieImg(element.backdrop_path)}" alt="Movie Poster">
         <div class="glass-info">
          <h3>${element.title}</h3>
          <div class="meta">
            <span>${element.release_date.split("-")[0]}</span>
            <span class="rating">★ ${element.vote_average.toFixed(1)}</span>
          </div>
        </div>`

    movielist.append(movieCard);
  });
}






