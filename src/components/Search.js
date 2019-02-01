import React from 'react'
import Shelf from './Shelf'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'

class Search extends React.Component {
    constructor(props) {
        super();
    }
    state = {
        query: '',
        bookQuery: [],
        searchError: false
    }

    findBooks = event => {
        const query = event.target.value;
        this.setState({ query });

        // start searching
        if (query) {
            BooksAPI.search(query).then(books => {
                if (books.length > 0) {
                    this.checkBookStatus(books);
                    this.setState({ bookQuery: books, searchError: false });
                } else {
                    this.setState({ bookQuery: [], searchError: true });
                }
            });
            // reset state
        } else this.setState({ bookQuery: [], searchError: false });
    };

    changeShelves = (selectedBook, shelf) => {
        //console.log('before',selectedBook.shelf);
        //console.log('after', shelf);
        selectedBook.shelf = shelf;

        this.setState(state => ({
            bookQuery: state.bookQuery.filter(b => b.id !== selectedBook.id).concat([selectedBook])
        }))
        BooksAPI.update(selectedBook, shelf);
    }

    checkBookStatus = (books) => {
        let allBooks = this.props.allBooks;
        let currentlyReading = allBooks.filter(book => book.shelf === 'currentlyReading').map(book => book.id);
        let wantToRead = allBooks.filter(book => book.shelf === 'wantToRead').map(book => book.id);
        let read = allBooks.filter(book => book.shelf === 'read').map(book => book.id);
        //console.log('allBooks',allBooks);
        //console.log('books',books);
        //console.log('currentlyReading',currentlyReading);

        for (var i = 0; i < books.length; i++) {
            if (currentlyReading.includes(books[i].id)) {
                books[i].shelf = 'currentlyReading';
                //console.log('found 1 currentlyReading');
            } else if (wantToRead.includes(books[i].id)) {
                books[i].shelf = 'wantToRead';
                //console.log('found 1 wantToRead');
            } else if (read.includes(books[i].id)) {
                books[i].shelf = 'read';
                //console.log('found 1 read', books[i]);
            } else {
                books[i].shelf = 'none';
                //console.log('not found 1');
            }
        }
    }

    render() {
        const query = this.state.query;
        const shelf = this.state.bookQuery;
        const none = shelf.filter(book => book.shelf === 'none');

        return (<div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search"
                        onClick={() => { this.props.input() }}>Close</button>
                </Link>

                <div className="search-books-input-wrapper">
                    {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                    <input type="text" placeholder="Search by title or author" value={query} onChange={this.findBooks} />

                </div>
            </div>
            <Shelf books={none} title='Search Results' changeShelves={this.changeShelves} searchError={this.state.searchError} /> {/*Search Results*/}
        </div>)
    }
}

export default Search;