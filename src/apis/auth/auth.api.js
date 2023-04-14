import axios from 'axios'
import { axiosPrivate } from '../configHttp'
import { toast } from 'react-toastify'

export const postLogin = async (email,password) => {
  try{
    const resData = axiosPrivate.post('/api/v1/auth/login', {email,password})
    return (await resData).data
  }catch(error){
    toast.error("Fail")
  }
}


