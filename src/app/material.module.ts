import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatToolbar } from '@angular/material/toolbar';
import { MatToolbarRow } from '@angular/material/toolbar';

const MaterialComponents = [
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatButtonModule,
  MatIconModule,
  MatNavList,
  MatToolbar,
  MatToolbarRow,
];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class MaterialModules {}
