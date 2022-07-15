const basePath = 'http://localhost:5000/v1';

export async function getAllOrders() {
    try {
        const orders = await fetch(`${basePath}/orders/`);
        return orders.json();
    } catch (err) {
        console.error(err.stack);
    }
}

export async function deleteOrder(id) {
    try {
        const deletedOrder = await fetch(`${basePath}/orders/${id}`, {method: 'DELETE'});
        return deletedOrder.json();
    } catch (err) {
        console.error(err.stack);
    }
}

export async function createOrder(body, orderId) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    try {
        const newOrder = await fetch(`${basePath}/orders/${orderId}`, options);
        return newOrder.json();
    } catch (err) {
        console.error(err.stack);
    }
}

export async function updateOrder(body,orderId) {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };

    try {
        const newOrder = await fetch(`${basePath}/orders/${orderId}`, options);
        return newOrder.json();
    } catch (err) {
        console.error(err.stack);
    }
}
