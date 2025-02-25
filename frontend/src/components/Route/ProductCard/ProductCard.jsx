import React, { useState, useEffect } from "react";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { addTocart } from "../../../redux/actions/cart";
import { toast } from "react-toastify";

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
    <div className="w-full h-auto bg-white rounded-lg shadow-lg p-2 relative transition-transform transform hover:scale-105">
      <Link to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
        <img
          src={data.images && data.images[0]?.url}
          alt={data.name}
          className="aspect-square w-full rounded-sm bg-gray-200 object-cover transition-opacity duration-300 hover:opacity-75"
        />
      </Link>
      <Link to={`${isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`}`}>
        <h5 className="mt-2 text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] font-semibold text-gray-800">
          {data.name.length > 30 ? `${data.name.slice(0, 30)}...` : data.name}
        </h5>
        <div className="flex items-center justify-between mt-1">
          <div className="flex flex-col">
            <h5 className={`${styles.productDiscountPrice}`}>
              {data.originalPrice === 0 ? data.originalPrice : data.discountPrice} ₹
            </h5>
            {data.originalPrice && (
              <h6 className={`${styles.price} line-through text-gray-500`}>
                {data.originalPrice} ₹
              </h6>
            )}
          </div>
          <span className="text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] text-gray-600">{data.sold_out} sold</span>
        </div>
      </Link>

      <div className="absolute top-2 right-2 flex flex-col">
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer text-red-500"
            onClick={() => removeFromWishlistHandler(data)}
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer text-gray-600"
            onClick={() => addToWishlistHandler(data)}
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer text-gray-600 mt-2"
          onClick={() => setOpen(!open)}
          title="Quick view"
        />
      </div>

      <button
        className="w-full mt-4 px-4 py-2 text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] bg-blue-600 text-white rounded-lg transition duration-300 hover:bg-yellow-300 hover:text-black"
        onClick={() => addToCartHandler(data._id)}
        title="Add to cart"
      >
        Add to Cart
      </button>
      {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
    </div>
  );
};

export default ProductCard;