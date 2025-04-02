import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { clearCart } from "../features/cartSlice";

function Cart() {
  const cart = useSelector((storeState) => storeState.cart);
  const dispatch = useDispatch();

  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });
  return (
    <div>
      <div className="accout-setting__content">
        <div>
          <h4>product list in the cart</h4>
        </div>

        <table>
          <thead>
            <tr>
              <th>image</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Quality</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="cart__total">
        <h4>Total Price: {totalPrice}</h4>
        <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>
    </div>
  );
}

export default Cart;
