import { Link, NavLink } from "react-router-dom"
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { useSelector } from "react-redux"


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logout successfully')
            })
            .catch(() => {
                showErrorMsg('OOPs try again')
            })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>Mister Toy</h1>
                {user ? (
                    < section >

                        <Link to={`/user`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/toy" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
