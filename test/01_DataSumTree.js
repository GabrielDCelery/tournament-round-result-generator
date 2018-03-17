'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const DataSumTree = require('../src/DataSumTree');

describe('DataSumTree', () => {
    describe('#constructor ()', () => {
        it('creates a default instance', () => {
            const instance = new DataSumTree();

            expect(instance.treeNodes).to.eql(null);
            expect(instance.baseSum).to.eql(null);
            expect(instance.sums).to.eql([]);
            expect(instance.appendNodeDataToSum).to.eql(null);
        });
    });

    describe('::_appendNextNodeToSum (_sum, _node)', () => {
        it('appends the _node\'s data value to the _sum and goes on to the next node', () => {
            const instance = new DataSumTree();

            instance.setBaseSum(0);
            instance.setAppendNodeDataToSumProcess((_sum, _data) => {
                return _sum + _data;
            });

            const _tree = DataSumTree.createTreeNode(5);

            _tree.childNodes = [DataSumTree.createTreeNode(2), DataSumTree.createTreeNode(3)];

            const _spy = sinon.spy(instance, '_appendNextNodeToSum');

            instance._appendNextNodeToSum(0, _tree);

            expect(_spy.callCount).to.eql(2);
            expect(_spy.getCall(1).args).to.deep.eql([5, _tree.childNodes[0]]);
        });

        it('adds the path\'s sum value to the total sums if there are no more child nodes to process', () => {
            const instance = new DataSumTree();

            instance.setBaseSum(0);
            instance.setAppendNodeDataToSumProcess((_sum, _data) => {
                return _sum + _data;
            });

            instance._appendNextNodeToSum(0, DataSumTree.createTreeNode(5));

            expect(instance.sums).to.eql([5]);
        });

        it('sets the node\'s status to completed if all the child nodes have been processed', () => {
            const instance = new DataSumTree();

            instance.setBaseSum(0);
            instance.setAppendNodeDataToSumProcess((_sum, _data) => {
                return _sum + _data;
            });

            const _node = DataSumTree.createTreeNode(5);
            const _childNode1 = DataSumTree.createTreeNode(2);
            const _childNode2 = DataSumTree.createTreeNode(3);

            _childNode1.completed = true;
            _childNode2.completed = true;

            instance._appendNextNodeToSum(0, _node);

            expect(_node.completed).to.eql(true);
        });
    });

    describe('::doSum ()', () => {
        it('does a list of summaries of all the paths', () => {
            const instance = new DataSumTree();

            instance.setBaseSum(0);
            instance.setAppendNodeDataToSumProcess((_sum, _data) => {
                return _sum + _data;
            });

            const _node = DataSumTree.createTreeNode(0);
            const _childNode10 = DataSumTree.createTreeNode(1);
            const _childNode11 = DataSumTree.createTreeNode(2);
            const _childNode20 = DataSumTree.createTreeNode(3);
            const _childNode21 = DataSumTree.createTreeNode(4);
            const _childNode22 = DataSumTree.createTreeNode(5);
            const _childNode30 = DataSumTree.createTreeNode(6);
            const _childNode31 = DataSumTree.createTreeNode(7);

            _childNode10.childNodes = [_childNode20, _childNode21, _childNode22];
            _childNode11.childNodes = [_childNode30, _childNode31];
            _node.childNodes = [_childNode10, _childNode11];

            instance.setTreeNodes(_node);

            expect(instance.doSum()).to.have.members([4, 5, 6, 8, 9]);
        });
    });
});