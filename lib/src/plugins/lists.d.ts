import * as React from 'react';
import { EditListPluginInterface } from '@guestbell/slate-edit-list';
import Plugin from './Plugin';
import { PluginButtonProps } from './Plugin';
import { SlatePluginSettings } from './../types/plugin';
import { NextType } from '../types/next';
export declare const UL = "LISTS/UNORDERED-LIST";
export declare const OL = "LISTS/ORDERED-LIST";
export declare const LI = "LISTS/LIST-ITEM";
export interface ListsPluginSettings extends SlatePluginSettings {
    DEFAULT_NODE: string;
}
export default class ListsPlugin extends Plugin {
    plugin: EditListPluginInterface;
    name: string;
    constructor(props: ListsPluginSettings);
    createButton: (type: string, icon: JSX.Element) => React.SFC<PluginButtonProps>;
    deserialize: (el: any, next: any) => {
        object: string;
        type: string;
        nodes: any;
    };
    serialize: (object: {
        type: string;
        object: string;
    }, children: any) => JSX.Element;
    renderNode: (props: any, editor: any, next: NextType) => any;
}
