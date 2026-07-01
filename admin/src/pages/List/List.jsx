import { useEffect, useState } from 'react';
import "./List.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({ url, token, onUnauthorized }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching data");
      }
    } catch (error) {
      toast.error("Error fetching data");
    }
  };

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error("Error removing item");
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        onUnauthorized();
        return;
      }
      toast.error("Error removing item");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list-container'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-header">
          <b>Image</b>
          <b>Name</b>
          <b>Brand</b>
          <b>Category</b>
          <b>Sub Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-row'>
            <img src={`${url}/images/${item.image}`} alt={item.name} className="food-image" />
            <p>{item.name}</p> 
            <p>{item.brand}</p> 
            <p>{item.category}</p>
            <p>{item.subcategory}</p>
            <p>{item.price}</p>
            <p onClick={() => removeFood(item._id)} className='cursor remove-action'>X</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
