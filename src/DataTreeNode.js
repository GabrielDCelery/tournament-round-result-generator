'use strict';

class DataTreeNode {
    constructor (_data) {
        this.data = _data;
        this.completed = false;
        this.childNodes = [];
    }

    getData () {
        return this.data;
    }

    getCompletedState () {
        return this.completed;
    }

    toggleCompletedState (_bCompleted) {
        this.completed = _bCompleted === true;
    }

    appendChildNode (_node) {
        this.childNodes.push(_node);
    }

    getNumOfChildNodes () {
        return this.childNodes.length;
    }

    getChildNode (_i) {
        return this.childNodes[_i];
    }
}

module.exports = DataTreeNode;
