import { Rect } from '../../primitives/rect';
var MatrixModel = /** @class */ (function () {
    function MatrixModel(model) {
        this.flowchartModel = model;
        this.matrix = [];
        this.rowOffset = [];
        this.rowMaxDimension = [];
        this.siblingModel = null;
    }
    /**
     * @private
     * @returns {void} - Arranges the elements in the flowchart layout
     */
    MatrixModel.prototype.arrangeElements = function () {
        if (this.flowchartModel === null) {
            return;
        }
        var layoutSettings = this.flowchartModel.layout;
        var isHorizontal = layoutSettings.orientation === 'LeftToRight';
        var spacing = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        this.groupLayoutCells();
        this.createMatrixCells();
        for (var _i = 0, _a = this.matrix; _i < _a.length; _i++) {
            var matrixRow = _a[_i];
            for (var i = 1; i < matrixRow.length; i++) {
                var cell = matrixRow[parseInt(i.toString(), 10)];
                var prevCell = matrixRow[i - 1];
                cell.offset += prevCell.offset + (prevCell.size / 2) + spacing + (cell.size / 2);
            }
        }
        for (var _b = 0, _c = this.matrix[0]; _b < _c.length; _b++) {
            var root = _c[_b];
            this.arrangeMatrix(root, null);
        }
        for (var _d = 0, _e = this.matrix; _d < _e.length; _d++) {
            var row = _e[_d];
            for (var i = 0; i < row.length; i++) {
                var cell = row[parseInt(i.toString(), 10)];
                if (cell.visitedParents.length > 1) {
                    var firstParent = cell.visitedParents[0];
                    var lastParent = cell.visitedParents[cell.visitedParents.length - 1];
                    var firstVertexParent = this.findParentVertexCellGroup(firstParent);
                    var lastVertexParent = this.findParentVertexCellGroup(lastParent);
                    if (firstParent !== firstVertexParent && firstVertexParent.offset < firstParent.offset) {
                        firstParent = firstVertexParent;
                    }
                    if (lastParent !== lastVertexParent && lastVertexParent.offset > lastParent.offset) {
                        lastParent = firstVertexParent;
                    }
                    var newOffset = (firstParent.offset + lastParent.offset) / 2;
                    var interVertex = cell.cells.find(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; });
                    if (this.flowchartModel.layout.yesBranchDirection === 'SameAsFlow') {
                        var tempVisitedParents = cell.visitedParents.slice();
                        if (interVertex && interVertex.cell.isYesChild) {
                            for (var _f = 0, tempVisitedParents_1 = tempVisitedParents; _f < tempVisitedParents_1.length; _f++) {
                                var tempParent = tempVisitedParents_1[_f];
                                var tempParentVertex = tempParent.cells.find(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; });
                                if (!tempParentVertex) {
                                    newOffset = tempParent.offset;
                                    break;
                                }
                            }
                        }
                        else {
                            if (this.flowchartModel.layout.noBranchDirection === 'LeftInFlow') {
                                tempVisitedParents.reverse();
                            }
                            for (var _g = 0, tempVisitedParents_2 = tempVisitedParents; _g < tempVisitedParents_2.length; _g++) {
                                var tempParent = tempVisitedParents_2[_g];
                                var tempParentVertex = tempParent.cells.find(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; });
                                if (tempParentVertex) {
                                    if (tempParentVertex.cell.isYesChild) {
                                        newOffset = tempParent.offset;
                                        break;
                                    }
                                }
                                else {
                                    var tempSuperParent = this.findParentVertexCellGroup(tempParent);
                                    if (tempSuperParent) {
                                        var superParentVertex = tempSuperParent.cells.find(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; });
                                        if (superParentVertex && superParentVertex.cell.isYesChild) {
                                            newOffset = tempParent.offset;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (this.flowchartModel.layout.noBranchDirection === 'SameAsFlow') {
                        var tempVisitedParents = cell.visitedParents.slice();
                        if (interVertex && interVertex.cell.isNoChild) {
                            for (var _h = 0, tempVisitedParents_3 = tempVisitedParents; _h < tempVisitedParents_3.length; _h++) {
                                var tempParent = tempVisitedParents_3[_h];
                                var tempParentVertex = tempParent.cells.find(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; });
                                if (!tempParentVertex) {
                                    newOffset = tempParent.offset;
                                    break;
                                }
                            }
                        }
                        else {
                            if (this.flowchartModel.layout.yesBranchDirection === 'LeftInFlow') {
                                tempVisitedParents.reverse();
                            }
                            for (var _j = 0, tempVisitedParents_4 = tempVisitedParents; _j < tempVisitedParents_4.length; _j++) {
                                var tempParent = tempVisitedParents_4[_j];
                                var tempParentVertex = tempParent.cells.find(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; });
                                if (tempParentVertex) {
                                    if (tempParentVertex.cell.isNoChild) {
                                        newOffset = tempParent.offset;
                                        break;
                                    }
                                }
                                else {
                                    var tempSuperParent = this.findParentVertexCellGroup(tempParent);
                                    if (tempSuperParent) {
                                        var superParentVertex = tempSuperParent.cells.find(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; });
                                        if (superParentVertex && superParentVertex.cell.isNoChild) {
                                            newOffset = tempParent.offset;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    var availOffsetMin = cell.initialOffset;
                    var availOffsetMax = cell.offset;
                    if (availOffsetMax !== availOffsetMin) {
                        if (newOffset >= availOffsetMin && newOffset <= availOffsetMax) {
                            this.translateMatrixCells(newOffset - cell.offset, cell);
                        }
                        else if (newOffset < availOffsetMin) {
                            this.translateMatrixCells(availOffsetMin - cell.offset, cell);
                        }
                    }
                }
            }
        }
        this.setXYForMatrixCell();
    };
    MatrixModel.prototype.arrangeMatrix = function (cell, parent) {
        var layoutSettings = this.flowchartModel.layout;
        var isHorizontal = layoutSettings.orientation === 'LeftToRight';
        var spacing = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        var matrixRow = this.matrix[cell.level];
        var matrixIndex = matrixRow.indexOf(cell);
        if (cell.visitedParents.length) {
            if (cell.visitedParents.length === 1) {
                cell.initialOffset = cell.offset;
            }
            if (matrixIndex + 1 < matrixRow.length) {
                var nextCell = matrixRow[matrixIndex + 1];
                if (nextCell.visitedParents.length) {
                    if (cell.visitedParents.indexOf(parent) === -1) {
                        if (cell.level !== parent.level) {
                            cell.visitedParents.push(parent);
                            parent.ignoredChildren.push(cell);
                        }
                        return;
                    }
                }
            }
        }
        if (!cell.children.length) {
            var validOffset = cell.offset;
            if (matrixIndex > 0) {
                var prevCell = matrixRow[matrixIndex - 1];
                validOffset = prevCell.offset + (prevCell.size / 2) + spacing + (cell.size / 2);
            }
            this.shiftMatrixCells(validOffset - cell.offset, cell);
        }
        else {
            for (var _i = 0, _a = cell.children; _i < _a.length; _i++) {
                var matrixCellChild = _a[_i];
                if (cell.visitedChildren.indexOf(matrixCellChild)) {
                    this.arrangeMatrix(matrixCellChild, cell);
                    if (cell.level !== matrixCellChild.level) {
                        cell.visitedChildren.push(matrixCellChild);
                    }
                    else {
                        cell.loopChildren.push(matrixCellChild);
                    }
                }
            }
            if (cell.visitedChildren.length) {
                var children = cell.visitedChildren.slice();
                var _loop_1 = function (cellIgnoredChild) {
                    children = children.filter(function (child) { return child !== cellIgnoredChild; });
                };
                for (var _b = 0, _c = cell.ignoredChildren; _b < _c.length; _b++) {
                    var cellIgnoredChild = _c[_b];
                    _loop_1(cellIgnoredChild);
                }
                if (children.length) {
                    var firstChild = children[0];
                    var lastChild = children[children.length - 1];
                    var x1 = firstChild.offset;
                    var x2 = lastChild.offset;
                    var newOffset = (x1 + x2) / 2;
                    if (cell.cells.length) {
                        var interVertex = cell.cells.filter(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; })[0];
                        var firstChildVertex = firstChild.cells.filter(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; })[0];
                        var lastChildVertex = lastChild.cells.filter(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; })[0];
                        if (interVertex && interVertex.cell.isDecisionNode) {
                            if (this.flowchartModel.layout.yesBranchDirection === 'SameAsFlow') {
                                if (firstChildVertex) {
                                    newOffset = firstChildVertex.cell.isYesChild ? firstChild.offset : lastChild.offset;
                                }
                                else if (lastChildVertex) {
                                    newOffset = lastChildVertex.cell.isYesChild ? lastChild.offset : firstChild.offset;
                                }
                            }
                            else if (this.flowchartModel.layout.noBranchDirection === 'SameAsFlow') {
                                if (firstChildVertex) {
                                    newOffset = firstChildVertex.cell.isNoChild ? firstChild.offset : lastChild.offset;
                                }
                                else if (lastChildVertex) {
                                    newOffset = lastChildVertex.cell.isNoChild ? lastChild.offset : firstChild.offset;
                                }
                            }
                        }
                    }
                    if (newOffset < cell.offset) {
                        this.shiftMatrixCells(cell.offset - newOffset, firstChild, true, cell);
                    }
                    else if (newOffset > cell.offset) {
                        this.shiftMatrixCells(newOffset - cell.offset, cell);
                    }
                }
            }
        }
        if (cell.visitedParents.indexOf(parent) === -1) {
            if (parent !== null && cell.level !== parent.level) {
                cell.visitedParents.push(parent);
            }
        }
    };
    MatrixModel.prototype.shiftMatrixCells = function (value, startingCell, shiftChildren, parentCell) {
        if (shiftChildren === void 0) { shiftChildren = false; }
        if (parentCell === void 0) { parentCell = null; }
        if (value !== 0) {
            var matrixRow = this.matrix[startingCell.level];
            var index = matrixRow.indexOf(startingCell);
            for (var i = index; i < matrixRow.length; i++) {
                matrixRow[parseInt(i.toString(), 10)].offset += value;
            }
            if (shiftChildren) {
                if (startingCell.visitedChildren.length) {
                    this.shiftMatrixCells(value, startingCell.visitedChildren[0], true, startingCell);
                }
                else {
                    var i = 1;
                    var nextSiblingWithChild = null;
                    while (index + i < matrixRow.length) {
                        var nextCell = matrixRow[index + i];
                        if (parentCell !== null && nextCell.visitedParents.indexOf(parentCell) !== -1) {
                            if (nextCell.visitedChildren.length) {
                                nextSiblingWithChild = nextCell;
                            }
                            else {
                                i++;
                                continue;
                            }
                        }
                        break;
                    }
                    if (nextSiblingWithChild !== null) {
                        this.shiftMatrixCells(value, nextSiblingWithChild.visitedChildren[0], true, nextSiblingWithChild);
                    }
                }
            }
        }
    };
    MatrixModel.prototype.findParentVertexCellGroup = function (cell) {
        if ('internalInEdges' in cell.cells[0] && 'internalOutEdges' in cell.cells[0]) {
            return cell;
        }
        if (cell.parents.length) {
            return this.findParentVertexCellGroup(cell.parents[0]);
        }
        return cell;
    };
    MatrixModel.prototype.translateMatrixCells = function (value, cell) {
        if (value !== 0) {
            cell.offset += value;
            if (cell.visitedChildren.length) {
                for (var _i = 0, _a = cell.visitedChildren; _i < _a.length; _i++) {
                    var child = _a[_i];
                    this.translateMatrixCells(value, child);
                }
                for (var _b = 0, _c = cell.loopChildren; _b < _c.length; _b++) {
                    var loopChild = _c[_b];
                    this.translateMatrixCells(value, loopChild);
                }
            }
        }
    };
    MatrixModel.prototype.getObjectValues = function (obj) {
        var values = [];
        for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                values.push(obj["" + key]);
            }
        }
        return values;
    };
    MatrixModel.prototype.setXYForMatrixCell = function () {
        var layoutSettings = this.flowchartModel.layout;
        var isHorizontal = layoutSettings.orientation === 'LeftToRight';
        var spacing = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        var siblingSize = 0;
        if (this.siblingModel) {
            var rowMaxValues = this.getObjectValues(this.rowMaxDimension);
            var maxRowValue = Math.max.apply(Math, rowMaxValues);
            siblingSize = this.siblingModel.getSiblingDimension(maxRowValue);
        }
        for (var _i = 0, _a = this.getObjectValues(this.matrix); _i < _a.length; _i++) {
            var matrixRow1 = _a[_i];
            for (var _b = 0, matrixRow1_1 = matrixRow1; _b < matrixRow1_1.length; _b++) {
                var matrixCell = matrixRow1_1[_b];
                var start = matrixCell.offset - (matrixCell.size / 2);
                if (siblingSize !== 0) {
                    start += siblingSize + spacing;
                }
                for (var _c = 0, _d = matrixCell.cells; _c < _d.length; _c++) {
                    var cell = _d[_c];
                    if ('internalInEdges' in cell && 'internalOutEdges' in cell) {
                        var internalVertex = cell;
                        var width = internalVertex.cell.geometry.width;
                        var height = internalVertex.cell.geometry.height;
                        if (isHorizontal) {
                            internalVertex.cell.geometry = new Rect(this.rowOffset[matrixCell.level] - (width / 2), start, width, height);
                        }
                        else {
                            internalVertex.cell.geometry = new Rect(start, this.rowOffset[matrixCell.level] - (height / 2), width, height);
                        }
                        start += (isHorizontal ? height : width) + spacing;
                    }
                    else if ('edges' in cell) {
                        var internalEdges = cell;
                        var isContainSiblingVertex = internalEdges.isReversed;
                        if (!isContainSiblingVertex) {
                            var parent_1 = matrixCell.visitedParents[0];
                            if (parent_1) {
                                for (var _e = 0, _f = parent_1.visitedChildren; _e < _f.length; _e++) {
                                    var child = _f[_e];
                                    if (child.cells.some(function (c) { return 'internalInEdges' in c && 'internalOutEdges' in c; })) {
                                        isContainSiblingVertex = true;
                                        break;
                                    }
                                }
                            }
                        }
                        var lineWidth = 1;
                        var edgeSpacing = 5;
                        for (var _g = 0, _h = internalEdges.edges; _g < _h.length; _g++) {
                            var internalConnector = _h[_g];
                            if (isContainSiblingVertex) {
                                var pt = { x: start + (lineWidth / 2.0), y: this.rowOffset[matrixCell.level] };
                                if (isHorizontal) {
                                    pt = { x: this.rowOffset[matrixCell.level], y: start + (lineWidth / 2.0) };
                                }
                                if (this.flowchartModel.layout.edgesMapper.has(internalConnector)) {
                                    this.flowchartModel.layout.edgesMapper.get(internalConnector).push(pt);
                                    this.flowchartModel.layout.loopedgesMapper.set(internalConnector, internalEdges.isReversed);
                                }
                            }
                            start += lineWidth + edgeSpacing;
                        }
                        start += spacing;
                    }
                }
            }
        }
    };
    MatrixModel.prototype.getSiblingDimension = function (maxHeight) {
        var layoutSettings = this.flowchartModel.layout;
        var isHorizontal = layoutSettings.orientation === 'LeftToRight';
        var spacing = isHorizontal ? layoutSettings.horizontalSpacing : layoutSettings.verticalSpacing;
        var commonRowIndex = 0;
        for (var key in this.rowMaxDimension) {
            if (Object.prototype.hasOwnProperty.call(this.rowMaxDimension, key)) {
                var value = this.rowMaxDimension["" + key];
                if (value < maxHeight) {
                    commonRowIndex = parseInt(key, 10);
                }
                else {
                    break;
                }
            }
        }
        if (this.rowMaxDimension[parseInt(commonRowIndex.toString(), 10)] + spacing <= maxHeight
            && this.rowMaxDimension[commonRowIndex + 1]) {
            commonRowIndex++;
        }
        var commonRows = [];
        for (var key in this.matrix) {
            if (Object.prototype.hasOwnProperty.call(this.matrix, key) && parseInt(key, 10) <= commonRowIndex) {
                commonRows["" + key] = this.matrix["" + key];
            }
        }
        var maxSize = 0;
        for (var key in commonRows) {
            if (Object.prototype.hasOwnProperty.call(commonRows, key)) {
                var matrixRow1 = commonRows["" + key];
                if (matrixRow1.length) {
                    var firstCell = matrixRow1[0].cells[0];
                    var rowStart = 0;
                    if (firstCell && 'cell' in firstCell) {
                        var geometry = firstCell.cell.geometry;
                        rowStart = isHorizontal ? geometry.y : geometry.x;
                    }
                    else if (firstCell && 'edges' in firstCell) {
                        var internalConnector = firstCell.edges[firstCell.edges.length - 1];
                        var edgePts = this.flowchartModel.layout.edgesMapper.get(internalConnector);
                        if (edgePts.length) {
                            rowStart = isHorizontal ? edgePts[0].y : edgePts[0].x;
                        }
                    }
                    var rowEnd = 0;
                    var lastCell = matrixRow1[matrixRow1.length - 1]
                        .cells[matrixRow1[matrixRow1.length - 1].cells.length - 1];
                    if (lastCell && 'cell' in lastCell) {
                        var geometry = lastCell.cell.geometry;
                        rowEnd = isHorizontal ? geometry.y + geometry.height : geometry.x + geometry.width;
                    }
                    else if (lastCell && 'edges' in lastCell) {
                        var internalConnector = lastCell.edges[lastCell.edges.length - 1];
                        var edgePts = this.flowchartModel.layout.edgesMapper.get(internalConnector);
                        if (edgePts.length) {
                            rowEnd = isHorizontal ? edgePts[0].y : edgePts[0].x;
                        }
                    }
                    maxSize = Math.max(maxSize, rowEnd - rowStart);
                }
            }
        }
        return maxSize;
    };
    MatrixModel.prototype.createMatrixCells = function () {
        var layoutSettings = this.flowchartModel.layout;
        var isHorizontal = layoutSettings.orientation === 'LeftToRight';
        var spacing = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
        var spacingInverse = isHorizontal ? layoutSettings.horizontalSpacing : layoutSettings.verticalSpacing;
        var rank = this.flowchartModel.ranks;
        var ranks = Array.from(rank.values());
        var matrixCellMapper = {};
        var matrixRowOffset = -spacingInverse;
        for (var j = ranks.length - 1; j >= 0; j--) {
            var maxDimension = 0.0;
            var index = (ranks.length - 1) - j;
            var rank_1 = ranks[parseInt(j.toString(), 10)].slice();
            // Creating new row and adding it to matrix
            var matrixRow = [];
            this.matrix[parseInt(index.toString(), 10)] = matrixRow;
            // Creating new row mapper
            var tempMatrixRow = {};
            matrixCellMapper[parseInt(index.toString(), 10)] = tempMatrixRow;
            while (rank_1.length > 0) {
                var layoutCell = rank_1[0];
                var matrixCell = {
                    parents: [],
                    children: [],
                    visitedParents: [],
                    visitedChildren: [],
                    ignoredChildren: [],
                    loopChildren: [],
                    cells: [],
                    level: index,
                    initialOffset: 0,
                    size: 0,
                    offset: 0
                };
                matrixRow.push(matrixCell);
                if ('internalInEdges' in layoutCell && 'internalOutEdges' in layoutCell) {
                    matrixCell.cells.push(layoutCell);
                    if (layoutCell.identicalSibling) {
                        for (var i = 0; i < rank_1.length; i++) {
                            var internalVertex = rank_1[parseInt(i.toString(), 10)];
                            if ('internalInEdges' in internalVertex && 'internalOutEdges' in internalVertex) {
                                if (layoutCell.identicalSibling.indexOf(internalVertex.id) !== -1) {
                                    matrixCell.cells.push(internalVertex);
                                    if (matrixCell.cells.length > layoutCell.identicalSibling.length) {
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    var cells = matrixCell.cells;
                    for (var i = 0; i < cells.length; i++) {
                        var internalVertex = cells[parseInt(i.toString(), 10)];
                        if ('internalInEdges' in internalVertex && 'internalOutEdges' in internalVertex) {
                            var geometry = internalVertex.cell.geometry;
                            matrixCell.size += isHorizontal ? geometry.height : geometry.width;
                            maxDimension = Math.max(maxDimension, isHorizontal ? geometry.width : geometry.height);
                            tempMatrixRow[internalVertex.id] = matrixCell;
                            if (internalVertex.internalInEdges.length) {
                                var internalInEdges = internalVertex.internalInEdges;
                                for (var j_1 = 0; j_1 < internalInEdges.length; j_1++) {
                                    var internalEdges = internalInEdges[parseInt(j_1.toString(), 10)];
                                    if (internalEdges.isReversed) {
                                        continue;
                                    }
                                    var key = null;
                                    if (matrixCellMapper[index - 1] &&
                                        Object.prototype.hasOwnProperty.call(matrixCellMapper[index - 1], internalEdges.ids)) {
                                        key = internalEdges.ids;
                                    }
                                    else if (matrixCellMapper[index - 1] &&
                                        Object.prototype.hasOwnProperty.call(matrixCellMapper[index - 1], internalEdges.source.id)) {
                                        key = internalEdges.source.id;
                                    }
                                    if (key !== null) {
                                        var parentMatrixCell = matrixCellMapper[index - 1]["" + key];
                                        if (matrixCell.parents.indexOf(parentMatrixCell) === -1) {
                                            matrixCell.parents.push(parentMatrixCell);
                                        }
                                        if (parentMatrixCell.children.indexOf(matrixCell) === -1) {
                                            if (parentMatrixCell.children.length) {
                                                if (parentMatrixCell.children[0].level === parentMatrixCell.level) {
                                                    parentMatrixCell.children.unshift(matrixCell);
                                                }
                                                else {
                                                    parentMatrixCell.children.push(matrixCell);
                                                }
                                            }
                                            else {
                                                parentMatrixCell.children.push(matrixCell);
                                            }
                                        }
                                    }
                                }
                            }
                            rank_1.splice(rank_1.indexOf(internalVertex), 1);
                        }
                    }
                    matrixCell.size += (matrixCell.cells.length - 1) * spacing;
                }
                else if ('edges' in layoutCell) {
                    matrixCell.cells.push(layoutCell);
                    var cells = matrixCell.cells;
                    for (var i = 0; i < cells.length; i++) {
                        var internalEdge = cells[parseInt(i.toString(), 10)];
                        if ('edges' in internalEdge && internalEdge.edges) {
                            var lineWidth = 1;
                            var edgeSpacing = 5;
                            var cellSize = -edgeSpacing;
                            for (var j_2 = 0; j_2 < internalEdge.edges.length; j_2++) {
                                var internalConnector = internalEdge.edges[parseInt(j_2.toString(), 10)];
                                cellSize += lineWidth + edgeSpacing;
                            }
                            matrixCell.size += cellSize;
                        }
                        var key = null;
                        if (internalEdge.isReversed) {
                            if (matrixCellMapper[parseInt(index.toString(), 10)][internalEdge.ids]) {
                                key = internalEdge.ids;
                            }
                            else if (matrixCellMapper[parseInt(index.toString(), 10)][internalEdge.source.id]) {
                                key = internalEdge.source.id;
                            }
                        }
                        else {
                            if (matrixCellMapper[index - 1][internalEdge.ids]) {
                                key = internalEdge.ids;
                            }
                            else if (matrixCellMapper[index - 1][internalEdge.source.id]) {
                                key = internalEdge.source.id;
                            }
                        }
                        if (key !== null) {
                            var parentMatrixCell = matrixCellMapper[internalEdge.isReversed ?
                                index : index - 1]["" + key];
                            if (matrixCell.parents.indexOf(parentMatrixCell) === -1) {
                                matrixCell.parents.push(parentMatrixCell);
                            }
                            if (parentMatrixCell.children.indexOf(matrixCell) === -1) {
                                parentMatrixCell.children.push(matrixCell);
                            }
                        }
                        tempMatrixRow[internalEdge.ids] = matrixCell;
                        rank_1.splice(rank_1.indexOf(internalEdge), 1);
                    }
                    matrixCell.size += (matrixCell.cells.length - 1) * spacing;
                }
            }
            this.rowOffset[parseInt(index.toString(), 10)] = matrixRowOffset + (maxDimension / 2) + spacingInverse;
            this.rowMaxDimension[parseInt(index.toString(), 10)] = this.rowOffset[parseInt(index.toString(), 10)] + maxDimension / 2;
            matrixRowOffset += maxDimension + spacingInverse;
        }
    };
    MatrixModel.prototype.groupLayoutCells = function () {
        var rank = this.flowchartModel.ranks;
        var ranks = Array.from(rank.values());
        ranks.reverse();
        for (var j = ranks.length - 1; j >= 0; j--) {
            var vertices = ranks[parseInt(j.toString(), 10)].filter(function (v) { return 'internalInEdges' in v && 'internalOutEdges' in v; });
            var edges = ranks[parseInt(j.toString(), 10)].filter(function (e) { return 'edges' in e && 'edges' in e; });
            while (vertices.length > 1) {
                var vertex1 = vertices[0];
                if (vertex1.cell.isYesChild || vertex1.cell.isNoChild) {
                    vertices.shift();
                    continue;
                }
                var parentSet1 = vertex1.internalInEdges.map(function (e) { return e.source.id; });
                var childSet1 = vertex1.internalOutEdges.map(function (e) { return e.target.id; });
                while (vertices.length > 1) {
                    var vertex2 = vertices[1];
                    var parentSet2 = vertex2.internalInEdges.map(function (e) { return e.source.id; });
                    var childSet2 = vertex2.internalOutEdges.map(function (e) { return e.target.id; });
                    var parentEquals = this.compareLists(parentSet1, parentSet2);
                    var childEquals = this.compareLists(childSet1, childSet2);
                    if (parentEquals && childEquals) {
                        this.updateMutualSharing(vertices[0], vertex2.id);
                        this.updateMutualSharing(vertices[1], vertex1.id);
                        vertices.splice(1, 1);
                        continue;
                    }
                    break;
                }
                vertices.shift();
            }
            var _loop_2 = function () {
                var internalEdge = edges[0];
                var parentSet = internalEdge.source;
                var childSet = internalEdge.target;
                if (parentSet.identicalSibling) {
                    var groupEdges = edges.filter(function (e) { return e.target === childSet; });
                    for (var _i = 0, groupEdges_1 = groupEdges; _i < groupEdges_1.length; _i++) {
                        var internalEdges = groupEdges_1[_i];
                        if ((parentSet.identicalSibling).indexOf(internalEdges.source.id) !== -1) {
                            internalEdges.source.identicalSibling = null;
                        }
                    }
                    internalEdge.source.identicalSibling = null;
                }
                edges.shift();
            };
            while (edges.length > 1) {
                _loop_2();
            }
        }
    };
    MatrixModel.prototype.updateMutualSharing = function (cell, id) {
        if (cell.identicalSibling) {
            cell.identicalSibling.push(id);
        }
        else {
            cell.identicalSibling = [id];
        }
    };
    MatrixModel.prototype.compareLists = function (list1, list2) {
        var newList1 = list1.slice();
        var newList2 = list2.slice();
        if (newList1.length === newList2.length) {
            if (newList1.length === 0) {
                return true;
            }
            for (var _i = 0, newList2_1 = newList2; _i < newList2_1.length; _i++) {
                var o = newList2_1[_i];
                if (newList1.indexOf(o) === -1) {
                    return false;
                }
            }
            return true;
        }
        return false;
    };
    return MatrixModel;
}());
export { MatrixModel };
