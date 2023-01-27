import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import { fetchCategoriesAsync } from "../../store/categories/category.action";

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //any async things you need to do inside a useEffect, wrap in an async function
    // const getCategoriesMap = async () => {
    //   const categoriesArray = await getCategoriesAndDocuments();

    //   console.log(categoriesArray);
    //   dispatch(setCategories(categoriesArray));
    // };
    // getCategoriesMap();
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
