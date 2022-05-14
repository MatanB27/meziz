import './index.scss';
import React, { useEffect, useState } from 'react';
import Word from '../../components/word';
import Keyboard from '../../components/keyboard';
import { generateSlug } from "random-word-slugs";
import Header from '../../components/header';
import DrawMan from '../../components/draw-man';
import firebase from '../../firebase';

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
        setJsonWord(buildJson(convertStringToArray(word)));

        const db = firebase.firestore();
        const words = db.collection('words');
        
        const MAX = 1095;
        for(let i = 0; i < MAX; i++){

        //TODO: USE ONLY FOR NEW WORDS!!
        // fetch(
        //     "https://random-word-api.herokuapp.com/word")
        //                 .then((res) => res.json())
        //                 .then((data) => {
        //                     const payload = {word: data[0]}
                        
        //                         words.add(payload);
        //                 })
        //             }
        
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
                    Next FuzZle in Xx:xX:Xx
                </span>
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
            <div className="person-wrapper">
                <DrawMan
                    numOfGuesses={numOfGuesses}
                />
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