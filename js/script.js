// constant variables

const BASE_URL = "https://api.nytimes.com/svc/books/v3/reviews.json?title=";
const API_KEY = "&api-key=9KYhx592sZnxcKpcAq5NzytfNGc9jztp";

// state variables

let userInput;
let reviews;

// cached element references

let $reviews = $('.reviews');
let $submit = $('#submit');
let $input = $('#input');

// event listeners

console.log($submit);
$submit.on('click', handleClick);

// functions

function getData() {
    $.ajax(BASE_URL+userInput+API_KEY)
        .then(function(data){
            reviews = data.results;
            render();
        }, function(error){
            alert(error);
        });
}

function render() {
    const html = reviews.map(function(review){
        if (review.summary === '') {
            review.summary = 'Unavailable';
        };
        return `
            <article class="card">
                <h2>${review.book_title} by ${review.book_author}</h2>
                <h3>review by: ${review.byline}, ${review.publication_dt}</h3>
                <p id="summary">Summary: ${review.summary}</p>
                <p id="url">URL: ${review.url}</p>
            </article>
        `;
    });
    $reviews.append(html);
}

function handleClick(){
    userInput = $input.val();
    getData();
}