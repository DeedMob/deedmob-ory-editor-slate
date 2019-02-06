import * as React from 'react';
import Plugin, { PluginButtonProps } from '../Plugin';
import { SlatePluginSettings } from './../../types/plugin';
import { NextType } from '../../types/next';
export interface BlockquotePluginSettings extends SlatePluginSettings {
    DEFAULT_NODE: string;
}
export declare const CODE = "CODE/CODE";
export default class CodePlugin extends Plugin {
    name: string;
    constructor(props: BlockquotePluginSettings);
    createButton: (type: string, icon: JSX.Element) => React.FunctionComponent<PluginButtonProps>;
    createNodeButton: (type: string, icon: JSX.Element) => React.SFC<PluginButtonProps>;
    deserialize: (el: any, next: any) => {
        object: string;
        type: string;
        data: any;
        nodes: any;
    } | {
        object: string;
        type: string;
        nodes: any;
        data?: undefined;
    };
    serialize: (object: {
        type: string;
        object: string;
        data: any;
    }, children: any[]) => JSX.Element;
    renderMark: (props: any, editor: any, next: NextType) => any;
    renderNode: (props: any, editor: any, next: NextType) => any;
}
