import { Component, INotifyPropertyChanged, EmitType, ChildProperty, BaseEventArgs } from '@syncfusion/ej2-base';
import { InterActiveChatBaseModel, ToolbarItemModel } from './interactive-chat-base-model';
import { TextArea } from '@syncfusion/ej2-inputs';
import { ItemType, ItemAlign } from '@syncfusion/ej2-navigations';
/**
 * Represents a toolbar item model in the component.
 */
export declare class ToolbarItem extends ChildProperty<ToolbarItem> {
    /**
     * Specifies the CSS class for the icon of the toolbar item.
     * Represents the icon displayed for the toolbar item.
     *
     * @type {string}
     * @default ''
     */
    iconCss: string;
    /**
     * Specifies the text of the toolbar item.
     * Represents the display text of the toolbar item.
     *
     * @type {string}
     * @default null
     */
    text: string;
    /**
     * Specifies the type of the toolbar item.
     * Represents the item type of the toolbar item.
     *
     * @type {ItemType}
     * @default "Button"
     * @aspPopulateDefaultValue
     */
    type: ItemType;
    /**
     * Specifies the alignment of the toolbar item.
     *
     * @type {ItemAlign}
     * @default "Left"
     * @aspPopulateDefaultValue
     */
    align: ItemAlign;
    /**
     * Specifies whether the toolbar item is visible.
     * Indicates if the toolbar item should be displayed.
     *
     * @type {boolean}
     * @default true
     */
    visible: boolean;
    /**
     * Specifies whether the toolbar item is disabled.
     * Indicates if the toolbar item is interactive or not.
     *
     * @type {boolean}
     * @default false
     */
    disabled: boolean;
    /**
     * Specifies the tooltip text for the toolbar item.
     * Represents the text shown when hovering over the toolbar item.
     *
     * @type {string}
     * @default ''
     */
    tooltip: string;
    /**
     * Specifies the CSS class for styling the toolbar item.
     * Represents the additional CSS classes applied to the toolbar item.
     *
     * @type {string}
     * @default ''
     */
    cssClass: string;
    /**
     * Specifies the template that defines the appearance of the toolbar item.
     * Represents the custom template for rendering the toolbar item, which can be a string or a function.
     *
     * @default null
     * @angularType string | object
     * @reactType string | function | JSX.Element
     * @vueType string | function
     * @aspType string
     */
    template: string | Function;
    /**
     * Specifies the tab order of the toolbar items.
     * When assigned positive values, it allows switching focus to the next/previous toolbar items using the Tab/Shift+Tab keys.
     * If the value is set to 0 for all toolbar items, the tab order switches based on the element's order in the DOM.
     *
     * @type {number}
     * @default -1
     */
    tabIndex: number;
}
/**
 * Represents the settings for the toolbar in the component.
 */
export declare class ToolbarSettings extends ChildProperty<ToolbarSettings> {
    /**
     * Specifies the collection of toolbar items in the component.
     * Represents the list of items to be displayed in the toolbar.
     *
     * @type {ToolbarItemModel[]}
     * @default []
     */
    items: ToolbarItemModel[];
    /**
     * Event raised when a toolbar item is clicked in the component.
     *
     * @event itemClicked
     */
    itemClicked: EmitType<ToolbarItemClickedEventArgs>;
}
/**
 * Represents the event arguments for a toolbar item click event in the component.
 */
export interface ToolbarItemClickedEventArgs extends BaseEventArgs {
    /**
     * Specifies the toolbar item that was clicked.
     * Represents the model of the toolbar item that triggered the click event.
     *
     * @type {ToolbarItemModel}
     * @default null
     *
     */
    item?: ToolbarItemModel;
    /**
     * Specifies the event object associated with the toolbar item click.
     * Represents the underlying event that triggered the click action, providing details about the event.
     *
     * @type {Event}
     * @default null
     *
     */
    event?: Event;
    /**
     * Specifies whether the click event should be cancelled.
     * Determines if the default action associated with the click event should be prevented.
     *
     * @type {boolean}
     * @default false
     *
     */
    cancel?: boolean;
    /**
     * Specifies the index of the message data associated with the toolbar item click event.
     * This property is not applicable for header toolbar item click.
     *
     * @type {number}
     * @default -1
     */
    dataIndex?: number;
}
/**
 * ChatBase component act as base class.
 */
export declare class InterActiveChatBase extends Component<HTMLElement> implements INotifyPropertyChanged {
    /**
     * Event triggers when the component is created.
     *
     * @event 'created'
     */
    created: EmitType<Object>;
    protected suggestionsElement: HTMLElement;
    protected suggestionHeader: HTMLElement;
    protected content: HTMLElement;
    /**
     * * Constructor for Base class
     *
     * @param {InterActiveChatBaseModel} options - Specifies the Base model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options?: InterActiveChatBaseModel, element?: string | HTMLElement);
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    protected preRender(): void;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the current module name.
     */
    getModuleName(): string;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    protected getPersistData(): string;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    protected setDimension(element: HTMLElement, width: string | number, height: string | number): void;
    protected addCssClass(element: HTMLElement, cssClass: string): void;
    protected addRtlClass(element: HTMLElement, isRtl: boolean): void;
    protected updateCssClass(element: HTMLElement, newClass: string, oldClass: string): void;
    protected updateHeader(showHeader: boolean, headerElement: HTMLElement, viewWrapper: HTMLElement): void;
    protected renderViewSections(element: HTMLElement, headerClassName: string, viewClassName: string): void;
    protected createViewComponents(viewWrapper: HTMLElement): void;
    protected updateScroll(scrollElement: HTMLElement): void;
    protected getElement(element: string): HTMLElement;
    protected createSuggestionElement(suggestionHeader: string): {
        suggestionContainer: HTMLElement;
        suggestionHeaderElement: HTMLElement;
        suggestionListElement: HTMLElement;
    };
    protected renderSuggestions(suggestionsArray: string[], suggestionHeader: string, suggestionTemplate: string | Function, contextName: string, templateName: string, onSuggestionClick: (e: Event) => void): void;
    private renderSuggestionList;
    private suggestionItemHandler;
    protected renderBannerView(bannerTemplate: string | Function, parentElement: HTMLElement, templateName: string): void;
    protected updateContent(template: string | Function, contentElement: HTMLElement, context: object, templateName: string): void;
    protected renderFooterContent(footerTemplate: string | Function, footer: HTMLElement, prompt: string, promptPlaceholder: string, showClearButton: boolean, rowCount: number, className: string): TextArea;
    private renderFooter;
    protected renderSendIcon(sendIconClass: string, footer: HTMLElement): HTMLElement;
    protected appendChildren(target: HTMLElement, ...children: HTMLElement[]): void;
    protected insertBeforeChildren(target: HTMLElement, ...children: HTMLElement[]): void;
    protected wireFooterEvents(sendIcon: HTMLElement, footer: HTMLElement, footerTemplate: string | Function): void;
    protected unWireFooterEvents(sendIcon: HTMLElement, footer: HTMLElement, footerTemplate: string | Function): void;
    protected removeAndNullify(element: HTMLElement): void;
    protected destroyAndNullify(obj: any): void;
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @param {boolean} notCompile - Compile property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    protected getTemplateFunction(template: string | Function, notCompile: boolean): string | Function;
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @param  {InterActiveChatBaseModel} newProp - Specifies new properties
     * @param  {InterActiveChatBaseModel} oldProp - Specifies old properties
     * @private
     * @returns {void}
     */
    onPropertyChanged(newProp: InterActiveChatBaseModel, oldProp: InterActiveChatBaseModel): void;
}
