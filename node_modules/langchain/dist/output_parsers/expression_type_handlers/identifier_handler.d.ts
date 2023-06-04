import type { ESTree } from "meriyah";
import { NodeHandler } from "./base.js";
import { IdentifierType } from "./types.js";
export declare class IdentifierHandler extends NodeHandler {
    accepts(node: ESTree.Node): Promise<ESTree.Identifier | boolean>;
    handle(node: ESTree.Identifier): Promise<IdentifierType>;
}
