import { ParsedType } from "./expression_type_handlers/types.js";
import { BaseOutputParser } from "../schema/output_parser.js";
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
export declare class ExpressionParser extends BaseOutputParser<ParsedType> {
    parse(text: string): Promise<ParsedType>;
    getFormatInstructions(): string;
}
export * from "./expression_type_handlers/types.js";
export { MasterHandler } from "./expression_type_handlers/factory.js";
