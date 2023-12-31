require('dotenv').config();
const rzp = require('razorpay');
const Order = require('../model/order');
const User=require('../model/loginDetails');
exports.purchasePremium = async (req, res, next) => {
    try {
        var instance = new rzp({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const amount = 2500;
        instance.orders.create({ amount, currency: "INR" }, async (err, rzpOrder) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error creating order' });
            }

            try {
                await Order.create({
                    orderid: rzpOrder.id,
                    status: 'PENDING'
                });

                return res.status(201).json({ order: rzpOrder, key_id: process.env.RAZORPAY_KEY_ID });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error creating order' });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.updateTransaction = async (req, res, next) => {
    try {
        const { payment_id, order_id } = req.body;
        const updatedOrder = await Order.findOneAndUpdate(
            { orderid: order_id },
            { paymentid: payment_id, status: 'success' },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { isPremium: true },
            { new: true }
        );

        return res.status(202).json({ success: true, message: 'Transaction successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

