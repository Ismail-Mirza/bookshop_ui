import React, { useState } from 'react';
import './ProductDetails.css';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AllBooksContext, CartContext } from '../../App';
import { Button } from '@material-ui/core';
import { addToDatabaseCart } from '../LocalStorageManager/LocalStorageManager';
import { Modal } from 'react-bootstrap';

const ProductDetails = () => {
    const [cart, setCart] = useContext(CartContext);
    const [show, setShow] = useState(false);

    const { id } = useParams();

    const allBooks = useContext(AllBooksContext);
    

    const book = allBooks.filter(book => book._id === id);

    const handleAddProduct = () => {
        const sameBook = cart.find(book => book._id === id);
        const count = 1;
        let newCart;
        if (sameBook) {
            setShow(true)
            newCart = [...cart];
        }
        else {
            newCart = [...cart, book];
            addToDatabaseCart(id, count);
        }
        setCart(newCart);
    }

    if (show) {
        return (
            <Modal style={{ marginTop: "80px", color: "red" }} show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Already Added!</Modal.Title>
                </Modal.Header>
            </Modal>
        );
    }

    return (
        <div className="productDetails">
            {
                book.map((book) => (
                    <div key={book._id} className="productDetailsInfo">
                        <img src={book.image} alt="" />
                        <div>
                            <h4>{book.title}</h4>
                            <p>by {book.author}</p>
                            <p>Category: {book.category}</p>
                            <h4>Price: {book.price} TK.</h4>
                            <h4>Discount Price: {book.discountPrice} TK.</h4>
                            <p style={{ color: "green" }}>Stock (Only {book.stock} copies left)</p>
                            <Button onClick={handleAddProduct} className="addToCartBtn">Add to Cart</Button>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default ProductDetails;