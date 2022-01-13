/// <reference types="node" />
import type { Connection } from '@safecoin/web3.js';
import { PublicKey } from '@safecoin/web3.js';
export declare function loadAccount(connection: Connection, address: PublicKey, programId: PublicKey): Promise<Buffer>;
