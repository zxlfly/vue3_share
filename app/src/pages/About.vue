<template>
	<div>
		about page
		<router-link :to="{ name: 'info', params: { username: 'erina' } }"
			>info</router-link
		>
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	setup() {
		return {};
	},
};
</script>

<style scoped>
</style>