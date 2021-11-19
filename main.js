class Mode {
    constructor(m) {
        this.m = m;
    }

    describe() {
        console.log(this);
    }

    produceResult() {
        console.log(`
        Borne inférieure "maximum" =
        Borne inférieure "moyenne" =

        Résultat LSA = ${this.LSA(false)}
        ratio LSA = 

        Résultat LPT = ${this.LPT()}
        ratio LPT =

        Résultat RMA = ${this.RMA()}
        ratio RMA =
        `);
    }

    findLowerBound() {
        return 4;
    }

    findUpperBound() {
        return 5;
    }

    LSA(useLPT) {
        let minorIndex;
        const machines = new Array(this.m).fill(0);
        console.log(`machines: ${[...machines]}`);
        const tasks = [...this.D];

        if (useLPT) tasks.sort().reverse();

        for (let i = 0; i < this.n; i++) {
            minorIndex = machines.indexOf(Math.min(...machines));
            machines[minorIndex] += tasks[i]; 
        }

        return Math.max(...machines); // Retourne la valeur maximum dans machines
    }

    LPT() {
        return this.LSA(true);
    }

    RMA() {
        let randomIndex;
        const machines = new Array(this.m).fill(0);
        const tasks = [...this.D];

        for (let i = 0; i < this.n; i++) {
            randomIndex = Math.floor(Math.random() * (this.m - 0)) + 0;
            machines[randomIndex] += tasks[i]; 
        }

        return Math.max(...machines);
    }

    calculateRatioLSA() {
        const maxValue = Math.max(this.findLowerBound(), this.findUpperBound());
        const result = this.LSA();

        return result / maxValue;
    }
}

class Im extends Mode {
    constructor(m) {
        super(m);
        this.n = Math.pow(m, 2) + 1; // Nombre de tâches (m^2 + 1)
        this.D = this.generateTasksDuration(); // Tâches
    }

    generateTasksDuration() {
        const tasks = new Array(this.n-1).fill(1, 0, this.n-1);
        tasks.push(this.m);

        return tasks;
    }
}

class IPrimeM extends Mode {
    constructor(m) {
        super(m);
        this.n = 2 * m + 1;
        this.D = this.generateTasksDuration();
    }

    generateTasksDuration() {
        let i = 0;
        let count = this.m;
        const tasks = new Array(this.n);

        while (i < tasks.length) {
            if (i >= 3 && i % 2 !== 0) {
                count++;
            }
            tasks[i] = count;
            i++;
        }
        
        return tasks;
    }
}

class IR extends Mode {
    constructor(m, n, dmin, dmax) {
        super(m);
        this.n = n;
        this.dmin = dmin;
        this.dmax = dmax;
        this.D = this.generateTasksDuration();
    }

    generateTasksDuration() {
        return Array.from({length: this.n}, () => Math.floor(Math.random() * (this.dmax - this.dmin + 1)) + this.dmin);
    }

    static getAverageRatio(arr) {
        let lsaRatio = 0;
        let lptRatio = 0;
        let rmaRatio = 0;

        for (let value of arr) {
            lsaRatio += value.LSA(false);
            lptRatio += value.LPT();
            rmaRatio += value.RMA();
        }

        lsaRatio /= arr.length;
        lptRatio /= arr.length;
        rmaRatio /= arr.length;

        console.log(`
        ratio moyen LSA = ${lsaRatio}
        ratio moyen LPT = ${lptRatio}
        ratio moyen RMA = ${rmaRatio}
        `);
    }
}

/* Genération d'une instance de type I'm */

//const m = 3;

//iPrimeM = new IPrimeM(m);
//iPrimeM.produceResult();

/* Genération aléatoire de plusieurs instances */

/* const m = 3;
const n = 9;
const k = 3;
const dmin = 1;
const dmax = 3;

const instances = [];

for (let i = 0; i < k; i++) {
    instances.push(new IR(m, n, dmin, dmax));
}

IR.getAverageRatio(instances); */

/* Cache ou affiche les champs en fonction de l'algorithme choisi */
document.querySelector("#algorithms").addEventListener("change", () => {
    let selected = document.querySelector("#algorithms")
              .options[document.querySelector("#algorithms").selectedIndex].value;

    document.querySelector("#algorithms").value = selected;
    if (selected === "rma") {
        document.querySelector("#n").setAttribute("type", "text");
        document.querySelector("#k").setAttribute("type", "text");
        document.querySelector("#dmin").setAttribute("type", "text");
        document.querySelector("#dmax").setAttribute("type", "text");
    } else {
        document.querySelector("#n").setAttribute("type", "hidden");
        document.querySelector("#k").setAttribute("type", "hidden");
        document.querySelector("#dmin").setAttribute("type", "hidden");
        document.querySelector("#dmax").setAttribute("type", "hidden");
    }
});

/* Fait parvenir les valeurs saisies par l'utilisateur */
document.querySelector("#submit").onclick = () => {
    let selected = document.querySelector("#algorithms")
              .options[document.querySelector("#algorithms").selectedIndex].value;

    switch (selected) {
        case "lsa":
            const m = document.querySelector("#m").valueAsNumber;
            generateIm(m);
            break;

        case "lpt":
            console.log("lpt");
            break;

        case "rma":
            console.log("rma");
            break;

        default:
            console.log("Choisissez un algorithme.");
            break;
    }
}

/* Genération d'une instance de type Im */

const generateIm = (m) => {
    const im = new Im(m);
    im.describe();
    im.produceResult();
    //im.produceResult();
}

//const m = 3;

//im = new Im(m);
//im.produceResult();

// TO-DO: Créer un switch pour changer l'instance en fonction du choix de l'utilisateur