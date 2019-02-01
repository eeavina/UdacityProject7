import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves'
import Search from './components/Search'
//import SearchButton from './components/SearchButton'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
    constructor() {
        super();
        this.handleInput = this.handleInput.bind(this);
    }
    state = {
        books: [],
        query: ""
    }

    // Handle book array update once we navigate back from the search page
    handleInput() {
        BooksAPI.getAll().then(response => this.setState({ books: response }));
    }

    componentDidMount() {
        BooksAPI.getAll().then(response => this.setState({ books: response }));
    }

    changeShelves = (selectedBook, shelf) => {
        //console.log('before',selectedBook.shelf);
        //console.log('after', shelf);
        selectedBook.shelf = shelf;

        this.setState(state => ({
            books: state.books.filter(b => b.id !== selectedBook.id).concat([selectedBook])
        }))
        BooksAPI.update(selectedBook, shelf).then(response => this.setState({ books: response }));
    }

    render() {
        return (
            <div className="app">

                <Route exact path="/"
                    render={
                        () => (
                            <Shelves allBooks={this.state.books} changeShelves={this.changeShelves} />
                        )
                    }
                />

                <Route exact path="/search"
                    render={
                        () => (
                            <Search input={this.handleInput} showSearchPage={this.updateSearchPageState} allBooks={this.state.books} changeShelves={this.changeShelves} />
                        )
                    }
                />
            </div>
        )
    }
}

export default BooksApp
