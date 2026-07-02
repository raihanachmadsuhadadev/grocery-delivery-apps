import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url, token, onUnauthorized }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        onUnauthorized();
        return;
      }
      toast.error(error.response?.data?.message || "Error fetching orders");
      console.error(error);
    }
  };

  const statusHandler = async (event,orderId) => {
   try {
    const response = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    },{
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.data.success) {
      await fetchAllOrders();
    }
   } catch (error) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      onUnauthorized();
      return;
    }
    toast.error(error.response?.data?.message || "Error updating status");
   }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className='orders add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index)=>(
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item,index)=>{
                  if (index===order.items.length-1 ) {
                    return item.name + " x " +item.quantity
                  }
                  else{
                    return item.name + " x " +item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">{order.address.firstName+" "+order.address.lastName}</p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+", "+order.address.state+", "+order.address.country+", "+order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
