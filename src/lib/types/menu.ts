// 菜单项类型定义
export interface MenuItem {
    id?: string;
    path: string;
    name: string;
    icon?: string;
    level: number;
    order?: number;
    parentId?: string | null;
    childMenus?: MenuItem[];
}
