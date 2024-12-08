import { getLinkedWallets } from "./get-linked-wallets";
import { linkMyWallet } from "./link-my-wallet";
import { getMessage } from "./solana-message";

const COOKIE =
	"4X1JMGq5ANEPK7ztHzrGpGR1ikvVsssiaj3NnN97toSJWaFohsTW9vUqKLLqb1L1A42MZac5EiU5RrRhguijvV1A";
const PUBLIC_KEY = "77DXBXzzEttyNVUBXnh2tRC1pTCqbfqxUo5Yb4a393Bb";
const PRIVATE_KEY =
	"2Na3DYoRNwgvAFNhjvF57jF6rZ5wQiMhUdroRN7zBLjeCDh5e8TNnUkj1XLDutfZAAQnWm4k9bAsGZ7uQxErsUZb";
const ME_PUBLIC_KEY = "DrsUaCm12z97kBkAesUEgRkWdRKG4Z2oLzt2Tbsv5stv";

type LinkedWallet = {
	fromChain: string;
	fromWallet: string;
	toWallet: string;
};

async function main() {
	while (true) {
		try {
			console.log("running");

			const linkedWallets: LinkedWallet[] = await getLinkedWallets({
				cookieString: COOKIE,
			});

			console.log("running2");

			console.log(linkedWallets);

			const isPresent = linkedWallets.find(
				(wallet) =>
					wallet.fromWallet === PUBLIC_KEY && wallet.toWallet === ME_PUBLIC_KEY
			);

			if (!isPresent) {
				break;
			}
			console.log(linkedWallets.length);
		} catch {
			console.error("Error in main function:");
		} finally {
			await new Promise((resolve) => setTimeout(resolve, 3000)); // Optional delay before restart
		}
	}

	const response = await getMessage({
		publicKey: PUBLIC_KEY,
		privateKey: PRIVATE_KEY,
		mePublicKey: ME_PUBLIC_KEY,
	});

	if (response) {
		await linkMyWallet({
			cookie: COOKIE,
			message: response.message,
			publicKey: PUBLIC_KEY,
			signature: response.signature,
		});
	}
	console.log("Done");
}

async function runMain() {
	while (true) {
		try {
			console.log("Starting main execution...");
			await main();
		} catch (error) {
			console.error("Error in runMain function:");
		}

		console.log("Restarting main function...");
		await new Promise((resolve) => setTimeout(resolve, 3000)); // Optional delay before restart
	}
}

void runMain();
