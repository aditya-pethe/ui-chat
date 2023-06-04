import type { ESTree } from "meriyah";
import { NodeHandler } from "./base.js";
import { ParsedType } from "./types.js";
export declare class MasterHandler extends NodeHandler {
    nodeHandlers: NodeHandler[];
    accepts(node: ESTree.Node): Promise<ESTree.Node | boolean>;
    handle(node: ESTree.CallExpression): Promise<ParsedType>;
    static createMasterHandler(): MasterHandler;
}
