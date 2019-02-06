import * as React from 'react';
import { NodeComponentProps } from './types/props';
export declare const makeTagNode: (Tag: any) => React.FunctionComponent<NodeComponentProps>;
export declare const makeTagMark: (Tag: any) => React.FunctionComponent<{}>;
export declare const ToolbarButton: React.SFC<{
    icon: JSX.Element;
    isActive: boolean;
    disabled?: boolean;
    onClick: React.MouseEventHandler;
}>;
