import { QueryStore } from '../runtime/stores/query'
import artifact from '$houdini/artifacts/GetMenuTree'
import { initClient } from '$houdini/plugins/houdini-svelte/runtime/client'

export class GetMenuTreeStore extends QueryStore {
	constructor() {
		super({
			artifact,
			storeName: "GetMenuTreeStore",
			variables: false,
		})
	}
}

export async function load_GetMenuTree(params) {
  await initClient()

	const store = new GetMenuTreeStore()

	await store.fetch(params)

	return {
		GetMenuTree: store,
	}
}
