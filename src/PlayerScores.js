'use strict';

class PlayerScores {
    constructor(_finalPlayerScores) {
        this.finalPlayerScores = _finalPlayerScores;
        this.playerScores = new Array(_finalPlayerScores.length).fill(0);
    }

    appendRoundResults(_scoresToAppend, _bReturnFalseOnInvalid) {
        if (_scoresToAppend.length !== this.playerScores.length) {
            throw new Error(`Invalid number of results, expected ${
                this.playerScores.length}, but recieved ${_scoresToAppend.length}`);
        }

        for (let _i = 0, _iMax = _scoresToAppend.length; _i < _iMax; _i++) {
            this.playerScores[_i] += _scoresToAppend[_i];

            if (this.playerScores[_i] > this.finalPlayerScores[_i]) {
                if (_bReturnFalseOnInvalid === true) {
                    return false;
                }

                throw new Error(`Invalid score for player ${_i}`);
            }
        }

        return true;
    }
}

module.exports = PlayerScores;