export const getLocalStorage = (key) => {
    switch(key){
        case 'date':
            return localStorage.getItem('date');
        case 'statistics':
            return localStorage.getItem('statistics');
    }
}

export const addToLocalStorage = (key, payload) => {
    localStorage.setItem(key, payload);
}

export const isSameDate = (currentDay, localStorageDate) => {
    if(currentDay === localStorageDate){
        return true;
    }else{
        return false
    }
}