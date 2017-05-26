import { NgModule } from '@angular/core';
import { MdButtonModule, MdSnackBarModule, MdInputModule, MdSliderModule, MdProgressSpinnerModule } from '@angular/material';

@NgModule({
    imports: [MdButtonModule, MdSnackBarModule, MdInputModule, MdSliderModule, MdProgressSpinnerModule],
    exports: [MdButtonModule, MdSnackBarModule, MdInputModule, MdSliderModule, MdProgressSpinnerModule],
})
export class AppMaterialModule { }
