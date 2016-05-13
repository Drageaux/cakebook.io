System.register(["angular2/core", "angular2/http", 'angular2/router', "angular2/platform/common", "angular2-jwt", "./loggedin-outlet", "./login.component", "./home.component", "./cakes/search.component", "./users/profile.component", "./users/user.service", "./cakes/cake-details.component", "./cakes/cake.service", "./transition.service"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, router_1, common_1, angular2_jwt_1, loggedin_outlet_1, login_component_1, home_component_1, search_component_1, profile_component_1, user_service_1, cake_details_component_1, cake_service_1, transition_service_1, core_2, core_3;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (angular2_jwt_1_1) {
                angular2_jwt_1 = angular2_jwt_1_1;
            },
            function (loggedin_outlet_1_1) {
                loggedin_outlet_1 = loggedin_outlet_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (search_component_1_1) {
                search_component_1 = search_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (cake_details_component_1_1) {
                cake_details_component_1 = cake_details_component_1_1;
            },
            function (cake_service_1_1) {
                cake_service_1 = cake_service_1_1;
            },
            function (transition_service_1_1) {
                transition_service_1 = transition_service_1_1;
            }],
        execute: function() {
            core_3.enableProdMode();
            AppComponent = (function () {
                function AppComponent(authHttp, _router, _location, _userService) {
                    this.authHttp = authHttp;
                    this._router = _router;
                    this._location = _location;
                    this._userService = _userService;
                }
                AppComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    if (!this.loggedIn()) {
                        this._router.navigate(["Login"]);
                    }
                    else {
                        // if logged in, update if missing info
                        this._userService.getUser()
                            .subscribe(function (res) {
                            if (res == null) {
                                _this._userService.addUser()
                                    .subscribe(function (res) { return console.log("New User: " + res); });
                            }
                            else {
                                _this._userService.updateImportantDetails()
                                    .subscribe(function (res) { return console.log("Updated user information"); });
                            }
                        });
                    }
                    // back-to-top button
                    var displayBackToTop = this.displayBackToTop.bind(this);
                    document.onscroll = function () {
                        displayBackToTop(window.scrollY);
                    };
                };
                AppComponent.prototype.goToProfile = function () {
                    var _this = this;
                    this._userService.getUser()
                        .subscribe(function (res) { return _this._router.navigate(["Profile", {
                            user: res.userId
                        }]); });
                };
                AppComponent.prototype.logout = function () {
                    localStorage.removeItem("profile");
                    localStorage.removeItem("id_token");
                    this._router.navigate(["Login"]);
                };
                /*****************
                 * Scrolling Nav *
                 *****************/
                AppComponent.prototype.displayBackToTop = function (value) {
                    if (document.getElementById("backToTop")) {
                        if (value > 70) {
                            document.getElementById("backToTop").style.display = "block";
                        }
                        else {
                            document.getElementById("backToTop").style.display = "none";
                        }
                    }
                };
                AppComponent.prototype.scrollBackToTop = function () {
                    setTimeout(function () {
                        window.scrollTo(0, 0);
                    }, 0);
                    return;
                };
                /********************
                 * Helper Functions *
                 ********************/
                AppComponent.prototype.loggedIn = function () {
                    return localStorage.getItem("id_token") != null;
                };
                AppComponent.prototype.atLoginPage = function () {
                    return this._location.path() == "/login";
                };
                /* Template for Getting Things Auth0 */
                AppComponent.prototype.getSecretThing = function () {
                    this.authHttp.get('http://example.com/api/secretthing')
                        .subscribe(function (data) { return console.log(data.json()); }, function (err) { return console.log(err); }, function () { return console.log('Complete'); });
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: "templates/app.component.html",
                        styleUrls: ["assets/custom/stylesheets/style.css"],
                        encapsulation: core_2.ViewEncapsulation.None,
                        providers: [
                            user_service_1.UserService,
                            cake_service_1.CakeService,
                            transition_service_1.TransitionService,
                            router_1.ROUTER_PROVIDERS,
                            http_1.HTTP_PROVIDERS
                        ],
                        directives: [router_1.ROUTER_DIRECTIVES, loggedin_outlet_1.LoggedInRouterOutlet]
                    }),
                    router_1.RouteConfig([
                        { path: "/login", name: "Login", component: login_component_1.LoginComponent },
                        { path: "/home", name: "Home", component: home_component_1.HomeComponent, useAsDefault: true },
                        { path: "/profile/:user", name: "Profile", component: profile_component_1.ProfileComponent },
                        { path: "/cake/:id", name: "CakeDetails", component: cake_details_component_1.CakeDetailsComponent },
                        { path: "/search/query/:query/start/:start/end/:end", name: "Search", component: search_component_1.SearchComponent }
                    ]), 
                    __metadata('design:paramtypes', [angular2_jwt_1.AuthHttp, router_1.Router, common_1.Location, user_service_1.UserService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map