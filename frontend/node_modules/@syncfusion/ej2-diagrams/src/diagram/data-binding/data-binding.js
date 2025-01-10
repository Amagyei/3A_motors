import { Node } from '../objects/node';
import { Connector } from '../objects/connector';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { randomId, getFunction } from '../utility/base-util';
import { cloneBlazorObject } from '../utility/diagram-util';
import { updateDefaultValues } from '../utility/diagram-util';
import { isBlazor } from '@syncfusion/ej2-base';
/**
 * data source defines the basic unit of diagram
 */
var DataBinding = /** @class */ (function () {
    /**
     * Constructor for the data binding module.
     * @private
     */
    function DataBinding() {
        /**   @private  */
        this.dataTable = {};
        //constructs the data binding module
    }
    /**
     * To destroy the data binding module
     *
     * @returns {void}
     * @private
     */
    DataBinding.prototype.destroy = function () {
        /**
         * Destroy method performed here
         */
    };
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    DataBinding.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'DataBinding';
    };
    /**
     * Initialize nodes and connectors when we have a data as JSON
     *
     * @param {DataSourceModel} data
     * @param {Diagram} diagram
     * @private
     */
    DataBinding.prototype.initData = function (data, diagram) {
        var dataSource;
        var dataProp = 'data';
        var jsonProp = 'json';
        var dataManager = data.dataManager || data.dataSource || {};
        dataSource = dataManager["" + dataProp] || dataManager["" + jsonProp] ||
            (dataManager.dataSource ? dataManager.dataSource.json : undefined);
        if (dataSource && dataSource.length === 0 && dataManager.dataSource.data) {
            dataSource = dataManager.dataSource.data;
        }
        if (dataSource && dataSource.length) {
            this.applyDataSource(data, dataSource, diagram);
            diagram.trigger('dataLoaded', { diagram: (isBlazor()) ? null : cloneBlazorObject(diagram) });
        }
    };
    /**
     * Initialize nodes and connector when we have a data as remote url
     *
     * @param {DataSourceModel} data
     * @param {Diagram} diagram
     * @private
     */
    DataBinding.prototype.initSource = function (data, diagram) {
        var _this = this;
        var dataSource = data;
        var result;
        var mapper = data;
        if (dataSource.dataManager instanceof DataManager || dataSource.dataSource instanceof DataManager) {
            var tempObj = mapper.dataManager || mapper.dataSource;
            var query = tempObj.defaultQuery || new Query();
            var dataManager = data.dataManager || data.dataSource;
            dataManager.executeQuery(query).then(function (e) {
                var prop = 'result';
                result = e["" + prop];
                if (!diagram.isDestroyed) {
                    diagram.protectPropertyChange(true);
                    _this.applyDataSource(data, result, diagram);
                    diagram.refreshDiagram();
                    diagram.protectPropertyChange(false);
                    diagram.trigger('dataLoaded', { diagram: (isBlazor()) ? null : cloneBlazorObject(diagram) });
                }
            });
        }
    };
    DataBinding.prototype.applyDataSource = function (mapper, data, diagram) {
        this.dataTable = {};
        var obj;
        var firstNode;
        var node;
        var rootNodes = [];
        var firstLevel = [];
        var item;
        var nextLevel;
        if (data !== undefined) {
            for (var r = 0; r < data.length; r++) {
                obj = data[parseInt(r.toString(), 10)];
                //832886 - Rendering layout without case sensitivity
                if (obj[mapper.parentId] === undefined || obj[mapper.parentId] === null ||
                    typeof obj[mapper.parentId] !== 'object') {
                    if (isNaN(obj[mapper.parentId]) && obj[mapper.parentId] !== undefined) {
                        if (rootNodes[obj[mapper.parentId] ? obj[mapper.parentId].toLowerCase() : obj[mapper.parentId]] !== undefined) {
                            rootNodes[obj[mapper.parentId].toLowerCase()].items.push(obj);
                        }
                        else {
                            rootNodes[obj[mapper.parentId] ? obj[mapper.parentId].toLowerCase() : obj[mapper.parentId]] = { items: [obj] };
                        }
                    }
                    else {
                        if (rootNodes[obj[mapper.parentId]] !== undefined) {
                            rootNodes[obj[mapper.parentId]].items.push(obj);
                        }
                        else {
                            rootNodes[obj[mapper.parentId]] = { items: [obj] };
                        }
                    }
                }
                else {
                    rootNodes = this.updateMultipleRootNodes(obj, rootNodes, mapper, data);
                }
                if (mapper.root && isNaN(mapper.root) && obj[mapper.id] && isNaN(obj[mapper.id])) {
                    if ((mapper.root).toLowerCase() === obj[mapper.id].toLowerCase()) {
                        firstNode = { items: [obj] };
                    }
                }
                else {
                    if (mapper.root === obj[mapper.id]) {
                        firstNode = { items: [obj] };
                    }
                }
            }
            if (firstNode) {
                firstLevel.push(firstNode);
            }
            else {
                for (var _i = 0, _a = Object.keys(rootNodes); _i < _a.length; _i++) {
                    var n = _a[_i];
                    if (!n || n === 'undefined' || n === '\'\'' || n === 'null') {
                        firstLevel.push(rootNodes["" + n]);
                    }
                }
            }
            for (var i = 0; i < firstLevel.length; i++) {
                for (var j = 0; j < firstLevel[parseInt(i.toString(), 10)].items.length; j++) {
                    item = firstLevel[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)];
                    node = this.applyNodeTemplate(mapper, item, diagram);
                    diagram.nodes.push(node);
                    if (isNaN(item[mapper.id]) && item[mapper.id] !== undefined) {
                        this.dataTable[item[mapper.id].toLowerCase()] = node;
                    }
                    else {
                        this.dataTable[item[mapper.id]] = node;
                    }
                    if (isNaN(node.data[mapper.id]) && node.data[mapper.id] !== undefined) {
                        nextLevel = rootNodes[node.data[mapper.id].toLowerCase()];
                    }
                    else {
                        nextLevel = rootNodes[node.data[mapper.id]];
                    }
                    if (nextLevel !== undefined) {
                        this.renderChildNodes(mapper, nextLevel, node.id, rootNodes, diagram);
                    }
                }
            }
        }
        this.dataTable = null;
    };
    /**
     * updateMultipleRootNodes method is used  to update the multiple Root Nodes
     *
     * @param {Object} object
     * @param {Object[]} rootnodes
     * @param {DataSourceModel} mapper
     * @param {Object[]} data
     */
    DataBinding.prototype.updateMultipleRootNodes = function (obj, rootNodes, mapper, data) {
        var parents = obj[mapper.parentId];
        var parent;
        for (var i = 0; i < parents.length; i++) {
            if (parents[parseInt(i.toString(), 10)]) {
                if (isNaN(parents[parseInt(i.toString(), 10)])) {
                    parent = (parents[parseInt(i.toString(), 10)]).toLowerCase();
                }
                else {
                    parent = (parents[parseInt(i.toString(), 10)]);
                }
                if (rootNodes["" + parent]) {
                    rootNodes["" + parent].items.push(obj);
                }
                else {
                    rootNodes["" + parent] = { items: [obj] };
                }
            }
            else {
                parent = parents[parseInt(i.toString(), 10)];
                if (rootNodes["" + parent]) {
                    rootNodes["" + parent].items.push(obj);
                }
                else {
                    rootNodes["" + parent] = { items: [obj] };
                }
            }
        }
        return rootNodes;
    };
    /**
     *  Get the node values\
     *
     * @returns { Node }    Get the node values.\
     * @param {DataSourceModel} mapper - provide the id value.
     * @param {Object} item - provide the id value.
     * @param {Diagram} diagram - provide the id value.
     *
     * @private
     */
    DataBinding.prototype.applyNodeTemplate = function (mapper, item, diagram) {
        //const root: Object = item;
        var id = randomId();
        //const blazor: string = 'Blazor';
        var nodeModel = { id: id, data: item };
        //Task 895538: Flow-chart layout support for EJ2 diagram.
        //Added below code to set node shape and style based on the data.
        if (diagram.layout.type === 'Flowchart') {
            var shape = this.getFlowChartNodeShape(item);
            var style = { fill: item.color ? item.color : 'white',
                strokeColor: item.stroke ? item.stroke : 'black',
                strokeWidth: item.strokeWidth ? item.strokeWidth : 1
            };
            nodeModel.shape = shape;
            nodeModel.style = style;
            nodeModel.annotations = [{ content: item.name ? item.name : '' }];
        }
        // eslint-disable-next-line @typescript-eslint/ban-types
        var doBinding = getFunction(mapper.doBinding);
        if (doBinding) {
            doBinding(nodeModel, item, diagram);
        }
        var obj = new Node(diagram, 'nodes', nodeModel, true);
        updateDefaultValues(obj, nodeModel, diagram.nodeDefaults);
        if (mapper.dataMapSettings) {
            var index = void 0;
            var arrayProperty = [];
            var innerProperty = [];
            for (var i = 0; i < mapper.dataMapSettings.length; i++) {
                if (mapper.dataMapSettings[parseInt(i.toString(), 10)].property.indexOf('.') !== -1) {
                    innerProperty = this.splitString(mapper.dataMapSettings[parseInt(i.toString(), 10)].property);
                    for (var p = 0; p < innerProperty.length; p++) {
                        if (innerProperty[parseInt(p.toString(), 10)].indexOf('[') !== -1) {
                            index = innerProperty[parseInt(p.toString(), 10)].indexOf('[');
                            arrayProperty = innerProperty[parseInt(p.toString(), 10)].split('[');
                        }
                    }
                    if (index) {
                        if (innerProperty[2]) {
                            obj[arrayProperty[0]][innerProperty[0].charAt(index + 1)][innerProperty[1]][innerProperty[2]] =
                                item[mapper.dataMapSettings[parseInt(i.toString(), 10)].field];
                        }
                        else {
                            var value = item[mapper.dataMapSettings[parseInt(i.toString(), 10)].field];
                            obj[arrayProperty[0]][innerProperty[0].charAt(index + 1)][innerProperty[1]] = value;
                        }
                    }
                    else {
                        if (innerProperty[2]) {
                            obj[innerProperty[0]][innerProperty[1]][innerProperty[2]]
                                = item[mapper.dataMapSettings[parseInt(i.toString(), 10)].field];
                        }
                        else {
                            obj[innerProperty[0]][innerProperty[1]] = item[mapper.dataMapSettings[parseInt(i.toString(), 10)].field];
                        }
                    }
                }
                else {
                    var property = mapper.dataMapSettings[parseInt(i.toString(), 10)].property;
                    property = property.charAt(0).toLowerCase() + property.slice(1);
                    obj["" + property] = item[mapper.dataMapSettings[parseInt(i.toString(), 10)].field];
                }
                index = 0;
                arrayProperty = [];
                innerProperty = [];
            }
        }
        if (!this.collectionContains(obj, diagram, mapper.id, mapper.parentId)) {
            return obj;
        }
        else {
            if (item[mapper.id] && isNaN(item[mapper.id])) {
                return this.dataTable[item[mapper.id].toLowerCase()];
            }
            else {
                return this.dataTable[item[mapper.id]];
            }
        }
    };
    DataBinding.prototype.getFlowChartNodeShape = function (data) {
        if (data.shape !== '') {
            switch (data.shape) {
                case 'Rectangle':
                    return { type: 'Basic', shape: 'Rectangle' };
                case 'Decision':
                    return { type: 'Flow', shape: 'Decision' };
                case 'Hexagon':
                    return { type: 'Path', data: 'M 0 0 L 2 -2 L 11 -2 L 13 0 L 11 2 L 2 2 L 0 0' };
                case 'Ellipse':
                    return { type: 'Basic', shape: 'Ellipse' };
                case 'Terminator':
                    return { type: 'Flow', shape: 'Terminator' };
                case 'PredefinedProcess':
                    return { type: 'Flow', shape: 'PreDefinedProcess' };
                case 'Parallelogram':
                    return { type: 'Basic', shape: 'Parallelogram' };
                case 'ParallelogramAlt':
                    return { type: 'Path', data: 'M 0 0 L 12 0 L 14 2 L 2 2 L 0 0' };
                case 'Trapezoid':
                    return { type: 'Path', data: 'M 0 0 L 1 -1 L 5 -1 L 6 0 L 0 0' };
                case 'TrapezoidAlt':
                    return { type: 'Path', data: 'M 0 0 L 5 0 L 4 1 L 1 1 L 0 0' };
                case 'DataSource':
                    return { type: 'Path', data: 'M 0 1 L 0 6 C 2 7 4 7 6 6 L 6 1 C 5 0 1 0 0 1 C 1 2 5 2 6 1' };
                case 'Asymmetric':
                    return { type: 'Path', data: 'M 0 0 L 8 0 L 8 2 L 0 2 L 2 1 L 0 0' };
                case 'DoubleCircle':
                    return { type: 'Path', data: 'M 0 0 A 1 1 0 0 0 7 0 A 1 1 0 0 0 0 0 M -1 0 A 1 1 0 0 0 8 0 A 1 1 0 0 0 -1 0' };
                case 'Document':
                    return { type: 'Flow', shape: 'Document' };
                case 'PaperTap':
                    return { type: 'Flow', shape: 'PaperTap' };
                case 'DirectData':
                    return { type: 'Flow', shape: 'DirectData' };
                case 'SequentialData':
                    return { type: 'Flow', shape: 'SequentialData' };
                case 'Sort':
                    return { type: 'Flow', shape: 'Sort' };
                case 'MultiDocument':
                    return { type: 'Flow', shape: 'MultiDocument' };
                case 'Collate':
                    return { type: 'Flow', shape: 'Collate' };
                case 'SummingJunction':
                    return { type: 'Flow', shape: 'SummingJunction' };
                case 'Or':
                    return { type: 'Flow', shape: 'Or' };
                case 'InternalStorage':
                    return { type: 'Flow', shape: 'InternalStorage' };
                case 'Extract':
                    return { type: 'Flow', shape: 'Extract' };
                case 'ManualOperation':
                    return { type: 'Flow', shape: 'ManualOperation' };
                case 'Merge':
                    return { type: 'Flow', shape: 'Merge' };
                case 'OffPageReference':
                    return { type: 'Flow', shape: 'OffPageReference' };
                case 'SequentialAccessStorage':
                    return { type: 'Flow', shape: 'SequentialAccessStorage' };
                case 'Data':
                    return { type: 'Flow', shape: 'Data' };
                case 'Card':
                    return { type: 'Flow', shape: 'Card' };
                case 'Delay':
                    return { type: 'Flow', shape: 'Delay' };
                case 'Preparation':
                    return { type: 'Flow', shape: 'Preparation' };
                case 'Display':
                    return { type: 'Flow', shape: 'Display' };
                case 'ManualInput':
                    return { type: 'Flow', shape: 'ManualInput' };
                case 'LoopLimit':
                    return { type: 'Flow', shape: 'LoopLimit' };
                case 'StoredData':
                    return { type: 'Flow', shape: 'StoredData' };
                case 'Annotation':
                    return { type: 'Flow', shape: 'Annotation' };
                case 'Annotation2':
                    return { type: 'Flow', shape: 'Annotation2' };
                default:
                    return { type: 'Flow', shape: 'Process' };
            }
        }
        return { type: 'Flow', shape: 'Process' };
    };
    DataBinding.prototype.splitString = function (property) {
        var temp = [];
        temp = property.split('.');
        for (var i = 0; i < temp.length; i++) {
            temp[parseInt(i.toString(), 10)] = temp[parseInt(i.toString(), 10)].charAt(0).toLowerCase()
                + temp[parseInt(i.toString(), 10)].slice(1);
        }
        return temp;
    };
    DataBinding.prototype.renderChildNodes = function (mapper, parent, value, rtNodes, diagram) {
        var child;
        var nextLevel;
        var node;
        for (var j = 0; j < parent.items.length; j++) {
            child = parent.items[parseInt(j.toString(), 10)];
            if (!child[mapper.id]) {
                continue;
            }
            node = this.applyNodeTemplate(mapper, child, diagram);
            var canBreak = false;
            if (!this.collectionContains(node, diagram, mapper.id, mapper.parentId)) {
                if (child[mapper.id] && isNaN(child[mapper.id])) {
                    this.dataTable[child[mapper.id].toLowerCase()] = node;
                }
                else {
                    this.dataTable[child[mapper.id]] = node;
                }
                diagram.nodes.push(node);
            }
            else {
                canBreak = true;
            }
            if (!this.containsConnector(diagram, value, node.id)) {
                diagram.connectors.push(this.applyConnectorTemplate(value, node.id, diagram));
            }
            if (!canBreak) {
                if (node.data[mapper.id] && isNaN(node.data[mapper.id])) {
                    nextLevel = rtNodes[node.data[mapper.id].toLowerCase()];
                }
                else {
                    nextLevel = rtNodes[node.data[mapper.id]];
                }
                if (nextLevel !== undefined) {
                    this.renderChildNodes(mapper, nextLevel, node.id, rtNodes, diagram);
                }
            }
        }
    };
    // Bug 832897: Need to improve performance while rendering layout with large number of nodes.
    // Replaced for loop with some() method to improve performance.
    DataBinding.prototype.containsConnector = function (diagram, sourceNode, targetNode) {
        if (sourceNode === '' || targetNode === '') {
            return false;
        }
        return diagram.connectors.some(function (connector) {
            return connector !== undefined && connector.sourceID === sourceNode && connector.targetID === targetNode;
        });
    };
    /**
     *  collectionContains method is used to  check wthear the node is already present in collection or not
     *
     * @param {Node} node
     * @param {Diagram} diagram
     * @param {string} id
     * @param {string} parentId
     */
    DataBinding.prototype.collectionContains = function (node, diagram, id, parentId) {
        var obj;
        if (isNaN(node.data["" + id]) && node.data["" + id]) {
            obj = this.dataTable[node.data["" + id].toLowerCase()];
        }
        else {
            obj = this.dataTable[node.data["" + id]];
        }
        if (obj !== undefined && obj.data["" + id] === node.data["" + id] && obj.data["" + parentId] === node.data["" + parentId]) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Get the Connector values
     *
     * @param {string} sNode
     * @param {string} tNode
     * @param {Diagram} diagram
     */
    DataBinding.prototype.applyConnectorTemplate = function (sNode, tNode, diagram) {
        var connModel = {
            id: randomId(), sourceID: sNode, targetID: tNode
        };
        var arrowType;
        //Task 895538: Flow-chart layout support for EJ2 diagram.
        //Added below code to set connector annotation and style based on the data.
        if (diagram.layout.type === 'Flowchart') {
            var targetNode = diagram.nodes.find(function (node) { return node.id === tNode; });
            if (typeof targetNode.data.label === 'string') {
                connModel.annotations = [{ content: targetNode.data.label }];
            }
            else if (Array.isArray(targetNode.data.label)) {
                var inConnectors = diagram.connectors.filter(function (connector) { return connector.targetID === tNode; });
                var index = 0;
                if (inConnectors.length > 0) {
                    index = inConnectors.length;
                }
                connModel.annotations = [{ content: targetNode.data.label[parseInt(index.toString(), 10)] }];
            }
            arrowType = this.getConnectorArrowType(targetNode.data);
        }
        var obj = new Connector(diagram, 'connectors', connModel, true);
        if (arrowType) {
            obj.style.strokeWidth = arrowType.strokeWidth;
            obj.targetDecorator.shape = arrowType.targetDecorator;
        }
        updateDefaultValues(obj, connModel, diagram.connectorDefaults);
        return obj;
    };
    DataBinding.prototype.getConnectorArrowType = function (data) {
        if (data.arrowType !== '') {
            switch (data.arrowType) {
                case 'None':
                    return { targetDecorator: 'None', strokeWidth: 1 };
                case 'Arrow':
                    return { targetDecorator: 'Arrow', strokeWidth: 1 };
                case 'Diamond':
                    return { targetDecorator: 'Diamond', strokeWidth: 1 };
                case 'Circle':
                    return { targetDecorator: 'Circle', strokeWidth: 1 };
                case 'OpenArrow':
                    return { targetDecorator: 'OpenArrow', strokeWidth: 1 };
                case 'Square':
                    return { targetDecorator: 'Square', strokeWidth: 1 };
                case 'Fletch':
                    return { targetDecorator: 'Fletch', strokeWidth: 1 };
                case 'OpenFetch':
                    return { targetDecorator: 'OpenFetch', strokeWidth: 1 };
                case 'IndentedArrow':
                    return { targetDecorator: 'IndentedArrow', strokeWidth: 1 };
                case 'OutdentedArrow':
                    return { targetDecorator: 'OutdentedArrow', strokeWidth: 1 };
                case 'DoubleArrow':
                    return { targetDecorator: 'DoubleArrow', strokeWidth: 1 };
                default:
                    return { targetDecorator: 'Arrow', strokeWidth: 1 };
            }
        }
        else {
            return { targetDecorator: 'Arrow', strokeWidth: 1 };
        }
    };
    return DataBinding;
}());
export { DataBinding };
