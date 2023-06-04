import { Extension } from '@codemirror/state';
import { BasicSetupOptions } from '@uiw/codemirror-extensions-basic-setup';
export type DefaultExtensionsOptions = {
    indentWithTab?: boolean;
    basicSetup?: boolean | BasicSetupOptions;
    placeholder?: string | HTMLElement;
    theme?: 'light' | 'dark' | 'none' | Extension;
    readOnly?: boolean;
    editable?: boolean;
};
export declare const getDefaultExtensions: (optios?: DefaultExtensionsOptions) => Extension[];
