

export const handleKeyPress = (jsonWord, keyPress) => {
    let isSuccess = false;

    Object.entries(jsonWord.wordArr).map(([index, json]) => {
        Object.keys(json).map((word) => {
            if(word.toUpperCase() === keyPress){
                isSuccess = true;
                json[word] = true;
            }
        })
    })
    if (isSuccess)  return true;
    else            return false;
}

const LAST_LEVEL = 10;

export const handleEndGame = (numOfGuesses) => numOfGuesses === LAST_LEVEL && true        


export const handleWinGame = (jsonWord) => {
    let isPlayerWin = true;
    Object.entries(jsonWord.wordArr).map(([index, json]) => {
        Object.values(json).map((isShown) => {
            if(!isShown){
                isPlayerWin = false;
            }
        })
    })
    return isPlayerWin;
}