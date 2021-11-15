/* Instance de type Im */



function printInstance(inst) {
    console.log(`
        Machines : ${inst[0]}
        Durée des tâches : ${inst[1]}
    `);
}

function generateIm() {
    const m = 3; // Nombre de machines
    const n = Math.pow(m, 2) + 1 // Nombre de tâches (m^2 + 1)
    const M = Array(m); // Machines
    const D = Array(n) // Durée des tâches

    for (let i = 0; i < n - 1; i++) {
        D[i] = 1;
    }

    D[n - 1] = m;
}

/* Instance de type I'm */

function generateImPrime() {
    const m = 9; // Nombre de machines
    const n = 2 * m + 1 // Nombre de tâches (2m + 1)
    const M = Array(m); // Machines
    const D = Array(n) // Durée des tâches

    let i = 0;
    let count = m;

    while (i < D.length) {
        if (i >= 3 && i % 2 !== 0) {
            count++;
        }
        D[i] = count;
        i++;
    } 
}

/* Instance de type IR */

function generateIR() {
    const m = 4; // Nombre de machines
    const n = 9; // Nombre de tâches (2m + 1)
    const k = 2; // Nombre d'instances

    const dmin = 1;
    const dmax = 3;
    
    const I = []; // Tableau d'instances
    const M = new Array(m).fill(0); // Tableau de machines
    //const D = new Array(n).fill(Math.floor(Math.random() * (dmax - dmin + 1)) + dmin); // Tableau des durées 
    const D = Array.from({length: n}, () => Math.floor(Math.random() * (dmax - dmin + 1)) + dmin);

    for (let i = 0; i < k; i++) {

    }

    /* for (let i = 0; i < m; i++) {
        M.push(0);
    } */

    /* new Array(len).fill(0); */

/*     for (let i = 0; i < n; i++) {
        D.push(Math.floor(Math.random() * (dmax - dmin + 1)) + dmin);
    } */

    console.log("Nb machines : " + M);
    console.log("Durée  : " + D);

/*     let instance = [];
    instance.push(M);
    instance.push(D);

    I.push(instance);

    console.log("Nb machines : " + m);
    console.log("Nb tâches : " + n);
    console.log(`Machines : [${instance[0]}]`);
    console.log(`Durée des tâches : [${instance[1]}]`);

    printInstance(instance); */
    
    // console.log(`Instance : [${instance}]`);
}

generateIR();