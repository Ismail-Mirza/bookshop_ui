import React, { useEffect, useContext, useState } from 'react';
import './Shipment.css';
import { useForm } from 'react-hook-form';
import Auth from '../Login/use-auth';
import { Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import OrderSummary from '../OrderSummary/OrderSummary';
import { getDatabaseCart, clearLocalShoppingCart } from '../LocalStorageManager/LocalStorageManager';
import { AllBooksContext, OrderContext } from '../../App';
import { Link } from 'react-router-dom';
import orderConfirmed from '../../images/orderConfirmed.jpg';
import bKashLogo from '../../images/logo/bKash_logo.png'
import BAStep1 from '../../images/bKash_App/with_QR_code/step-1.png';
import BAStep2 from '../../images/bKash_App/with_QR_code/step-2.png';
import BAStep3 from '../../images/bKash_App/with_QR_code/step-3.png';
import BAStep4 from '../../images/bKash_App/with_QR_code/step-4.png';
import BAStep5 from '../../images/bKash_App/with_QR_code/step-5.png';
import BAOutQR1 from '../../images/bKash_App/without_QR_code/step-1.png';
import BAOutQR2 from '../../images/bKash_App/without_QR_code/step-2.png';
import BAOutQR3 from '../../images/bKash_App/without_QR_code/step-3.png';
import BAOutQR4 from '../../images/bKash_App/without_QR_code/step-4.png';
import BAOutQR5 from '../../images/bKash_App/without_QR_code/step-5.png';

const Shipment = () => {
    const [cart, setCart] = useState([]);
    const [shipInfo, setShipInfo] = useState(null);
    const [value, setValue] = useState("bKashApp")
    const [bKashApp, setBKashApp] = useState("withoutQR");
    const [transId, setTransID] = useState(null);
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const auth = Auth();

    const allBooks = useContext(AllBooksContext);
    const [orders, setOrders] = useContext(OrderContext);

    const { register, handleSubmit, errors, reset } = useForm();

    const path = window.location;

    useEffect(() => {
        setOrder(null)
    }, [path])

    const onSubmit = (shipInfo) => {
        setShipInfo(shipInfo);
        reset();
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if (allBooks.length) {
            const previousCart = productKeys.map(existingKey => {
                const book = allBooks.find(book => book._id === existingKey);
                book.quantity = savedCart[existingKey];
                return book;
            })
            setCart(previousCart);
        }
    }, [allBooks]);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
    }

    const handleBKashAppChange = (event) => {
        setBKashApp(event.target.value);
    }

    let subtotal = 0;
    for (let i = 0; i < cart.length; i++) {
        const book = cart[i];
        subtotal = subtotal + parseFloat(book.discountPrice) * book.quantity;
    };

    let shipping = 0;
    if (subtotal) {
        shipping = 50;
    }

    let total = 0;
    if (subtotal) {
        total = subtotal + shipping;
    }

    const handlePlaceOrder = () => {
        const orderDetails = {
            email: auth.user.email,
            cart: cart,
            shipment: shipInfo,
            transId: transId,
            payableTotal: total,
            status: "Pending"
        };
        setLoading(true);
        fetch("/placeOrder", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(order => {
                setOrder(order);
                setLoading(false);
                clearLocalShoppingCart();
                fetch("/orders")
                    .then(res => res.json())
                    .then(data => {
                        const fetchedData = data.reverse()
                        setOrders(fetchedData);
                    });
            })
    }

    let methodDetails;
    if (bKashApp === "withoutQR") {
        methodDetails = (
            <div className="methodDetails">
                <div>
                    <p>Step 1</p>
                    <p>Click on Send Money inside the red circle</p>
                    <img src={BAOutQR1} alt="" />
                </div>
                <div>
                    <p>Step 2</p>
                    <p>01790744235 Enter the number to continue process</p>
                    <img src={BAOutQR2} alt="" />
                </div>
                <div>
                    <p>Step 3</p>
                    <p>Enter Payable Total price on Amount section</p>
                    <img src={BAOutQR3} alt="" />
                </div>
                <div>
                    <p>Step 4</p>
                    <p>{shipInfo && shipInfo.contactNumber} Enter Your Contact Number as Reference</p>
                    <img src={BAOutQR4} alt="" />
                </div>
                <div>
                    <p>Step 5</p>
                    <p>Tap and hold to Send Money to complete the process</p>
                    <img src={BAOutQR5} alt="" />
                </div>
            </div>
        )
    }
    else if (bKashApp === "withQR") {
        methodDetails = (
            <div className="methodDetails">
                <div>
                    <p>Step 1</p>
                    <p>Click on Scan QR Code inside the red circle</p>
                    <img src={BAStep1} alt="" />
                </div>
                <div>
                    <p>Step 2</p>
                    <p>Scan the QR code to continue the payment process</p>
                    <img src={BAStep2} alt="" />
                </div>
                <div>
                    <p>Step 3</p>
                    <p>Enter Payable Total price on Amount section</p>
                    <img src={BAStep3} alt="" />
                </div>
                <div>
                    <p>Step 4</p>
                    <p>{shipInfo && shipInfo.contactNumber} Enter Your Contact as Reference</p>
                    <img src={BAStep4} alt="" />
                </div>
                <div>
                    <p>Step 5</p>
                    <p>Tap and hold to Send Money to complete the process</p>
                    <img src={BAStep5} alt="" />
                </div>
            </div>
        )
    }

    let method;
    if (value === "bKashApp") {
        method = (
            <div className="method">
                <FormControl>
                    <RadioGroup value={bKashApp} onChange={handleBKashAppChange}>
                        <FormControlLabel
                            value="withoutQR"
                            control={<Radio color="primary" style={{ color: "#498EC5" }} />}
                            label={"Pay with Send Money option"}
                        />
                        <FormControlLabel
                            value="withQR"
                            control={<Radio color="primary" style={{ color: "#498EC5" }} />}
                            label={"Pay with Scan QR option"}
                        />
                    </RadioGroup>
                </FormControl>
                {methodDetails}
            </div>
        )
    }

    return (
        <div>
            {
                order ?
                    <div className="shipOrder">
                        <div className="shipOrderDetails">
                            <h3>Order Successfully Placed</h3>
                            <h4>Your Order ID is <span>{order._id}</span></h4>
                            <img src={orderConfirmed} alt="" />
                            <div>
                                <Link style={{ textDecoration: "none" }} to="/orders">
                                    <Button>Track Your Order</Button>
                                </Link>
                                <Link style={{ textDecoration: "none" }} to="/">
                                    <Button>Continue Shopping</Button>
                                </Link>
                            </div>
                        </div>
                    </div> :
                    <div className="shipment">
                        {
                            !shipInfo ?
                                <div className="shipmentDetails">
                                    <h3>Shipping Address</h3>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <input type="text" name="name" placeholder="Your Name*" defaultValue={auth.user && auth.user.name} ref={register({ required: true })} />
                                        <br />
                                        {errors.name && <small>Your Name is required</small>}
                                        <br />
                                        <input type="email" name="email" placeholder="Your Email*" defaultValue={auth.user && auth.user.email} ref={register({ required: true, pattern: /(.+)@(.+){2,}\.(.+){2,}/ })} />
                                        <br />
                                        {errors.email && <small>Enter a valid email</small>}
                                        <br />
                                        <input type="text" name="contactNumber" placeholder="Your Contact Number*" ref={register({ required: true, minLength: 11, maxLength: 14, pattern: /[0-9]/ })} />
                                        <br />
                                        {errors.contactNumber && <small>Enter a valid phone number</small>}
                                        <br />
                                        <input type="text" name="address1" placeholder="Address Line-1*" ref={register({ required: true })} />
                                        <br />
                                        {errors.address1 && <small>Address Line-1 is required</small>}
                                        <br />
                                        <input type="text" name="address2" placeholder="Address Line-2" ref={register} />
                                        <br />
                                        <br />
                                        <input type="text" name="city" placeholder="City/District*" ref={register({ required: true })} />
                                        <br />
                                        {errors.city && <small>City/District is required</small>}
                                        <br />
                                        <input type="text" name="country" placeholder="Country*" defaultValue="Bangladesh" ref={register({ required: true })} />
                                        <br />
                                        {errors.country && <small>Country is required</small>}
                                        <br />
                                        <Button style={{ display: cart[0] ? "block" : "none" }} type="submit" className="shipmentBtn">Continue To Payment</Button>
                                        <Button style={{ display: cart[0] ? "none" : "Block" }} className="shipmentBtn">Cart is Empty</Button>
                                    </form>
                                </div> :
                                <div className="paymentInfo">
                                    <h3>Payment Method</h3>
                                    <div className="paymentMethods">
                                        <div className="methods" style={{ display: "none" }}>
                                            <FormControl>
                                                <RadioGroup value={value} onChange={handleRadioChange} style={{ display: "inline" }}>
                                                    <FormControlLabel
                                                        value="bKashApp"
                                                        control={<Radio color="primary" style={{ color: "#498EC5" }} />}
                                                        label={
                                                            <div>
                                                                <img src={bKashLogo} alt="bKashLogo" />
                                                                <span style={{ marginLeft: "-5px" }}>bKash App</span>
                                                            </div>
                                                        }
                                                    />
                                                    <FormControlLabel
                                                        value="bKash"
                                                        control={<Radio color="primary" style={{ color: "#498EC5" }} />}
                                                        label={
                                                            <div>
                                                                <img src={bKashLogo} alt="bKashLogo" />
                                                                <span style={{ marginLeft: "-5px" }}>bKash</span>
                                                            </div>
                                                        }
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </div>
                                        <div className="details" style={{ display: "none" }}>
                                            {method}
                                        </div>
                                        <div className="confirmBtn">
                                            <form onSubmit={handleSubmit(handlePlaceOrder)}>
                                                {errors.transID && <small>Transaction ID is required</small>}
                                                <br />
                                                <input type="text" name="transID" defaultValue="For Testing" onChange={(event) => setTransID(event.target.value)} placeholder="Enter Transaction ID" ref={register({ required: true })} />
                                                <Button style={{display: loading? "none" : "inline"}} className="confirmOrderBtn" type="submit">Confirm Order</Button>
                                                <Button style={{display: loading? "inline" : "none"}}>Loading...</Button>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                        }
                        <OrderSummary isItCart={false} cart={cart}></OrderSummary>
                    </div>
            }
        </div>
    );
};

export default Shipment;