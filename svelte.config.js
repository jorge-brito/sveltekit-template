import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { resolve, basename } from 'path';

const alias = (...folders) => {
	return {
		alias: Object.fromEntries(
			folders.reduce((acc, folder) => [
				...acc,
				[`@${basename(folder)}`,   resolve('src', folder)],
				[`@${basename(folder)}/*`, resolve('src', folder, '*')],
			], [])
		)
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter(),
		// path alias
		vite: {
			resolve: {
				...alias(
					'lib',
					'lib/components',
					'lib/store',
					'lib/styles',
					'lib/utils',
				)
			}
		}
	}
};

export default config;
