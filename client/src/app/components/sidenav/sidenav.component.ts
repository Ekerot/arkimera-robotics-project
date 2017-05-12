import { Component, OnInit } from '@angular/core';
import { ROUTES } from '/Users/ekerot/Documents/arkimera-robotics-project/arkimera-robotics-project/client/src/app/components/sidenav/sidenav-routes.config';

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',

})

export class SidenavComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        //$.getScript('/Users/ekerot/Documents/arkimera-robotics-project/arkimera-robotics-project/client/src/assets/js/sidebar-moving-tab.js');
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
