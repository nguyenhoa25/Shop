import { axiosPrivate } from '../configHttp'

export const postLogin = async (payload) => {
  const resData = axiosPrivate.post('/api/v1/auth/login', payload)
  return (await resData).data
}
