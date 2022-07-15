import React, {useState} from 'react';
import NewItemInput from './NewItemInput';
import {createOrder, updateOrder} from '../services/orderApi';
import {v4 as uuidv4} from 'uuid';


function OrderForm(props) {
    const options = ['shirt', 'shoes', 'socks', 'sweater'];

    const {setNewOrderForm, setOrders, orderToUpdate, setOrderDetail} = props;

    // if we get order to update then convert it to correct format to use as initial state. else {}
    let initialState = orderToUpdate ? orderToUpdate.items.reduce((acc, ord) => {
        acc[ord.type] = ord.quantity;
        return acc;
    }, {}) : {};

    const [newOrder, setNewOrder] = useState(initialState);

    function handleSubmit() {
        if (!orderToUpdate) {
            // new order
            // todo merchant and user identification
            const orderRequest = {
                merchantId: "verycoolmerchant",
                userId: "verycooluser",
                items: [],
            };
            // add order details to request
            for (const [type, quantity] of Object.entries(newOrder)) {
                orderRequest.items.push({type, quantity});
            }

            // save to db
            (async function () {
                try {
                    const orderId = uuidv4();
                    const newOrder = await createOrder(orderRequest, orderId);
                    // update app state
                    setOrders(prev => {
                            return [...prev, newOrder.order];
                        }
                    );
                    // close form
                    setNewOrderForm(false);

                } catch (e) {
                    console.error(e.stack);
                }
            })();
        } else {
            // update existing order
            const {_id, merchantId, userId} = orderToUpdate;

            // add updated order details to request
            const updatedOrderRequest = {
                items: [],
                merchantId,
                userId
            };

            for (const [type, quantity] of Object.entries(newOrder)) {
                updatedOrderRequest.items.push({type, quantity});
            }

            // save to db
            (async function () {
                try {
                    await updateOrder(updatedOrderRequest, _id);
                    updatedOrderRequest._id = _id

                    // update internal app state
                    setOrders(prev => {
                            const copy = [...prev];

                            const indexOfUpdated = copy.findIndex((order => order._id === _id));
                            copy[indexOfUpdated] = updatedOrderRequest;

                            return copy;
                        }
                    );

                    // close form and details
                    setNewOrderForm(false);
                    setOrderDetail && setOrderDetail(false);

                } catch (e) {
                    console.error(e.stack);
                }
            })();
        }


    }

    return (
        <>
            {Object.entries(newOrder).map(([item, qty]) => <div key={item}>{item}: {qty}</div>)}

            <button className="btn btn-primary" disabled={Object.keys(newOrder).length === 0}
                    onClick={handleSubmit}>Save order
            </button>
            <div className="row row-cols-1 row-cols-md-2 g-4">
                {options.map(option => <NewItemInput key={option} option={option}
                                                     setNewOrder={setNewOrder} valueToUpdate={initialState[option]}/>)}
            </div>

            <button className="btn btn-secondary" onClick={() => setNewOrderForm(false)}>Cancel</button>
        </>
    );
}

export default OrderForm;
