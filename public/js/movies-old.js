// API - https://www.themoviedb.org/ - API version 3
// Developer documentation: https://developer.themoviedb.org/reference/search-movie
// API URL Movie search: https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&api_key={api_key}&query={searchPhrase}
// Should I use this one instead witout API key: https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query={searchPhrase}
// Goal: Dispalying search results for text base search on movie titles - Display only results from page = 1

const apiUrl= "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query={searchPhrase}";
const searchResultContainer = document.getElementById("displaySearchResults");

const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGE3NWZjZjU1NDMxNTI4NzBjNzliZTRkNzk1M2EzOSIsIm5iZiI6MTc2MDA4MjIwOC40NCwic3ViIjoiNjhlOGI5MjBhNGQ0ZWFlNWU5NGE5YjQ0Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.bVbZEk72a6panZkcwNMFNRNIQZh-b0nFIQMu6mcCHaI");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "manual"
};

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

// Handling the submit request for movie search
let submitButton= document.querySelector("#submit")
submitButton.addEventListener("click", (e) => {
    e.preventDefault()
    document.getElementById("emptySearchErrorMessage").style.display="none"
    document.getElementById("error").style.display="none"
    document.getElementById("displaySearchResult").style.display="block"
    const isvalid = validateForm()
    console.log(isvalid);
    searchPhrase = document.getElementById("search").value
    // searchType = document.getElementById("searchBy").value
    if (isvalid) loadSearchResultAPI()
})

// This function is handling errors connecting to the api
async function loadSearchResultAPI() {
  const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query={searchPhrase}`;
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
    displaySearchResults(result);
    } catch (error) {
    const container = document.getElementById('searchError');
    document.getElementById("searchError").style.display="block"
    container.innerHTML=`<p style="color:red; padding-left:2rem;">No search result found</p>`;
  }
}

async function loadSearchResult(params) {
  try {
  const response = await fetch(apiUrl, requestOptions);

  const data = await response.json();
      searchResults.forEach( media => {
        const searchResultCard = createSearchResultCard (media);
        searchResultsCardContainer.appendChild (searchResultCard);
    });
    console.log(data)
    } 
    catch (error) {
        console.error ("Error fetching data:", error);
    }
  }

  // Displaying Movies and persons search results
  const displaySearchResults = (searchResults) => {
    let searchErrorMessage = '';
    if (searchType == 'movie') {
        searchErrorMessage = 'No movie found with that name...';
    } else if (searchType == 'person') {
         searchErrorMessage = 'No person found with that name...';
    }
    else {
        searchErrorMessage = 'Something went wrong...';
    }
    const container = document.getElementById('searchResults');
    if(!Array.isArray(searchResults)) {container.innerHTML= searchErrorMessage; return }
    // const moviesHTML = countries.map(movie => getMovie(movie));

    // Displaying div to html
    container.innerHTML = searchResultsHTML.join(' ');
}

function getSearchResults (searchResult) {
    return `
        <div class="search-result-div">
        <img src="${movie.poster_path}">
        <h2>${movie.title}</h2>
        <h4>Release date: ${movie.release_date}</h4>
        <h4>Overview: ${movie.overview}</h4>
        </div>
    `
}

function createSearchResultCard (media) {
    const { title, backdrop_path, release_date } = media;

    const searchResultCard = document.createElement("div");
    searchResultCard.classList.add("movie_item")
    searchResultCard.classList.add("border-2")
    searchResultCard.classList.add("rounded-lg")
    searchResultCard.classList.add("m-2")
    // movieCard.classList.add("rounded-lg") Not working - Why?

    searchResultCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w300${backdrop_path}" class="">
    <div class="pl-2 text-lg"> ${title} </div>
    <div class="pl-2 text-sm">Release date: ${release_date} </div>    
   `;
   return searchResultCard;
}


