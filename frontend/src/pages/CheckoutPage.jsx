import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CheckoutPage() {
  const isLoggedIn = useSelector((state) => state.auth.user);
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto py-5">
      <h1 className="text-4xl text-center font-semibold py-5">Checkout</h1>

      <div className="flex justify-between">
        <div className="w-2/3">
          <h2 className="text-2xl font-semibold mb-3">Order Summary</h2>
          {cartItems.map((item) => (
            <div
              key={item.productId}
              className="flex items-center justify-between bg-white p-4 shadow rounded-lg mb-3"
            >
              <img
                src={item.pictureUrl}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 px-4">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">Price: ${item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-600">
                  Total: ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}

          <div className="flex justify-between items-center mt-5">
            <h2 className="text-xl font-semibold">
              Total Amount: ${totalAmount.toFixed(2)}
            </h2>
          </div>
        </div>

        <div className="w-1/3 border-l-2 pl-5">
          {!isLoggedIn && (
            <div className="mb-5">
              <p className="text-lg mb-3">
                Please login to proceed with checkout.
              </p>
              <Link
                to="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </Link>
            </div>
          )}

          <div>
            <h2 className="text-xl font-semibold mb-3">Shipping Information</h2>
            {/* Add your shipping form here */}
            <form className="space-y-3">
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-lg">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="border rounded py-1 px-2"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="text-lg">
                  Address
                </label>
                <textarea
                  id="address"
                  rows="3"
                  className="border rounded py-1 px-2"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="text-lg">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="border rounded py-1 px-2"
                />
              </div>
              <button
                disabled={!isLoggedIn ? true : false}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
