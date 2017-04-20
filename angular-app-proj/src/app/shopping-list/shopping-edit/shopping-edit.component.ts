import { ShoppingListService } from './../shopping-list.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput')
  nameInputRef: ElementRef;

  @ViewChild('amountInput')
  amountInputRef: ElementRef;

  constructor(private _shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  /**
   * onAddItem
   */
  public onAddItem() {
    const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    this._shoppingListService.addIngredient(newIngredient);
  }
}
