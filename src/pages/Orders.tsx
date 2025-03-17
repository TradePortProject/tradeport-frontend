import React, { useEffect, useState } from 'react';
import OrderGrid from '../components/OrderGrid';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

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
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:3017/api/OrderManagement/GetOrdersAndOrderDetails?page=${pageNumber}&search=${searchText}`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      setData(result.orders);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Failed to fetch orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (orderID: string, orderDetailID: string, action: boolean) => {
    try {
      const response = await fetch(`http://localhost:3017/api/OrderManagement/AcceptRejectOrder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderID: orderID,
          orderItems: [{ orderDetailID: orderDetailID, isAccepted: action }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      //alert(`Order detail ${action ? 'approved' : 'rejected'} successfully!`);

      // Optionally, refresh orders after action
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order. Please try again.');
    }
  };

  useEffect(() => {
    setLoading(true); // Reset loading whenever a fetch is triggered
    if (searchText.length >= 3 || searchText.length === 0) {
      fetchOrders();
    }
  }, [searchText, pageNumber]);

  return (
    <div className="mx-auto max-w-7xl px-1 py-1">
      <div className="mx-auto mt-1 flex justify-center">
        <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
      </div>
      {loading ? (
        <div>Loading orders...</div>
      ) : data.length > 0 ? (
        <div className="mt-1 flex justify-center">
          <OrderGrid orders={data} handleAction={handleAction} />
        </div>
      ) : (
        <div>No Orders found. Adjust your filters.</div>
      )}
      <div className="mt-1 flex justify-center">
        <Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default Orders;
