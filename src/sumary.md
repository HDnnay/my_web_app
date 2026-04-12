用之前没改的代码和修改后的代码进行对比，来说明 group 类的作用：

## 代码对比
### 修改前的代码（问题代码）：
```
<details class="group w-full">
    <summary class="flex 
    items-center px-3 py-2 w-full 
    cursor-pointer 
    transition-colors 
    {liHoverClass} {isActiveMenu
    (menu.path) ? activeClass : ''}
    ">
        <div class="{indentClass} 
        flex-1">
            <span>{menu.name}</span>
        </div>
        <span class="transform 
        transition-transform 
        group-open:rotate-180">▼</
        span>
    </summary>
    <ul class="mt-1 space-y-1 
    w-full">
        {#each menu.childMenus as 
        childMenu}
            <SidebarItem 
                menu={childMenu}
                isActiveMenu=
                {isActiveMenu} 
                handleMenuClick=
                {handleMenuClick}
                liHoverClass=
                {liHoverClass}
                themeColor=
                {themeColor}
            />
        {/each}
    </ul>
</details>
```
### 修改后的代码（修复代码）：
```
<details class="w-full">
    <summary class="flex 
    items-center px-3 py-2 w-full 
    cursor-pointer 
    transition-colors 
    {liHoverClass} {isActiveMenu
    (menu.path) ? activeClass : ''} 
    group">
        <div class="{indentClass} 
        flex-1">
            <span>{menu.name}</span>
        </div>
        <span class="transform 
        transition-transform 
        group-open:rotate-180">▼</
        span>
    </summary>
    <ul class="mt-1 space-y-1 
    w-full">
        {#each menu.childMenus as 
        childMenu}
            <SidebarItem 
                menu={childMenu}
                isActiveMenu=
                {isActiveMenu} 
                handleMenuClick=
                {handleMenuClick}
                liHoverClass=
                {liHoverClass}
                themeColor=
                {themeColor}
            />
        {/each}
    </ul>
</details>
```
## 效果对比
### 场景：展开"角色权限管理"菜单 修改前的效果：
- 角色权限管理 ：三角图标旋转为向上（△）
- 角色管理 ：无变化（无三角图标）
- 权限管理 ：无变化（无三角图标）
- 用户管理 ：三角图标也旋转为向上（△），即使它没有被展开
- 菜单管理 ：无变化（无三角图标）
问题 ：所有子菜单的三角图标都受到父菜单展开状态的影响，导致"用户管理"的三角图标错误地显示为向上。
 修改后的效果：
- 角色权限管理 ：三角图标旋转为向上（△）
- 角色管理 ：无变化（无三角图标）
- 权限管理 ：无变化（无三角图标）
- 用户管理 ：三角图标保持向下（▼），直到它被单独展开
- 菜单管理 ：无变化（无三角图标）
优势 ：每个菜单项的三角图标只响应自己的展开状态，不受父菜单的影响。

## 原因分析
### 修改前：
- group 类在 details 元素上
- 当 details 展开时，所有子元素（包括子菜单）都继承了 group-open 状态
- 这导致所有子菜单的 group-open:rotate-180 样式都被激活
### 修改后：
- group 类在 summary 元素上
- 每个 SidebarItem 都有自己独立的 group 上下文
- 只有当前 summary 所在的 details 展开时，才会激活该 summary 内的 group-open:rotate-180 样式
- 子菜单的 group 上下文不受父菜单的影响
这样就确保了每个菜单项的三角图标只响应自己的展开状态，实现了我们想要的效果。