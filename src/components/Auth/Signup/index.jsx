import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import Layout from "../../Partials/LayoutHomeTwo";
import Thumbnail from "./Thumbnail";

export default function Signup() {
  const [checked, setValue] = useState(false);
  const [userData, setUserData] = useState("");
  console.log(userData);
  const [agree, setAgree] = useState(false);

  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/profile";
  const rememberMe = () => {
    setValue(!checked);
  };
  const userError = userData?.msg;
  //Handle Submit
  const handleSubmit = async (e) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const name = event.target.name.value;
    // const phone = event.target.phone.value;
    const addItem = { email, password, name };
    // console.log(addItem);

    const url = "https://habib.munihaelectronics.com/public/api/signup";
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(addItem),
    })
      .then((Response) => Response.json())
      .then((data) => setUserData(data));
  };
  useEffect(() => {
    if (status === 200) {
      // navigate(`/profile`);
      navigate(from, { replace: true });
    }
    // else if(status?.message === 'User not found') {
    //     alert('Please type proper user id & pass');
    //     setSpinner(false);
    //     //  toast.error(`Opps!Please type proper emp code & password`);
    // }
  });
  if (userData.msg === "This email already exists") {
    toast(userError);
  } else if (userData.msg === "Registered Successfully") {
    swal({
      title: "Successfully Registered",
      text: "Success",
      icon: "success",
    });
  }
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="login-page-wrapper w-full py-10">
        <div className="container-x mx-auto">
          <div className="lg:flex items-center relative">
            <div className="lg:w-[572px] w-full lg:h-[783px] bg-white flex flex-col justify-center sm:p-10 p-5 border border-[#E0E0E0]">
              <div className="w-full">
                <div className="title-area flex flex-col justify-center items-center relative text-center mb-7">
                  <h1 className="text-[34px] font-bold leading-[74px] text-qblack">
                    Create Account
                  </h1>
                  <div className="shape -mt-6">
                    <svg
                      width="354"
                      height="30"
                      viewBox="0 0 354 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1"
                        stroke="#FFBB38"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="input-area">
                  <form role="form" onSubmit={handleSubmit}>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <input
                        required
                        placeholder="User Name*"
                        label="User Name*"
                        name="name"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 md:py-4 md:py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      // onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 md:py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email Address*"
                        label="Email Address*"
                        name="email"
                        type="email"
                      // onChange={(e) => setEmail(e.target.value)}
                      />

                      <input
                        // required
                        className="shadow appearance-none border rounded w-full py-2 md:py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="0213 ***"
                        label="Phone*"
                        name="phone"
                        type="text"
                      />
                    </div>
                    <div className="flex sm:flex-row flex-col space-y-5 sm:space-y-0 sm:space-x-5 mb-5">
                      <input
                        required
                        className="shadow appearance-none border rounded w-full py-2 md:py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                        // label="Email Address*"
                        name="password"
                        type="password"
                      // onChange={(e) => setPassword(e.target.value)}
                      />

                      <input
                        className="shadow appearance-none border rounded w-full py-2 md:py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Confirm Password"
                        // label="Phone*"
                        name="cpassword"
                        type="password"
                      />
                    </div>

                    <div className="flex space-x-2 items-center mb-3">
                      <div>
                        <input
                          type="checkbox"
                          name=""
                          id="address"
                          onClick={() => setAgree(!agree)}
                        />
                      </div>
                      <label
                        htmlFor="address"
                        className="text-qblack text-[15px] select-none"
                      >
                        I agree with all terms and conditions
                      </label>
                    </div>
                    <div className="signin-area mb-3">
                      <div className="flex justify-center">
                        <button
                          disabled={!agree}
                          type="submit"
                          className="bg-qh2-green rounded text-sm text-white w-full h-[50px] font-semibold flex justify-center bg-purple items-center"
                        >
                          <span>Create Account</span>
                        </button>
                      </div>
                    </div>
                  </form>
                  <div className="signup-area flex justify-center">
                    <p className="text-base text-qgraytwo font-normal">
                      Already have an Account?
                      <Link to="/login" className="ml-2 text-qblack">
                        Log In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 lg:flex hidden transform scale-60 xl:scale-100   xl:justify-center">
              <div
                className="absolute xl:-right-20 -right-[138px]"
                style={{ top: "calc(50% - 258px)" }}
              >
                <Thumbnail />
              </div>
            </div>
          </div>
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
    </Layout>
  );
}