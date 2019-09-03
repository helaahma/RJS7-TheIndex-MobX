import React, { Component } from "react";
import axios from "axios";
import { observer } from "mobx-react";
// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";

//Store
import bookStore from "./stores/bookStore";

const BookList = props => {
  const bookByColor = bookStore.color;
  bookByColor = props.books.match.params.bookColor;
  let books = bookStore.filterBooksByTitle;

  if (bookByColor) {
    books = bookStore.filterBooksByColor;
  }

  return bookStore.loading ? (
    <Loading />
  ) : (
    <div>
      <h3>Books</h3>
      <SearchBar store={bookStore} />
      <BookTable books={books} />
    </div>
  );
};

export default observer(BookList);
