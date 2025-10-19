// https://developer.themoviedb.org/reference/movie-popular-list
// Extract top 10
// API url: https://api.themoviedb.org/3/movie/popular

let BAERER_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGE3NWZjZjU1NDMxNTI4NzBjNzliZTRkNzk1M2EzOSIsIm5iZiI6MTc2MDA4MjIwOC40NCwic3ViIjoiNjhlOGI5MjBhNGQ0ZWFlNWU5NGE5YjQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bVbZEk72a6panZkcwNMFNRNIQZh-b0nFIQMu6mcCHaI";
const apiUrl= "https://api.themoviedb.org/3/movie/popular";
const moviesContainer = document.getElementById("movies");

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
      data.results.forEach( media => {
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

    movieCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${backdrop_path}" class="movie_image_rounded">
    <div class="title"> ${title} </div>
    <div class="title"> ${release_date} </div>    
   `;
   return movieCard;
}

loadmovie();