const API_KEY = "7f6f2db";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesContainer = document.getElementById("moviesContainer");

const modal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");
const movieDetails = document.getElementById("movieDetails");

async function searchMovies(query = "Avengers") {

    moviesContainer.innerHTML = "<h2>Loading...</h2>";

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        const data = await response.json();

        if (data.Response === "False") {
            moviesContainer.innerHTML =
                "<h2>No movies found.</h2>";
            return;
        }

        displayMovies(data.Search);

    } catch(error) {

        moviesContainer.innerHTML =
            "<h2>Failed to load movies.</h2>";

    }
}

function displayMovies(movies){

    moviesContainer.innerHTML = "";

    movies.forEach(movie => {

        const card = document.createElement("div");

        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <button onclick="showMovie('${movie.imdbID}')">
                View Details
            </button>
        `;

        moviesContainer.appendChild(card);

    });
}

async function showMovie(id){

    try{

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );

        const movie = await response.json();

        movieDetails.innerHTML = `
            <h2>${movie.Title}</h2>

            <img src="${movie.Poster}">

            <p><strong>Year:</strong> ${movie.Year}</p>

            <p><strong>Genre:</strong> ${movie.Genre}</p>

            <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>

            <p><strong>Runtime:</strong> ${movie.Runtime}</p>

            <p><strong>Director:</strong> ${movie.Director}</p>

            <p><strong>Plot:</strong> ${movie.Plot}</p>
        `;

        modal.style.display = "block";

    }
    catch(error){
        alert("Failed to load details");
    }
}

searchBtn.addEventListener("click", () => {

    const query = searchInput.value.trim();

    if(query){
        searchMovies(query);
    }

});

searchInput.addEventListener("keypress", e => {

    if(e.key === "Enter"){
        searchBtn.click();
    }

});

closeModal.addEventListener("click", () => {

    modal.style.display = "none";

});

window.onclick = e => {

    if(e.target === modal){
        modal.style.display = "none";
    }

};

searchMovies();
