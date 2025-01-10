import { Diagram } from '../diagram';
import { Connector } from '../objects/connector';
import { PointModel } from '../primitives/point-model';
import { Layout } from '../layout/layout-base';
/**
 * Line Distribution
 * @private
 */
export declare class LineDistribution {
    /**
     * Constructor for the line distribution module
     * @private
     */
    constructor();
    /**
     * To destroy the line distribution module
     * @returns {void}
     * @private
     */
    destroy(): void;
    /**
     * Core method to return the component name.
     *
     * @returns {string}  Core method to return the component name.
     * @private
     */
    protected getModuleName(): string;
    /** @private */
    initLineDistribution(graph: Layout, diagram: Diagram): void;
    private ObstacleSegment;
    /** @private */
    distributeLines(layout: Layout, diagram: Diagram): void;
    private sortConnectors;
    private resetConnectorPoints;
    private getObstacleEndPoint;
    private getObstacleStartPoint;
    private updateSegmentRow;
    private portOffsetCalculation;
    private addDynamicPortandDistrrbuteLine;
    private initPort;
    private sortObjects;
    /** @private */
    resetConnectorSegments(connector: Connector): void;
    /** @private */
    resetRoutingSegments(connector: Connector, diagram: Diagram, points: PointModel[]): void;
    /**
     * Calculates points along a line between two given points.
     *  @param start The starting point of the line.
     *  @param end The ending point of the line.
     *  @return An array of points along the line.
     */
    private pointsAlongLine;
    /**
     *
     * Checks if any of the given points fall inside the specified bounding rectangle.
     *  @param points An array of points to be checked.
     *  @param bounds The bounding rectangle to check against.
     *  @return True if any point is inside the bounds, false otherwise.
     */
    private pointInsideBounds;
    /** @private */
    private getPointvalue;
    private containsValue;
}
