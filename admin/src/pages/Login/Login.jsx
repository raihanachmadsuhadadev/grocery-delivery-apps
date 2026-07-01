import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const Login = ({ url, onLogin }) => {
  const navigate = useNavigate();
  const [data,setData] = useState({
    email:"",
    password:""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data)=>({...data,[name]:value}));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const payload = {
      email: data.email.trim(),
      password: data.password
    };

    try {
      const response = await axios.post(`${url}/api/admin/login`, payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.data.success) {
        onLogin(response.data.token);
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
        return;
      }

      if (error.request) {
        toast.error(`Cannot reach backend at ${url}`);
        return;
      }

      toast.error(error.message || "Login failed");
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={onSubmitHandler}>
        <img src={assets.logo} alt="" />
        <h2>Admin Login</h2>
        <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email" required />
        <input name="password" value={data.password} onChange={onChangeHandler} type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;
