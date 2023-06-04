import type { ESTree } from "meriyah";
import { NodeHandler } from "./base.js";
import { MemberExpressionType } from "./types.js";
export declare class MemberExpressionHandler extends NodeHandler {
    accepts(node: ESTree.Node): Promise<ESTree.MemberExpression | boolean>;
    handle(node: ESTree.MemberExpression): Promise<MemberExpressionType>;
}
