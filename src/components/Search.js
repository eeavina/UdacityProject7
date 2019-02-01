import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Shelf from './Shelf'

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

        // Start searching
        if (query) {
            BooksAPI.search(query).then(books => {
                if (books.length > 0) {
                    this.checkBookStatus(books);
                    this.setState({ bookQuery: books, searchError: false });
                } else {
                    this.setState({ bookQuery: [], searchError: true });
                }
            });
            // Reset state
        } else this.setState({ bookQuery: [], searchError: false });
    };

    changeShelves = (selectedBook, shelf) => {
        //console.log('before', selectedBook.shelf);
        //console.log('after', shelf);
        selectedBook.shelf = shelf;

        this.setState(state => ({
            bookQuery: state.bookQuery.filter(b => b.id !== selectedBook.id).concat([selectedBook])
        }))
        BooksAPI.update(selectedBook, shelf);
    }

    // Collects both the parent state books via props and the latest book array,
    // compares the two and updates the book shelf states accordingly
    checkBookStatus = (books) => {
        const allBooks = this.props.allBooks;
        const filteredBooks = books.map(book => {
            for (var i = 0; i < allBooks.length; i++) {
                if (book.id === allBooks[i].id) {
                    book.shelf = allBooks[i].shelf;
                }
            }
            return book;
        });
        const response = filteredBooks.map(book => {
            if (typeof book.shelf === 'undefined') {
                book.shelf = 'none';
            }        
            return book;
        });
        //console.log('books', books);
        //console.log('allBooks', allBooks);
        //console.log('filteredBooks', filteredBooks);

        return response;
    }

    render() {
        const query = this.state.query;
        const none = this.state.bookQuery;

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