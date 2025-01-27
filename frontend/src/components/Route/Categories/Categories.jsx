import React from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();
  return (
    <>
      

      <div
        className={`${styles} bg-white p-3 rounded-lg`}
        id="categories"
      >
        <div className="grid grid-cols-4 gap-[0px] md:grid-cols-4 md:gap-[0px] lg:grid-cols-12 lg:gap-[0px] xl:grid-cols-12 xl:gap-[0px]">
          {categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (i) => {
                navigate(`/products?category=${i.title}`);
              };
              return (
                <div
                  className=" w-full h-[auto] self-center category-flex items-center cursor-pointer overflow-hidden"
                  key={i.id}
                  onClick={() => handleSubmit(i)}
                >
                  <img
                    src={i.image_Url}
                    className="w-[30px] object-cover"
                    alt=""
                  />
                  <h5 className={`text-[12px] leading-[1.9]`}>{i.title}</h5>
                  
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Categories;
