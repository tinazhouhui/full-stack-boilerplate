import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
        type: String,
        quantity: Number
    })

const orderSchema = new mongoose.Schema({
    _id: String,
    items: [itemSchema],
    merchantId: String,
    userId: String,

}, {
    timestamps: true
});

const OrderModel = mongoose.model('OrderModel', orderSchema);

export async function saveOrder(order) {
    try {
        return await OrderModel.create(order);
    } catch (err) {
        console.error(err.stack);
    }
}

export async function getOrder(_id) {
    // if ID does not exist will return null
    try {
        return await OrderModel.findOne({_id});
    } catch (err) {
        console.error(err.stack);
    }
}

export async function getAllOrders() {
    try {
        return await OrderModel.find();
    } catch (err) {
        console.error(err.stack);
    }
}

export async function updateOrder(_id, newOrder) {
    // allows for partial update, to replace the whole order use findOneAndReplace
    try {
        return await OrderModel.findOneAndUpdate({_id}, newOrder);
    } catch (err) {
        console.error(err.stack);
    }
}

export async function deleteOrder(_id) {
    try {
        return await OrderModel.findOneAndDelete({_id});
    } catch (err) {
        console.error(err.stack);
    }
}
