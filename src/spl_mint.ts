import { 
    Keypair, 
    Connection,
    PublicKey, 
} from "@solana/web3.js";

import { 
    mintTo,
    getOrCreateAssociatedTokenAccount,
 } from "@solana/spl-token";

import wallet from "../keys/test.json";

const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
const mint = new PublicKey("5YTFBS2hctwkYyMSXAaY7SJ6cuqdWknugvzw3zkBDtce");

(async () => {

    const tokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        keypair,
        mint,
        keypair.publicKey,
    );

    const ata = tokenAccount.address;
    console.log("Associated Token Account: ", ata.toBase58());

    const amount = 1e6;

    /**
     * Mint tokens to an account
     *
     * @param connection     Connection to use
     * @param payer          Payer of the transaction fees
     * @param mint           Mint for the account
     * @param destination    Address of the account to mint to
     * @param authority      Minting authority
     * @param amount         Amount to mint
     * @param multiSigners   Signing accounts if `authority` is a multisig
     * @param confirmOptions Options for confirming the transaction
     * @param programId      SPL Token program account
     *
     * @return Signature of the confirmed transaction
     */
    await mintTo(
        connection,
        keypair,
        mint,
        ata,
        keypair.publicKey,
        amount
    );

    console.log("Minted", amount, "to", ata.toBase58());

})()