import React, { useEffect, useState } from "react";
import LayoutHomeTwo from "../Partials/LayoutHomeTwo";

import datas from "../../data/productsTwo.json";
import SectionStylePopular from "../Helpers/SectionStylePopular";
import SectionStyleThreeHomeTwo from "../Helpers/SectionStyleThreeHomeTwo";
import SectionStyleTwo from "../Helpers/SectionStyleTwoHomeTwo";
import SectionStylenewarrival from "../Helpers/SectionStylenewarrival";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import ProductsAds from "../Home/ProductsAds";
import Banner from "./Banner";
import CampaignCountDown from "./CampaignCountDown";
import CategoriesSection from "./CategoriesSection";

export default function HomeTwo() {
  const [category, setCategory] = useState([]);
  const [Habib, setHabib] = useState([]);
  const [popular, setPopular] = useState([]);
  const [new_arrival, setNewArrival] = useState([]);
  const [top_sell, setTopSell] = useState([]);
  const [user_ip, setUserIp] = useState({});

  localStorage.setItem("user_ip", JSON.stringify(user_ip));
  // console.log(user_ip);

  //User IP
  useEffect(() => {
    fetch(
      "https://habib.munihaelectronics.com/public/api/user-ip")
      .then((res) => res.json())
      .then((data) => setUserIp(data));
  }, []);




  //All category
  useEffect(() => {
    fetch(
      "https://habib.munihaelectronics.com/public/api/product/category")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  //All product 
  useEffect(() => {
    fetch(
      "https://habib.munihaelectronics.com/public/api/home/featured/product")
      .then((res) => res.json())
      .then((data) => setHabib(data));
  }, []);

  //All popular product 
  useEffect(() => {
    fetch(
      "https://habib.munihaelectronics.com/public/api/home/popular/product/get")
      .then((res) => res.json())
      .then((data) => setPopular(data));
  }, []);

  //All New Arrivals 
  useEffect(() => {
    fetch(
      "https://habib.munihaelectronics.com/public/api/home/new-arrival/product")
      .then((res) => res.json())
      .then((data) => setNewArrival(data));
  }, []);


  //Top sell Products
  useEffect(() => {
    fetch(
      "http://habib.munihaelectronics.com/public/api/home/top-sell/product")
      .then((res) => res.json())
      .then((data) => setTopSell(data));
  }, []);



  const { products } = datas;
  return (
    <LayoutHomeTwo>
      <Banner className="banner-wrapper mb-[46px]" />
      <ViewMoreTitle
        className="my-categories mb-[60px]"
        seeMoreUrl="/all-products"
        categoryTitle="My Market Category"
      >
        <CategoriesSection category={category} />
      </ViewMoreTitle>
      <SectionStyleThreeHomeTwo
        products={products}
        habib={Habib}
        showProducts={6}
        sectionTitle="Featured Products"
        seeMoreUrl="/all-products"
        className="new-products mb-[60px]"
      />
      <CampaignCountDown className="mb-[60px]" lastDate="2023-10-04 4:00:00" />
      <ProductsAds
        ads={[
          `${process.env.PUBLIC_URL}/assets/images/ads-2.2.png`,
          `${process.env.PUBLIC_URL}/assets/images/ads-2.1.png`,
        ]}
        sectionHeight="sm:h-[290px] h-full"
        className="products-ads-section mb-[60px]"
      />
      <SectionStylePopular
        products={products.slice(3, 7)}
        habib={popular}
        showProducts={6}
        sectionTitle="Popular Sales"
        seeMoreUrl="/all-products"
        className="feature-products mb-[60px]"
      />
      <ViewMoreTitle
        className="top-selling-product mb-[60px]"
        seeMoreUrl="/all-products"
        categoryTitle="Top Selling Products"
      >
        <SectionStyleTwo habib={top_sell} products={products.slice(3, products.length)} />
      </ViewMoreTitle>
      <ProductsAds
        ads={[`${process.env.PUBLIC_URL}/assets/images/ads-2.3.png`]}
        className="products-ads-section mb-[60px]"
      />
      <SectionStylenewarrival
        products={products.reverse().slice(0, 10)}
        habib={new_arrival}
        showProducts={9}
        sectionTitle="New Arrivals"
        seeMoreUrl="/all-products"
        className="new-arrivals mb-[60px]"
      />
      <ProductsAds
        sectionHeight="164"
        ads={[`${process.env.PUBLIC_URL}/assets/images/ads-2.4.png`]}
        className="products-ads-section mb-[60px]"
      />
      {/* <SectionStyleFour
        products={products}
        sectionTitle="Popular Sales"
        seeMoreUrl="/all-products"
        className="category-products mb-[60px]"
      /> */}
    </LayoutHomeTwo>
  );
}
