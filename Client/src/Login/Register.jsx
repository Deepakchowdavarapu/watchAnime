import React, { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const Data = localStorage.getItem("authToken");
    // console.log(`Data:`,Data)
    if (Data) {
      navigate("/");
    }
  }, []);

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        console.log(`credentials empty error`);
        return;
      }

      const response = await axios.post(
        "https://watchanime-z8oa.onrender.com/register",
        { name, email, password }
      );
      // console.log(`userData: `,response.data.userData)
      localStorage.setItem("authToken", response.data.userData);
      navigate("/");
    } catch (err) {
      // console.log(`catch block error`,err)
    }

    // .then(response => {
    //     console.log(response)
    //     // localStorage.setItem('authToken', response.data.token);
    //     // navigate('/');
    // })
    // .catch(err => {
    //     console.error('Error occurred', err);
    //     alert('Something went wrong please try again')
    // });
  };

  return (
    <div className="login">
      <div className="register-container container" id="/register">
        <h1>
          Register to <span className="span-watch">watch</span>
          <span className="span-anime">anime</span>
        </h1>
        <div className="form">
          <div className="name">
            <p>Name</p>
            <input
              type="text"
              value={name}
              size={30}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <div className="email">
            <p>Email</p>
            <input
              type="text"
              value={email}
              size={30}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div className="password">
            <p>Password</p>
            <input
              type="password"
              value={password}
              size={30}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div className="login-button" onClick={handleRegister}>
            Register
          </div>
        </div>
        <h3>
          Already have an account? <Link to="/login">Login</Link>
        </h3>
        {/* <Link to='/login'>Login</Link> */}
      </div>
    </div>
  );
}
