export declare enum ENV {
    MainnetBeta = "mainnet-beta",
    Testnet = "testnet",
    Devnet = "devnet"
}
export declare const TOKENS: {
    "mainnet-beta": ({
        tokenSymbol: string;
        mintAddress: string;
        tokenName: string;
        icon: string;
        website?: undefined;
    } | {
        tokenSymbol: string;
        mintAddress: string;
        tokenName: string;
        icon: string;
        website: string;
    } | {
        tokenSymbol: string;
        mintAddress: string;
        tokenName: string;
        icon?: undefined;
        website?: undefined;
    } | {
        tokenSymbol: string;
        mintAddress: string;
        tokenName: string;
        website: string;
        icon?: undefined;
    })[];
    testnet: ({
        tokenSymbol: string;
        mintAddress: string;
        tokenName: string;
        icon: string;
        website?: undefined;
    } | {
        tokenSymbol: string;
        mintAddress: string;
        tokenName: string;
        icon: string;
        website: string;
    })[];
    devnet: {
        tokenSymbol: string;
        mintAddress: string;
        tokenName: string;
        icon: string;
    }[];
};
export interface KnownToken {
    tokenSymbol: string;
    tokenName: string;
    icon?: string;
    website?: string;
    mintAddress: string;
}
export declare type KnownTokenMap = Map<string, KnownToken>;
export declare class SolanaTokenListResolutionStrategy {
    resolve: (network: string) => Promise<never>;
}
export declare class StaticTokenListResolutionStrategy {
    resolve: (network: string) => Promise<KnownToken[]>;
}
export declare class GitHubTokenListResolutionStrategy {
    repositories: string[];
    resolve: (network: string) => Promise<KnownToken[]>;
}
export declare class CDNTokenListResolutionStrategy {
    repositories: string[];
    resolve: (network: string) => Promise<KnownToken[]>;
}
export declare enum Strategy {
    GitHub = "GitHub",
    Static = "Static",
    Solana = "Solana",
    CDN = "CDN"
}
export declare class TokenListProvider {
    static strategies: {
        GitHub: GitHubTokenListResolutionStrategy;
        Static: StaticTokenListResolutionStrategy;
        Solana: SolanaTokenListResolutionStrategy;
        CDN: CDNTokenListResolutionStrategy;
    };
    resolve: (network: string, strategy?: Strategy) => Promise<KnownToken[]>;
}
