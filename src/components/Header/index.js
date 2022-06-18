
import './index.scss';
import QuestionMark from '../../images/circular-question-mark.png';
import MenuIcon from '../../images/menu-icon.svg';
import Popup from '../popup/';
import {useState} from 'react';
import Menu from '../menu';
function Header(props){

    const [isPopup, setIsPopup] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {
        numOfGuesses
    } = props;

    return(
        <div className="header-wrapper">
            <Menu
                isMenuOpen = {isMenuOpen}
                setIsMenuOpen = {setIsMenuOpen}
            />
            <div className="header-left">
            <img className={"menu-img"} src={MenuIcon}
                onClick={() => {setIsMenuOpen(!isMenuOpen)}}/>
            </div>

            <div className="header-center">
                <div className="header-title">FuzZle</div>
                <img className="about-img" onClick={() => setIsPopup(true)}
                    src={QuestionMark}/>
                    {/* {
                        isPopup &&  */}
                        <Popup 
                            numOfGuesses={numOfGuesses}
                            isPopup={isPopup}
                            setIsPopup={setIsPopup}
                        />
                    {/* } */}
            </div>

            <div className="header-right">
                
            </div>    
        </div>
    )
}

export default Header;