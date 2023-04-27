import React, { useEffect } from 'react';
import './Cart.css';
import { useContext } from 'react';
import { LoadingContext, AllBooksContext, CartContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { removeFromDatabaseCart, addToDatabaseCart, getDatabaseCart } from '../LocalStorageManager/LocalStorageManager';
import emptyCart from '../../images/cart/empty-cart.png'
import { Button, Spinner } from 'react-bootstrap';
import OrderSummary from '../OrderSummary/OrderSummary';
import { Link } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useContext(CartContext);
    const [tempCart, setTempCart] = useState([]);
    const [reloader, setReloader] = useState(null);
    const [id, setId] = useState(null);

    const loading = useContext(LoadingContext);
    const allBooks = useContext(AllBooksContext);

    useEffect(() => {
        const savedCart = getDatabaseCart();

        const productKeys = Object.keys(savedCart);

        if (allBooks.length) {

            const previousCart = productKeys.map(existingKey => {
                
                const book = allBooks.find(book => book._id === existingKey);
                book.quantity = savedCart[existingKey];
                return book;
            })
            setTempCart(previousCart);
        }
    }, [allBooks, reloader]);


    const handleRemove = () => {
        const newCart = tempCart.filter(book => book._id !== id);
        setTempCart(newCart);
        setCart(newCart)
        removeFromDatabaseCart(id);
    }

    const handleMinusBtn = () => {
        const book = tempCart.find(book => book._id === id);
        let count = book.quantity;
        if (count > 1) {
            count = count - 1;
        }
        setReloader(count);
        addToDatabaseCart(id, count);
    }

    const handlePlusBtn = () => {
        const book = tempCart.find(book => book._id === id);
        let count = book.quantity;
        if (count < 5) {
            count = count + 1;
        }
        setReloader(count);
        addToDatabaseCart(id, count);
    }

    return (
        <div className="cart">
            <div className="cartInfo">
                {
                    loading ?
                        <div>
                            <Button
                                style={{
                                    margin: "215px 0",
                                    fontWeight: "800",
                                    padding: "10px 40px",
                                    backgroundColor: "#498EC5"
                                }}
                                variant="primary" disabled>
                                <Spinner
                                    as="span"
                                    animation="grow"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                                <span> Loading...</span>
                            </Button>
                        </div> :
                        <div>
                            {
                                tempCart[0] ?
                                    <div>
                                        {
                                            tempCart.map((cartItem) => (
                                                <div key={cartItem._id} className="cartDetails">
                                                    <div>
                                                        <img src={cartItem.image} alt="" />
                                                        <div className="cartText">
                                                            <p style={{ fontWeight: "700", color: "#498EC5" }}>{cartItem.title.slice(0, 10)}...</p>
                                                            <small>{cartItem.author}</small>
                                                            <br />
                                                            <br />
                                                            <p>TK. {cartItem.discountPrice}</p>
                                                        </div>
                                                    </div>
                                                    <div className="quantity">
                                                        <div>
                                                            <button
                                                                onMouseOver={() => setId(cartItem._id)}
                                                                onClick={handleMinusBtn}
                                                                className="quantityBtn"
                                                            >
                                                                <FontAwesomeIcon style={{ color: "#498EC5" }} icon={faMinusSquare} />
                                                            </button>
                                                        </div>
                                                        <div>
                                                            {cartItem.quantity}
                                                        </div>
                                                        <div>
                                                            <button
                                                                onMouseOver={() => setId(cartItem._id)}
                                                                onClick={handlePlusBtn}
                                                                className="quantityBtn">
                                                                <FontAwesomeIcon style={{ color: "#498EC5" }} icon={faPlusSquare} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <FontAwesomeIcon
                                                        onMouseOver={() => setId(cartItem._id)}
                                                        onClick={handleRemove}
                                                        style={{ color: "red", cursor: "pointer" }}
                                                        icon={faTimes}
                                                    />
                                                </div>
                                            ))
                                        }
                                    </div> :
                                    <div className="emptyCart">
                                        <div>
                                            <img src={emptyCart} alt="" />
                                            <h4>Your Cart is Empty. <Link to="/">Continue Shopping</Link></h4>
                                        </div>
                                    </div>
                            }
                        </div>
                }
            </div>
            <div style={{ display: tempCart.length ? "block" : "none" }}>
                {
                    !loading &&
                    <OrderSummary isItCart={true} cart={tempCart}></OrderSummary>
                }
            </div>
        </div>
    );
};

export default Cart;