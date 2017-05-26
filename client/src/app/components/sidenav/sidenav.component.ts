import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidenav-routes.config';

import { AuthService } from 'app/_services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',

})

export class SidenavComponent implements OnInit {
    public menuItems: any[];

    constructor(private auth: AuthService) { }

    ngOnInit() {

        this.menuItems = ROUTES.filter(menuItem => menuItem);
    };

    onLogout(): void {
        this.auth.logout();
    };
};
