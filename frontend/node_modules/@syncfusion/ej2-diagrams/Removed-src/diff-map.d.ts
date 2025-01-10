import { MouseEventArgs } from '../src/diagram/interaction/event-handlers';
import { Node } from '../src/diagram/objects/node';
import { Diagram } from '../src/diagram/diagram';
import { Connector } from '../src/diagram/objects/connector';
/**
 * Defines the behavior of commands
 */
export declare class DeepDiffMapper {
    valueCreated: string;
    valueUpdated: string;
    valueDeleted: string;
    valueUnchanged: string;
    /** @private */
    newNodeObject: Object[];
    /** @private */
    newConnectorObject: Object[];
    /**   @private  */
    diagramObject: object;
    /** @private */
    updateObjectCollection(layers: object[], diagram?: Diagram): void;
    /**   @private  */
    getOldObject(id: String, isNode: boolean, diagram: Diagram): Node | Connector;
    /** @private */
    changeSegments(diff: Object, newObject: Object): Object;
    private removeNullValues;
    /** @private */
    removeNullObjectValues(segment: Object): Object;
    /** @private */
    getDifferenceValues(selectedObject: Node | Connector, args: MouseEventArgs, labelDrag?: boolean, diagram?: Diagram): void;
    /** @private */
    getLayerObject(oldDiagram: object, temp?: boolean, diagram?: Diagram): object | any;
    /** @private */
    getDiagramObjects(diffValue: any, object: string, isNode: boolean, args: MouseEventArgs, labelDrag?: boolean, diagram?: Diagram): any;
    private removeArrayValues;
    /** @private */
    removeEmptyValues(frame: object): object;
    map(obj1: any, obj2?: any, arrayName?: any): {};
    compareValues(value1: any, value2: any): string;
    isFunction(x: any): boolean;
    isArray(x: any): boolean;
    isDate(x: any): boolean;
    isObject(x: any): boolean;
    isValue(x: any): boolean;
    frameObject(final: any, obj: any): any;
}
