import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidenav-routes.config';

@Component({
    moduleId: module.id,
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',

})

export class SidenavComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {

        this.menuItems = ROUTES.filter(menuItem => menuItem);
    };
};
