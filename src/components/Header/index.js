
import './index.scss';
import QuestionMark from '../../images/circular-question-mark.png';

function Header(){
    return(
        <div className="header-wrapper">
            <div className="header-title">FuzZle</div>
            <img className="about-img"
                src={QuestionMark}/>
                
        </div>
    )
}

export default Header;