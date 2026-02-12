<script setup lang="ts">
	import { ref } from 'vue';

	const form = ref({
		name: '',
		email: '',
		document: '',
		password: '',
		accountId: '',
		message: '',
	});

	async function signup() {
		const input = form.value;
		const response = await fetch('http://localhost:3000/signup', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(input),
		});
		const output = await response.json();
		if (output.accountId) {
			form.value.accountId = output.accountId;
			form.value.message = 'success';
		} else {
			form.value.message = output.message;
		}
	}
</script>

<template>
	<h1>Ola Murilo</h1>
	<div class="response">
		<input
			class="input-name"
			type="text"
			placeholder="name"
			v-model="form.name"
		/>
		<input
			class="input-email"
			type="text"
			placeholder="email"
			v-model="form.email"
		/>
		<input
			class="input-document"
			type="text"
			placeholder="document"
			v-model="form.document"
		/>
		<input
			class="input-password"
			type="text"
			placeholder="password"
			v-model="form.password"
		/>
	</div>
	<div>
		<button class="button-signup" @click="signup()">Signup</button>
	</div>
	<div class="response">
		<span class="span-account-id">{{ form.accountId }}</span>
		<span class="span-message">{{ form.message }}</span>
	</div>
</template>

<style scoped>
	.response {
		display: flex;
		flex-direction: column;
		width: 300px;
		gap: 5px;
	}
</style>
