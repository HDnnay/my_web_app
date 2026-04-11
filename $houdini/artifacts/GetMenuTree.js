export default {
    "name": "GetMenuTree",
    "kind": "HoudiniQuery",
    "hash": "4662496b2d58aed79535ce1425b6017b9a12a6b2a16165b05ebeb7f5993f5d5a",

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
`,

    "rootType": "Query",
    "stripVariables": [],

    "selection": {
        "fields": {
            "menuTree": {
                "type": "AppMenuDto",
                "keyRaw": "menuTree",
                "nullable": true,

                "selection": {
                    "fields": {
                        "id": {
                            "type": "ID",
                            "keyRaw": "id",
                            "visible": true,
                            "nullable": true
                        },

                        "name": {
                            "type": "String",
                            "keyRaw": "name",
                            "nullable": true,
                            "visible": true
                        },

                        "path": {
                            "type": "String",
                            "keyRaw": "path",
                            "nullable": true,
                            "visible": true
                        },

                        "icon": {
                            "type": "String",
                            "keyRaw": "icon",
                            "nullable": true,
                            "visible": true
                        },

                        "order": {
                            "type": "Int",
                            "keyRaw": "order",
                            "nullable": true,
                            "visible": true
                        },

                        "parentId": {
                            "type": "ID",
                            "keyRaw": "parentId",
                            "nullable": true,
                            "visible": true
                        },

                        "createdAt": {
                            "type": "DateTime",
                            "keyRaw": "createdAt",
                            "nullable": true,
                            "visible": true
                        },

                        "updatedAt": {
                            "type": "DateTime",
                            "keyRaw": "updatedAt",
                            "nullable": true,
                            "visible": true
                        },

                        "childMenus": {
                            "type": "AppMenuDto",
                            "keyRaw": "childMenus",
                            "nullable": true,

                            "selection": {
                                "fields": {
                                    "id": {
                                        "type": "ID",
                                        "keyRaw": "id",
                                        "visible": true,
                                        "nullable": true
                                    },

                                    "name": {
                                        "type": "String",
                                        "keyRaw": "name",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "path": {
                                        "type": "String",
                                        "keyRaw": "path",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "icon": {
                                        "type": "String",
                                        "keyRaw": "icon",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "order": {
                                        "type": "Int",
                                        "keyRaw": "order",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "parentId": {
                                        "type": "ID",
                                        "keyRaw": "parentId",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "createdAt": {
                                        "type": "DateTime",
                                        "keyRaw": "createdAt",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "updatedAt": {
                                        "type": "DateTime",
                                        "keyRaw": "updatedAt",
                                        "nullable": true,
                                        "visible": true
                                    },

                                    "childMenus": {
                                        "type": "AppMenuDto",
                                        "keyRaw": "childMenus",
                                        "nullable": true,

                                        "selection": {
                                            "fields": {
                                                "id": {
                                                    "type": "ID",
                                                    "keyRaw": "id",
                                                    "visible": true,
                                                    "nullable": true
                                                },

                                                "name": {
                                                    "type": "String",
                                                    "keyRaw": "name",
                                                    "nullable": true,
                                                    "visible": true
                                                },

                                                "path": {
                                                    "type": "String",
                                                    "keyRaw": "path",
                                                    "nullable": true,
                                                    "visible": true
                                                },

                                                "icon": {
                                                    "type": "String",
                                                    "keyRaw": "icon",
                                                    "nullable": true,
                                                    "visible": true
                                                },

                                                "order": {
                                                    "type": "Int",
                                                    "keyRaw": "order",
                                                    "nullable": true,
                                                    "visible": true
                                                },

                                                "parentId": {
                                                    "type": "ID",
                                                    "keyRaw": "parentId",
                                                    "nullable": true,
                                                    "visible": true
                                                },

                                                "createdAt": {
                                                    "type": "DateTime",
                                                    "keyRaw": "createdAt",
                                                    "nullable": true,
                                                    "visible": true
                                                },

                                                "updatedAt": {
                                                    "type": "DateTime",
                                                    "keyRaw": "updatedAt",
                                                    "nullable": true,
                                                    "visible": true
                                                }
                                            }
                                        },

                                        "visible": true
                                    }
                                }
                            },

                            "visible": true
                        }
                    }
                },

                "visible": true
            }
        }
    },

    "pluginData": {
        "houdini-svelte": {}
    },

    "policy": "CacheOrNetwork",
    "partial": false
};

"HoudiniHash=fd79c29584817e9333ccbfd71ccb15fbe85424cdf4545d0cf9878c3bb02354a2";