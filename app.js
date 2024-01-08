document.addEventListener('DOMContentLoaded', function() {
    const unfinishedList = document.getElementById('unfinished-list');
    const finishedList = document.getElementById('finished-list');
    let books = JSON.parse(localStorage.getItem('books')) || [];
  
    function displayBooks() {
      unfinishedList.innerHTML = '';
      finishedList.innerHTML = '';
  
      books.forEach(function(book) {
        const li = document.createElement('li');
        li.innerHTML = `${book.title} - ${book.author} (${book.year})`;
  
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.addEventListener('click', function() {
          deleteBook(book.id);
        });
  
        li.appendChild(deleteButton);
  
        if (book.isComplete) {
          const moveButton = document.createElement('button');
          moveButton.textContent = 'Pindahkan ke Belum Selesai';
          moveButton.addEventListener('click', function() {
            moveBook(book.id, false);
          });
  
          li.appendChild(moveButton);
          finishedList.appendChild(li);
        } else {
          const moveButton = document.createElement('button');
          moveButton.textContent = 'Pindahkan ke Selesai';
          moveButton.addEventListener('click', function() {
            moveBook(book.id, true);
          });
  
          li.appendChild(moveButton);
          unfinishedList.appendChild(li);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    window.addBook = function() {
      const titleInput = document.getElementById('title');
      const authorInput = document.getElementById('author');
      const yearInput = document.getElementById('year');
      const isCompleteCheckbox = document.getElementById('isComplete');
  
      const newBook = {
        id: +new Date(),
        title: titleInput.value,
        author: authorInput.value,
        year: parseInt(yearInput.value),
        isComplete: isCompleteCheckbox.checked
      };
  
      books.push(newBook);
      displayBooks();
  
      titleInput.value = '';
      authorInput.value = '';
      yearInput.value = '';
      isCompleteCheckbox.checked = false;
    };
  
    function moveBook(bookId, isComplete) {
      const index = books.findIndex(book => book.id === bookId);
      books[index].isComplete = isComplete;
      displayBooks();
    }
  
    function deleteBook(bookId) {
      books = books.filter(book => book.id !== bookId);
      displayBooks();
    }
  
    displayBooks();
  });
  