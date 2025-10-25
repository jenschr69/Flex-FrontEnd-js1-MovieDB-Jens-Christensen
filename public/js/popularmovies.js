// API - https://www.themoviedb.org/ - API version 3
// https://developer.themoviedb.org/reference/movie-popular-list
// API url: https://api.themoviedb.org/3/movie/popular
// Goal: Dispalying a top 10 list of top rated movies from TMDB API

let BAERER_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGE3NWZjZjU1NDMxNTI4NzBjNzliZTRkNzk1M2EzOSIsIm5iZiI6MTc2MDA4MjIwOC40NCwic3ViIjoiNjhlOGI5MjBhNGQ0ZWFlNWU5NGE5YjQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bVbZEk72a6panZkcwNMFNRNIQZh-b0nFIQMu6mcCHaI";
const apiUrl= "https://api.themoviedb.org/3/movie/popular?page=1";
const moviesContainer = document.getElementById("displaySearchResults");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGE3NWZjZjU1NDMxNTI4NzBjNzliZTRkNzk1M2EzOSIsIm5iZiI6MTc2MDA4MjIwOC40NCwic3ViIjoiNjhlOGI5MjBhNGQ0ZWFlNWU5NGE5YjQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bVbZEk72a6panZkcwNMFNRNIQZh-b0nFIQMu6mcCHaI");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "manual"
};

async function loadmovie(params) {
  try {
  const response = await fetch(apiUrl, requestOptions);
  const data = await response.json();
      const movies = data.results.splice(10, 10);
      movies.forEach( media => {
        const movieCard = createMovieCard (media);
        moviesContainer.appendChild (movieCard);
    });
    console.log(data)
    } 
    catch (error) {
        console.error ("Error fetching data:", error);
    }
  
} 

function createMovieCard (media) {
    const { title, backdrop_path, release_date } = media;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie_item")
    movieCard.classList.add("border-2")
    movieCard.classList.add("rounded-lg")
    movieCard.classList.add("m-2")

    movieCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${backdrop_path}">
    <div class="pl-2 text-lg"> ${title} </div>
    <div class="pl-2 text-sm">Release date: ${release_date} </div>    
   `;
   return movieCard;
}

loadmovie();