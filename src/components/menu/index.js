import {React, useState} from 'react';
import './index.scss';
import {Link} from 'react-router-dom';
import Game from '../../screens/game';
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
                    <Link to='/'>Fuzzle</Link>
                    <Link to='/aboutus'>About us</Link>
                </div>
            </div>
        </div>
    );
}

export default Menu;
