import type meriyahT from "meriyah";
export declare abstract class NodeHandler {
    protected parentHandler?: NodeHandler | undefined;
    constructor(parentHandler?: NodeHandler | undefined);
    abstract accepts(node: meriyahT.ESTree.Node): Promise<meriyahT.ESTree.Node | boolean>;
    abstract handle(node: meriyahT.ESTree.Node): Promise<any>;
}
export declare class ASTParser {
    static astParseInstance: typeof meriyahT.parseScript;
    static importASTParser(): Promise<typeof meriyahT.parseScript>;
    static isProgram(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.Program;
    static isExpressionStatement(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.ExpressionStatement;
    static isCallExpression(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.CallExpression;
    static isLiteral(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.Literal;
    static isStringLiteral(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.Literal;
    static isNumericLiteral(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.Literal;
    static isBooleanLiteral(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.Literal;
    static isIdentifier(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.Identifier;
    static isObjectExpression(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.ObjectExpression;
    static isArrayExpression(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.ArrayExpression;
    static isProperty(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.Property;
    static isMemberExpression(node: meriyahT.ESTree.Node): node is meriyahT.ESTree.MemberExpression;
}
