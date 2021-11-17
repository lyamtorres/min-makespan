class Mode {
    constructor(_m) {
        this.m = _m;
    }

    describe() {
        console.log(this);
    }

    produce() {
        console.log(`
        Borne inférieure "maximum" =
        Borne inférieure "moyenne" =

        Résultat LSA = ${this.LSA()}
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

class ImMode extends Mode {
    constructor(_m) {
        super(_m);
        this.n = Math.pow(_m, 2) + 1; // Nombre de tâches (m^2 + 1)
        this.D = this.getTasks(); // Tâches
    }

    getTasks() {
        const tasks = new Array(this.n-1).fill(1, 0, this.n-1);
        tasks.push(this.m);

        return tasks;
    }
}

class IPrimeMMode extends Mode {
    constructor(_m) {
        super(_m);
        this.n = 2 * _m + 1;
        this.D = this.getTasks();
    }

    getTasks() {
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

class IRMode {
    constructor(_m, _n, _k, _dmin, _dmax) {
        this.m = _m;
        this.n = _n;
        this.k = _k;
        this.dmin = _dmin;
        this.dmax = _dmax;
        this.M = new Array(_m).fill(0);
        this.D = this.getTasks();
        this.I = new Array(_k);
    }

    getTasks() {
        return Array.from({length: this.n}, () => Math.floor(Math.random() * (this.dmax - this.dmin + 1)) + this.dmin);
    }
}

/* Instantiation d'objet */

/* const inst = new ImMode(3);
inst.produce(); */

const inst = new IPrimeMMode(3);
inst.describe();
inst.produce();


