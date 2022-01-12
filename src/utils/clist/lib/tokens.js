"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenListProvider = exports.Strategy = exports.CDNTokenListResolutionStrategy = exports.GitHubTokenListResolutionStrategy = exports.StaticTokenListResolutionStrategy = exports.SolanaTokenListResolutionStrategy = exports.TOKENS = exports.ENV = void 0;
const devnet_json_1 = __importDefault(require("./../tokens/devnet.json"));
const mainnet_beta_json_1 = __importDefault(require("./../tokens/mainnet-beta.json"));
const testnet_json_1 = __importDefault(require("./../tokens/testnet.json"));
const cross = __importStar(require("cross-fetch"));
var ENV;
(function (ENV) {
    ENV["MainnetBeta"] = "mainnet-beta";
    ENV["Testnet"] = "testnet";
    ENV["Devnet"] = "devnet";
})(ENV = exports.ENV || (exports.ENV = {}));
exports.TOKENS = {
    [ENV.MainnetBeta]: mainnet_beta_json_1.default,
    [ENV.Testnet]: testnet_json_1.default,
    [ENV.Devnet]: devnet_json_1.default,
};
class SolanaTokenListResolutionStrategy {
    constructor() {
        this.resolve = async (network) => {
            throw new Error(`Not Implemented Yet. ${network}`);
        };
    }
}
exports.SolanaTokenListResolutionStrategy = SolanaTokenListResolutionStrategy;
class StaticTokenListResolutionStrategy {
    constructor() {
        this.resolve = async (network) => {
            return exports.TOKENS[network];
        };
    }
}
exports.StaticTokenListResolutionStrategy = StaticTokenListResolutionStrategy;
const queryJsonFiles = async (network, files) => {
    const responses = await Promise.all(files.map(async (repo) => {
        try {
            const response = await cross.fetch(`${repo}/${network}.json`);
            const json = (await response.json());
            return json;
        }
        catch (_a) {
            return [];
        }
    }));
    return responses.reduce((acc, arr) => acc.concat(arr), []);
};
class GitHubTokenListResolutionStrategy {
    constructor() {
        this.repositories = [
            'https://raw.githubusercontent.com/solana-labs/token-list/main/src/tokens',
            'https://raw.githubusercontent.com/project-serum/serum-ts/master/packages/tokens/src',
        ];
        this.resolve = async (network) => {
            return queryJsonFiles(network, this.repositories);
        };
    }
}
exports.GitHubTokenListResolutionStrategy = GitHubTokenListResolutionStrategy;
class CDNTokenListResolutionStrategy {
    constructor() {
        this.repositories = [
            'https://cdn.jsdelivr.net/gh/solana-labs/token-list@main/src/tokens',
            'https://cdn.jsdelivr.net/gh/project-serum/serum-ts@master/packages/tokens/src',
        ];
        this.resolve = async (network) => {
            return queryJsonFiles(network, this.repositories);
        };
    }
}
exports.CDNTokenListResolutionStrategy = CDNTokenListResolutionStrategy;
var Strategy;
(function (Strategy) {
    Strategy["GitHub"] = "GitHub";
    Strategy["Static"] = "Static";
    Strategy["Solana"] = "Solana";
    Strategy["CDN"] = "CDN";
})(Strategy = exports.Strategy || (exports.Strategy = {}));
class TokenListProvider {
    constructor() {
        this.resolve = async (network, strategy = Strategy.CDN) => {
            return TokenListProvider.strategies[strategy].resolve(network);
        };
    }
}
exports.TokenListProvider = TokenListProvider;
TokenListProvider.strategies = {
    [Strategy.GitHub]: new GitHubTokenListResolutionStrategy(),
    [Strategy.Static]: new StaticTokenListResolutionStrategy(),
    [Strategy.Solana]: new SolanaTokenListResolutionStrategy(),
    [Strategy.CDN]: new CDNTokenListResolutionStrategy(),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi90b2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDBFQUE2QztBQUM3QyxzRkFBd0Q7QUFDeEQsNEVBQStDO0FBRS9DLG1EQUFxQztBQUVyQyxJQUFZLEdBSVg7QUFKRCxXQUFZLEdBQUc7SUFDYixtQ0FBNEIsQ0FBQTtJQUM1QiwwQkFBbUIsQ0FBQTtJQUNuQix3QkFBaUIsQ0FBQTtBQUNuQixDQUFDLEVBSlcsR0FBRyxHQUFILFdBQUcsS0FBSCxXQUFHLFFBSWQ7QUFFWSxRQUFBLE1BQU0sR0FBRztJQUNwQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFBRSwyQkFBVztJQUM5QixDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxzQkFBTztJQUN0QixDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxxQkFBTTtDQUNyQixDQUFDO0FBWUYsTUFBYSxpQ0FBaUM7SUFBOUM7UUFDRSxZQUFPLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sSUFBSSxLQUFLLENBQUMsd0JBQXdCLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDO0lBQ0osQ0FBQztDQUFBO0FBSkQsOEVBSUM7QUFFRCxNQUFhLGlDQUFpQztJQUE5QztRQUNFLFlBQU8sR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFFLEVBQUU7WUFDbEMsT0FBTyxjQUFNLENBQUMsT0FBYyxDQUFpQixDQUFDO1FBQ2hELENBQUMsQ0FBQztJQUNKLENBQUM7Q0FBQTtBQUpELDhFQUlDO0FBRUQsTUFBTSxjQUFjLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBRSxLQUFlLEVBQUUsRUFBRTtJQUNoRSxNQUFNLFNBQVMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQ3ZCLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksT0FBTyxPQUFPLENBQUMsQ0FBQztZQUM5RCxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFpQixDQUFDO1lBQ3JELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFBQyxXQUFNO1lBQ04sT0FBTyxFQUFFLENBQUM7U0FDWDtJQUNILENBQUMsQ0FBQyxDQUNILENBQUM7SUFFRixPQUFPLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdELENBQUMsQ0FBQztBQUVGLE1BQWEsaUNBQWlDO0lBQTlDO1FBQ0UsaUJBQVksR0FBRztZQUNiLDBFQUEwRTtZQUMxRSxxRkFBcUY7U0FDdEYsQ0FBQztRQUVGLFlBQU8sR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFFLEVBQUU7WUFDbEMsT0FBTyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQUE7QUFURCw4RUFTQztBQUVELE1BQWEsOEJBQThCO0lBQTNDO1FBQ0UsaUJBQVksR0FBRztZQUNiLG9FQUFvRTtZQUNwRSwrRUFBK0U7U0FDaEYsQ0FBQztRQUVGLFlBQU8sR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFFLEVBQUU7WUFDbEMsT0FBTyxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUM7SUFDSixDQUFDO0NBQUE7QUFURCx3RUFTQztBQUVELElBQVksUUFLWDtBQUxELFdBQVksUUFBUTtJQUNsQiw2QkFBaUIsQ0FBQTtJQUNqQiw2QkFBaUIsQ0FBQTtJQUNqQiw2QkFBaUIsQ0FBQTtJQUNqQix1QkFBVyxDQUFBO0FBQ2IsQ0FBQyxFQUxXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBS25CO0FBRUQsTUFBYSxpQkFBaUI7SUFBOUI7UUFRRSxZQUFPLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBRSxXQUFxQixRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDckUsT0FBTyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQztJQUNKLENBQUM7O0FBWEQsOENBV0M7QUFWUSw0QkFBVSxHQUFHO0lBQ2xCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksaUNBQWlDLEVBQUU7SUFDMUQsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsSUFBSSxpQ0FBaUMsRUFBRTtJQUMxRCxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLGlDQUFpQyxFQUFFO0lBQzFELENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksOEJBQThCLEVBQUU7Q0FDckQsQ0FBQyJ9