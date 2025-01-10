import { HorizontalAlignment, PortShapes, VerticalAlignment } from '../enum/enum';
import { PortModel } from '../objects/port-model';
import { PointModel } from '../primitives/point-model';
import { Ej1Serialization } from './modelProperties';
export declare class PortProperties {
    private diagram;
    private modelProperties;
    constructor(modelProperties: Ej1Serialization);
    setPortProperties(oldPorts: EJ1Port[]): PortModel[];
    setPortConstraints(constraints: number): number;
    setPortVisibility(visibility: number): number;
    /**
     * Get module name.
     * @returns {string} Returns the module name
     */
    protected getModuleName(): string;
}
export interface EJ1Port extends PortModel {
    name: string;
    fillColor: string;
    borderColor: string;
    borderWidth: number;
    opacity: number;
    horizontalAlignment: HorizontalAlignment;
    verticalAlignment: VerticalAlignment;
    shape: PortShapes;
    offset: PointModel;
    size: number;
}
export declare type EJ1PortShapes = 
/** Path - sets the port shape as path */
'path' | 
/** X - sets the port shape as x */
'x' | 
/** Circle - sets the port shape as circle */
'circle' | 
/** Square - sets the port shape as square */
'square';
