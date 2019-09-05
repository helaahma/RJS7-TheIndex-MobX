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
  let bookByColor = bookStore.color;
  bookByColor = props.match.params.bookColor;
  let books = bookStore.filterBooksByTitle;
  console.log("BL", books);
  console.log("BL2", bookStore.filterBooksByTitle);

  if (bookByColor) {
    console.log("[BookList.js] BooksbyColor", bookByColor);
    books = bookStore.filterBooksByColor;
    console.log("[BookList.js] Books' Color", books);
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
