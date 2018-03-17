'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const DataEvalTree = require('../src/DataEvalTree');

describe('DataEvalTree', () => {
    describe('#constructor ()', () => {
        it('creates a default instance', () => {
            const instance = new DataEvalTree();

            expect(instance.treeNodes).to.eql(null);
            expect(instance.finalState).to.eql(null);
            expect(instance.appendNodeToCurrentState).to.eql(null);
            expect(instance.compareCurrentStateToFinalState).to.eql(null);
            expect(instance.evalPath).to.eql([]);
            expect(instance.baseState).to.eql(null);
            expect(instance.currentState).to.eql(null);
        });
    });

    describe('_evalNextNode (_node)', () => {
        it('does something', () => {

        });
    });

    describe('doEval ()', () => {
        it('finds the path that evaluates to true', () => {
            const instance = new DataEvalTree();

            instance.setFinalState(8);
            instance.setBaseState(0);
            instance.setAppendNodeDataToCurrentStateProcess((_state, _data) => {
                return _state + _data;
            });
            instance.setCompareCurrentStateToFinalStateProcess((_currentState, _finalState) => {
                return _currentState < _finalState;
            });

            const _node = DataEvalTree.createTreeNode(0);
            const _childNode10 = DataEvalTree.createTreeNode(1);
            const _childNode11 = DataEvalTree.createTreeNode(2);
            const _childNode20 = DataEvalTree.createTreeNode(3);
            const _childNode21 = DataEvalTree.createTreeNode(4);
            const _childNode22 = DataEvalTree.createTreeNode(5);
            const _childNode30 = DataEvalTree.createTreeNode(6);
            const _childNode31 = DataEvalTree.createTreeNode(7);

            _childNode10.childNodes = [_childNode20, _childNode21, _childNode22];
            _childNode11.childNodes = [_childNode30, _childNode31];
            _node.childNodes = [_childNode10, _childNode11];

            instance.setTreeNodes(_node);

            expect(instance.doEval()).to.eql([0, 2, 6]);
        });
    });
});
