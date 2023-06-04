import type { ESTree } from "meriyah";
import { NodeHandler } from "./base.js";
import { ObjectLiteralType } from "./types.js";
export declare class ObjectLiteralExpressionHandler extends NodeHandler {
    accepts(node: ESTree.Node): Promise<ESTree.ObjectExpression | boolean>;
    handle(node: ESTree.ObjectExpression): Promise<ObjectLiteralType>;
}
