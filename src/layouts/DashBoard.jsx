import { Outlet } from "react-router-dom";
import SideBar from "../components/DashBoard/SideBar/SideBar";

 
const DashBoard = () => {
    return (
        <div className="min-h-screen relative md:flex">
            <div><SideBar/></div>
            <div className="md:ml-64 p-8 flex-1">
                <Outlet/>
            </div>
        </div>
    );
};

export default DashBoard;