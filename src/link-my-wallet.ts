import axios from "axios";

export const linkMyWallet = async ({
	cookie,
	message,
	publicKey,
	signature,
}: {
	cookie: string;
	message: string;
	publicKey: string;
	signature: string;
}) => {
	try {
		let data = JSON.stringify({
			"0": {
				json: {
					message,
					wallet: publicKey,
					chain: "sol",
					signature,
					allocationEvent: "tge-airdrop-final",
					isLedger: false,
				},
			},
		});

		let config = {
			method: "post",
			maxBodyLength: Infinity,
			url: "https://mefoundation.com/api/trpc/auth.linkWallet?batch=1",
			headers: {
				accept: "*/*",
				"accept-language": "en-US,en;q=0.9",
				baggage:
					"sentry-environment=production,sentry-release=oXMtQD3FAVHmwgq8OHCN1,sentry-public_key=43f5a6f01fe6dff7b5c0d7c54530d6a0,sentry-trace_id=ae1c0b286e024eb095a817b761523567,sentry-sample_rate=0.05,sentry-sampled=false",
				"cache-control": "no-cache",
				"content-type": "application/json",
				cookie: `session_signature=${cookie}`,
				origin: "https://mefoundation.com",
				pragma: "no-cache",
				priority: "u=1, i",
				referer: "https://mefoundation.com/wallets",
				"sec-ch-ua":
					'"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
				"sec-ch-ua-mobile": "?1",
				"sec-ch-ua-platform": '"Android"',
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"sentry-trace": "ae1c0b286e024eb095a817b761523567-854f1548c11a9061-0",
				"user-agent":
					"Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
				"x-trpc-source": "nextjs-react",
			},
			data: data,
		};

		await axios.request(config);
	} catch (error) {
		console.error(error);
	}
};
