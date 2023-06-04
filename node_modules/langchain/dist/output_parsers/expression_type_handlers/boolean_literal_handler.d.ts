import type { ESTree } from "meriyah";
import { NodeHandler } from "./base.js";
import { BooleanLiteralType } from "./types.js";
export declare class BooleanLiteralHandler extends NodeHandler {
    accepts(node: ESTree.Node): Promise<ESTree.Literal | boolean>;
    handle(node: ESTree.Literal): Promise<BooleanLiteralType>;
}
