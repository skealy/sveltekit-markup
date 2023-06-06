import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { mdsvex, escapeSvelte } from 'mdsvex';
import shiki from 'shiki';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';


/** @type {import('@sveltejs/kit').Config} */
const mdsvexOptions = {
	extensions: ['.md'],
	laylot: {
		_: './src/mdsvex.svelte'
	},
	highlighter: async (code, lang = 'text') => {
		const highlighter = await shiki.getHighlighter({ themes: 'poimandres' })
		const html = escapeSvelte(highlighter.codeToHtml(code, { lang }))
		return `{@html \`${html}\` }`
	},
	remarkplugins: [remarkUnwrapImages, [remarkToc, { tight: true }]],
	rehypePlugins: [rehypeSlug]
}

const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	}
};

export default config;
