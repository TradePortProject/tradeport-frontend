import React, { useEffect, useState } from 'react';
import OrderGrid from '../components/OrderGrid';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import ENDPOINTS from '../config/apiConfig';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const Orders: React.FC = () => {
  const [data, setData] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [searchText, setSearchText] = useState<string>("");
  const token = useSelector((state: RootState) => state.auth.token);

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const handleSearchChange = (newSearchText: string) => {
    setSearchText(newSearchText);
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        ENDPOINTS.ORDER.ORDERS.GET(`?page=${pageNumber}&productName=${searchText}`),
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Pass token as AuthBearer
          },
        }
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
      const response = await fetch(ENDPOINTS.ORDER.ORDERS.ACCEPT_REJECT, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Pass token as AuthBearer
        },
        body: JSON.stringify({
          orderID: orderID,
          orderItems: [{ orderDetailID: orderDetailID, isAccepted: action }],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order status');
      }

      // Optionally, refresh orders after action
      fetchOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order. Please try again.');
    }
  };

	useEffect(() => {
		if (searchText.length >= 3 || searchText.length === 0) {
			fetchOrders(); // Call API only if the searchText condition is satisfied
		}
	}, [searchText]);
	
  useEffect(() => {
      fetchOrders();
  }, [ pageNumber]);

  return (
  
        <div className="mx-auto max-w-7xl px-1 py-12">
            <div className="mb-4 flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0 md:space-x-1">
                <SearchBar searchText={searchText} onSearchChange={handleSearchChange} />
            </div>
            {data.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
                  
                         <OrderGrid orders={data} handleAction={handleAction} />
                  
                </div>
				
            ) : (
                <div>No products found. Adjust your filters.</div>
            )}
			<div className="mt-4 flex justify-center">
				<Pagination pageNumber={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
			</div>	
        </div>
			


  );
};

export default Orders;