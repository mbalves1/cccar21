<script setup lang="ts">
	import { ref, inject } from 'vue';
	import { AccountGatewayHttp, AccountGatewayMemory } from './AccountGateway';
	import type AccountGateway from './AccountGateway';

	const form = ref({
		name: '',
		email: '',
		document: '',
		password: '',
		accountId: '',
		message: '',
	});
	const accountGateway = inject('accountGateway') as AccountGateway;

	async function signup() {
		const input = form.value;
		const output = await accountGateway.save(input);
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
