import './index.scss'

function Popup(props){

    const {
        numOfGuesses,
        setIsPopup,
        isPopup,
    } = props;

    return(
        <div className={"popup-wrapper " + (!isPopup ? 'disabled' : '')}>
            <div className={"black-screen " + (!isPopup ? 'disabled' : '')} 
                onClick={() => setIsPopup(false)}></div>
            <div className={'popup '  + (!isPopup ? 'disabled' : '')}>
                <div className='popup-text-wrapper'>
                    <span className="popup-title">How to play</span>
                    <span className='popup-text'>
                        Each day you will get a new FuzZle
                        <br/><br/>
                        You have 10 guesses each game.
                        <br/><br/>
                        Your goal is to find out what the current FuzZle is 
                        with the least amount of guesses.
                        <br/><br/>
                        Good luck!
                        <span className='company'>FuzZle</span>
                    </span>
                </div>
                
            </div>
        </div>
    );
    
}

export default Popup;