'use strict';

const chai = require('chai');
const expect = chai.expect;
const Round = require('../src/Round');

describe('Round', () => {
    describe('#constructor (_config)', () => {
        it('creates a default instance', () => {
            const instance = new Round();

            expect(instance.pairings).to.deep.equal([]);
            expect(instance.numOfPlayers).to.deep.equal(0);
            expect(instance.config).to.deep.equal({
                scoreForBye: 3,
                possibleResultsForPair: [
                    [3, 0],
                    [1, 1],
                    [0, 3]
                ]
            });
        });
    });

    describe('::setPairings', () => {
        it('sets the pairings for the round', () => {
            const instance = new Round().setPairings([
                [0, 1],
                [2, 3],
                [4]
            ]);

            expect(instance.pairings).to.deep.equal([
                [0, 1],
                [2, 3],
                [4]
            ]);
            expect(instance.numOfPlayers).to.eql(5);
        });
    });

    describe('::_generatePossiblePairingResults ()', () => {
        it('generates an array of possible score results based on the pairings', () => {
            const instance = new Round().setPairings([
                [1, 3],
                [4],
                [2, 5],
                [6, 7]
            ]);

            expect(instance._generatePossiblePairingResults()).to.deep.equal([
                [{
                    '1': 3,
                    '3': 0
                }, {
                    '1': 1,
                    '3': 1
                }, {
                    '1': 0,
                    '3': 3
                }],
                [{
                    '4': 3
                }],
                [{
                    '2': 3,
                    '5': 0
                }, {
                    '2': 1,
                    '5': 1
                }, {
                    '2': 0,
                    '5': 3
                }],
                [{
                    '6': 3,
                    '7': 0
                }, {
                    '6': 1,
                    '7': 1
                }, {
                    '6': 0,
                    '7': 3
                }]
            ]);
        });
    });

    describe('::generatePossibleResults ()', () => {
        it('creates an array of all the possible player scores based on the pairings', () => {
            const instance = new Round().setPairings([
                [0, 2],
                [1, 4],
                [3]
            ]);

            expect(instance.generatePossibleResults())
                .to.have.deep.members([
                    [3, 3, 0, 3, 0],
                    [3, 1, 0, 3, 1],
                    [3, 0, 0, 3, 3],
                    [1, 3, 1, 3, 0],
                    [1, 1, 1, 3, 1],
                    [1, 0, 1, 3, 3],
                    [0, 3, 3, 3, 0],
                    [0, 1, 3, 3, 1],
                    [0, 0, 3, 3, 3]
                ]);
        });
    });
});
