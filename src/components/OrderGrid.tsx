import { useState } from "react";

const OrderGrid = ({
  orders,
  handleAction,
}: {
  orders: any[];
  handleAction: (
    orderID: string,
    orderDetailID: string,
    action: boolean,
  ) => void;
}) => {
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderDetailsStates, setOrderDetailsStates] = useState(
    orders.reduce((acc: any, order: any) => {
      order.orderDetails.forEach((detail: any) => {
        acc[detail.orderDetailID] = { approved: false, rejected: false };
      });
      return acc;
    }, {}),
  );

  const toggleOrderDetails = (orderID: string) => {
    setExpandedOrder((prev) => (prev === orderID ? null : orderID));
  };

  const handleLocalAction = (
    orderID: string,
    orderDetailID: string,
    action: boolean,
  ) => {
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
          className="rounded-lg border bg-white p-4 shadow-md"
        >
          <div className="flex items-center justify-between">
            <div className="rounded p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold">
                Order ID: {order.orderID}
              </h2>
              <div className="flex flex-wrap gap-4">
                <p className="flex-1 text-lg font-bold text-gray-800">
                  Retailer Name:{" "}
                  <span className="font-normal">{order.retailerName}</span>
                </p>
                <p className="flex-1 text-lg font-bold text-gray-800">
                  Delivery Personnel ID:{" "}
                  <span className="font-normal">
                    {order.deliveryPersonnelID}
                  </span>
                </p>
                <p className="flex-1 text-lg font-bold text-gray-800">
                  Total Price:{" "}
                  <span className="font-normal">
                    {order.totalPrice} {order.paymentCurrency}
                  </span>
                </p>
                <p className="flex-1 text-lg font-bold text-gray-800">
                  Payment Mode:{" "}
                  <span className="font-normal">{order.paymentMode}</span>
                </p>
                <p className="flex-1 text-lg font-bold text-gray-800">
                  Shipping Cost:{" "}
                  <span className="font-normal">
                    {order.shippingCost} {order.shippingCurrency}
                  </span>
                </p>
                <p className="flex-1 text-lg font-bold text-gray-800">
                  Shipping Address:{" "}
                  <span className="font-normal">{order.shippingAddress}</span>
                </p>
                <p className="flex-1 text-lg font-bold text-gray-800">
                  Order Status:{" "}
                  <span className="font-normal">{order.orderStatus}</span>
                </p>
                <button
                  onClick={() => toggleOrderDetails(order.orderID)}
                  className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  {expandedOrder === order.orderID
                    ? "Close Details"
                    : "View Details"}
                </button>
              </div>
            </div>
          </div>
          {expandedOrder === order.orderID && (
            <div className="mt-2 rounded bg-gray-100 p-2">
              <h3 className="text-md mb-2 font-bold">Order Details</h3>
              <div className="space-y-1">
                {order.orderDetails.map((detail: any) => (
                  <div
                    key={detail.orderDetailID}
                    className={`flex items-center justify-between rounded bg-white p-2 shadow-sm ${
                      orderDetailsStates[detail.orderDetailID].approved ||
                      orderDetailsStates[detail.orderDetailID].rejected
                        ? "opacity-50"
                        : ""
                    }`}
                  >
                    <div className="space-y-1 rounded p-1 shadow-md">
                      <p className="text-lg font-bold text-gray-800">
                        Product Name:{" "}
                        <span className="font-normal">
                          {detail.productName}
                        </span>
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        Manufacturer Name:{" "}
                        <span className="font-normal">
                          {detail.manufacturerName}
                        </span>
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        Quantity:{" "}
                        <span className="font-normal">{detail.quantity}</span>
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        Price:{" "}
                        <span className="font-normal">
                          {detail.productPrice}
                        </span>
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        Order Status:{" "}
                        <span className="font-normal">
                          {detail.orderItemStatus}
                        </span>
                      </p>

                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleLocalAction(
                              order.orderID,
                              detail.orderDetailID,
                              true,
                            )
                          }
                          disabled={
                            orderDetailsStates[detail.orderDetailID].approved ||
                            orderDetailsStates[detail.orderDetailID].rejected
                          }
                          className={`px-4 py-2 ${
                            orderDetailsStates[detail.orderDetailID].approved
                              ? "bg-gray-300"
                              : "bg-green-500"
                          } rounded text-white`}
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleLocalAction(
                              order.orderID,
                              detail.orderDetailID,
                              false,
                            )
                          }
                          disabled={
                            orderDetailsStates[detail.orderDetailID].approved ||
                            orderDetailsStates[detail.orderDetailID].rejected
                          }
                          className={`px-4 py-2 ${
                            orderDetailsStates[detail.orderDetailID].rejected
                              ? "bg-gray-300"
                              : "bg-red-500"
                          } rounded text-white`}
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
