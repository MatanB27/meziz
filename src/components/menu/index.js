import {React, useState} from 'react';

import './index.scss';
function Menu (props) {

    const {
        isMenuOpen,
        setIsMenuOpen,
    } = props;


    return(
        <div className={"menu-wrapper " + (isMenuOpen ? 'active' : '')}>
            <div className={"menu-header-wrapper"}>
                <div className={"menu-header-inner"}>
                    <span className={"header-title"}>Menu</span>
                    <span  onClick={() => setIsMenuOpen(!isMenuOpen)} className={"close-x"}>X</span>
                </div>
            </div>
            <div className="menu">
                <div className="routes-wrapper">
                    {/* <span>Route1</span>
                    <span>Route2</span>
                    <span>Route3</span> */}
                </div>
            </div>
        </div>
    );
}

export default Menu;