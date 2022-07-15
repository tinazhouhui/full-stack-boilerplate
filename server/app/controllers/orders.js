import {deleteOrder, getAllOrders, getOrder, saveOrder, updateOrder} from '../models/orders.js';

export async function createOrder(req, res) {
    const {id} = req.params;

    const newOrder = req.body;

    try {
        const savedOrder = await saveOrder({
            _id: id,
            ...newOrder
        });

        res.send({order: savedOrder});

    } catch (err) {
        res.status(500);
        res.send({error: err.stack});
    }
}

export async function getOrderById(req, res) {
    const {id} = req.params;
    try {
        const order = await getOrder(id);

        if (order) {
            res.send({order});
        } else {
            res.status(404);
            res.send({message: `Order ${id} was not found.`});
        }


    } catch (err) {
        res.status(500);
        res.send({error: err.stack});
    }
}

export async function getOrders(req, res) {
    try {
        const orders = await getAllOrders();

        if (orders.length > 0) {
            res.send({orders});
        } else {
            res.status(404);
            res.send({message: 'No orders found.'});
        }

    } catch (err) {
        res.status(500);
        res.send({error: err.stack});
    }
}

export async function updateOrderById(req, res) {
    const {id} = req.params;
    const newOrder = req.body;
    try {
        const previousOrder = await updateOrder(id, newOrder);
        res.send({previousOrder});

    } catch (err) {
        res.status(500);
        res.send({error: err.stack});
    }
}

export async function deleteOrderById(req, res) {
    const {id} = req.params;
    try {
        const deletedOrder = await deleteOrder(id);
        res.send({deletedOrder});

    } catch (err) {
        res.status(500);
        res.send({error: err.stack});
    }
}
