import React, { useState } from 'react';

const OrderGrid = ({
  orders,
  handleAction,
}: {
  orders: any[];
  handleAction: (orderID: string, orderDetailID: string, action: boolean) => void;
}) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderDetailsStates, setOrderDetailsStates] = useState(
    orders.reduce((acc: any, order: any) => {
      order.orderDetails.forEach((detail: any) => {
        acc[detail.orderDetailID] = { approved: false, rejected: false };
      });
      return acc;
    }, {})
  );

  const toggleOrderDetails = (orderID: string) => {
    setExpandedOrder((prev) => (prev === orderID ? null : orderID));
  };

  const handleLocalAction = (orderID: string, orderDetailID: string, action: boolean) => {
    handleAction(orderID, orderDetailID, action); // Call parent function

    // Update local state for UI changes
    setOrderDetailsStates((prev: any) => ({
      ...prev,
      [orderDetailID]: {
        approved: action === true,
        rejected: action === false,
      },
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {orders.map((order) => (
        <div
          key={order.orderID}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Order ID: {order.orderID}</h2>
              <p>Retailer: {order.retailerName}</p>
              <p>Total Price: {order.totalPrice} {order.paymentCurrency}</p>
              <p>Payment Mode: {order.paymentMode}</p>
              <p>Shipping Address: {order.shippingAddress}</p>
              <p>Order Status: {order.orderStatus}</p>
            </div>
            <button
              onClick={() => toggleOrderDetails(order.orderID)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {expandedOrder === order.orderID ? 'Close Details' : 'View Details'}
            </button>
          </div>
          {expandedOrder === order.orderID && (
            <div className="mt-4 bg-gray-100 p-4 rounded">
              <h3 className="text-md font-bold mb-2">Order Details</h3>
              <div className="space-y-4">
                {order.orderDetails.map((detail: any) => (
                  <div
                    key={detail.orderDetailID}
                    className={`flex justify-between items-center bg-white shadow-sm rounded p-2 ${
                      orderDetailsStates[detail.orderDetailID].approved ||
                      orderDetailsStates[detail.orderDetailID].rejected
                        ? 'opacity-50'
                        : ''
                    }`}
                  >
                    <div>
                      <p>Product Name: {detail.productName}</p>
                      <p>Quantity: {detail.quantity}</p>
                      <p>
                        Price: {detail.productPrice} {detail.currency}
                      </p>
                      <p>Status: {detail.orderItemStatus}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleLocalAction(order.orderID, detail.orderDetailID, true)
                        }
                        disabled={
                          orderDetailsStates[detail.orderDetailID].approved ||
                          orderDetailsStates[detail.orderDetailID].rejected
                        }
                        className={`px-4 py-2 ${
                          orderDetailsStates[detail.orderDetailID].approved
                            ? 'bg-gray-300'
                            : 'bg-green-500'
                        } text-white rounded`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          handleLocalAction(order.orderID, detail.orderDetailID, false)
                        }
                        disabled={
                          orderDetailsStates[detail.orderDetailID].approved ||
                          orderDetailsStates[detail.orderDetailID].rejected
                        }
                        className={`px-4 py-2 ${
                          orderDetailsStates[detail.orderDetailID].rejected
                            ? 'bg-gray-300'
                            : 'bg-red-500'
                        } text-white rounded`}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderGrid;
