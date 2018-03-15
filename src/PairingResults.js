'use strict';

const crypto = require('crypto');

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
        const _scoresCovered = {};

        _pairings.forEach((_opponent, _player) => {
            const _possiblePairingResults = [];

            this.possibleResultScores.forEach(_possibleResultScore => {
                const _possiblePairingResult = new Array(_pairings.length).fill(0);

                _possiblePairingResult[_player] += _possibleResultScore[0];
                _possiblePairingResult[_opponent] += _possibleResultScore[1];

                const _hash = crypto.createHash('md5').update(
                    _possiblePairingResult.toString()).digest('hex');

                if(_scoresCovered[_hash] === true) {
                    return;
                }

                _possiblePairingResults.push(_possiblePairingResult);

                _scoresCovered[_hash] = true;
            });

            _possibleScores.push(_possiblePairingResults);
        });

        console.log(_possibleScores);

        return [];
    }
}

module.exports = PairingResults;
