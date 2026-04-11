export type GetMenuTree = {
    readonly "input": GetMenuTree$input;
    readonly "result": GetMenuTree$result | undefined;
};

export type GetMenuTree$result = {
    /**
     * 获取菜单树形结构
    */
    readonly menuTree: ({
        readonly id: string | null;
        readonly name: string | null;
        readonly path: string | null;
        readonly icon: string | null;
        readonly order: number | null;
        readonly parentId: string | null;
        readonly createdAt: any | null;
        readonly updatedAt: any | null;
        readonly childMenus: ({
            readonly id: string | null;
            readonly name: string | null;
            readonly path: string | null;
            readonly icon: string | null;
            readonly order: number | null;
            readonly parentId: string | null;
            readonly createdAt: any | null;
            readonly updatedAt: any | null;
            readonly childMenus: ({
                readonly id: string | null;
                readonly name: string | null;
                readonly path: string | null;
                readonly icon: string | null;
                readonly order: number | null;
                readonly parentId: string | null;
                readonly createdAt: any | null;
                readonly updatedAt: any | null;
            } | null)[] | null;
        } | null)[] | null;
    } | null)[] | null;
};

export type GetMenuTree$input = null;

export type GetMenuTree$artifact = {
    "name": "GetMenuTree";
    "kind": "HoudiniQuery";
    "hash": "4662496b2d58aed79535ce1425b6017b9a12a6b2a16165b05ebeb7f5993f5d5a";
    "raw": `query GetMenuTree {
  menuTree {
    id
    name
    path
    icon
    order
    parentId
    createdAt
    updatedAt
    childMenus {
      id
      name
      path
      icon
      order
      parentId
      createdAt
      updatedAt
      childMenus {
        id
        name
        path
        icon
        order
        parentId
        createdAt
        updatedAt
      }
    }
  }
}
`;
    "rootType": "Query";
    "stripVariables": [];
    "selection": {
        "fields": {
            "menuTree": {
                "type": "AppMenuDto";
                "keyRaw": "menuTree";
                "nullable": true;
                "selection": {
                    "fields": {
                        "id": {
                            "type": "ID";
                            "keyRaw": "id";
                            "visible": true;
                            "nullable": true;
                        };
                        "name": {
                            "type": "String";
                            "keyRaw": "name";
                            "nullable": true;
                            "visible": true;
                        };
                        "path": {
                            "type": "String";
                            "keyRaw": "path";
                            "nullable": true;
                            "visible": true;
                        };
                        "icon": {
                            "type": "String";
                            "keyRaw": "icon";
                            "nullable": true;
                            "visible": true;
                        };
                        "order": {
                            "type": "Int";
                            "keyRaw": "order";
                            "nullable": true;
                            "visible": true;
                        };
                        "parentId": {
                            "type": "ID";
                            "keyRaw": "parentId";
                            "nullable": true;
                            "visible": true;
                        };
                        "createdAt": {
                            "type": "DateTime";
                            "keyRaw": "createdAt";
                            "nullable": true;
                            "visible": true;
                        };
                        "updatedAt": {
                            "type": "DateTime";
                            "keyRaw": "updatedAt";
                            "nullable": true;
                            "visible": true;
                        };
                        "childMenus": {
                            "type": "AppMenuDto";
                            "keyRaw": "childMenus";
                            "nullable": true;
                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "ID";
                                        "keyRaw": "id";
                                        "visible": true;
                                        "nullable": true;
                                    };
                                    "name": {
                                        "type": "String";
                                        "keyRaw": "name";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "path": {
                                        "type": "String";
                                        "keyRaw": "path";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "icon": {
                                        "type": "String";
                                        "keyRaw": "icon";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "order": {
                                        "type": "Int";
                                        "keyRaw": "order";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "parentId": {
                                        "type": "ID";
                                        "keyRaw": "parentId";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "createdAt": {
                                        "type": "DateTime";
                                        "keyRaw": "createdAt";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "updatedAt": {
                                        "type": "DateTime";
                                        "keyRaw": "updatedAt";
                                        "nullable": true;
                                        "visible": true;
                                    };
                                    "childMenus": {
                                        "type": "AppMenuDto";
                                        "keyRaw": "childMenus";
                                        "nullable": true;
                                        "selection": {
                                            "fields": {
                                                "id": {
                                                    "type": "ID";
                                                    "keyRaw": "id";
                                                    "visible": true;
                                                    "nullable": true;
                                                };
                                                "name": {
                                                    "type": "String";
                                                    "keyRaw": "name";
                                                    "nullable": true;
                                                    "visible": true;
                                                };
                                                "path": {
                                                    "type": "String";
                                                    "keyRaw": "path";
                                                    "nullable": true;
                                                    "visible": true;
                                                };
                                                "icon": {
                                                    "type": "String";
                                                    "keyRaw": "icon";
                                                    "nullable": true;
                                                    "visible": true;
                                                };
                                                "order": {
                                                    "type": "Int";
                                                    "keyRaw": "order";
                                                    "nullable": true;
                                                    "visible": true;
                                                };
                                                "parentId": {
                                                    "type": "ID";
                                                    "keyRaw": "parentId";
                                                    "nullable": true;
                                                    "visible": true;
                                                };
                                                "createdAt": {
                                                    "type": "DateTime";
                                                    "keyRaw": "createdAt";
                                                    "nullable": true;
                                                    "visible": true;
                                                };
                                                "updatedAt": {
                                                    "type": "DateTime";
                                                    "keyRaw": "updatedAt";
                                                    "nullable": true;
                                                    "visible": true;
                                                };
                                            };
                                        };
                                        "visible": true;
                                    };
                                };
                            };
                            "visible": true;
                        };
                    };
                };
                "visible": true;
            };
        };
    };
    "pluginData": {
        "houdini-svelte": {};
    };
    "policy": "CacheOrNetwork";
    "partial": false;
};