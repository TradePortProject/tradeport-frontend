import React, { useState } from 'react';

const OrderGrid = ({ orders }: { orders: any[] }) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderStates, setOrderStates] = useState(
    orders.map(() => ({ approved: false, rejected: false }))
  );

  const toggleOrderDetails = (orderID: string) => {
    setExpandedOrder((prev) => (prev === orderID ? null : orderID));
  };

  const handleAction = (orderIndex: number, action: string) => {
    setOrderStates((prev) =>
      prev.map((state, index) =>
        index === orderIndex
          ? {
              ...state,
              approved: action === 'approve',
              rejected: action === 'reject',
            }
          : state
      )
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {orders.map((order, orderIndex) => (
        <div
          key={order.orderID}
          className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Order ID: {order.orderID}</h2>
              <p>Retailer: {order.retailerName}</p>
              <p>Total Price:  {order.totalPrice} {order.paymentCurrency}</p>
              <p>Order Status: {order.deliveryPersonnelID}</p>
              <p>Total Price: {order.totalPrice} {order.paymentCurrency} </p>
              <p>paymentMode: {order.paymentMode}</p>
              <p>Order Status: {order.shippingCost} {order.shippingCurrency}</p>
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
                {order.orderDetails.map((detail: any, detailIndex: number) => (
                  <div
                    key={detail.orderDetailID}
                    className="flex justify-between items-center bg-white shadow-sm rounded p-2"
                  >
                    <div>
					  <p>Product Name: {detail.productName}</p>
					  <p>ManufacturerName: {detail.manufacturerName}</p>
					  <p>Quantity: {detail.quantity}</p>
					  <p>ProductPrice: {detail.productPrice}</p>
					  <p>Order Status: {detail.orderItemStatus}</p>

                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleAction(orderIndex, 'approve')}
                        disabled={orderStates[orderIndex].approved || orderStates[orderIndex].rejected}
                        className={`px-4 py-2 ${
                          orderStates[orderIndex].approved ? 'bg-gray-300' : 'bg-green-500'
                        } text-white rounded`}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(orderIndex, 'reject')}
                        disabled={orderStates[orderIndex].approved || orderStates[orderIndex].rejected}
                        className={`px-4 py-2 ${
                          orderStates[orderIndex].rejected ? 'bg-gray-300' : 'bg-red-500'
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
