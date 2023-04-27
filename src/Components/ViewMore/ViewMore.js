import React from 'react';
import './ViewMore.css';
import { useContext } from 'react';
import { AllBooksContext } from '../../App';
import Product from '../Product/Product';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const ViewMore = () => {
    const [books, setBooks] = useState();

    const allBooks = useContext(AllBooksContext);
    const { viewMore } = useParams();

    useEffect(() => {
        if (allBooks && viewMore === "recentlyAdded") {
            setBooks(allBooks);
        }
    }, [allBooks, viewMore])

    return (
        <div className="viewMore">
            <div className="viewMoreDetails">
                {
                    books && <Product books={books}></Product>
                }
            </div>
        </div>
    );
};

export default ViewMore;