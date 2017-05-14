import { NgModule } from '@angular/core';
import { MdButtonModule, MdSnackBarModule, MdInputModule, MdSliderModule } from '@angular/material';

@NgModule({
    imports: [MdButtonModule, MdSnackBarModule, MdInputModule, MdSliderModule],
    exports: [MdButtonModule, MdSnackBarModule, MdInputModule, MdSliderModule],
})
export class AppMaterialModule { }
