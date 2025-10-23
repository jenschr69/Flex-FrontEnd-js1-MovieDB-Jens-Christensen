// https://developer.themoviedb.org/reference/movie-top-rated-list
// Extract top 10 - How?
// API URL: https://api.themoviedb.org/3/movie/top_rated

let BAERER_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGE3NWZjZjU1NDMxNTI4NzBjNzliZTRkNzk1M2EzOSIsIm5iZiI6MTc2MDA4MjIwOC40NCwic3ViIjoiNjhlOGI5MjBhNGQ0ZWFlNWU5NGE5YjQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bVbZEk72a6panZkcwNMFNRNIQZh-b0nFIQMu6mcCHaI";
let apiKey = "00a75fcf5543152870c79be4d7953a39";
const apiUrl= "https://api.themoviedb.org/3/movie/top_rated?page=1";
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
    // movieCard.classList.add("rounded-lg") Not working - Why?

    movieCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${backdrop_path}" class="">
    <div class="pl-2 text-lg"> ${title} </div>
    <div class="pl-2 text-sm">Release date: ${release_date} </div>    
   `;
   return movieCard;
}

loadmovie();


