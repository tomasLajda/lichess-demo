import { defineConfig } from 'orval';

export default defineConfig({
	clients: {
		input: './openapi.json',
		output: {
			target: './src/generated/client',
			mode: 'tags',
			client: 'fetch',
			schemas: './src/generated/types',
			baseUrl: 'https://lichess.org',
			biome: true,
		},
	},
	zod: {
		input: './openapi.json',
		output: {
			target: './src/generated/zod',
			mode: 'tags',
			client: 'zod',
			schemas: './src/generated/types',
			biome: true,
		},
	},
});
