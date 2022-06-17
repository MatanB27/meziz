import React from 'react';

import './index.scss';
function Menu (props) {

    const {
        isMenuOpen,
    } = props;

    return(
        <div className={"menu-wrapper " + (isMenuOpen ? 'active' : '')}>
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