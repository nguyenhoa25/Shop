import { axiosPrivate } from '../configHttp'

export const postLogin = async (payload) => {
  const resData = axiosPrivate.post('https://reqres.in/api/login', payload)
  return (await resData).data
}
