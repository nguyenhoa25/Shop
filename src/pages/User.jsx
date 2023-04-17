import React, { useState } from 'react'
import Button from '../components/button/Button'
import axios from 'axios';
import { useEffect } from 'react';
import { API } from '../commom/const.api';
import { toast } from 'react-toastify';
import CreateIcon from '@mui/icons-material/Create';
const User = () => {
    const [showModal, setShowModal] = useState(false);
    const [showUpdateAvt, setShowUpdateAvt] = useState(false);
    const [showModalPass, setShowModalPass] = useState(false);
    const [user, setUser] = useState([])
    let id = localStorage.getItem('tumi_id')
    useEffect(() => {
        async function fetchData() {
            const result = await axios.get(`${API}/users/${id}`);
            setUser(result.data.data);
            // console.log(result.data.data);
        }
        fetchData();
    }, []);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [avatar, setAvatar] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }
    const handleAvt = (event) => {
        event.preventDefault();
        // Đọc tệp tin thành base64
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onload = () => {
            const data = {
                id: id,
                filename: selectedFile.name,
                filetype: selectedFile.type,
                value: reader.result
            };
            console.log(data);
            // Gọi Axios để gửi dữ liệu tệp lên server
            axios.post(`${API}/users/change-avatar/${id}`, data, {
                headers: {
                    'content-type': 'application/json'
                },

            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        };
        reader.onerror = error => {
            console.error(error);
        };
    }
    const handleSubmit = async (event) => {
        console.log(name);
        console.log(birthday);
        event.preventDefault();
        const info = {
            // id: id,
            fullName: name,
            email: email,
            password: password,
            birthday: birthday,
            phone: phone,
            address: address,
            gender: gender,
            avatar: avatar,
        }
        console.log(info);
        try {
            const response = await axios.patch(`${API}/users/${id}`, info);
            console.log(response.data);
            toast.success('Update done')
        } catch (error) {
            console.error(error);
            toast.error('Fail')
        }
    };

    return (
        <div className='flex flex-col items-center w-full'>
            <div className=" banner mt-[50px] ">
                <img src="/BannerUser.png" alt="" />
                <div className="user w-full h-[170px] relative flex">
                    <div className="user_img absolute top-[-35%] left-40 flex justify-between" >
                        <div className='flex w-[170px] h-[170px]'>
                            <img src={user.avatar ? user.avatar : `/AvtUser.png`} className='w-full h-full top-[50px] ' alt="avatar" />
                            <button className='absolute cursor-pointer w-[45px] h-[45px] right-[0%] bottom-0 bg-sky-600 rounded-[50%]  hover:opacity-[0.5] text-white' onClick={() => { setShowUpdateAvt(true) }}>
                                <CreateIcon ></CreateIcon>
                            </button>

                            <h1 className='pt-[80px] font-bold text-3xl w-auto ml-3'>{user.fullName ? user.fullName : `UserName`}</h1>
                            {
                                showUpdateAvt && (
                                    <div className="modal fixed z-10 inset-0 overflow-y-auto ">
                                        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                                        <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                                            <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                                                <div className="modal-header flex justify-between items-center pb-3">
                                                    <p className="font-bold text-2xl">Thay đổi avatar</p>
                                                    <button className="text-black close-modal" onClick={() => setShowUpdateAvt(false)}>
                                                        <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                                                    </button>
                                                </div>

                                                <div className="modal-body">

                                                    {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                                                    <div className="mb-4">
                                                        <label htmlFor="name" className="text-left block text-gray-700 font-bold mb-2">
                                                            Avatar:
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="file"
                                                            onChange={handleFileChange}
                                                            className="border border-gray-400 p-2 w-full rounded-md"
                                                        />
                                                    </div>

                                                </div>

                                                <div className="modal-footer flex justify-end pt-2">
                                                    <button onClick={handleAvt} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Lưu</button>
                                                    <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowUpdateAvt(false)}>Hủy bỏ</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='text-right w-full mt-5 mr-20 md:relative md:top-[35%] sm:relative sm:top-[58%]' >
                        <button className={'p-2 text-right shadow-lg shadow-indigo-800/50 py-4 text-white font-medium bg-primary transition-all rounded-md mr-5'} onClick={() => setShowModal(true)}>Update Infomation</button>
                        <button className={'p-2 text-right shadow-lg shadow-indigo-800/50 py-4 text-white font-medium bg-primary transition-all rounded-md'} onClick={() => setShowModalPass(true)}>Change Password</button>
                    </div>
                    {
                        showModalPass && (
                            <div className="modal fixed z-10 inset-0 overflow-y-auto ">
                                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                                <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                                    <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                                        <div className="modal-header flex justify-between items-center pb-3">
                                            <p className="font-bold text-2xl">Thay đổi mật khẩu</p>
                                            <button className="text-black close-modal" onClick={() => setShowModalPass(false)}>
                                                <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                                            </button>
                                        </div>

                                        <div className="modal-body">

                                            {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                                            <div className="mb-4">
                                                <label className="text-left block text-gray-700 font-bold mb-2">
                                                    Old password:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"

                                                    onChange={(e) => setName(e.target.value)}
                                                    className="border border-gray-400 p-2 w-full rounded-md"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className="text-left block text-gray-700 font-bold mb-2">
                                                    New password:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="name"

                                                    onChange={(e) => setName(e.target.value)}
                                                    className="border border-gray-400 p-2 w-full rounded-md"
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label className=" text-left block text-gray-700 font-bold mb-2">
                                                    Confirm Password:
                                                </label>
                                                <input
                                                    type="text"
                                                    id="email"

                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="border border-gray-400 p-2 w-full rounded-md"
                                                />
                                            </div>

                                        </div>

                                        <div className="modal-footer flex justify-end pt-2">
                                            <button onClick={handleSubmit} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Lưu</button>
                                            <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowModalPass(false)}>Hủy bỏ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    {showModal && (
                        <div className="modal fixed z-10 inset-0 overflow-y-auto ">
                            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                            <div className="modal-container fixed w-full h-full top-0 left-0 flex items-center justify-center">
                                <div className="modal-content bg-white p-6 rounded-[30px] shadow-lg  shadow-indigo-800/50">
                                    <div className="modal-header flex justify-between items-center pb-3">
                                        <p className="font-bold text-2xl">Thay đổi thông tin cá nhân</p>
                                        <button className="text-black close-modal" onClick={() => setShowModal(false)}>
                                            <svg className="fill-current text-black hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path d="M10.293 9l4.147-4.146a.5.5 0 0 0-.708-.708L9.586 8l-4.147-4.147a.5.5 0 1 0-.708.708L8.879 9l-4.147 4.146a.5.5 0 0 0 .708.708L9.586 10l4.147 4.147a.5.5 0 0 0 .708-.708L10.293 9z" /></svg>
                                        </button>
                                    </div>

                                    <div className="modal-body">

                                        {/* <h2 className="text-2xl font-bold mb-4 ">Change User Info</h2> */}
                                        <div className="mb-4">
                                            <label className="text-left block text-gray-700 font-bold mb-2">
                                                Name:
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="border border-gray-400 p-2 w-full rounded-md"
                                            />
                                        </div>
                                        {/* <div className="mb-4">
                                            <label htmlFor="email" className=" text-left block text-gray-700 font-bold mb-2">
                                                Email:
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="border border-gray-400 p-2 w-full rounded-md"
                                            />
                                        </div> */}
                                        <div className="mb-4">
                                            <label className=" text-left block text-gray-700 font-bold mb-2">
                                                Phone:
                                            </label>
                                            <input
                                                type="text"
                                                id="phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="border border-gray-400 p-2 w-full rounded-md"
                                            />
                                        </div>

                                        <div className="mb-4">
                                            <label className=" text-left block text-gray-700 font-bold mb-2">
                                                Address:
                                            </label>
                                            <input
                                                type="text"
                                                id="address"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className="border border-gray-400 p-2 w-full rounded-md"
                                            />
                                        </div>
                                        {/* <div className="mb-4">
                                            <label className=" text-left block text-gray-700 font-bold mb-2">
                                                Avatar:
                                            </label>
                                            <input
                                                type="text"
                                                id="avatar"
                                                value={avatar}
                                                onChange={(e) => setAvatar(e.target.value)}
                                                className="border border-gray-400 p-2 w-full rounded-md"
                                            />
                                        </div> */}
                                        <div className="mb-4">
                                            <label className=" text-left block text-gray-700 font-bold mb-2">
                                                BirthDay:
                                            </label>
                                            <input
                                                type="date"
                                                id="date"
                                                value={birthday}
                                                onChange={(e) => setBirthday(e.target.value)}
                                                className="border border-gray-400 p-2 w-full rounded-md"
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label className=" text-left block text-gray-700 font-bold mb-2">
                                                Genger:
                                            </label>
                                            <input
                                                type="text"
                                                id="gender"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                className="border border-gray-400 p-2 w-full rounded-md"
                                            />
                                        </div>
                                    </div>

                                    <div className="modal-footer flex justify-end pt-2">
                                        <button onClick={handleSubmit} className="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">Lưu</button>
                                        <button className="mx-2 px-4 bg-white py-3 rounded-lg text-gray-600 font-medium border border-gray-300 hover:bg-gray-100" onClick={() => setShowModal(false)}>Hủy bỏ</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='content lg:flex justify-evenly w-full px-12'>
                <div className="info_user w-[600px] h-[400px] bg-blue-100 rounded-[40px] flex flex-col">
                    <h1 className='font-bold text-3xl w-auto ml-3 text-blue-600 mt-6'>Infomation</h1>
                    <div className='text-left ml-5 mt-5'>
                        <table>
                            <tbody>
                                <tr >
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Full name</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800'>{user.fullName ? user.fullName : "Please update more"}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Email</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800'>{user.email ? user.email : "Please update more"}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Phone</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800 '>{user.phone ? user.phone : "Please update more"}</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='p-5'>
                                        <h2 className='font-bold'>Address</h2>
                                    </td>
                                    <td>
                                        <h2 className='font-semibold text-blue-800'>{user.birthday ? user.birthday : "Please update more"}</h2>
                                    </td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
                <div className="info_user w-[500px] h-[404px] bg-blue-100 rounded-[40px]">
                    <h1 className='font-bold text-3xl w-auto ml-3 text-blue-600 mt-6'>Order</h1>
                </div>
            </div>
        </div>
    )
}

export default User