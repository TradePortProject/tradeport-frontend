import React, { useEffect, useState } from "react";
import OrderGrid from "../components/OrderGrid";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

// Define the Order type
interface Order {
  orderID: string;
  // Add other order properties as needed
}

const Orders: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
    // Reset to first page when search changes
    setPageNumber(1);
  };

  const fetchOrders = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3017/api/OrderManagement/GetOrdersAndOrderDetails?page=${pageNumber}&productName=${searchText}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();

      setData(result.orders);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      console.error("Error fetching orders:", error);
      alert("Failed to fetch orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [pageNumber, searchText]);

  const handleAction = async (
    orderID: string,
    orderDetailID: string,
    action: boolean,
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3017/api/OrderManagement/AcceptRejectOrder`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderID: orderID,
            orderItems: [{ orderDetailID: orderDetailID, isAccepted: action }],
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Refresh orders after action
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order. Please try again.");
    }
  };

  useEffect(() => {
    if (searchText.length >= 3 || searchText.length === 0) {
      fetchOrders();
    }
  }, [fetchOrders, searchText.length]);

  return (
    <div className="mx-auto max-w-7xl px-1 py-12">
      <div className="mb-4 flex flex-col items-center justify-between space-y-1 md:flex-row md:space-x-1 md:space-y-0">
        <SearchBar
          searchText={searchText}
          onSearchChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div className="py-4 text-center">Loading orders...</div>
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
          <OrderGrid orders={data} handleAction={handleAction} />
        </div>
      ) : (
        <div>No products found. Adjust your filters.</div>
      )}

      <div className="mt-4 flex justify-center">
        <Pagination
          pageNumber={pageNumber}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Orders;
