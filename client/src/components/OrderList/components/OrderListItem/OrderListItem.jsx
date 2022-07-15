import React from 'react';
import styles from './OrderListItem.module.css';

function OrderListItem(props) {
    const {order, selectOrder} = props;

    return <button
        type="button"
        className={`list-group-item list-group-item-action ${styles.listItem}`}
        onClick={() => selectOrder(order)}
    >
        <span>OrderID: {order._id}</span>
        <span>Items: {order.items.length}</span>
    </button>;

}

export default OrderListItem;
