/*
(C) Copyright 2015–2022 Potsdam Institute for Climate Impact Research (PIK), authors, and contributors, see AUTHORS file.

This file is part of vodle.

vodle is free software: you can redistribute it and/or modify it under the 
terms of the GNU Affero General Public License as published by the Free 
Software Foundation, either version 3 of the License, or (at your option) 
any later version.

vodle is distributed in the hope that it will be useful, but WITHOUT ANY 
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR 
A PARTICULAR PURPOSE. See the GNU Affero General Public License for more 
details.

You should have received a copy of the GNU Affero General Public License 
along with vodle. If not, see <https://www.gnu.org/licenses/>. 
*/

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DelegationDialogWeightedPageRoutingModule } from './delegation-dialog-weighted-routing.module';

import { DelegationDialogWeightedPage } from './delegation-dialog-weighted.page';
export { DelegationDialogWeightedPage } from './delegation-dialog-weighted.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DelegationDialogWeightedPageRoutingModule,
    TranslateModule.forChild()
  ],
  declarations: [DelegationDialogWeightedPage],
  exports: [DelegationDialogWeightedPage]
})
export class DelegationDialogPageModule {}
