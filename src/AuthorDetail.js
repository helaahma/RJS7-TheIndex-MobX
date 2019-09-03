import React, { Component } from "react";
import axios from "axios";
import { observer } from "mobx-react";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";
//stores
import authorStore from "./stores/authorStore";
import BookStore from "./stores/bookStore";

class AuthorDetail extends Component {
  componentDidMount() {
    authorStore.fetchAuthorById(this.props.match.params.authorID);
  }
  //this checks the previuos ID with the current one if it is changed then fetchAuthorById (update)
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.authorID !== this.props.match.params.authorID) {
      authorStore.fetchAuthorById(this.props.match.params.authorID);
    }
  }

  render() {
    if (authorStore.loadingAuthor) {
      return <Loading />;
    } else {
      const author = authorStore.author;
      const authorName = `${author.first_name} ${author.last_name}`;
      const books = author.books.map(book => BookStore.getBookById(book.id));
      return (
        <div className="author">
          <div>
            <h3>{authorName}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={authorName}
            />
          </div>
          <BookTable books={books} />
        </div>
      );
    }
  }
}

export default observer(AuthorDetail);
