/**
 * Ingredient
 */
export class Ingredient {
    private _name: string;
    private _amount: number;

	constructor(name: string, amount: number) {
		this._name = name;
		this._amount = amount;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}

	public get amount(): number {
		return this._amount;
	}

	public set amount(value: number) {
		this._amount = value;
	}

}

