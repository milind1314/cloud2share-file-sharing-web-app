import React from 'react'
import {useUser} from "@clerk/clerk-react";
import Navbar from "../components/Navbar.jsx";
import SideMenu from "../components/SideMenu.jsx";

const DashboardLayout = ({children, activeMenu}) => {
    const {user} = useUser();
    return (
        <div>
            {/*Navbar component goes here*/}
            <Navbar activeMenu={activeMenu} />
            {user && (
                <div className="flex">
                    <div className="max-[1080px]:hidden">
                        {/*sidemen goes here*/}
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className="grow mx-5">{children}</div>
                </div>
            )}
        </div>
    )
}
export default DashboardLayout
