// API - https://www.themoviedb.org/

// Search by person name - 
// Search by movie name - 
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
  // Build TMDB search URL based on selected type (movie or person)
  if (!searchType || !searchPhrase) return;

  const base = 'https://api.themoviedb.org/3/search';
  const type = (searchType === 'person') ? 'person' : 'movie';
  const url = `${base}/${type}?query=${encodeURIComponent(searchPhrase)}&include_adult=false&language=en-US&page=1`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${BAERER_KEY}`
    }
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    // TMDB returns an object with 'results' array for search endpoints
    const items = Array.isArray(result.results) ? result.results : [];
    // Limit to 10 items
    // const limited = items.slice(0, 10);
    // displayMovies(limited);
    displayMovies(items);

  } catch (error) {
    const container = document.getElementById('error');
    if (container) {
      document.getElementById("error").style.display = "block";
      container.innerHTML = `<p style="color:red; padding-left:2rem;">No results found or an error occurred</p>`;
    }
    console.error(error);
  }
}

// Displaying Countries
const displayMovies = (movies) => {
  let searchErrorMessage = '';
  if (searchType == 'movie') {
    searchErrorMessage = 'No movie found with that title...';
  } else if (searchType == 'person') {
    searchErrorMessage = 'No person found with that name...';
  } else {
    searchErrorMessage = 'Something went wrong...';
  }

  // Try multiple possible containers (project has different pages)
  const container = document.getElementById('movies') || document.getElementById('movieSearchResult') || document.getElementById('displaySearchResults');
  if (!container) {
    console.warn('No container found for search results (expected #movies or #movieSearchResult).');
    return;
  }

  if (!Array.isArray(movies) || movies.length === 0) {
    container.innerHTML = `<p style="color:red;">${searchErrorMessage}</p>`;
    return;
  }

  const moviesHTML = movies.map(item => getMovie(item));
  // Displaying div to html
  container.innerHTML = moviesHTML.join(' ');
}

// Get data and add it to html
function getMovie(movie) {
  // Movie search returns objects with title, release_date, poster_path
  // Person search returns objects with name, profile_path, known_for (array)
  const imageBase = 'https://image.tmdb.org/t/p/w300';
  if (movie.title || movie.original_title) {
    const title = movie.title || movie.original_title || 'Untitled';
    const date = movie.release_date ? `(${movie.release_date.slice(0,4)})` : '';
    const poster = movie.poster_path ? `${imageBase}${movie.poster_path}` : '';
    const overview = movie.overview ? `<p class="overview">${movie.overview}</p>` : '';
    return `
      <div class="movie-div" style="width:300px;margin:8px;">
        ${poster ? `<img class="movie_image" src="${poster}" alt="${title}">` : ''}
        <h3 class="title">${title} ${date}</h3>
        ${overview}
      </div>
    `;
  }

  if (movie.name) {
    // person
    const name = movie.name;
    const profile = movie.profile_path ? `${imageBase}${movie.profile_path}` : '';
    const knownForTitles = Array.isArray(movie.known_for) ? movie.known_for.map(k => k.title || k.name).filter(Boolean).slice(0,3).join(', ') : '';
    return `
      <div class="movie-div" style="width:300px;margin:8px;">
        ${profile ? `<img class="movie_image" src="${profile}" alt="${name}">` : ''}
        <h3 class="title">${name}</h3>
        <p class="known-for">Known for: ${knownForTitles}</p>
      </div>
    `;
  }

  return `<div class="movie-div">Unknown item</div>`;
}
