import './index.scss';
import React, { useEffect, useState } from 'react';
import Word from '../../components/word';
import Keyboard from '../../components/keyboard';
import Header from '../../components/header';
// import calculateTimeLeft from '../../components/calculateTimeLeft';
import firebase, {addNewWords, getNewWordWithFirebase} from '../../firebase';
import GoogleAd from '../../google-ad';
import {
    getLocalStorageItem,
    addToLocalStorage,
    isSameDate,
    addDataForNewPlayers,
    getKeyboardFromLS,
    } from '../../local-storage';
import {handleKeyPress, handleEndGame, handleWinGame} from "../../rules";
import {convertStringToArray, buildJson} from '../../functions'
function Game(){

    const [jsonWord, setJsonWord] = useState(
        {
            wordArr:[] //example: [{a: false}, {b: true}]
        });
    const [currentWord, setCurrentWord] = useState('');
    const [numOfGuesses, setNumOfGuesses] = useState(0);
    const [clickedKeys, setClickedKeys] = useState({});
    const [clickedKeysArr, setClickedKeysArr] = useState({
        wordArr:[]
    });
    const [isGameEnd, setGameEnd] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [render, setRender] = useState(false);
    const [winAmount, setWinAmount] = useState(0);
    const [loseAmount, setLoseAmount] = useState(0);
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        addDataForNewPlayers();
        getStarted();
    },[]);
    
    const getStarted = () => {
        const today = new Date();
        const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        setCurrentDate(currentDate);

        const isPlayed = getLocalStorageItem('is_played');
        const localStoageDate = getLocalStorageItem('date');
        const localStorageWord = getLocalStorageItem('current_word');
        const localStorageNumOfGuesses = getLocalStorageItem('num_of_guesses');
        const localStorageWinAmount = getLocalStorageItem('win');
        const localStorageLoseAmount = getLocalStorageItem('lose');
        const localStorageIsWon = getLocalStorageItem('current_win');
        const jsonWordLS = getLocalStorageItem('json_word');
        
        if(jsonWordLS){
            setClickedKeysArr(jsonWordLS);
            getKeyboardFromLS();
        }

        setWinAmount(localStorageWinAmount);
        setLoseAmount(localStorageLoseAmount);

        if(isSameDate(currentDate, localStoageDate)){
            if(isPlayed){
                // Show stats
                setCurrentWord(localStorageWord);
                setNumOfGuesses(localStorageNumOfGuesses);

                // Prev won or lose
                setIsGameWon(localStorageIsWon);
                if(localStorageIsWon){
                    setGameEnd(true);
                    setIsGameWon(true);
                    getEndGameTitle('text', true);
                }else{
                    setGameEnd(true);
                    setIsGameWon(false);
                    getEndGameTitle('text', false);
                }

            }else{
                // getNewWord();
                cleanKeyBoard();
                getNewWordWithFirebase(setCurrentWord, setJsonWord);
            }
        }else{
            cleanKeyBoard();
            // getNewWord();
            getNewWordWithFirebase(setCurrentWord, setJsonWord)
        }
    
    }
    
    const cleanKeyBoard = () => {
        const elements = document.getElementsByClassName('key');
        Object.values(elements).map((element) => {
            element.classList.remove('failed');
            element.classList.remove('success')
        })
    }

    // OLD
    // const getNewWord = () => {
    //     fetch(
    //         "https://random-word-api.herokuapp.com/word")
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 const word  = getWord(data[0]);
    //                 setCurrentWord(word);
    //                 setJsonWord(buildJson(convertStringToArray(word)));
                
    //     })
    // }

    const handleKeyboard = (e) => {
        let currKey = e.target.getAttribute('data-key');
        let isCorrect = handleKeyPress(jsonWord, currKey);

        if(isCorrect) {
            setIsGameWon(handleWinGame(jsonWord));
            setGameEnd( handleWinGame(jsonWord))
            setRender(!render);
                
        }else{
            setNumOfGuesses(numOfGuesses + 1);   
            setGameEnd(handleEndGame(numOfGuesses + 1));
                
        }
        
        clickedKeys[currKey] = isCorrect;
        setClickedKeysArr({'wordArr':clickedKeys});  
    }
    
   
    /*----------------------------------------------------------------
        Not complex as it seems, just itterate through
        {
            wordArr: [
                        {a: false},
                        {b: true},
                        ...
                     ]
        }
    ----------------------------------------------------------------*/

    const getContainers = () => {
        return(
            Object.entries(jsonWord.wordArr).map(([index, json]) => {
                return(    
                    Object.entries(json).map(([key, value]) => {
                        return(
                            <>
                                <Word
                                    className={'additional'}
                                    word={key}
                                    key={index}
                                    isShown={value}
                                />
                            </>
                        );
                    })
                    
                );
            })
        );
    }


    const handleShare = () => {
        navigator.clipboard.writeText('I won current Fuzzle after '  + numOfGuesses + ' guesses!');
        let copyElement = document.getElementById('copy-result');
        copyElement.classList.remove('disabled');

        setTimeout(() => {
            copyElement.classList.add('disabled');
        }, 2000)
    }

    const getEndGameTitle = (text, winning) => {
        return(
            <>
                <span className={(winning ? 'winning' : 'losing') + " subtitle wrapper"}>
                    {text}
                </span>
                <span className={'subtitle'}>
                    {   winning &&
                        <span>Click <span className={'share-button'} onClick={handleShare}>Here</span> To share your result</span>
                    }
                    <br/>
                    Today FuzZle was {currentWord}
                    <br/>
                    Come back again tomorrow for another FuzZle!
                </span>

                <div className='stats-wrapper'>
                    <div className='stats'>
                        <span className='stats-title winning'>Winning</span>
                        <span className='stats-value'>{winAmount}</span>
                    </div>
                    <div className='stats'>
                        <span className='stats-title losing'>Losing</span>
                        <span className='stats-value'>{loseAmount}</span>
                    </div>
                </div>
            </>
            
        )
    }
    const getTitle = () => {
        if(!isGameEnd){
            return(
                <span className="sub-title">
                    You have guesses {numOfGuesses} out of 10 times.
                </span>
            )
        }
        
        if(isGameWon){  
            handleGameEnd(isGameWon);
            return(
                getEndGameTitle(`Congratulations, you won the game after ${numOfGuesses} guesses.`, isGameWon)
            )
        }else if(isGameEnd){
            handleGameEnd(isGameWon);
            return(
                getEndGameTitle(`Game over! you reached ${numOfGuesses} guesses and lost.`, isGameWon)
            )
        }

        
    }

    const handleGameEnd = (isWon) => {

        const is_played = getLocalStorageItem('is_played');
        const localStoageDate = getLocalStorageItem('date');
        
        addToLocalStorage('prev_word', currentWord);
        addToLocalStorage('num_of_guesses', numOfGuesses);
        addToLocalStorage('json_word', clickedKeysArr);

        let win = getLocalStorageItem('win');
        let lose = getLocalStorageItem('lose');
        
        /*
             In case user refresh the page
             Or after a new date 
             he wont get more loses or wins 
        */

        if(!is_played || !isSameDate(currentDate, localStoageDate)){          
            if(isWon){
                console.log('won');
                addToLocalStorage('current_win', true);
                addToLocalStorage('win', ++win);
                addToLocalStorage('lose', lose);
                setWinAmount(win);
            }else{
                console.log('lose');
                addToLocalStorage('current_win', false);
                addToLocalStorage('lose', ++lose);
                addToLocalStorage('win', win);
                setLoseAmount(lose);
            }
            addToLocalStorage('date', currentDate);
        }
        addToLocalStorage('is_played', true);
    }

    return(
        <div className="game-wrapper">
            <Header
                numOfGuesses={numOfGuesses}
            />
            <div id="copy-result" className="copy-result disabled">
                Copy to clipboard
            </div>
            <div className="title-wrapper">
                {   
                    getTitle()
                }
                
            </div>
            <GoogleAd/>
            {/* <div className="person-wrapper">
                <DrawMan
                    numOfGuesses={numOfGuesses}
                />
            </div> */}
            {
                <>
                    <div className="words-wrapper">
                        {
                            getContainers()
                        }           
                    </div> 
                    <div className={"keyboard-wrapper " + (isGameEnd ? 'disabled' : '')
                + (!currentWord ? 'disabled' : '')} >
                        <Keyboard
                            onClick={(e) => handleKeyboard(e)}
                            clickedKeys={clickedKeys}
                        />
                    </div>
                </>
            }
            
            
        </div>
    );
}

export default Game;