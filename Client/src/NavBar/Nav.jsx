import "./Nav.css";
import useFetchUserData from "../../Hooks/useFetchUserData";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const { fetchTokenData, userData } = useFetchUserData();

  useEffect(() => {
    fetchTokenData();
  }, []);

  return (
    <div className="nav">
      <div className="title">
        <span className="span-watch">watch</span>
        <span className="span-anime">anime</span>
      </div>
      <div className="profile-btn">
        <div className="bot-lodhi">
          {userData.name ? (
            <div className="name-email">
              <p>{userData.name}</p>
              <p className="email">{userData.email}</p>
            </div>
          ) : (
            <p>loading</p>
          )}
        </div>
        <Link to={"/profile"}>
          {" "}
          <span
            className="material-symbols-outlined"
            style={{ color: "black" }}
          >
            settings
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
