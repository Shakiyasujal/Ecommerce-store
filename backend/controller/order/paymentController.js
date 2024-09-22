const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');

const paymentController = async (req, res) => {
    try {
        const { cartItems } = req.body;

        // Fetch user from the database
        const user = await userModel.findOne({ _id: req.userId });
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                error: true,
                success: false
            });
        }

        // Prepare Stripe checkout session parameters
        const params = {
            submit_type: 'pay',
            mode: "payment",
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            shipping_options: [
                {
                    shipping_rate: 'shr_1Q0JbeP86E8im3brzNhaguK4' // Ensure this is a valid shipping rate ID
                }
            ],
            customer_email: user.email,
            metadata: {
                userId: req.userId
            },
            line_items: cartItems.map((item) => {
                return {
                    price_data: {
                        currency: 'NPR',
                        product_data: {
                            name: item.productId.productName,
                            images: item.productId.productImage,
                            metadata: {
                                productId: item.productId._id
                            }
                        },
                        unit_amount: item.productId.sellingPrice * 100
                    },
                    adjustable_quantity: {
                        enabled: true,
                        minimum: 1
                    },
                    quantity: item.quantity
                };
            }),
            success_url: `${process.env.FRONTEND_URL}/success`,
            cancel_url: `${process.env.FRONTEND_URL}/cancel`,
        };

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create(params);
        res.status(303).json(session);
    } catch (err) {
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = paymentController;
