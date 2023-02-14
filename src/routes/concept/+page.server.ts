import { get } from 'svelte/store';
import { contents } from '../../libs/stores/concepts';
import type { PageServerLoad } from './$types';
export const load = (async ({ url }) => {
	const id = url.searchParams.get('idx');
	if (id != null) {
		const idx: string = get(contents).includes(id) ? id : 'UNTITLED';
		return {
			fileName: idx
		};
	}
	return {
		fileName: 'UNTITLED'
	};
}) satisfies PageServerLoad;
