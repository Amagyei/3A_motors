import { Diagram } from '../diagram';
import { AnnotationModel } from '../objects/annotation-model';
import { ConnectorModel } from '../objects/connector-model';
import { Point } from '../primitives/point';
import { LabelProperties } from './labelProperties';
export declare class ConnectorProperties {
    private diagram;
    labelProperties: LabelProperties;
    constructor(labelProperties: LabelProperties);
    renderConnectorsCollection(convertedData: Object, data: Diagram): void;
    convertToConnector(connector: ConnectorModel): ConnectorModel;
    getConnectorShape(shape: any): any;
    getDecoratorShape(shape: string): string;
    setConnectorSegments(segments: any): any;
    getSegmentPoints(points: Point[]): Point[];
    setConnectorConstraints(constraints: number): number;
    /**
     * Get module name.
     *
     * @returns {string} Returns the module name
     */
    protected getModuleName(): string;
}
export interface EJ1Connector extends ConnectorModel {
    name: string;
    labels: AnnotationModel[];
    lineColor: string;
    lineWidth: number;
    lineDashArray: string;
    opacity: number;
    lineHitPadding: number;
    sourceNode: string;
    targetNode: string;
    zOrder: number;
    sourcePort: string;
    targetPort: string;
}
