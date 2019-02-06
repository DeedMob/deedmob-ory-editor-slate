import Plugin from '../Plugin';
import { NextType } from '../../types/next';
export declare const P = "PARAGRAPH/PARAGRAPH";
export default class ParagraphPlugin extends Plugin {
    name: string;
    deserialize: (el: any, next: any) => {
        object: string;
        type: string;
        nodes: any;
    };
    serialize: (object: {
        type: string;
        object: string;
        data: any;
    }, children: any) => JSX.Element;
    renderNode: (props: any, editor: any, next: NextType) => any;
}
