import './index.scss';
import React, { useEffect, useState } from 'react';
import Word from '../../components/word';
import Keyboard from '../../components/keyboard';
import { generateSlug } from "random-word-slugs";
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
    useEffect(() => {
        const generatedWord = generateSlug(1, { format: "title" });;
        const word  = getWord(generatedWord);
        setCurrentWord(word);
        console.log(word);
        setJsonWord(buildJson(convertStringToArray(word)));
    },[]);
    
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


    const getEndGameTitle = () => {
        if(!isGameEnd){
            return(
                <span className="sub-title">
                    You have guesses {numOfGuesses} out of 10 times.
                </span>
            )
        }

        if(isGameWon){
            return(
                <span className="winning subtitle">
                    Congratulations, you won the game after {numOfGuesses} guesses.
                    <br/>
                    Click <span className="share-button">Here</span> to share your results!
                    <br/>
                        <span>The word was {currentWord}</span>
                    <br/>
                    <span className="">Next word in Xx:Xx:Xx</span>
                </span>
            )
        }else if(isGameEnd){
            return(
                <span className="losing subtitle">
                    You reached {numOfGuesses} guesses and lost the game!
                    <br/>
                    Click <span className="share-button">Here</span> to share your results!
                    <br/>
                        <span>The word was {currentWord}</span>
                    <br/>
                    Next word in xx:xx:xx
                </span>
            )
        }
    }

    return(
        <div className="game-wrapper">
            <div className="title-wrapper">
                <span className="main-title">
                    Guess the word
                </span>
                {   
                    getEndGameTitle()
                }
                
            </div>
            <div className="person-wrapper">

            </div>
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
        </div>
    );
}

export default Game;