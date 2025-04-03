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
    <div className="grid grid-cols-1 gap-4 p-0">
      {orders.map((order) => (
        <div
          key={order.orderID}
          className="bg-white shadow-md rounded-lg p-4 border "
        >
          <div className="flex justify-between items-center">
		  
			<div className="p-6 rounded shadow-md">
					<h2 className="text-lg font-semibold mb-4">Order ID: {order.orderID}</h2>
					<div className="flex flex-wrap gap-4">
						<p className="flex-1 text-lg font-bold text-gray-800">
						Retailer Name: <span className="font-normal">{order.retailerName}</span>
						</p>
						<p className="flex-1 text-lg font-bold text-gray-800">
						Delivery Personnel ID: <span className="font-normal">{order.deliveryPersonnelID}</span>
						</p>
						<p className="flex-1 text-lg font-bold text-gray-800">
						Total Price: <span className="font-normal">{order.totalPrice} {order.paymentCurrency}</span>
						</p>
						<p className="flex-1 text-lg font-bold text-gray-800">
						Payment Mode: <span className="font-normal">{order.paymentMode}</span>
						</p>
						<p className="flex-1 text-lg font-bold text-gray-800">
						Shipping Cost: <span className="font-normal">{order.shippingCost} {order.shippingCurrency}</span>
						</p>
						<p className="flex-1 text-lg font-bold text-gray-800">
						Shipping Address: <span className="font-normal">{order.shippingAddress}</span>
						</p>
						<p className="flex-1 text-lg font-bold text-gray-800">
						Order Status: <span className="font-normal">{order.orderStatus}</span>
						</p>
            <button
              onClick={() => toggleOrderDetails(order.orderID)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {expandedOrder === order.orderID ? 'Close Details' : 'View Details'}
            </button>
					</div>
			</div>

          </div>
          {expandedOrder === order.orderID && (
            <div className="mt-2 bg-gray-100 p-2 rounded">
              <h3 className="text-md font-bold mb-2">Order Details</h3>
              <div className="space-y-1">
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
				
					<div class="space-y-1 p-1 rounded shadow-md">
					  <p class="text-lg font-bold text-gray-800">Product Name: <span class="font-normal">{detail.productName}</span></p>
					  <p class="text-lg font-bold text-gray-800">Manufacturer Name: <span class="font-normal">{detail.manufacturerName}</span></p>
					  <p class="text-lg font-bold text-gray-800">Quantity: <span class="font-normal">{detail.quantity}</span></p>
					  <p class="text-lg font-bold text-gray-800">Price: <span class="font-normal">{detail.productPrice}</span></p>
					  <p class="text-lg font-bold text-gray-800">Order Status: <span class="font-normal">{detail.orderItemStatus}</span></p>
				
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
