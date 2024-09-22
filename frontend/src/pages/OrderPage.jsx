import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const OrderPage = () => {
    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.getOrder.url, {
            method: SummaryApi.getOrder.method,
            credentials: 'include',
        });
        const responseData = await response.json();
        setData(responseData.data);
        console.log('order list', responseData);
    };

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    return (
        <div className="p-6 min-h-screen bg-gray-50">
            {!data[0] && <p className="text-center text-gray-500">No Order available</p>}

            <div className="max-w-7xl mx-auto space-y-6">
                {data.map((item, index) => (
                    <div key={item.userId + index} className="bg-white shadow-md rounded-lg p-6">
                        <p className="font-medium text-lg mb-4 text-gray-700">
                            Order Date: {moment(item.createdAt).format('LL')}
                        </p>

                        <div className="border-t border-gray-200 pt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    {item.productDetails.map((product, index) => (
                                        <div
                                            key={product.productId + index}
                                            className="flex items-start gap-4 p-4 bg-gray-100 rounded-md"
                                        >
                                            <img
                                                src={product.image[0]}
                                                alt={product.name}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-700">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-500 mt-1">
                                                    Price: {displayINRCurrency(product.price)}
                                                </p>
                                                <p className="text-gray-500 mt-1">Quantity: {product.quantity}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-gray-700">Payment Details</h3>
                                        <p className="text-gray-500 mt-1">
                                            Payment Method: {item.paymentDetails.payment_method_type[0]}
                                        </p>
                                        <p className="text-gray-500 mt-1">
                                            Payment Status: {item.paymentDetails.payment_status}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-700">Shipping Details</h3>
                                        {item.shipping_options.map((shipping, index) => (
                                            <p key={shipping.shipping_rate} className="text-gray-500">
                                                Shipping Amount: {shipping.shipping_amount}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 font-semibold text-lg text-right text-gray-700">
                                Total Amount: {displayINRCurrency(item.totalAmount)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderPage;
