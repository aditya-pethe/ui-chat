"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MasterHandler = exports.ExpressionParser = void 0;
const factory_js_1 = require("./expression_type_handlers/factory.cjs");
const output_parser_js_1 = require("../schema/output_parser.cjs");
const base_js_1 = require("./expression_type_handlers/base.cjs");
/**
 * okay so we need to be able to handle the following cases:
 * ExpressionStatement
 *  CallExpression
 *      Identifier | MemberExpression
 *      ExpressionLiterals: [
 *          CallExpression
 *          StringLiteral
 *          NumericLiteral
 *          ArrayLiteralExpression
 *              ExpressionLiterals
 *          ObjectLiteralExpression
 *              PropertyAssignment
 *                  Identifier
 *                  ExpressionLiterals
 *      ]
 */
class ExpressionParser extends output_parser_js_1.BaseOutputParser {
    async parse(text) {
        const parse = await base_js_1.ASTParser.importASTParser();
        try {
            const program = parse(text);
            if (program.body.length > 1) {
                throw new Error(`Expected 1 statement, got ${program.body.length}`);
            }
            const [node] = program.body;
            if (!base_js_1.ASTParser.isExpressionStatement(node)) {
                throw new Error(`Expected ExpressionStatement, got ${node.type}`);
            }
            const { expression: expressionStatement } = node;
            if (!base_js_1.ASTParser.isCallExpression(expressionStatement)) {
                throw new Error("Expected CallExpression");
            }
            const masterHandler = factory_js_1.MasterHandler.createMasterHandler();
            return await masterHandler.handle(expressionStatement);
        }
        catch (err) {
            throw new Error(`Error parsing ${err}: ${text}`);
        }
    }
    getFormatInstructions() {
        return "";
    }
}
exports.ExpressionParser = ExpressionParser;
__exportStar(require("./expression_type_handlers/types.cjs"), exports);
var factory_js_2 = require("./expression_type_handlers/factory.cjs");
Object.defineProperty(exports, "MasterHandler", { enumerable: true, get: function () { return factory_js_2.MasterHandler; } });
