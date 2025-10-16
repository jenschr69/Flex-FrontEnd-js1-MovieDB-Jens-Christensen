// API - https://www.themoviedb.org/
// Inspiration https://www.youtube.com/watch?v=hOeR3LB9NJY 
// https://developer.themoviedb.org/reference/trending-movies

let BAERER_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGE3NWZjZjU1NDMxNTI4NzBjNzliZTRkNzk1M2EzOSIsIm5iZiI6MTc2MDA4MjIwOC40NCwic3ViIjoiNjhlOGI5MjBhNGQ0ZWFlNWU5NGE5YjQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bVbZEk72a6panZkcwNMFNRNIQZh-b0nFIQMu6mcCHaI";
let apiKey = "00a75fcf5543152870c79be4d7953a39";
const apiUrl= "https://api.themoviedb.org/3/trending/movie//week?api_key=${apiKey}";
const moviesContainer = document.getElementById("trendingMovies");

async function fetchMovies () {
    try {
    const response = await fetch (apiUrl);
    const data = await response.json();

    data.results.forEach( media => {
        const movieCard = createMovieCard (media);
        moviesContainer = appendChild (movieCard);
    });
    } 
    catch (error) {
        console.error ("Error fetching data:", error);
    }
};

function createMovieCard (media) {
    const { title, backdrop_path, release_date } = media;

    const movieCard = document.createElement("div");
    movieCard.classList.add("trending_movies")

    movieCard.innerHTML = `
    // Image url: https://developer.themoviedb.org/docs/image-basics 
    <img src="${backdrop_path}" class="movie_image">
    <div class="title"> ${title} </div>
    <div class="title"> ${release_date} </div>    
   `;
   return movieCard;
}

fetchMovies();