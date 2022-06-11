
import './index.scss';
import QuestionMark from '../../images/circular-question-mark.png';
import MenuIcon from '../../images/menu-icon.svg';
import Popup from '../popup/';
import {useState} from 'react';

function Header(props){

    const [isPopup, setIsPopup] = useState(false);

    const {
        numOfGuesses
    } = props;

    return(
        <div className="header-wrapper">
            <div className="header-left">

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
                <img class={"menu-img"} src={MenuIcon}/>
            </div>    
        </div>
    )
}

export default Header;