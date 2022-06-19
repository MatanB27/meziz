import {React, useState} from 'react';
import './index.scss';
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
                    
                        {/* <Routes>
                            <Route path='/*' exact element={ <Game/>}/>
                            <Route path='/aboutus' exact element={<AbousUs/>}/>
                        </Routes> */}
   
                </div>
            </div>
        </div>
    );
}

export default Menu;
