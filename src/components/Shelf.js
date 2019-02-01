import React from 'react'

class Shelf extends React.Component {

    getImageLinks = (book, shelf) => {
        var response = '';
        if (typeof book.imageLinks === 'undefined' || typeof book.imageLinks.smallThumbnail === 'undefined') {
            response = book.previewLink;
        } else {
            response = book.imageLinks.smallThumbnail;
        }
        return response;
    }

    render() {
        const shelf = this.props.books;
        const searchError = this.props.searchError;

        return (
            <div className="bookshelf">

                <h2 className="bookshelf-title">{this.props.title}</h2>
                {shelf.length > 0 &&
                    (<div className="bookshelf-books">
                        <ol className="books-grid">
                            {shelf.map(book => (
                                <li key={book.id}>
                                    <div className="book">
                                        {/*{console.log(book)}*/}
                                        <div className="book-top">
                                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.getImageLinks(book, shelf)})` }}></div>
                                            {/*<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>*/}
                                            <div className="book-shelf-changer">
                                                <select value={book.shelf} onChange={e => this.props.changeShelves(book, e.target.value)}>
                                                    <option value="move" disabled>Move to...</option>
                                                    <option value="currentlyReading">Currently Reading</option>
                                                    <option value="wantToRead">Want to Read</option>
                                                    <option value="read">Read</option>
                                                    <option value="none">None</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="book-title">{book.title}</div>
                                        <div className="book-authors">{book.authors}</div>
                                    </div>
                                </li>))
                            }
                        </ol>
                    </div>
                    )}
                {searchError && (
                    <h3>We couldn't find any books for you</h3>
                )}
            </div>
        )

    }
}

export default Shelf;