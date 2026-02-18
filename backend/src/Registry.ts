export default class Registry {
	dependencies: { [name: string]: any } = {};

	provide(name: string, dependency: any) {
		this.dependencies[name] = dependency;
	}

	inject(name: string) {
		const dependency = this.dependencies[name];
		if (!dependency) throw new Error(`Dependency ${name} not found `);
		return dependency;
	}
}
