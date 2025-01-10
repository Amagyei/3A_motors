/**
 * Provides information about a CollisionCoordinates.
 *
 * @private
 */
export interface CollisionCoordinates {
    X: boolean;
    Y: boolean;
}
/**
 * @private
 */
export declare function flip(element: HTMLElement, target: HTMLElement, offsetX: number, offsetY: number, positionX: string, positionY: string, viewPortElement?: HTMLElement, axis?: CollisionCoordinates, fixedParent?: Boolean): void;
/**
 * @private
 */
