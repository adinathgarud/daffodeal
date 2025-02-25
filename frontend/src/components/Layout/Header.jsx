import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import { categoriesData, productData } from "../../static/data";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { BiStoreAlt } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import DropDown from "./DropDown";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";
//import logo from "../../Assests/images/Deffodeal.png"

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchRef = useRef(null);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);
    setShowSearchResults(term.length > 0);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      performSearch(searchTerm);
    }
  };


  const performSearch = (query) => {
    console.log("Searching for:", query);
    const filteredProducts =
      allProducts &&
      allProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    setSearchData(filteredProducts);
    setShowSearchResults(filteredProducts.length > 0);
  };


  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setShowSearchResults(false); // Hide search results when clicking outside
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <>
      
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-50 " : null
        } transition-shadow duration-300 hidden 800px:flex items-center justify-evenly w-full bg-[#ececec] h-[60px]`}
      >
        <div
          className="flex items-center justify-between w-full max-w-6xl mx-auto px-4"
        >
          

          <div >
            <Link to="/">
              {/* <img
                src={logo}
                alt=""
                className="mt-2 cursor-pointer w- h-[70px]"
              /> */}
              <h1 className="text-2xl font-bold text-gray-800">Daffodeal</h1>
            </Link>
          </div>


          {/* navitems */}
          {/* <div className={`${styles.noramlFlex}`}>
            <Navbar active={activeHeading} />
          </div> */}

          <div className="relative w-1/3" ref={searchRef}>
            <input
              type="text"
              placeholder="Search For Products, Brands and More"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="h-10 w-full px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
              onFocus={() => setShowSearchResults(searchTerm.length > 0)}
            />
            <AiOutlineSearch
              size={25}
              className="absolute right-2 top-2 cursor-pointer text-gray-600"
            />
            {showSearchResults && searchData.length > 0 && (
              <div className="absolute left-0 right-0 bg-white shadow-lg z-10 mt-1 rounded-md">
                {searchData.map((item) => (
                  <Link to={`/product/${item._id}`} key={item._id}>
                    <div className="flex items-center p-2 hover:bg-gray-100 transition duration-200">
                      <img src={item.images[0]?.url} alt={item.name} className="w-10 h-10 mr-2" />
                      <span className="text-gray-800">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative mx-4 cursor-pointer"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={35} className="text-gray-600 hover:text-black transition duration-200" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">{wishlist.length}</span>
              )}
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
            <div className="relative mx-4 cursor-pointer" onClick={() => setOpenCart(true)}>
              <AiOutlineShoppingCart size={35} className="text-gray-600 hover:text-black transition duration-200" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">{cart.length}</span>
              )}
            </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mx-[15px]">
                {isAuthenticated ? (
                  <Link to="/profile">
                    {/* <img
                      src={`${user?.avatar?.url}`}
                      className="w-[40px] h-[40px] rounded-full "
                      alt=""
                    /> */}
                    <CgProfile size={35} className="text-gray-600 hover:text-black transition duration-200" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={35} className="text-gray-600 hover:text-black transition duration-200" />
                  </Link>
                )}
              </div>
            </div>
            <div className=' my-2 mx-3 flex items-center justify-center rounded-xl cursor-pointer'>
            <Link to={`${isSeller ? "/dashboard" : "/shop-create"}`}>
              
              <h1 className="text-[#000] text-xl flex items-center">
              <BiStoreAlt size={35} color="black" className="mr-2 "/>
                {isSeller ? "Go Dashboard " : "Become Seller"}{" "}
                
              </h1>
            </Link>
          </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>

      {/* mobile header */}
      <div
        className={` flex items-center ${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        }
      w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
      >
        <div className="w-full flex top-2 items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          <div >
            <Link to="/">
              {/* <img
                src={logo}
                alt=""
                className="mt-2 cursor-pointer h-[50px]"
              /> */}
              <h1 className="text-2xl font-bold text-gray-800">Daffodeal</h1>
            </Link>
          </div>
          

              <div className="w-[40%]">
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
              className="h-[40px] w-full px-1 border-[#3957db] border-[1px] rounded-md"
            />
            {/* <AiOutlineSearch
              size={25}
              className="absolute right-0 top-1 cursor-pointer"
            /> */}
            {searchData && searchData.length !== 0 ? (
              <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`}>
                        <div className="w-full flex items-start-py-3">
                          <img
                            src={`${i.images[0]?.url}`}
                            alt=""
                            className="w-[40px] h-[40px] mr-[10px]"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>
          <div>
            <div
              className="relative mr-[20px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} />
              <span className="absolute right-0 top-0 rounded-full bg-[#143d59] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                {cart && cart.length}
              </span>
            </div>
          </div>
          {/* cart popup */}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

          {/* wishlist popup */}
          {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
        </div>

        {/* header sidebar */}
        {open && (
          <div
            className={`fixed w-full bg-[#143d59] z-20 h-full top-0 left-0`}
          >
            <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
              <div className="w-full justify-between flex pr-3">
                
                <div className="flex w-full justify-start relative my-[15px] mx-5">
                {isAuthenticated ? (
                  <div>
                    <Link to="/profile">
                      {/* <img
                        src={``}
                        alt=""
                        className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
                      /> */}
                      <CgProfile size={35} className="text-gray-600 hover:text-black transition duration-200" />
                    </Link>
                  </div>
                ) : (
                  <>
                  <div className={`${styles.button1}  !rounded-[4px]`}>
                <Link to="/login">
                  <h1 className="text-[#fff] text-xs flex items-center">
                    Login
                  </h1>
                </Link>
              </div>
              <div className="mx-2 text-2xl text-[#000] flex items-center">
                <h1>/</h1>
              </div>
                    <div className={`${styles.button1}  !rounded-[4px]`}>
                <Link to="/sign-up">
                  <h1 className="text-[#fff] text-xs flex items-center">
                    Sign Up 
                  </h1>
                </Link>
              </div>
                  </>
                )}
              </div>
                <RxCross1
                  size={30}
                  className="ml-4 mt-5"
                  onClick={() => setOpen(false)}
                />
              </div>

              

              <Navbar active={activeHeading} />
              <div className={`${styles.button} ml-4 !rounded-[4px]`}>
                <Link to="/shop-create">
                  <h1 className="text-[#fff] flex items-center">
                    Become Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              
              <div>
                  <div
                    className="relative mr-[15px]"
                    onClick={() => setOpenWishlist(true) || setOpen(false)}
                  >
                    <AiOutlineHeart size={30} className="mt-5 ml-3" />
                    <span className="absolute right-0 top-0 rounded-full bg-[#143d59] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
                      {wishlist && wishlist.length}
                    </span>
                  </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
