'use strict';

const chai = require('chai');
const expect = chai.expect;
const PlayerScores = require('../src/PlayerScores');

describe('PlayerScores', () => {
    describe('#constructor(_finalPlayerScores)', () => {
        it('creates an instance', () => {
            const instance = new PlayerScores([1, 2, 3, 4, 5]);

            expect(instance.finalPlayerScores).to.eql([1, 2, 3, 4, 5]);
            expect(instance.playerScores).to.eql([0, 0, 0, 0, 0]);
        });
    });

    describe('appendRoundResults(_scoresToAppend, _bReturnFalseOnInvalid)', () => {
        it('does something', () => {

        });
    });
});
