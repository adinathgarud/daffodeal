import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "../../Products/Ratings";

const ProductCard = ({ data, isEvent }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: 1 };
        dispatch(addTocart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };

  return (
    <>
      <div className="w-full h-auto bg-white rounded-lg shadow-sm p-3 relative cursor-pointer ">
        <div className="flex justify-end"></div>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <img
            src={`${data.images && data.images[0]?.url}`}
            alt=""
            className="w-full h-[150px] object-contain hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <Link to={`/shop/preview/${data?.shop._id}`}>
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`${isEvent === true ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
          <h5 className="pb-3 mt-1 h-[50px] font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h5>

          {/* <div className="flex">
          <Ratings rating={data?.ratings} />
          </div> */}

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.originalPrice === 0
                  ? data.originalPrice
                  : data.discountPrice}
                ₹
              </h5>
              <h6 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " ₹" : null}
              </h6>
            </div>
            <span className="font-[400] text-[14px] text-[#000000]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div className="flex justify-around">
          <button
            className={`px-2 py-2 rounded text-[13px] bg-[#143d59] text-white ${click ? "bg-yellow-600 text-black" : "bg-[#143d59] text-white"
              } cursor-pointer transition duration-300 ease-in-out hover:bg-yellow-300 hover:text-black`}
            onClick={() =>
              click ? removeFromWishlistHandler(data) : addToWishlistHandler(data)
            }
            title={click ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {click ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>
          {/* <AiOutlineEye
            size={22}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          /> */}
          <button
            className="px-2 py-1 text-[13px] bg-[#143d59] text-white rounded cursor-pointer transition duration-300 ease-in-out hover:bg-yellow-300 hover:text-black"
            onClick={() => addToCartHandler(data._id)}
            title="Add to cart"
          >
            Add to Cart
          </button>
          {open ? <ProductDetailsCard setOpen={setOpen} data={data} /> : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
