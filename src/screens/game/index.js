import './index.scss';
import React, { useEffect, useState } from 'react';
import Word from '../../components/word';
import Keyboard from '../../components/keyboard';
import Header from '../../components/header';
import DrawMan from '../../components/draw-man';
// import calculateTimeLeft from '../../components/calculateTimeLeft';
import firebase, {addNewWords, getNewWord} from '../../firebase';
import {getLocalStorage, addToLocalStorage, isSameDate} from '../../local-storage';
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


    const [statistics, setStatistics] = useState(
            {
                is_played: false,
                current_win: '',
                winning: 0,
                losing: 0,
            }
        );

    useEffect(() => {
        const today = new Date();
        const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        
        const isPlayed = getLocalStorage('statistics')?.is_played;
        const date = getLocalStorage('date');
        
        if(!isSameDate(currentDate, date)){
            addToLocalStorage('date', currentDate);
            if(!isPlayed){
                addToLocalStorage('statistics', statistics);
            }
        }
        getNewWord();
    },[]);
    
    
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
                        <span className='stats-value'>x</span>
                    </div>
                    <div className='stats'>
                        <span className='stats-title losing'>Losing</span>
                        <span className='stats-value'>y</span>
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
            return(
                getEndGameTitle(`Congratulations, you won the game after ${numOfGuesses} guesses.`, isGameWon)
            )
        }else if(isGameEnd){
            return(
                getEndGameTitle(`Game over! you reached ${numOfGuesses} guesses and lost.`, isGameWon)
            )
        }
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