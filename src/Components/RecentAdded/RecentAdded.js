import React from 'react';
import './RecentAdded.css';
import Product from '../Product/Product';
import { useContext } from 'react';
import { AllBooksContext, ViewMoreContext } from '../../App';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const RecentAdded = () => {
    const allBooks = useContext(AllBooksContext);
    const [viewMore, setViewMOre] = useContext(ViewMoreContext);

    const books = allBooks.slice(0,6);

    return (
        <div className="recentlySoldProducts">
            <div className="cardHead">
                <h5>Recently Added</h5>
                <Link style={{textDecoration: "none"}} to={"/more/" + viewMore} >
                    <Button onMouseOver={() => setViewMOre("recentlyAdded")} className="viewMoreBtn">View more</Button>
                </Link>
            </div>
            <Product books={books}></Product>
        </div>
    );
};

export default RecentAdded;