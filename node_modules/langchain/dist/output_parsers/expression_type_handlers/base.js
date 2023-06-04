export class NodeHandler {
    constructor(parentHandler) {
        Object.defineProperty(this, "parentHandler", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: parentHandler
        });
    }
}
export class ASTParser {
    static async importASTParser() {
        try {
            if (!ASTParser.astParseInstance) {
                const meriyah = await import("meriyah");
                ASTParser.astParseInstance =
                    meriyah.parseScript;
            }
            return ASTParser.astParseInstance;
        }
        catch (e) {
            console.log(e);
            throw new Error("Failed to import meriyah. Please install meriyah (i.e. npm install meriyah).");
        }
    }
    static isProgram(node) {
        return node.type === "Program";
    }
    static isExpressionStatement(node) {
        return node.type === "ExpressionStatement";
    }
    static isCallExpression(node) {
        return node.type === "CallExpression";
    }
    static isLiteral(node) {
        return node.type === "Literal";
    }
    static isStringLiteral(node) {
        return node.type === "Literal" && typeof node.value === "string";
    }
    static isNumericLiteral(node) {
        return node.type === "Literal" && typeof node.value === "number";
    }
    static isBooleanLiteral(node) {
        return node.type === "Literal" && typeof node.value === "boolean";
    }
    static isIdentifier(node) {
        return node.type === "Identifier";
    }
    static isObjectExpression(node) {
        return node.type === "ObjectExpression";
    }
    static isArrayExpression(node) {
        return node.type === "ArrayExpression";
    }
    static isProperty(node) {
        return node.type === "Property";
    }
    static isMemberExpression(node) {
        return node.type === "MemberExpression";
    }
}
