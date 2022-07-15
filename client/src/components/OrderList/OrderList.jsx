import React from 'react';
import OrderListItem from './components/OrderListItem/OrderListItem';

function OrderList(props) {

    const {orders, setDisplayOrder} = props;

    return <div className="col">
        {orders.map((order) => <OrderListItem key={order._id} order={order} selectOrder={setDisplayOrder}/>)}
    </div>;
}

export default OrderList;
