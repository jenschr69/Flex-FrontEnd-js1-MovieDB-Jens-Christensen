// API - https://www.themoviedb.org/ - API version 3
// Documentation for search results for movies: https://developer.themoviedb.org/reference/search-movie
// Documentation for search results for person: https://api.themoviedb.org/3/search/person
// API url for movie search: https://api.themoviedb.org/3/search/movie
// API url for person search: https://api.themoviedb.org/3/search/person

searchPhrase ="", 
searchType="", 
BAERER_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGE3NWZjZjU1NDMxNTI4NzBjNzliZTRkNzk1M2EzOSIsIm5iZiI6MTc2MDA4MjIwOC40NCwic3ViIjoiNjhlOGI5MjBhNGQ0ZWFlNWU5NGE5YjQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bVbZEk72a6panZkcwNMFNRNIQZh-b0nFIQMu6mcCHaI"

// Constant for displaying a specific movie
// Function to display a specific movie

// This function is displaying an error for both Movie and Person - Empty search - 2.november: This is working
function validateForm() {
    let x = document.forms["myForm"]["search"].value;
    if (x == "") {
        let searchErrorMessage = '';
        document.getElementById("emptySearchErrorMessage").style.display="block";
        // Change styling to Tailwind CSS
        document.getElementById("emptySearchErrorMessage").innerHTML=`<p style="color:red;">Search phrase must be filled out</p>`;
        document.getElementById("searchResult").style.display="none";
        document.getElementById("error").style.display="none";
        return false;
    }
    return true;
}

let submitButton= document.querySelector("#submit")
submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("emptySearchErrorMessage").style.display="none"
    document.getElementById("error").style.display="none"
    document.getElementById("displaySearchResult").style.display="block"
    const isvalid = validateForm()
    console.log(isvalid);
    searchPhrase = document.getElementById("search").value
    searchType = document.getElementById("searchBy").value
    if (isvalid) loadMovieAPI()
})

// This function is handling errors connecting to the api
async function loadMovieAPI() {
  const url =`https://api.themoviedb.org/3/search/${searchType}/${searchPhrase}`;
  //const url =`https://restcountries.com/v3.1/${searchType}/${searchPhrase}`;
  try {
    const response = await fetch(url);
    console.log(response.status);

    if (response.status >= 400) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    else if (response.status >= 500) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    displaySearchResult(result);
    } catch (error) {
    const container = document.getElementById('searchError');
    document.getElementById("searchError").style.display="block"
    container.innerHTML=`<p style="color:red; padding-left:2rem;">No movies found</p>`;
  }
}

// Displaying Movies
const displayMovies = (movies) => {
    let searchErrorMessage = '';
    if (searchType == 'movie') {
        searchErrorMessage = 'No movie found with that name...';
    } else if (searchType == 'person') {
         searchErrorMessage = 'No person found with that name...';
    }
    else {
        searchErrorMessage = 'Something went wrong...';
    }
    const container = document.getElementById('movies');
    if(!Array.isArray(movies)) {container.innerHTML= searchErrorMessage; return }
    // const moviesHTML = countries.map(movie => getMovie(movie));

    // Displaying div to html
    container.innerHTML = moviesHTML.join(' ');
}

// Information to display for each movie
// Image url: https://image.tmdb.org/t/p/w500/
// Title: title
// Release Date: release_date
// Overview: overview

// Get data and add it to html
// TODO: Replace vanilla CSS classes with Tailwind CSS classes
function getMovie (movie) {
    return `
        <div class="movie-div">
        <img src="${movie.poster_path}">
        <h2>${movie.title}</h2>
        <h4>Release date: ${movie.release_date}</h4>
        <h4>Overview: ${movie.overview}</h4>
        </div>
    `
}

// Constant for displaying a specific person
// Function to display a specific person