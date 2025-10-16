// API - https://www.themoviedb.org/

// Search by actor name - 
// Search by movie name - 
// Search by actor or movie name (no dropdown) - 
// TODO: How to search from two different sources
// Get all movies from current year

let searchType ="" , searchPhrase ="", BAERER_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGE3NWZjZjU1NDMxNTI4NzBjNzliZTRkNzk1M2EzOSIsIm5iZiI6MTc2MDA4MjIwOC40NCwic3ViIjoiNjhlOGI5MjBhNGQ0ZWFlNWU5NGE5YjQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bVbZEk72a6panZkcwNMFNRNIQZh-b0nFIQMu6mcCHaI"

// This function is displaying an error for both Actor and Movie - Empty search
// Split so that separate error messages for actor name and movie title
function validateForm() {
    let x = document.forms["myForm"]["search"].value;
    if (x == "") {
        let searchErrorMessage = '';
        document.getElementById("emptySearchErrorMessage").style.display="block";
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
    document.getElementById("searchResult").style.display="block"
    const isvalid =  validateForm()
    console.log(isvalid);
    searchPhrase = document.getElementById("search").value
    searchType = document.getElementById("searchBy").value
    if (isvalid) loadMovieAPI()
})

// This function is handling errors connecting to the api
async function loadMovieAPI() {
  // const url =`https://restcountries.com/v3.1/${searchType}/${searchPhrase}`; 

const url = 'https://api.themoviedb.org/3/movie/100?language=en-US';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BAERER_KEY}`
  }
};

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
    displayMovies(result);

    } catch (error) {
    const container = document.getElementById('error');
    document.getElementById("error").style.display="block"
    container.innerHTML=`<p style="color:red; padding-left:2rem;">No results found</p>`;
  }
}

// Displaying Countries
const displayMovies = (movies) => {
    let searchErrorMessage = '';
    if (searchType == 'movie') {
        searchErrorMessage = 'No movie found with that title...';
    } 
    else {
        searchErrorMessage = 'Something went wrong...';
    }
    const container = document.getElementById('movies');
    if(!Array.isArray(movies)) {container.innerHTML= searchErrorMessage; return }

    // Sort alfabeticly 
    // movies.sort( (a,b) => a.population < b.population);

    // const moviesHTML = movies.map(movie => getMovie(movie));

    // Displaying div to html
    container.innerHTML = moviesHTML.join(' ');
}

// Get data and add it to html
function getMovie  (movie) {
    return `
        <div class="movie-div">
            <!-- Add movie information here -->       
        </div>
    `
}
