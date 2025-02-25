import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import ProductCard from "../ProductCard/ProductCard";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.products);
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a,b) => b.sold_out - a.sold_out); 
    const firstFive = sortedData && sortedData.slice(0, 20);
    setData(firstFive);
  }, [allProducts]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one product at a time
    slidesToScroll: 1,
  };
  

  return (
    <div>
      <div className={`${styles.section}`}>
        {/* <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div> */}
        <div className="grid grid-cols-3 gap-[5px] md:grid-cols-3 md:gap-[8px] lg:grid-cols-4 lg:gap-[10px] xl:grid-cols-5 xl:gap-[12px] mb-12 border-0">
           {
            data && data.length !== 0 &&(
              <>
               {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
              </>
            )
           }
        </div>
      </div>
    </div>
  );
};

export default BestDeals;




