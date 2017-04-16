export class Recipe {
  private _name: string;
  private _description: string;
  private _imagePath: string;

	constructor(name: string, description: string, imagePath: string) {
		this._name = name;
		this._description = description;
		this._imagePath = imagePath;
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

}
