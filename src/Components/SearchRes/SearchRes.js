import React from 'react';
import './SearchRes.css';
import { useContext } from 'react';
import { AllBooksContext } from '../../App';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Product from '../Product/Product';
import noSearchRes from '../../images/search.jpg';

const SearchRes = () => {
    const [books, setBooks] = useState([]);
    const { search } = useParams();
    const allBooks = useContext(AllBooksContext);

    const book = allBooks.filter(book => book.title.toLowerCase().includes(search.toLowerCase()));
    const book1 = allBooks.filter(book => book.author.toLowerCase().includes(search.toLowerCase()));

    useEffect(() => {
        if (book.length) {
            setBooks(book);
        }
        else if (book1.length) {
            setBooks(book1);
        }
        else {
            setBooks(null);
        }
    }, [allBooks, search]);

    return (
        <div className="searchRes">
            <div className="searchResDetails">
                <h4>Search result for "{search}"</h4>
                {
                    books ?
                    <Product books={books}></Product> :
                    <div>
                        <img src={noSearchRes} alt="noSearchRes"/>
                        <p style={{textAlign: "center", fontWeight: "600"}}>Nothing matched</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default SearchRes;