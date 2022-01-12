export declare enum ENV {
    MainnetBeta = 101,
    Testnet = 102,
    Devnet = 103
}
export interface TokenList {
    readonly name: string;
    readonly logoURI: string;
    readonly tags: {
        [tag: string]: TagDetails;
    };
    readonly timestamp: string;
    readonly tokens: TokenInfo[];
}
export interface TagDetails {
    readonly name: string;
    readonly description: string;
}
export interface TokenExtensions {
    readonly website?: string;
}
export interface TokenInfo {
    readonly chainId: number;
    readonly address: string;
    readonly name: string;
    readonly decimals: number;
    readonly symbol: string;
    readonly logoURI?: string;
    readonly tags?: string[];
    readonly extensions?: TokenExtensions;
}
export declare type TokenInfoMap = Map<string, TokenInfo>;
export declare const CLUSTER_SLUGS: {
    [id: string]: ENV;
};
export declare class GitHubTokenListResolutionStrategy {
    repositories: string[];
    resolve: () => Promise<TokenInfo[]>;
}
export declare class CDNTokenListResolutionStrategy {
    repositories: string[];
    resolve: () => Promise<TokenInfo[]>;
}
export declare enum Strategy {
    GitHub = "GitHub",
    Static = "Static",
    Solana = "Solana",
    CDN = "CDN"
}
export declare class SolanaTokenListResolutionStrategy {
    resolve: () => Promise<never>;
}
export declare class StaticTokenListResolutionStrategy {
    resolve: () => Promise<({
        chainId: number;
        address: string;
        symbol: string;
        name: string;
        decimals: number;
        logoURI: string;
        tags: string[];
        extensions: {
            website: string;
        };
    } | {
        chainId: number;
        address: string;
        symbol: string;
        name: string;
        decimals: number;
        logoURI: string;
        tags: string[];
        extensions?: undefined;
    } | {
        chainId: number;
        address: string;
        symbol: string;
        name: string;
        decimals: number;
        tags: never[];
        logoURI?: undefined;
        extensions?: undefined;
    } | {
        chainId: number;
        address: string;
        symbol: string;
        name: string;
        decimals: number;
        tags: string[];
        extensions: {
            website: string;
        };
        logoURI?: undefined;
    })[]>;
}
export declare class TokenListProvider {
    static strategies: {
        GitHub: GitHubTokenListResolutionStrategy;
        Static: StaticTokenListResolutionStrategy;
        Solana: SolanaTokenListResolutionStrategy;
        CDN: CDNTokenListResolutionStrategy;
    };
    resolve: (strategy?: Strategy) => Promise<TokenListContainer>;
}
export declare class TokenListContainer {
    private tokenList;
    constructor(tokenList: TokenInfo[]);
    filterByTag: (tag: string) => this;
    filterByChainId: (chainId: number | ENV) => this;
    excludeByChainId: (chainId: number | ENV) => this;
    excludeByTag: (tag: string) => this;
    filterByClusterSlug: (slug: string) => this;
    getList(): TokenInfo[];
}
