import { useEffect, useState } from "react";
import axios from "axios";
import Product from "../components/Product"
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

import Header from "./Hearder/Header";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import Banner from "./Banner/Banner";
import CategoryMenu from "./CategoryMenu/CategoryMenu";
import Chatbot from "./Chatbot/ChatBox";
import BodyProduct from "./Body/BodyProduct/BodyProduct";
import ViewedProducts from "./ViewProduct/ViewProduct";
import FlashSale from "./FlashSale/FlashSale";
import { getProductAPI } from "../apis";
//import { getProductAPI } from "../components/redux/product/productSlice";

const HomePage = () => {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            // const response = await axios.get(`${VITE_BACKEND_URL}/api/products/`);

            getProductAPI().then(res => {

                setProducts(res || [])
            }).finally(() => {
                setIsLoading(false);
            })

            // console.log(response.data);
            // setProducts(response.data);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <>
            <Header />
            <CategoryMenu />
            <Banner />
            <Chatbot />
            <Body />
            <FlashSale />
            <BodyProduct />
            <ViewedProducts />
            <Footer />
        </>
    )
}


export default HomePage;