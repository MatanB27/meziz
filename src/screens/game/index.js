import './index.scss';
import React, { useEffect, useState } from 'react';
import Word from '../../components/word';
import Keyboard from '../../components/keyboard';
import Header from '../../components/header';
import DrawMan from '../../components/draw-man';
// import calculateTimeLeft from '../../components/calculateTimeLeft';
import firebase, {addNewWords, getNewWord} from '../../firebase';
import {getLocalStorageItem, addToLocalStorage, isSameDate} from '../../local-storage';
import {handleKeyPress, handleEndGame, handleWinGame} from "../../rules";

function Game(){

    const [jsonWord, setJsonWord] = useState(
        {
            wordArr:[] //example: [{a: false}, {b: true}]
        });
    const [currentWord, setCurrentWord] = useState('');
    const [numOfGuesses, setNumOfGuesses] = useState(0);
    const [clickedKeys, setClickedKeys] = useState({});
    const [isGameEnd, setGameEnd] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [render, setRender] = useState(false);
    const [winAmount, setWinAmount] = useState(0);
    const [loseAmount, setLoseAmount] = useState(0);

    useEffect(() => {
        getStarted();
    },[]);
    
    const getStarted = () => {
        const today = new Date();
        const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        const isPlayed = getLocalStorageItem('is_played');
        const localStoageSate = getLocalStorageItem('date');
        const localStorageWord = getLocalStorageItem('current_word');
        const localStorageNumOfGuesses = getLocalStorageItem('num_of_guesses');
        const localStorageWinAmount = getLocalStorageItem('win');
        const localStorageLoseAmount = getLocalStorageItem('lose');
        const localStorageIsWon = getLocalStorageItem('current_win');
        
        if(isSameDate(currentDate, localStoageSate)){
            if(isPlayed){
                setCurrentWord(localStorageWord);
                setNumOfGuesses(localStorageNumOfGuesses);
                setIsGameWon(localStorageIsWon);

                if(localStorageWinAmount){
                    setWinAmount(localStorageWinAmount);
                }else{
                    setWinAmount(0);
                }

                if(localStorageLoseAmount){
                    setLoseAmount(localStorageLoseAmount);
                }else{
                    setLoseAmount(0);
                }
                
                
                const currentWin = getLocalStorageItem('current_win')?.current_win;
                if(currentWin){
                    setGameEnd(true);
                    getEndGameTitle('text', true);
                }else{
                    setGameEnd(true);
                    getEndGameTitle('text', false);
                }
            }else{
                getNewWord();
            }
        }else{
            getNewWord();
            addToLocalStorage('date', currentDate);
        }
    }
    
    const getNewWord = () => {
        fetch(
            "https://random-word-api.herokuapp.com/word")
                .then((res) => res.json())
                .then((data) => {
                    const word  = getWord(data[0]);
                    setCurrentWord(word);
                    setJsonWord(buildJson(convertStringToArray(word)));
                
        })
    }

    const buildJson = (wordArr) => {
        let json = {wordArr:[]}
        wordArr.forEach(word => {
            const payload = {[word]: false}
            json.wordArr.push(payload)
        })
        return json;
    }

    const convertStringToArray = (word) => {
        return word.split('');
    }

    const getWord = (word) => word;

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
        addToLocalStorage('prev_word', currentWord);
        addToLocalStorage('num_of_guesses', numOfGuesses);
        const is_played = getLocalStorageItem('is_played');
        console.log('win', winAmount);
        console.log('lose', loseAmount);
        if(!is_played){
            let win = getLocalStorageItem('win');
            let lose = getLocalStorageItem('lose');
            if(isWon){
                addToLocalStorage('current_win', true);
                

                if(!win){
                    addToLocalStorage('win', 1);
                    setWinAmount(1);
                }else{
                    addToLocalStorage('win', ++win);
                    setWinAmount(win);
                }
                if(!lose){
                    setLoseAmount(0);
                }else{
                    setLoseAmount(lose);
                }
        
            }else{
                addToLocalStorage('current_win', false);
                
                if(!lose){
                    addToLocalStorage('lose', 1);
                    setLoseAmount(1);
                }else{
                    addToLocalStorage('lose', ++lose);
                    setLoseAmount(lose);
                }

                if(!win){
                    setWinAmount(0);
                }else{
                setWinAmount(win)
                }
            }
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
            {/* <div className="person-wrapper">
                <DrawMan
                    numOfGuesses={numOfGuesses}
                />
            </div> */}
            {
                currentWord ? 
                    <>
                    <div className="words-wrapper">
                        {
                            getContainers()
                        }           
                    </div> 
                    <div className={"keyboard-wrapper " + (isGameEnd ? 'disabled' : '')} >
                        <Keyboard
                            onClick={(e) => handleKeyboard(e)}
                            clickedKeys={clickedKeys}
                        />
                    </div>
                    </>
                    : 
                    <div className="loading">Loading...</div>
            }
            
            
        </div>
    );
}

export default Game;