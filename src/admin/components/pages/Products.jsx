import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { API } from '../../../commom/const.api';
import { useState } from 'react';
import IconArrowRight from '../../../icons/IconArrowRight';
import IconLeft from '../../../icons/IconArrowRight';
import IconRight from '../../../icons/IconRight';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
const Products = () => {
    const [skip, setSkip] = useState(0);
    console.log(skip);
    const [products, setProducts] = useState([])
    useEffect(()=>{
        async function fetchProducts(){
            const res = await axios.get(`${API}/products?page=${skip}&size=17`)
            console.log(res.data.data.productOutputs);
            setProducts(res.data.data.productOutputs)
        }
        fetchProducts()
    },[skip])
    const styleArrow = `flex gap-x-2 items-center justify-center font-semibold px-4 py-2 bg-white text-primary border border-primary hover:bg-primary hover:text-white transition-all rounded-lg`;
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-5">Product Table</h1>
      <button className='text-right p-2 mb-2 border rounded bg-green-200 cursor-pointer text-blue-400 font-bold'>Add products</button>
      <table className="table-auto h-auto w-full">
        <thead>
          <tr>
          <th className="bg-gray-200 border  px-4 py-2">Id</th>
            <th className="bg-gray-200 border  px-4 py-2">Name</th>
            <th className="bg-gray-200 border  px-4 py-2">Stock</th>
            <th className="bg-gray-200 border  px-4 py-2">Brand</th>
            <th className="bg-gray-200 border  px-4 py-2">Category</th>
            <th className="bg-gray-200 border  ">Thumbnail</th>
            <th className="bg-gray-200 border  px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="border  px-4 py-2">{product.id}</td>
              <td className="border text-left px-4 py-2">{product.name}</td>
              <td className="border text-left px-4 py-2">{product.stock}</td>
              <td className="border text-left px-4 py-2">{product.brand}</td>
              <td className="border text-left px-4 py-2">{product.category}</td>
              <td className="border text-left px-4 py-2">
                <img src={product.thumbnail} className='w-7 h-6' alt="" />
             </td>
             <td className="border text-left px-4 py-2 flex">
                <div className='mx-3 cursor-pointer'><ModeEditIcon></ModeEditIcon></div>
                <div className='mx-3 cursor-pointer'><DeleteIcon></DeleteIcon></div>
             </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="flex gap-x-5 mt-5">
              {skip < 1 ? (
                <span
                  aria-disabled
                  className={`cursor-not-allowed opacity-50 ${styleArrow}`}
                >
                   Previous
                </span>
              ) : (
                <span
                  className={`cursor-pointer ${styleArrow}`}
                  onClick={() => {
                    setSkip(skip - 1);

                    document.documentElement.scrollTop = 0;
                  }}
                >
                   Previous
                </span>
              )}

              {skip >= 2 ? (
                <span
                  aria-disabled
                  className={`cursor-not-allowed opacity-50 ${styleArrow}`}
                >
                  Next <IconArrowRight></IconArrowRight>
                </span>
              ) : (
                <span
                  className={`cursor-pointer ${styleArrow}`}
                  onClick={() => {
                    setSkip(skip + 1);

                    document.documentElement.scrollTop = 0;
                  }}
                >
                  Next <IconArrowRight></IconArrowRight>
                </span>
              )}
            </div>
    </div>
  )
}

export default Products