<script lang="ts">
	import NavConcept from '../../libs/components/navbar/concept/index.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
</script>

<NavConcept FILE_NAME={data.fileName} />
