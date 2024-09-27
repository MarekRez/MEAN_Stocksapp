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
palindrom("kajak")