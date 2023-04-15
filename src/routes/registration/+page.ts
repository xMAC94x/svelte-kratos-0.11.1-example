import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ url }) => {
	const flow_id = url.searchParams.get('flow')
	if (flow_id === null ) {
		throw redirect(303, 'http://127.0.0.1:4433/self-service/registration/browser?return_to=')
	}
}) satisfies PageLoad;
