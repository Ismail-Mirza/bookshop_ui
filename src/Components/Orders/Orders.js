import React from 'react';
import './Orders.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { OrderContext } from '../../App';
import Auth from '../Login/use-auth';
import emptyOrder from '../../images/emptyOrder.jpg';

const Orders = () => {
    const [id, setId] = useState(null);
    const auth = Auth();

    const [orders] = useContext(OrderContext);

    const order = orders.filter(order => auth.user && order.email === auth.user.email);
    return (
        <div className="orders">
            {
                order[0] ?
                    <div className="orderDetails">
                        <h4 style={{ textAlign: "center" }}>Orders</h4>
                        {
                            order.map((order) => (
                                <Link to={"/orderDetails/" + id} style={{ textDecoration: "none" }} key={order._id}>
                                    <div onMouseOver={() => setId(order._id)} className="allOrders">
                                        <div>
                                            <p>{order._id}</p>
                                            <p>{order.orderTime}</p>
                                        </div>
                                        <div>
                                            <p>{order.status}</p>
                                            <p>{order.payableTotal} TK.</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div> :
                    <div className="orderDetails">
                        <img src={emptyOrder} alt=""/>
                    </div>
            }

        </div>
    );
};

export default Orders;