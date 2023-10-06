import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Compair from "../icons/Compair";
import QuickViewIco from "../icons/QuickViewIco";
import ThinLove from "../icons/ThinLove";

export default function ProductCardStyleOneTwo({ datas }) {
  const single_data = [datas];
  const [selected, setSelected] = useState(false);
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;
  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));


  const productDetailsByFind = single_data.find((d) => d?.id !== customer_ip);
  // console.log(productDetailsByFind);

  // Add To Cart
  const handleAddToCart = async () => {
    const data = {
      customer_ip: customer_ip?.user_ip,
      product_id: datas?.id,
      quantity: 1,
    };
    console.log(data);
    try {
      const response = await axios.post(
        `https://habib.munihaelectronics.com/public/api/addToCartProduct`,
        data
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };


  // Add Wish List

  const handleWishList = async (product_id) => {
    const data = {
      product_id,
      user_id: userdata?.id,
    };
    console.log(data);
    try {
      const response = await axios.post(
        `https://habib.munihaelectronics.com/public/api/addWishList`,
        data
      );
      setSelected(!selected);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="product-card-style-one-two w-full h-full bg-white relative group overflow-hidden"
      style={{ boxShadow: "0px 15px 64px 0px rgba(0, 0, 0, 0.05)" }}
    >
      <Link to={"/single-product"} state={single_data}>
        <div
          className="product-card-img w-full h-[322px] mt-4"
          style={{
            background: `url(https://habib.munihaelectronics.com/public/${datas.image_path}) no-repeat center`,
          }}
        ></div>
      </Link>

      <div className="product-card-details flex justify-center h-[102px] items-center  relative">
        {/* add to card button */}
        <div className="absolute  w-[204px] h-[54px] left-[80px] -bottom-20 group-hover:bottom-[65px] transition-all duration-300 ease-in-out">
          <button onClick={handleAddToCart} type="button" className="yellow-btn rounded">
            <div>
              <span>Add To Cart </span>
            </div>
          </button>
        </div>
        <div>
          <Link to={"/single-product"} state={single_data}>
            <p className="title mb-2.5 text-[20px] font-600 text-center text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
              {datas.name}
            </p>
          </Link>
          <div className="flex justify-center ">
            <div className="price">
              <span className="offer-price text-center text-qred font-600 text-[18px] mr-1 inline-block">
                €{datas.current_sale_price}
              </span>
              <span className="main-price text-qgray line-through font-600 text-center text-[18px]">
                {datas.price}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-[50px] -right-[50px] top-20  transition-all duration-300 ease-in-out">
        <Link to={"/single-product"} state={single_data}>
          <span className="w-10 h-10 flex justify-center items-center bg-[#CCECEB] rounded">
            <QuickViewIco />
          </span>
        </Link>
        <Link to="" onClick={() => handleWishList(datas?.id)}>
          <span
            className={
              selected
                ? "w-10 h-10 flex justify-center items-center bg-[#fc3e3e] rounded"
                : "w-10 h-10 flex justify-center items-center bg-[#CCECEB] rounded"
            }
          >
            <ThinLove />
          </span>
        </Link>
        <a href="">
          <span className="w-10 h-10 flex justify-center items-center bg-[#CCECEB] rounded">
            <Compair />
          </span>
        </a>
      </div>
    </div>
  );
}