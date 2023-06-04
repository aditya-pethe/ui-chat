import type { ESTree } from "meriyah";
import { NodeHandler } from "./base.js";
import { CallExpressionType } from "./types.js";
export declare class CallExpressionHandler extends NodeHandler {
    accepts(node: ESTree.Node): Promise<ESTree.CallExpression | boolean>;
    handle(node: ESTree.CallExpression): Promise<CallExpressionType>;
}
