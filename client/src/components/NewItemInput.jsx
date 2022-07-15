import React, {useState} from 'react';


function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

function NewItemInput(props) {

    const {option, setNewOrder, valueToUpdate} = props;

    const initialValue = valueToUpdate ? valueToUpdate : 0
    const [quantity, setQuantity] = useState(initialValue);

    function handleAddOrder(event, item, quantity) {
        event.preventDefault();
        setNewOrder(prev => {
            if (quantity === 0) {
                delete prev[item]
                return {...prev}
            }

            return {...prev, [item]: quantity};
        });
    }


    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{toTitleCase(option)}</h5>
                    <input type="number" min="0" value={quantity}
                           onChange={(event) => setQuantity(+event.target.value)}
                    />
                    <button
                        className="btn btn-secondary btn-sm"
                        onClick={(event) => handleAddOrder(event, option, quantity)}>
                        Add to Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewItemInput;
