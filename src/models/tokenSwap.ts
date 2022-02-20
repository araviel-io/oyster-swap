import { Numberu64, TokenSwap } from "@solana/spl-token-swap";
import { PublicKey, Account, TransactionInstruction } from "@solana/web3.js";
import * as BufferLayout from "buffer-layout";

export { TokenSwap } from "@solana/spl-token-swap";

/**
 * Layout for a public key
 */
export const publicKey = (property: string = "publicKey"): Object => {
  return BufferLayout.blob(32, property);
};

/**
 * Layout for a 64bit unsigned value
 */
export const uint64 = (property: string = "uint64"): Object => {
  return BufferLayout.blob(8, property);
};

export const TokenSwapLayoutLegacyV0 = BufferLayout.struct([
  BufferLayout.u8("isInitialized"),
  BufferLayout.u8("nonce"),
  publicKey("tokenAccountA"),
  publicKey("tokenAccountB"),
  publicKey("tokenPool"),
  uint64("feesNumerator"),
  uint64("feesDenominator"),
]);

export const TokenSwapLayoutV1: typeof BufferLayout.Structure = BufferLayout.struct(
  [
    BufferLayout.u8("isInitialized"),
    BufferLayout.u8("nonce"),
    publicKey("tokenProgramId"),
    publicKey("tokenAccountA"),
    publicKey("tokenAccountB"),
    publicKey("tokenPool"),
    publicKey("mintA"),
    publicKey("mintB"),
    publicKey("feeAccount"),
    BufferLayout.u8("curveType"),
    uint64("tradeFeeNumerator"),
    uint64("tradeFeeDenominator"),
    uint64("ownerTradeFeeNumerator"),
    uint64("ownerTradeFeeDenominator"),
    uint64("ownerWithdrawFeeNumerator"),
    uint64("ownerWithdrawFeeDenominator"),
    BufferLayout.blob(16, "padding"),
  ]
);

class TokenSwapLegacy {
  // @ts-ignore: TS7019
  static createInitSwapInstruction(...args): TransactionInstruction {
    throw new Error('createInitSwapInstruction not available for legacy swap program');
  }

