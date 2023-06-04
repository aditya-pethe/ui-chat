import type { ESTree } from "meriyah";
import { NodeHandler } from "./base.js";
import { NumericLiteralType } from "./types.js";
export declare class NumericLiteralHandler extends NodeHandler {
    accepts(node: ESTree.Node): Promise<ESTree.Literal | boolean>;
    handle(node: ESTree.Literal): Promise<NumericLiteralType>;
}
