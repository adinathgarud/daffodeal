import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {
        navItems && navItems.map((i, index) => (
          <div className="flex px-6 ">
            <Link to={i.url}
              className={`${active === index + 1
                ? "text-[#ffeeee] after:w-full after:left-0"
                : "text-black 800px:text-[#fff] after:w-0 after:right-0"} 
  pb-[30px] 800px:pb-0 font-[500] cursor-pointer relative transition-all duration-3000 
  after:content-[''] after:absolute after:bottom-0 after:h-[2px] after:bg-[#ffeeee] after:transition-all after:duration-3000`}

            >
              {i.title}
            </Link>
          </div>
        ))
      }
    </div>
  )
}

export default Navbar