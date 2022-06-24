import {React, useState} from 'react';
import './index.scss';
import {Link, NavLink} from 'react-router-dom';

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
                    <NavLink class='link' activeClass='active' 
                        to='/'>Fuzzle</NavLink>
                    <NavLink class='link' activeClass='active' 
                        to='/aboutus'>About us</NavLink>
                </div>
            </div>
        </div>
    );
}

export default Menu;
