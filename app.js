"use strict";

import {Im, IPrimeM, IR} from "./mode.js"

/* Cache ou affiche les champs en fonction de l'algorithme choisi */
document.querySelector("#instance-type").addEventListener("change", () => {
    let selected = document.querySelector("#instance-type")
              .options[document.querySelector("#instance-type").selectedIndex].value;

    document.querySelector("#instance-type").value = selected;
    if (selected === "ir") {
        document.querySelector("#n").setAttribute("type", "number");
        document.querySelector("#k").setAttribute("type", "number");
        document.querySelector("#dmin").setAttribute("type", "number");
        document.querySelector("#dmax").setAttribute("type", "number");
    } else {
        document.querySelector("#n").setAttribute("type", "hidden");
        document.querySelector("#k").setAttribute("type", "hidden");
        document.querySelector("#dmin").setAttribute("type", "hidden");
        document.querySelector("#dmax").setAttribute("type", "hidden");
    }
});

/* Fait parvenir les valeurs saisies par l'utilisateur */
document.querySelector("#submit").onclick = () => {
    let selected = document.querySelector("#instance-type")
                .options[document.querySelector("#instance-type").selectedIndex].value;
    const m = document.querySelector("#m").valueAsNumber;
    
    switch (selected) {
        
        case "im":
            generateIm(m);
            break;

        case "i-prime-m":
            generateIPrimeM(m);
            break;

        case "ir":
            const n = document.querySelector("#m").valueAsNumber;
            const k = document.querySelector("#k").valueAsNumber;
            const dmin = document.querySelector("#dmin").valueAsNumber;
            const dmax = document.querySelector("#dmax").valueAsNumber;
            
            generateIR(m, n, k, dmin, dmax);
            break;

        default:
            console.log("Choisissez un algorithme.");
            break;
    }
}

/* Fonction pour genérer instance de type Im */
const generateIm = m => {
    const im = new Im(m);
    im.produceResult();
}

/* Fonction pour genérer instance de type I'm */
const generateIPrimeM = m => {
    const iPrimeM = new IPrimeM(m);
    iPrimeM.produceResult();
}


/* Fonction pour genérer instances de type IR */
const generateIR = (m, n, k, dmin, dmax) => {
    const instances = [];

    for (let i = 0; i < k; i++) {
        instances.push(new IR(m, n, dmin, dmax));
    }

    IR.getAverageRatio(instances);
}