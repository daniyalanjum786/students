import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
} from "@/store/features/cart/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    toast.info("Item removed from cart.");
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-4xl text-center font-semibold py-5">Your Cart</h1>
      <div className="flex flex-col space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
          >
            <img
              src={item.pictureUrl}
              alt={item.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 px-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className="text-gray-600">
                Total: ${(item.price * item.quantity).toFixed(2)}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId, item.quantity - 1)
                  }
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.productId,
                      parseInt(e.target.value)
                    )
                  }
                  className="w-12 text-center mx-2"
                />
                <button
                  onClick={() =>
                    handleQuantityChange(item.productId, item.quantity + 1)
                  }
                  className="px-2 py-1 bg-gray-300 rounded"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => handleRemoveFromCart(item.productId)}
              className="text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-5">
        <h2 className="text-2xl font-semibold">
          Total: ${totalAmount.toFixed(2)}
        </h2>
        <Link
          to="/checkout"
          className="bg-orange-400 text-black px-4 py-2 rounded hover:bg-orange-500"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
