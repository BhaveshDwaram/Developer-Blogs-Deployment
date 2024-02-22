import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import navlogo from "../../Assets/navlogo.png"
import "./topbar.css";
import {url} from "../../url" ;

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  // const PF = "http://localhost:5000/images/"
  const PF =url+"/images/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="top">
      <div className="topLeft">
        <img src={navlogo} alt="" className="logo-img" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          
          <li className="topListItem">
            <Link className="link" to="/about us">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/read">
              READ
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF+user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link button" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link button" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
