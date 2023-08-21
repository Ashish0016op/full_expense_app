require('dotenv').config();
const rzp = require('razorpay');
const orderModel = require('../model/order'); // Renamed "order" model to "orderModel"

exports.purchasePremium = async (req, res, next) => {
    try {
        var instance = new rzp({
            key_id: 'rzp_test_qxOfOsgfsLuEmJ',
            key_secret: 'HkFByz1MiTN8wO0kFM5wYBUw'
        });

        const amount = 2500;

        instance.orders.create({ amount, currency: "INR" }, async (err, rzpOrder) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Error creating order' });
            }

            try {
                await orderModel.create({
                    orderid: rzpOrder.id,
                    status: 'PENDING'
                });

                return res.status(201).json({ order: rzpOrder, key_id: 'rzp_test_qxOfOsgfsLuEmJ' });
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

        const foundOrder = await orderModel.findOne({ where: { orderid: order_id } });
        if (!foundOrder) {
            return res.status(404).json({ error: 'Order not found' });
        }

        await foundOrder.update({ paymentid: payment_id, status: 'success' });

        return res.status(202).json({ success: true, message: 'Transaction successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

