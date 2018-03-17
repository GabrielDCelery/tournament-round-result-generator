'use strict';

const _ = require('lodash');

const DEFAULT_SCORE_FOR_BYE = 3;
const DEFAULT_POSSIBLE_RESULTS = [
    [3, 0],
    [1, 1],
    [0, 3]
];

const DEFAULT_CONFIG = {
    scoreForBye: 3,
    possibleResultsForPair: [
        [3, 0],
        [1, 1],
        [0, 3]
    ]
};

const DataSumTree = require('./DataSumTree');

class Round {
    constructor (_config) {
        this.pairings = [];
        this.numOfPlayers = 0;
        this.config = _.defaultsDeep({}, _config, DEFAULT_CONFIG);
    }

    setPairings (_pairings) {
        this.pairings = _pairings;
        this.numOfPlayers = 0;

        _pairings.forEach(_pair => {
            this.numOfPlayers += _pair.length;
        });

        return this;
    }

    _generatePossiblePairingResults () {
        const _possiblePairingResults = [];

        this.pairings.forEach(_pair => {
            if (_pair.length === 1) {
                const _data = {};

                _data[_pair[0]] = this.config.scoreForBye;

                return _possiblePairingResults.push([_data]);
            }

            return _possiblePairingResults.push(this.config.possibleResultsForPair.map(_possibleResult => {
                const _data = {};

                _data[_pair[0]] = _possibleResult[0];
                _data[_pair[1]] = _possibleResult[1];

                return _data;
            }));
        });

        return _possiblePairingResults;
    }

    generatePossibleResults () {
        const _dataSumTree = new DataSumTree()
            .setBaseSum(new Array(this.numOfPlayers).fill(0))
            .setAppendNodeDataToSumProcess((_sum, _playerScores) => {
                _.forEach(_playerScores, (_score, _player) => {
                    _sum[_player] += _score;
                });

                return _sum;
            });

        return _dataSumTree
            .generateTreeNodesFromArrOfDataArrays({}, this._generatePossiblePairingResults())
            .doSum();
    }
}

module.exports = Round;
