import houdini from "houdini/vite";
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({ 
    plugins: [tailwindcss(),houdini(),  sveltekit()] ,
	server: {
        port: 5174,      // 修改为你想要的端口号
        strictPort: false, // 若设为 true，端口被占用时程序会报错而非自动切换
    },
    resolve: {
			alias: {
				$houdini: './$houdini',
			},
		},
});
