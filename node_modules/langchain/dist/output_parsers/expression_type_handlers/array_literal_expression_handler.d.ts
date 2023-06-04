import type { ESTree } from "meriyah";
import { NodeHandler } from "./base.js";
import { ArrayLiteralType } from "./types.js";
export declare class ArrayLiteralExpressionHandler extends NodeHandler {
    accepts(node: ESTree.Node): Promise<ESTree.ArrayExpression | boolean>;
    handle(node: ESTree.ArrayExpression): Promise<ArrayLiteralType>;
}
