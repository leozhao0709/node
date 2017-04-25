import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  editMode = false;
  editItemIndex: number;
  editItem: Ingredient;

  editForm = new FormGroup({
    'name': new FormControl(null, [Validators.required]),
    'amount': new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]\d*$/)])
  });

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this._shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editItem = this._shoppingListService.getIngredient(index);
        this.editForm.setValue({
          'name': this.editItem.name,
          'amount': this.editItem.amount
        });
      }
    );
  }

  /**
   * onAddItem
   */
  public onSubmit() {
    const newIngredient: Ingredient = new Ingredient(this.editForm.get('name').value, this.editForm.get('amount').value);
    if (this.editMode) {
      this._shoppingListService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this._shoppingListService.addIngredient(newIngredient);
    }
    // this.editMode = false;
    // this.editForm.reset({
    //     'amount': 0
    //   });
    this.onClear();
  }

  /**
   * onClear
   */
  public onClear() {
    this.editMode = false;
    this.editForm.reset({
      'amount': 0
    });
  }

  /**
   * onDelete
   */
  public onDelete() {
    this._shoppingListService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
}
