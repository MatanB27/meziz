
export const getLocalStorageItem = (key) => {
    switch(key){
        case 'date':
            return JSON.parse(localStorage.getItem('date'));
            
        case 'statistics':
            return JSON.parse(localStorage.getItem('statistics'));

        case 'is_played':
            return JSON.parse(localStorage.getItem('is_played'));

        case 'win':
            return JSON.parse(localStorage.getItem('win'));

        case 'lose':
            return JSON.parse(localStorage.getItem('lose'));

        case 'current_win':
            return JSON.parse(localStorage.getItem('current_win'));

        case 'current_word':
            return JSON.parse(localStorage.getItem('prev_word'));

        case 'num_of_guesses':
            return JSON.parse(localStorage.getItem('num_of_guesses'));
        case 'no_reset':
            return JSON.parse(localStorage.getItem('no_reset'));
    }
}

export const addToLocalStorage = (key, payload) => {
    payload = JSON.stringify(payload);
    localStorage.setItem(key, payload);
}

export const isSameDate = (currentDay, localStorageDate) => {
    if(currentDay === localStorageDate){
        return true;
    }else{
        return false
    }
}

export const addDataForNewPlayers = () => {
    const no_reset = localStorage.getItem('no_reset');
    if(!no_reset){
        addToLocalStorage('date', '');
        addToLocalStorage('lose', 0);
        addToLocalStorage('win', 0);
        addToLocalStorage('is_played', false);
        addToLocalStorage('current_win', false);
        addToLocalStorage('prev_word', '');
        addToLocalStorage('num_of_guesses', 0);
        addToLocalStorage('no_reset', true);
    }

}