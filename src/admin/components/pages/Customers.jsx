import React from 'react'
import { API } from '../../../commom/const.api'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const Customers = () => {
  const [customer,setCustomer] = useState([])
  const [token, setToken] = useState('');
  useEffect(()=>{
    const token = localStorage.getItem('accessToken');
    setToken(token);
    const config = {
      headers: { Authorization: `Bearer ${token}` ,
      }, 
    };
    async function fetchCustomer(){
        const res = await axios.get(`${API}/users`,config)
        setCustomer(res.data.data)
        console.log(res.data.data);
    }
    fetchCustomer()
},[])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5 ">Customers</h1>
      <table className="table-auto h-auto w-full ml-10">
        <thead>
          <tr>
            <th className="bg-blue-300 border  px-4 py-2">Id</th>
            <th className="bg-blue-300 border  px-4 py-2">Name</th>
            <th className="bg-blue-300 border  px-4 py-2">Email</th>
            <th className="bg-blue-300 border  px-4 py-2">Phone</th>
            <th className="bg-blue-300 border  px-4 py-2">Birthday</th>
            <th className="bg-blue-300 border  px-4 py-2">Gender</th>
          </tr>
        </thead>
        <tbody>
            {
            customer.map((item,index)=>(
              <tr key={index} className='hover:bg-blue-200 hover:scale-[1.01] transition'>
                  
                  <td className="border px-4 py-2 ">{item.id} </td>
                  <td className="border text-left  px-4 py-2">{item.fullName}</td>
                  <td className="border px-4 py-2">{item.email}</td>
                  <td className="border px-4 py-2">{`${item.phone}` ? `${item.phone}` : "Update later"}</td>
                  <td className="border px-4 py-2">{`${item.birthday}` ? `${item.birthday}` : "Update later"}</td>
                  <td className="border px-4 py-2">{`${item.gender}` ? `${item.gender}` : "Update later"}</td>
                </tr>
            ))
          }
        </tbody>
      </table>
      
    </div>
    
  )
}

export default Customers