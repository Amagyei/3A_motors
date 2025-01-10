import { PdfPen, PdfBrush } from './pdf-graphics';
import { PdfFillMode, PathPointType } from './../enumerator';
/**
 * Implements graphics path, which is a sequence of primitive graphics elements.
 *
 * ```typescript
 * // Load an existing PDF document
 * let document: PdfDocument = new PdfDocument(data, password);
 * // Access the first page
 * let page: PdfPage = document.getPage(0);
 * // Gets the graphics object of the PDF page
 * let graphics: PdfGraphics = page.graphics;
 * // Create a new pen
 * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
 * // Create a new PDF path
 * let path: PdfPath = new PdfPath();
 * // Add a line to the Graphics path
 * path.addLine(10, 250, 200, 250);
 * // Draw the path on the PDF page
 * graphics.drawPath(path, pen);
 * // Save the document
 * document.save('output.pdf');
 * // Destroy the document
 * document.destroy();
 * ```
 */
export declare class PdfPath {
    _points: Array<number[]>;
    _pathTypes: PathPointType[];
    _pen: PdfPen;
    _brush: PdfBrush;
    _fillMode: PdfFillMode;
    _isStart: boolean;
    _isXps: boolean;
    _isRoundedRectangle: boolean;
    /**
     * Initializes a new instance of the `PdfPath` class.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath();
     * // Add a line to the Graphics path
     * path.addLine(10, 250, 200, 250);
     * // Draw the path on the PDF page
     * graphics.drawPath(path, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor();
    /**
     * Initializes a new instance of the `PdfPath` class using a series of points and path types.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
     * // Draw the path on the PDF page
     * page.graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    constructor(points: Array<number[]>, pathTypes: PathPointType[]);
    /**
     * Gets the last point of the path.
     *
     * @returns {number[]} The value of the last point.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
     * // Get the last point of the path.
     * let lastPoint: number[] = path.lastPoint;
     * // Draw the path on the PDF page.
     * page.graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly lastPoint: number[];
    /**
     * Gets the array of points that represent the x and y coordinates defining the path.
     *
     * @returns {Array<number[]>} An array of arrays of numbers, where each inner array represents a set of points.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
     * // Get the path points of the path
     * let pathPoints: Array<number[]> = path.pathPoints;
     * // Draw the path on the PDF page
     * page.graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly pathPoints: Array<number[]>;
    /**
     * Gets the types of the corresponding points in the path.
     *
     * @returns {PathPointType[]} An array of `PathPointType` objects representing the types of each path point.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
     * // Get the path types of the path
     * let pathTypes: PathPointType[] = path.pathTypes;
     * // Draw the path on the PDF page
     * page.graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    readonly pathTypes: PathPointType[];
    /**
     * Gets the fill mode.
     *
     * @returns {PdfFillMode} The fill mode of the PDF path.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
     * // Get the fill mode of the path
     * let fillMode: PdfFillMode = path.fillMode;
     * // Draw the path on the PDF page
     * page.graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    /**
    * Sets the fill mode.
    *
    * @param {PdfFillMode} mode The fill mode of the path.
    *
    * ```typescript
    * // Load an existing PDF document
    * let document: PdfDocument = new PdfDocument(data, password);
    * // Access the first page
    * let page: PdfPage = document.getPage(0);
    * // Gets the graphics object of the PDF page
    * let graphics: PdfGraphics = page.graphics;
    * // Create a new pen
    * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
    * // Create a new brush
    * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
    * // Create a new PDF path
    * let path: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
    * // Set the fill mode of the path
    * path.fillMode = PdfFillMode.alternate;
    * // Draw the path on the PDF page
    * page.graphics.drawPath(path, pen, brush);
    * // Save the document
    * document.save('output.pdf');
    * // Destroy the document
    * document.destroy();
    * ```
    */
    fillMode: PdfFillMode;
    /**
     * Appends the specified path to this one.
     *
     * @param {PdfPath} path The path to append.
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Get the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new PDF path
     * let path1: PdfPath = new PdfPath();
     * // Add path points and path type
     * let path2: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
     * path1.addPath(path2);
     * // Draw the path on the PDF page
     * graphics.drawPath(path1, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addPath(path: PdfPath): void;
    /**
     * Appends the specified path points and their types to this path.
     *
     * @param {Array<number[]>} pathPoints The path points to append.
     * @param {PathPointType[]} pathPointTypes The types of the path points.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new PDF path
     * let path1: PdfPath = new PdfPath();
     * // Add path points and their types
     * path1.addPath([[50, 50], [100, 100]], [PathPointType.start, PathPointType.line]);
     * // Draw the path on the PDF page
     * graphics.drawPath(path1, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addPath(pathPoints: Array<number[]>, pathPointTypes: PathPointType[]): void;
    _addPath(pathPoints: Array<number[]>, pathTypes: PathPointType[]): void;
    /**
     * Adds a line segment to the path.
     *
     * @param {number} x1 The x-coordinate of the starting point of the line.
     * @param {number} y1 The y-coordinate of the starting point of the line.
     * @param {number} x2 The x-coordinate of the ending point of the line.
     * @param {number} y2 The y-coordinate of the ending point of the line.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath();
     * // Add a line segment to the path
     * path.addLine(10, 250, 200, 250);
     * // Draw the path on the PDF page
     * graphics.drawPath(path, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addLine(x1: number, y1: number, x2: number, y2: number): void;
    _addLines(linePoints: Array<number[]>): void;
    _addPoints(points: number[], type: PathPointType, start?: number, end?: number): void;
    _addPoint(point: number[], type: PathPointType): void;
    /**
     * Adds an arc within a bounding rectangle using the angles that define the start and sweep of the arc.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the rectangular region.
     * @param {number} y The y-coordinate of the upper-left corner of the rectangular region.
     * @param {number} width The width of the rectangular region.
     * @param {number} height The height of the rectangular region.
     * @param {number} startAngle The start angle of the arc.
     * @param {number} sweepAngle The angle between start angle and the end of the arc.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(readFromResources('Empty.pdf'));
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath();
     * // Add a Bezier curve to the path
     * path.addBezier(10, 100, 50, 150, 150, 150, 200, 100);
     * // Draw the path on the PDF page
     * graphics.drawPath(path, pen);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addArc(x: number, y: number, width: number, height: number, startAngle: number, sweepAngle: number): void;
    /**
     * Adds a rectangle to the path.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the rectangle.
     * @param {number} y The y-coordinate of the upper-left corner of the rectangle.
     * @param {number} width The width of the rectangle.
     * @param {number} height The height of the rectangle.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath();
     * // Add a rectangle to the path
     * path.addRectangle(10, 20, 50, 100);
     * // Draw the path on the PDF page
     * graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addRectangle(x: number, y: number, width: number, height: number): void;
    /**
     * Adds a polygon to the path.
     *
     * @param {Array<number[]>} points The points of the polygon, where each point is an array of two numbers representing the x and y coordinates.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath();
     * // Add a polygon to the path
     * path.addPolygon([[200, 10], [300, 100], [150, 100], [200, 10]]);
     * // Draw the path on the PDF page
     * graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addPolygon(points: Array<number[]>): void;
    /**
     * Adds an ellipse to the path.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the rectangular region that bounds the ellipse.
     * @param {number} y The y-coordinate of the upper-left corner of the rectangular region that bounds the ellipse.
     * @param {number} width The width of the bounding rectangle for the ellipse.
     * @param {number} height The height of the bounding rectangle for the ellipse.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath();
     * // Add an ellipse to the path
     * path.addEllipse(200, 200, 100, 50);
     * // Draw the path on the PDF page
     * graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addEllipse(x: number, y: number, width: number, height: number): void;
    /**
     * Adds a Bezier curve to the path using specified coordinates for the start point, two control points, and the end point.
     *
     * @param {number} startX The x-coordinate of the starting point of the Bezier curve.
     * @param {number} startY The y-coordinate of the starting point of the Bezier curve.
     * @param {number} firstX The x-coordinate of the first control point of the Bezier curve.
     * @param {number} firstY The y-coordinate of the first control point of the Bezier curve.
     * @param {number} secondX The x-coordinate of the second control point of the Bezier curve.
     * @param {number} secondY The y-coordinate of the second control point of the Bezier curve.
     * @param {number} endX The x-coordinate of the ending point of the Bezier curve.
     * @param {number} endY The y-coordinate of the ending point of the Bezier curve.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath();
     * // Add a Bezier curve to the path
     * path.addBezier(100, 100, 150, 150, 50, 250, 100, 300);
     * // Draw the path on the PDF page
     * graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addBezier(startX: number, startY: number, firstX: number, firstY: number, secondX: number, secondY: number, endX: number, endY: number): void;
    _addBezierPoints(pointsCollection: number[][]): void;
    /**
     * Adds a pie slice to the path.
     *
     * @param {number} x The x-coordinate of the upper-left corner of the bounding rectangle.
     * @param {number} y The y-coordinate of the upper-left corner of the bounding rectangle.
     * @param {number} width The width of the bounding rectangle.
     * @param {number} height The height of the bounding rectangle.
     * @param {number} startAngle The angle in degrees measured clockwise from the x-axis to the start of the pie slice.
     * @param {number} sweepAngle The angle in degrees measured clockwise from the startAngle parameter to the end of the pie slice.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath();
     * // Add a pie slice to the path
     * path.addPie(0, 20, 100, 100, 270, 45);
     * // Draw the path on the PDF page
     * graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    addPie(x: number, y: number, width: number, height: number, startAngle: number, sweepAngle: number): void;
    /**
     * Starts a new figure in the path.
     *
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath();
     * // Start a new figure in the path
     * path.startFigure();
     * // Add some path points (optional)
     * path.addLine(50, 50, 100, 50);
     * // Draw the path on the PDF page
     * graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    startFigure(): void;
    /**
     * Closes all open figures in the path.
     *
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
     * // Close all open figures
     * path.closeFigure();
     * // Draw the path on the PDF page
     * page.graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    closeFigure(): void;
    /**
     * Closes all non-closed figures in the path.
     *
     * @param {number} index The optional index of the figure to close. If not provided, the last figure is closed.
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
     * // Close the figure at index 1
     * path.closeFigure(1);
     * // Draw the path on the PDF page
     * page.graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    closeFigure(index: number): void;
    /**
     * Closes all non-closed figures in the path.
     *
     * @returns {void} Nothing
     *
     * ```typescript
     * // Load an existing PDF document
     * let document: PdfDocument = new PdfDocument(data, password);
     * // Access the first page
     * let page: PdfPage = document.getPage(0);
     * // Gets the graphics object of the PDF page
     * let graphics: PdfGraphics = page.graphics;
     * // Create a new pen
     * let pen: PdfPen = new PdfPen([0, 0, 0], 1);
     * // Create a new brush
     * let brush: PdfBrush = new PdfBrush([0, 255, 255]);
     * // Create a new PDF path
     * let path: PdfPath = new PdfPath([[50, 50], [100, 50], [100, 100], [50, 100], [50, 50]], [0, 1, 1, 1, 1]);
     * // Close all non-closed figures
     * path.closeAllFigures();
     * // Draw the path on the PDF page
     * page.graphics.drawPath(path, pen, brush);
     * // Save the document
     * document.save('output.pdf');
     * // Destroy the document
     * document.destroy();
     * ```
     */
    closeAllFigures(): void;
    _getBounds(): number[];
}
