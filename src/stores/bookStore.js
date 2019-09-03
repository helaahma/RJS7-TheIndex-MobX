import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});
class BookStore {
  books = [];
  loading = true;
  color = null;
  query = "";
  fetchBooks = async () => {
    try {
      const res = await instance.get(
        "https://the-index-api.herokuapp.com/api/books/"
      );
      const books = res.data;
      this.books = books;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };
  get filterBooksByTitle() {
    this.books.filter(book =>
      `${book.title}`.toLowerCase().includes(this.query.toLowerCase())
    );
  }
  get filterBooksByColor() {
    return this.filterBooksByTitle.filter(book => book.color === this.color);
  }
  getBookById = id => this.books.find(book => +book.id === +id);
  //From Review

  changeAvailability = id => {
    let tempBook = this.getBookById(id);
    tempBook.available = !tempBook.available;
  };
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filterBooksByTitle: computed,
  filterBooksByColor: computed
});

const booksStore = new BookStore();
booksStore.fetchBooks();

export default BookStore;
