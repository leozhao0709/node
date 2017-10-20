import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private _dataStorageService: DataStorageService, public authService: AuthService) { }

  ngOnInit() {
  }

  onSaveData() {
    this._dataStorageService.storeRecipes().subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  onFetchData() {
    this._dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }

}
