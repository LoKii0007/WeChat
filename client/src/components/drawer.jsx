import React, { useContext } from 'react'
import AccountContext from '../context/accoountcontext'
import "../css/drawer.css"

const Drawer = () => {
    const { account } = useContext(AccountContext)
    return (
        <>
            <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <img className='profile-img' src={account.picture} alt="" />
            </button>

            <div className="container">
                <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="drawer-header ps-4 pb-3 d-flex flex-row align-items-end position-relative">
                        <button type="button" className="btn-close align-items-center" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        <div className='align-items-center ms-4'>
                            Profile
                        </div>
                    </div>

                    <div className="offcanvas-body ">
                        <div className="drawer-profile mb-5 text-center">
                            <img src={account.picture} alt="" />
                        </div>
                        <div className="profile-info mt-4 mx-3">
                            <div className='mt-4 heading-color'>
                                <h5>Your name <span style={{color:"blue"}} >{account.name}</span></h5>
                            </div>
                            <div className='mt-4 heading-color'>
                                <h6>About <span style={{color:"blue"}} >{account.name}</span></h6>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Drawer
