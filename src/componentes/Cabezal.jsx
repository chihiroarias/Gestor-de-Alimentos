import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const Cabezal = () => {

    const navigate = useNavigate();
    const Logout = () => {
        localStorage.clear();
        navigate("/");
    }
    return (

        <div>
            <header>
                <div className="text-right">
                    <input className="btn btn-dark text-white" type="button" value="LOGOUT" onClick={Logout} />
                </div>
            </header>
            <main>
                <Outlet />
            </main>
        </div>

    )
}

export default Cabezal