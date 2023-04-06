import { axiosPrivate } from '../configHttp'

export const postLogin = async (email,password) => {
  const resData = axiosPrivate.post('/api/v1/auth/login', {email,password})
  return (await resData).data
}
