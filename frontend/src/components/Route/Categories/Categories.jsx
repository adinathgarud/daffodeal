import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";
import "../../../styles/style.css"
import { FaChevronDown } from "react-icons/fa"; // Importing an arrow icon

const Categories = () => {
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const handleMouseEnter = (category) => {
    setHoveredCategory(category);
  };

  const handleMouseLeave = () => {
    setHoveredCategory(null);
  };

  const handleSubmit = (category) => {
    navigate(`/products?category=${category.title}`);
  };

  return (
    <div className={`${styles} bg-white p-3 rounded-lg`} id="categories">
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6">
        {categoriesData &&
          categoriesData.map((category) => (
            <div
              className="relative w-full h-auto flex flex-col items-center cursor-pointer overflow-hidden group"
              key={category.id}
              onMouseEnter={() => handleMouseEnter(category)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleSubmit(category)}
            >
              <img
                src={category.image_Url}
                className="w-[50px] object-cover mb-1"
                alt={category.title}
              />
              <h5 className="text-[16px] leading-[1.9] flex items-center">
                {category.title}
                <FaChevronDown
                  className={`ml-1 text-gray-500 transition-transform duration-300 ${
                    hoveredCategory === category ? "rotate-180" : ""
                  }`}
                />
              </h5>

              {/* Subcategories Menu */}
              {hoveredCategory === category && (
                <div className="relative left-0 z-50 mt-2 w-full bg-gray-100 rounded-md shadow-md p-1 transition-opacity duration-300">
                  {category.subcategories && category.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="bg-white p-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering the parent click
                        navigate(`/products?subcategory=${sub.title}`);
                      }}
                    >
                      <h5 className="text-[16px] leading-[1.9] flex items-center">{sub.title}</h5>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Categories;