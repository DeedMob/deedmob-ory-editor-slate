import * as React from 'react';
import { NextType } from '../types/next';
import { SlateProps } from './../types/component';
import { Value } from 'slate';
export interface SlateState {
    editorState?: Value;
}
declare class Slate extends React.Component<SlateProps, SlateState> {
    private toolbar;
    private editor;
    private flushStateDebounced;
    constructor(props: SlateProps);
    componentDidMount: () => void;
    flushState: () => void;
    getState(): any;
    onStateChange: ({ value }: {
        value: any;
    }) => void;
    updateToolbar: () => void;
    onPaste: (e: Event, editor: any, next: NextType) => any;
    onKeyDown: (e: KeyboardEvent, editor: any, next: NextType) => boolean;
    render(): JSX.Element;
}
export default Slate;
