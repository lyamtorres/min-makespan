"use strict";

class Mode {
    constructor(m) {
        this.m = m;
    }

    describe() {
        console.log(this);
    }

    produceResult() {
        const maxLowerBound = this.lowerBound();
        const mediumLowerBound = this.upperBound();
        const maxLowerBoundValue = Math.max(maxLowerBound, mediumLowerBound);

        const lsa = this.LSA(false);
        const lpt = this.LPT();
        const rma = this.RMA();

        const lsaRatio = lsa / maxLowerBoundValue
        const lptRatio = lpt / maxLowerBoundValue;
        const rmaRatio = rma / maxLowerBoundValue;

        console.log(`
        Borne inférieure "maximum" = ${maxLowerBound}
        Borne inférieure "moyenne" = ${mediumLowerBound}

        Résultat LSA = ${lsa}
        ratio LSA = ${lsaRatio}

        Résultat LPT = ${lpt}
        ratio LPT = ${lptRatio}

        Résultat RMA = ${rma}
        ratio RMA = ${rmaRatio}
        `);
    }

    lowerBound() {
        return Math.max(...this.D);
    }

    upperBound() {
        const reducer = (accumulator, curr) => accumulator + curr;
        return this.D.reduce(reducer) / 2;
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
        let mediumLsaRatio = 0;
        let mediumLptRatio = 0;
        let mediumRmaRatio = 0;

        for (let value of arr) {
            mediumLsaRatio += value.LSA(false);
            mediumLptRatio += value.LPT();
            mediumRmaRatio += value.RMA();
        }

        mediumLsaRatio /= arr.length;
        mediumLptRatio /= arr.length;
        mediumRmaRatio /= arr.length;

        console.log(`
        ratio moyen LSA = ${mediumLsaRatio}
        ratio moyen LPT = ${mediumLptRatio}
        ratio moyen RMA = ${mediumRmaRatio}
        `);
    }
}

export {
    Im,
    IPrimeM,
    IR
}