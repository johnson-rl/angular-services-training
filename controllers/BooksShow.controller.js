angular.module('libraryApp')
  .controller('BooksShowController', BooksShowController);

/********************************************
  remove $http from the controller
  add BookService as a dependency
*******************************************/
BooksShowController.$inject=['$routeParams', '$location', '$http', 'BookService'];
function BooksShowController($routeParams,    $location,   $http, BookService) {
  var vm = this;
  var bookId = $routeParams.id;
  // exports
  vm.book = {};  // initially empty, getBook will fill
  // vm.getBook = getBook;
  vm.updateBook = updateBook;
  vm.deleteBook = deleteBook;

  // initialization
  // getBook(bookId);


    /*************************************
      REMOVE $http here -
      make use of the service instead
      BookService.get(id).then()
    **************************************/

    BookService.get(bookId).then(onBookShowSuccess, onError);


    function onBookShowSuccess(response){
      console.log('here\'s the data for book', bookId, ':', response.data);
      vm.book = response;
    }
    function onError(error){
      console.log('there was an error: ', error);
    }


  /*****************************************
  *  THIS FUNCTION HAS ALREADY BEEN
  *  REFACTORED TO USE BOOK SERVICE
  *****************************************/
  function updateBook(book) {
    console.log('controller updating book: ', book);
    BookService.update(book).then(onBookUpdateSuccess, onError);

    function onBookUpdateSuccess(book){
      console.log('controller got updated data for book ', book._id, ':', book);
      vm.book = book;
      $location.path('/');
    }
    function onError() {
      console.log("error updating the book");
    }
  }

  function deleteBook(book) {
      console.log('deleting book: ', book);

    /*************************************
      REMOVE $http here -
      make use of the service instead
      BookService.remove(id).then()
    **************************************/

      BookService.remove(book).then(onBookDeleteSuccess);

      function onBookDeleteSuccess(response){
        console.log('the response is working:', response);
        console.log('yup, should have relocated')
        $location.path('/');
      }
    }
}
