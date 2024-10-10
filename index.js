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
            if (veta[i] == !pismena[j])

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
function mocninca(a,n){
    let vysledok = a;
    for (n; n>1; n--)
     {vysledok = vysledok*a}
    console.log(vysledok)
}
//mocninca(-2,5)
//task5
function fibonacci(n){
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
