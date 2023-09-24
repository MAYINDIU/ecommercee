import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../../../Cart";
import SearchBox from "../../../Helpers/SearchBox";
import ThinBag from "../../../Helpers/icons/ThinBag";
import ThinLove from "../../../Helpers/icons/ThinLove";
import ThinPeople from "../../../Helpers/icons/ThinPeople";

export default function Middlebar({ className }) {
  // const [toggleCart, setToggle] = useState(false);
  // const cartHandler = () => {
  //   setToggle(!toggleCart);
  // };

  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userdata = userProfile?.user;

  // Count For WishList
  const [wishListCount, setWishListCount] = useState(null);
  useEffect(() => {
    fetch(
      `https://habib.munihaelectronics.com/public/api/wishlist_count/${userdata?.id}`
    )
      .then((res) => res.json())
      .then((data) => setWishListCount(data));
  }, []);


  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div>
              <a href="/">
                <img
                  width="152"
                  height="36"
                  src={`${process.env.PUBLIC_URL}/assets/images/logo-2.svg`}
                  alt="logo"
                />
              </a>
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              {/* <div className="compaire relative">
                <a href="/products-compaire">
                  <span>
                    <Compair />
                  </span>
                </a>
                <span className="w-[18px] h-[18px] rounded-full bg-qh2-green absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                  2
                </span>
              </div> */}
              <div className="favorite relative">
                <a href="/wishlist">
                  <span>
                    <ThinLove />
                  </span>
                </a>
                <span className="w-[18px] h-[18px] rounded-full bg-qh2-green absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                  {wishListCount?.total}
                </span>
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <a href="/cart">
                    <span>
                      <ThinBag />
                    </span>
                  </a>
                  <span className="w-[18px] h-[18px] rounded-full bg-qh2-green absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] text-white">
                    16
                  </span>
                </div>
                {/* <div className="fixed left-0 top-0 w-full h-full z-40"></div> */}
                {/* hidden group-hover:block" */}
                <Cart className="absolute -right-[45px] top-11 z-50 hidden group-hover:block" />

              </div>

              <div>
                <Link to="/profile">
                  <span>
                    <ThinPeople />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
