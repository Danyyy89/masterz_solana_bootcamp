import { 
    Keypair, 
    Connection, 
} from "@solana/web3.js";

import { createMint } from "@solana/spl-token";

import wallet from "../test.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

(async () => {

    const mint = await createMint(
        connection,               // Connection to use
        keypair,                  // Payer of the transaction and initialization fees
        keypair.publicKey,        // Account or multisig that will control minting
        null,                     // Optional account or multisig that can freeze token accounts
        6,                        // Location of the decimal place
    );

    console.log("Mint Address:", mint.toBase58());
})()