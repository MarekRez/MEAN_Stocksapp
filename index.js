// TODO: For students ...
function BMI_index(vyska, vaha)
{
    let vysledok;
    const spodHranica = 19
    const vrchHranica = 25
    let bmi = Math.floor(vaha/(vyska^2)*100)/100;
    if (bmi<=spodHranica){
        vysledok = "podvaha";
    }
    else if (bmi>spodHranica && bmi<=vrchHranica){
        vysledok = "pohode"
    }
    else{
        vysledok = "obezita"
    }
    console.log(`tvoje BMI je ${vysledok}`);
}
//BMI_index(187, 72);

//Task 2

function pocitaj_slova(veta) {
    let pismena = []
    let dlzka = veta.length;
    for (let i = 0; i < dlzka; i++) {
        for (let j = 0; j < pismena.length; j++) {
            if (veta[i] === !pismena[j])

                console.log(veta[i])
        }
    }
}
//pocitaj_slova("Alabama")

function palindrom(veta){
    let noveSlovo = "";
    for (let i = veta.length-1; i >= 0; i--) {
       noveSlovo += veta[i]
    }
    console.log(noveSlovo)
    if (noveSlovo===veta){
        console.log("Je to palindrom!")
    }
    else{
        console.log("Nie je to palindrom!")
    }
}
//palindrom("kajak")

//task4
function mocnina(a,n){
    let vysledok = a;
    for (n; n>1; n--)
     {vysledok = vysledok*a}
    console.log(vysledok)
}
//mocnina(-2,5)
//task5
function fibonacci(n){
    if (n<3){
        return "Cislo musi byt vacsie ako 2";
    }
    let a = 0;
    let b= 1;
    let vysledok = '0, 1'
    for (let i = n-2; i>0; i--){
        let nasledujuci = a+b;
        vysledok= vysledok + ', ' + nasledujuci;
        a=b;
        b=nasledujuci;
        }
    return vysledok;
}
//console.log(fibonacci(11))
//task6
function factorial(n) {
    if (n <= 0 ) {
        return "Zadaj celé číslo > 0";
    }
    let vysledok = 1;
    let kroky = '';
    for (let i = n; i > 0; i--) {
        vysledok *= i;
        kroky += i + (i > 1 ? '.' : '');
    }
    return `${n}! = ${kroky} = ${vysledok}`;
}
//console.log(factorial(5));
//task7
function taxi(km, cakanieMin, znecistenie) {
    const mesto = 1.50;
    let extra = 0;
    let cakanie = 0;
    let znecist = 0;
    if (km > 5) {
        extra = (km - 5) * 0.75;
    }
    cakanie = (cakanieMin / 60) * 10;
    if (znecistenie === 'a') {
        znecist = 20;
    }
    const total = mesto + extra + cakanie + znecist;
    return total.toFixed(2) + ' €';
}
//console.log(taxi(15, 5, 'n'));
