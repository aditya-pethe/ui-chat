import type { ESTree } from "meriyah";
import { NodeHandler } from "./base.js";
import { StringLiteralType } from "./types.js";
export declare class StringLiteralHandler extends NodeHandler {
    accepts(node: ESTree.Node): Promise<ESTree.Literal | boolean>;
    handle(node: ESTree.Literal): Promise<StringLiteralType>;
}
