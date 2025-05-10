import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // thêm

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
import { getCartProductAPI } from "../components/redux/cart/cartSlice";

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const token = useSelector(state => state.user.currentUser?.accessToken);

    const getProducts = async () => {
        try {
            setIsLoading(true);
            getProductAPI().then(res => {
                setProducts(res || []);
            }).finally(() => {
                setIsLoading(false);
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(getCartProductAPI());
        }
    }, [token, dispatch]); // Gọi cart API mỗi khi user thay đổi hoặc dispatch mới

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
    );
}

export default HomePage;
