import React, {useState} from 'react';
import {deleteOrder} from '../services/orderApi';
import OrderForm from './OrderForm';

function OrderDetail(props) {
    const {order, setDisplayOrder, setOrders} = props;
    const [editMode, setEditMode] = useState(false);

    function handleDelete() {
        (async () => {
            // todo handle errors
            const deleted = await deleteOrder(order._id);

            // update state
            setOrders((prev) => {
                    return prev.filter(order => order._id !== deleted.deletedOrder._id);
                }
            );

            // close order detail
            setDisplayOrder();
        })();
    }

    return <div className="col">
        <h3 className="pb-3">#{order._id}</h3>

        {editMode ?
            <>
                <OrderForm setNewOrderForm={setEditMode} orderToUpdate={order} setOrders={setOrders} setOrderDetail={setDisplayOrder}/>
            </> :
            <>
                {order.items.map((item) => <div key={item._id}>{item.type} x {item.quantity}</div>)}
                <div className="d-flex justify-content-around">
                    <button className="btn btn-danger mt-3" onClick={handleDelete}>Delete</button>
                    <button className="btn btn-warning mt-3" onClick={() => setEditMode(true)}>Edit</button>
                </div>
            </>}
    </div>;
}

export default OrderDetail;
