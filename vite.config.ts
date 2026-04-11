import houdini from "houdini/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({ 
    plugins: [tailwindcss(),houdini(),  sveltekit()] ,
    resolve: {
			alias: {
				$houdini: './$houdini',
			},
		},
});
