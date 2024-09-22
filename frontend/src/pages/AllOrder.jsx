import React, { useEffect, useState } from 'react';
import SummaryApi from '../../common';
import moment from 'moment';
import displayINRCurrency from '../helpers/displayCurrency';

const AllOrder = () => {
    const [data, setData] = useState([]);

    const fetchOrderDetails = async () => {
        const response = await fetch(SummaryApi.allOrder.url, {
            method: SummaryApi.allOrder.method,
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
        <div className="min-h-screen bg-gray-50 p-6">
            {!data[0] && <p className="text-center text-gray-500">No Order available</p>}

            <div className="max-w-7xl mx-auto space-y-6">
                {data.map((item, index) => (
                    <div key={item.userId + index} className="bg-white shadow-md rounded-lg p-6">
                        <div className="flex justify-between items-center">
                            <p className="font-semibold text-xl text-gray-800">
                                Order Date: {moment(item.createdAt).format('LL')}
                            </p>
                            <p className="text-lg font-medium text-indigo-600">
                                Total Amount: {displayINRCurrency(item.totalAmount)}
                            </p>
                        </div>

                        <div className="border-t border-gray-200 pt-4 mt-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {item.productDetails.map((product, index) => (
                                        <div
                                            key={product.productId + index}
                                            className="flex items-start gap-4 bg-gray-100 p-4 rounded-md"
                                        >
                                            <img
                                                src={product.image[0]}
                                                alt={product.name}
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                            <div>
                                                <h3 className="font-medium text-lg text-gray-800">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-500 mt-1">
                                                    Price: {displayINRCurrency(product.price)}
                                                </p>
                                                <p className="text-gray-500 mt-1">
                                                    Quantity: {product.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-medium text-gray-800">Payment Details</h3>
                                        <p className="text-gray-500 mt-1">
                                            Payment Method: {item.paymentDetails.payment_method_type[0]}
                                        </p>
                                        <p className="text-gray-500 mt-1">
                                            Payment Status: {item.paymentDetails.payment_status}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-gray-800">Shipping Details</h3>
                                        {item.shipping_options.map((shipping, index) => (
                                            <p key={shipping.shipping_rate} className="text-gray-500">
                                                Shipping Amount: {shipping.shipping_amount}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllOrder;
