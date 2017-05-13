import { NgModule } from '@angular/core';
import { MdButtonModule, MdSnackBarModule, MdInputModule } from '@angular/material';

@NgModule({
    imports: [MdButtonModule, MdSnackBarModule, MdInputModule],
    exports: [MdButtonModule, MdSnackBarModule, MdInputModule],
})
export class AppMaterialModule { }
