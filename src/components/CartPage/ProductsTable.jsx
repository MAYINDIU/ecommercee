import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import InputCom from "../Helpers/InputCom";

export default function ProductsTable({ className }) {
  const [cartList, setCartDetails] = useState([]);
  const [couponDetails, setCouponDetails] = useState({});

  const [newArray, setNewArray] = useState([]);

  const removeCoupon = (cId) => {
    const remaining = newArray.filter((c) => c.id !== cId);
    setNewArray(remaining);
  };

  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));

  //handle quantity and total
  const handleQuantityChange = (qty, index) => {
    const updatedData = [...cartList];
    updatedData[index].quantity = qty;
    updatedData[index].total = qty * updatedData[index].current_sale_price;
    setCartDetails(updatedData);
  };

  // ---------------Start Calculation Part--------------

  const subTotal = cartList?.reduce(
    (sum, cart) => sum + cart?.quantity * +cart?.current_sale_price,
    0
  );

  const findPercentageByfilter = newArray.filter(
    (p) => p?.type === "percentage"
  );
  const percentageTotal = findPercentageByfilter.reduce(
    (sum, p) => sum + +p?.value,
    0
  );

  const findFixedAmountByfilter = newArray.filter(
    (f) => f?.type === "fixed_amount"
  );
  const fixedAmountTotal = findFixedAmountByfilter.reduce(
    (sum, f) => sum + +f?.value,
    0
  );

  const grandTotal =
    subTotal - (fixedAmountTotal + (subTotal * percentageTotal) / 100);

  const percentage =
    couponDetails?.type === "percentage"
      ? (subTotal * +couponDetails?.value) / 100
      : couponDetails?.type === "fixed_amount"
        ? couponDetails?.value
        : 0;
  const diccountCouponAount =
    fixedAmountTotal + (subTotal * percentageTotal) / 100;

  // ------------------End Calculation Part ----------------------

  // for state

  const checkoutCoupon = {
    percentage,
    grandTotal,
    subTotal,
    couponDetails,
    diccountCouponAount,
  };

  //User IP
  useEffect(() => {
    fetch(
      `https://habib.munihaelectronics.com/public/api/show_cartlist/${customer_ip?.user_ip}`
    )
      .then((res) => res.json())
      .then((data) => setCartDetails(data));
  }, []);
  localStorage.setItem("checkout", JSON.stringify(cartList));

  // Delete single Cart List
  const handleDeleteCartList = (pId) => {
    const confirm = window.confirm("Are you want do delete?");
    if (confirm) {
      const url = ` https://habib.munihaelectronics.com/public/api/cartlist_delete/${pId}`;
      fetch(url, {
        method: "DELETE",
      }).then((res) => res.json());

      const remaining = cartList.filter((p) => p.id !== pId);
      setCartDetails(remaining);

      swal({
        title: "Successfully Deleted",
        text: "Success",
        icon: "success",
      });
    }
  };

  //Coupon Code
  const [ccode, setCouponCode] = useState("");

  const handleChange = (event) => {
    setCouponCode(event.target.value);
  };

  const duplicateCouponCode = newArray.some((d) => d?.code === ccode);

  const handleCouponDetails = (e) => {
    if (duplicateCouponCode) {
      toast("This coupon is already used");
    } else {
      fetch(
        `https://habib.munihaelectronics.com/public/api/couponCheck/${ccode}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCouponDetails(data);
          setNewArray([...newArray, data]);
        });

      if (couponDetails === "Invalid Coupon Code") {
        swal({
          title: "Invalid coupon code",
          text: "Warning",
          icon: "Warning",
        });
      }
    }
  };

  return (
    <div className={`w-full ${className || ""}`}>
      <div className="relative w-full overflow-x-auto border border-[#EDEDED]">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-[13px] font-medium text-black bg-[#F6F6F6] whitespace-nowrap px-2 border-b default-border-bottom uppercase">
              <td className="py-4 pl-10 block whitespace-nowrap min-w-[300px]">
                product
              </td>
              {/* <td className="py-4 whitespace-nowrap text-center">color</td>
              <td className="py-4 whitespace-nowrap text-center">size</td> */}
              <td className="py-4 whitespace-nowrap text-center">price</td>
              <td className="py-4 whitespace-nowrap  text-center">quantity</td>
              <td className="py-4 whitespace-nowrap  text-center">total</td>
              <td className="py-4 whitespace-nowrap text-center ">Action</td>
            </tr>
            {/* table heading end */}
            {cartList?.map((l, i) => (
              <tr key={i} className="bg-white border-b hover:bg-gray-50">
                <td className="pl-10  py-4  w-[380px]">
                  <div className="flex space-x-6 items-center">
                    <div className="w-[80px] h-[80px] overflow-hidden flex justify-center items-center border border-[#EDEDED]">
                      <img
                        src={`https://habib.munihaelectronics.com/public/${l?.image_path}`}
                        alt="product"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <p className="font-medium text-[15px]  text-qblack">
                        {l?.name}
                      </p>

                      <p className="flex">
                        <span className="text-[12px] font-normal">
                          {" "}
                          Size: {l?.size}{" "}
                        </span>
                        <span className="ml-2 text-[12px] font-normal">
                          {" "}
                          Color:
                        </span>
                        <span
                          style={{ background: l?.color }}
                          className="ml-1 text-[12px] mt-1 font-normal w-[15px] h-[15px]  block rounded-full border"
                        ></span>
                      </p>
                    </div>
                  </div>
                </td>
                {/* <td className="text-center py-4 px-2">
                  <div className=" flex justify-center items-center">
                    <span className="w-[20px] h-[20px] bg-[#E4BC87] block rounded-full"></span>
                  </div>
                </td> */}
                {/* <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">{l?.size}</span>
                  </div>
                </td> */}
                <td className="text-center py-4 px-2">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {l?.current_sale_price}
                    </span>
                  </div>
                </td>
                <td className=" py-4">
                  <div className="flex justify-center items-center">
                    <input
                      type="number"
                      className="border text-center w-16"
                      defaultValue={l?.quantity}
                      min={1}
                      onChange={(e) => handleQuantityChange(+e.target.value, i)}
                    />
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">
                      {+l?.current_sale_price * l?.quantity}
                    </span>
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span
                      onClick={() => handleDeleteCartList(l?.id)}
                      style={{ cursor: "pointer" }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.7 0.3C9.3 -0.1 8.7 -0.1 8.3 0.3L5 3.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L3.6 5L0.3 8.3C-0.1 8.7 -0.1 9.3 0.3 9.7C0.7 10.1 1.3 10.1 1.7 9.7L5 6.4L8.3 9.7C8.7 10.1 9.3 10.1 9.7 9.7C10.1 9.3 10.1 8.7 9.7 8.3L6.4 5L9.7 1.7C10.1 1.3 10.1 0.7 9.7 0.3Z"
                          fill="#AAAAAA"
                        />
                      </svg>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full sm:flex justify-between mt-4">
        <div className="discount-code sm:w-[270px] w-full mb-5 sm:mb-0 h-[50px] flex">
          <div className="flex-1 w-32  h-full">
            <input
              onChange={handleChange}
              type="text"
              className="bg-white p-3 rounded border hover:only:"
              placeholder="Write Coupon Code"
            />
          </div>

          <button
            onClick={handleCouponDetails}
            className={` w-[90px] h-full text-sm font-600 bg-qh2-green text-white  'search-btn'}`}
            type="button"
          >
            Apply
          </button>
        </div>
        <div className="flex space-x-2.5 items-center">
          <a href="#">
            <div className="w-[220px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
              <span className="text-sm font-semibold">Continue Shopping</span>
            </div>
          </a>
          <a href="#">
            <div className="w-[140px] h-[50px] bg-[#F6F6F6] flex justify-center items-center">
              <span className="text-sm font-semibold">Update Cart</span>
            </div>
          </a>
        </div>
      </div>
      <div className="w-full mt-[30px] flex sm:justify-end">
        <div className="sm:w-[370px] w-full border border-[#EDEDED] px-[30px] py-[26px]">
          <div className="sub-total mb-6">
            <div className=" flex justify-between mb-6">
              <p className="text-[15px] font-medium text-qblack">Subtotal</p>
              <p className="text-[15px] font-medium text-qred">€{subTotal}</p>
            </div>

            {newArray.map((c) => {
              return (
                <div className=" flex justify-between mb-6">
                  <p className="text-[15px] font-medium text-qblack">
                    Coupon Code: <span className="font-bold">{c?.code}</span>{" "}
                    <small className="uppercase">{`(${c?.type}) `}</small>{" "}
                    <button
                      onClick={() => removeCoupon(c?.id)}
                      className="text-qred font-xs text-[12px]"
                    >
                      remove
                    </button>
                  </p>
                  <p className="text-[15px] font-medium text-qred">
                    €{c?.type === "percentage" ? percentage : c?.value}
                  </p>
                </div>
              );
            })}

            <div className="w-full h-[1px] bg-[#EDEDED]"></div>
          </div>
          <div className="shipping mb-6">
            <span className="text-[15px] font-medium text-qblack mb-[18px] block">
              Shipping
            </span>
            <ul className="flex flex-col space-y-1">
              <li>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2.5 items-center">
                    <div className="input-radio">
                      <input
                        type="radio"
                        name="price"
                        className="accent-pink-500"
                      />
                    </div>
                    <span className="text-[13px] text-normal text-qgraytwo">
                      Free Shipping
                    </span>
                  </div>
                  <span className="text-[13px] text-normal text-qgraytwo">
                    +€00.00
                  </span>
                </div>
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2.5 items-center">
                    <div className="input-radio">
                      <input
                        type="radio"
                        name="price"
                        className="accent-pink-500"
                      />
                    </div>
                    <span className="text-[13px] text-normal text-qgraytwo">
                      Flat Rate
                    </span>
                  </div>
                  <span className="text-[13px] text-normal text-qgraytwo">
                    +€00.00
                  </span>
                </div>
              </li>
              <li>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2.5 items-center">
                    <div className="input-radio">
                      <input
                        type="radio"
                        name="price"
                        className="accent-pink-500"
                      />
                    </div>
                    <span className="text-[13px] text-normal text-qgraytwo">
                      Local Delivery
                    </span>
                  </div>
                  <span className="text-[13px] text-normal text-qgraytwo">
                    +€00.00
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="shipping-calculation w-full mb-3">
            <div className="title mb-[17px]">
              <h1 className="text-[15px] font-medium">Calculate Shipping</h1>
            </div>
            <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
              <span className="text-[13px] text-qgraytwo">Select Country</span>
              <span>
                <svg
                  width="11"
                  height="7"
                  viewBox="0 0 11 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.4 6.8L0 1.4L1.4 0L5.4 4L9.4 0L10.8 1.4L5.4 6.8Z"
                    fill="#222222"
                  />
                </svg>
              </span>
            </div>
            <div className="w-full h-[50px]">
              <InputCom
                inputClasses="w-full h-full"
                type="text"
                placeholder="Postcode / ZIP"
              />
            </div>
          </div>
          <button type="button" className="w-full mb-10">
            <div className="w-full h-[50px] bg-[#F6F6F6] flex justify-center items-center">
              <span className="text-sm font-semibold">Update Cart</span>
            </div>
          </button>
          <div className="total mb-6">
            <div className=" flex justify-between">
              <p className="text-[18px] font-medium text-qblack">Total</p>
              <p className="text-[18px] font-medium text-qred">
                €{grandTotal ? grandTotal : subTotal}
              </p>
            </div>
          </div>
          <Link to="/checkout" state={checkoutCoupon}>
            <div className="w-full h-[50px] bg-qh2-green flex justify-center items-center">
              <span className="text-sm font-semibold text-white">
                Proceed to Checkout
              </span>
            </div>
          </Link>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        type="warning"
      />
    </div>
  );
}