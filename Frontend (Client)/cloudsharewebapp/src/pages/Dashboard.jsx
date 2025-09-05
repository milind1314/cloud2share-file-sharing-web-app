import DashboardLayout from "../layout/DashboardLayout.jsx";
import {useAuth} from "@clerk/clerk-react";
import {useEffect} from "react";

const Dashboard = () => {

    const {getToken} = useAuth();
    useEffect(() => {
        const displayToken = async () => {
            const token = await getToken();
            console.log(token);
        }
        displayToken();
    }, []);
    return (
        <DashboardLayout activeMenu="Dashboard">
            <div>
                Dashbord content
            </div>
        </DashboardLayout>
    )
}

export default Dashboard;