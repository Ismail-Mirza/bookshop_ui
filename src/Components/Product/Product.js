import React, { useContext, useState } from 'react';
import './Product.css';
import { CardDeck, Card, Modal } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CartContext } from '../../App';
import { addToDatabaseCart } from '../LocalStorageManager/LocalStorageManager';

const Product = (props) => {
    const [id, setId] = useState(null);
    const [cart, setCart] = useContext(CartContext);
    const [show, setShow] = useState(false);

    const books = props.books;

    if (show) {
        return (
            <Modal style={{ marginTop: "80px", color: "red" }} show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Already Added!</Modal.Title>
                </Modal.Header>
            </Modal>
        );
    }

    const handleAddProduct = () => {
        const book = books.find(book => book._id === id)
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

    return (
        <div className="product">
            
            {
                books.map((books) => (
                    <CardDeck className="productInfo" key={books._id}>
                        <Card onMouseOver={() => setId(books._id)} className="card">
                            <Link style={{ textDecoration: "none", color: "black" }} to={"/productDetails/" + id}>
                                <Card.Img variant="top" src={books.image} />
                                <div className="cardBody">
                                    <p>{books.title}</p>
                                    <small>{books.author}</small>
                                    <p>TK. {books.price}</p>
                                    <p>TK. {books.discountPrice}</p>
                                </div>
                            </Link>
                            <Card.Footer>
                                <Button onClick={() => handleAddProduct()} className="addToCartBtn">Add to Cart</Button>
                            </Card.Footer>
                        </Card>
                    </CardDeck>
                ))
            }
        </div>
    );
};

export default Product;