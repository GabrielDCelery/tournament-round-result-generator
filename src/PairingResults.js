'use strict';

const DEFAULT_POSSIBLE_RESULT_SCORES = [
    [3, 0],
    [1, 1],
    [0, 3]
];

class PairingResults {
    constructor(_possibleResultScores) {
        this.DEFAULT_POSSIBLE_RESULT_SCORES = DEFAULT_POSSIBLE_RESULT_SCORES;
        this.possibleResultScores = _possibleResultScores || this.DEFAULT_POSSIBLE_RESULT_SCORES;
    }

    generatePossiblePlayerScores(_pairings) {
        const _possibleScores = [];
        const _playersCovered = {};

        _pairings.forEach((_pairing, _player) => {

        });
    }
}

module.exports = PairingResults;