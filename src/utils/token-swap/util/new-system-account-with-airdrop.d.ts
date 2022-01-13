import { Account, Connection } from '@safecoin/web3.js';
/**
 * Create a new system account and airdrop it some lamports
 *
 * @private
 */
export declare function newSystemAccountWithAirdrop(connection: Connection, lamports?: number): Promise<Account>;
