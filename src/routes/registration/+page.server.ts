import { type Cookies } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { type Writable, writable, get } from 'svelte/store';
import { FrontendApi, type UiNodeInputAttributes, type RegistrationFlow, type SuccessfulNativeRegistration, type UpdateRegistrationFlowWithPasswordMethod } from '@ory/kratos-client'

const csrf_token: Writable<string> = writable();

async function get_csrf_token(cookies: Cookies, flow_id: string) {

  let csrf_token_cookie = cookies.getAll().find(c => c.name.startsWith("csrf_token"))??{ name: "", value: "" }
  console.log(csrf_token_cookie);
  let csrf_serialized = csrf_token_cookie.name + "=" + csrf_token_cookie.value;

  const kratos = new FrontendApi(undefined, 'http://127.0.0.1:4433');
  kratos.getRegistrationFlow({ cookie: csrf_serialized , id: flow_id }).then(({ data: flow }) => {
    console.log(flow);
  })
    
  /*
    const url = "http://127.0.0.1:4433/self-service/registration/flows?id=" + flow_id
    // mode no-cors can be used, but then the browser strips away all info, so we cannot use the repsonse :/
    // headers can be used, but then the request is more complex requiering an Options call for cors
    // credentials: "include" is necessary, as otherwise the crfs_token cookies are not set :/ With it is incompatible with the wildcard * for Access-Control-Allow-Origin
    let csrf_token_req = await fetch(url, {
		    credentials: "include",
        mode: 'cors',
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    //console.log(csrf_token_req);
    const body = await csrf_token_req.json();
    for (const element of body.ui.nodes.entries()) {
      console.log("Element: ");
      console.log(element);
    }
    console.log(body);
    */
}

export const load = (async ({ cookies, url }) => {
	const flow_id = url.searchParams.get('flow')
	if (flow_id !== null ) {
		await get_csrf_token(cookies, flow_id);
	}
	return {
      flow_id
  };
}) satisfies PageServerLoad;
