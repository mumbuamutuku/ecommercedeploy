import { config } from "../../config";
import { getData } from "../lib";
import { CategoryProps } from "../../type";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";

const Categories = () => {
  const [categories, setcategories] =useState([]);

  useEffect(()=>{
    const fetchData = async() => {
      const endpoint = `${config?.baseUrl}/categories`;
      try {
        const data = await getData(endpoint);
        setcategories(data);
      } catch (error) {
        console.error('Error setching data', error);
      }
    };
    fetchData();
  });
  return (
    <Container>
      <div className="mb-10">
        <div className="flex items-center justify-between" >
          <Title text="Popular Categories" />
          <Link to={'/category/tvAndAudio'} className="font-medium relative
          group overflow-hidden"> 
            View All Categories {" "}
            <span className="absolute bottom-0 left-0 w-full block h-[1px]
            bg-gray-600 -translate-x-[100%] group-hover:translate-x-0
            duration-300" />
          </Link>
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-3" />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-7">
        
      {categories.map((item: CategoryProps) => (
        <Link to={`/category/${item?._base}`} key={item?._id}
          className="w-full h-auto relative group overflow-hidden"
        >
          <img src={item?.image} alt="categoryImage" className="w-full h-auto
          rounded-md group-hover:scale-110 duration-300"/>
          <div className="absolute bottom-3 w-full text-center">
            <p className="text-sm md:text-base font-bold">{item?.name}</p>
          </div>
        </Link>
      ))}
      </div>
    </Container>
  )
}

export default Categories