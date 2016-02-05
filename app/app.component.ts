import {Component, provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {XHRBackend} from "angular2/http";// in-memory web api imports
import {InMemoryBackendService, SEED_DATA} from 'a2-in-memory-web-api/core';

import {HomeComponent}          from "./home.component";
import {ProfileComponent}       from "./profile.component";
import {Cake}                   from "./cakes/cake";
import {CakeData}               from "./cakes/cake-data";
import {CakeDetailComponent}    from "./cakes/cake-detail.component";
import {CakeService}            from "./cakes/cake.service";

// Need to be imported later on for some reason
import {ViewEncapsulation}        from "angular2/core";

@Component({
    selector: 'my-app',
    template: `
        <nav class="navbar navbar-default navbar-fixed-top">
            <!-- Normal Menu -->
            <ul class="nav navbar-nav" id="normalMenu">
                <li><a class="navbar-item" [routerLink]="['Home']">Home</a></li>
                <li><a class="navbar-item" [routerLink]="['Cakes']">Profile</a></li>
            </ul>
        </nav>

        <router-outlet></router-outlet>
		`,
    styleUrls: ["app/stylesheets/style.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [
        HTTP_PROVIDERS,
        CakeService,
        // in-memory web api providers
        provide(XHRBackend, { useClass: InMemoryBackendService }), // in-mem server
        provide(SEED_DATA,  { useClass: CakeData }) // in-mem server data
    ],
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {path: "/home", name: "Home", component: HomeComponent, useAsDefault: true},
    {path: "/cakes", name: "Cakes", component: ProfileComponent},
    {path: "/cake/:id", name: "CakeDetail", component: CakeDetailComponent}
])

export class AppComponent {
}

