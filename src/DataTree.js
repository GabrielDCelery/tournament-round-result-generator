'use strict';

const DataTreeNode = require('./DataTreeNode');

class DataTree {
    constructor () {
        this.treeNodes = null;
    }

    setTreeNodes (_treeNodes) {
        this.treeNodes = _treeNodes;

        return this;
    }

    _appendChildNodesToNode (_node, _arrOfDataArrays, _index) {
        const _bHasMoreResults = _arrOfDataArrays[_index + 1] !== undefined;

        _arrOfDataArrays[_index].forEach(_data => {
            const _childNode = DataTree.createTreeNode(_data);

            _node.appendChildNode(_childNode);

            if (_bHasMoreResults) {
                return this._appendChildNodesToNode(_childNode, _arrOfDataArrays, _index + 1);
            }
        });
    }

    generateTreeNodesFromArrOfDataArrays (_baseNodeData, _arrOfDataArrays) {
        this.treeNodes = DataTree.createTreeNode(_baseNodeData);
        this._appendChildNodesToNode(this.treeNodes, _arrOfDataArrays, 0);

        return this;
    }

    static createTreeNode (_data) {
        return new DataTreeNode(_data);
    }
}

module.exports = DataTree;
