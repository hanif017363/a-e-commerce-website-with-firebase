import { useState } from "react";
import { useDispatch } from "react-redux";

import { modifyQuantity, removeFromCart } from "../features/cartSlice";

function CartItem({ item }) {
  const [itemQuantity, setItemQuantity] = useState(item.quantity);
  const dispatch = useDispatch();

  return (
    <div>
      <tr>
        <td>
          <div className="product">
            <img src={item.image} className="product-img" alt={item.title} />
          </div>
        </td>
        <td>
          <p>{item.title}</p>
        </td>
        <td>$ {item.price}</td>
        <td>
          <div className="qty_input">
            <button
              className="qty-count qty-count--minus"
              data-action="minus"
              type="button"
              onClick={() => {
                if (itemQuantity > 1) {
                  dispatch(
                    modifyQuantity({
                      id: item.id,
                      quantity: itemQuantity - 1,
                    })
                  );
                  setItemQuantity(itemQuantity - 1);
                } else {
                  alert(`Quantity should not be less than 1`);
                }
              }}
            >
              <figure>-</figure>
            </button>
            <input
              className="product-qty"
              type="number"
              name="product-qty"
              value={itemQuantity}
              min="1"
              onChange={(event) => {
                // console.log(typeof event.target.value);
                dispatch(
                  modifyQuantity({
                    id: item.id,
                    quantity: Number(event.target.value),
                  })
                );
                setItemQuantity(Number(event.target.value));
              }}
            />
            <button
              className="qty-count qty-count--add"
              data-action="add"
              type="button"
              onClick={() => {
                dispatch(
                  modifyQuantity({
                    id: item.id,
                    quantity: itemQuantity + 1,
                  })
                );
                setItemQuantity(itemQuantity + 1);
              }}
            >
              <figure>+</figure>
            </button>
          </div>
        </td>
        <td>$ {item.price * item.quantity}</td>
        <td>
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="cross-icon"
          >
            x
          </button>
        </td>
      </tr>
    </div>
  );
}

export default CartItem;
