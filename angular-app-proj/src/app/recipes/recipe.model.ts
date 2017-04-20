import { Ingredient } from './../shared/ingredient.model';
export class Recipe {
	private _name: string;
	private _description: string;
	private _imagePath: string;
	private _ingredients: Ingredient[];


	constructor(name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
		this._name = name;
		this._description = description;
		this._imagePath = imagePath;
		this._ingredients = ingredients;
	}


	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}


	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}


	public get imagePath(): string {
		return this._imagePath;
	}

	public set imagePath(value: string) {
		this._imagePath = value;
	}


	public get ingredients(): Ingredient[] {
		return this._ingredients;
	}

	public set ingredients(value: Ingredient[]) {
		this._ingredients = value;
	}


}
