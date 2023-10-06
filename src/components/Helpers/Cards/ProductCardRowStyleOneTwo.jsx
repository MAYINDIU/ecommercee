import { Link } from "react-router-dom";
import Compair from "../icons/Compair";
import QuickViewIco from "../icons/QuickViewIco";
import ThinLove from "../icons/ThinLove";

export default function ProductCardRowStyleOneTwo({ className, datas }) {

  const single_data = [datas];
  return (
    <div
      data-aos="fade-left"
      className={`product-row-card-style-one-two w-full h-[250px] bg-white group relative overflow-hidden ${className || ""
        }`}
    >
      <div className="flex space-x-5 items-center w-full h-full p-[16px]">
        <Link to={'/single-product'} state={single_data}>
          <div className="w-1/3 h-full">
            <img
              src={`https://habib.munihaelectronics.com/public/${datas?.image_path}`}
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </Link>
        <div className="flex-1 flex flex-col justify-center h-full">
          <div>
            <a href="/single-product">
              <p className="title mb-2 sm:text-[20px] text-[15px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-blue-600">
                {datas.name}
              </p>
            </a>
            <p className="price flex space-x-2 items-center  mb-2.5">
              <span className="offer-price text-qred font-600 sm:text-[24px] text-base">
                €{datas.current_sale_price}
              </span>
              <span className="main-price text-qgray line-through font-600 sm:text-[18px] text-base">
                €{datas.current_sale_price}
              </span>
            </p>
            <button type="button" className="w-[116px] h-[40px]">
              <span className="yellow-btn rounded"> Add To Cart</span>
            </button>
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-[30px]  transition-all duration-300 ease-in-out">
        <Link to={'/single-product'} state={single_data}>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <QuickViewIco />
          </span>
        </Link>
        <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <ThinLove />
          </span>
        </a>
        <a href="#">
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <Compair />
          </span>
        </a>
      </div>
    </div>
  );
}
