import * as React from 'react';
import Plugin, { PluginButtonProps } from './Plugin';
import { NextType } from '../types/next';
export declare const STRONG = "EMPHASIZE/STRONG";
export declare const EM = "EMPHASIZE/EM";
export declare const U = "EMPHASIZE/U";
export default class EmphasizePlugin extends Plugin {
    name: string;
    hoverButtons: React.FunctionComponent<PluginButtonProps>[];
    onKeyDown: (e: KeyboardEvent, editor: any, next: NextType) => boolean;
    deserialize: (el: any, next: any) => {
        object: string;
        type: string;
        nodes: any;
    };
    serialize: (object: {
        type: string;
        object: string;
    }, children: any[]) => JSX.Element;
    renderMark: (props: any, editor: any, next: NextType) => any;
}
