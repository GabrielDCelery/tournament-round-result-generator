'use strict';

const chai = require('chai');
const expect = chai.expect;
const DataTree = require('../src/DataTree');

describe('DataTree', () => {
    describe('#constructor ()', () => {
        it('creates an instance', () => {
            const instance = new DataTree();

            expect(instance.treeNodes).to.eql(null);
        });
    });

    describe('::createTreeNode (_data)', () => {
        it('creates a node for the sum tree', () => {
            const _node = DataTree.createTreeNode({
                foo: 'bar'
            });

            expect(_node).to.deep.equal({
                data: {
                    foo: 'bar'
                },
                completed: false,
                childNodes: []
            });
        });
    });

    describe('::generateTreeNodesFromArrOfDataArrays (_baseNodeData, _arrOfDataArrays)', () => {
        it('creates a data tree', () => {
            const instance = new DataTree();

            instance.generateTreeNodesFromArrOfDataArrays(0, [
                [1, 2],
                [3],
                [4, 5, 6]
            ]);

            expect(JSON.stringify(instance.treeNodes)).to.eql(JSON.stringify({
                'data': 0,
                'completed': false,
                'childNodes': [{
                    'data': 1,
                    'completed': false,
                    'childNodes': [{
                        'data': 3,
                        'completed': false,
                        'childNodes': [{
                            'data': 4,
                            'completed': false,
                            'childNodes': []
                        }, {
                            'data': 5,
                            'completed': false,
                            'childNodes': []
                        }, {
                            'data': 6,
                            'completed': false,
                            'childNodes': []
                        }]
                    }]
                }, {
                    'data': 2,
                    'completed': false,
                    'childNodes': [{
                        'data': 3,
                        'completed': false,
                        'childNodes': [{
                            'data': 4,
                            'completed': false,
                            'childNodes': []
                        }, {
                            'data': 5,
                            'completed': false,
                            'childNodes': []
                        }, {
                            'data': 6,
                            'completed': false,
                            'childNodes': []
                        }]
                    }]
                }]
            }));
        });
    });
});
