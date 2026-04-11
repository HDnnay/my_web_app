// src/routes/admin/+layout.server.ts
import type { LayoutServerLoad, LayoutServerLoadEvent } from "./$houdini";
import { redirect } from "@sveltejs/kit";

export const load: LayoutServerLoad = async (event) => {
    // 你的服务端逻辑
    return {
        // 返回数据
    };
};