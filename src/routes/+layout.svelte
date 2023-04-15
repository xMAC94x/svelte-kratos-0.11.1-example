<script>
	import '../app.postcss';
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, ImagePlaceholder, Skeleton, TextPlaceholder } from 'flowbite-svelte'
</script>

<div class="">
    <Navbar let:hidden let:toggle>
      <NavBrand href="/">
        <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Svelte Kratos 0.11.1 example
        </span>
      </NavBrand>
      <NavHamburger on:click={toggle} />
      <NavUl {hidden}>
        <NavLi href="/" active={true}>Home</NavLi>
        <NavLi href="/registration">Register</NavLi>
        <NavLi href="/login">Login</NavLi>
        <NavLi href="/internal">Internal</NavLi>
      </NavUl>
    </Navbar>

    <div id="content" class="text-slate-50 mt-4 mb-20 mx-auto" style="width: 1440px; backdrop-filter: blur(8px) brightness(99%);">
        <slot />
        <div class="h-80" />
    </div>
</div>