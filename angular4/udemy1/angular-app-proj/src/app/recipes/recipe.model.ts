import { Ingredient } from './../shared/ingredient.model';
export class Recipe {
	public name: string;
	public description: string;
	public imagePath: string;
	public ingredients: Ingredient[];


	constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
		this.name = name;
		this.description = description;
		this.imagePath = imagePath;
		this.ingredients = ingredients;
	}


	// public get name(): string {
	// 	return this._name;
	// }

	// public set name(value: string) {
	// 	this._name = value;
	// }


	// public get description(): string {
	// 	return this._description;
	// }

	// public set description(value: string) {
	// 	this._description = value;
	// }


	// public get imagePath(): string {
	// 	return this._imagePath;
	// }

	// public set imagePath(value: string) {
	// 	this._imagePath = value;
	// }


	// public get ingredients(): Ingredient[] {
	// 	return this._ingredients;
	// }

	// public set ingredients(value: Ingredient[]) {
	// 	this._ingredients = value;
	// }


}
