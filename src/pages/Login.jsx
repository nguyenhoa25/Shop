import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'
import Input from '../components/input/Input'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputPassword from '../components/input/InputPassword';
import ButtonLoading from '../components/button/ButtonLoading';
import { toast } from "react-toastify";
import axios from 'axios'
import useAuth from '../services/useAuth';
import { postLogin } from '../apis/auth/auth.api';
import IconEye from '../icons/IconEye';
import IconEyeSlash from '../icons/IconEyeSlash';


const Login = () => {

    const { setAuth } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()
    // "email": "eve.holt@reqres.in",
    // "password": "cityslicka"
    useEffect(() => {
        if (localStorage.getItem('user-info'))
            navigate('/')
    }, [])
    // "email": "tgtg28082002@gmail.com",
    // "password": "Thang2002"
    const [valueAuth, setValueAuth] = useState({
        email: "tgtg28082002@gmail.com",
        password: "Thang2002",
    })
    async function handleSubmitLogin() {
        // console.warn(email, password)
        // let item = { email, password }
        // let res = await fetch("https://reqres.in/api/login", {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json; charset=utf-8",
        //         "Accept": 'application/json'
        //     },
        //     body: JSON.stringify(item)
        // })
        // if (res.status === 200) {
        //     res = await res.json();
        //     localStorage.setItem("user-info", JSON.stringify(res))
        //     navigate('/')
        //     toast.success("Successfully logged in!");

        // } else {
        //     toast.error('Fail')
        // }
        postLogin(valueAuth).then((data) => {
            console.log(data.data)
            if (data) {
                const accessToken = data?.data?.token
                setAuth({ accessToken })
                localStorage.setItem('accessToken', accessToken)
                navigate('/', { replace: true })
            }
        })
    }
    const [showPass, setShowPass] = useState(false);
    const showPassword = () => {
        setShowPass(true);
    };
    const hiddenPassword = () => {
        setShowPass(false);
    };
    return (
        <div className='w-full h-screen bg-primary bg-opacity-10'>
            <div className='container w-full h-screen p-5 relative flex justify-center items-center'>
                <NavLink to="/" className={"absolute top-5 left-5"}>
                    <img src="/qora.png" alt="" className="w-[50px] h-[50px]" />
                </NavLink>
                <div className="login max-w-[500px] w-full mx-auto p-10 flex flex-col items-center relative shadow-2xl rounded-lg">
                    <h4 className="text-xl font-semibold mb-2 z-10">Welcome Back!</h4>
                    <p className="mb-5 text-sm font-medium z-10">
                        Don't have an account?{" "}
                        <NavLink to={"/signup"} className="sm:text-primary text-error">
                            Sign Up
                        </NavLink>
                    </p>
                    <h3 className="text-2xl font-semibold mb-5 z-10">Sign In</h3>
                    <div

                        autoComplete="off"
                        className="flex flex-col gap-5 w-[90%] z-10"
                    >
                        <div className="flex flex-col gap-2 text-sm font-medium items-start z-10">
                            <label htmlFor="Email" className='font-bold '>Email</label>
                            <input type="email"
                                id="Email"
                                value={valueAuth.email}
                                placeholder="example@gmail.com"
                                className={`w-full border rounded-md px-5 py-3 text-sm `}
                                onChange={(e) => setEmail(e.target.value)}

                            />

                        </div>
                        <div className="flex flex-col gap-2 text-sm font-medium items-start z-10    ">
                            <label htmlFor="password" className="font-bold" >Password*</label>
                            <div className="w-full border rounded-md px-5 py-3 pr-12 relative bg-white">
                                <input
                                    type={showPass ? "text" : "password"}
                                    value={valueAuth.password}
                                    placeholder="Enter your password"
                                    className="w-full bg-transparent text-sm "
                                    onChange={(e) => setPassword(e.target.value)}
                                // {...field}
                                />
                                {showPass ? (
                                    <IconEye
                                        className={`absolute top-2/4 right-5 -translate-y-2/4 cursor-pointer`}
                                        onClick={hiddenPassword}
                                    ></IconEye>
                                ) : (
                                    <IconEyeSlash
                                        className={`absolute top-2/4 right-5 -translate-y-2/4 cursor-pointer`}
                                        onClick={showPassword}
                                    ></IconEyeSlash>
                                )}
                            </div>
                        </div>
                        <input
                            className="mt-2 w-full h-[45px] text-white bg-primary rounded-md font-semibold "
                            type={'submit'}
                            value="Sign In"
                            onClick={handleSubmitLogin}
                        />
                    </div>
                    <div className="absolute -left-[250px] -bottom-[150px] w-[450px] h-[450px] -z-10">
                        <svg
                            id="10015.io"
                            viewBox="0 0 480 480"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <path
                                fill="#474bff"
                                d="M364,309Q320,378,225.5,403.5Q131,429,105.5,334.5Q80,240,106,147Q132,54,222.5,83.5Q313,113,360.5,176.5Q408,240,364,309Z"
                            />
                        </svg>
                    </div>
                    <div className="absolute -top-[150px] -right-[250px]  w-[450px] h-[450px] -z-10">
                        <svg
                            id="10015.io"
                            viewBox="0 0 480 480"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <path
                                fill="#474bff"
                                d="M396.5,307.5Q318,375,229.5,393Q141,411,113.5,325.5Q86,240,123,171Q160,102,254.5,76.5Q349,51,412,145.5Q475,240,396.5,307.5Z"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login