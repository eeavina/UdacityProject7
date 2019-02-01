import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Shelf from './Shelf'
//import SearchButton from './SearchButton'

class Shelves extends React.Component {
    state = {
        bookQuery: []
    }

    changeShelves = (selectedBook, shelf) => {
        //console.log('before',selectedBook.shelf);
        //console.log('after', shelf);
        selectedBook.shelf = shelf;

        BooksAPI.update(selectedBook, shelf).then(response => this.setState({ bookQuery: response }));
    }

    checkBookStatus = (books) => {
        const allBooks = this.props.allBooks;
        const currentlyReading = allBooks.filter(book => book.shelf === 'currentlyReading').map(book => book.id);
        const wantToRead = allBooks.filter(book => book.shelf === 'wantToRead').map(book => book.id);
        const read = allBooks.filter(book => book.shelf === 'read').map(book => book.id);
        //console.log('allBooks', allBooks);
        //console.log('books', books);
        //console.log('currentlyReading', currentlyReading);


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

        let shelves = this.props.allBooks;
        let currentlyReading = shelves.filter(book => book.shelf === 'currentlyReading');
        let wantToRead = shelves.filter(book => book.shelf === 'wantToRead');
        let read = shelves.filter(book => book.shelf === 'read');
        //const none = shelves.filter(book => book.shelf === 'none')

        return (
            <div className="list-books">

                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>

                <div className="list-books-content">
                    <div>

                        <Shelf books={currentlyReading} title='Currently Reading' changeShelves={this.changeShelves} searchError={false} /> {/*Currently reading*/}
                        <Shelf books={wantToRead} title='Want to Read' changeShelves={this.changeShelves} /> {/*Want to read*/}
                        <Shelf books={read} title='Read' changeShelves={this.changeShelves} /> {/*Read*/}


                    </div>
                </div>

                <div className="open-search">
                    <Link to="/search"><button>Add a book</button></Link >
                </div>
            </div>

        )
    }
}

export default Shelves;