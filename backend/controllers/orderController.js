import orderModel from "../models/orderModel.js";

// Create a new order
const createOrderController = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalAmount } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).send({
        success: false,
        message: "No order item found",
      });
    } else {
      const order = new orderModel({
        user: req.user._id,
        products: orderItems.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
        })),
        shippingAddress,
        totalAmount,
        paymentMethod: "Cash on Delivery",
        status: "Pending",
      });

      const createdOrder = await order.save();
      res.status(201).send({
        success: true,
        message: "Order creation successful",
        order: createdOrder,
      });
    }
  } catch (error) {
    console.log(`createOrderController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in createOrderController",
      error,
    });
  }
};

// Get order by id
const orderByIdController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel
      .findById(orderId)
      .populate("user", "name email")
      .populate("products.product", "title price");

    if (!order) {
      return res.status(404).send({
        success: false,
        message: "No order found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Order found",
      order,
    });
  } catch (error) {
    console.log(`orderByIdController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in orderByIdController",
      error,
    });
  }
};
// Get orders of a logged-in user
const myOrdersController = async (req, res) => {
  try {
    const user = req.user._id;
    const orders = await orderModel
      .find({ user })
      .populate("products.product", "title price");

    res.status(200).send({
      success: true,
      message: "Orders found",
      orders,
    });
  } catch (error) {
    console.log(`orderByIdController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in orderByIdController",
      error,
    });
  }
};
// Get orders of a logged-in user
const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).send({
        success: false,
        message: "No order found",
      });
    }

    order.status = "Delivered";
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.log(`updateOrderStatusController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in updateOrderStatusController",
      error,
    });
  }
};

export { createOrderController, orderByIdController, myOrdersController };
