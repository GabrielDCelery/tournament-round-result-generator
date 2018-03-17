'use strict';

const _ = require('lodash');
const DataTree = require('./DataTree');

class DataSumTree extends DataTree {
    constructor () {
        super();
        this.baseSum = null;
        this.sums = [];
        this.appendNodeDataToSum = null;
    }

    setBaseSum (_baseSum) {
        this.baseSum = _baseSum;

        return this;
    }

    setAppendNodeDataToSumProcess (_appendNodeDataToSum) {
        this.appendNodeDataToSum = _appendNodeDataToSum;

        return this;
    }

    _appendNextNodeToSum (_sum, _node) {
        const _modifiedSum = this.appendNodeDataToSum(_sum, _node.getData());

        if (_node.getNumOfChildNodes() === 0) {
            _node.toggleCompletedState(true);

            return this.sums.push(_modifiedSum);
        }

        for (let _i = 0, _iMax = _node.getNumOfChildNodes(); _i < _iMax; _i++) {
            const _childNode = _node.getChildNode(_i);

            if (_childNode && _childNode.getCompletedState() === false) {
                return this._appendNextNodeToSum(_modifiedSum, _childNode);
            }
        }

        _node.toggleCompletedState(true);
    }

    doSum () {
        if (this.treeNodes === null) {
            throw new Error('Forgot to set a proper data tree!');
        }

        if (this.baseSum === null) {
            throw new Error('Forgot to set base sum!');
        }

        if (!_.isFunction(this.appendNodeDataToSum)) {
            throw new Error('Forgot to set a sum method!');
        }

        while (this.treeNodes.getCompletedState() === false) {
            this._appendNextNodeToSum(_.cloneDeep(this.baseSum), this.treeNodes);
        }

        return this.sums;
    }
}

module.exports = DataSumTree;
