import React from "react";
export default function CategoriesSection({ category }) {
  return (
    <>
      <div className="categories-section-wrapper w-full">
        <div className="container-x mx-auto">

          <div className="w-full categories-iems">
            <div className="grid xl:grid-cols-8 sm:grid-cols-4 grid-cols-2 gap-10 mb-[46px]">
              {category.map(function (cat) {
                return (
                  <div key={cat.id}>
                    <div className="item w-full group cursor-pointer">
                      <div className="w-full flex justify-center">
                        <div className="w-[110px] h-[110px] rounded-full bg-[#EEF1F1] group-hover:bg-qh2-green mb-2.5 flex justify-center items-center">

                          <img className="rounded-full p-2" src={`https://habib.munihaelectronics.com/public/${cat?.image}`} alt="" />

                        </div>
                      </div>
                      <div className="w-full flex justify-center">
                        <p className="text-base text-qblack whitespace-nowrap ">
                          {cat?.name}
                        </p>
                      </div>
                    </div>

                  </div>
                )
              })}



            </div>
          </div>

        </div>
      </div>
    </>
  );
}
