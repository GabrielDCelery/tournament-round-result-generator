'use strict';

const _ = require('lodash');
const DataTree = require('./DataTree');

class DataEvalTree extends DataTree {
    constructor () {
        super();
        this.finalState = null;
        this.appendNodeToCurrentState = null;
        this.compareCurrentStateToFinalState = null;
        this.evalPath = [];
        this.baseState = null;
        this.currentState = null;
    }

    setTree (_dataTree) {
        this.treeNodes = _dataTree;
    }

    setFinalState (_finalState) {
        this.finalState = _finalState;
    }

    setBaseState (_baseState) {
        this.baseState = _baseState;

        return this;
    }

    setAppendNodeDataToCurrentStateProcess (_appendNodeToCurrentState) {
        this.appendNodeToCurrentState = _appendNodeToCurrentState;

        return this;
    }

    setCompareCurrentStateToFinalStateProcess (_compareCurrentStateToFinalState) {
        this.compareCurrentStateToFinalState = _compareCurrentStateToFinalState;
    }

    _evalNextNode (_node) {
        this.evalPath.push(_node.getData());
        this.currentState = this.appendNodeToCurrentState(this.currentState, _node.getData());

        if (!this.compareCurrentStateToFinalState(this.currentState, this.finalState)) {
            _node.toggleCompletedState(true);

            return;
        };

        for (let _i = 0, _iMax = _node.getNumOfChildNodes(); _i < _iMax; _i++) {
            const _childNode = _node.getChildNode(_i);

            if (_childNode && _childNode.getCompletedState() === false) {
                return this._evalNextNode(_childNode);
            }
        }

        _node.toggleCompletedState(true);
    }

    doEval () {
        if (this.treeNodes === null) {
            throw new Error('Forgot to set a proper data tree!');
        }

        if (this.finalState === null) {
            throw new Error('Forgot to set the final state!');
        }

        if (this.baseState === null) {
            throw new Error('Forgot to set the base state!');
        }

        if (!_.isFunction(this.appendNodeToCurrentState)) {
            throw new Error('Forgot to set the method to append node data to current state!');
        }

        if (!_.isFunction(this.compareCurrentStateToFinalState)) {
            throw new Error('Forgot to set the method to compare states!');
        }

        while (!_.isEqual(this.currentState, this.finalState)) {
            this.currentState = _.cloneDeep(this.baseState);
            this.evalPath = [];
            this._evalNextNode(this.treeNodes);
        }

        return this.evalPath;
    }
}

module.exports = DataEvalTree;
