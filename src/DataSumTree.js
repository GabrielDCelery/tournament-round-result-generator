'use strict';

const _ = require('lodash');
const DataTreeNode = require('./DataTreeNode');

class DataSumTree {
    constructor() {
        this.treeNodes = null;
        this.baseSum = null;
        this.sums = [];
        this.appendNodeDataToSum = null;
    }

    setTreeNodes(_treeNodes) {
        this.treeNodes = _treeNodes;
    }

    setBaseSum(_baseSum) {
        this.baseSum = _baseSum;
    }

    setAppendNodeDataToSumProcess(_appendNodeDataToSum) {
        this.appendNodeDataToSum = _appendNodeDataToSum;
    }

    _appendNextNodeToSum(_sum, _node) {
        const _modifiedSum = this.appendDataToSum(_sum, _node.data);

        if(_node.childNodes.length === 0) {
            _node.completed = true;

            return this.sums.push(_modifiedSum);
        }

        for (let _i = 0, _iMax = _node.childNodes; _i < _iMax; _i++) {
            const _childNode = _node.childNodes[_i];

            if(_childNode.completed === false) {
                return this._appendNextNodeToSum(_modifiedSum, _childNode);
            }
        }

        _node.completed = true;
    }

    doSum() {
        if(!_.isArray(this.treeNodes)) {
            throw new Error('Forgot to set a proper data tree!');
        }

        if(this.baseSum === null) {
            throw new Error('Forgot to set base sum!');
        }

        if(!_.isFunction(this.appendNodeDataToSum)) {
            throw new Error('Forgot to set a sum method!');
        }

        while(this.treeNodes.completed === false) {
            this._appendNextNodeToSum(_.cloneDeep(this.baseSum), this.treeNodes);
        }

        return this.sums;
    }

    static createTreeNode(_data) {
        return new DataTreeNode(_data);
    }
}

module.exports = DataSumTree;
