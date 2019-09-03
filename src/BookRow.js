import React, { Component } from "react";
import { Link } from "react-router-dom";

import { observer } from "mobx-react";

//stores
import bookStore from "./stores/bookStore";

class BookRow extends Component {
  book = this.props.book;
  //  state= {
  //    Toggle: true
  //  }

  authors = this.book.authors.map(author => (
    <div key={author.id}>
      <Link to={`/authors/${author.id}`}>{author.name}</Link>
    </div>
  ));
  // handleToggle= ()=>this.setState(state=>({
  //   Toggle: !state.Toggle
  // }))

  availableButton = (
    <button
      className={`btn btn-${this.book.available ? "success" : "danger"}`}
      onClick={() => bookStore.changeAvailability(this.book.id)}
    >
      {this.book.available ? "borrow" : "return"}
    </button>
  );
  render() {
    return (
      <tr>
        <td>{this.availableButton}</td>
        <td>{this.book.title}</td>
        <td>{this.authors}</td>
        <td>
          <Link to={`/books/${this.book.color}`}>
            <button
              className="btn"
              style={{ backgroundColor: this.book.color }}
            />
          </Link>
        </td>
      </tr>
    );
  }
}

export default observer(BookRow);
