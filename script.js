document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('resultsContainer');

    searchButton.addEventListener('click', function () {
        const query = searchInput.value.trim();
        if (query) {
            searchMovies(query);
        } else {
            resultsContainer.innerHTML = '<p>Please enter a movie title.</p>';
        }
    });

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });

    function searchMovies(query) {
        const apiKey = '1ac6a38e'; 
        const apiUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.Response === "True") {
                    displayResults(data.Search);
                } else {
                    resultsContainer.innerHTML = `<p>No movies found for "${query}".</p>`;
                }
            })
            .catch(error => {
                console.error('Error fetching movie data:', error);
                resultsContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
            });
    }

    function displayResults(movies) {
        resultsContainer.innerHTML = '';

        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');

            const moviePoster = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'; 
            const moviePosterElement = document.createElement('img');
            moviePosterElement.src = moviePoster;
            moviePosterElement.alt = movie.Title;
            moviePosterElement.classList.add('movie-poster');

            const movieInfoElement = document.createElement('div');
            movieInfoElement.classList.add('movie-info');

            const movieTitleElement = document.createElement('div');
            movieTitleElement.classList.add('movie-title');
            movieTitleElement.textContent = movie.Title;

            const movieDescriptionElement = document.createElement('div');
            movieDescriptionElement.classList.add('movie-description');
            movieDescriptionElement.textContent = `Year: ${movie.Year}, Type: ${movie.Type}`;

            movieInfoElement.appendChild(movieTitleElement);
            movieInfoElement.appendChild(movieDescriptionElement);

            movieElement.appendChild(moviePosterElement);
            movieElement.appendChild(movieInfoElement);

            resultsContainer.appendChild(movieElement);
        });
    }
});