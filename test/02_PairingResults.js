'use strict';

const chai = require('chai');
const expect = chai.expect;
const PairingResults = require('../src/PairingResults');

describe('PairingResults', () => {
    describe('#constructor(_possibleResultScores)', () => {
        it('creates an instance', () => {
            const instance = new PairingResults();

            expect(instance.DEFAULT_POSSIBLE_RESULT_SCORES).to.eql([
                [3, 0],
                [1, 1],
                [0, 3]
            ]);
            expect(instance.possibleResultScores).to.eql([
                [3, 0],
                [1, 1],
                [0, 3]
            ]);
        });
    });

    describe('generatePossiblePlayerScores(_pairings)', () => {
        it('creates an array of possible score outcomes based on the pairings', () => {
            const instance = new PairingResults();
            const result = instance.generatePossiblePlayerScores([2, 3, 0, 1]);

            expect(result).to.have.deep.members([
                [3, 3, 0, 0],
                [3, 1, 0, 1],
                [1, 1, 1, 1],
                [1, 3, 1, 0],
                [1, 0, 1, 3],
                [3, 0, 0, 3],
                [0, 3, 3, 0],
                [0, 1, 3, 1],
                [0, 0, 3, 3]
            ]);

            const instance2 = new PairingResults();
            const result2 = instance2.generatePossiblePlayerScores([1, 0, 3, 2]);

            expect(result2).to.have.deep.members([
                [3, 0, 3, 0],
                [3, 0, 1, 1],
                [3, 0, 0, 3],
                [1, 1, 3, 0],
                [1, 1, 1, 1],
                [1, 1, 0, 3],
                [0, 3, 3, 0],
                [0, 3, 1, 1],
                [0, 3, 0, 3]
            ]);

            const instance3 = new PairingResults([
                [10, 0],
                [6, 1],
                [1, 6],
                [0, 10]
            ]);
            const result3 = instance3.generatePossiblePlayerScores([2, 3, 0, 1]);

            expect(result3).to.have.deep.members([
                [10, 10, 1, 1],
                [10, 6, 1, 1],
                [6, 10, 1, 1],
                [6, 6, 1, 1],
                [10, 1, 1, 10],
                [6, 1, 1, 10],
                [10, 1, 1, 6],
                [6, 1, 1, 6],
                [1, 10, 10, 1],
                [1, 6, 10, 1],
                [1, 10, 6, 1],
                [1, 6, 6, 1],
                [1, 1, 10, 10],
                [1, 1, 6, 10],
                [1, 1, 10, 6],
                [1, 1, 6, 6]
            ]);
        });
    });
});
