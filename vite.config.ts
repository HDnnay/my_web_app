import tailwindcss from '@tailwindcss/vite';
import houdini from "houdini/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({ 
    plugins: [houdini(),tailwindcss(),  sveltekit()] ,
    resolve: {
			alias: {
				$houdini: './$houdini',
			},
		},
});
