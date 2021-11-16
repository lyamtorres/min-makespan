// Problème : Je ne peux pas exécuter les méthodes l'une après l'autre, les données sont modifiées

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

        Résultat LSA = ${this.executeLSA()}
        ratio LSA = 

        Résultat LPT = ${this.executeLPT()}
        ratio LPT =

        Résultat RMA =
        ratio RMA =
        `);
    }

    findLowerBound() {
        return 4;
    }

    findUpperBound() {
        return 5;
    }

    executeLSA() {
        let minorIndex;

        for (let i = 0; i < this.n; i++) {
            minorIndex = this.M.indexOf(Math.min(...this.M));
            this.M[minorIndex] += this.D[i]; 
        }
        console.log(this.M);

        //return Math.max(...this.M); // Retourne la valeur maximum dans M
    }

    calculateRatioLSA() {
        const maxValue = Math.max(this.findLowerBound(), this.findUpperBound());
        const result = this.executeLSA();

        return result / maxValue;
    }

    executeLPT() {
        this.D.sort().reverse();
        this.executeLSA();
    }
}

class ImMode extends Mode {
    constructor(_m) {
        super(_m);
        this.n = Math.pow(_m, 2) + 1; // Nombre de tâches (m^2 + 1)
        this.M = new Array(_m).fill(0); // Machines
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
        this.M = new Array(_m).fill(0);
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

// Instantiation d'objet

const inst = new ImMode(3);

// inst.executeLSA();
inst.executeLPT();

