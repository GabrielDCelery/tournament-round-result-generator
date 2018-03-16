'use strict';

class DataTreeNode {
    constructor(_data) {
        this.data = _data;
        this.completed = false;
        this.childNodes = [];
    }
}

module.exports = DataTreeNode;
