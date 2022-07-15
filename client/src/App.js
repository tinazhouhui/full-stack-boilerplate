import './App.css';
import OrderList from './components/OrderList/OrderList';
import OrderForm from './components/OrderForm';
import {useState} from 'react';
import React, {useEffect} from 'react';
import {getAllOrders} from './services/orderApi';
import OrderDetail from './components/OrderDetail';

function App() {
    const [orders, setOrders] = useState([]);
    const [newOrderFrom, setNewOrderForm] = useState(false);
    const [displayOrder, setDisplayOrder] = useState();

    useEffect(() => {
        (async () => {
            const orders = await getAllOrders();
            setOrders(orders.orders);
        })();
    }, []);

    return (
        <div className="App">
            <h1>Orders</h1>
            <div className="container my-5">
                <div className="row">
                    <OrderList orders={orders} setDisplayOrder={setDisplayOrder}/>
                    {displayOrder && <OrderDetail
                        order={displayOrder}
                        setDisplayOrder={setDisplayOrder}
                        setOrders={setOrders}
                    />}
                </div>
            </div>

            {newOrderFrom ?
                <OrderForm setNewOrderForm={setNewOrderForm} setOrders={setOrders}/> :
                <button className="btn btn-lg btn-success" onClick={() => setNewOrderForm(true)}>
                    New order
                </button>}
        </div>
    );
}

export default App;
