import { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url, token, onUnauthorized }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "Fruits",
    subcategory: "Import",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand",data.brand);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("subcategory",data.subcategory)
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setData({
          name: "",
          brand:"",
          description: "",
          price: "",
          category: "Fruits",
          subcategory:"Import"
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        onUnauthorized();
        return;
      }
      toast.error("Error adding item");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
          />
        </div>
        <div className="add-brand flex-col">
          <p>Add Brand</p>
          <input
            onChange={onChangeHandler}
            value={data.brand}
            type="text"
            name="brand"
            placeholder="Type Here"
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Fruits">Fruits</option>
              <option value="Vegetable">Vegetable </option>
              <option value="Dairy and Milk">Dairy and Milk</option>
              <option value="Grains">Grains</option>
              <option value="Seafood">Seafood</option>
              <option value="Meat">Meat</option>
            </select>
          </div>
          <div className="sub-category flex-col">
            <p>Sub Category</p>
            <select onChange={onChangeHandler} name="subcategory" value={data.subcategory}>
              <option value="Import">Import</option>
              <option value="Local">Local</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
