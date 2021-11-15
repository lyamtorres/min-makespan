class Im {
    constructor(_m) {
        this.m = _m; // Nombre de machines
        this.n = Math.pow(_m, 2) + 1; // Nombre de tâches (m^2 + 1)
        this.M = new Array(_m).fill(0); // Machines
        this.D = this.getTasks(); // Tâches
    }

    getTasks() {
        const tasks = new Array(this.n-1).fill(1, 0, this.n-1);
        tasks.push(this.m);

        return tasks;
    }

    produceResults() {
        console.log(`
        Borne inférieure "maximum" =
        Borne inférieure "moyenne" =

        Résultat LSA =
        ratio LSA =

        Résultat LPT =
        ratio LPT =

        Résultat RMA =
        ratio RMA =
        `);

        return 1;
    }
}

class IPrimeM {
    constructor(_m) {
        this.m = _m;
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

class IR {
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

const inst = new Im(4);
/* console.log(inst.m);
console.log(inst.n);
console.log(inst.M);
console.log(inst.D); */
inst.showResults();
