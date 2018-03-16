'use strict';

const _ = require('lodash');
const crypto = require('crypto');

const DEFAULT_POSSIBLE_RESULTS_FOR_PAIR = [
    [3, 0],
    [1, 1],
    [0, 3]
];

class PairingResults {
    constructor(_possibleResultsForPair) {
        this.DEFAULT_POSSIBLE_RESULTS_FOR_PAIR = DEFAULT_POSSIBLE_RESULTS_FOR_PAIR;
        this.possibleResultsForPair = _possibleResultsForPair || this.DEFAULT_POSSIBLE_RESULTS_FOR_PAIR;
    }

    generatePossiblePlayerScores(_pairings) {


        const _allScoreCombinations = [];
        const _scoresCovered = {};

        _pairings.forEach((_opponent, _player) => {
            const _possiblePairingResults = [];

            this.possibleResultsForPair.forEach(_possibleResultScore => {
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

            if(_possiblePairingResults.length === 0) {
                return;
            }

            _allScoreCombinations.push(_possiblePairingResults);
        });

        this._combinePossibleScores(_allScoreCombinations);

        return [];
    }

    static _mergeArayValues(_arr1, _arr2) {
        if(_arr1.length !== _arr2.length) {
            throw new Error('Mismatching arrays!');
        }

        _arr2.forEach((_value, _index) => {
            _arr1[_index] += _value;
        });

        return _arr1;
    }
}

module.exports = PairingResults;
