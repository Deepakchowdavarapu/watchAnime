import "./Profile.css";
import Nav from "./../NavBar/Nav";
import MiniNav from "./../NavBar/MiniNav";
import useFetchUserData from "../../Hooks/useFetchUserData";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { fetchTokenData, userData } = useFetchUserData();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken')
      if(!token){
            navigate('/')
        }

    fetchTokenData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div id="/profile" className="profile">
      <Nav />
      <div className="profile-content">
        <h1>profile</h1>
        <br />
        <div className="namep">
          <h3>name:</h3>{" "}
          {userData && userData.email ? <p>{userData.name}</p> : <p>name</p>}
        </div>
        <br />
        <div className="namep">
          <h3>email:</h3>
          {userData && userData.email ? <p>{userData.email}</p> : <p>email</p>}
        </div>
        <br />
        <div className="namep">
          <h3>password:</h3>{" "}
          {userData && userData.password ? (
            <p>{showPassword ? userData.password : "••••••••"}</p>
          ) : (
            <p>password</p>
          )}
          <div onClick={togglePasswordVisibility}>
            {showPassword ? (
              <i className="fa-solid fa-eye"></i>
            ) : (
              <i className="fa-solid fa-eye-slash"></i>
            )}
          </div>
        </div>
      </div>

      <div className="logout">
        <h2 onClick={handleLogout}>Logout</h2>
      </div>

      <MiniNav />
    </div>
  );
};

export default Profile;
