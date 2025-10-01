import { useEffect, useState } from 'react';
import { apiToken, getOauthUrl } from '../generated/client/oauth';
import type { ApiTokenBody, OauthParams } from '../generated/types';
import './index.css';

export const App = () => {
	const [accessToken, setAccessToken] = useState<string | null>(null);

	useEffect(() => {
		handleOAuthReturn();
	}, []);

	const handleOAuthReturn = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get('code');
		const storedVerifier = localStorage.getItem('code_verifier');

		if (code && storedVerifier) {
			try {
				const requestBody: ApiTokenBody = {
					grant_type: 'authorization_code',
					code,
					code_verifier: storedVerifier,
					client_id: 'lichess-api-demo',
					redirect_uri: window.location.origin,
				};

				const tokenResponse = await apiToken(requestBody);

				if (
					tokenResponse.status === 200 &&
					'access_token' in tokenResponse.data
				) {
					const token = (tokenResponse.data as any).access_token;
					setAccessToken(token);
					localStorage.setItem('access_token', token);
					localStorage.removeItem('code_verifier'); // Clean up

					window.history.replaceState(
						{},
						document.title,
						window.location.pathname,
					);
				} else {
					throw new Error('Token exchange failed');
				}
			} catch (error) {
				console.error('Token exchange failed:', error);
			}
		}
	};

	// Helper functions for PKCE
	const generateCodeVerifier = () => {
		const array = new Uint8Array(32);
		crypto.getRandomValues(array);
		return btoa(String.fromCharCode(...array))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '');
	};

	const generateCodeChallenge = async (verifier: string) => {
		const encoder = new TextEncoder();
		const data = encoder.encode(verifier);
		const digest = await crypto.subtle.digest('SHA-256', data);
		return btoa(String.fromCharCode(...new Uint8Array(digest)))
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=/g, '');
	};

	const authHandler = async () => {
		// Generate PKCE values
		const codeVerifier = generateCodeVerifier();
		const codeChallenge = await generateCodeChallenge(codeVerifier);

		console.log('Code Verifier:', codeVerifier);
		console.log('Code Challenge:', codeChallenge);

		localStorage.setItem('code_verifier', codeVerifier);

		const params: OauthParams = {
			response_type: 'code',
			/**
			 * Arbitrary identifier that uniquely identifies your application.
			 */
			client_id: 'lichess-api-demo',
			/**
			 * The absolute URL that the user should be redirected to with the authorization result.
			 */
			redirect_uri: window.location.origin,
			/**
			 * Must be `S256`.
			 */
			code_challenge_method: 'S256',
			/**
			 * Compute `BASE64URL(SHA256(code_verifier))`.
			 */
			code_challenge: codeChallenge,
		};

		const oauthUrl = getOauthUrl(params);
		console.log('Redirecting to:', oauthUrl);

		window.location.href = oauthUrl;
	};

	return (
		<div className="flex flex-col items-center justify-center h-xl w-xl gap-4">
			<div className="flex items-center gap-4">
				{accessToken ? (
					<div className="text-green-600 font-semibold">
						Authenticated with Lichess!
					</div>
				) : (
					<button onClick={authHandler}>Authenticate with Lichess</button>
				)}
			</div>
		</div>
	);
};
