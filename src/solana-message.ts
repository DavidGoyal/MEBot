import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

export const getMessage = async ({
	privateKey,
	publicKey,
	mePublicKey,
}: {
	privateKey: string;
	publicKey: string;
	mePublicKey: string;
}) => {
	// Decode private key from Base58
	const secretKeyBytes = bs58.decode(privateKey);
	const keypair = Keypair.fromSecretKey(secretKeyBytes);

	// Prepare the message
	const message = `URI: mefoundation.com\nIssued At: ${new Date().toISOString()}\nChain ID: sol\nAllocation Wallet: ${publicKey}\nClaim Wallet: ${mePublicKey}`;
	const messageBytes = decodeUTF8(message);

	// Sign the message
	const signature = nacl.sign.detached(messageBytes, keypair.secretKey);

	// Verify the signature
	const isValid = nacl.sign.detached.verify(
		messageBytes,
		signature,
		keypair.publicKey.toBytes()
	);

	if (isValid) {
		return;
	}

	// Encode the signature as Base64 or Base58 for readability
	return { signature: bs58.encode(signature), message };
};
