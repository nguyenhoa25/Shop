import axios from 'axios'
import { axiosPrivate } from '../configHttp'

export const postLogin = async (email,password) => {
  // const resData = axiosPrivate.post('https://reqres.in/api/login', {email,password})
  const resData = axios.post('https://reqres.in/api/login', {email,password})
  return (await resData).data
}
