import { LLMChain } from "../../chains/llm_chain.js";
import { QueryConstructorChainOptions } from "../../chains/query_constructor/index.js";
import { Document } from "../../document.js";
import { BaseRetriever } from "../../schema/index.js";
import { VectorStore } from "../../vectorstores/base.js";
import { BaseTranslator, BasicTranslator } from "./translator.js";
export { BaseTranslator, BasicTranslator };
export type SelfQueryRetrieverArgs = {
    vectorStore: VectorStore;
    llmChain: LLMChain;
    structuredQueryTranslator: BaseTranslator;
    verbose?: boolean;
    searchParams?: {
        k?: number;
        filter?: VectorStore["FilterType"];
    };
};
export declare class SelfQueryRetriever extends BaseRetriever implements SelfQueryRetrieverArgs {
    vectorStore: VectorStore;
    llmChain: LLMChain;
    verbose?: boolean;
    structuredQueryTranslator: BaseTranslator;
    searchParams?: {
        k?: number;
        filter?: VectorStore["FilterType"];
    };
    constructor(options: SelfQueryRetrieverArgs);
    getRelevantDocuments(query: string): Promise<Document<Record<string, unknown>>[]>;
    static fromLLM(opts: QueryConstructorChainOptions & {
        vectorStore: VectorStore;
        structuredQueryTranslator: BaseTranslator;
    }): SelfQueryRetriever;
}
