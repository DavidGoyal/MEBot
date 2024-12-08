import axios from "axios";

export const getLinkedWallets = async ({
	cookieString,
}: {
	cookieString: string;
}) => {
	try {
		const response = await axios.get(
			"https://mefoundation.com/api/trpc/auth.walletLinkState",
			{
				params: {
					batch: "1",
					input: '{"0":{"json":null,"meta":{"values":["undefined"]}}}',
				},
				headers: {
					accept: "/",
					"accept-language": "en-US,en;q=0.9",
					baggage:
						"sentry-environment=production,sentry-release=oXMtQD3FAVHmwgq8OHCN1,sentry-public_key=43f5a6f01fe6dff7b5c0d7c54530d6a0,sentry-trace_id=ffbfe78fda064fb2b8c68b1fb45e5350,sentry-sample_rate=0.05,sentry-sampled=false",
					"cache-control": "no-cache",
					"content-type": "application/json",
					cookie: `session_signature=${cookieString}`,
					pragma: "no-cache",
					priority: "u=1, i",
					referer: "https://mefoundation.com/wallets",
					"sec-ch-ua":
						'"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
					"sec-ch-ua-mobile": "?0",
					"sec-ch-ua-platform": '"Windows"',
					"sec-fetch-dest": "empty",
					"sec-fetch-mode": "cors",
					"sec-fetch-site": "same-origin",
					"sentry-trace": "ffbfe78fda064fb2b8c68b1fb45e5350-936486f43f223eb4-0",
					"user-agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
					"x-trpc-source": "nextjs-react",
				},
			}
		);

		return response.data[0].result.data.json.state;
	} catch (error) {
		return null;
	}
};
