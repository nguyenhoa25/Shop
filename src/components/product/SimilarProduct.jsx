import React from "react";
import useSWR from "swr";
import { fetcher } from "../../apiConfig";
import Card from "../card/Card";
import { API } from "../../commom/const.api";

const SimilarProduct = ({ categories, id }) => {
    const { data } = useSWR(
        `https://dummyjson.com/products/category/${categories}`
        // `${API}/products?page=0&size=4`
        ,
        fetcher
    );
    if (!data) return;
    const product = data.products;
    // const product = data.data.productOutputs;
    console.log(data);
    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-5 py-5 mb-[50px] similar-product">
            {product.filter(product => {
                return product.id !== id;
            }).map((item, index) => (
                <Card item={item} key={index}></Card>
            ))}
        </div>
    );
};

export default SimilarProduct;
