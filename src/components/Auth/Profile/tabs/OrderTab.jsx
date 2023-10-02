import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

export default function OrderTab() {
  const [orderList, setOrderList] = useState([]);
  const userProfile = JSON.parse(localStorage.getItem("user"));
  const userId = userProfile?.user?.id;

  useEffect(() => {
    fetch(
      `https://habib.munihaelectronics.com/public/api/SingleOrderlist/${userId}`
    )
      .then((res) => res.json())
      .then((data) => setOrderList(data));
  }, []);

  // Cancel Order
  const handleCancelOrder = (oId) => {
    const confirm = window.confirm("Are you want do delete?");
    if (confirm) {
      const url = ` http://habib.munihaelectronics.com/public/api/single_order_delete/${oId}`;
      fetch(url, {
        method: "DELETE",
      }).then((res) => res.json());
      const remaining = orderList.filter((p) => p.id !== oId);
      setOrderList(remaining);

      swal({
        title: "Successfully Deleted",
        text: "Success",
        icon: "success",
      });
    }
  };

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
            {orderList?.map((l) => (
              <tr className="bg-white border-b hover:bg-gray-50">
                <td className="text-center py-4">
                  <span className="text-lg text-qgray font-medium">
                    #OR{l?.order_number}
                  </span>
                </td>
                <td className="text-center py-4 px-2">
                  <span className="text-base text-qgray  whitespace-nowrap">
                    {l?.created_at}
                  </span>
                </td>
                <td className="text-center py-4 px-2">
                  <span className="text-sm rounded  text-green-500 bg-green-100 p-2">
                    {l?.status === 1
                      ? "Pending"
                      : l?.status === 2
                        ? "Processing"
                        : l?.status === 3
                          ? "On the Way"
                          : "Complete"}
                  </span>
                </td>
                <td className="text-center py-4 px-2">
                  <span className="text-base text-qblack whitespace-nowrap px-2 ">
                    {l?.total_amount}
                  </span>
                </td>
                <td className="text-center py-4">
                  <Link to="/profile#review" state={l?.id}>
                    <button
                      type="button"
                      className="w-[86px] h-[36px] bg-qyellow text-slate-200 rounded "
                    >
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleCancelOrder(l?.id)}
                    title="Cancel order ?"
                    type="button"
                    className=" ml-2 w-[86px] h-[36px] bg-qred text-white rounded"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}