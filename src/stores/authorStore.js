import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class AuthorStore {
  authors = [];

  loading = true;
  //use different loading for different functions for the program to distinguish and load properly
  //in this file we fitch all authors and run author by id at the same time therefore the program won't distinguish
  loadingAuthor = true;
  query = "";
  author = null;

  fetchAuthors = async () => {
    try {
      const res = await instance.get("/api/authors/");
      const authors = res.data;
      this.authors = authors;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };
  //Review
  fetchAuthorById = async id => {
    try {
      const res = await instance.get(`/api/authors/${id}`);
      const author = res.data;
      this.author = author;
      this.loadingAuthor = false;
    } catch (err) {
      console.error(err);
    }
  };

  get filteredAuthors() {
    return this.authors.filter(author =>
      `${author.first_name} ${author.last_name}`
        .toLowerCase()
        .includes(this.query.toLowerCase())
    );
  }

  getAuthorById = id => this.authors.find(author => +author.id === +id);
}

decorate(AuthorStore, {
  authors: observable,
  loading: observable,
  loadingAuthor: observable,
  query: observable,
  author: observable,
  filteredAuthors: computed
});

const authorStore = new AuthorStore();
authorStore.fetchAuthors();

export default authorStore;
