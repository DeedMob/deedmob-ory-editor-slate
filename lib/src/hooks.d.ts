import Plugin from './plugins/Plugin';
import { SlateState } from './types/state';
export declare const defaultPlugins: Plugin[];
export declare const lineBreakSerializer: {
    deserialize(el: any): {
        object: string;
        text: string;
        leaves?: undefined;
    } | {
        object: string;
        leaves: {
            object: string;
            text: any;
        }[];
        text?: undefined;
    };
    serialize(object: any, children: string): JSX.Element;
};
export declare const html: any;
export declare const createInitialState: () => {
    editorState: any;
};
export declare const unserialize: ({ importFromHtml, serialized, editorState, }: SlateState) => SlateState;
export declare const serialize: ({ editorState, }: SlateState) => {
    serialized: any;
};
export declare const merge: (states: Object[]) => Object;
export declare const split: (state: Object) => Object[];
export declare const handleRemoveHotKey: (_: Event, { content: { state: { editorState }, }, }: any) => Promise<void>;
export declare const handleFocusPreviousHotKey: (e: KeyboardEvent, { content: { state: { editorState }, }, }: any) => Promise<void>;
export declare const handleFocusNextHotKey: (e: KeyboardEvent, { content: { state: { editorState }, }, }: any) => Promise<void>;
