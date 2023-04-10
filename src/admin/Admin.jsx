import React from 'react'
import Sidebar from './components/Sidebar'
import MainDash from './components/MainDash/MainDash'
import RightSide from './components/RigtSide/RightSide'
import './admin.css'

const Admin = () => {
    return (
        <div className='Admin'>
            <div className="AdminGlass">
                <Sidebar></Sidebar>
                <MainDash></MainDash>
                <RightSide></RightSide>
            </div>
        </div>
    )
}

export default Admin