  static swapInstruction(
    tokenSwap: PublicKey,
    authority: PublicKey,
    _userTransferAuthority: PublicKey,
    userSource: PublicKey,
    poolSource: PublicKey,
    poolDestination: PublicKey,
    userDestination: PublicKey,
    poolMint: PublicKey,
    feeAccount: PublicKey,
    _hostFeeAccount: PublicKey | null,
    swapProgramId: PublicKey,
    tokenProgramId: PublicKey,
    amountIn: number | Numberu64,
    minimumAmountOut: number | Numberu64,
  ): TransactionInstruction {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8("instruction"),
      uint64("amountIn"),
      uint64("minimumAmountOut"),
    ]);

    const keys = [
          { pubkey: tokenSwap, isSigner: false, isWritable: false },
          { pubkey: authority, isSigner: false, isWritable: false },
          { pubkey: userSource, isSigner: false, isWritable: true },
          { pubkey: poolSource, isSigner: false, isWritable: true },
          { pubkey: poolDestination, isSigner: false, isWritable: true },
          { pubkey: userDestination, isSigner: false, isWritable: true },
          { pubkey: poolMint, isSigner: false, isWritable: true },
          { pubkey: feeAccount, isSigner: false, isWritable: true },
          { pubkey: tokenProgramId, isSigner: false, isWritable: false },
        ];

    // optional depending on the build of token-swap program
    /*if (programOwner) {
      keys.push({ pubkey: programOwner, isSigner: false, isWritable: true });
    }*/

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 1, // Swap instruction
        amountIn: new Numberu64(amountIn).toBuffer(),
        minimumAmountOut: new Numberu64(minimumAmountOut).toBuffer(),
      },
      data
    );

    return new TransactionInstruction({
      keys,
      programId: swapProgramId,
      data,
    });  
  }

  static depositAllTokenTypesInstruction(
    tokenSwap: PublicKey,
    authority: PublicKey,
    _userTransferAuthority: PublicKey,
    sourceA: PublicKey,
    sourceB: PublicKey,
    intoA: PublicKey,
    intoB: PublicKey,
    poolToken: PublicKey,
    poolAccount: PublicKey,
    swapProgramId: PublicKey,
    tokenProgramId: PublicKey,
    poolTokenAmount: number | Numberu64,
    maximumTokenA: number | Numberu64,
    maximumTokenB: number | Numberu64,
  ): TransactionInstruction {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8("instruction"),
      uint64("poolTokenAmount"),
      uint64("maximumTokenA"),
      uint64("maximumTokenB"),
    ]);

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 2, // Deposit instruction
        poolTokenAmount: new Numberu64(poolTokenAmount).toBuffer(),
        maximumTokenA: new Numberu64(maximumTokenA).toBuffer(),
        maximumTokenB: new Numberu64(maximumTokenB).toBuffer(),
      },
      data
    );

    const keys = [
      { pubkey: tokenSwap, isSigner: false, isWritable: false },
      { pubkey: authority, isSigner: false, isWritable: false },
      { pubkey: sourceA, isSigner: false, isWritable: true },
      { pubkey: sourceB, isSigner: false, isWritable: true },
      { pubkey: intoA, isSigner: false, isWritable: true },
      { pubkey: intoB, isSigner: false, isWritable: true },
      { pubkey: poolToken, isSigner: false, isWritable: true },
      { pubkey: poolAccount, isSigner: false, isWritable: true },
      { pubkey: tokenProgramId, isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
      keys,
      programId: swapProgramId,
      data,
    });
  }

  static withdrawAllTokenTypesInstruction(
    tokenSwap: PublicKey,
    authority: PublicKey,
    _userTransferAuthority: PublicKey,
    poolMint: PublicKey,
    feeAccount: PublicKey,
    sourcePoolAccount: PublicKey,
    fromA: PublicKey,
    fromB: PublicKey,
    userAccountA: PublicKey,
    userAccountB: PublicKey,
    swapProgramId: PublicKey,
    tokenProgramId: PublicKey,
    poolTokenAmount: number | Numberu64,
    minimumTokenA: number | Numberu64,
    minimumTokenB: number | Numberu64,
  ) {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8("instruction"),
      uint64("poolTokenAmount"),
      uint64("minimumTokenA"),
      uint64("minimumTokenB"),
    ]);
  
    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 3, // Withdraw instruction
        poolTokenAmount: new Numberu64(poolTokenAmount).toBuffer(),
        minimumTokenA: new Numberu64(minimumTokenA).toBuffer(),
        minimumTokenB: new Numberu64(minimumTokenB).toBuffer(),
      },
      data
    );
  
    const keys = [
      { pubkey: tokenSwap, isSigner: false, isWritable: false },
      { pubkey: authority, isSigner: false, isWritable: false },
      { pubkey: poolMint, isSigner: false, isWritable: true },
      { pubkey: sourcePoolAccount, isSigner: false, isWritable: true },
      { pubkey: fromA, isSigner: false, isWritable: true },
      { pubkey: fromB, isSigner: false, isWritable: true },
      { pubkey: userAccountA, isSigner: false, isWritable: true },
      { pubkey: userAccountB, isSigner: false, isWritable: true },
    ];
  
    if (feeAccount) {
      keys.push({ pubkey: feeAccount, isSigner: false, isWritable: true });
    }
    keys.push({ pubkey: tokenProgramId, isSigner: false, isWritable: false });
  
    return new TransactionInstruction({
      keys,
      programId: swapProgramId,
      data,
    });
  }

  static depositSingleTokenTypeExactAmountInInstruction(
    tokenSwap: PublicKey,
    authority: PublicKey,
    _userTransferAuthority: PublicKey,
    source: PublicKey,
    intoA: PublicKey,
    intoB: PublicKey,
    poolToken: PublicKey,
    poolAccount: PublicKey,
    swapProgramId: PublicKey,
    tokenProgramId: PublicKey,
    sourceTokenAmount: number | Numberu64,
    minimumPoolTokenAmount: number | Numberu64,
  ): TransactionInstruction {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8("instruction"),
      uint64("sourceTokenAmount"),
      uint64("minimumPoolTokenAmount"),
    ]);

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 4, // DepositExactOne instruction
        sourceTokenAmount: new Numberu64(sourceTokenAmount).toBuffer(),
        minimumPoolTokenAmount: new Numberu64(minimumPoolTokenAmount).toBuffer(),
      },
      data
    );

    const keys = [
      { pubkey: tokenSwap, isSigner: false, isWritable: false },
      { pubkey: authority, isSigner: false, isWritable: false },
      { pubkey: source, isSigner: false, isWritable: true },
      { pubkey: intoA, isSigner: false, isWritable: true },
      { pubkey: intoB, isSigner: false, isWritable: true },
      { pubkey: poolToken, isSigner: false, isWritable: true },
      { pubkey: poolAccount, isSigner: false, isWritable: true },
      { pubkey: tokenProgramId, isSigner: false, isWritable: false },
    ];

    return new TransactionInstruction({
      keys,
      programId: swapProgramId,
      data,
    });
  }
  
  static withdrawSingleTokenTypeExactAmountOutInstruction(
    tokenSwap: PublicKey,
    authority: PublicKey,
    _userTransferAuthority: PublicKey,
    poolMint: PublicKey,
    feeAccount: PublicKey,
    sourcePoolAccount: PublicKey,
    fromA: PublicKey,
    fromB: PublicKey,
    userAccount: PublicKey,
    swapProgramId: PublicKey,
    tokenProgramId: PublicKey,
    destinationTokenAmount: number | Numberu64,
    maximumPoolTokenAmount: number | Numberu64,
  ): TransactionInstruction {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8("instruction"),
      uint64("sourceTokenAmount"),
      uint64("maximumTokenAmount"),
    ]);

    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode(
      {
        instruction: 5, // WithdrawExactOne instruction
        sourceTokenAmount: new Numberu64(destinationTokenAmount).toBuffer(),
        maximumTokenAmount: new Numberu64(maximumPoolTokenAmount).toBuffer(),
      },
      data
    );

    const keys = [
      { pubkey: tokenSwap, isSigner: false, isWritable: false },
      { pubkey: authority, isSigner: false, isWritable: false },
      { pubkey: poolMint, isSigner: false, isWritable: true },
      { pubkey: sourcePoolAccount, isSigner: false, isWritable: true },
      { pubkey: fromA, isSigner: false, isWritable: true },
      { pubkey: fromB, isSigner: false, isWritable: true },
      { pubkey: userAccount, isSigner: false, isWritable: true },
    ];

    if (feeAccount) {
      keys.push({ pubkey: feeAccount, isSigner: false, isWritable: true });
    }
    keys.push({ pubkey: tokenProgramId, isSigner: false, isWritable: false });

    return new TransactionInstruction({
      keys,
      programId: swapProgramId,
      data,
    });
  }
}

export class TokenSwapRouter {
  static route(isLatestSwap: boolean) : TokenSwap | TokenSwapLegacy {
    return isLatestSwap ? TokenSwap : TokenSwapLegacy
  }
}