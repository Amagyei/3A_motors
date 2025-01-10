import { OrthogonalSegment } from '../objects/connector';
import { findDistance, findPort, getConnectorDirection } from '../utility/diagram-util';
import { randomId } from '../utility/base-util';
import { Point } from '../primitives/point';
import { PointPort } from '../objects/port';
import { Size } from '../primitives/size';
/**
 * Line Distribution
 * @private
 */
var LineDistribution = /** @class */ (function () {
    ///** @private */
    //public edgeMapper: EdgeMapperObject[];
    /**
     * Constructor for the line distribution module
     * @private
     */
    function LineDistribution() {
        //constructs the line distribution module
    }
    /**
     * To destroy the line distribution module
     * @returns {void}
     * @private
     */
    LineDistribution.prototype.destroy = function () {
        /**
         * Destroys the line distribution module
         */
    };
    ///**
    // * Get the diagram instance.
    // */
    //private diagram: Diagram;
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    LineDistribution.prototype.getModuleName = function () {
        /**
         * Returns the module name
         */
        return 'LineDistribution';
    };
    /** @private */
    LineDistribution.prototype.initLineDistribution = function (graph, diagram) {
        var srcDirection = 'Bottom';
        //this.diagram = diagram;
        if (diagram.layout.connectionPointOrigin === 'DifferentPoint' || diagram.layout.enableRouting) {
            var tarDirection = 'Top';
            if (graph.orientation === 'BottomToTop') {
                srcDirection = 'Top';
                tarDirection = 'Bottom';
            }
            else if (graph.orientation === 'RightToLeft') {
                srcDirection = 'Left';
                tarDirection = 'Right';
            }
            else if (graph.orientation === 'LeftToRight') {
                srcDirection = 'Right';
                tarDirection = 'Left';
            }
            var graphnodes = diagram.nodes;
            if (graphnodes.length > 0) {
                for (var i = 0; i < graphnodes.length; i++) {
                    var node = diagram.nameTable[graphnodes[parseInt(i.toString(), 10)].id];
                    this.addDynamicPortandDistrrbuteLine(graph, node, srcDirection, tarDirection, diagram);
                }
            }
        }
    };
    LineDistribution.prototype.ObstacleSegment = function (options) {
        options.direction = getConnectorDirection(options.startpt, options.endpt);
        options.distance = Point.findLength(options.startpt, options.endpt);
        options.orientation = options.direction === 'Left' || options.direction === 'Right' ? 'horizontal' : 'vertical';
        // eslint-disable-next-line no-self-assign
        options.id = options.id;
        if (options.orientation === 'horizontal') {
            options.coord = options.startpt.y;
            if (options.direction === 'Left') {
                options.start = options.endpt.x;
                options.end = options.startpt.x;
            }
            else {
                options.start = options.startpt.x;
                options.end = options.endpt.x;
            }
        }
        else {
            options.coord = options.startpt.x;
            if (options.direction === 'Top') {
                options.start = options.endpt.y;
                options.end = options.startpt.y;
            }
            else {
                options.start = options.startpt.y;
                options.end = options.endpt.y;
            }
        }
        return options;
    };
    /** @private */
    LineDistribution.prototype.distributeLines = function (layout, diagram) {
        var isHorizontal = layout.orientation === 'LeftToRight'
            || layout.orientation === 'RightToLeft';
        var inversespacing = !isHorizontal ? layout.verticalSpacing : layout.horizontalSpacing;
        var srcdecoratorSize = 8.0;
        var obstacleCollection = 'obstaclePointCollection';
        var tardecoratorSize = 10.0;
        var avaibaleSpace = inversespacing - srcdecoratorSize - tardecoratorSize;
        var graph = [];
        var connectorObstacles = [];
        var globalConnectors = diagram.connectors;
        for (var i = 0; i < globalConnectors.length; i++) {
            var connector = globalConnectors[parseInt(i.toString(), 10)];
            var pts = [];
            for (var key = 0; key < connector.segments.length; key++) {
                var seg = connector.segments[parseInt(key.toString(), 10)];
                for (var k = 0; k < seg.points.length; k++) {
                    var pt = seg.points[parseInt(k.toString(), 10)];
                    if (pts.length === 0 || !(Point.equals(pt, pts[pts.length - 1]))) {
                        pts.push(pt);
                    }
                }
            }
            var obssegments = [];
            for (var j = 1; j < pts.length; j++) {
                var obstacle = this.ObstacleSegment({
                    startpt: pts[j - 1], endpt: pts[parseInt(j.toString(), 10)], id: connector.id
                });
                obssegments.push(obstacle);
            }
            var connectorObstacle = { wrapper: connector, segments: obssegments };
            var segments = [];
            if (!isHorizontal) {
                for (var key = 0; key < connectorObstacle.segments.length; key++) {
                    var obstacle = connectorObstacle.segments[parseInt(key.toString(), 10)];
                    if (obstacle.orientation === 'horizontal') {
                        segments.push(obstacle);
                    }
                }
            }
            else {
                for (var key = 0; key < connectorObstacle.segments.length; key++) {
                    var obstacle = connectorObstacle.segments[parseInt(key.toString(), 10)];
                    if (obstacle.orientation === 'vertical') {
                        segments.push(obstacle);
                    }
                }
            }
            for (var j = 0; j < segments.length; j++) {
                var obstacleSegment = segments[parseInt(j.toString(), 10)];
                if (!this.containsValue(graph, obstacleSegment.coord)) {
                    graph.push({ key: obstacleSegment.coord, value: [] });
                }
                var index = void 0;
                for (var k = 0; k < graph.length; k++) {
                    var key = graph[parseInt(k.toString(), 10)].key;
                    if (Number(key) === obstacleSegment.coord) {
                        index = k;
                        break;
                    }
                }
                graph[parseInt(index.toString(), 10)].value.push(obstacleSegment);
            }
            connectorObstacles.push(connectorObstacle);
        }
        this.sortConnectors(graph, diagram);
        var modifiedgrap = [];
        for (var m = 0; m < graph.length; m++) {
            var row = graph[parseInt(m.toString(), 10)];
            var sortedrow = row.value;
            sortedrow.sort();
            var groupby = void 0;
            groupby = [];
            var index = 0;
            var maxEnd = Number.MIN_VALUE;
            groupby.push([]);
            for (var n = 0; n < sortedrow.length; n++) {
                var obstacleSegment = sortedrow[parseInt(n.toString(), 10)];
                if (!(groupby[parseInt(index.toString(), 10)].length > 0) || maxEnd >= obstacleSegment.start) {
                    groupby[parseInt(index.toString(), 10)].push(obstacleSegment);
                    maxEnd = Math.max(maxEnd, groupby[parseInt(index.toString(), 10)][groupby[parseInt(index.toString(), 10)].length - 1].end);
                }
                else {
                    index++;
                    groupby.push([]);
                    groupby[parseInt(index.toString(), 10)].push(obstacleSegment);
                    maxEnd = groupby[parseInt(index.toString(), 10)][groupby[parseInt(index.toString(), 10)].length - 1].end;
                }
            }
            for (var n = 0; n < groupby.length; n++) {
                var group = groupby[parseInt(n.toString(), 10)];
                var sortedGroup = [];
                for (var j = 0; j < group.length; j++) {
                    var e = group[parseInt(j.toString(), 10)];
                    if (e.start) {
                        sortedGroup.push(e);
                    }
                }
                var comparingDir = isHorizontal ? 'Bottom' : 'Right';
                var directed = [];
                for (var j = 0; j < sortedGroup.length; j++) {
                    var e = sortedGroup[parseInt(j.toString(), 10)];
                    if (e.direction === comparingDir) {
                        directed.push(e);
                    }
                }
                var reversedirected = [];
                for (var j = 0; j < sortedGroup.length; j++) {
                    var e = sortedGroup[parseInt(j.toString(), 10)];
                    if (e.direction !== comparingDir) {
                        reversedirected.push(e);
                    }
                }
                var mutual = [];
                if (directed.length > 0) {
                    var temp = directed[0].start;
                    var j = 0;
                    while (j < reversedirected.length) {
                        if (reversedirected[parseInt(j.toString(), 10)].end > temp) {
                            mutual.push(reversedirected[parseInt(j.toString(), 10)]);
                            reversedirected.splice(j, 1);
                        }
                        else {
                            j++;
                        }
                    }
                }
                var mutualRow = [];
                mutualRow = this.updateSegmentRow(mutual, mutualRow);
                var directedRow = [];
                directedRow = [];
                directedRow = this.updateSegmentRow(reversedirected, directedRow);
                directed.reverse();
                directedRow = this.updateSegmentRow(directed, directedRow);
                if (!(mutualRow[mutualRow.length - 1].length > 0)) {
                    mutualRow.splice(mutualRow.length - 1, 1);
                }
                if (!(directedRow[directedRow.length - 1].length > 0)) {
                    directedRow.splice(directedRow.length - 1, 1);
                }
                var subrow = [];
                var descAdding = mutual.length > 0 && (sortedGroup[sortedGroup.length - 1].direction
                    === mutual[mutual.length - 1].direction
                    || sortedGroup[0].direction === mutual[0].direction);
                if (descAdding) {
                    subrow = directedRow;
                    for (var p = 0; p < mutualRow.length; p++) {
                        var obj = mutualRow[parseInt(p.toString(), 10)];
                        subrow[subrow.length] = obj;
                    }
                }
                else {
                    subrow = mutualRow;
                    for (var p = 0; p < directedRow.length; p++) {
                        var obj = directedRow[parseInt(p.toString(), 10)];
                        subrow[subrow.length] = obj;
                    }
                }
                if (subrow.length > 1) {
                    var directionModifier = 1;
                    if (layout.orientation === 'BottomToTop'
                        || layout.orientation === 'RightToLeft') {
                        directionModifier = -1;
                    }
                    var startCoord = row.key - (directionModifier * avaibaleSpace / 2.0);
                    var diff = avaibaleSpace / subrow.length;
                    for (var i = 0; i < subrow.length; i++) {
                        var newcoord = startCoord + (i * diff * directionModifier);
                        for (var p = 0; p < subrow[parseInt(i.toString(), 10)].length; p++) {
                            var obstacleSegment = subrow[parseInt(i.toString(), 10)][parseInt(p.toString(), 10)];
                            obstacleSegment.coord = newcoord;
                            if (!this.containsValue(modifiedgrap, obstacleSegment.coord)) {
                                modifiedgrap.push({ key: obstacleSegment.coord, value: [] });
                            }
                            var index_1 = void 0;
                            for (var k = 0; k < modifiedgrap.length; k++) {
                                var keyCheck = modifiedgrap[parseInt(k.toString(), 10)].key;
                                if (keyCheck === obstacleSegment.coord) {
                                    index_1 = k;
                                    break;
                                }
                            }
                            modifiedgrap[parseInt(index_1.toString(), 10)].value.push(obstacleSegment);
                        }
                    }
                }
            }
        }
        for (var m = 0; m < connectorObstacles.length; m++) {
            var connectorObstacle = connectorObstacles[parseInt(m.toString(), 10)];
            var pts = [];
            for (var i = 0; i < connectorObstacle.segments.length; i++) {
                if (i === 0) {
                    pts.push(this.getObstacleStartPoint(connectorObstacle.segments[parseInt(i.toString(), 10)]));
                }
                else if (isHorizontal) {
                    if (connectorObstacle.segments[parseInt(i.toString(), 10)].orientation === 'vertical') {
                        pts[pts.length - 1] = this.getObstacleStartPoint(connectorObstacle.segments[parseInt(i.toString(), 10)]);
                    }
                }
                else if (!isHorizontal) {
                    if (connectorObstacle.segments[parseInt(i.toString(), 10)].orientation === 'horizontal') {
                        pts[pts.length - 1] = this.getObstacleStartPoint(connectorObstacle.segments[parseInt(i.toString(), 10)]);
                    }
                }
                pts.push(this.getObstacleEndPoint(connectorObstacle.segments[parseInt(i.toString(), 10)]));
            }
            /* tslint:disable */
            connectorObstacle.wrapper["" + obstacleCollection] = [];
            for (var j = 0; j < pts.length; j++) {
                var point = pts[parseInt(j.toString(), 10)];
                if (j === 0 || (j > 0 && !(Point.equals(point, pts[j - 1])))) {
                    connectorObstacle.wrapper["" + obstacleCollection].push(this.getPointvalue(point.x, point.y));
                }
            }
            /* tslint:enable */
            //EJ2-70198 - The layout ConnectionPointOrigin DifferentPoint property is not working for bezier connector
            //Bug 851920: Connector overlaps the node in complex hierarchical tree layout. Here the below condition is modified to check connector type.
            if (connectorObstacle.wrapper.type === 'Orthogonal') {
                this.resetConnectorPoints(connectorObstacle.wrapper, diagram);
            }
        }
    };
    //Bug 862601: Connectors are not rendered properly with lineRouting and lineDistribution enables during doLayout process.
    //To sort the connectors order in graph based on its target point and orientation to avoid connector segments path in same line.
    LineDistribution.prototype.sortConnectors = function (graph, diagram) {
        for (var i = 0; i < graph.length; i++) {
            for (var j = 0; j < graph[parseInt(i.toString(), 10)].value.length; j++) {
                if (graph[parseInt(i.toString(), 10)].value.length > 1) {
                    if (diagram.layout.orientation === 'LeftToRight' || diagram.layout.orientation === 'RightToLeft') {
                        graph[parseInt(i.toString(), 10)].value.sort(function (a, b) {
                            var connectorA = diagram.nameTable["" + a.id];
                            var connectorB = diagram.nameTable["" + b.id];
                            return connectorA.targetPoint.y - connectorB.targetPoint.y;
                        });
                    }
                    else if (diagram.layout.orientation === 'TopToBottom' || diagram.layout.orientation === 'BottomToTop') {
                        graph[parseInt(i.toString(), 10)].value.sort(function (a, b) {
                            var connectorA = diagram.nameTable["" + a.id];
                            var connectorB = diagram.nameTable["" + b.id];
                            return connectorA.targetPoint.x - connectorB.targetPoint.x;
                        });
                    }
                }
            }
        }
    };
    //private inflate(rect: Rect, x: number, y: number): Rect {
    //    rect.x -= x;
    //    rect.y -= y;
    //    rect.width += 2 * x;
    //    rect.height += 2 * y;
    //    return rect;
    //}
    //private updateConnectorPoints(
    //    connectorPoints: Point[], startSegmentSize: number, intermediatePoint: Point, bounds: object, orientation: string):
    //    Point[] {
    //    const layoutBounds: Rect = bounds as Rect;
    //    const isHorizontal: boolean = orientation === 'LeftToRight' || orientation === 'RightToLeft';
    //    const pts: Point[] = connectorPoints;
    //    if (pts.length > 2) {
    //        const newPt: Point = Point.transform(pts[0], Point.findAngle(pts[0], pts[1]), startSegmentSize) as Point;
    //        const nextPt: Point = Point.transform(newPt, Point.findAngle(pts[1], pts[2]), Point.findLength(pts[1], pts[2])) as Point;
    //        pts.splice(1, 2, newPt, nextPt);
    //        if (intermediatePoint != null) {
    //            const index: number = 2;
    //            const ptsCount: number = pts.length;
    //            const newPt1: Point = Point.transform(
    //                pts[ptsCount - 1],
    //                Point.findAngle(pts[ptsCount - 1], pts[ptsCount - 2]),
    //                startSegmentSize) as Point;
    //            pts.splice(ptsCount - 1, 0, newPt1);
    //            while (index < (pts.length - 2)) {
    //                pts.splice(index, 1);
    //            }
    //            const edgePt: Point = intermediatePoint;
    //            this.inflate((layoutBounds as Rect), (layoutBounds as Rect).width, layoutBounds.height);
    //            const line1: Point[] = [];
    //            line1[0] = this.getPointvalue(edgePt.x, layoutBounds.y) as Point;
    //            line1[1] = this.getPointvalue(edgePt.x, layoutBounds.y + layoutBounds.height) as Point;
    //            const line2: Point[] = [];
    //            line2[0] = this.getPointvalue(layoutBounds.x, pts[1].y) as Point;
    //            line2[1] = this.getPointvalue(layoutBounds.x + layoutBounds.width, pts[1].y) as Point;
    //            const line3: Point[] = [];
    //            line3[0] = this.getPointvalue(layoutBounds.x, newPt1.y) as Point;
    //            line3[1] = this.getPointvalue(layoutBounds.x + layoutBounds.width, newPt1.y) as Point;
    //            if (isHorizontal) {
    //                line1[0] = this.getPointvalue(layoutBounds.x, edgePt.y) as Point;
    //                line1[1] = this.getPointvalue(layoutBounds.x + layoutBounds.width, edgePt.y) as Point;
    //                line2[0] = this.getPointvalue(pts[1].x, layoutBounds.y) as Point;
    //                line2[1] = this.getPointvalue(pts[1].x, layoutBounds.y + layoutBounds.height) as Point;
    //                line3[0] = this.getPointvalue(newPt1.x, layoutBounds.y) as Point;
    //                line2[1] = this.getPointvalue(newPt1.x, layoutBounds.y + layoutBounds.height) as Point;
    //            }
    //            const intercepts1: Point[] = [intersect2(
    //                line1[0] as Point,
    //                line1[1] as Point, line2[0] as Point, line2[1] as Point)] as Point[];
    //            const intercepts2: Point[] = [intersect2(
    //                line1[0] as Point, line1[1] as Point,
    //                line3[0] as Point, line3[1] as Point)] as Point[];
    //            if (intercepts2.length > 0) {
    //                pts.splice(2, 0, intercepts2[0]);
    //            }
    //            if (intercepts1.length > 0) {
    //                pts.splice(2, 0, intercepts1[0]);
    //            }
    //        }
    //    }
    //    let i: number = 1;
    //    while (i < pts.length - 1) {
    //        if (Point.equals(pts[i - 1], pts[parseInt(i.toString(), 10)])) {
    //            pts.splice(i, 1);
    //        } else if (Point.findAngle(pts[i - 1], pts[parseInt(i.toString(), 10)])
    //            === Point.findAngle(pts[parseInt(i.toString(), 10)], pts[i + 1])) {
    //            pts.splice(i, 1);
    //        } else {
    //            i++;
    //        }
    //    }
    //    return pts;
    //}
    /* tslint:disable */
    LineDistribution.prototype.resetConnectorPoints = function (edge, diagram) {
        var obstacleCollection = 'obstaclePointCollection';
        if (edge.segments[0].points
            && edge.segments[0].points.length > 0 && edge["" + obstacleCollection]) {
            var connector = edge;
            connector.sourcePoint = edge["" + obstacleCollection][0];
            connector.targetPoint = edge["" + obstacleCollection][edge["" + obstacleCollection].length - 1];
            var segments = void 0;
            segments = [];
            for (var i = 0; i < edge["" + obstacleCollection].length - 1; i++) {
                var point1 = edge["" + obstacleCollection][parseInt(i.toString(), 10)];
                var point2 = edge["" + obstacleCollection][i + 1];
                var length_1 = findDistance(point1, point2);
                var direction = getConnectorDirection(point1, point2);
                if (i === edge["" + obstacleCollection].length - 2) {
                    if ((diagram.layout.orientation === 'RightToLeft' && direction === 'Left')
                        || (diagram.layout.orientation === 'LeftToRight' && direction === 'Right')
                        || (diagram.layout.orientation === 'TopToBottom' && direction === 'Bottom')
                        || (diagram.layout.orientation === 'BottomToTop' && direction === 'Top')) {
                        length_1 = length_1 / 2;
                    }
                }
                /* tslint:enable */
                var tempSegment = new OrthogonalSegment(edge, 'segments', { type: 'Orthogonal' }, true);
                tempSegment.length = length_1;
                tempSegment.direction = direction;
                segments.push(tempSegment);
            }
            connector.segments = segments;
            connector.type = 'Orthogonal';
            diagram.connectorPropertyChange(connector, {}, {
                type: 'Orthogonal',
                segments: connector.segments
            });
        }
    };
    LineDistribution.prototype.getObstacleEndPoint = function (segment) {
        if (segment.orientation === 'horizontal') {
            if (segment.direction === 'Left') {
                return this.getPointvalue(segment.start, segment.coord);
            }
            return this.getPointvalue(segment.end, segment.coord);
        }
        if (segment.direction === 'Top') {
            return this.getPointvalue(segment.coord, segment.start);
        }
        return this.getPointvalue(segment.coord, segment.end);
    };
    LineDistribution.prototype.getObstacleStartPoint = function (segment) {
        if (segment.orientation === 'horizontal') {
            if (segment.direction === 'Left') {
                return this.getPointvalue(segment.end, segment.coord);
            }
            return this.getPointvalue(segment.start, segment.coord);
        }
        if (segment.direction === 'Top') {
            return this.getPointvalue(segment.coord, segment.end);
        }
        return this.getPointvalue(segment.coord, segment.start);
    };
    LineDistribution.prototype.updateSegmentRow = function (obstacleSegments, segmentRow) {
        var k = 0;
        if (!(segmentRow.length > 0)) {
            segmentRow[0] = [];
        }
        for (var i = 0; i < obstacleSegments.length; i++) {
            var obstacleSegment = obstacleSegments[parseInt(i.toString(), 10)];
            while (k < segmentRow.length) {
                if (k === segmentRow.length - 1) {
                    segmentRow[k + 1] = [];
                }
                if (!(segmentRow[parseInt(k.toString(), 10)].length > 0)
                    || segmentRow[parseInt(k.toString(), 10)][segmentRow[parseInt(k.toString(), 10)].length - 1].end
                        < obstacleSegment.start) {
                    segmentRow[parseInt(k.toString(), 10)].push(obstacleSegment);
                    break;
                }
                k++;
            }
        }
        return segmentRow;
    };
    LineDistribution.prototype.portOffsetCalculation = function (port, length, direction, i) {
        if (direction === 'Top') {
            port.offset = { x: (i + 1) * (1.0 / (length + 1)), y: 0 };
        }
        if (direction === 'Bottom') {
            port.offset = { x: (i + 1) * (1.0 / (length + 1)), y: 1 };
        }
        if (direction === 'Left') {
            port.offset = { x: 0, y: (i + 1) * (1.0 / (length + 1)) };
        }
        if (direction === 'Right') {
            port.offset = { x: 1, y: (i + 1) * (1.0 / (length + 1)) };
        }
    };
    LineDistribution.prototype.addDynamicPortandDistrrbuteLine = function (layout, node, sourceDirection, targetDirection, diagram) {
        if ((node.ports && node.ports.length > 0)) {
            var port = node.ports;
            diagram.removePorts(node, port);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var existingPorts = node.ports;
        var outConnectors = node.outEdges;
        var inConnectors = node.inEdges;
        this.initPort(outConnectors, diagram, node, sourceDirection, false);
        this.initPort(inConnectors, diagram, node, targetDirection, true);
    };
    /* tslint:disable */
    LineDistribution.prototype.initPort = function (connectors, diagram, node, targetDirection, inConnectors) {
        var obstacleCollection = 'obstaclePointCollection';
        var objects = connectors;
        // EJ2-61463 - Added below code to sort the objects based on the source node offset position
        if (connectors.length > 1 && inConnectors) {
            connectors = this.sortObjects(objects, inConnectors, diagram);
        }
        for (var i = 0; i <= connectors.length - 1; i++) {
            var internalConnector = diagram.nameTable[connectors[parseInt(i.toString(), 10)]];
            internalConnector["" + obstacleCollection] = [];
            var newPort = findPort(node, inConnectors ? internalConnector.targetPortID : internalConnector.sourcePortID);
            var direction = targetDirection;
            if (newPort === undefined) {
                newPort = new PointPort(node, 'ports', '', true);
                newPort.id = randomId() + '_LineDistribution';
                if (inConnectors) {
                    internalConnector.targetPortID = newPort.id;
                }
                else {
                    internalConnector.sourcePortID = newPort.id;
                }
            }
            this.portOffsetCalculation(newPort, connectors.length, direction, i);
            node.ports.push(newPort);
            var portWrapper = node.initPortWrapper(node.ports[node.ports.length - 1]);
            node.wrapper.children.push(portWrapper);
            // EJ2-66867 -  Exception occurs on calling doLayout while injecting Linerouting module
            // nodes portWrapper bouds is updated below
            node.wrapper.measure(new Size(node.width, node.height), node.id);
            node.wrapper.arrange(node.wrapper.desiredSize);
            diagram.connectorPropertyChange(internalConnector, inConnectors ? { targetPortID: '' } : { sourcePortID: '' }, 
            // eslint-disable-next-line
            inConnectors ? { targetPortID: newPort.id } : { sourcePortID: newPort.id });
        }
    };
    /* tslint:enable */
    //EJ2-61463 - Method used to sort the connectors based on the source node offset position
    LineDistribution.prototype.sortObjects = function (objects, inConnectors, diagram) {
        var temp;
        for (var i = 0; i < objects.length; i++) {
            for (var j = i + 1; j < objects.length; j++) {
                var internalConnector = diagram.nameTable[objects[parseInt(i.toString(), 10)]];
                var internalConnector2 = diagram.nameTable[objects[parseInt(j.toString(), 10)]];
                if (inConnectors) {
                    var childNode = diagram.nameTable[internalConnector.sourceID];
                    var childNode2 = diagram.nameTable[internalConnector2.sourceID];
                    // For LeftToRight and RightToLeft we want to consider source node offsetY position
                    if (diagram.layout.orientation === 'LeftToRight' || diagram.layout.orientation === 'RightToLeft') {
                        if (childNode.offsetY > childNode2.offsetY) {
                            temp = objects[parseInt(i.toString(), 10)];
                            objects[parseInt(i.toString(), 10)] = objects[parseInt(j.toString(), 10)];
                            objects[parseInt(j.toString(), 10)] = temp;
                        }
                    }
                    else {
                        // For TopToBottom or BottomToTop means we want to consider source node offsetX position
                        if (childNode.offsetX > childNode2.offsetX) {
                            temp = objects[parseInt(i.toString(), 10)];
                            objects[parseInt(i.toString(), 10)] = objects[parseInt(j.toString(), 10)];
                            objects[parseInt(j.toString(), 10)] = temp;
                        }
                    }
                }
            }
        }
        return objects;
    };
    //private shiftMatrixCells(
    //    value: number, startingCell: MatrixCellGroupObject, shiftChildren: boolean,
    //    parentCell: MatrixCellGroupObject, matrixModel: MatrixModelObject):
    //    void {
    //    if (!(value === 0)) {
    //        const matrix: MatrixObject[] = matrixModel.matrix;
    //        const matrixRow: MatrixCellGroupObject[] = matrix[startingCell.level].value;
    //        const index: number = matrixRow.indexOf(startingCell);
    //        for (let i: number = index; i < matrixRow.length; i++) {
    //            matrixRow[parseInt(i.toString(), 10)].offset += value;
    //        }
    //        if (shiftChildren) {
    //            if (startingCell.visitedChildren.length > 0) {
    //                this.shiftMatrixCells(
    //                    value,
    //                    startingCell.visitedChildren[0],
    //                    true,
    //                    startingCell,
    //                    matrixModel);
    //            } else {
    //                let i: number = 1;
    //                let nextSibilingwithChild: MatrixCellGroupObject = null;
    //                while (index + i < matrixRow.length) {
    //                    const nextCell: MatrixCellGroupObject = matrixRow[index + i];
    //                    if (parentCell != null && this.containsValue(nextCell.visitedParents, parentCell)) {
    //                        if (nextCell.visitedChildren.length > 0) {
    //                            nextSibilingwithChild = nextCell;
    //                        } else {
    //                            i++;
    //                            continue;
    //                        }
    //                    }
    //                    break;
    //                }
    //                if (nextSibilingwithChild != null) {
    //                    this.shiftMatrixCells(
    //                        value,
    //                        nextSibilingwithChild.visitedChildren[0],
    //                        true,
    //                        nextSibilingwithChild,
    //                        matrixModel);
    //                }
    //            }
    //        }
    //    }
    //}
    //private arrangeMatrix(cell: MatrixCellGroupObject, parent: MatrixCellGroupObject, matrixModel: MatrixModelObject): void {
    //    const layoutSettings: LayoutProp = matrixModel.model.layout;
    //    const isHorizontal: boolean = layoutSettings.orientation === 'LeftToRight'
    //        || layoutSettings.orientation === 'RightToLeft';
    //    const spacing: number = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
    //    const matrix: MatrixObject[] = matrixModel.matrix;
    //    const matrixRow: MatrixCellGroupObject[] = matrix[cell.level].value;
    //    const matrixIndex: number = matrixRow.indexOf(cell);
    //    if (cell.visitedParents.length > 0) {
    //        if (cell.visitedParents.length === 1) {
    //            cell.initialOffset = cell.offset;
    //        }
    //        if (matrixIndex + 1 < matrixRow.length) {
    //            const nextCell: MatrixCellGroupObject = matrixRow[matrixIndex + 1];
    //            if (nextCell.visitedParents.length > 0) {
    //                if (!this.containsValue(cell.visitedParents, parent)) {
    //                    cell.visitedParents.push(parent);
    //                    parent.ignoredChildren.push(cell);
    //                    return;
    //                }
    //            }
    //        }
    //    }
    //    if (!(cell.children.length > 0)) {
    //        let validOffset: number = cell.offset;
    //        if (matrixIndex > 0) {
    //            const prevCell: MatrixCellGroupObject = matrixRow[matrixIndex - 1];
    //            validOffset = prevCell.offset + (prevCell.size / 2) + spacing + (cell.size / 2);
    //        }
    //        this.shiftMatrixCells(validOffset - cell.offset, cell, false, null, matrixModel);
    //    } else {
    //        for (let i: number = 0; i < cell.children.length; i++) {
    //            const matrixCellChild: MatrixCellGroupObject = cell.children[parseInt(i.toString(), 10)];
    //            if (!this.containsValue(cell.visitedChildren, matrixCellChild)) {
    //                this.arrangeMatrix(matrixCellChild, cell, matrixModel);
    //                cell.visitedChildren.push(matrixCellChild);
    //            }
    //        }
    //        if (cell.visitedChildren.length > 0) {
    //            const children: MatrixCellGroupObject[] = cell.visitedChildren.slice();
    //            for (let i: number = 0; i < cell.ignoredChildren.length; i++) {
    //                //let cellIgnoredChild: MatrixCellGroupObject = cell.ignoredChildren[i];
    //                children.splice(0, 1);
    //                cell.visitedChildren.splice(0, 1);
    //            }
    //            if (children.length > 0) {
    //                const firstChild: MatrixCellGroupObject = cell.visitedChildren[0];
    //                const lastChild: MatrixCellGroupObject = cell.visitedChildren[cell.visitedChildren.length - 1];
    //                const x1: number = firstChild.offset - (firstChild.size / 2);
    //                const x2: number = lastChild.offset + (lastChild.size / 2);
    //                const newoffset: number = (x1 + x2) / 2;
    //                if (newoffset < cell.offset) {
    //                    this.shiftMatrixCells(cell.offset - newoffset, firstChild, true, cell, matrixModel);
    //                } else if (newoffset > cell.offset) {
    //                    this.shiftMatrixCells(newoffset - cell.offset, cell, false, null, matrixModel);
    //                }
    //            }
    //        }
    //    }
    //    if (!this.containsValue(cell.visitedParents, parent)) {
    //        cell.visitedParents.push(parent);
    //    }
    //}
    /** @private */
    LineDistribution.prototype.resetConnectorSegments = function (connector) {
        var segements = connector.segments;
        for (var i = segements.length; i > 0; i--) {
            segements.splice(i - 1, 1);
        }
    };
    /* tslint:disable */
    /** @private */
    LineDistribution.prototype.resetRoutingSegments = function (connector, diagram, points) {
        if (connector['levelSkip']) {
            //Bug 877799: Optimize the routing segment distance while using enableRouting in layout.
            var sourceLevel = void 0;
            var targetLevel = void 0;
            var collection = diagram.layout.ranks.reverse();
            //To find the source level and target level of the level skip connector
            for (var i = 0; i < collection.length; i++) {
                for (var j = 0; j < collection[parseInt(i.toString(), 10)].length; j++) {
                    if (connector.sourceID === collection[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].id) {
                        sourceLevel = i;
                    }
                    if (connector.targetID === collection[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].id) {
                        targetLevel = i;
                    }
                }
            }
            // To find the overlapping collection between the source and target level
            var overlappCollection = [];
            if (sourceLevel < targetLevel) {
                for (var i = 0; i < collection.length; i++) {
                    if (i > sourceLevel && i < targetLevel) {
                        overlappCollection.push(collection[parseInt(i.toString(), 10)]);
                    }
                }
            }
            else {
                for (var i = 0; i < collection.length; i++) {
                    if (i < sourceLevel && i > targetLevel) {
                        overlappCollection.push(collection[parseInt(i.toString(), 10)]);
                    }
                }
            }
            // To find the overlapping nodes between the source and target level
            var overLapNodesCollection = [];
            for (var i = 0; i < overlappCollection.length; i++) {
                for (var j = 0; j < overlappCollection[parseInt(i.toString(), 10)].length; j++) {
                    if (overlappCollection[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].edges === undefined) {
                        var node = diagram.nameTable[overlappCollection[parseInt(i.toString(), 10)][parseInt(j.toString(), 10)].id];
                        overLapNodesCollection.push(node);
                    }
                }
            }
            var isInsideBounds = false;
            if (!diagram.routingConnectors) {
                diagram.routingConnectors = [];
            }
            //To find whether the connector is overlapping with the nodes in the overlapping collection.
            // eslint-disable-next-line no-labels
            overlapping: for (var count = 0; count < overLapNodesCollection.length; count++) {
                var bounds = overLapNodesCollection[parseInt(count.toString(), 10)].wrapper.bounds;
                for (var i = 0; i < connector.segments.length; i++) {
                    var points_1 = connector.segments[parseInt(i.toString(), 10)].points;
                    for (var j = 0; j < points_1.length; j++) {
                        var lineStart = points_1[parseInt(j.toString(), 10)];
                        var lineEnd = points_1[j + 1];
                        if (lineEnd) {
                            var connectorPoints = this.pointsAlongLine(lineStart, lineEnd);
                            isInsideBounds = this.pointInsideBounds(connectorPoints, bounds);
                            if (isInsideBounds) {
                                diagram.routingConnectors.push(connector);
                                // eslint-disable-next-line no-labels
                                break overlapping;
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * Calculates points along a line between two given points.
     *  @param start The starting point of the line.
     *  @param end The ending point of the line.
     *  @return An array of points along the line.
     */
    LineDistribution.prototype.pointsAlongLine = function (start, end) {
        var granularity = 1;
        var dx = end.x - start.x;
        var dy = end.y - start.y;
        var length = Math.sqrt(dx * dx + dy * dy);
        var stepX = (dx / length) * granularity;
        var stepY = (dy / length) * granularity;
        var points = [];
        for (var i = 0; i <= length; i += granularity) {
            points.push({ x: start.x + stepX * i, y: start.y + stepY * i });
        }
        return points;
    };
    /**
     *
     * Checks if any of the given points fall inside the specified bounding rectangle.
     *  @param points An array of points to be checked.
     *  @param bounds The bounding rectangle to check against.
     *  @return True if any point is inside the bounds, false otherwise.
     */
    LineDistribution.prototype.pointInsideBounds = function (points, bounds) {
        var padding = 10;
        for (var _i = 0, points_2 = points; _i < points_2.length; _i++) {
            var point = points_2[_i];
            if (bounds.right > point.x &&
                bounds.left < point.x &&
                bounds.top < point.y &&
                bounds.bottom > point.y) {
                return true;
            }
        }
        return false;
    };
    /* tslint:enable */
    /** @private */
    //public arrangeElements(matrixModel: MatrixModelObject, layout: Layout): void {
    //    const layoutSettings: LayoutProp = matrixModel.model.layout;
    //    let isHorizontal: boolean;
    //    if (layout.orientation === 'LeftToRight' || layout.orientation === 'RightToLeft') {
    //        isHorizontal = true;
    //    } else {
    //        isHorizontal = false;
    //    }
    //    const spacing: number = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
    //    //let spacingInverse: number = !isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
    //    // Need to group element before
    //    this.groupLayoutCells(matrixModel);
    //    this.createMatrixCells(matrixModel);
    //    for (let j: number = 0; j < matrixModel.matrix.length; j++) {
    //        const matrixKey: number = matrixModel.matrix[parseInt(j.toString(), 10)].key;
    //        const matrixrow: MatrixCellGroupObject[] = matrixModel.matrix[parseInt(matrixKey.toString(), 10)].value;
    //        for (let i: number = 1; i < matrixrow.length; i++) {
    //            const cell: MatrixCellGroupObject = matrixrow[parseInt(i.toString(), 10)];
    //            const prevCell: MatrixCellGroupObject = matrixrow[i - 1];
    //            cell.offset += prevCell.offset + (prevCell.size / 2) + spacing + (cell.size / 2);
    //        }
    //    }
    //    for (let j: number = 0; j < matrixModel.matrix[0].value.length; j++) {
    //        const root: MatrixCellGroupObject = matrixModel.matrix[0].value[parseInt(j.toString(), 10)];
    //        this.arrangeMatrix(root, null, matrixModel);
    //    }
    //    for (let k: number = 0; k < matrixModel.matrix.length; k++) {
    //        const row: MatrixCellGroupObject[] = matrixModel.matrix[parseInt(k.toString(), 10)].value;
    //        for (let i: number = 0; i < row.length; i++) {
    //            const cell: MatrixCellGroupObject = row[parseInt(i.toString(), 10)];
    //            if (cell.visitedParents.length > 1) {
    //                let firstParent: MatrixCellGroupObject = cell.visitedParents[0];
    //                let lastParent: MatrixCellGroupObject = cell.visitedParents[cell.visitedParents.length - 1];
    //                const firstVertexParent: MatrixCellGroupObject = this.findParentVertexCellGroup(firstParent);
    //                const lastVertexParent: MatrixCellGroupObject = this.findParentVertexCellGroup(lastParent);
    //                if (firstParent !== firstVertexParent && firstVertexParent.offset < firstParent.offset) {
    //                    firstParent = firstVertexParent;
    //                }
    //                if (lastParent !== lastVertexParent && lastVertexParent.offset > lastParent.offset) {
    //                    lastParent = firstVertexParent;
    //                }
    //                const newoffset: number = (firstParent.offset + lastParent.offset) / 2;
    //                const availOffsetMin: number = cell.initialOffset;
    //                const availOffsetMax: number = cell.offset;
    //                if (!(availOffsetMax === availOffsetMin)) {
    //                    if (newoffset >= availOffsetMin && newoffset <= availOffsetMax) {
    //                        this.translateMatrixCells(newoffset - cell.offset, cell);
    //                    } else if (newoffset < availOffsetMin) {
    //                        this.translateMatrixCells(availOffsetMin - cell.offset, cell);
    //                    }
    //                }
    //            }
    //        }
    //    }
    //    this.setXYforMatrixCell(matrixModel);
    //}
    //private findParentVertexCellGroup(cell: MatrixCellGroupObject): MatrixCellGroupObject {
    //    if (cell.cells[0]) {
    //        return cell;
    //    }
    //    if (cell.parents.length > 0) {
    //        return this.findParentVertexCellGroup(cell.parents[0]);
    //    }
    //    return cell;
    //}
    //private setXYforMatrixCell(matrixModel: MatrixModelObject): void {
    //    const layoutSettings: LayoutProp = matrixModel.model.layout;
    //    const isHorizontal: boolean = layoutSettings.orientation === 'LeftToRight'
    //        || layoutSettings.orientation === 'RightToLeft';
    //    const spacing: number = isHorizontal ? layoutSettings.verticalSpacing : layoutSettings.horizontalSpacing;
    //    for (let i: number = 0; i < matrixModel.matrix.length; i++) {
    //        const matrixrow1: MatrixCellGroupObject[] = matrixModel.matrix[parseInt(i.toString(), 10)].value;
    //        for (let j: number = 0; j < matrixrow1.length; j++) {
    //            const matrixCell: MatrixCellGroupObject = matrixrow1[parseInt(j.toString(), 10)];
    //            let start: number = matrixCell.offset - (matrixCell.size / 2);
    //            for (let k: number = 0; k < (matrixCell.cells as CellObject[]).length; k++) {
    //                const cell: CellObject = matrixCell.cells[parseInt(k.toString(), 10)];
    //                const type: string = this.getType(cell.type);
    //                if (type === 'internalVertex') {
    //                    const internalVertex: CellObject = cell;
    //                    const width: number = internalVertex.cell.geometry.width;
    //                    const height: number = internalVertex.cell.geometry.height;
    //                    if (isHorizontal) {
    //                        internalVertex.cell.geometry = new Rect(
    //                            matrixModel.rowOffset[matrixCell.level] - (width / 2),
    //                            start,
    //                            width,
    //                            height) as Rect;
    //                    } else {
    //                        internalVertex.cell.geometry = new Rect(
    //                            start,
    //                            matrixModel.rowOffset[matrixCell.level] - (height / 2),
    //                            width,
    //                            height) as Rect;
    //                    }
    //                    start += (isHorizontal ? height : width) + spacing;
    //                } else if (type === 'internalEdge') {
    //                    const internalEdges: CellObject = cell;
    //                    const parent: MatrixCellGroupObject = matrixCell.visitedParents[0];
    //                    let isContainSibilingVertex: boolean = false;
    //                    if (parent) {
    //                        for (let l: number = 0; l < parent.visitedChildren.length; l++) {
    //                            const children: MatrixCellGroupObject = parent.visitedChildren[parseInt(l.toString(), 10)];
    //                            const cells: CellObject[] = [];
    //                            for (let m: number = 0; m < (children.cells as CellObject[]).length; m++) {
    //                                const cell: CellObject = children.cells[parseInt(m.toString(), 10)];
    //                                const type: string = this.getType(cell.type);
    //                                if (type === 'internalVertex') {
    //                                    cells.push(cell);
    //                                }
    //                            }
    //                            if (cells.length > 0) {
    //                                isContainSibilingVertex = true;
    //                                break;
    //                            }
    //                        }
    //                    }
    //                    // Need to updated line width
    //                    const lineWidth: number = 1;
    //                    const edgeSpacing: number = 5;
    //                    for (let m: number = 0; m < internalEdges.edges.length; m++) {
    //                        const internalConnector: Connector = internalEdges.edges[parseInt(m.toString(), 10)];
    //                        let pt: Point = this.getPointvalue(start + (lineWidth / 2.0), matrixModel.rowOffset[matrixCell.level]) as Point;
    //                        if (isHorizontal) {
    //                            pt = this.getPointvalue(matrixModel.rowOffset[matrixCell.level], start + (lineWidth / 2.0)) as Point;
    //                        }
    //                        if (this.containsValue((this.getEdgeMapper() as EdgeMapperObject[]), internalConnector)) {
    //                            let key: number;
    //                            for (let l: number = 0; l < this.getEdgeMapper().length; l++) {
    //                                if ((this.getEdgeMapper())[parseInt(l.toString(), 10)].key === internalConnector) {
    //                                    key = l;
    //                                    break;
    //                                }
    //                            }
    //                            (this.getEdgeMapper())[parseInt(key.toString(), 10)].value.push(pt as Point);
    //                        }
    //                        start += lineWidth + edgeSpacing;
    //                    }
    //                    start += spacing;
    //                }
    //            }
    //        }
    //    }
    //}
    //private getEdgeMapper(): EdgeMapperObject[] {
    //    return this.edgeMapper;
    //}
    ///** @private */
    //public setEdgeMapper(value: EdgeMapperObject): void {
    //    this.edgeMapper.push(value);
    //}
    //private translateMatrixCells(value: number, cell: MatrixCellGroupObject): void {
    //    if (!(value === 0)) {
    //        cell.offset += value;
    //        if (cell.visitedChildren.length > 0) {
    //            for (let i: number = 0; i < cell.visitedChildren.length; i++) {
    //                let cellVisitedChild: MatrixCellGroupObject = cell.visitedChildren[parseInt(i.toString(), 10)];
    //                this.translateMatrixCells(value, cellVisitedChild);
    //            }
    //        }
    //    }
    //}
    //private groupLayoutCells(matrixModel: MatrixModelObject): void {
    //    let ranks: IVertex[][] = matrixModel.model.ranks;
    //    for (let j: number = ranks.length - 1; j >= 0; j--) {
    //        let vertices: IVertex[] = [];
    //        for (let v: number = 0; v < ranks[parseInt(j.toString(), 10)].length; v++) {
    //            let rank: IVertex = ranks[parseInt(j.toString(), 10)][parseInt(v.toString(), 10)];
    //            let type: string = this.getType(rank.type);
    //            if (type === 'internalVertex') {
    //                vertices.push(ranks[parseInt(j.toString(), 10)][parseInt(v.toString(), 10)]);
    //            }
    //        }
    //        let edges: IVertex[] = [];
    //        for (let e: number = 0; e < ranks[parseInt(j.toString(), 10)].length; e++) {
    //            let rank: IVertex = ranks[parseInt(j.toString(), 10)][parseInt(e.toString(), 10)];
    //            let type: string = this.getType(rank.type);
    //            if (type === 'internalEdge') {
    //                edges.push(rank);
    //            }
    //        }
    //        while (vertices.length > 1) {
    //            const vertex1: IVertex = vertices[0];
    //            const parentset1: string[] = this.selectIds(vertex1.connectsAsTarget, true);
    //            const childset1: string[] = this.selectIds(vertex1.connectsAsSource, false);
    //            while (vertices.length > 1) {
    //                const vertex2: IVertex = vertices[1];
    //                const parentset2: string[] = this.selectIds(vertex2.connectsAsTarget, true);
    //                const childset2: string[] = this.selectIds(vertex2.connectsAsSource, false);
    //                const parentequals: boolean = this.compareLists(parentset1, parentset2);
    //                const childequals: boolean = this.compareLists(childset1, childset2);
    //                if (parentequals && childequals) {
    //                    this.updateMutualSharing(vertices[0], vertex2.id);
    //                    this.updateMutualSharing(vertices[1], vertex1.id);
    //                    vertices.splice(1, 1);
    //                    continue;
    //                }
    //                break;
    //            }
    //            vertices.splice(0, 1);
    //        }
    //        while (edges.length > 1) {
    //            const internalEdge: IVertex = edges[0];
    //            const parentset: IVertex = internalEdge.source;
    //            const childset: IVertex = internalEdge.target;
    //            if (parentset.identicalSibiling != null) {
    //                const groupedges: IVertex[] = [];
    //                for (let i: number = 0; i < edges.length; i++) {
    //                    const edge: IVertex = edges[parseInt(i.toString(), 10)];
    //                    if (edge.target === childset) {
    //                        groupedges.push(edge);
    //                    }
    //                }
    //                for (let i: number = 0; i < groupedges.length; i++) {
    //                    const internalEdgese: IVertex = groupedges[parseInt(i.toString(), 10)];
    //                    if (this.containsValue(parentset.identicalSibiling, internalEdgese.source.id)) {
    //                        internalEdgese.source.identicalSibiling = null;
    //                    }
    //                }
    //                internalEdge.source.identicalSibiling = null;
    //            }
    //            edges.splice(0, 1);
    //        }
    //    }
    //}
    //private getType(type: string): string {
    //    if (type === 'internalVertex') {
    //        return 'internalVertex';
    //    } else {
    //        return 'internalEdge';
    //    }
    //}
    //private selectIds(node: IEdge[], source: boolean): string[] {
    //    const returnIds: string[] = [];
    //    for (let i: number = 0; i < node.length; i++) {
    //        const connector: IEdge = node[parseInt(i.toString(), 10)];
    //        if (source) {
    //            {
    //                returnIds.push(connector.source.id);
    //            }
    //        } else {
    //            returnIds.push(connector.target.id);
    //        }
    //    }
    //    return returnIds;
    //}
    //private compareLists(list1: string[], list2: string[]): boolean {
    //    const newList1: string[] = list1.slice();
    //    const newList2: string[] = list2.slice();
    //    if (newList1.length === newList2.length) {
    //        if (newList1.length === 0) {
    //            return true;
    //        } else {
    //            let isSame: boolean = true;
    //            for (let i: number = 0; i < newList2.length; i++) {
    //                const o: string = newList2[parseInt(i.toString(), 10)];
    //                // EJ2-63944 - Nodes overlapping in Complex hierarchical tree layout in linear arrangement.
    //                if (newList1.indexOf(o) === -1)
    //                {
    //                    isSame = false;
    //                    break;
    //                }
    //            }
    //            return isSame;
    //        }
    //    }
    //    return false;
    //}
    //private updateMutualSharing(cell: IVertex, id: string): void {
    //    if (cell.identicalSibiling != null) {
    //        cell.identicalSibiling.push(id);
    //    } else {
    //        cell.identicalSibiling = [];
    //        cell.identicalSibiling.push(id);
    //    }
    //}
    //private matrixCellGroup(options: MatrixCellGroupObject): MatrixCellGroupObject {
    //    options.level = options.level;
    //    options.parents = options.parents;
    //    options.children = options.children;
    //    options.visitedChildren = options.visitedChildren;
    //    options.visitedParents = options.visitedParents;
    //    options.ignoredChildren = options.ignoredChildren;
    //    options.cells = options.cells;
    //    options.offset = options.offset;
    //    options.initialOffset = options.initialOffset;
    //    return options;
    //}
    LineDistribution.prototype.getPointvalue = function (x, y) {
        return { 'x': Number(x) || 0, 'y': Number(y) || 0 };
    };
    LineDistribution.prototype.containsValue = function (list, keyValue) {
        for (var i = 0; i < list.length; i++) {
            if (list[parseInt(i.toString(), 10)] === keyValue) {
                return true;
            }
        }
        return false;
    };
    return LineDistribution;
}());
export { LineDistribution };
///** @private */
//interface ConnectsAsSourceObject {
//    id: string[];
//    source: ConnectsAsSourceObject;
//    target: ConnectsAsSourceObject;
//    temp: number[];
//    x: number[];
//    y: number[];
//}
