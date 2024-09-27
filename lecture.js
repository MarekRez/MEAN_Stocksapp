/**************************************************************************************
 *                                                                                    *
 *        Please do not write anything in this file.                                  *
 *        This file is for lecture purposes only. All changes will be ignored.        *
 *                                                                                    *
 **************************************************************************************/

const person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
const personJson = JSON.stringify(person);


const person2Json = '{"firstName":"John","lastName":"Doe","age":50,"eyeColor":"blue"}';
const person2 = JSON.parse(person2Json);

function myFunction(p1, p2) {
    return p1 * p2;
}

let myFunction2 = (p1, p2) => {
    return p1 * p2;
}

console.log(person);
console.log(personJson);

console.log('-----------------------');

console.log(person2Json);
console.log(person2);


console.log(Math.round(5.4));

console.log(myFunction(3, 4));
console.log(myFunction2(3, 4));

function letterCalculation(sentence) {
    const maxSentenceLength = 255;

    if (sentence.length > maxSentenceLength) {
        console.log(`Veta moze mat max ${maxSentenceLength} znakov.`);
        return;
    }

    const result = {};

    for (const char of sentence.toLowerCase()) {
        result[char] = result[char] ? result[char] + 1 : 1;
    }

    console.log(`Pre vetu: ${sentence}:`);
    for (const letter in result) {
        console.log(letter, result[letter]);
    }
}

letterCalculation('Alabama');
letterCalculation('AlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabamaAlabama');

function palindrome(sentence) {
    let sentenceWithoutSpaces = sentence.replaceAll(' ', '').toLowerCase();
    let text = '';
    for (let i = sentenceWithoutSpaces.length - 1; i >= 0; i--)  {
        text = text + sentenceWithoutSpaces[i]
    }

    console.log(`Veta: ${sentence}: ${text === sentenceWithoutSpaces ? 'je' : 'nie je'} palindrom.`);
}

palindrome('Kobyla ma maly bok');
