import React from 'react';
import './OrderDetails.css';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { OrderContext } from '../../App';
import Stepper from 'react-stepper-horizontal';
import { useState } from 'react';
import { useEffect } from 'react';
import Auth from '../Login/use-auth';
import emptyOrder from '../../images/emptyOrder.jpg';

const OrderDetails = () => {
    const [step, setStep] = useState(null);
    const [status, setStatus] = useState(null);
    const { id } = useParams();
    const auth = Auth();

    const [orders] = useContext(OrderContext);

    const orderEmail = orders.filter(order => auth.user && order.email === auth.user.email)

    const order = orderEmail.filter(order => order._id === id);

    useEffect(() => {
        if (order) {
            order.forEach(order => setStatus(order.status))
        }
    }, [order]);

    useEffect(() => {
        if (status === "Pending") {
            setStep(0)
        }
        else {
            setStep(2)
        }
    }, [status]);

    return (
        <div className="orderInfo">
            {
                order[0] ?
                    <div className="orderDetailsInfo">
                        {
                            order.map((order) => (
                                <div key={order._id}>
                                    <p>Order ID: {order._id}</p>
                                    <p>{order.orderTime}</p>
                                    <div>
                                        <p>Your Order Delivery Information</p>
                                        <div>
                                            <Stepper steps={[{ title: 'Pending' }, { title: 'Processing' }, { title: 'Shipped' }, { title: 'Delivered' }]} activeStep={step} activeColor="limegreen" />
                                        </div>
                                    </div>
                                    <div className="orderCart">
                                        {
                                            order.cart.slice(0, 8).map((cart) => (
                                                <div key={cart._id} className="orderCartDetails">
                                                    <img src={cart.image} alt="" />
                                                    <br />
                                                    <small>{cart.title.slice(0, 8)}...</small>
                                                </div>
                                            ))
                                        }
                                        <p style={{ display: order.cart.length > 8 ? "flex" : "none", alignItems: "center" }}>and more</p>
                                    </div>
                                    <div className="PricingAndDelivery">
                                        <div>
                                            <p>Order Summery</p>
                                            <div>
                                                <p>Total Items:</p>
                                                <p>{order.cart.length} Products</p>
                                            </div>
                                            <div>
                                                <p>Total Price:</p>
                                                <p>{order.payableTotal} TK.</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>Delivery Address</p>
                                            <div>
                                                <p>{order.shipment.address1}, {order.shipment.address2}, {order.shipment.city}, {order.shipment.country}</p>
                                                <p>Contact No: {order.shipment.contactNumber}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div> :
                    <div className="orderDetails">
                        <img src={emptyOrder} alt="" />
                    </div>
            }
        </div>
    );
};

export default OrderDetails;