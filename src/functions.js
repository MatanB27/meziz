export function buildJson (wordArr) {
    let json = {wordArr:[]}
    wordArr.forEach(word => {
        const payload = {[word]: false}
        json.wordArr.push(payload)
    })
    return json;
}

export function convertStringToArray (word)  {
    return word.split('');
}