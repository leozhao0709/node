import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output()
  featureSelected = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }

  /**
   * onSelect
   */
  public onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

}
