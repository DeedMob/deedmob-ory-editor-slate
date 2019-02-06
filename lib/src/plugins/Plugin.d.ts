import { RenderMarkProps, RenderNodeProps } from 'slate-react';
import { Value, Editor } from 'slate';
import { NextType } from '../types/next';
export declare class PluginButtonProps {
    editor: Editor;
    editorState: Value;
}
/**
 * @class this is the base class for slate plugins
 */
export default class Plugin {
    /**
     * @member a default node
     */
    DEFAULT_NODE: string;
    /**
     * @member a unique identifier of the plugin
     */
    name: string;
    /**
     * @member the schema that is automatically collected from all plugins
     */
    schema: {
        document?: {
            [key: string]: any;
        };
        blocks?: {
            [key: string]: any;
        };
        inlines?: {
            [key: string]: any;
        };
        rules?: [];
    };
    /**
     * @member the slate plugins added to the editor
     */
    plugins: any[];
    /**
     * @member serialize a plugin's state to html
     */
    serialize: (object: {
        object: string;
        type: string;
        data: any;
    }, children: any[]) => any;
    /**
     * @member serialize a plugin's state from html
     */
    deserialize: (el: Element, next: Function) => any;
    /**
     * @member the buttons to be added to the hover menu
     */
    hoverButtons: React.ComponentType<PluginButtonProps>[];
    /**
     * @member the buttons to be added to the global toolbar
     */
    toolbarButtons: React.ComponentType<PluginButtonProps>[];
    /**
     * @member the function that renders marks
     */
    renderMark: (props: RenderMarkProps, editor: Editor, next: NextType) => any;
    /**
     * @member the function that renders nodes
     */
    renderNode: (props: RenderNodeProps, editor: Editor, next: NextType) => any;
    /**
     * This handler is called when any key is pressed
     *
     * @param e the keydown event
     * @param data utilities for hotkey logic
     * @param state the current editor state
     * @returns the new editor state if the plugin handles the hotkey
     */
    onKeyDown: (e: KeyboardEvent, editor: Editor, next: NextType) => boolean;
}
