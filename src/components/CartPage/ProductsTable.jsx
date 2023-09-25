import { useEffect, useState } from "react";
import swal from "sweetalert";

export default function ProductsTable({ className }) {
  const [cartList, setCartDetails] = useState([]);
  const customer_ip = JSON.parse(localStorage.getItem("user_ip"));
  const singleDataByFind = cartList.find((c) => c.id !== customer_ip);

  const [q, setQuantity] = useState(1);
  const [total, setTotal] = useState(20);

  //User IP
  useEffect(() => {
    fetch(
      `https://habib.munihaelectronics.com/public/api/show_cartlist/${customer_ip?.user_ip}`
    )
      .then((res) => res.json())
      .then((data) => setCartDetails(data));
  }, []);

  // Delete single Cart List
  const handleDeleteCartList = (pId) => {
    console.log(pId);
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

  const handleQuantity = (price) => {
    console.log(price);
    if (singleDataByFind?.current_sale_price === price) {
      const t = price * q;
      console.log(t);
      setTotal(t);
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
                        <span className="text-[12px] font-normal"> Size: {l?.size}   </span>
                        <span className="ml-2 text-[12px] font-normal">  Color:</span>
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
                < td className="text-center py-4 px-2" >
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
                      onChange={(e) => setQuantity(+e.target.value)}
                      onClick={() => handleQuantity(l?.current_sale_price)}
                    />
                  </div>
                </td>
                <td className="text-right py-4">
                  <div className="flex space-x-1 items-center justify-center">
                    <span className="text-[15px] font-normal">{total}</span>
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
      </div >
    </div >
  );
}