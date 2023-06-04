import { Comparator, Comparison, Operation, Operator, StructuredQuery, Visitor, VisitorComparisonResult, VisitorOperationResult, VisitorStructuredQueryResult } from "../../chains/query_constructor/ir.js";
export declare abstract class BaseTranslator extends Visitor {
    abstract allowedOperators: Operator[];
    abstract allowedComparators: Comparator[];
    abstract formatFunction(func: Operator | Comparator): string;
}
export declare class BasicTranslator extends BaseTranslator {
    allowedOperators: Operator[];
    allowedComparators: Comparator[];
    formatFunction(func: Operator | Comparator): string;
    visitOperation(operation: Operation): VisitorOperationResult;
    visitComparison(comparison: Comparison): VisitorComparisonResult;
    visitStructuredQuery(query: StructuredQuery): VisitorStructuredQueryResult;
}
