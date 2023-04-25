import React from 'react'
import Sidebar from './components/Sidebar'
import MainDash from './components/MainDash/MainDash'
import RightSide from './components/RigtSide/RightSide'
import './admin.css'
import { Outlet, Route, Routes } from 'react-router-dom'
import Products from './components/pages/Products'

const Admin = () => {
    return (
        <div className='Admin'>
            <div className="AdminGlass" >
                <Sidebar></Sidebar>
                <Outlet></Outlet>
                <RightSide></RightSide>
            </div>
        </div>
    )
}

export default Admin