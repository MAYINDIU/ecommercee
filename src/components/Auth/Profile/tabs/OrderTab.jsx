import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function OrderTab() {
  const [orderList, setOrderList] = useState([])
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userId = (userProfile?.user?.id);



  useEffect(() => {
    fetch(
      `https://habib.munihaelectronics.com/public/api/SingleOrderlist/${userId}`
    )
      .then((res) => res.json())
      .then((data) => setOrderList(data));
  }, []);



  return (
    <>
      <div className="relative w-full overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {/* table heading */}
            <tr className="text-base text-qgray whitespace-nowrap px-2 border-b default-border-bottom ">
              <td className="py-4 block whitespace-nowrap text-center">
                Order
              </td>
              <td className="py-4 whitespace-nowrap text-center">Date</td>
              <td className="py-4 whitespace-nowrap text-center">Status</td>
              <td className="py-4 whitespace-nowrap text-center">Amount</td>
              <td className="py-4 whitespace-nowrap  text-center">Action</td>
            </tr>
            {/* table heading end */}
            {
              orderList?.map(l => (
                <tr className="bg-white border-b hover:bg-gray-50">
                  <td className="text-center py-4">
                    <span className="text-lg text-qgray font-medium">#OR{l?.order_number}</span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qgray  whitespace-nowrap">
                      {l?.created_at}
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-sm rounded text-green-500 bg-green-100 p-2">
                      Complated
                    </span>
                  </td>
                  <td className="text-center py-4 px-2">
                    <span className="text-base text-qblack whitespace-nowrap px-2 ">
                      {l?.total_amount}

                    </span>
                  </td>
                  <td className="text-center py-4">
                    <Link to="/profile#review" state={l?.id} >
                      <button
                        type="button"
                        className="w-[116px] h-[46px] bg-qyellow text-qblack font-bold">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            }


          </tbody>
        </table>
      </div>
    </>
  );
}