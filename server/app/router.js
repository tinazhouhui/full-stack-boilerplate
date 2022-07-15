'use strict';

import Router from 'express';
import {createOrder, deleteOrderById, getOrderById, getOrders, updateOrderById} from './controllers/orders.js';

const router = Router();

router.get('/v1/orders', getOrders);
router.post('/v1/orders/:id', createOrder);
router.get('/v1/orders/:id', getOrderById); // not used
router.put('/v1/orders/:id', updateOrderById);
router.delete('/v1/orders/:id', deleteOrderById);


export default router;
