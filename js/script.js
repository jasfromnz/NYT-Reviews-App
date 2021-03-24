// constant variables

const TITLE_URL = "https://api.nytimes.com/svc/books/v3/reviews.json?title=";
const AUTHOR_URL = "https://api.nytimes.com/svc/books/v3/reviews.json?author=";
const API_KEY = "&api-key=9KYhx592sZnxcKpcAq5NzytfNGc9jztp";

// state variables

let userInput;
let reviews;

// cached element references

let $reviews = $('section.reviews');
let $titleSubmit = $('input.title:submit');
let $titleInput = $('input.title:text');
let $authorSubmit = $('input.author:submit');
let $authorInput = $('input.author:text');

// event listeners

$titleSubmit.on('click', handleTitleClick);
$authorSubmit.on('click', handleAuthorClick);
$('button#pin').on('click', handlePinClick);

// functions

function handleTitleClick() {
    userInput = $titleInput.val();
    $titleInput.val('');
    getTitleData();
}

function handleAuthorClick() {
    userInput = $authorInput.val();
    $authorInput.val('');
    getAuthorData();
}

function handlePinClick() {
    if ($(this).closest('article').hasClass('pinned')) {
        $(this).text('');
        $(this).closest('article').removeClass('pinned');
    } else {
        $(this).text('X');
        $(this).closest('article').addClass('pinned');
    };
}

function getTitleData() {
    $.ajax(TITLE_URL + userInput + API_KEY)
        .then(function (data) {
            reviews = data.results;
            render();
        }, function (error) {
            alert(error);
        });
}

function getAuthorData()  {
    $.ajax(AUTHOR_URL + userInput + API_KEY)
        .then(function (data) {
            reviews = data.results;
            render();
        }, function (error) {
            alert(error);
        });
}

function render() {

    // check if there are results
    if (reviews.length < 1) {
        console.log(reviews.length);
        alert('No Results Found');
        return;
    };

    // clear previous results
    $('section.reviews').children().filter(':not(.pinned)').remove();

    // create html elements for each result
    const html = reviews.map(function (review) {
        
        // display "unavailable" for an missing data
        const params = ['book_title', 'book_author', 'byline', 'publication_dt', 'summary', 'url'];
        params.forEach(function(key){
            if (review[key] === ''){
                review[key] = 'Unavailable';
            };
        });
        return `
            <article class="reviews">
                <div id="header">
                    <div id="top">
                        <h2>${review.book_title} by ${review.book_author}</h2>
                        <button type="submit" id="pin"></button>
                    </div>
                    <h3>review by: ${review.byline.toLowerCase()}, ${review.publication_dt}</h3>
                </div>
                <div id="body">
                    <p id="summary">Summary: ${review.summary}</p>
                    <a class="url" href=${review.url} target="_blank">Link to Article</a>
                </div>
            </article>
        `;
    });

    
    $reviews.append(html);
    console.log("i ran!");
}