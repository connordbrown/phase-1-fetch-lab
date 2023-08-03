function fetchBooks() {
   const bookRun = fetch("https://anapioficeandfire.com/api/books")
    .then(resp => resp.json())
    .then(data => {
      renderBooks(data);

      console.log(data);
      pageCount(data);
      pageCounter(data);
      getBook(data, 1);
      getCharacter(data, 1031);
    });
  return bookRun;
}

function renderBooks(books) {
  const main = document.querySelector('main');
  books.forEach(book => {
    const h2 = document.createElement('h2');
    h2.innerHTML = book.name;
    main.appendChild(h2);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  fetchBooks();
});

// my reducer function - gets total number of pages in series
function pageCount(books) {
  let pageCount = 0;
  for (const book of books) {
    pageCount += book.numberOfPages;
  }
  console.log(`Total number of pages: ${pageCount}`);
}

// native reducer function - gets total number of pages in series
function pageCounter(books) {
  const pageCount = books.reduce((pageCounter, book) => pageCounter + book.numberOfPages
  , 0);
  console.log(`Total number of pages: ${pageCount}`);
}

// retrieves desired book in series
function getBook(books, bookNum) {
  console.log(books[bookNum - 1])
}

// gets desired chracter in the series
function getCharacter(books, charNum) {
  let charCtr = 0;
  for (let book of books) {
    for (let char of book.characters) {
      charCtr += 1;
      if (charCtr === charNum) {
        console.log(`THIS ONE: ${char}, #${charCtr}`);
      }
    }
  }
}