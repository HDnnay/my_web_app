/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
    // "watchSchema": {
    //     "url": "http://localhost:5231/graphql"
    // },
    "schemaPath": "./src/gql/app.graphql",
    "runtimeDir": "$houdini",
    "plugins": {
        "houdini-svelte": {defaultRouteBlocking: true}
    },
    scalars: {
        DateTime: {
            type: 'Date',
            unmarshal(val) {
                return val ? new Date(val) : null
            },
            marshal(date) {
                return date && date.getTime()
            }
        }
    }
}

export default config
