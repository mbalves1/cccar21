export default class ORM {
	async save(model: Model) {}

	async get(model: Model, field: string, value: string) {}
}

class Model {
	schema!: string;
	table!: string;
	column!: { column: string; property: string };
}
