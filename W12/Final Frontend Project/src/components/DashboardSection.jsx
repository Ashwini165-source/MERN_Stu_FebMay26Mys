import { NavLink, Outlet } from "react-router-dom";

export default function DashboardSection() {
    return (
        <section style={StyleSheet.container}>
            <aside style={StyleSheet.sidebar}>
                <h3>Dashboard</h3>
                <nav style={StyleSheet.sidebarLinks}>
                    <NavLink to="/dashboard"
                    end
                    style={getLinkStyle}>
                        Overview
                    </NavLink>
                    <NavLink to="/dashboard/movies"
                    end
                    style={getLinkStyle}>
                        MOVIES
                    </NavLink>
                    <NavLink to="/dashboard/shows"
                    end
                    style={getLinkStyle}>
                        Shows
                    </NavLink>
                </nav>
            </aside>
            <main style = {StyleSheet.content}>
                {/* Outlet acts as a placeholder */}
                <Outlet/>
            </main>
        </section>
    );
}

function getLinkStyle({isActive}){
    return{
        textDecoration: "none",
        color: isActive ? "#d32f2f" : "#333",
        fontWeight : isActive?"bold":"normal"
    };
}

const styles = {
    container: {
        display:"flex",
        gap:"20px",
        marginTop:"20px"
    },
    sidebar: {
        minWidth :"180px",
        borderRight:"2px solid #ddd",
        paddingRight:"20px"
    },
    sidebarLinks:{
        display:"flex",
        flexDirection:"column",
        gap:"10px"
    },
    content:{
        flex:1
    }
};