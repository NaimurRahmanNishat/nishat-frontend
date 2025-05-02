import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { VscAccount } from "react-icons/vsc";
import { FaCartPlus } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import avatar from "../assets/avatar.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";
import CartModal from "@/pages/shop/CartModal";

const navItems = [
  {title: "Home", url: "/"},
  {title: "Shop", url: "/shop"},
  {title: "About", url: "/about"},
  {title: "Contact", url: "/contact"},
];

const userDropdownMenus = [
  {label: "Dashboard", path: "/dashboard"},
  {label: "Profile", path: "/dashboard/profile"},
  {label: "Payments", path: "/dashboard/payments"},
  {label: "Orders", path: "/dashboard/orders"},
];

const adminDropdownMenus = [
  {label: "Dashboard", path: "/dashboard/admin"},
  {label: "Manage-items", path: "/dashboard/manage-products"},
  {label: "All orders", path: "/dashboard/manage-orders"},
  {label: "Add Product", path: "/dashboard/add-product"},
];

const Navbar = () => {

  const products = useSelector((state)=> state.cart.products);
  // console.log(products);

  const [open, setOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // cart handle toggle
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  }
  const handleClick = () => {
    setOpen(!open);
  };

  const { user } = useSelector((state) => state.auth);
  // dropdown menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDropDownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  }

  // role based drop down show
  const dropdownMenus = user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      alert("Logout successful!");
      navigate("/");
    } catch (error) {
      console.log("Error logout user ", error);
    }
  };

  return (
    <header className="fixed w-full shadow-2xl h-20 z-50 bg-white">
      <div className="container mx-auto px-4 h-full flex items-center justify-between ">
        <Link to="/" onClick={() => setOpen(false)}>
          <img
            src={logo}
            alt="logo_image"
            className="w-[40px] h-[44px] cursor-pointer"
          />
        </Link>
        {/* desktop item */}
        <nav>
          <ul className="hidden md:flex gap-4">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-red-700 font-semibold"
              >
                <NavLink
                  to={item.url}
                  className={({ isActive }) => (isActive ? "text-red-600" : "")}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <button>
            <BiSearch size={28} className="cursor-pointer" />
          </button>
          <div className="relative">
            <FaCartPlus onClick={() => handleCartToggle()} size={28} className="cursor-pointer" />
            <span className="absolute -top-3 -right-2 bg-red-600 text-white w-5 h-5 rounded-full flex justify-center items-center">{products.length}</span>
          </div>
          <span>
            {user ? (
              <>
                <img
                  src={ user?.profileImage || avatar }
                  onClick={handleDropDownToggle}
                  alt="avatar"
                  className="w-[32px] h-[32px] rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute 2xl:right-auto right-1 mt-7 p-4 w-48 bg-white shadow-2xl rounded-md">
                    <ul>
                      {
                        dropdownMenus.map((item, index) => (
                          <li key={index} className="p-2 hover:bg-gray-300 cursor-pointer">
                            <Link to={item.path} onClick={() => setIsDropdownOpen(false)}>{item.label}</Link>
                          </li>
                        ))
                      }
                      <li className="p-2 hover:bg-gray-300 cursor-pointer font-bold text-blue-600">
                        <Link onClick={handleLogout}>Logout</Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <VscAccount size={28} className="cursor-pointer" />
              </Link>
            )}
          </span>
          {/* mobile navbar toggle button */}
          <div className="md:hidden">
            <button onClick={handleClick}>
              {open ? (
                <IoClose
                  size={35}
                  className="hover:text-pink-600 mt-2 cursor-pointer duration-300"
                />
              ) : (
                <IoMenu
                  size={35}
                  className="hover:text-pink-600 mt-2 cursor-pointer duration-300"
                />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* mobile navbar */}
      {open && (
        <nav className="md:hidden absolute top-20 h-screen left-0 w-full bg-slate-100 z-10">
          <div className="flex flex-col items-center gap-5 p-4 h-full">
            {navItems.map((item, index) => (
              <li
                onClick={() => setOpen(false)}
                key={index}
                className="text-lg font-semibold list-none hover:text-pink-600 transform translate-x-1 duration-300 relative group"
              >
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    isActive ? "text-pink-600" : ""
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </div>
        </nav>
      )}
      {/* cart modal open */}
      <div>
        {isCartOpen && <CartModal products={products} isOpen={isCartOpen} onClose={handleCartToggle}/>}
      </div>
    </header>
  );
};

export default Navbar;
