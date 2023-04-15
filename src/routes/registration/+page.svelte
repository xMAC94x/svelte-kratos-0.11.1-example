<script lang="ts">
  import Button from '../../components/button.svelte'
  import Input from '../../components/input.svelte'
  import { FrontendApi, type UiNodeInputAttributes, type RegistrationFlow, type SuccessfulNativeRegistration, type UpdateRegistrationFlowWithPasswordMethod } from '@ory/kratos-client'
  import axios from 'axios'
  import { type Writable, writable, get } from 'svelte/store';
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';


  export let data: PageData;

  const kratos = new FrontendApi(undefined, 'http://127.0.0.1:4433');

  const registrationFlow: Writable<RegistrationFlow> = writable();
  const session: Writable<SuccessfulNativeRegistration> = writable();
  const error: Writable<String> = writable();
  const csrf_token: Writable<string> = writable();

  let username: string = "xMAC94x";
  let password: string = "3HRaF2jB8fG=aF2d";
  let password_confirm: string = "3HRaF2jB8fG=aF2d";
  let email: string = "marcel.cochem@googlemail.com";

  async function get_csrf_token(fetch: typeof window.fetch, flow_id: string) {
    const url = "http://127.0.0.1:4433/self-service/registration/flows?id=" + flow_id
    // mode no-cors can be used, but then the browser strips away all info, so we cannot use the repsonse :/
    // headers can be used, but then the request is more complex requiering an Options call for cors
    // credentials: "include" is necessary, as otherwise the crfs_token cookies are not set :/ With it is incompatible with the wildcard * for Access-Control-Allow-Origin
    let csrf_token_req = await fetch(url, {
		    credentials: "include",
        mode: 'cors',
        //mode: 'no-cors', // https://stackoverflow.com/questions/45696999/fetch-unexpected-end-of-input
        method: "get",
        headers: {
            "Content-Type": "application/json",
        }
    });
    console.log(url);
    console.log(csrf_token_req);
    const body = await csrf_token_req.json();
    for (const element of csrf_token_req.headers.entries()) {
      console.log("Element: ");
      console.log(element);
    }
  	let cookies = csrf_token_req.headers.get("set-cookie") ?? ""
    console.log(cookies);
    console.log(csrf_token_req.ok);
    //const body = await csrf_token_req.json();

    console.log(body);
    console.log(flow_id);
}

  onMount(async () => {
    if (data.flow_id !== null) {
      //await get_csrf_token(fetch, data.flow_id);
    }
	});
  
  // with cookie to get token
  // http://127.0.0.1:4433/self-service/registration/flows?id=b7a9363f-41f8-449d-96a7-33f028d7894b
</script>

{#if $session}
  <h1>Welcome, {$session.identity.traits.email}!</h1>
{:else if $error}
  <p>{$error}</p>
{:else if data.flow_id !== null && $csrf_token === null}
  <p>Loading AAA...</p>
{:else if data.flow_id !== null && $csrf_token !== null}
  <form class="text-gray-600 body-font" action="http://127.0.0.1:4433/self-service/registration?flow={data.flow_id}" method="POST">
    <div class="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0">
      <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Register</h2>
      <input type="hidden" name="csrf_token" value="asdasd" />
      <input type="hidden" name="method" value="password" />
      <Input name="traits.username" label="Username" bind:value={username} type="text" required />
      <Input name="password" label="Password" bind:value={password} type="password" required />
      <Input name="" label="Confirm Password" bind:value={password_confirm} type="password" required />
      <Input name="traits.email" label="Email" bind:value={email} type="email" required />
      <Button>Register</Button>
    </div>
  </form>
{:else}
  <p>Loading...</p>
{/if}