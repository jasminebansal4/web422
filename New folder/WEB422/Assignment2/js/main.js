/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Jasmine Student ID: 101594232 Date: 06/02/2025
*  Vercel Link: https://web-assignment1-ceb6.vercel.app/api/movies
*
********************************************************************************/
let page = 1;
const perPage = 10;

// Main function for API data retrival and data rendering ----------------------------------------------------------------------
// Fetchs data from the API vercel deployment and uses helper functions to render that data
function loadMovieData(title = null) {
    const baseURL = `https://web-assignment1-ceb6.vercel.app/api/movies`;   // Loading The Data
    let url = title 
        ? `${baseURL}?page=${page}&perPage=${perPage}&title=${encodeURIComponent(title)}`
        : `${baseURL}?page=${page}&perPage=${perPage}`;
    title 
        ? document.querySelector('.pagination').classList.add('d-none')
        : document.querySelector('.pagination').classList.remove('d-none');
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        if (title && (!data || data.length === 0)) {
            alert(`No results found for "${title}".`);
            loadMovieData();    // Recursively call function to reload page
            return;
        }
        renderData(data);       // creating the <tr> Elements
        updateCurrentPage();    // Updating the "Current Page"
        addClickEvent(data);    // Adding Click Events        
    })
    .catch((err) => console.error('Error fetching data:', err));
};



// Rendering data (array) and other helper functions ---------------------------------------------------------------------------
// Renders the rows of the table using the data from the API
function renderData(data) {
    console.log('data rendering...');   // using array map and template literal
    const tbodyContent = data.map(movie => `
        <tr data-id="${movie._id}">
            <td>${movie.year}</td>
            <td>${movie.title}</td>
            <td>${movie.plot || 'N/A'}</td>
            <td>${movie.rated ? movie.rated.toUpperCase() : 'N/A'}</td>
            <td>${parseRuntime(movie.runtime)}</td>
        </tr>
    `).join('');
    const tbody = document.querySelector('tbody');
    if (tbody) {
        tbody.innerHTML = tbodyContent; // Adding <tr> Elements to the Table
    }
};

// Helper function for renderData(), used to parse movie runtime values
function parseRuntime(runtime) {
    if (runtime === undefined) return '';
    let hours = Math.floor(runtime / 60);
    let minutes = runtime % 60;
    minutes = minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

// Rendering the page number for each page, Updating the "Current Page"
function updateCurrentPage() {
    document.getElementById('current-page').textContent = `${page}`;
};

// Adds click events to each row of the newly created table so that movie "details" can be shown
function addClickEvent(apiData) {
    const tableRows = document.querySelectorAll('tr');
    console.log(tableRows); // Debugging check
    tableRows.forEach((row) => {
        if (row.getAttribute('data-id')) {
            row.addEventListener('click', () => {
                const data = apiData.find(item => item._id === row.dataset.id);
                displayMovieDetails(data);
            });
        }
    });
};

// Helper function for addClickEvent() renders a modal window each time user clicks on a table's row 
function displayMovieDetails(details) {
    console.log(details);   // Debugging check
    const modelTitle = document.querySelector('.modal-title');
    modelTitle.innerHTML = details.title;
    let htmlContent = `
            <img class="img-fluid w-100" src="${details.poster}"/><br>
            <br><strong>Directed By:</strong> ${details.directors.join(', ')}<br>
            <br>${details.fullplot || 'Full plot not avaiable.'}<br>
            <br><strong>Cast:</strong> ${details.cast.join(', ') || 'N/A'}.<br>
            <br><strong>Awards:</strong> ${details.awards.text}<br>
            <br><strong>IMDB Rating:</strong> ${details.imdb.rating}<br>
            <br><strong>IMDB Votes:</strong> ${details.imdb.votes}<br>
        <br>`;
    const modal = document.querySelector('#detailsModal .modal-body');
    modal.innerHTML = htmlContent;
    let myModal = new bootstrap.Modal(document.getElementById('detailsModal'), {
        backdrop: 'static', 
        keyboard: false,
        focus: true,
    });
    myModal.show();
};



// Event listeners with functions to render the page after DOM loads -----------------------------------------------------------
// Calls the loadMovieData() function each time the page refreshes or during first launch
document.addEventListener("DOMContentLoaded", function () {
    loadMovieData();

    // Loads the previous page using loadMovieData() when user clicks on the previous pagination button
    document.getElementById('previous-page').addEventListener('click', () => {
        if (page > 1) {
            page = page - 1;
            loadMovieData();
        }
    });

    // Loads the next page using loadMovieData() when user clicks on the next pagination button
    document.getElementById('next-page').addEventListener('click', () => {
        if (page < 10) {
            page = page + 1;
            loadMovieData();
        }
    });

    // Submit movie title functionality calls the loadMovieData() function with the movie title passed to it
    document.getElementById('searchForm').addEventListener('submit', (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value.trim();
        if (title) {
            page = 1;   // nothing shows unless this is here
            loadMovieData(title);
        }
    });

    // Clear movie title functionality, resets the page an calls loadMovieData() with no arguments
    document.getElementById('clearForm').addEventListener('click', () => {
        document.getElementById('title').value = "";
        loadMovieData();
    });
});