import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/LayoutHomeTwo";

export default function CheakoutPage() {
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const cartDetailsFromAddtoCart = JSON.parse(localStorage.getItem("checkout"));
  console.log(cartDetailsFromAddtoCart)
  const userdata = userProfile?.user;
  const [checked, setChecked] = useState(false)
  const [checkedPaymentMethod, setCheckedPaymentMethod] = useState(false)
  const [shippingAddress, setShippingAddress] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [billingPostalCode, setBillingPostalCode] = useState('');
  const [shippingPostalCode, setShippingPostalCode] = useState('');

  const subTotal = cartDetailsFromAddtoCart?.reduce((sum, cart) => sum + cart?.quantity * +cart?.current_sale_price, 0)

  //Place Order
  const handlePlaceOrder = async () => {

    const data = {
      user_id: userdata?.id,
      total_amount: subTotal,
      billing_address: userdata?.address,
      shipping_address: shippingAddress ? shippingAddress : userdata?.address,
      billing_city: billingCity,
      shipping_city: shippingCity ? shippingCity : billingCity,
      billing_postal_code: billingPostalCode,
      shipping_postal_code: shippingPostalCode ? shippingPostalCode : billingPostalCode,
      coupon_discount: '3066',
      payment_method_id: '2',

    };
    console.log(data);
    try {
      const response = await axios.post(
        `https://habib.munihaelectronics.com/public/api/addOrder`,
        data
      );
      console.log(response);

      swal({
        title: "Successfully Orderd",
        text: "Success",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="checkout-page-wrapper w-full bg-white pb-[60px]">
        <div className="w-full mb-5">
          <PageTitle
            title="Checkout"
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "checkout", path: "/checkout" },
            ]}
          />
        </div>
        <div className="checkout-main-content w-full">
          <div className="container-x mx-auto">
            <div className="w-full sm:mb-10 mb-5">
              <div className="sm:flex sm:space-x-[18px] s">
                <div className="sm:w-1/2 w-full mb-5 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Log into your Account
                      </span>
                    </div>
                  </a>
                </div>
                <div className="flex-1 h-[70px]">
                  <a href="#">
                    <div className="w-full h-full bg-[#F6F6F6] text-qblack flex justify-center items-center">
                      <span className="text-[15px] font-medium">
                        Enter Coupon Code
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-1/2 w-full">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Billing Details
                </h1>
                <div className="form-area">
                  <form>
                    <div className="sm:flex sm:space-x-5 items-center mb-6">
                      <div className="sm:w-1/2  mb-5 sm:mb-0">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          label="First Name*"
                          placeholder="Demo Name"
                          inputClasses="w-full h-[50px]"
                          value={userdata?.name}

                        />
                      </div>
                      <div className="flex-1">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          label="Last Name*"
                          placeholder="Last Name"
                          inputClasses="w-full h-[50px]"
                        />
                      </div>
                    </div>
                    <div className="flex space-x-5 items-center mb-6">
                      <div className="w-1/2">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          label="Email Address*"
                          placeholder="demoemial@gmail.com"
                          inputClasses="w-full h-[50px]"
                          value={userdata?.email}
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          label="Phone Number*"
                          placeholder="012 3  ***"
                          inputClasses="w-full h-[50px]"
                          defaultValue={userdata?.phone}
                        />
                      </div>
                    </div>
                    {/* <div className="mb-6">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        Country*
                      </h1>
                      <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                        <span className="text-[13px] text-qgraytwo">
                          Select Country
                        </span>
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
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div> */}
                    <div className=" mb-6">
                      <div className="w-full">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          label="Address*"
                          placeholder="your address here"
                          inputClasses="w-full h-[50px]"
                          defaultValue={userdata?.address}

                        />
                      </div>
                    </div>
                    <div className="flex space-x-5 items-center mb-6">

                      <select
                        onChange={(e) => setBillingCity(e.target.value)}
                        className="border h-8 rounded-none focus:border-none w-full max-w-xs mx-auto"
                        required
                      >
                        <option>Dhaka</option>
                        <option>Comilla</option>
                        <option>Rangpur</option>
                        <option>Mymensing</option>
                        <option>Rajshahi</option>
                        <option>Sylhet</option>
                      </select>
                      <div className="flex-1">
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          label="Postcode / ZIP*"
                          placeholder="Postal code"
                          inputClasses="w-full h-[50px]"
                          onChange={(e) => setBillingPostalCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <h1 className="text-2xl text-qblack font-medium mb-3">
                        Shipping Details
                      </h1>
                      <div className="flex space-x-2 items-center mb-10">
                        <div >
                          <input type="checkbox" name="" id="address" onClick={() => setChecked(!checked)} />
                        </div>
                        <label
                          htmlFor="address"
                          className="text-qblack text-[15px] select-none"
                        >
                          Ship to a different address
                        </label>
                      </div>
                    </div>
                  </form>
                </div>

                {/* -----------------SHipping Part------------  */}
                {
                  checked ? <div className="form-area">
                    <form>
                      <div className="sm:flex sm:space-x-5 items-center mb-6">
                        <div className="sm:w-1/2  mb-5 sm:mb-0">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            label="First Name*"
                            placeholder="Demo Name"
                            inputClasses="w-full h-[50px]"
                            value={userdata?.name}

                          />
                        </div>
                        <div className="flex-1">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            label="Last Name*"
                            placeholder="Last Name"
                            inputClasses="w-full h-[50px]"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-5 items-center mb-6">
                        <div className="w-1/2">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            label="Email Address*"
                            placeholder="demoemial@gmail.com"
                            inputClasses="w-full h-[50px]"
                            value={userdata?.email}
                          />
                        </div>
                        <div className="flex-1">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            label="Phone Number*"
                            placeholder="012 3  ***"
                            inputClasses="w-full h-[50px]"
                            defaultValue={userdata?.phone}
                          />
                        </div>
                      </div>
                      {/* <div className="mb-6">
                      <h1 className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal">
                        Country*
                      </h1>
                      <div className="w-full h-[50px] border border-[#EDEDED] px-5 flex justify-between items-center mb-2">
                        <span className="text-[13px] text-qgraytwo">
                          Select Country
                        </span>
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
                            ></path>
                          </svg>
                        </span>
                      </div>
                    </div> */}
                      <div className=" mb-6">
                        <div className="w-full">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            label="Address*"
                            placeholder="your address here"
                            inputClasses="w-full h-[50px]"
                            defaultValue={userdata?.address}
                            onChange={(e) => setShippingAddress(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-5 items-center mb-6">

                        <select
                          onChange={(e) => setShippingCity(e.target.value)}
                          className="border h-8 rounded-none focus:border-none w-full max-w-xs mx-auto"
                          required
                        >
                          <option>Dhaka</option>
                          <option>Comilla</option>
                          <option>Rangpur</option>
                          <option>Mymensing</option>
                          <option>Rajshahi</option>
                          <option>Sylhet</option>
                        </select>
                        <div className="flex-1">
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            label="Postcode / ZIP*"
                            placeholder="Postal code"
                            inputClasses="w-full h-[50px]"
                            onChange={(e) => setShippingPostalCode(e.target.value)}
                            required
                          />
                        </div>
                      </div>


                    </form>
                  </div>
                    :
                    ''
                }
              </div>
              <div className="flex-1">
                <h1 className="sm:text-2xl text-xl text-qblack font-medium mb-5">
                  Order Summary
                </h1>

                <div className="w-full px-10 py-[30px] border border-[#EDEDED]">
                  <div className="sub-total mb-6">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        PROduct
                      </p>
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        total
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                  </div>
                  <div className="product-list w-full mb-[30px]">
                    {
                      cartDetailsFromAddtoCart.map(l => (
                        <ul className="flex flex-col space-y-5">
                          <li>
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="text-[15px] text-qblack mb-2.5">
                                  {l?.name}
                                  <sup className="text-[13px] text-qgray ml-2 mt-2">
                                    x1
                                  </sup>
                                </h4>
                                {/* <p className="text-[13px] text-qgray">
                              64GB, Black, 44mm, Chain Belt
                            </p> */}
                              </div>
                              <div>
                                <span className="text-[15px] text-qblack font-medium">
                                  {l?.current_sale_price}
                                </span>
                              </div>
                            </div>
                          </li>


                        </ul>
                      ))
                    }
                  </div>
                  <div className="w-full h-[1px] bg-[#EDEDED]"></div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-[13px] font-medium text-qblack uppercase">
                        SUBTOTAL
                      </p>
                      <p className="text-[15px] font-medium text-qblack uppercase">
                        {subTotal}
                      </p>
                    </div>
                  </div>

                  <div className="w-full mt-[30px]">
                    <div className="sub-total mb-6">
                      <div className=" flex justify-between mb-5">
                        <div>
                          <span className="text-xs text-qgraytwo mb-3 block">
                            SHIPPING
                          </span>
                          <p className="text-base font-medium text-qblack">
                            Free Shipping
                          </p>
                        </div>
                        <p className="text-[15px] font-medium text-qblack">
                          +$0
                        </p>
                      </div>
                      <div className="w-full h-[1px] bg-[#EDEDED]"></div>
                    </div>
                  </div>

                  <div className="mt-[30px]">
                    <div className=" flex justify-between mb-5">
                      <p className="text-2xl font-medium text-qblack">Total</p>
                      <p className="text-2xl font-medium text-qred">€{subTotal}</p>
                    </div>
                  </div>
                  <div className="shipping mt-[30px]">
                    <p className="text-center mb-4 ">Selet a payment Method<span className="text-qred">*</span></p>
                    <ul className="flex flex-col space-y-1">
                      <li className=" mb-5">
                        <div className="flex space-x-2.5 items-center mb-4">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="transfer"
                            // onClick={()=>setCheckedPaymentMethod(!checkedPaymentMethod)}
                            />
                          </div>
                          <label
                            htmlFor="transfer"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Direct Bank Transfer
                          </label>
                        </div>
                        <p className="text-qgraytwo text-[15px] ml-6">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                        </p>
                      </li>
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="delivery"
                            // onClick={()=>setCheckedPaymentMethod(!checkedPaymentMethod)}
                            />
                          </div>
                          <label
                            htmlFor="delivery"
                            className="text-[18px] text-normal text-qblack"

                          >
                            Cash on Delivery
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex space-x-2.5 items-center mb-5">
                          <div className="input-radio">
                            <input
                              type="radio"
                              name="price"
                              className="accent-pink-500"
                              id="bank"
                            // onClick={()=>setCheckedPaymentMethod(!checkedPaymentMethod)}
                            />
                          </div>
                          <label
                            htmlFor="bank"
                            className="text-[18px] text-normal text-qblack"
                          >
                            Credit/Debit Cards or Paypal
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <Link to="#" onClick={handlePlaceOrder}>
                    <button className="w-full h-[50px] black-btn flex justify-center items-center" >
                      <span className="text-sm font-semibold " >
                        Place Order Now
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}