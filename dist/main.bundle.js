webpackJsonp([1,4],{

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_school_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_degree_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_mark_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcademicOverviewComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AcademicOverviewComponent = (function () {
    function AcademicOverviewComponent(schoolService, degreeService, markService, router) {
        this.schoolService = schoolService;
        this.degreeService = degreeService;
        this.markService = markService;
        this.router = router;
        this.schools = new Array();
        this.degrees = new Array();
        //variables for loading spinner controller
        this.isLoading_school = true;
        this.isLoading_degree = true;
        //variables for update-school - start
        this._school_id = new String;
        this._school_name = new String;
        this._city = new String;
        this._state = new String;
        this._country = new String;
        //variables for update-school - end
        //variables for update-degree - start
        this._degree_id = new String;
        this._degree_name = new String;
        this._school_id_degree = new String;
        //variables for update-degree - end
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        //variables for modal - end
        this.isSchoolEmpty = false;
        this.isDegreeEmpty = false;
        this.disable_degree_button = true;
        this.disable_mark_button = true;
        localStorage.removeItem('update_user');
        localStorage.removeItem('school_on_result');
        localStorage.removeItem('degree_on_result');
    }
    AcademicOverviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get schools
        this.schoolService.getSchoolsByUsername(JSON.parse(localStorage.getItem('user')).username)
            .subscribe(function (data) {
            _this.schools = data.schools;
            _this.isLoading_degree = false;
            if (_this.schools.length == 0) {
                _this.isSchoolEmpty = true;
            }
            else {
                _this.disable_degree_button = false;
            }
        });
        //get degrees
        this.degreeService.getDegreesByUsername(JSON.parse(localStorage.getItem('user')).username)
            .subscribe(function (data) {
            _this.degrees = data.degrees;
            _this.isLoading_school = false;
            if (_this.degrees.length == 0) {
                _this.isDegreeEmpty = true;
            }
            else {
                _this.disable_mark_button = false;
            }
        });
    };
    AcademicOverviewComponent.prototype.updateSchool = function (school) {
        this._school_id = school._id;
        this._school_name = school.school_name;
        this._city = school.city;
        this._state = school.state;
        this._country = school.country;
        $("#update-school-modal").modal("show");
    };
    AcademicOverviewComponent.prototype.updateSchoolSubmit = function () {
        var _this = this;
        var data = {
            school_name: this._school_name,
            city: this._city,
            state: this._state,
            country: this._country
        };
        $("#update-school-modal").modal("hide");
        $("#myModal").modal("show");
        this.schoolService.updateSchool(data, this._school_id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the school array
                var index = _this.schools.findIndex(function (school) { return school._id == _this._school_id; });
                var temp = _this.schools[index];
                temp.school_name = _this._school_name;
                temp.city = _this._city;
                temp.state = _this._state;
                temp.country = _this._country;
                _this.schools[index] = temp;
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AcademicOverviewComponent.prototype.updateDegree = function (degree) {
        this._degree_id = degree._id;
        this._degree_name = degree.degree_name;
        this._duration = degree.duration;
        this._school_id_degree = degree.school_id;
        $("#update-degree-modal").modal("show");
    };
    AcademicOverviewComponent.prototype.updateDegreeSubmit = function () {
        var _this = this;
        var school_name = this.schools.find(function (school) { return school._id == _this._school_id_degree; }).school_name;
        var data = {
            degree_name: this._degree_name,
            duration: this._duration,
            school_name: school_name,
            school_id: this._school_id_degree
        };
        $("#update-degree-modal").modal("hide");
        $("#myModal").modal("show");
        this.degreeService.updateDegree(data, this._degree_id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the degree array
                var index = _this.degrees.findIndex(function (degree) { return degree._id == _this._degree_id; });
                var temp = _this.degrees[index];
                temp.degree_name = _this._degree_name;
                temp.duration = _this._duration;
                temp.school_name = school_name;
                temp.school_id = _this._school_id_degree;
                _this.degrees[index] = temp;
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AcademicOverviewComponent.prototype.deleteDegree = function (degree) {
        var _this = this;
        if (confirm("Are you sure you want to delete degree [" + degree.degree_name + "]?")) {
            $("#myModal").modal("show");
            this.markService.deleteMarkByDegreeId(degree._id)
                .subscribe(function (data) {
                if (data.success) {
                    _this.modal_msg = "Deleted related marks successfully";
                    $("#myModal").modal("show");
                    _this.modal_msg_controller = true;
                    _this.modal_msg_on_success = true;
                    setTimeout(function () {
                        $("#myModal").modal("hide");
                        $("#myModal").modal("show");
                        _this.modal_msg_controller = false;
                        _this.modal_msg_on_success = false;
                        _this.degreeService.deleteDegree(degree._id)
                            .subscribe(function (data) {
                            if (data.success) {
                                _this.modal_msg = "Deleted degree successfully";
                                $("#myModal").modal("show");
                                _this.modal_msg_controller = true;
                                _this.modal_msg_on_success = true;
                                setTimeout(function () {
                                    _this.modal_msg = "Reload...";
                                }, 800);
                                setTimeout(function () {
                                    $("#myModal").modal("hide");
                                    location.reload();
                                }, 1000);
                            }
                            else {
                                $("#myModal").modal("show");
                                _this.modal_msg = data.msg;
                                _this.modal_msg_controller = true;
                                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 1000);
                            }
                        });
                    }, 500);
                }
                else {
                    $("#myModal").modal("show");
                    _this.modal_msg = data.msg;
                    _this.modal_msg_controller = true;
                    setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
                }
            });
        }
    };
    AcademicOverviewComponent.prototype.deleteSchool = function (school) {
        var _this = this;
        if (confirm("Are you sure you want to delete school [" + school.school_name + "]?")) {
            //delete related marks
            $("#myModal").modal("show");
            this.markService.deleteMarkBySchoolId(school._id)
                .subscribe(function (data) {
                if (data.success) {
                    _this.modal_msg = "Deleted related marks successfully";
                    $("#myModal").modal("show");
                    _this.modal_msg_controller = true;
                    _this.modal_msg_on_success = true;
                    setTimeout(function () {
                        //delete related degrees
                        $("#myModal").modal("hide");
                        $("#myModal").modal("show");
                        _this.modal_msg_controller = false;
                        _this.modal_msg_on_success = false;
                        _this.degreeService.deleteDegreeBySchoolId(school._id)
                            .subscribe(function (data) {
                            if (data.success) {
                                _this.modal_msg = "Deleted related degrees successfully";
                                $("#myModal").modal("show");
                                _this.modal_msg_controller = true;
                                _this.modal_msg_on_success = true;
                                setTimeout(function () {
                                    //delete school
                                    $("#myModal").modal("hide");
                                    $("#myModal").modal("show");
                                    _this.modal_msg_controller = false;
                                    _this.modal_msg_on_success = false;
                                    _this.schoolService.deleteSchool(school._id)
                                        .subscribe(function (data) {
                                        if (data.success) {
                                            _this.modal_msg = "Deleted school successfully";
                                            $("#myModal").modal("show");
                                            _this.modal_msg_controller = true;
                                            _this.modal_msg_on_success = true;
                                            setTimeout(function () {
                                                _this.modal_msg = "Reload...";
                                            }, 1200);
                                            setTimeout(function () {
                                                $("#myModal").modal("hide");
                                                location.reload();
                                            }, 1500);
                                        }
                                        else {
                                            $("#myModal").modal("show");
                                            _this.modal_msg = data.msg;
                                            _this.modal_msg_controller = true;
                                            setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 1500);
                                        }
                                    });
                                }, 1000);
                            }
                            else {
                                $("#myModal").modal("show");
                                _this.modal_msg = data.msg;
                                _this.modal_msg_controller = true;
                                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 1000);
                            }
                        });
                    }, 500);
                }
                else {
                    $("#myModal").modal("show");
                    _this.modal_msg = data.msg;
                    _this.modal_msg_controller = true;
                    setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
                }
            });
        }
    };
    AcademicOverviewComponent.prototype.showDetail = function (school, degree) {
        localStorage.setItem('school_on_result', JSON.stringify(school));
        localStorage.setItem('degree_on_result', JSON.stringify(degree));
        this.router.navigate(['/study-console/detail/' + degree._id]);
    };
    AcademicOverviewComponent.reload = function () {
        location.reload();
    };
    AcademicOverviewComponent.prototype.addSchoolTab = function () {
        $("#addSchool").modal("show");
    };
    AcademicOverviewComponent.prototype.addDegreeTab = function () {
        $("#addDegree").modal("show");
    };
    AcademicOverviewComponent.prototype.addMarkTab = function () {
        $("#addMark").modal("show");
    };
    AcademicOverviewComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-academic-overview',
            template: __webpack_require__(557),
            styles: [__webpack_require__(537)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_mark_service__["a" /* MarkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_mark_service__["a" /* MarkService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], AcademicOverviewComponent);
    return AcademicOverviewComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=academic-overview.component.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidateService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ValidateService = (function () {
    function ValidateService() {
    }
    //Check if user enter all of fields on Login page
    ValidateService.prototype.validateRequiredFieldOnLogin = function (user) {
        if (user.username == undefined || user.password == undefined) {
            return false;
        }
        else {
            return true;
        }
    };
    // validateRequiredFieldOnRegisterUser(user) {
    //     if (user.username == undefined || user.name == undefined
    //         || user.dob == undefined || user.email == undefined
    //         || user.password == undefined) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }
    ValidateService.prototype.validateDate = function (dateString) {
        // First check for the pattern
        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
            return false;
        // Parse the date parts to integers
        var parts = dateString.split("/");
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10);
        var year = parseInt(parts[2], 10);
        // Check the ranges of month and year
        if (year < 1000 || year > 3000 || month == 0 || month > 12)
            return false;
        var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        // Adjust for leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
            monthLength[1] = 29;
        // Check the range of the day
        return day > 0 && day <= monthLength[month - 1];
    };
    ;
    ValidateService.prototype.validateEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    ValidateService.prototype.validatePhoneNumber = function (phone) {
        var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return phoneno.test(phone);
    };
    ValidateService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], ValidateService);
    return ValidateService;
}());
//# sourceMappingURL=validate.service.js.map

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__ = __webpack_require__(312);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = (function () {
    function UserService(http, router) {
        this.http = http;
        this.router = router;
        this.url = "http://localhost:8080/users/";
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["JwtHelper"]();
    }
    //get users
    UserService.prototype.getUsers = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.url + 'users', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //add a new user
    UserService.prototype.registerUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + 'register', JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //validate password and username when login
    UserService.prototype.authenticateAndLogin = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + 'authenticate', JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //update profile
    UserService.prototype.updateProfile = function (user, id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + 'updateProfile/' + id, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //update password
    UserService.prototype.updatePassword = function (user, id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + 'updatePassword/' + id, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //======= ADMIN ============================================================================================================
    //==========================================================================================================================
    //update password by ADMIN
    UserService.prototype.updatePasswordByAdmin = function (user, id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + 'updatePassword-by-admin/' + id, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //update profile by ADMIN
    UserService.prototype.updateProfileByAdmin = function (user, id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + 'updateProfile-by-admin/' + id, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //enable Or Disable User
    UserService.prototype.enableOrDisableUser = function (data, id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + 'enable-or-disable-user/' + id, JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //delete user by user_id
    UserService.prototype.deleteUser = function (user_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.delete(this.url + 'deleteUser/' + user_id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //validate if user is admin
    UserService.prototype.validateAdmin = function (user_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + 'validateAdmin/', { id: user_id }, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //update permission
    UserService.prototype.updatePermission = function (user, id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + 'updatePermission/' + id, JSON.stringify(user), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //send email
    UserService.prototype.sendEmail = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + 'sendEmail/', JSON.stringify(data), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //======= ADMIN END ========================================================================================================
    //==========================================================================================================================
    UserService.prototype.storeUserData = function (token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        // this.authToken = token;
        // this.user = user;
    };
    UserService.prototype.logout = function () {
        localStorage.clear();
    };
    UserService.prototype.loggedIn = function () {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_angular2_jwt__["tokenNotExpired"])();
    };
    UserService.prototype.getToken = function () {
        return localStorage.getItem('id_token');
    };
    UserService.prototype.isAdmin = function () {
        var token = localStorage.getItem('id_token');
        return (this.jwtHelper.decodeToken(token)._doc.type == 'admin');
    };
    UserService.prototype.isHomePage = function () {
        return (this.router.url == '/');
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], UserService);
    return UserService;
    var _a, _b;
}());
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 310:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminUserMgmtProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminUserMgmtProfileComponent = (function () {
    function AdminUserMgmtProfileComponent(validateService, userService, router) {
        var _this = this;
        this.validateService = validateService;
        this.userService = userService;
        this.router = router;
        this._id = new String;
        this._username = new String;
        this._name = new String;
        this._dob = new String;
        this._email = new String;
        this._phone = new String;
        this._type = new Boolean;
        this.edit_profile = false;
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        //variables for modal - end
        //variables for update password
        this._password = new String();
        this._newPassword = new String();
        this._confirmNewPassword = new String();
        this.isPasswordMatch = true;
        this.userService.validateAdmin(JSON.parse(localStorage.getItem('user')).id)
            .subscribe(function (data) {
            if (!data.success) {
                localStorage.clear();
                _this.router.navigate(['/login']);
            }
        });
        var data = JSON.parse(localStorage.getItem('update_user'));
        this._id = data._id;
        this._username = data.username;
        this._name = data.name;
        this._dob = data.dob;
        this._email = data.email;
        this._phone = data.phone;
        this._type = data.type;
    }
    AdminUserMgmtProfileComponent.prototype.ngOnInit = function () {
        //initialize tooltip component
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    };
    AdminUserMgmtProfileComponent.prototype.editProfile = function () {
        this.edit_profile = true;
    };
    AdminUserMgmtProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        var data = {
            username: this._username,
            name: this._name,
            dob: this._dob,
            email: this._email,
            phone: this._phone
        };
        if (!this.validateService.validateDate(data.dob)) {
            alert('Please use a valid Date of Birth');
            return false;
        }
        if (!this.validateService.validateEmail(data.email)) {
            alert('Please use a valid Email');
            return false;
        }
        if (!this.validateService.validatePhoneNumber(data.phone)) {
            alert('Please use a valid Phone Number');
            return false;
        }
        //Update profile
        $("#myModal-aump").modal("show");
        this.userService.updateProfileByAdmin(data, this._id)
            .subscribe(function (data) {
            if (data.success) {
                $("#myModal-aump").modal("show");
                _this.modal_msg = "Updated successfully";
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                _this.updateLocalStorage();
                _this.edit_profile = false;
                setTimeout(function () {
                    $("#myModal-aump").modal("hide");
                }, 1000);
            }
            else {
                $("#myModal-aump").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal-aump").modal("hide"); _this.modal_msg_controller = false; }, 1000);
            }
        });
    };
    AdminUserMgmtProfileComponent.prototype.updatePassword = function () {
        var _this = this;
        this.isPasswordMatch = (this._newPassword == this._confirmNewPassword);
        if (!this.isPasswordMatch) {
            return false;
        }
        var data = {
            username: this._username,
            new_password: this._newPassword
        };
        //Update password
        $("#myModal-aump").modal("show");
        this.userService.updatePasswordByAdmin(data, this._id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal-aump").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                _this.updateLocalStorage();
                _this.edit_profile = false;
                setTimeout(function () {
                    $("#myModal-aump").modal("hide");
                    location.reload();
                }, 500);
            }
            else {
                $("#myModal-aump").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal-aump").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    //update local storage after updated
    AdminUserMgmtProfileComponent.prototype.updateLocalStorage = function () {
        var data = JSON.parse(localStorage.getItem('update_user'));
        data.name = this._name;
        data.dob = this._dob;
        data.email = this._email;
        data.phone = this._phone;
        localStorage.setItem('update_user', JSON.stringify(data));
    };
    //back to ADMIN users management page
    AdminUserMgmtProfileComponent.prototype.back = function () {
        this.router.navigate(['/admin/user-mgmt']);
        localStorage.removeItem('update_user');
    };
    AdminUserMgmtProfileComponent.prototype.disableEdit = function () {
        this.edit_profile = false;
        if (this.getSwitchValue()) {
            AdminUserMgmtProfileComponent.switch_to_detail_value();
        }
    };
    AdminUserMgmtProfileComponent.switch_to_detail_value = function () {
        this.switch_to_detail = !this.switch_to_detail;
    };
    AdminUserMgmtProfileComponent.prototype.getSwitchValue = function () {
        return AdminUserMgmtProfileComponent.switch_to_detail;
    };
    AdminUserMgmtProfileComponent.switch_to_detail = false;
    AdminUserMgmtProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin-user-mgmt-profile',
            template: __webpack_require__(561),
            styles: [__webpack_require__(541)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], AdminUserMgmtProfileComponent);
    return AdminUserMgmtProfileComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=admin-user-mgmt-profile.component.js.map

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminUserMgmtComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminUserMgmtComponent = (function () {
    function AdminUserMgmtComponent(userService, router) {
        var _this = this;
        this.userService = userService;
        this.router = router;
        this._username = new String();
        this.users = new Array();
        //variables for loading spinner controller
        this.isLoading = true;
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        //variables for modal - end
        this.search_query = '';
        //clear update_user in local storage 
        localStorage.removeItem('update_user');
        var data = JSON.parse(localStorage.getItem('user'));
        this._username = data.username;
        this.userService.validateAdmin(data.id)
            .subscribe(function (data) {
            if (!data.success) {
                localStorage.clear();
                _this.router.navigate(['/login']);
            }
        });
    }
    AdminUserMgmtComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (data) {
            _this.users = data.users;
            _this.isLoading = false;
        });
    };
    AdminUserMgmtComponent.prototype.enableOrDisableUser = function (_username) {
        var _this = this;
        var index = this.users.findIndex(function (user) { return user.username == _username; });
        var updatedData = {
            isDisable: !this.users[index].isDisable
        };
        this.userService.enableOrDisableUser(updatedData, this.users[index]._id)
            .subscribe(function (data) {
            if (data.success) {
                $("#myModal").modal("show");
                _this.modal_msg = "Successfully";
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                setTimeout(function () {
                    $("#myModal").modal("hide");
                    _this.modal_msg_controller = false;
                    var temp = _this.users[index];
                    temp.isDisable = !temp.isDisable;
                    _this.users[index] = temp;
                }, 700);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 1000);
            }
        });
    };
    AdminUserMgmtComponent.prototype.updateUser = function (user) {
        localStorage.setItem('update_user', JSON.stringify(user));
        this.router.navigate(['/admin/user-mgmt', user._id]);
    };
    AdminUserMgmtComponent.prototype.deleteUser = function (user) {
        var _this = this;
        if (confirm("Are you sure you want to delete user [" + user.username + "]?")) {
            $("#myModal").modal("show");
            this.userService.deleteUser(user._id)
                .subscribe(function (data) {
                if (data.success) {
                    _this.modal_msg = "Deleted successfully";
                    $("#myModal").modal("show");
                    _this.modal_msg_controller = true;
                    _this.modal_msg_on_success = true;
                    //update the user array
                    var index = _this.users.findIndex(function (temp) { return temp._id == user._id; });
                    _this.users.splice(index, 1);
                    setTimeout(function () {
                        $("#myModal").modal("hide");
                    }, 500);
                }
                else {
                    $("#myModal").modal("show");
                    _this.modal_msg = data.msg;
                    _this.modal_msg_controller = true;
                    setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
                }
            });
        }
    };
    AdminUserMgmtComponent.prototype.createUserTab = function () {
        $("#createUser").modal("show");
    };
    AdminUserMgmtComponent.reload = function () {
        location.reload();
    };
    AdminUserMgmtComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin-user-mgmt',
            template: __webpack_require__(562),
            styles: [__webpack_require__(542)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AdminUserMgmtComponent);
    return AdminUserMgmtComponent;
    var _a, _b;
}());
//# sourceMappingURL=admin-user-mgmt.component.js.map

/***/ }),

/***/ 341:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 341;


/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(481);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 43:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DegreeService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DegreeService = (function () {
    function DegreeService(http) {
        this.http = http;
        this.url = "http://localhost:8080/degree/";
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
    }
    DegreeService.prototype.getDegrees = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.url + 'degrees', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //get degrees by username or without username
    DegreeService.prototype.getDegreesByUsername = function (username) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.url + 'degrees?username=' + username, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //add a new degree
    DegreeService.prototype.addDegree = function (degree) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + 'add', JSON.stringify(degree), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //update degree
    DegreeService.prototype.updateDegree = function (degree, degree_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + 'updateDegree/' + degree_id, JSON.stringify(degree), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //delete degree by degree_id
    DegreeService.prototype.deleteDegree = function (degree_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.delete(this.url + 'deleteDegree/' + degree_id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //delete degree by school_id
    DegreeService.prototype.deleteDegreeBySchoolId = function (school_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.delete(this.url + 'deleteDegree?school_id=' + school_id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    DegreeService.prototype.getToken = function () {
        return localStorage.getItem('id_token');
    };
    DegreeService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], DegreeService);
    return DegreeService;
    var _a;
}());
//# sourceMappingURL=degree.service.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SchoolService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SchoolService = (function () {
    function SchoolService(http) {
        this.http = http;
        this.url = "http://localhost:8080/school/";
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
    }
    //get schools by username or without username
    SchoolService.prototype.getSchoolsByUsername = function (username) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.url + 'schools?username=' + username, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //  //get schools by school id
    //   getSchoolBySchoolId(school_id) {
    //     let headers = new Headers();
    //     headers.append('Content-Type', 'application/json');
    //     return this.http.get(this.url + 'school?_id=' + school_id, { headers: headers })
    //       .map(res => res.json());
    //   }
    SchoolService.prototype.getSchools = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.url + 'schools', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //add a new school
    SchoolService.prototype.addSchool = function (school) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + 'add', JSON.stringify(school), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //update school
    SchoolService.prototype.updateSchool = function (school, school_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + 'updateSchool/' + school_id, JSON.stringify(school), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //delete school by school_id
    SchoolService.prototype.deleteSchool = function (school_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.delete(this.url + 'deleteSchool/' + school_id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    SchoolService.prototype.getToken = function () {
        return localStorage.getItem('id_token');
    };
    SchoolService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], SchoolService);
    return SchoolService;
    var _a;
}());
//# sourceMappingURL=school.service.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(555),
            styles: [__webpack_require__(535)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 460:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_home_home_component__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_dashboard_dashboard_component__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_navbar_navbar_component__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_contact_contact_component__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_admin_user_mgmt_admin_user_mgmt_component__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_admin_user_mgmt_profile_admin_user_mgmt_profile_component__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_user_school_user_school_component__ = __webpack_require__(475);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_user_degree_user_degree_component__ = __webpack_require__(473);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_user_mark_user_mark_component__ = __webpack_require__(474);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_academic_overview_academic_overview_component__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_academic_detail_academic_detail_component__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_validate_service__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_user_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_school_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_degree_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_mark_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_auth_guard_service__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pipes_enabled_users_pipe__ = __webpack_require__(477);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pipes_group_degree_by_school_pipe__ = __webpack_require__(478);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pipes_order_by_pipe__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pipes_disabled_users_pipe__ = __webpack_require__(476);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_study_console_study_console_component__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_admin_user_mgmt_academic_admin_user_mgmt_academic_component__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_admin_user_mgmt_academic_detail_admin_user_mgmt_academic_detail_component__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_admin_user_mgmt_permission_admin_user_mgmt_permission_component__ = __webpack_require__(464);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


































var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_6__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__services_auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_9__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__services_auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__["a" /* ProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__services_auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'contact', component: __WEBPACK_IMPORTED_MODULE_12__components_contact_contact_component__["a" /* ContactComponent */] },
    { path: 'admin/user-mgmt', component: __WEBPACK_IMPORTED_MODULE_13__components_admin_user_mgmt_admin_user_mgmt_component__["a" /* AdminUserMgmtComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__services_auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'admin/user-mgmt/:id', component: __WEBPACK_IMPORTED_MODULE_14__components_admin_user_mgmt_profile_admin_user_mgmt_profile_component__["a" /* AdminUserMgmtProfileComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__services_auth_guard_service__["a" /* AuthGuard */]] },
    // { path: 'user/add-school', component: UserSchoolComponent, canActivate: [AuthGuard]},
    // { path: 'user/add-degree', component: UserDegreeComponent, canActivate: [AuthGuard]},
    // { path: 'user/add-mark', component: UserMarkComponent, canActivate: [AuthGuard]},
    { path: 'study-console', component: __WEBPACK_IMPORTED_MODULE_18__components_academic_overview_academic_overview_component__["a" /* AcademicOverviewComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__services_auth_guard_service__["a" /* AuthGuard */]] },
    { path: 'study-console/detail/:degre_id', component: __WEBPACK_IMPORTED_MODULE_19__components_academic_detail_academic_detail_component__["a" /* AcademicDetailComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_25__services_auth_guard_service__["a" /* AuthGuard */]] }
];
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__components_home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_navbar_navbar_component__["a" /* NavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_contact_contact_component__["a" /* ContactComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_admin_user_mgmt_admin_user_mgmt_component__["a" /* AdminUserMgmtComponent */],
                __WEBPACK_IMPORTED_MODULE_29__pipes_disabled_users_pipe__["a" /* DisabledUsersPipe */],
                __WEBPACK_IMPORTED_MODULE_26__pipes_enabled_users_pipe__["a" /* EnabledUsersPipe */],
                __WEBPACK_IMPORTED_MODULE_14__components_admin_user_mgmt_profile_admin_user_mgmt_profile_component__["a" /* AdminUserMgmtProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_15__components_user_school_user_school_component__["a" /* UserSchoolComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_user_degree_user_degree_component__["a" /* UserDegreeComponent */],
                __WEBPACK_IMPORTED_MODULE_17__components_user_mark_user_mark_component__["a" /* UserMarkComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_academic_overview_academic_overview_component__["a" /* AcademicOverviewComponent */],
                __WEBPACK_IMPORTED_MODULE_27__pipes_group_degree_by_school_pipe__["a" /* GroupDegreeBySchoolPipe */],
                __WEBPACK_IMPORTED_MODULE_19__components_academic_detail_academic_detail_component__["a" /* AcademicDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_28__pipes_order_by_pipe__["a" /* OrderByPipe */],
                __WEBPACK_IMPORTED_MODULE_30__components_study_console_study_console_component__["a" /* StudyConsoleComponent */],
                __WEBPACK_IMPORTED_MODULE_31__components_admin_user_mgmt_academic_admin_user_mgmt_academic_component__["a" /* AdminUserMgmtAcademicComponent */],
                __WEBPACK_IMPORTED_MODULE_32__components_admin_user_mgmt_academic_detail_admin_user_mgmt_academic_detail_component__["a" /* AdminUserMgmtAcademicDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_33__components_admin_user_mgmt_permission_admin_user_mgmt_permission_component__["a" /* AdminUserMgmtPermissionComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(appRoutes)
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_20__services_validate_service__["a" /* ValidateService */], __WEBPACK_IMPORTED_MODULE_21__services_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_22__services_school_service__["a" /* SchoolService */],
                __WEBPACK_IMPORTED_MODULE_23__services_degree_service__["a" /* DegreeService */], __WEBPACK_IMPORTED_MODULE_24__services_mark_service__["a" /* MarkService */], __WEBPACK_IMPORTED_MODULE_25__services_auth_guard_service__["a" /* AuthGuard */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 461:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_school_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_degree_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_mark_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AcademicDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AcademicDetailComponent = (function () {
    function AcademicDetailComponent(schoolService, degreeService, markService, router) {
        this.schoolService = schoolService;
        this.degreeService = degreeService;
        this.markService = markService;
        this.router = router;
        //variables for update-school - start
        this._school_name = new String;
        this._city = new String;
        this._state = new String;
        this._country = new String;
        //variables for update-school - end
        //variables for update-degree - start
        this._degree_name = new String;
        this._school_id_degree = new String;
        //variables for update-mark - end
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        //variables for modal - end
        this.isLoading_mark = true;
        this.isMarkEmpty = true;
        this.school = JSON.parse(localStorage.getItem('school_on_result'));
        this.degree = JSON.parse(localStorage.getItem('degree_on_result'));
    }
    AcademicDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get mark
        this.markService.getMarksByDegreeId(this.degree._id)
            .subscribe(function (data) {
            _this.marks = data.marks;
            _this.isLoading_mark = false;
            if (_this.marks.length != 0) {
                _this.isMarkEmpty = false;
            }
        });
    };
    AcademicDetailComponent.prototype.updateSchool = function () {
        this._school_name = this.school.school_name;
        this._city = this.school.city;
        this._state = this.school.state;
        this._country = this.school.country;
        $("#update-school-modal").modal("show");
    };
    AcademicDetailComponent.prototype.updateSchoolSubmit = function () {
        var _this = this;
        var data = {
            school_name: this._school_name,
            city: this._city,
            state: this._state,
            country: this._country
        };
        $("#update-school-modal").modal("hide");
        $("#myModal").modal("show");
        this.schoolService.updateSchool(data, this.school._id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the school object
                _this.school.school_name = _this._school_name;
                _this.school.city = _this._city;
                _this.school.state = _this._state;
                _this.school.country = _this._country;
                _this.updateLocalStorage();
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AcademicDetailComponent.prototype.updateDegree = function () {
        this._degree_name = this.degree.degree_name;
        this._duration = this.degree.duration;
        this._school_id_degree = this.degree.school_id;
        $("#update-degree-modal").modal("show");
    };
    AcademicDetailComponent.prototype.updateDegreeSubmit = function () {
        var _this = this;
        var data = {
            degree_name: this._degree_name,
            duration: this._duration,
            school_name: this.degree.school_name,
            school_id: this.degree.school_id
        };
        $("#update-degree-modal").modal("hide");
        $("#myModal").modal("show");
        this.degreeService.updateDegree(data, this.degree._id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the degree object
                _this.degree.degree_name = _this._degree_name;
                _this.degree.duration = _this._duration;
                _this.updateLocalStorage();
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AcademicDetailComponent.prototype.updateMark = function (mark) {
        this._mark_id = mark._id;
        this._subject_name = mark.subject_name;
        this._subject_code = mark.subject_code;
        this._semester = mark.semester;
        this._year_level = mark.year_level;
        this._mark = mark.mark;
        $("#update-mark-modal").modal("show");
    };
    AcademicDetailComponent.prototype.updateMarkSubmit = function () {
        var _this = this;
        var data = {
            subject_name: this._subject_name,
            subject_code: this._subject_code,
            semester: this._semester,
            year_level: this._year_level,
            mark: this._mark
        };
        $("#update-mark-modal").modal("hide");
        $("#myModal").modal("show");
        this.markService.updateMark(data, this._mark_id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the mark array
                var index = _this.marks.findIndex(function (mark) { return mark._id == _this._mark_id; });
                var temp = _this.marks[index];
                temp.subject_name = _this._subject_name;
                temp.subject_code = _this._subject_code;
                temp.semester = _this._semester;
                temp.year_level = _this._year_level;
                temp.mark = _this._mark;
                _this.marks[index] = temp;
                //ends
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AcademicDetailComponent.prototype.deleteMark = function (mark) {
        var _this = this;
        if (confirm("Are you sure you want to delete mark [" + mark.subject_code + "]?")) {
            $("#myModal").modal("show");
            this.markService.deleteMark(mark._id)
                .subscribe(function (data) {
                if (data.success) {
                    _this.modal_msg = data.msg;
                    $("#myModal").modal("show");
                    _this.modal_msg_controller = true;
                    _this.modal_msg_on_success = true;
                    setTimeout(function () {
                        $("#myModal").modal("hide");
                        var index = _this.marks.findIndex(function (temp) { return temp._id == mark._id; });
                        _this.marks.splice(index, 1);
                    }, 500);
                }
                else {
                    $("#myModal").modal("show");
                    _this.modal_msg = data.msg;
                    _this.modal_msg_controller = true;
                    setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
                }
            });
        }
    };
    AcademicDetailComponent.prototype.updateLocalStorage = function () {
        localStorage.removeItem('school_on_result');
        localStorage.removeItem('degree_on_result');
        localStorage.setItem('school_on_result', JSON.stringify(this.school));
        localStorage.setItem('degree_on_result', JSON.stringify(this.degree));
    };
    AcademicDetailComponent.prototype.addMarkTab = function () {
        $("#addMark").modal("show");
    };
    AcademicDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-academic-detail',
            template: __webpack_require__(556),
            styles: [__webpack_require__(536)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_mark_service__["a" /* MarkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_mark_service__["a" /* MarkService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], AcademicDetailComponent);
    return AcademicDetailComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=academic-detail.component.js.map

/***/ }),

/***/ 462:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_school_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_degree_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_mark_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminUserMgmtAcademicDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AdminUserMgmtAcademicDetailComponent = (function () {
    function AdminUserMgmtAcademicDetailComponent(schoolService, degreeService, markService, router) {
        this.schoolService = schoolService;
        this.degreeService = degreeService;
        this.markService = markService;
        this.router = router;
        //variables for update-school - start
        this._school_name = new String;
        this._city = new String;
        this._state = new String;
        this._country = new String;
        //variables for update-school - end
        //variables for update-degree - start
        this._degree_name = new String;
        this._school_id_degree = new String;
        //variables for update-mark - end
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        //variables for modal - end
        this.isLoading_mark = true;
        this.isMarkEmpty = true;
        this.school = JSON.parse(localStorage.getItem('update_user_school'));
        this.degree = JSON.parse(localStorage.getItem('update_user_degree'));
    }
    AdminUserMgmtAcademicDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get mark
        this.markService.getMarksByDegreeId(this.degree._id)
            .subscribe(function (data) {
            _this.marks = data.marks;
            _this.isLoading_mark = false;
            if (_this.marks.length != 0) {
                _this.isMarkEmpty = false;
            }
        });
    };
    AdminUserMgmtAcademicDetailComponent.prototype.updateSchool = function () {
        this._school_name = this.school.school_name;
        this._city = this.school.city;
        this._state = this.school.state;
        this._country = this.school.country;
        $("#update-school-modal").modal("show");
    };
    AdminUserMgmtAcademicDetailComponent.prototype.updateSchoolSubmit = function () {
        var _this = this;
        var data = {
            school_name: this._school_name,
            city: this._city,
            state: this._state,
            country: this._country
        };
        $("#update-school-modal").modal("hide");
        $("#myModal").modal("show");
        this.schoolService.updateSchool(data, this.school._id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the school object
                _this.school.school_name = _this._school_name;
                _this.school.city = _this._city;
                _this.school.state = _this._state;
                _this.school.country = _this._country;
                _this.updateLocalStorage();
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AdminUserMgmtAcademicDetailComponent.prototype.updateDegree = function () {
        this._degree_name = this.degree.degree_name;
        this._duration = this.degree.duration;
        this._school_id_degree = this.degree.school_id;
        $("#update-degree-modal").modal("show");
    };
    AdminUserMgmtAcademicDetailComponent.prototype.updateDegreeSubmit = function () {
        var _this = this;
        var data = {
            degree_name: this._degree_name,
            duration: this._duration,
            school_name: this.degree.school_name,
            school_id: this.degree.school_id
        };
        $("#update-degree-modal").modal("hide");
        $("#myModal").modal("show");
        this.degreeService.updateDegree(data, this.degree._id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the degree object
                _this.degree.degree_name = _this._degree_name;
                _this.degree.duration = _this._duration;
                _this.updateLocalStorage();
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AdminUserMgmtAcademicDetailComponent.prototype.updateMark = function (mark) {
        this._mark_id = mark._id;
        this._subject_name = mark.subject_name;
        this._subject_code = mark.subject_code;
        this._semester = mark.semester;
        this._year_level = mark.year_level;
        this._mark = mark.mark;
        $("#update-mark-modal").modal("show");
    };
    AdminUserMgmtAcademicDetailComponent.prototype.updateMarkSubmit = function () {
        var _this = this;
        var data = {
            subject_name: this._subject_name,
            subject_code: this._subject_code,
            semester: this._semester,
            year_level: this._year_level,
            mark: this._mark
        };
        $("#update-mark-modal").modal("hide");
        $("#myModal").modal("show");
        this.markService.updateMark(data, this._mark_id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the mark array
                var index = _this.marks.findIndex(function (mark) { return mark._id == _this._mark_id; });
                var temp = _this.marks[index];
                temp.subject_name = _this._subject_name;
                temp.subject_code = _this._subject_code;
                temp.semester = _this._semester;
                temp.year_level = _this._year_level;
                temp.mark = _this._mark;
                _this.marks[index] = temp;
                //ends
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AdminUserMgmtAcademicDetailComponent.prototype.deleteMark = function (mark) {
        var _this = this;
        if (confirm("Are you sure you want to delete mark [" + mark.subject_code + "]?")) {
            $("#myModal").modal("show");
            this.markService.deleteMark(mark._id)
                .subscribe(function (data) {
                if (data.success) {
                    _this.modal_msg = data.msg;
                    $("#myModal").modal("show");
                    _this.modal_msg_controller = true;
                    _this.modal_msg_on_success = true;
                    setTimeout(function () {
                        $("#myModal").modal("hide");
                        var index = _this.marks.findIndex(function (temp) { return temp._id == mark._id; });
                        _this.marks.splice(index, 1);
                    }, 500);
                }
                else {
                    $("#myModal").modal("show");
                    _this.modal_msg = data.msg;
                    _this.modal_msg_controller = true;
                    setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
                }
            });
        }
    };
    AdminUserMgmtAcademicDetailComponent.prototype.updateLocalStorage = function () {
        localStorage.removeItem('school_on_result');
        localStorage.removeItem('degree_on_result');
        localStorage.setItem('school_on_result', JSON.stringify(this.school));
        localStorage.setItem('degree_on_result', JSON.stringify(this.degree));
    };
    AdminUserMgmtAcademicDetailComponent.prototype.addMarkTab = function () {
        $("#addMark").modal("show");
    };
    AdminUserMgmtAcademicDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin-user-mgmt-academic-detail',
            template: __webpack_require__(558),
            styles: [__webpack_require__(538)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_mark_service__["a" /* MarkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_mark_service__["a" /* MarkService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], AdminUserMgmtAcademicDetailComponent);
    return AdminUserMgmtAcademicDetailComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=admin-user-mgmt-academic-detail.component.js.map

/***/ }),

/***/ 463:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_school_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_degree_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_mark_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__admin_user_mgmt_profile_admin_user_mgmt_profile_component__ = __webpack_require__(310);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminUserMgmtAcademicComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AdminUserMgmtAcademicComponent = (function () {
    function AdminUserMgmtAcademicComponent(schoolService, degreeService, markService, router) {
        this.schoolService = schoolService;
        this.degreeService = degreeService;
        this.markService = markService;
        this.router = router;
        this.schools = new Array();
        this.degrees = new Array();
        //variables for loading spinner controller
        this.isLoading_school = true;
        this.isLoading_degree = true;
        //variables for update-school - start
        this._school_id = new String;
        this._school_name = new String;
        this._city = new String;
        this._state = new String;
        this._country = new String;
        //variables for update-school - end
        //variables for update-degree - start
        this._degree_id = new String;
        this._degree_name = new String;
        this._school_id_degree = new String;
        //variables for update-degree - end
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        //variables for modal - end
        this.isSchoolEmpty = false;
        this.isDegreeEmpty = false;
        this.disable_degree_button = true;
        this.disable_mark_button = true;
        localStorage.removeItem('school_on_result');
        localStorage.removeItem('degree_on_result');
        localStorage.removeItem('update_user_school');
        localStorage.removeItem('update_user_degree');
    }
    AdminUserMgmtAcademicComponent.prototype.ngOnInit = function () {
        var _this = this;
        //get schools
        this.schoolService.getSchoolsByUsername(JSON.parse(localStorage.getItem('update_user')).username)
            .subscribe(function (data) {
            _this.schools = data.schools;
            _this.isLoading_degree = false;
            if (_this.schools.length == 0) {
                _this.isSchoolEmpty = true;
            }
            else {
                _this.disable_degree_button = false;
            }
        });
        //get degrees
        this.degreeService.getDegreesByUsername(JSON.parse(localStorage.getItem('update_user')).username)
            .subscribe(function (data) {
            _this.degrees = data.degrees;
            _this.isLoading_school = false;
            if (_this.degrees.length == 0) {
                _this.isDegreeEmpty = true;
            }
            else {
                _this.disable_mark_button = false;
            }
        });
    };
    AdminUserMgmtAcademicComponent.prototype.updateSchool = function (school) {
        this._school_id = school._id;
        this._school_name = school.school_name;
        this._city = school.city;
        this._state = school.state;
        this._country = school.country;
        $("#update-school-modal").modal("show");
    };
    AdminUserMgmtAcademicComponent.prototype.updateSchoolSubmit = function () {
        var _this = this;
        var data = {
            school_name: this._school_name,
            city: this._city,
            state: this._state,
            country: this._country
        };
        $("#update-school-modal").modal("hide");
        $("#myModal").modal("show");
        this.schoolService.updateSchool(data, this._school_id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the school array
                var index = _this.schools.findIndex(function (school) { return school._id == _this._school_id; });
                var temp = _this.schools[index];
                temp.school_name = _this._school_name;
                temp.city = _this._city;
                temp.state = _this._state;
                temp.country = _this._country;
                _this.schools[index] = temp;
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AdminUserMgmtAcademicComponent.prototype.updateDegree = function (degree) {
        this._degree_id = degree._id;
        this._degree_name = degree.degree_name;
        this._duration = degree.duration;
        this._school_id_degree = degree.school_id;
        $("#update-degree-modal").modal("show");
    };
    AdminUserMgmtAcademicComponent.prototype.updateDegreeSubmit = function () {
        var _this = this;
        var school_name = this.schools.find(function (school) { return school._id == _this._school_id_degree; }).school_name;
        var data = {
            degree_name: this._degree_name,
            duration: this._duration,
            school_name: school_name,
            school_id: this._school_id_degree
        };
        $("#update-degree-modal").modal("hide");
        $("#myModal").modal("show");
        this.degreeService.updateDegree(data, this._degree_id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                //update the degree array
                var index = _this.degrees.findIndex(function (degree) { return degree._id == _this._degree_id; });
                var temp = _this.degrees[index];
                temp.degree_name = _this._degree_name;
                temp.duration = _this._duration;
                temp.school_name = school_name;
                temp.school_id = _this._school_id_degree;
                _this.degrees[index] = temp;
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
    };
    AdminUserMgmtAcademicComponent.prototype.deleteDegree = function (degree) {
        var _this = this;
        if (confirm("Are you sure you want to delete degree [" + degree.degree_name + "]?")) {
            $("#myModal").modal("show");
            this.markService.deleteMarkByDegreeId(degree._id)
                .subscribe(function (data) {
                if (data.success) {
                    _this.modal_msg = "Deleted related marks successfully";
                    $("#myModal").modal("show");
                    _this.modal_msg_controller = true;
                    _this.modal_msg_on_success = true;
                    setTimeout(function () {
                        $("#myModal").modal("hide");
                        $("#myModal").modal("show");
                        _this.modal_msg_controller = false;
                        _this.modal_msg_on_success = false;
                        _this.degreeService.deleteDegree(degree._id)
                            .subscribe(function (data) {
                            if (data.success) {
                                _this.modal_msg = "Deleted degree successfully";
                                $("#myModal").modal("show");
                                _this.modal_msg_controller = true;
                                _this.modal_msg_on_success = true;
                                setTimeout(function () {
                                    $("#myModal").modal("hide");
                                    location.reload();
                                }, 1000);
                            }
                            else {
                                $("#myModal").modal("show");
                                _this.modal_msg = data.msg;
                                _this.modal_msg_controller = true;
                                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 1000);
                            }
                        });
                    }, 500);
                }
                else {
                    $("#myModal").modal("show");
                    _this.modal_msg = data.msg;
                    _this.modal_msg_controller = true;
                    setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
                }
            });
        }
    };
    AdminUserMgmtAcademicComponent.prototype.deleteSchool = function (school) {
        var _this = this;
        if (confirm("Are you sure you want to delete school [" + school.school_name + "]?")) {
            //delete related marks
            $("#myModal").modal("show");
            this.markService.deleteMarkBySchoolId(school._id)
                .subscribe(function (data) {
                if (data.success) {
                    _this.modal_msg = "Deleted related marks successfully";
                    $("#myModal").modal("show");
                    _this.modal_msg_controller = true;
                    _this.modal_msg_on_success = true;
                    setTimeout(function () {
                        //delete related degrees
                        $("#myModal").modal("hide");
                        $("#myModal").modal("show");
                        _this.modal_msg_controller = false;
                        _this.modal_msg_on_success = false;
                        _this.degreeService.deleteDegreeBySchoolId(school._id)
                            .subscribe(function (data) {
                            if (data.success) {
                                _this.modal_msg = "Deleted related degrees successfully";
                                $("#myModal").modal("show");
                                _this.modal_msg_controller = true;
                                _this.modal_msg_on_success = true;
                                setTimeout(function () {
                                    //delete school
                                    $("#myModal").modal("hide");
                                    $("#myModal").modal("show");
                                    _this.modal_msg_controller = false;
                                    _this.modal_msg_on_success = false;
                                    _this.schoolService.deleteSchool(school._id)
                                        .subscribe(function (data) {
                                        if (data.success) {
                                            _this.modal_msg = "Deleted school successfully";
                                            $("#myModal").modal("show");
                                            _this.modal_msg_controller = true;
                                            _this.modal_msg_on_success = true;
                                            setTimeout(function () {
                                                $("#myModal").modal("hide");
                                                location.reload();
                                            }, 1500);
                                        }
                                        else {
                                            $("#myModal").modal("show");
                                            _this.modal_msg = data.msg;
                                            _this.modal_msg_controller = true;
                                            setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 1500);
                                        }
                                    });
                                }, 1000);
                            }
                            else {
                                $("#myModal").modal("show");
                                _this.modal_msg = data.msg;
                                _this.modal_msg_controller = true;
                                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 1000);
                            }
                        });
                    }, 500);
                }
                else {
                    $("#myModal").modal("show");
                    _this.modal_msg = data.msg;
                    _this.modal_msg_controller = true;
                    setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
                }
            });
        }
    };
    AdminUserMgmtAcademicComponent.prototype.showDetail = function (school, degree) {
        localStorage.setItem('update_user_school', JSON.stringify(school));
        localStorage.setItem('update_user_degree', JSON.stringify(degree));
        __WEBPACK_IMPORTED_MODULE_5__admin_user_mgmt_profile_admin_user_mgmt_profile_component__["a" /* AdminUserMgmtProfileComponent */].switch_to_detail_value();
    };
    AdminUserMgmtAcademicComponent.reload = function () {
        location.reload();
    };
    AdminUserMgmtAcademicComponent.prototype.addSchoolTab = function () {
        $("#addSchool").modal("show");
    };
    AdminUserMgmtAcademicComponent.prototype.addDegreeTab = function () {
        $("#addDegree").modal("show");
    };
    AdminUserMgmtAcademicComponent.prototype.addMarkTab = function () {
        $("#addMark").modal("show");
    };
    AdminUserMgmtAcademicComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin-user-mgmt-academic',
            template: __webpack_require__(559),
            styles: [__webpack_require__(539)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_mark_service__["a" /* MarkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_mark_service__["a" /* MarkService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === 'function' && _d) || Object])
    ], AdminUserMgmtAcademicComponent);
    return AdminUserMgmtAcademicComponent;
    var _a, _b, _c, _d;
}());
//# sourceMappingURL=admin-user-mgmt-academic.component.js.map

/***/ }),

/***/ 464:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminUserMgmtPermissionComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AdminUserMgmtPermissionComponent = (function () {
    //variables for modal - end
    function AdminUserMgmtPermissionComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this._id = new String;
        this._username = new String;
        this._type = new Boolean;
        this._canUpdateProfile = new Boolean;
        this._canUpdatePassword = new Boolean;
        this._canStudie = new Boolean;
        this.active = true;
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        var data = JSON.parse(localStorage.getItem('update_user'));
        this._id = data._id;
        this._username = data.username;
        this._type = data.type;
        this._canUpdateProfile = data.canUpdateProfile;
        this._canUpdatePassword = data.canUpdatePassword;
        this._canStudie = data.canStudie;
    }
    AdminUserMgmtPermissionComponent.prototype.ngOnInit = function () {
    };
    AdminUserMgmtPermissionComponent.prototype.updatePermissionSubmit = function () {
        var _this = this;
        var data = {
            type: this._type,
            canUpdateProfile: this._canUpdateProfile,
            canUpdatePassword: this._canUpdatePassword,
            canStudie: this._canStudie
        };
        //Update profile
        $("#myModal1").modal("show");
        this.userService.updatePermission(data, this._id)
            .subscribe(function (data) {
            if (data.success) {
                $("#myModal1").modal("show");
                _this.modal_msg = "Updated successfully";
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                _this.updateLocalStorage();
                setTimeout(function () {
                    $("#myModal1").modal("hide");
                    _this.active = false;
                    setTimeout(function () {
                        _this.active = true, 0;
                    });
                }, 1000);
            }
            else {
                $("#myModal1").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { return $("#myModal1").modal("hide"); }, 1000);
            }
        });
    };
    //update local storage after updated
    AdminUserMgmtPermissionComponent.prototype.updateLocalStorage = function () {
        var data = JSON.parse(localStorage.getItem('update_user'));
        data.type = this._type;
        data.canUpdateProfile = this._canUpdateProfile;
        data.canUpdatePassword = this._canUpdatePassword;
        data.canStudie = this._canStudie;
        localStorage.setItem('update_user', JSON.stringify(data));
    };
    AdminUserMgmtPermissionComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-admin-user-mgmt-permission',
            template: __webpack_require__(560),
            styles: [__webpack_require__(540)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AdminUserMgmtPermissionComponent);
    return AdminUserMgmtPermissionComponent;
    var _a, _b;
}());
//# sourceMappingURL=admin-user-mgmt-permission.component.js.map

/***/ }),

/***/ 465:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactComponent = (function () {
    function ContactComponent(userService) {
        this.userService = userService;
        this.firstName = new String;
        this.lastName = new String;
        this.email = new String;
        this.company = new String;
        this.message = new String;
        this.active = true;
        this.disable_button = false;
    }
    ContactComponent.prototype.ngOnInit = function () {
    };
    ContactComponent.prototype.sendEmailSubmit = function () {
        var _this = this;
        if (this.firstName.length == 0 || this.lastName.length == 0 || this.email.length == 0
            || this.company.length == 0 || this.message.length == 0) {
            alert('please enter');
            return false;
        }
        var data = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            company: this.company,
            message: this.message
        };
        this.disable_button = true;
        this.userService.sendEmail(data)
            .subscribe(function (data) {
            if (data.success) {
                _this.clearForm();
                alert("success");
                _this.disable_button = false;
            }
            else {
                alert('fail');
                _this.disable_button = false;
            }
        });
    };
    ContactComponent.prototype.clearForm = function () {
        var _this = this;
        this.firstName = new String;
        this.lastName = new String;
        this.email = new String;
        this.company = new String;
        this.message = new String;
        this.active = false;
        setTimeout(function () {
            _this.active = true, 0;
        });
    };
    ContactComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-contact',
            template: __webpack_require__(563),
            styles: [__webpack_require__(543)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object])
    ], ContactComponent);
    return ContactComponent;
    var _a;
}());
//# sourceMappingURL=contact.component.js.map

/***/ }),

/***/ 466:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_school_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_degree_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_mark_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DashboardComponent = (function () {
    function DashboardComponent(schoolService, degreeService, markService, userService, router) {
        this.schoolService = schoolService;
        this.degreeService = degreeService;
        this.markService = markService;
        this.userService = userService;
        this.router = router;
        this.users = new Array();
        this.admin = new Array();
        this.staff = new Array();
        this.en_users = new Array();
        this.di_users = new Array();
        this.schools = new Array();
        this.degrees = new Array();
        this.marks = new Array();
        //variables for loading spinner controller
        this.isLoading_school = true;
        this.isLoading_degree = true;
        this.isLoading_mark = true;
        this.isLoading_user = true;
        //variables for counting
        this.school_count = 0;
        this.degree_count = 0;
        this.mark_count = 0;
        this.admin_user_count = 0;
        this.staff_user_count = 0;
        this.en_user_count = 0;
        this.di_user_count = 0;
        //for ADMIN
        this.isAdmin = false;
        //user data variables
        this._id = new String;
        this._username = new String;
        this._name = new String;
        this._dob = new String;
        this._email = new String;
        this._phone = new String;
        this._type = new String;
        var data = JSON.parse(localStorage.getItem('user'));
        this._id = data.id;
        this._username = data.username;
        this._name = data.name;
        this._dob = data.dob;
        this._email = data.email;
        this._phone = data.phone;
        this._type = data.type;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.validateAdmin(JSON.parse(localStorage.getItem('user')).id)
            .subscribe(function (data) {
            if (data.success) {
                _this.isAdmin = true;
                //get schools
                _this.schoolService.getSchools()
                    .subscribe(function (data) {
                    _this.schools = data.schools;
                    _this.isLoading_degree = false;
                    if (_this.schools.length != 0) {
                        _this.school_count = _this.schools.length;
                    }
                });
                //get degrees
                _this.degreeService.getDegrees()
                    .subscribe(function (data) {
                    _this.degrees = data.degrees;
                    _this.isLoading_school = false;
                    if (_this.degrees.length != 0) {
                        _this.degree_count = _this.degrees.length;
                    }
                });
                //get degrees
                _this.markService.getMarks()
                    .subscribe(function (data) {
                    _this.marks = data.marks;
                    _this.isLoading_mark = false;
                    if (_this.marks.length != 0) {
                        _this.mark_count = _this.marks.length;
                    }
                });
                //get users
                _this.userService.getUsers()
                    .subscribe(function (data) {
                    _this.users = data.users;
                    _this.isLoading_user = false;
                    if (_this.users.length != 0) {
                        for (var i = 0; i < _this.users.length; i++) {
                            var temp = _this.users[i];
                            if (temp.type == 'admin' && !temp.isDisable) {
                                _this.admin.push(temp);
                            }
                            else {
                                if (temp.type == 'staff' && !temp.isDisable) {
                                    _this.staff.push(temp);
                                }
                                else {
                                    if (temp.isDisable) {
                                        _this.di_users.push(temp);
                                    }
                                    else {
                                        _this.en_users.push(temp);
                                    }
                                }
                            }
                        }
                    }
                    _this.admin_user_count = _this.admin.length;
                    _this.staff_user_count = _this.staff.length;
                    _this.en_user_count = _this.en_users.length;
                    _this.di_user_count = _this.di_users.length;
                });
            }
            else {
                //get schools
                _this.schoolService.getSchoolsByUsername(JSON.parse(localStorage.getItem('user')).username)
                    .subscribe(function (data) {
                    _this.schools = data.schools;
                    _this.isLoading_degree = false;
                    if (_this.schools.length != 0) {
                        _this.school_count = _this.schools.length;
                    }
                });
                //get degrees
                _this.degreeService.getDegreesByUsername(JSON.parse(localStorage.getItem('user')).username)
                    .subscribe(function (data) {
                    _this.degrees = data.degrees;
                    _this.isLoading_school = false;
                    if (_this.degrees.length != 0) {
                        _this.degree_count = _this.degrees.length;
                    }
                });
                //get degrees
                _this.markService.getMarksByUserId(JSON.parse(localStorage.getItem('user')).username)
                    .subscribe(function (data) {
                    _this.marks = data.marks;
                    _this.isLoading_mark = false;
                    if (_this.marks.length != 0) {
                        _this.mark_count = _this.marks.length;
                    }
                });
            }
        });
    };
    DashboardComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-dashboard',
            template: __webpack_require__(564),
            styles: [__webpack_require__(544)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_school_service__["a" /* SchoolService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_school_service__["a" /* SchoolService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_degree_service__["a" /* DegreeService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__services_degree_service__["a" /* DegreeService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_mark_service__["a" /* MarkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_mark_service__["a" /* MarkService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__angular_router__["b" /* Router */]) === 'function' && _e) || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 467:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(userService) {
        this.userService = userService;
        this.firstName = new String;
        this.lastName = new String;
        this.email = new String;
        this.company = new String;
        this.message = new String;
        this.active = true;
        this.disable_button = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent.prototype.sendEmailSubmit = function () {
        var _this = this;
        var data = {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            company: this.company,
            message: this.message
        };
        this.disable_button = true;
        this.userService.sendEmail(data)
            .subscribe(function (data) {
            if (data.success) {
                _this.clearForm();
                alert("success");
                _this.disable_button = false;
            }
            else {
                alert('fail');
                _this.disable_button = false;
            }
        });
    };
    HomeComponent.prototype.clearForm = function () {
        var _this = this;
        this.firstName = new String;
        this.lastName = new String;
        this.email = new String;
        this.company = new String;
        this.message = new String;
        this.active = false;
        setTimeout(function () {
            _this.active = true, 0;
        });
    };
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(565),
            styles: [__webpack_require__(545)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object])
    ], HomeComponent);
    return HomeComponent;
    var _a;
}());
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = (function () {
    //variables for modal - end
    function LoginComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this._username = new String;
        this._password = new String;
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        if (this.userService.loggedIn()) {
            this.router.navigate(['/dashboard']);
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.modal_msg_controller = false;
        var user = {
            username: this._username,
            password: this._password
        };
        $("#myModal").modal("show");
        this.userService.authenticateAndLogin(user)
            .subscribe(function (data) {
            if (data.success) {
                $("#myModal").modal("show");
                localStorage.clear();
                _this.userService.storeUserData(data.token, data.user);
                _this.modal_msg = "Login successfully ";
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                setTimeout(function () { return _this.modal_msg = "Navigating... "; }, 700);
                $("#myModal").modal("hide");
                _this.router.navigate(['/dashboard']);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 500);
            }
        });
        // $("#myModal").modal("show");
        // setTimeout(() => $("#myModal").modal("hide"), 3000);
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(566),
            styles: [__webpack_require__(546)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 469:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NavbarComponent = (function () {
    function NavbarComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    NavbarComponent.prototype.ngOnInit = function () {
    };
    NavbarComponent.prototype.displayLogoutModal = function () {
        $("#logoutModal").modal("show");
    };
    NavbarComponent.prototype.logout = function () {
        $("#logoutModal").modal("hide");
        this.userService.logout();
        this.router.navigate(['/login']);
    };
    NavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-navbar',
            template: __webpack_require__(567),
            styles: [__webpack_require__(547)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], NavbarComponent);
    return NavbarComponent;
    var _a, _b;
}());
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ 470:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(12);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileComponent = (function () {
    function ProfileComponent(validateService, userService, router) {
        this.validateService = validateService;
        this.userService = userService;
        this.router = router;
        this._id = new String;
        this._username = new String;
        this._name = new String;
        this._dob = new String;
        this._email = new String;
        this._phone = new String;
        this._type = new Boolean;
        this.edit_profile = false;
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        //variables for modal - end
        //variables for update password
        this._password = new String();
        this._newPassword = new String();
        this._confirmNewPassword = new String();
        this.isPasswordMatch = true;
        var data = JSON.parse(localStorage.getItem('user'));
        this._id = data.id;
        this._username = data.username;
        this._name = data.name;
        this._dob = data.dob;
        this._email = data.email;
        this._phone = data.phone;
        this._type = data.type;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        //initialize tooltip component
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    };
    ProfileComponent.prototype.editProfile = function () {
        this.edit_profile = true;
    };
    ProfileComponent.prototype.updateProfile = function () {
        var _this = this;
        var data = {
            username: this._username,
            name: this._name,
            dob: this._dob,
            email: this._email,
            phone: this._phone
        };
        if (!this.validateService.validateDate(data.dob)) {
            alert('Please use a valid Date of Birth');
            return false;
        }
        if (!this.validateService.validateEmail(data.email)) {
            alert('Please use a valid Email');
            return false;
        }
        if (!this.validateService.validatePhoneNumber(data.phone)) {
            alert('Please use a valid Phone Number');
            return false;
        }
        //Update profile
        $("#myModal").modal("show");
        this.userService.updateProfile(data, this._id)
            .subscribe(function (data) {
            if (data.success) {
                $("#myModal").modal("show");
                _this.modal_msg = "Updated successfully";
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                _this.updateLocalStorage();
                _this.edit_profile = false;
                setTimeout(function () {
                    $("#myModal").modal("hide");
                }, 1000);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { return $("#myModal").modal("hide"); }, 1500);
            }
        });
    };
    ProfileComponent.prototype.updatePassword = function () {
        var _this = this;
        this.isPasswordMatch = (this._newPassword == this._confirmNewPassword);
        if (!this.isPasswordMatch) {
            return false;
        }
        var data = {
            username: this._username,
            password: this._password,
            new_password: this._newPassword
        };
        //Update password
        $("#myModal").modal("show");
        this.userService.updatePassword(data, this._id)
            .subscribe(function (data) {
            if (data.success) {
                _this.modal_msg = "Updated successfully";
                $("#myModal").modal("show");
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                _this.updateLocalStorage();
                _this.edit_profile = false;
                setTimeout(function () {
                    _this.modal_msg = "Reload...";
                }, 300);
                setTimeout(function () {
                    $("#myModal").modal("hide");
                    location.reload();
                }, 500);
            }
            else {
                $("#myModal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#myModal").modal("hide"); _this.modal_msg_controller = false; }, 1500);
            }
        });
    };
    ProfileComponent.prototype.disableEdit = function () {
        this.edit_profile = false;
    };
    //update local storage after updated
    ProfileComponent.prototype.updateLocalStorage = function () {
        var data = JSON.parse(localStorage.getItem('update_user'));
        data.name = this._name;
        data.dob = this._dob;
        data.email = this._email;
        data.phone = this._phone;
        localStorage.setItem('update_user', JSON.stringify(data));
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__(568),
            styles: [__webpack_require__(548)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ 471:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_validate_service__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__admin_user_mgmt_admin_user_mgmt_component__ = __webpack_require__(311);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(validateService, userService, router) {
        this.validateService = validateService;
        this.userService = userService;
        this.router = router;
        this._username = new String;
        this._name = new String;
        this._huname = new String;
        this._dob = new String;
        this._email = new String;
        this._password = new String;
        this._phone = new String;
        this._isDisable = false;
        this._option = "member";
        this.active = true; //for clear the form
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        //variables for modal - end
        this._confirmNewPassword = new String();
        this.isPasswordMatch = true;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        //initialize tooltip component
        $(document).ready(function () {
            $('[data-toggle="tooltip"]').tooltip();
        });
    };
    RegisterComponent.prototype.registerUserSubmit = function () {
        var _this = this;
        this.modal_msg_controller = false;
        var user = {
            username: this._username,
            name: this._name,
            dob: this._dob,
            email: this._email,
            password: this._password,
            phone: this._phone,
            type: this._option,
            isDisable: this._isDisable
        };
        if (!this.validateService.validateDate(user.dob)) {
            alert('Please use a valid Date of Birth');
            return false;
        }
        if (!this.validateService.validateEmail(user.email)) {
            alert('Please use a valid Email');
            return false;
        }
        if (!this.validateService.validatePhoneNumber(user.phone)) {
            alert('Please use a valid Phone Number');
            return false;
        }
        this.isPasswordMatch = (this._password == this._confirmNewPassword);
        if (!this.isPasswordMatch) {
            return false;
        }
        //Regiser user
        $("#register-modal").modal("show");
        this.userService.registerUser(user)
            .subscribe(function (data) {
            if (data.success) {
                $("#register-modal").modal("show");
                _this.modal_msg = "Registered successfully";
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                setTimeout(function () { return _this.modal_msg = "Navigating... "; }, 1000);
                setTimeout(function () {
                    $("#register-modal").modal("hide");
                    __WEBPACK_IMPORTED_MODULE_4__admin_user_mgmt_admin_user_mgmt_component__["a" /* AdminUserMgmtComponent */].reload();
                }, 1500);
            }
            else {
                $("#register-modal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#register-modal").modal("hide"); _this.modal_msg_controller = false; }, 1500);
            }
        });
    };
    RegisterComponent.prototype.clearForm = function () {
        var _this = this;
        this._username = new String;
        this._name = new String;
        this._huname = new String;
        this._dob = new String;
        this._email = new String;
        this._password = new String;
        this._phone = new String;
        this._isDisable = false;
        this._option = "member";
        this.active = false;
        setTimeout(function () {
            _this.active = true, 0;
            //initialize tooltip component
            $(document).ready(function () {
                $('[data-toggle="tooltip"]').tooltip();
            });
        });
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-register',
            template: __webpack_require__(569),
            styles: [__webpack_require__(549)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_validate_service__["a" /* ValidateService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ 472:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StudyConsoleComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var StudyConsoleComponent = (function () {
    function StudyConsoleComponent() {
    }
    StudyConsoleComponent.prototype.ngOnInit = function () {
    };
    StudyConsoleComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-study-console',
            template: __webpack_require__(570),
            styles: [__webpack_require__(550)]
        }), 
        __metadata('design:paramtypes', [])
    ], StudyConsoleComponent);
    return StudyConsoleComponent;
}());
//# sourceMappingURL=study-console.component.js.map

/***/ }),

/***/ 473:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_school_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_degree_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__academic_overview_academic_overview_component__ = __webpack_require__(136);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserDegreeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserDegreeComponent = (function () {
    //variables for modal - end
    function UserDegreeComponent(schoolService, degreeService, router) {
        var _this = this;
        this.schoolService = schoolService;
        this.degreeService = degreeService;
        this.router = router;
        this._degree_name = new String;
        //variables for loading spinner controller
        this.isLoading = true;
        this.active = true; //for clear the form
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        var update_user = JSON.parse(localStorage.getItem('update_user'));
        var username = JSON.parse(localStorage.getItem('user')).username;
        if (update_user) {
            username = update_user.username;
        }
        this.schoolService.getSchoolsByUsername(username)
            .subscribe(function (data) {
            _this.schools = data.schools;
            _this.isLoading = false;
            // if (this.schools.length == 0) {
            //   alert('Please add school first');
            //   this.router.navigate(['/user/add-school']);
            // }
        });
    }
    UserDegreeComponent.prototype.ngOnInit = function () {
    };
    UserDegreeComponent.prototype.addDegreeSubmit = function () {
        var _this = this;
        var update_user = JSON.parse(localStorage.getItem('update_user'));
        var username = JSON.parse(localStorage.getItem('user')).username;
        if (update_user) {
            username = update_user.username;
        }
        var school_id = $("input[type='radio'][name='school']:checked").val();
        if (!school_id) {
            return alert('please select shit');
        }
        var school = this.schools.find(function (school) { return school._id == school_id; });
        this.modal_msg_controller = false;
        var degree = {
            degree_name: this._degree_name,
            duration: this._duration,
            school_name: school.school_name,
            school_id: school_id,
            username: username
        };
        //Add school
        $("#add-degree-modal").modal("show");
        this.degreeService.addDegree(degree)
            .subscribe(function (data) {
            if (data.success) {
                $("#add-degree-modal").modal("show");
                _this.modal_msg = "Added successfully";
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                setTimeout(function () { return _this.modal_msg = "Reload... "; }, 1000);
                setTimeout(function () {
                    $("#add-degree-modal").modal("hide");
                    __WEBPACK_IMPORTED_MODULE_4__academic_overview_academic_overview_component__["a" /* AcademicOverviewComponent */].reload();
                }, 1500);
            }
            else {
                $("#add-degree-modal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#add-degree-modal").modal("hide"); _this.modal_msg_controller = false; }, 1000);
            }
        });
    };
    UserDegreeComponent.prototype.clearForm = function () {
        var _this = this;
        this._degree_name = new String;
        this._duration = null;
        this.active = false;
        setTimeout(function () {
            _this.active = true, 0;
        });
    };
    UserDegreeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-degree',
            template: __webpack_require__(571),
            styles: [__webpack_require__(551)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], UserDegreeComponent);
    return UserDegreeComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=user-degree.component.js.map

/***/ }),

/***/ 474:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_mark_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_degree_service__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__academic_overview_academic_overview_component__ = __webpack_require__(136);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserMarkComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserMarkComponent = (function () {
    //variables for modal - end
    function UserMarkComponent(markService, degreeService, router) {
        var _this = this;
        this.markService = markService;
        this.degreeService = degreeService;
        this.router = router;
        this.degrees = new Array();
        //variables for loading spinner controller
        this.isLoading = true;
        this._subject_name = new String;
        this._subject_code = new String;
        this.active = true; //for clear the form
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
        if (localStorage.getItem('update_user')) {
            //for admin / staff add marks for user
            if (localStorage.getItem('update_user_degree')) {
                this.degrees.push(JSON.parse(localStorage.getItem('update_user_degree')));
                this.isLoading = false;
            }
            else {
                this.degreeService.getDegreesByUsername(JSON.parse(localStorage.getItem('update_user')).username)
                    .subscribe(function (data) {
                    _this.degrees = data.degrees;
                    _this.isLoading = false;
                });
            }
        }
        else {
            if (localStorage.getItem('degree_on_result')) {
                this.degrees.push(JSON.parse(localStorage.getItem('degree_on_result')));
                this.isLoading = false;
            }
            else {
                this.degreeService.getDegreesByUsername(JSON.parse(localStorage.getItem('user')).username)
                    .subscribe(function (data) {
                    _this.degrees = data.degrees;
                    _this.isLoading = false;
                });
            }
        }
    }
    UserMarkComponent.prototype.ngOnInit = function () {
    };
    UserMarkComponent.prototype.addMarkSubmit = function () {
        var _this = this;
        var degree_id = $("input[type='radio'][name='degree']:checked").val();
        if (!degree_id) {
            return alert('please select shit');
        }
        this.modal_msg_controller = false;
        var mark = {
            subject_name: this._subject_name,
            subject_code: this._subject_code,
            semester: this._semester,
            year_level: this._year_level,
            mark: this._mark,
            degree_id: degree_id,
            school_id: this.degrees.find(function (temp) { return temp._id == degree_id; }).school_id,
            username: JSON.parse(localStorage.getItem('user')).username
        };
        //Add mark
        $("#add-mark-modal").modal("show");
        this.markService.addMark(mark)
            .subscribe(function (data) {
            if (data.success) {
                $("#add-mark-modal").modal("show");
                _this.modal_msg = "Added successfully";
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                setTimeout(function () { return _this.modal_msg = "Reload... "; }, 1000);
                setTimeout(function () {
                    $("#add-mark-modal").modal("hide");
                    __WEBPACK_IMPORTED_MODULE_4__academic_overview_academic_overview_component__["a" /* AcademicOverviewComponent */].reload();
                }, 1500);
            }
            else {
                $("#add-mark-modal").modal("show");
                _this.modal_msg = data.msg;
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#add-mark-modal").modal("hide"); _this.modal_msg_controller = false; }, 1000);
            }
        });
    };
    UserMarkComponent.prototype.clearForm = function () {
        var _this = this;
        this._subject_name = new String;
        this._subject_code = new String;
        this._semester = null;
        this._year_level = null;
        this._mark = null;
        this.active = false;
        setTimeout(function () {
            _this.active = true, 0;
        });
    };
    UserMarkComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-mark',
            template: __webpack_require__(572),
            styles: [__webpack_require__(552)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_mark_service__["a" /* MarkService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_mark_service__["a" /* MarkService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_degree_service__["a" /* DegreeService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */]) === 'function' && _c) || Object])
    ], UserMarkComponent);
    return UserMarkComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=user-mark.component.js.map

/***/ }),

/***/ 475:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_school_service__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__academic_overview_academic_overview_component__ = __webpack_require__(136);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserSchoolComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserSchoolComponent = (function () {
    //variables for modal - end
    function UserSchoolComponent(schoolService) {
        this.schoolService = schoolService;
        this._school_name = new String;
        this._city = new String;
        this._state = new String;
        this._country = new String;
        this._username = new String;
        this.active = true; //for clear the form
        //variables for modal  - start
        this.modal_msg = "";
        this.modal_msg_controller = false;
        this.modal_msg_on_success = false;
    }
    UserSchoolComponent.prototype.ngOnInit = function () {
    };
    UserSchoolComponent.prototype.addSchoolSubmit = function () {
        var _this = this;
        var update_user = JSON.parse(localStorage.getItem('update_user'));
        var username = JSON.parse(localStorage.getItem('user')).username;
        if (update_user) {
            username = update_user.username;
        }
        this.modal_msg_controller = false;
        var school = {
            school_name: this._school_name,
            city: this._city,
            state: this._state,
            country: this._country,
            username: username
        };
        //Add school
        $("#add-school-modal").modal("show");
        this.schoolService.addSchool(school)
            .subscribe(function (data) {
            if (data.success) {
                $("#add-school-modal").modal("show");
                _this.modal_msg = "Added successfully";
                _this.modal_msg_controller = true;
                _this.modal_msg_on_success = true;
                setTimeout(function () { return _this.modal_msg = "Reload... "; }, 1000);
                setTimeout(function () {
                    $("#add-school-modal").modal("hide");
                    __WEBPACK_IMPORTED_MODULE_2__academic_overview_academic_overview_component__["a" /* AcademicOverviewComponent */].reload();
                }, 1500);
            }
            else {
                $("#add-school-modal").modal("show");
                _this.modal_msg = "Error! Contact admin for support";
                _this.modal_msg_controller = true;
                setTimeout(function () { $("#add-school-modal").modal("hide"); _this.modal_msg_controller = false; }, 1000);
            }
        });
    };
    UserSchoolComponent.prototype.clearForm = function () {
        var _this = this;
        this._school_name = new String;
        this._city = new String;
        this._state = new String;
        this._country = new String;
        this.active = false;
        setTimeout(function () {
            _this.active = true, 0;
        });
    };
    UserSchoolComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-school',
            template: __webpack_require__(573),
            styles: [__webpack_require__(553)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_school_service__["a" /* SchoolService */]) === 'function' && _a) || Object])
    ], UserSchoolComponent);
    return UserSchoolComponent;
    var _a;
}());
//# sourceMappingURL=user-school.component.js.map

/***/ }),

/***/ 476:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisabledUsersPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DisabledUsersPipe = (function () {
    function DisabledUsersPipe() {
    }
    DisabledUsersPipe.prototype.transform = function (users, username, search_query) {
        return users.filter(function (user) { return user.isDisable && user.username != username && user.username.includes(search_query); });
    };
    DisabledUsersPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'disabledUsers',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], DisabledUsersPipe);
    return DisabledUsersPipe;
}());
//# sourceMappingURL=disabled-users.pipe.js.map

/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnabledUsersPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EnabledUsersPipe = (function () {
    function EnabledUsersPipe() {
    }
    EnabledUsersPipe.prototype.transform = function (users, username, search_query) {
        return users.filter(function (user) { return !user.isDisable && user.username != username && user.username.includes(search_query); });
    };
    EnabledUsersPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'enabledUsers',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], EnabledUsersPipe);
    return EnabledUsersPipe;
}());
//# sourceMappingURL=enabled-users.pipe.js.map

/***/ }),

/***/ 478:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GroupDegreeBySchoolPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GroupDegreeBySchoolPipe = (function () {
    function GroupDegreeBySchoolPipe() {
    }
    GroupDegreeBySchoolPipe.prototype.transform = function (degrees, school_id) {
        return degrees.filter(function (degree) { return degree.school_id == school_id; });
    };
    GroupDegreeBySchoolPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'groupDegreeBySchool',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], GroupDegreeBySchoolPipe);
    return GroupDegreeBySchoolPipe;
}());
//# sourceMappingURL=group-degree-by-school.pipe.js.map

/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrderByPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var OrderByPipe = (function () {
    function OrderByPipe() {
    }
    OrderByPipe.prototype.transform = function (array, args) {
        array.sort(function (a, b) {
            if (a.year_level < b.year_level) {
                return -1;
            }
            else {
                if (a.year_level > b.year_level) {
                    return 1;
                }
                else {
                    if (a.semester < b.semester) {
                        return -1;
                    }
                    else {
                        if (a.semester > b.semester) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    }
                }
            }
        });
        return array;
    };
    OrderByPipe = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'orderBy',
            pure: false
        }), 
        __metadata('design:paramtypes', [])
    ], OrderByPipe);
    return OrderByPipe;
}());
//# sourceMappingURL=order-by.pipe.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_service__ = __webpack_require__(16);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    // isAdmin = false;
    function AuthGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (this.userService.loggedIn()) {
            return true;
        }
        else {
            localStorage.clear();
            this.router.navigate(['login']);
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=auth-guard.service.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 535:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700);", ""]);

// module
exports.push([module.i, ".footer{\n    background-color: #2c3e50;\n    bottom: -70px;\n    position: relative;\n    height: 50px;\n    padding: 15px;\n    text-align: center;\n}\n\np{\n    color: #95a5a6;\n    font-family: 'Open Sans Condensed', sans-serif;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 536:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".breadcrumb{\n    background-color: #2C3E50;\n    color: white;\n    font-size: 15px;\n}\n\n.breadcrumb a{\n    text-decoration: none;\n    color: white;\n}\n\n.breadcrumb a:hover{\n    color: #03A678;\n    font-weight: bolder;\n}\n\n.panel-default{\n    /*border: 1px solid black;*/\n}\n\n.modal{\n    margin-top: 150px;\n}\n\n.panel{\n    /*background-color: #ECECEC;*/\n}\n\n.school.panel-heading, .degree.panel-heading{\n    padding: 10px 0 10px 0;\n    font-size: 20px;\n    font-weight: bolder;\n    height: 100%;\n}\n\n.school.panel-heading{\n    background-color: #34495E;\n    color: #ECECEC;\n}\n\n.degree.panel-heading{\n    background-color: #336E7B;\n    color: #ECECEC;\n}\n\n.school, .degree{\n    margin: 5px;\n    text-align: center;\n}\n\n.button input {\n    width: 80px;\n    font-size: 12px;\n    height: 30px;\n    font-weight: bold;\n    padding: 2px;\n}\n\n.edit i:hover{\n    font-weight: bolder;\n    color: white;\n}\n\n.button-on-update input {\n    margin-top: 20px;\n    width: 100px;\n}\n\n.empty_info{\n    text-align: center;\n    height: 70px;\n    font-size: 25px;\n    margin: 20px;\n    color: #ABB7B7;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 537:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".breadcrumb{\n    background-color: #2C3E50;\n    color: white;\n    font-size: 15px;\n}\n\n.breadcrumb a{\n    text-decoration: none;\n    color: white;\n}\n\n.breadcrumb a:hover{\n    color: #03A678;\n    font-weight: bolder;\n}\n\n.panel{\n    /*background-color: #ECECEC;*/\n    /*border: 1px solid black;*/\n}\n\n.school.panel{\n    border: 1px solid black;\n}\n\n.school.panel-heading{\n    padding: 10px 0 10px 0;\n    font-size: 25px;\n    font-weight: bolder;\n    height: 100%;\n    border-bottom: 2px solid lightgray;\n    background-color: #34495E;\n    color: #ECECEC;\n}\n\n.school.panel.panel-default{\n    margin: 0 10px 20px 10px;\n}\n\n.degree.panel-body{\n    padding: 7px 0 7px 0;\n    border-bottom: 1px solid lightgray;\n}\n\n.panel input, button{\n    width: 80px;\n    font-size: 12px;\n    height: 30px;\n    font-weight: bold;\n    padding: 2px;\n}\n\n/*.modal-dialog{\n    width: 50%;\n}*/\n\n.ng-valid[required], .ng-valid.required  {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid:not(form)  {\n  border-left: 5px solid #a94442; /* red */\n}\n\n.custom_alert{\n    font-weight: bolder;\n    color: red;\n}\n\n.button input {\n    margin-top: 20px;\n    width: 100px;\n}\n\nh3{\n    margin: 10px;\n}\n\n.empty_info{\n    text-align: center;\n    height: 100%;\n    font-size: 25px;\n    margin: 30px;\n    color: #ABB7B7;\n}\n\n.panel-body input{\n    margin: 2px;\n}\n\n\n/* responsive layout ===================================================================================================\n======================================================================================================================*/\n@media (max-width: 900px){\n    .modal-dialog {\n    width: 70%;\n    margin: 0;\n    padding: 0;\n    margin-top: 20px\n    }\n}\n\n@media (max-width: 700px){\n    .modal-dialog {\n    width: 80%;\n    margin: 0;\n    padding: 0;\n    margin-top: 20px\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".breadcrumb{\n    background-color: #2C3E50;\n    color: white;\n    font-size: 15px;\n}\n\n.breadcrumb a{\n    text-decoration: none;\n    color: white;\n}\n\n.breadcrumb a:hover{\n    color: #03A678;\n    font-weight: bolder;\n}\n\n.modal{\n    margin-top: 150px;\n}\n\n.school.panel-heading, .degree.panel-heading{\n    padding: 10px 0 10px 0;\n    font-size: 20px;\n    font-weight: bolder;\n    height: 100%;\n}\n\n.school.panel-heading{\n    background-color: #34495E;\n    color: #ECECEC;\n}\n\n.degree.panel-heading{\n    background-color: #336E7B;\n    color: #ECECEC;\n}\n\n.school, .degree{\n    margin: 5px;\n    text-align: center;\n}\n\n.button input, .back input  {\n    width: 80px;\n    font-size: 12px;\n    height: 30px;\n    font-weight: bold;\n    padding: 2px;\n}\n\n.edit i:hover{\n    font-weight: bolder;\n    color: white;\n}\n\n.button-on-update input{\n    margin-top: 20px;\n    width: 100px;\n}\n\n.empty_info{\n    text-align: center;\n    height: 100%;\n    font-size: 25px;\n    margin: 20px;\n    color: #ABB7B7;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 539:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".school.panel{\n    border: 1px solid black;\n}\n\n.school.panel-heading{\n    padding: 10px 0 10px 0;\n    font-size: 25px;\n    font-weight: bolder;\n    height: 100%;\n    border-bottom: 2px solid lightgray;\n    background-color: #34495E;\n    color: #ECECEC;\n}\n\n.school.panel.panel-default{\n    margin: 0 10px 20px 10px;\n}\n\n.degree.panel-body{\n    padding: 7px 0 7px 0;\n    border-bottom: 1px solid lightgray;\n}\n\n.panel input, button{\n    width: 80px;\n    font-size: 12px;\n    height: 30px;\n    font-weight: bold;\n    padding: 2px;\n}\n\n.modal-dialog{\n    width: 50%;\n}\n\n.ng-valid[required], .ng-valid.required  {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid:not(form)  {\n  border-left: 5px solid #a94442; /* red */\n}\n\n.custom_alert{\n    font-weight: bolder;\n    color: red;\n}\n\n.button input {\n    margin-top: 20px;\n    width: 100px;\n}\n\nh3{\n    margin: 10px;\n}\n\n.empty_info{\n    text-align: center;\n    height: 100%;\n    font-size: 25px;\n    margin: 30px;\n    color: #ABB7B7;\n}\n\n.dropdown-menu{\n    width: 100%;\n}\n\n/* responsive layout ===================================================================================================\n======================================================================================================================*/\n@media (max-width: 900px){\n    .modal-dialog {\n    width: 70%;\n    margin: 0;\n    padding: 0;\n    margin-top: 20px\n    }\n}\n\n@media (max-width: 700px){\n    .modal-dialog {\n    width: 80%;\n    margin: 0;\n    padding: 0;\n    margin-top: 20px\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 540:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "/* The switch - the box around the slider */\n.switch {\n  position: relative;\n  display: inline-block;\n  width: 60px;\n  height: 34px;\n}\n\n/* Hide default HTML checkbox */\n.switch input {display:none;}\n\n/* The slider */\n.slider {\n  position: absolute;\n  cursor: pointer;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: #ccc;\n  -webkit-transition: .2s;\n  transition: .2s;\n}\n\n.slider:before {\n  position: absolute;\n  content: \"\";\n  height: 26px;\n  width: 26px;\n  left: 4px;\n  bottom: 4px;\n  background-color: white;\n  -webkit-transition: .2s;\n  transition: .2s;\n}\n\ninput:checked + .slider {\n  background-color: #2196F3;\n}\n\ninput:focus + .slider {\n  box-shadow: 0 0 1px #2196F3;\n}\n\ninput:checked + .slider:before {\n  -webkit-transform: translateX(26px);\n  transform: translateX(26px);\n}\n\n/* Rounded sliders */\n.slider.round {\n  border-radius: 34px;\n}\n\n.slider.round:before {\n  border-radius: 50%;\n}\n\n\n.button {\n    padding: 15px 0 15px 0;\n    text-align: center;\n}\n\n.button input {\n    width: 100px;\n}\n\n.modal{\n    margin-top: 150px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 541:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Bitter);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Merriweather:700i);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed);", ""]);

// module
exports.push([module.i, ".breadcrumb{\n    background-color: #2C3E50;\n    color: white;\n    font-size: 15px;\n}\n\n.breadcrumb a{\n    text-decoration: none;\n    color: #ECECEC;\n}\n\n.breadcrumb a:hover{\n    color: #03A678;\n    font-weight: bolder;\n}\n\n.panel-body{\n    /*border: 1px solid black;*/\n    background-color: white;\n}\n\nhr{\n    border-top: 1px solid black;\n}\n\nul{\n    margin: 0;\n    padding: 0;\n}\n\nul li{\n    list-style: none;\n    font-family: 'Bitter', serif;\n    padding-left: 10px;\n}\n\n.panel-body ul>li>a {\n    text-decoration: none !important;\n    color: black;\n    \n}\n\n.panel-body ul>li:hover {\n    text-decoration: none !important;\n    border-left: 5px solid black;\n}\n\n.panel > .panel-body {\n    border-color: #3498db;\n    background-color: #fff;\n}\n\n.heading h5{\n  font-size: 13px;\n  font-family: 'Merriweather', serif;\n  color: black;\n}\n\n.data h5{\n  font-size: 13px;\n  font-family: 'Bitter', serif;\n  color: black;\n}\n\n.custom_alert{\n    font-weight: bolder;\n    color: red;\n}\n\n/* responsive layout ===================================================================================================\n======================================================================================================================*/\n@media (max-width: 991px){\n    ul>li{\n        display: inline-block;\n        margin: 10px;\n        font-size: 12px;\n        padding: 10px;\n        background-color: #2C3E50;\n        \n    }\n\n    ul>li>a{\n        color: white !important;\n    }\n\n    .panel-body ul>li:hover {\n        background-color: #1a242f;\n        border: none;\n    }\n\n    .tab{\n        text-align: center;\n        padding-bottom: 5px;\n        border-bottom: 1px solid lightgray;\n    }\n\n    ul>input.btn{\n        display: block;\n        text-align: left !important;\n    }\n\n    hr{\n        display: none;\n    }\n    .img {\n        text-align: center;\n    }\n\n    img{\n        width: 70%;\n        height: 70%;\n    }\n\n    legend{\n        padding: 15px 0 0 0;\n        text-align: center;\n        border: none;\n    }\n}\n\n@media (max-width: 767px){\n\n    img{\n        width: 50%;\n        height: 50%;\n    }\n\n    .info{\n        margin-top: 20px;\n        font-size: 13px;\n    }\n}\n\n@media (max-width: 670px){\n    ul>li{\n        margin: auto;\n        float: center;\n        display: block;\n        padding: 10px;\n        margin-top: 10px;\n        margin-bottom: 5px;\n        width: 150px;\n    }\n}\n\n@media (max-width: 510px){\n    img{\n        width: 60%;\n        height: 60%;\n    }\n    .heading, .data{\n        display: block;\n        width: 100%;\n    }\n    .heading{\n        border-bottom: 1px solid lightgray;\n        margin-left: -10px;\n        margin-top: 5px;\n    }\n\n    .data{\n        text-align: right;\n    }   \n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 542:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".breadcrumb{\n    background-color: #2C3E50;\n    color: white;\n    font-size: 15px;\n}\n\n.breadcrumb a{\n    text-decoration: none;\n    color: #ECECEC;\n}\n\n.breadcrumb a:hover{\n    color: #03A678;\n    font-weight: bolder;\n}\n\n.panel{\n    background-color: #ECECEC;\n}\n\nh3.title{\n    background-color: #34495E;\n    color: white;\n    padding: 10px;\n    font-size: 17px;\n}\n\n.button input {\n    width: 80px;\n    font-size: 12px;\n    height: 30px;\n    font-weight: bold;\n    padding: 2px;\n}\n\n.modal{\n    margin-top: 150px;\n}\n\n/*.dropdown>button{\n    width: 80px;\n    font-size: 12px;\n    height: 30px;\n    font-weight: bold;\n    padding: 2px;;\n}*/\n\n/*.dropdown-menu li{\ntext-align: center;\n}*/\n\n/* responsive layout ===================================================================================================\n======================================================================================================================*/\n@media (max-width: 750px){\n    .button input {\n        float: right;\n        clear: both;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 543:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Playfair+Display);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Baloo+Bhaina);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Merriweather:700i);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Fjalla+One);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Bitter);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed);", ""]);

// module
exports.push([module.i, ".breadcrumb{\n    background-color: #2C3E50;\n    color: white;\n    font-size: 15px;\n}\n\n.breadcrumb a{\n    text-decoration: none;\n    color: white;\n}\n\n.breadcrumb a:hover{\n    color: #03A678;\n    font-weight: bolder;\n}\n\n.block{\n  float: none;\n  margin: 0 auto;\n}\n\n/*block 1 ==============================================================================================================\n======================================================================================================================*/\n.block-1{\n  background-color: #2C3E50;\n  /*background-color: rgba(0, 0, 0, .5);*/\n}\n\n.block-1 h3{\n  font-family: 'Open Sans Condensed', sans-serif;\n  color: white;\n  font-weight: bolder;\n  font-size: 20px;\n  /*display: inline;\n  border-bottom: 2px solid white;*/\n}\n\n.get-in-touch{\n  float: none;\n  margin: 0 auto;\n  padding: 10px 0 10px 0;\n  text-align: center;\n}\n\n\n/*block 2 ==============================================================================================================\n======================================================================================================================*/\n.block-2{\n  background-color: #DADFE1;\n}\n\n/*block 2 - 1 ==========================================================================================================\n======================================================================================================================*/\n\n.block-2-1{\n  padding: 40px 0 40px 30px;\n}\n\n.block-2-1 h5, h3{\n  font-family: 'Bitter', serif;\n  font-weight: bolder;\n  color: black;\n}\n\n.block-2-1  h6{\n  font-size: 13px;\n  font-family: 'Merriweather', serif;\n  color: black;\n}\n\n\n.block-2-1  i{\n  padding: 10px 10px 0 10px;\n  color: black;\n}\n\n.block-2-1  i:hover{\n  color: rgb(34, 49, 63);\n}\n\n\n/*block 2 - 2 ==========================================================================================================\n======================================================================================================================*/\n\n.block-2-2{\n  padding: 40px 0 30px 30px;\n}\n\n.block-2-2 input{\n  font-size: 12px;\n  height: 30px;\n}\n\n.block-2-2 textarea{\n  font-size: 12px;\n}\n\n.block-2-2 button{\n  font-size: 12px;\n}\n\n.block-2-2 legend{\n  font-family: 'Bitter', serif;\n  font-weight: bolder;\n  color: black;\n  font-size: 17px;\n}\n\n/* responsive layout ===================================================================================================\n======================================================================================================================*/\n@media (max-width: 770px) {\n    .block-2-1 {\n      text-align: center;\n    }\n\n    .button{\n      text-align: center;\n    }\n\n    input{\n      margin-top: 10px;\n    }\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 544:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Bitter);", ""]);

// module
exports.push([module.i, ".panel{\n    padding: 0px;\n}\n\n.breadcrumb{\n    background-color: #2C3E50;\n    color: white;\n    font-size: 15px;\n}\n\n.button-1{\n    width: 100%;\n    background-color: #16A085;\n    height: 50px;\n    text-align: center;\n    padding-top: 20px;\n    border: 1px solid black;\n}\n\n.button-1:hover{\n    background-color: red;\n}\n\n.panel-user, .panel-1, .panel-2, .panel-3{\n    padding: 0px;\n}\n\n.panel-welcome{\n    background-color: #16A085;\n    color: white;\n    height: 180px;\n}\n\n.panel-user{\n    background-color: #2C3E50;\n    color: white;\n    height: 180px;\n}\n\n.panel-1{\n    background-color: #FDE3A7;\n}\n\n.panel-2{\n    background-color: #336E7B;\n    color: white;\n}\n\n.panel-3{\n    background-color: #E08283;\n    color: black;\n}\n\n.panel-4{\n    background-color: #ABB7B7;\n}\n\n.panel-4 .panel-body{\n    height: 150px;\n}\n\n.panel-5{\n    background-color: #67809F;\n    height: 300px;\n    padding: 30px;\n    color: black;\n}\n\nh3{\n    font-family: 'Bitter', serif;\n    padding: 5px 0 5px 0;\n}\n\n.panel h4{\n    font-size: 25px;\n    font-weight: bolder;\n}\n\nimg{\n    margin: 5px 0 10px 0;\n}\n\nh4.type{\n    border: 2px solid white;\n    width: 120px;\n    text-align: center;\n    padding: 5px;\n    margin: auto;\n}\n\n\n/* responsive layout ===================================================================================================\n======================================================================================================================*/\n@media (max-width: 992px) {\n   h3{\n    font-family: 'Bitter', serif;\n    font-size: 20px;\n    padding: 5px 0 5px 0;\n}\n\n    .panel h4{\n        font-size: 12px;\n        font-weight: bolder;\n    }\n\n    .panel-1, .panel-2, .panel-3, .academic{\n        text-align: center;\n    }\n\n    h4.type{\n        border: 1px solid white;\n        width: 80px;\n        text-align: center;\n        padding: 2px;\n        margin: auto;\n        font-size: 15px;\n    }\n}\n\n@media (max-width: 768px) {\n    .img{\n        text-align: left;\n    }\n    .a{\n        text-align: right;\n    }\n\n    .panel-5{\n        padding: 0;\n    }\n}\n\n@media (max-width: 460px) {\n    img{\n        width: 80px;\n        height: 80px;\n    }\n    \n    h3{\n        font-size: 20px;\n    }\n    \n    h4{\n        font-size: 15px;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 545:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Merriweather:700i);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Bitter);", ""]);

// module
exports.push([module.i, "/*tools ==============================================================================================================\n======================================================================================================================*/\n.tools{\n  padding: 50px 0 50px 0; \n  color: black;  \n  font-family: 'Bitter', serif;\n  height: 100%;\n  background-color: white;\n}\n\n.tools h3{\n  font-family: 'Merriweather', serif;\n}\n\n.tools-sub{\n  margin: 50px 150px 0 150px;\n}\n\n.front-end, .back-end, .db{\n  padding: 30px 50px 50px 50px;\n}\n\n.tools h4{\n  padding-top: 20px;\n  font-weight: bolder;\n}\n\n.tools h5{\n  font-family: 'Merriweather', serif;\n}\n\n\n/*footer ==============================================================================================================\n======================================================================================================================*/\n.footer{\n  background-color: #22313F;\n}\n\n.footer h3{\n  text-align: center;\n  font-family: 'Open Sans Condensed', sans-serif;\n  color: white;\n  font-weight: bolder;\n  font-size: 30px;\n}\n\n.info{\n  padding: 50px;\n}\n\n.info h5{\n  font-family: 'Bitter', serif;\n  font-weight: bolder;\n  color: white;\n}\n\n.info  h6{\n  font-size: 13px;\n  font-family: 'Merriweather', serif;\n  color: white;\n}\n\n\n.info  i{\n  padding: 10px 10px 0 10px;\n  color: white;\n}\n\n.info  i:hover{\n  color: rgb(34, 49, 63);\n}\n\n.send-message{\n  padding: 50px;\n}\n\n.send-message input{\n  font-size: 12px;\n  height: 30px;\n}\n\n.send-message textarea{\n  font-size: 12px;\n}\n\n.send-message button{\n  font-size: 15px;\n}\n\n.send-message legend{\n  font-family: 'Bitter', serif;\n  font-weight: bolder;\n  color: white;\n  font-size: 17px;\n}\n\n/* responsive layout for footer ===================================================================================================\n======================================================================================================================*/\n@media (max-width: 770px) {\n    .info {\n      text-align: center;\n    }\n\n    .button{\n      text-align: center;\n    }\n\n    input{\n      margin-top: 10px;\n    }\n}\n\n/* others ==============================================================================================================\n======================================================================================================================*/\n.jumbotron{\n    padding: 50px;\n    height: 550px;\n    background-image: url(" + __webpack_require__(592) + ");\n    background-position: center center;\n    background-repeat: no-repeat;\n    /*background-attachment: fixed;*/\n    background-size: cover;\n    color: white;\n    margin-top: -50px;\n}\n\n.footer{\n    font-family: 'Bitter', serif;\n    color: #ABB7B7;\n    font-size: 12px;\n    padding: 30px 0 5px 0 ;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 546:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Bitter);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans+Condensed:700);", ""]);

// module
exports.push([module.i, "legend {\n    width: 100%;\n    text-align: center;\n    font-weight: bolder;\n}\n\n.col-centered {\n    float: none;\n    margin: 0 auto;\n    padding-top: 20px;\n}\n\n.button {\n    text-align: center;\n}\n\n.modal{\n    margin-top: 150px;\n}\n\nh1{\n    margin-top: 70px;\n    font-family: 'Bitter', serif;\n}\nh4{\n    font-family: 'Open Sans Condensed', sans-serif;\n}\n\n/*.ng-valid[required], .ng-valid.required  {\n  border-left: 5px solid #42A948; \n}\n\n.ng-invalid:not(form)  {\n  border-left: 5px solid #a94442; \n}*/\n\n.content{\n    /*padding-bottom: 70px;*/\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 547:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".button-1{\n    width: 100%;\n    background-color: #2c3e50;\n    height: 100px;\n    text-align: center;\n    padding: 10px;\n    color: #ecf0f1;\n}\n\n.button-2{\n    width: 100%;\n    background-color: #674172;\n    height: 100px;\n    text-align: center;\n    padding: 10px;\n    color: #ecf0f1;\n}\n\n.button-3{\n    width: 100%;\n    background-color: #2980b9;\n    height: 100px;\n    text-align: center;\n    padding: 10px;\n    color: #ecf0f1;\n}\n\n.button-4{\n    width: 100%;\n    background-color: #16a085;\n    height: 100px;\n    text-align: center;\n    padding: 10px;\n    color: #ecf0f1;\n}\n\n.button-5{\n    width: 100%;\n    background-color: #22313F;\n    height: 100px;\n    text-align: center;\n    padding: 10px;\n    color: #ecf0f1;\n}\n\n.button-1:hover, .button-2:hover, .button-3:hover, .button-4:hover, .button-5:hover{\n    border-left: 5px solid white;\n}\n\n.modal{\n    margin-top: 150px;\n}\n\n.navbar {\n    border-radius: 0;\n    \n}\n\n@media (max-width: 1100px){\n    h3{\n        font-size: 20px;\n        padding-top: 10px;\n    }\n}\n\n@media (max-width: 983px){\n    h3{\n        font-size: 20px;\n        margin-top: -5px;\n    }\n\n    i{\n        display: block;\n        font-size: 35px;\n        padding: 5px;\n    }\n}\n@media (max-width: 882px){\n    i{\n        font-size: 25px;\n    }\n\n    .button-1 h3, .button-2 h3, .button-3 h3, .button-4 h3{\n        margin-top: 10px;\n    }\n}\n\n@media (max-width: 704px){\n    .text{\n        display: none;\n    }\n    i{\n        font-size: 40px;\n\n    }\n\n    h3{\n        margin-top: 0px;\n    }\n}\n\n@media (max-width: 650px){\n    \n    i{\n        font-size: 40px;\n    }\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 548:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Bitter);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Merriweather:700i);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed);", ""]);

// module
exports.push([module.i, ".breadcrumb{\n    background-color: #2C3E50;\n    color: white;\n    font-size: 15px;\n}\n\n.breadcrumb a{\n    text-decoration: none;\n    color: white;\n}\n\n.breadcrumb a:hover{\n    color: #03A678;\n    font-weight: bolder;\n}\n\n.panel-body{\n    /*border: 1px solid black;*/\n    background-color: white;\n}\n\nhr{\n    border-top: 1px solid black;\n}\n\nul{\n    margin: 0;\n    padding: 0;\n}\n\nul li{\n    list-style: none;\n    font-family: 'Bitter', serif;\n    padding-left: 10px;\n}\n\n.panel-body ul>li>a {\n    text-decoration: none !important;\n    color: black;\n    \n}\n\n.panel-body ul>li:hover {\n    text-decoration: none !important;\n    border-left: 5px solid black;\n}\n\n.panel-body{\n}\n\n.panel > .panel-body {\n    border-color: #3498db;\n    background-color: #fff;\n}\n\n.heading h5{\n  font-size: 13px;\n  font-family: 'Merriweather', serif;\n  color: black;\n}\n\n.data h5{\n  font-size: 13px;\n  font-family: 'Bitter', serif;\n  color: black;\n}\n\nlegend{\n    font-size: 20px;\n}\n\n.custom_alert{\n    font-weight: bolder;\n    color: red;\n}\n\n/* responsive layout ===================================================================================================\n======================================================================================================================*/\n@media (max-width: 991px){\n    ul>li{\n        display: inline-block;\n        margin: 10px;\n        font-size: 12px;\n        padding: 10px;\n        background-color: #2C3E50;\n    }\n\n    ul>li>a{\n        color: white !important;\n    }\n\n    .panel-body ul>li:hover {\n        background-color: #1a242f;\n        border: none;\n    }\n\n    .tab{\n        text-align: center;\n        padding-bottom: 5px;\n        border-bottom: 1px solid lightgray;\n    }\n\n    hr{\n        display: none;\n    }\n    .img {\n        text-align: center;\n    }\n\n    img{\n        width: 70%;\n        height: 70%;\n    }\n\n    legend{\n        padding: 15px 0 0 0;\n        text-align: center;\n        border: none;\n    }\n}\n\n@media (max-width: 767px){\n\n    img{\n        width: 50%;\n        height: 50%;\n    }\n\n    .info{\n        margin-top: 20px;\n        font-size: 13px;\n    }\n}\n\n@media (max-width: 670px){\n    ul>li{\n        margin: auto;\n        float: center;\n        display: block;\n        padding: 10px;\n        margin-top: 10px;\n        margin-bottom: 5px;\n        width: 150px;\n    }\n}\n\n@media (max-width: 510px){\n    img{\n        width: 60%;\n        height: 60%;\n    }\n    .heading, .data{\n        display: block;\n        width: 100%;\n    }\n    .heading{\n        border-bottom: 1px solid lightgray;\n        margin-left: -10px;\n        margin-top: 5px;\n    }\n\n    .data{\n        text-align: right;\n    }   \n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 549:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, "legend {\n    width: 100%;\n    text-align: center;\n    font-weight: bolder;\n}\n\n.button {\n    padding: 15px 0 15px 0;\n    text-align: center;\n}\n\n.button input {\n    width: 100px;\n}\n\n.modal{\n    margin-top: 250px;\n}\n\n.ng-valid[required], .ng-valid.required  {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid:not(form)  {\n  border-left: 5px solid #a94442; /* red */\n}\n\n.custom_alert{\n    font-weight: bolder;\n    color: red;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MarkService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MarkService = (function () {
    function MarkService(http) {
        this.http = http;
        this.url = "http://localhost:8080/mark/";
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
    }
    MarkService.prototype.getMarks = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.url + 'marks', { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //get marks by degree_id
    MarkService.prototype.getMarksByDegreeId = function (degree_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.url + 'marks?degree_id=' + degree_id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //get marks by user_id
    MarkService.prototype.getMarksByUserId = function (user_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.get(this.url + 'marks?user_id=' + user_id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //add a new mark
    MarkService.prototype.addMark = function (mark) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.url + 'add', JSON.stringify(mark), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //update mark
    MarkService.prototype.updateMark = function (mark, mark_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.put(this.url + 'updateMark/' + mark_id, JSON.stringify(mark), { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //delete mark by mark_id
    MarkService.prototype.deleteMark = function (mark_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.delete(this.url + 'deleteMark/' + mark_id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //delete marks by degree_id
    MarkService.prototype.deleteMarkByDegreeId = function (degree_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.delete(this.url + 'deleteMark?degree_id=' + degree_id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    //delete marks by school_id
    MarkService.prototype.deleteMarkBySchoolId = function (school_id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Authorization', this.getToken());
        headers.append('Content-Type', 'application/json');
        return this.http.delete(this.url + 'deleteMark?school_id=' + school_id, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    MarkService.prototype.getToken = function () {
        return localStorage.getItem('id_token');
    };
    MarkService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], MarkService);
    return MarkService;
    var _a;
}());
//# sourceMappingURL=mark.service.js.map

/***/ }),

/***/ 550:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".breadcrumb{\n    background-color: #2C3E50;\n    color: white;\n    font-size: 15px;\n}\n\n.breadcrumb a{\n    text-decoration: none;\n    color: #ECECEC;\n}\n\n.breadcrumb a:hover{\n    color: #03A678;\n    font-weight: bolder;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 551:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".ng-valid[required], .ng-valid.required  {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid:not(form)  {\n  border-left: 5px solid #a94442; /* red */\n}\n\n.custom_alert{\n    font-weight: bolder;\n    color: red;\n}\n\n.button input {\n    width: 100px;\n}\n\n.modal{\n    margin-top: 150px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 552:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".ng-valid[required], .ng-valid.required  {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid:not(form)  {\n  border-left: 5px solid #a94442; /* red */\n}\n\n.custom_alert{\n    font-weight: bolder;\n    color: red;\n}\n\n.button input {\n    width: 100px;\n}\n\n.modal{\n    margin-top: 150px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 553:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)();
// imports


// module
exports.push([module.i, ".ng-valid[required], .ng-valid.required  {\n  border-left: 5px solid #42A948; /* green */\n}\n\n.ng-invalid:not(form)  {\n  border-left: 5px solid #a94442; /* red */\n}\n\n.custom_alert{\n    font-weight: bolder;\n    color: red;\n}\n\n.button input {\n    width: 100px;\n}\n\n.modal{\n    margin-top: 150px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 555:
/***/ (function(module, exports) {

module.exports = "<app-navbar></app-navbar>\n<div class=\"main\">\n    <router-outlet></router-outlet>\n</div>\n\n<!--<footer class=\"footer col-md-12 col-sm-12 col-xs-12\">\n    <div class=\"container\">\n        <p class=\"text-muted\">Studie v1.0 <i class=\"fa fa-copyright\" aria-hidden=\"true\"></i> 2017 Trung Nguyen </p>\n    </div>\n</footer>-->"

/***/ }),

/***/ 556:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-9 col-sm-9 col-xs-9\">\n  <ol class=\"breadcrumb\">\n    <li><a href=\"/dashboard\">Dashboard</a></li>\n    <li><a href=\"/study-console\">Study Console</a></li>\n    <li class=\"active\">{{degree.degree_name}} - {{school.school_name}}</li>\n  </ol>\n  <!-- Default panel contents -->\n  <div class=\"panel panel-default col-md-12 col-sm-12 col-xs-12\">\n    <div class=\"school panel-heading col-md-5 col-sm-12 col-xs-12\">\n      <div class=\"col-md-10 col-sm-10 col-xs-10\">\n        {{school.school_name}}\n        <h5>{{school.city}}, {{school.state}}, {{school.country}}</h5>\n      </div>\n      <div class=\"edit col-md-2 col-sm-2 col-xs-2\">\n        <i (click)=\"updateSchool()\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n    <div class=\"degree panel-heading col-md-6 col-sm-12 col-xs-12\">\n      <div class=\"col-md-10 col-sm-10 col-xs-10\">\n        {{degree.degree_name}}\n        <h5>{{degree.duration}} years</h5>\n      </div>\n      <div class=\"edit col-md-2 col-sm-2 col-xs-2\">\n        <i (click)=\"updateDegree()\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\n      </div>\n    </div>\n\n    <div class=\"panel-body col-md-12 col-sm-12 col-xs-12\">\n      <!-- Table -->\n      <div class=\"table-responsive\">\n      <table class=\"table table-striped table-hover \">\n        <thead>\n          <tr>\n            <th>#</th>\n            <th class=\"col-md-3\">Subject Name</th>\n            <th>Subject Code</th>\n            <th>Mark</th>\n            <th>Sem/Year</th>\n            <th class=\"button text-right\">\n              <input type=\"submit\" class=\"btn btn-info\" (click)=\"addMarkTab()\" value=\"Add\">\n            </th>\n          </tr>\n        </thead>\n        <tbody *ngIf=\"marks\">\n          <tr class=\"text-left\" *ngFor=\"let mark of marks | orderBy; let i = index;\">\n            <td>{{i+1}}</td>\n            <td class=\"col-md-3\">{{mark.subject_name}}</td>\n            <td>{{mark.subject_code}}</td>\n            <td>{{mark.mark}}</td>\n            <td>Sem {{mark.semester}}, Year {{mark.year_level}}</td>\n            <td class=\"button text-right\">\n              <input type=\"submit\" class=\"btn btn-primary\" value=\"Update\" (click)=\"updateMark(mark)\">\n              <input type=\"submit\" class=\"btn btn-danger\" value=\"Delete\" (click)=\"deleteMark(mark)\">\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      </div>\n      <i *ngIf=\"isLoading_mark\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n      <div class=\"empty_info\" *ngIf=\"!isLoading_mark && isMarkEmpty\">\n        You have no Marks. Please add one <i class=\"fa fa-smile-o\"></i>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal update-school component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-school-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-school-modalLabel\"\n  data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateSchoolForm=\"ngForm\" (ngSubmit)=\"updateSchoolSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update School</legend>\n              <div class=\"form-group\">\n                <label for=\"schoolName\" class=\"col-md-3 control-label\">School Name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"schoolName\" [(ngModel)]=\"_school_name\" required minlength=\"6\" name=\"schoolName\"\n                    placeholder=\"School name\" #schoolName=\"ngModel\">\n                  <div *ngIf=\"schoolName.errors && (schoolName.dirty || schoolName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!schoolName.errors.required\">\n                      School Name is required\n                    </div>\n                    <div [hidden]=\"!schoolName.errors.minlength\">\n                      School Name must be at least 6 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"city\" class=\"col-md-3 control-label\">City</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"city\" [(ngModel)]=\"_city\" required name=\"city\" placeholder=\"City\" #city=\"ngModel\">\n                  <div *ngIf=\"city.errors && (city.dirty || city.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!city.errors.required\">\n                      City is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"state\" class=\"col-md-3 control-label\">State</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"state\" [(ngModel)]=\"_state\" required name=\"state\" placeholder=\"State\" #state=\"ngModel\">\n                  <div *ngIf=\"state.errors && (state.dirty || state.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!state.errors.required\">\n                      State is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"country\" class=\"col-md-3 control-label\">Country</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"country\" [(ngModel)]=\"_country\" required name=\"country\" placeholder=\"Country\"\n                    #country=\"ngModel\">\n                  <div *ngIf=\"country.errors && (country.dirty || country.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!country.errors.required\">\n                      Country is required\n                    </div>\n                  </div>\n                </div>\n                <div class=\"button-on-update\">\n                  <input type=\"submit\" [disabled]=\"!updateSchoolForm.form.valid || updateSchoolForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal update-degree component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-degree-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-degree-modalLabel\"\n  data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateDegreeForm=\"ngForm\" (ngSubmit)=\"updateDegreeSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update Degree</legend>\n              <div class=\"form-group\">\n                <label for=\"degreeName\" class=\"col-md-3 control-label\">Degree name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"degreeName\" [(ngModel)]=\"_degree_name\" required minlength=\"6\" name=\"degreeName\"\n                    placeholder=\"Degree name\" #degreeName=\"ngModel\">\n                  <div *ngIf=\"degreeName.errors && (degreeName.dirty || degreeName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!degreeName.errors.required\">\n                      Degree Name is required\n                    </div>\n                    <div [hidden]=\"!degreeName.errors.minlength\">\n                      Degree Name must be at least 6 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"duration\" class=\"col-md-3 control-label\">Duration (years)</label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"duration\" [(ngModel)]=\"_duration\" required name=\"duration\" placeholder=\"Duration\"\n                    #duration=\"ngModel\">\n                  <div *ngIf=\"duration.errors && (duration.dirty || duration.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!duration.errors.required\">\n                      Duration is required\n                    </div>\n                  </div>\n                  <div class=\"button-on-update\">\n                    <input type=\"submit\" [disabled]=\"!updateDegreeForm.form.valid || updateDegreeForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                  </div>\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal update-mark component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-mark-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-mark-modalLabel\"\n  data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateMarkForm=\"ngForm\" (ngSubmit)=\"updateMarkSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update Mark</legend>\n\n              <div class=\"form-group\">\n                <label for=\"subjectName\" class=\"col-md-3 control-label\">Subject name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"subjectName\" [(ngModel)]=\"_subject_name\" required name=\"subjectName\" placeholder=\"Subject name\"\n                    #subjectName=\"ngModel\">\n                  <div *ngIf=\"subjectName.errors && (subjectName.dirty || subjectName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!subjectName.errors.required\">\n                      School Name is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"subjectCode\" class=\"col-md-3 control-label\">Subject code</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"subjectCode\" [(ngModel)]=\"_subject_code\" required name=\"subjectCode\" placeholder=\"Subject code\"\n                    #subjectCode=\"ngModel\">\n                  <div *ngIf=\"subjectCode.errors && (subjectCode.dirty || subjectCode.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!subjectCode.errors.required\">\n                      Subject Code is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"semester\" class=\"col-md-3 control-label\">Semester </label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"semester\" [(ngModel)]=\"_semester\" required name=\"semester\" placeholder=\"Semester\"\n                    #semester=\"ngModel\">\n                  <div *ngIf=\"semester.errors && (semester.dirty || semester.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!semester.errors.required\">\n                      Semester is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"yearLevel\" class=\"col-md-3 control-label\">Year Level</label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"yearLevel\" [(ngModel)]=\"_year_level\" required name=\"yearLevel\" placeholder=\"Year level\"\n                    #yearLevel=\"ngModel\">\n                  <div *ngIf=\"yearLevel.errors && (yearLevel.dirty || yearLevel.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!yearLevel.errors.required\">\n                      Year Level is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"mark\" class=\"col-md-3 control-label\">Mark </label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"mark\" [(ngModel)]=\"_mark\" required name=\"mark\" placeholder=\"Mark\" #mark=\"ngModel\">\n                  <div *ngIf=\"mark.errors && (mark.dirty || mark.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!mark.errors.required\">\n                      Mark is required\n                    </div>\n                  </div>\n                  <div class=\"button-on-update\">\n                    <input type=\"submit\" [disabled]=\"!updateMarkForm.form.valid || updateMarkForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                  </div>\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-backdrop=\"static\"\n  data-keyboard=\"false\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal add-mark component-->\n<div class=\"modal bs-example-modal-lg\" id=\"addMark\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Label\" data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <app-user-mark></app-user-mark>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 557:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-9 col-sm-9 col-xs-9\">\n  <ol class=\"breadcrumb\">\n    <li><a href=\"/dashboard\">Dashboard</a></li>\n    <li class=\"active\">Study Console</li>\n  </ol>\n  <div class=\"panel panel-default\">\n    <!-- Default panel contents -->\n    <!--<div class=\"panel-heading\">Academic Management</div>-->\n    <div class=\"panel-body\">\n      <input type=\"submit\" class=\"btn btn-primary\" (click)=\"addSchoolTab()\" value=\"Add School\">\n      <input type=\"submit\" class=\"btn btn-primary\" (click)=\"addDegreeTab()\" value=\"Add Degree\" [disabled]=\"disable_degree_button || isSchoolEmpty\">\n      <input type=\"submit\" class=\"btn btn-primary\" (click)=\"addMarkTab()\" value=\"Add Mark\" [disabled]=\"disable_mark_button || isDegreeEmpty\">\n    </div>\n    <i *ngIf=\"isLoading_school\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n    <div class=\"empty_info\" *ngIf=\"!isLoading_school && isSchoolEmpty\">\n      You have no Schools. Please add one <i class=\"fa fa-smile-o\"></i>\n    </div>\n    <div class=\"school panel panel-default\" *ngFor=\"let school of schools\">\n      <div class=\"school panel-heading col-md-12 col-sm-12 col-xs-12\">\n        <div class=\"col-md-8 col-xs-12\">\n          {{school.school_name}}\n          <h5>{{school.city}}, {{school.state}}, {{school.country}}</h5>\n        </div>\n        <div class=\"col-md-4 col-xs-12 text-right\">\n          <input type=\"submit\" class=\"btn btn-info\" (click)=\"updateSchool(school)\" value=\"Edit\">\n          <input type=\"submit\" class=\"btn btn-danger\" (click)=\"deleteSchool(school)\" value=\"Delete\">\n        </div>\n      </div>\n      <i *ngIf=\"isLoading_degree\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n      <div class=\"empty_info\" *ngIf=\"!isLoading_degree && (isDegreeEmpty || (degrees | groupDegreeBySchool: school._id).length == 0)\">\n        You have no Degrees. Please add one <i class=\"fa fa-smile-o\"></i>\n      </div>\n      <div class=\"degree panel-body\" *ngFor=\"let degree of (degrees | groupDegreeBySchool: school._id);\">\n        <div class=\"col-md-8\">\n          <strong>{{degree.degree_name}}</strong> - {{degree.duration}} years\n        </div>\n        <div class=\"col-md-4 text-right\">\n          <input type=\"submit\" class=\"btn btn-primary\" (click)=\"showDetail(school, degree)\" value=\"Show marks\">\n          <input type=\"submit\" class=\"btn btn-info\" (click)=\"updateDegree(degree)\" value=\"Edit\">\n          <input type=\"submit\" class=\"btn btn-danger\" (click)=\"deleteDegree(degree)\" value=\"Delete\">\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal update-school component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-school-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-school-modalLabel\"\n  data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateSchoolForm=\"ngForm\" (ngSubmit)=\"updateSchoolSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update School</legend>\n              <div class=\"form-group\">\n                <label for=\"schoolName\" class=\"col-md-3 control-label\">School Name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"schoolName\" [(ngModel)]=\"_school_name\" required minlength=\"6\" name=\"schoolName\"\n                    placeholder=\"School name\" #schoolName=\"ngModel\">\n                  <div *ngIf=\"schoolName.errors && (schoolName.dirty || schoolName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!schoolName.errors.required\">\n                      School Name is required\n                    </div>\n                    <div [hidden]=\"!schoolName.errors.minlength\">\n                      School Name must be at least 6 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"city\" class=\"col-md-3 control-label\">City</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"city\" [(ngModel)]=\"_city\" required name=\"city\" placeholder=\"City\" #city=\"ngModel\">\n                  <div *ngIf=\"city.errors && (city.dirty || city.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!city.errors.required\">\n                      City is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"state\" class=\"col-md-3 control-label\">State</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"state\" [(ngModel)]=\"_state\" required name=\"state\" placeholder=\"State\" #state=\"ngModel\">\n                  <div *ngIf=\"state.errors && (state.dirty || state.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!state.errors.required\">\n                      State is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"country\" class=\"col-md-3 control-label\">Country</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"country\" [(ngModel)]=\"_country\" required name=\"country\" placeholder=\"Country\"\n                    #country=\"ngModel\">\n                  <div *ngIf=\"country.errors && (country.dirty || country.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!country.errors.required\">\n                      Country is required\n                    </div>\n                  </div>\n                </div>\n                <div class=\"button\">\n                  <input type=\"submit\" [disabled]=\"!updateSchoolForm.form.valid || updateSchoolForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal update-degree component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-degree-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-degree-modalLabel\"\n  data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateDegreeForm=\"ngForm\" (ngSubmit)=\"updateDegreeSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update Degree</legend>\n\n              <div class=\"form-group\">\n                <label for=\"degreeName\" class=\"col-md-3 control-label\">Degree name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"degreeName\" [(ngModel)]=\"_degree_name\" required minlength=\"6\" name=\"degreeName\"\n                    placeholder=\"Degree name\" #degreeName=\"ngModel\">\n                  <div *ngIf=\"degreeName.errors && (degreeName.dirty || degreeName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!degreeName.errors.required\">\n                      Degree Name is required\n                    </div>\n                    <div [hidden]=\"!degreeName.errors.minlength\">\n                      Degree Name must be at least 6 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"duration\" class=\"col-md-3 control-label\">Duration (years)</label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"duration\" [(ngModel)]=\"_duration\" required name=\"duration\" placeholder=\"Duration\"\n                    #duration=\"ngModel\">\n                  <div *ngIf=\"duration.errors && (duration.dirty || duration.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!duration.errors.required\">\n                      Duration is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label class=\"col-md-3 control-label\">School</label>\n                <div class=\"col-md-8 text-left\">\n                  <div class=\"radio\" *ngFor=\"let school of schools\">\n                    <label>\n                      <input type=\"radio\" name=\"option\" name=\"school\" value=\"{{school._id}}\" [(ngModel)]=\"_school_id_degree\">\n                      {{school.school_name}}\n                    </label>\n                  </div>\n                </div>\n                <div class=\"button\">\n                  <input type=\"submit\" [disabled]=\"!updateDegreeForm.form.valid || updateDegreeForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-backdrop=\"static\"\n  data-keyboard=\"false\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal add-school component-->\n<div class=\"modal bs-example-modal-lg\" id=\"addSchool\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Label\" data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times fa-2x\" aria-hidden=\"true\"></i></button>\n        <app-user-school></app-user-school>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal add-degree component-->\n<div class=\"modal bs-example-modal-lg\" id=\"addDegree\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Label\" data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times fa-2x\" aria-hidden=\"true\"></i></button>\n        <app-user-degree></app-user-degree>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal add-mark component-->\n<div class=\"modal bs-example-modal-lg\" id=\"addMark\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Label\" data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times fa-2x\" aria-hidden=\"true\"></i></button>\n        <app-user-mark></app-user-mark>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 558:
/***/ (function(module, exports) {

module.exports = "<!-- Default panel contents -->\n<div class=\"panel panel-default col-md-12 col-sm-12 col-xs-12\">\n  <div class=\"school panel-heading col-md-5 col-sm-12 col-xs-12\">\n    <div class=\"col-md-10 col-sm-10 col-xs-10\">\n      {{school.school_name}}\n      <h5>{{school.city}}, {{school.state}}, {{school.country}}</h5>\n    </div>\n    <div class=\"edit col-md-2 col-sm-2 col-xs-2\">\n      <i (click)=\"updateSchool()\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\n    </div>\n  </div>\n  <div class=\"degree panel-heading col-md-6 col-sm-12 col-xs-12\">\n    <div class=\"col-md-10 col-sm-10 col-xs-10\">\n      {{degree.degree_name}}\n      <h5>{{degree.duration}} years</h5>\n    </div>\n    <div class=\"edit col-md-2 col-sm-2 col-xs-2\">\n      <i (click)=\"updateDegree()\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\n    </div>\n  </div>\n\n  <div class=\"panel-body col-md-12 col-sm-12 col-xs-12\">\n    <!-- Table -->\n    <div class=\"table-responsive\">\n      <table class=\"table table-striped table-hover \">\n        <thead>\n          <tr>\n            <th>#</th>\n            <th class=\"col-md-3\">Subject Name</th>\n            <th>Subject Code</th>\n            <th>Mark</th>\n            <th>Sem/Year</th>\n            <th class=\"button text-right\">\n              <input type=\"submit\" class=\"btn btn-info\" (click)=\"addMarkTab()\" value=\"Add\">\n            </th>\n          </tr>\n        </thead>\n        <tbody *ngIf=\"marks\">\n          <tr class=\"text-left\" *ngFor=\"let mark of marks | orderBy; let i = index;\">\n            <td>{{i+1}}</td>\n            <td class=\"col-md-3\">{{mark.subject_name}}</td>\n            <td>{{mark.subject_code}}</td>\n            <td>{{mark.mark}}</td>\n            <td>Sem {{mark.semester}}, Year {{mark.year_level}}</td>\n            <td class=\"button text-right\">\n              <input type=\"submit\" class=\"btn btn-primary\" value=\"Update\" (click)=\"updateMark(mark)\">\n              <input type=\"submit\" class=\"btn btn-danger\" value=\"Delete\" (click)=\"deleteMark(mark)\">\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <i *ngIf=\"isLoading_mark\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n    <div class=\"empty_info\" *ngIf=\"!isLoading_mark && isMarkEmpty\">\n      You have no Marks. Please add one <i class=\"fa fa-smile-o\"></i>\n    </div>\n  </div>\n</div>\n\n\n<!--modal update-school component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-school-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-school-modalLabel\"\n  data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateSchoolForm=\"ngForm\" (ngSubmit)=\"updateSchoolSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update School</legend>\n              <div class=\"form-group\">\n                <label for=\"schoolName\" class=\"col-md-3 control-label\">School Name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"schoolName\" [(ngModel)]=\"_school_name\" required minlength=\"6\" name=\"schoolName\"\n                    placeholder=\"School name\" #schoolName=\"ngModel\">\n                  <div *ngIf=\"schoolName.errors && (schoolName.dirty || schoolName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!schoolName.errors.required\">\n                      School Name is required\n                    </div>\n                    <div [hidden]=\"!schoolName.errors.minlength\">\n                      School Name must be at least 6 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"city\" class=\"col-md-3 control-label\">City</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"city\" [(ngModel)]=\"_city\" required name=\"city\" placeholder=\"City\" #city=\"ngModel\">\n                  <div *ngIf=\"city.errors && (city.dirty || city.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!city.errors.required\">\n                      City is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"state\" class=\"col-md-3 control-label\">State</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"state\" [(ngModel)]=\"_state\" required name=\"state\" placeholder=\"State\" #state=\"ngModel\">\n                  <div *ngIf=\"state.errors && (state.dirty || state.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!state.errors.required\">\n                      State is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"country\" class=\"col-md-3 control-label\">Country</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"country\" [(ngModel)]=\"_country\" required name=\"country\" placeholder=\"Country\"\n                    #country=\"ngModel\">\n                  <div *ngIf=\"country.errors && (country.dirty || country.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!country.errors.required\">\n                      Country is required\n                    </div>\n                  </div>\n                </div>\n                <div class=\"button-on-update\">\n                  <input type=\"submit\" [disabled]=\"!updateSchoolForm.form.valid || updateSchoolForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal update-degree component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-degree-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-degree-modalLabel\"\n  data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateDegreeForm=\"ngForm\" (ngSubmit)=\"updateDegreeSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update Degree</legend>\n              <div class=\"form-group\">\n                <label for=\"degreeName\" class=\"col-md-3 control-label\">Degree name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"degreeName\" [(ngModel)]=\"_degree_name\" required minlength=\"6\" name=\"degreeName\"\n                    placeholder=\"Degree name\" #degreeName=\"ngModel\">\n                  <div *ngIf=\"degreeName.errors && (degreeName.dirty || degreeName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!degreeName.errors.required\">\n                      Degree Name is required\n                    </div>\n                    <div [hidden]=\"!degreeName.errors.minlength\">\n                      Degree Name must be at least 6 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"duration\" class=\"col-md-3 control-label\">Duration (years)</label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"duration\" [(ngModel)]=\"_duration\" required name=\"duration\" placeholder=\"Duration\"\n                    #duration=\"ngModel\">\n                  <div *ngIf=\"duration.errors && (duration.dirty || duration.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!duration.errors.required\">\n                      Duration is required\n                    </div>\n                  </div>\n                  <div class=\"button-on-update\">\n                    <input type=\"submit\" [disabled]=\"!updateDegreeForm.form.valid || updateDegreeForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                  </div>\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal update-mark component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-mark-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-mark-modalLabel\"\n  data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateMarkForm=\"ngForm\" (ngSubmit)=\"updateMarkSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update Mark</legend>\n\n              <div class=\"form-group\">\n                <label for=\"subjectName\" class=\"col-md-3 control-label\">Subject name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"subjectName\" [(ngModel)]=\"_subject_name\" required name=\"subjectName\" placeholder=\"Subject name\"\n                    #subjectName=\"ngModel\">\n                  <div *ngIf=\"subjectName.errors && (subjectName.dirty || subjectName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!subjectName.errors.required\">\n                      School Name is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"subjectCode\" class=\"col-md-3 control-label\">Subject code</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"subjectCode\" [(ngModel)]=\"_subject_code\" required name=\"subjectCode\" placeholder=\"Subject code\"\n                    #subjectCode=\"ngModel\">\n                  <div *ngIf=\"subjectCode.errors && (subjectCode.dirty || subjectCode.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!subjectCode.errors.required\">\n                      Subject Code is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"semester\" class=\"col-md-3 control-label\">Semester </label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"semester\" [(ngModel)]=\"_semester\" required name=\"semester\" placeholder=\"Semester\"\n                    #semester=\"ngModel\">\n                  <div *ngIf=\"semester.errors && (semester.dirty || semester.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!semester.errors.required\">\n                      Semester is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"yearLevel\" class=\"col-md-3 control-label\">Year Level</label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"yearLevel\" [(ngModel)]=\"_year_level\" required name=\"yearLevel\" placeholder=\"Year level\"\n                    #yearLevel=\"ngModel\">\n                  <div *ngIf=\"yearLevel.errors && (yearLevel.dirty || yearLevel.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!yearLevel.errors.required\">\n                      Year Level is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"mark\" class=\"col-md-3 control-label\">Mark </label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"mark\" [(ngModel)]=\"_mark\" required name=\"mark\" placeholder=\"Mark\" #mark=\"ngModel\">\n                  <div *ngIf=\"mark.errors && (mark.dirty || mark.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!mark.errors.required\">\n                      Mark is required\n                    </div>\n                  </div>\n                  <div class=\"button-on-update\">\n                    <input type=\"submit\" [disabled]=\"!updateMarkForm.form.valid || updateMarkForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                  </div>\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-backdrop=\"static\"\n  data-keyboard=\"false\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal add-mark component-->\n<div class=\"modal bs-example-modal-lg\" id=\"addMark\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Label\" data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <app-user-mark></app-user-mark>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 559:
/***/ (function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\n  <!-- Default panel contents -->\n  <!--<div class=\"panel-heading\">Academic Management</div>-->\n  <div class=\"panel-body\">\n    <input type=\"submit\" class=\"btn btn-primary\" (click)=\"addSchoolTab()\" value=\"Add School\">\n    <input type=\"submit\" class=\"btn btn-primary\" (click)=\"addDegreeTab()\" value=\"Add Degree\" [disabled]=\"disable_degree_button || isSchoolEmpty\">\n    <input type=\"submit\" class=\"btn btn-primary\" (click)=\"addMarkTab()\" value=\"Add Mark\" [disabled]=\"disable_mark_button || isDegreeEmpty\">\n  </div>\n  <i *ngIf=\"isLoading_school\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n  <div class=\"empty_info\" *ngIf=\"!isLoading_school && isSchoolEmpty\">\n    You have no Schools. Please add one <i class=\"fa fa-smile-o\"></i>\n  </div>\n  <div class=\"school panel panel-default\" *ngFor=\"let school of schools; let school_i = index\">\n    <div class=\"school panel-heading col-md-12 col-sm-12 col-xs-12\">\n      <div class=\"col-md-8 col-xs-12\">\n        {{school.school_name}}\n        <h5>{{school.city}}, {{school.state}}, {{school.country}}</h5>\n      </div>\n      <div class=\"col-md-4 col-xs-12 text-right\">\n        <input type=\"submit\" class=\"btn btn-info\" (click)=\"updateSchool(school)\" value=\"Edit\">\n        <input type=\"submit\" class=\"btn btn-danger\" (click)=\"deleteSchool(school)\" value=\"Delete\">\n      </div>\n    </div>\n    <i *ngIf=\"isLoading_degree\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n    <div class=\"empty_info\" *ngIf=\"!isLoading_degree && (isDegreeEmpty || (degrees | groupDegreeBySchool: school._id).length == 0)\">\n      You have no Degrees. Please add one <i class=\"fa fa-smile-o\"></i>\n    </div>\n    <div class=\"degree panel-body\" *ngFor=\"let degree of (degrees | groupDegreeBySchool: school._id);let degree_i = index\">\n      <div class=\"col-md-6\">\n        <strong>{{degree.degree_name}}</strong> - {{degree.duration}} years\n      </div>\n      <div class=\"col-md-6 text-right\">\n        <input type=\"submit\" class=\"btn btn-primary\" (click)=\"showDetail(school, degree)\" value=\"Show marks\">\n        <input type=\"submit\" class=\"btn btn-info\" (click)=\"updateDegree(degree)\" value=\"Edit\">\n        <input type=\"submit\" class=\"btn btn-danger\" (click)=\"deleteDegree(degree)\" value=\"Delete\">\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal update-school component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-school-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-school-modalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateSchoolForm=\"ngForm\" (ngSubmit)=\"updateSchoolSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update School</legend>\n              <div class=\"form-group\">\n                <label for=\"schoolName\" class=\"col-md-3 control-label\">School Name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"schoolName\" [(ngModel)]=\"_school_name\" required minlength=\"6\" name=\"schoolName\"\n                    placeholder=\"School name\" #schoolName=\"ngModel\">\n                  <div *ngIf=\"schoolName.errors && (schoolName.dirty || schoolName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!schoolName.errors.required\">\n                      School Name is required\n                    </div>\n                    <div [hidden]=\"!schoolName.errors.minlength\">\n                      School Name must be at least 6 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"city\" class=\"col-md-3 control-label\">City</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"city\" [(ngModel)]=\"_city\" required name=\"city\" placeholder=\"City\" #city=\"ngModel\">\n                  <div *ngIf=\"city.errors && (city.dirty || city.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!city.errors.required\">\n                      City is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"state\" class=\"col-md-3 control-label\">State</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"state\" [(ngModel)]=\"_state\" required name=\"state\" placeholder=\"State\" #state=\"ngModel\">\n                  <div *ngIf=\"state.errors && (state.dirty || state.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!state.errors.required\">\n                      State is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"country\" class=\"col-md-3 control-label\">Country</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"country\" [(ngModel)]=\"_country\" required name=\"country\" placeholder=\"Country\"\n                    #country=\"ngModel\">\n                  <div *ngIf=\"country.errors && (country.dirty || country.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!country.errors.required\">\n                      Country is required\n                    </div>\n                  </div>\n                </div>\n                <div class=\"button\">\n                  <input type=\"submit\" [disabled]=\"!updateSchoolForm.form.valid || updateSchoolForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal update-degree component-->\n<div class=\"modal bs-example-modal-sm\" id=\"update-degree-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"update-degree-modalLabel\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n      </div>\n      <div class=\"modal-body text-center\">\n        <div class=\"well bs-component\">\n          <form #updateDegreeForm=\"ngForm\" (ngSubmit)=\"updateDegreeSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n              <legend>Update Degree</legend>\n\n              <div class=\"form-group\">\n                <label for=\"degreeName\" class=\"col-md-3 control-label\">Degree name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"degreeName\" [(ngModel)]=\"_degree_name\" required minlength=\"6\" name=\"degreeName\"\n                    placeholder=\"Degree name\" #degreeName=\"ngModel\">\n                  <div *ngIf=\"degreeName.errors && (degreeName.dirty || degreeName.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!degreeName.errors.required\">\n                      Degree Name is required\n                    </div>\n                    <div [hidden]=\"!degreeName.errors.minlength\">\n                      Degree Name must be at least 6 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label for=\"duration\" class=\"col-md-3 control-label\">Duration (years)</label>\n                <div class=\"col-md-8\">\n                  <input type=\"number\" class=\"form-control\" id=\"duration\" [(ngModel)]=\"_duration\" required name=\"duration\" placeholder=\"Duration\"\n                    #duration=\"ngModel\">\n                  <div *ngIf=\"duration.errors && (duration.dirty || duration.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!duration.errors.required\">\n                      Duration is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n\n              <div class=\"form-group\">\n                <label class=\"col-md-3 control-label\">School</label>\n                <div class=\"col-md-8 text-left\">\n                  <div class=\"radio\" *ngFor=\"let school of schools\">\n                    <label>\n                      <input type=\"radio\" name=\"option\" name=\"school\" value=\"{{school._id}}\" [(ngModel)]=\"_school_id_degree\">\n                      {{school.school_name}}\n                    </label>\n                  </div>\n                </div>\n                <div class=\"button\">\n                  <input type=\"submit\" [disabled]=\"!updateDegreeForm.form.valid || updateDegreeForm.pristine\" class=\"btn btn-primary\" value=\"Update\">\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-backdrop=\"static\"\n  data-keyboard=\"false\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal add-school component-->\n<div class=\"modal bs-example-modal-lg\" id=\"addSchool\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Label\" data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <app-user-school></app-user-school>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal add-degree component-->\n<div class=\"modal bs-example-modal-lg\" id=\"addDegree\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Label\" data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <app-user-degree></app-user-degree>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal add-mark component-->\n<div class=\"modal bs-example-modal-lg\" id=\"addMark\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Label\" data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <app-user-mark></app-user-mark>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 560:
/***/ (function(module, exports) {

module.exports = "<legend class=\"text-center\">Update Permission [<strong> {{_username}} </strong>]</legend>\n<form #updatePermissionForm=\"ngForm\" *ngIf=\"active\" (ngSubmit)=\"updatePermissionSubmit()\" class=\"form-horizontal\">\n  <fieldset>\n    <div class=\"form-group\">\n      <label class=\"col-md-5 col-sm-6 col-xs-6 control-label text-right\">Type</label>\n      <div class=\"col-md-7 col-sm-6 col-xs-6\">\n        <div class=\"radio\">\n          <label>\n          <input type=\"radio\" name=\"option\" id=\"adminOption\" value=\"admin\" [(ngModel)]=\"_type\">\n          Admin\n          </label>\n        </div>\n        <div class=\"radio\">\n          <label>\n            <input type=\"radio\" name=\"option\" id=\"staffOption\" value=\"staff\" [(ngModel)]=\"_type\">\n            Staff\n            </label>\n        </div>\n        <div class=\"radio\">\n          <label>\n            <input type=\"radio\" name=\"option\" id=\"memberOption\" value=\"member\" [(ngModel)]=\"_type\">\n            Member\n            </label>\n        </div>\n      </div>\n    </div>\n    <div class=\"form-group\">\n      <label class=\"col-md-5 col-sm-6 col-xs-6 control-label text-right\">Update Profile</label>\n      <div class=\"col-md-7 col-sm-6 col-xs-6\">\n        <label class=\"switch\">\n          <input type=\"checkbox\" id=\"canUpdateProfile\" name=\"canUpdateProfile\" [(ngModel)]=\"_canUpdateProfile\">\n          <div class=\"slider round\"></div>\n        </label>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"col-md-5 col-sm-6 col-xs-6 control-label text-right\">Update Password</label>\n      <div class=\"col-md-7 col-sm-6 col-xs-6\">\n        <label class=\"switch\">\n          <input type=\"checkbox\" id=\"canUpdatePassword\" name=\"canUpdatePassword\" [(ngModel)]=\"_canUpdatePassword\">\n          <div class=\"slider round\"></div>\n        </label>\n      </div>\n    </div>\n\n    <div class=\"form-group\">\n      <label class=\"col-md-5 col-sm-6 col-xs-6 control-label text-right\">Manage Studie</label>\n      <div class=\"col-md-7 col-sm-6 col-xs-6\">\n        <label class=\"switch\">\n          <input type=\"checkbox\" id=\"canStudie\" name=\"canStudie\" [(ngModel)]=\"_canStudie\">\n          <div class=\"slider round\"></div>\n        </label>\n      </div>\n    </div>\n\n    <div class=\"button\">\n      <input type=\"submit\" [disabled]=\"!updatePermissionForm.form.valid || updatePermissionForm.pristine\" class=\"btn btn-primary\" value=\"Save\">\n    </div>\n  </fieldset>\n</form>\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"myModal1\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-backdrop=\"static\"\n  data-keyboard=\"false\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 561:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-9 col-sm-9 col-xs-9\">\n  <ol class=\"breadcrumb\">\n    <li><a href=\"/dashboard\">Dashboard</a></li>\n    <li><a href=\"/admin/user-mgmt\">Admin - User Management</a></li>\n    <li class=\"active\">Profile [{{_username}}]</li>\n  </ol>\n  <div class=\"panel-body\">\n    <div class=\"tab col-md-4\">\n      <ul>\n        <input type=\"submit\" class=\"btn btn-primary\" (click)=\"back()\" value=\"Back\">\n        <hr>\n        <li class=\"active\">\n          <a href=\"#accountOverview\" aria-controls=\"accountOverview\" role=\"tab\" data-toggle=\"tab\" (click)=\"disableEdit()\">Account Overview</a>\n        </li>\n        <hr>\n        <li>\n          <a href=\"#updateProfile\" aria-controls=\"updateProfile\" role=\"tab\" data-toggle=\"tab\" (click)=\"disableEdit()\">Update Profile</a>\n        </li>\n        <hr>\n        <li>\n          <a href=\"#updatePassword\" aria-controls=\"updatePassword\" role=\"tab\" data-toggle=\"tab\" (click)=\"disableEdit()\">Update Password</a>\n        </li>\n        <hr>\n        <li>\n          <a href=\"#academicData\" aria-controls=\"academicData\" role=\"tab\" data-toggle=\"tab\" (click)=\"disableEdit()\">Academic Data</a>\n        </li>\n        <hr>\n        <li>\n          <a href=\"#updatePermission\" aria-controls=\"updatePermission\" role=\"tab\" data-toggle=\"tab\" (click)=\"disableEdit()\">Update Permission</a>\n        </li>\n        <hr>\n      </ul>\n    </div>\n    <div class=\"col-md-8 col-sm-12 col-xs-12\">\n      <div class=\"tab-content\">\n        <div class=\"tab-pane active\" id=\"accountOverview\">\n          <legend class=\"text-center\">User Overview [<strong>{{_username}}</strong>]</legend>\n          <div class=\"img col-md-3 col-sm-3\">\n            <img src=\"../../../assets/images/user.png\" height=\"100%\"\n              width=\"100%\">\n          </div>\n          <div class=\"info col-md-9 col-sm-9 col-xs-12\">\n            <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n              <h5>Username</h5>\n            </div>\n            <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n              <h5>{{_username}} </h5>\n            </div>\n            <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n              <h5>Full Name</h5>\n            </div>\n            <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n              <h5>{{_name}} </h5>\n            </div>\n            <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n              <h5>Date of Birth</h5>\n            </div>\n            <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n              <h5>{{_dob}} </h5>\n            </div>\n            <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n              <h5>Email</h5>\n            </div>\n            <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n              <h5>{{_email}} </h5>\n            </div>\n            <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n              <h5>Phone Number</h5>\n            </div>\n            <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n              <h5>{{_phone}} </h5>\n            </div>\n            <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n              <h5>Type</h5>\n            </div>\n            <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n              <h5 style=\"border: 2px solid black; display: inline-block;padding: 7px;\">{{_type}} </h5>\n            </div>\n          </div>\n        </div>\n        <div class=\"tab-pane\" id=\"updateProfile\">\n          <form class=\"form-horizontal\" #updateProfileForm=\"ngForm\" (ngSubmit)=\"updateProfile()\">\n            <fieldset>\n              <legend class=\"text-center\">Update Profile [<strong>{{_username}}</strong>]</legend>\n              <div class=\"form-group\">\n                <label for=\"name\" class=\"col-md-4 control-label\">Full Name</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Full name\" required minlength=\"1\" maxlength=\"24\" name=\"name\"\n                    [(ngModel)]=\"_name\" #name=\"ngModel\" [disabled]=\"!edit_profile\">\n                  <div *ngIf=\"name.errors && (name.dirty || name.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!name.errors.required\">\n                      Name is required\n                    </div>\n                    <div [hidden]=\"!name.errors.minlength\">\n                      Name must be at least 1 characters long.\n                    </div>\n                    <div [hidden]=\"!name.errors.maxlength\">\n                      Name cannot be more than 24 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"dob\" class=\"col-md-4 control-label\">Date Of Birth</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"dob\" placeholder=\"Date of Birth\" required name=\"dob\" [(ngModel)]=\"_dob\" #dob=\"ngModel\"\n                    [disabled]=\"!edit_profile\">\n                  <div *ngIf=\"dob.errors && (dob.dirty || dob.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!dob.errors.required\">\n                      Date of Birth is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"email\" class=\"col-md-4 control-label\">Email</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"email\" placeholder=\"Email\" required name=\"email\" [(ngModel)]=\"_email\" #email=\"ngModel\"\n                    [disabled]=\"!edit_profile\">\n                  <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!email.errors.required\">\n                      Email is required\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"phone\" class=\"col-md-4 control-label\">Phone Number</label>\n                <div class=\"col-md-8\">\n                  <input type=\"text\" class=\"form-control\" id=\"phone\" placeholder=\"Phone number\" required name=\"phone\" [(ngModel)]=\"_phone\"\n                    #phone=\"ngModel\" [disabled]=\"!edit_profile\">\n                  <a data-toggle=\"tooltip\" title=\"\n                                            <h6>Examples</h6>\n                                            <p>(123) 456-7890</p>\n                                            <p>123-456-7890</p>\n                                            <p>123.456.7890</p>\n                                            <p>1234567890</p>\n                                            <p>+31636363634</p>\n                                            <p>075-63546725</p>\" data-html=\"true\" data-placement=\"right\">Hover over me</a>\n                  <div *ngIf=\"phone.errors && (phone.dirty || phone.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!phone.errors.required\">\n                      Phone is required\n                    </div>\n                  </div>\n                  <br>\n                  <button class=\"btn btn-info\" (click)=\"editProfile()\" [disabled]=\"edit_profile\">Edit</button>\n                  <input type=\"submit\" [disabled]=\"!updateProfileForm.form.valid || updateProfileForm.pristine\" class=\"btn btn-primary\" value=\"Save\">\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n        <div class=\"tab-pane\" id=\"updatePassword\">\n          <form class=\"form-horizontal\" #updatePasswordForm=\"ngForm\" (ngSubmit)=\"updatePassword()\">\n            <fieldset>\n              <legend class=\"text-center\">Update Password [<strong>{{_username}}</strong>]</legend>\n              <div class=\"form-group\">\n                <label for=\"newPassword\" class=\"col-md-4 control-label\">New Password</label>\n                <div class=\"col-md-8\">\n                  <input type=\"password\" class=\"form-control\" id=\"newPassword\" placeholder=\"New Password\" required minlength=\"6\" maxlength=\"20\"\n                    name=\"newPassword\" [(ngModel)]=\"_newPassword\" #newPassword=\"ngModel\">\n                  <div *ngIf=\"newPassword.errors && (newPassword.dirty || newPassword.touched)\" class=\"custom_alert\">\n                    <div [hidden]=\"!newPassword.errors.required\">\n                      Password is required\n                    </div>\n                    <div [hidden]=\"!newPassword.errors.minlength\">\n                      Password must be at least 6 characters long.\n                    </div>\n                    <div [hidden]=\"!newPassword.errors.maxlength\">\n                      Password cannot be more than 20 characters long.\n                    </div>\n                  </div>\n                </div>\n              </div>\n              <div class=\"form-group\">\n                <label for=\"confirmNewPassword\" class=\"col-md-4 control-label\">Re-type</label>\n                <div class=\"col-md-8\">\n                  <input type=\"password\" class=\"form-control\" id=\"confirmNewPassword\" placeholder=\"Re-type New Password\" required name=\"confirmNewPassword\"\n                    [(ngModel)]=\"_confirmNewPassword\" #confirmNewPassword=\"ngModel\">\n                  <div *ngIf=\"!isPasswordMatch\" class=\"custom_alert\">\n                    Password does not match\n                  </div>\n                  <br>\n                  <input type=\"submit\" [disabled]=\"!updatePasswordForm.form.valid\" class=\"btn btn-primary\" value=\"Update\">\n                </div>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n        <div class=\"tab-pane\" id=\"academicData\">\n          <div *ngIf=\"!getSwitchValue()\">\n            <app-admin-user-mgmt-academic></app-admin-user-mgmt-academic>\n          </div>\n          <div *ngIf=\"getSwitchValue()\">\n            <app-admin-user-mgmt-academic-detail></app-admin-user-mgmt-academic-detail>\n          </div>\n        </div>\n        <div class=\"tab-pane\" id=\"updatePermission\">\n          <app-admin-user-mgmt-permission></app-admin-user-mgmt-permission>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"myModal-aump\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-backdrop=\"static\"\n  data-keyboard=\"false\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 562:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-9 col-sm-9 col-xs-9\">\n  <ol class=\"breadcrumb\">\n    <li><a href=\"/dashboard\">Dashboard</a></li>\n    <li class=\"active\">Admin - User Management</li>\n  </ol>\n  <div class=\"panel panel-default\">\n    <!-- Default panel contents -->\n    <!--<div class=\"panel-heading\">User Management</div>-->\n    <div class=\"panel-body\">\n      <input type=\"text\" placeholder=\"Search\" [(ngModel)]=\"search_query\">\n    </div>\n    <h3 class=\"title\">Enabled Users</h3>\n    <!-- Table -->\n    <div class=\"table-responsive\">\n      <table class=\"table table-striped table-hover \">\n        <thead>\n          <tr>\n            <th>#</th>\n            <th>Username</th>\n            <th>Email</th>\n            <th class=\"button text-right\">\n              <input type=\"submit\" class=\"btn btn-info\" (click)=\"createUserTab()\" value=\"Create New User\" style=\"width: 120px;\">\n            </th>\n          </tr>\n\n        </thead>\n\n        <tbody>\n          <i *ngIf=\"isLoading\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n          <tr *ngFor=\"let user of (users | enabledUsers: _username: search_query.trim()); let i = index;\">\n            <td>{{i+1}}</td>\n            <td>{{user.username}}</td>\n            <td>{{user.email}}</td>\n            <td class=\"button text-right\">\n              <input type=\"submit\" class=\"btn btn-primary\" value=\"Detail or Update\" (click)=\"updateUser(user)\" style=\"width: 120px;\">\n              <input type=\"submit\" class=\"btn btn-info\" (click)=\"enableOrDisableUser(user.username)\" value=\"Disable\">\n              <input type=\"submit\" class=\"btn btn-danger\" (click)=\"deleteUser(user)\" value=\"Delete\">\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <h3 class=\"title\">Disabled Users</h3>\n    <div class=\"table-responsive\">\n      <table class=\"table table-striped table-hover \">\n        <thead>\n          <tr>\n            <th>#</th>\n            <th>Username</th>\n            <th>Email</th>\n            <th>\n            </th>\n          </tr>\n        </thead>\n        <tbody>\n          <i *ngIf=\"isLoading\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n          <tr *ngFor=\"let user of (users | disabledUsers: _username: search_query.trim()); let i = index;\">\n            <td>{{i+1}}</td>\n            <td>{{user.username}}</td>\n            <td>{{user.email}}</td>\n            <td class=\"button text-right\">\n              <input type=\"submit\" class=\"btn btn-primary\" value=\"Detail or Update\" (click)=\"updateUser(user)\" style=\"width: 120px;\">\n              <input type=\"submit\" class=\"btn btn-success\" (click)=\"enableOrDisableUser(user.username)\" value=\"Enable\">\n              <input type=\"submit\" class=\"btn btn-danger\" (click)=\"deleteUser(user)\" value=\"Delete\">\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-backdrop=\"static\"\n  data-keyboard=\"false\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!--modal create-new-user component-->\n<div class=\"modal bs-example-modal-lg\" id=\"createUser\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"Label\" data-backdrop=\"static\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <app-register></app-register>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 563:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-9 col-sm-9 col-xs-9\">\n    <ol class=\"breadcrumb\">\n        <li><a href=\"/dashboard\">Dashboard</a></li>\n        <li class=\"active\">Contact</li>\n    </ol>\n    <div class=\"block col-md-12 col-xs-12\">\n        <div class=\"block-2 col-md-12 col-sm-12 col-xs-12\">\n            <div class=\"col-md-5 col-sm-5 col-xs-12\">\n                <div class=\"block-2-1 text-left\">\n                    <h3>Studie</h3>\n                    <h5>Trung NGUYEN - Administrator</h5>\n                    <h6>Frontend Programmer</h6>\n                    <h6><span class=\"glyphicon glyphicon-envelope\"></span> trungnus96@gmail.com</h6>\n                    <h6><span class=\"glyphicon glyphicon-phone\"></span> (+61) 416 024 875</h6>\n                    <br>\n                    <h5>Get Connected</h5>\n                    <a href=\"https://www.facebook.com/trungnguyenn96\" target=\"_blank\"><i class=\"fa fa-facebook-square fa-2x\" aria-hidden=\"true\"></i></a>\n                    <a href=\"https://www.linkedin.com/in/trung-nguyen-364593b9/\" target=\"_blank\"><i class=\"fa fa-linkedin-square fa-2x\" aria-hidden=\"true\"></i></a>\n                    <a href=\"https://www.instagram.com/trungnguyenn96\" target=\"_blank\"><i class=\"fa fa-instagram fa-2x\" aria-hidden=\"true\"></i></a>\n                </div>\n            </div>\n            <div class=\"col-md-7 col-sm-7 col-xs-12\">\n                <div class=\"block-2-2\">\n                    <form #sendEmailForm=\"ngForm\" *ngIf=\"active\" (ngSubmit)=\"sendEmailSubmit()\" class=\"form-horizontal\">\n                        <fieldset>\n                            <legend class=\"text-center\">Hit Me Up</legend>\n                            <div class=\"form-group\">\n                                <div class=\"col-md-6\">\n                                    <input type=\"text\" class=\"form-control\" id=\"firstName\" placeholder=\"First Name\" name=\"firstName\" [(ngModel)]=\"firstName\">\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <input type=\"text\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\" name=\"lastName\" [(ngModel)]=\"lastName\">\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <div class=\"col-md-6\">\n                                    <input type=\"text\" class=\"form-control\" id=\"email\" placeholder=\"Email\" name=\"email\" [(ngModel)]=\"email\">\n                                </div>\n                                <div class=\"col-md-6\">\n                                    <input type=\"text\" class=\"form-control\" id=\"company\" placeholder=\"Company\" name=\"company\" [(ngModel)]=\"company\">\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <div class=\"col-md-12\">\n                                    <textarea class=\"form-control\" rows=\"2\" id=\"message\" placeholder=\"Say something ...\" name=\"message\" [(ngModel)]=\"message\"></textarea>\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <div class=\"button col-md-12 text-right\">\n                                    <button type=\"submit\" class=\"btn btn-primary\" [disabled]=\"disable_button\">\n                                        <div *ngIf=\"!disable_button\">Send message <i class=\"fa fa-paper-plane-o\" aria-hidden=\"true\"></i></div>\n                                        <div *ngIf=\"disable_button\">Sending <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></div>\n                                    </button>\n                                </div>\n                            </div>\n                        </fieldset>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 564:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!isAdmin\" class=\"col-md-9 col-sm-9 col-xs-9\">\n  <div class=\"alert alert-info alert-dismissible\" role=\"alert\">\n    <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n    <h4 class=\"alert-heading\">Warning!</h4>\n    The project is still on progress, your data might be deleted when necessary\n  </div>\n  <ol class=\"breadcrumb\">\n    <li class=\"active\">Dashboard</li>\n  </ol>\n  <div class=\"panel-welcome panel-default col-md-6 col-sm-6 col-xs-12\">\n    <div class=\"panel-body text-left\">\n      <h3>Hi {{_name}}, </h3>\n      <h4>Welcome to Study Management Console</h4>\n    </div>\n  </div>\n  <div class=\"panel-user panel-default col-md-6 col-sm-6 col-xs-12\">\n    <div class=\"panel-body text-center\">\n      <div class=\"col-md-6 col-sm-6 col-xs-6 text-left\">\n        <h3>Account</h3>\n        <h4>{{_username}}</h4>\n        <br>\n      </div>\n      <div class=\"col-md-6 col-sm-6 col-xs-6 text-center\">\n        <img src=\"../../../assets/images/user.png\" height=\"100px\" width=\"100px\">\n        <h4 class=\"type\">{{_type}}</h4>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-1 panel-default col-md-4 col-sm-4 col-xs-12\">\n    <div class=\"panel-body\">\n      <div class=\"col-md-6\">\n        <img src=\"../../../assets/images/school.png\" height=\"100px\" width=\"100px\">\n      </div>\n      <div class=\"academic col-md-6 text-right\">\n        <h3>Schools</h3>\n        <i *ngIf=\"isLoading_school\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n        <h4 *ngIf=\"!isLoading_school\">{{school_count}}</h4>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-2 panel-default col-md-4 col-sm-4 col-xs-12\">\n    <div class=\"panel-body\">\n      <div class=\"col-md-6\">\n        <img src=\"../../../assets/images/degree.png\" height=\"100px\" width=\"100px\">\n      </div>\n      <div class=\"academic col-md-6 text-right\">\n        <h3>Degrees</h3>\n        <i *ngIf=\"isLoading_degree\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n        <h4 *ngIf=\"!isLoading_degree\">{{degree_count}}</h4>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-3 panel-default col-md-4 col-sm-4 col-xs-12\">\n    <div class=\"panel-body\">\n      <div class=\"col-md-6\">\n        <img src=\"../../../assets/images/mark.png\" height=\"100px\" width=\"100px\">\n      </div>\n      <div class=\"academic col-md-6 text-right\">\n        <h3>Marks</h3>\n        <i *ngIf=\"isLoading_mark\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n        <h4 *ngIf=\"!isLoading_mark\">{{mark_count}}</h4>\n      </div>\n    </div>\n  </div>\n</div>\n<!--ADMIN ==================================================================================================================-->\n<!--========================================================================================================================-->\n<div *ngIf=\"isAdmin\" class=\"col-md-9 col-sm-9 col-xs-9\">\n  <ol class=\"breadcrumb\">\n    <li class=\"active\">Dashboard</li>\n  </ol>\n  <div class=\"panel-welcome panel-default col-md-6 col-sm-6 col-xs-12\">\n    <div class=\"panel-body text-left\">\n      <h3>Hi {{_name}}, </h3>\n      <h4>Welcome to Study Management Console</h4>\n    </div>\n  </div>\n  <div class=\"panel-user panel-default col-md-6 col-sm-6 col-xs-12\">\n    <div class=\"panel-body text-center\">\n      <div class=\"account col-md-6 col-sm-6 col-xs-6 text-left\">\n        <h3>Account</h3>\n        <h4>{{_username}}</h4>\n        <br>\n      </div>\n      <div class=\"type col-md-6 col-sm-6 col-xs-6 text-center\">\n        <img src=\"../../../assets/images/user.png\" height=\"100px\" width=\"100px\">\n        <h4 class=\"type\">{{_type}}</h4>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-4 panel-default col-md-4 col-sm-5 col-xs-12\">\n    <div class=\"admin panel-body\">\n      <div class=\"col-md-6 col-sm-6 col-xs-6\">\n        <img src=\"../../../assets/images/admin-users.png\" height=\"100px\" width=\"100px\">\n      </div>\n      <div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n        <h3>Admin</h3>\n        <i *ngIf=\"isLoading_user\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n        <h4 *ngIf=\"!isLoading_user\">{{admin_user_count}}</h4>\n      </div>\n    </div>\n    <div class=\"staff panel-body\">\n      <div class=\"col-md-6 col-sm-6 col-xs-6\">\n        <img src=\"../../../assets/images/staff-users.png\" height=\"100px\" width=\"100px\">\n      </div>\n      <div class=\"col-md-6 col-sm-6 col-xs-6 text-right\">\n        <h3>Staff</h3>\n        <i *ngIf=\"isLoading_user\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n        <h4 *ngIf=\"!isLoading_user\">{{staff_user_count}}</h4>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-5 panel-default col-md-8 col-sm-7 col-xs-12 text-center\">\n    <div class=\"panel-body\">\n      <div class=\"enabled-user col-sm-6 col-xs-12\">\n        <div class=\"img col-md-12 col-sm-12 col-xs-6\">\n          <img src=\"../../../assets/images/enabled-users.png\" height=\"100px\" width=\"100px\">\n        </div>\n        <div class=\"a col-md-12 col-sm-12 col-xs-6\">\n          <h3>Enabled Users</h3>\n          <i *ngIf=\"isLoading_user\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n          <h4 *ngIf=\"!isLoading_user\">{{en_user_count}}</h4>\n        </div>\n      </div>\n      <div class=\"disabled-user col-sm-6 col-xs-12\">\n        <div class=\"img col-md-12 col-sm-12 col-xs-6\">\n          <img src=\"../../../assets/images/disabled-users.png\" height=\"100px\" width=\"100px\">\n        </div>\n        <div class=\"a col-md-12 col-sm-12 col-xs-6\">\n          <h3>Disabled Users</h3>\n          <i *ngIf=\"isLoading_user\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n          <h4 *ngIf=\"!isLoading_user\">{{di_user_count}}</h4>\n        </div>\n      </div>\n    </div>\n  </div>\n\n\n  <div class=\"panel-1 panel-default col-md-4 col-sm-4 col-xs-12\">\n    <div class=\"panel-body\">\n      <div class=\"col-md-6\">\n        <img src=\"../../../assets/images/school.png\" height=\"100px\" width=\"100px\">\n      </div>\n      <div class=\"academic col-md-6 text-right\">\n        <h3>Schools</h3>\n        <i *ngIf=\"isLoading_school\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n        <h4 *ngIf=\"!isLoading_school\">{{school_count}}</h4>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-2 panel-default col-md-4 col-sm-4 col-xs-12\">\n    <div class=\"panel-body\">\n      <div class=\"col-md-6\">\n        <img src=\"../../../assets/images/degree.png\" height=\"100px\" width=\"100px\">\n      </div>\n      <div class=\"academic col-md-6 text-right\">\n        <h3>Degrees</h3>\n        <i *ngIf=\"isLoading_degree\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n        <h4 *ngIf=\"!isLoading_degree\">{{degree_count}}</h4>\n      </div>\n    </div>\n  </div>\n  <div class=\"panel-3 panel-default col-md-4 col-sm-4 col-xs-12\">\n    <div class=\"panel-body\">\n      <div class=\"col-md-6\">\n        <img src=\"../../../assets/images/mark.png\" height=\"100px\" width=\"100px\">\n      </div>\n      <div class=\"academic col-md-6 text-right\">\n        <h3>Marks</h3>\n        <i *ngIf=\"isLoading_mark\" class=\"fa fa-spinner fa-pulse fa-2x\" aria-hidden=\"true\"></i>\n        <h4 *ngIf=\"!isLoading_mark\">{{mark_count}}</h4>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 565:
/***/ (function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n    <div class=\"col-md-7\">\n        <h1 style=\"font-family: 'Bitter', serif; padding: 50px 0 0 50px\">Hello, </h1>\n        <p style=\"padding-left: 50px\">This is <strong style=\"font-family: 'Bitter', serif; font-size: 25px\"><i class=\"fa fa-graduation-cap\" aria-hidden=\"true\"></i> Studie</strong>            , a simple web console for managing your academic grades and related stuff.</p>\n        <p style=\"padding: 30px 0 0 50px\"><a style=\"padding: 10px 20px 10px 20px; border: 2px solid white; color: white\" class=\"btn wow pulse infinite\" href=\"/login\"\n                role=\"button\">Login now</a></p>\n    </div>\n</div>\n\n<div class=\"text-center\" style=\"margin-top: -30px; padding: 50px 0 50px 0; color: white; background-color: #22313F\">\n    <div class=\"wow flash\" style=\"display: inline-block; border-bottom: 3px solid white;\">\n        <h3><strong>About this project</strong></h3>\n    </div><br><br>\n    <div class=\"wow flipInX\">\n        <p>This project is about to build a web management console to store</p>\n        <p> your schools, degrees and marks information for managemnt purpose.</p>\n        <br>\n        <!--<p>I design and develop this project basing on knowledge and</p>\n        <p>experienece earned from my group project at La Trobe University.</p>\n        <p>Hence, you may find similarities between them. <i class=\"fa fa-smile-o\" aria-hidden=\"true\"></i></p>-->\n        <br>\n        <div style=\"font-weight: bold\">\n            <p>If you do not have account to log in</p>\n            <p>Please contact me via links below for an account.</p>\n        </div>\n    </div>\n</div>\n\n<div class=\"tools col-md-12 col-sm-12 col-xs-12 text-center\">\n    <div class=\"wow lightSpeedIn\">\n        <h3 style=\"font-family: 'Merriweather', serif;\"><strong>Developed With</strong></h3>\n    </div>\n    <div class=\"tools-sub\">\n        <div class=\"front-end col-md-4 col-sm-4 wow fadeInLeftBig\">\n            <img src=\"../../../assets/images/angular2.png\" height=\"100px\" width=\"100px\">\n            <!--<h4>Front-end</h4>\n            <hr>\n            <h5>Angular2 (Typescript) along with HTML, CSS, JQuery stuff, JWT and other dependencies.</h5>-->\n        </div>\n        <div class=\"back-end col-md-4 col-sm-4 wow fadeInUpBig\">\n            <img src=\"../../../assets/images/nodejs.png\" height=\"100px\" width=\"140px\">\n            <!--<h4>Back-end</h4>\n            <hr>\n            <h5>NodeJS configuring with mongoose, passportjs and jsonwebtoken.</h5>-->\n        </div>\n        <div class=\"db col-md-4 col-sm-4 wow fadeInRightBig\">\n            <img src=\"../../../assets/images/mongodb.png\" height=\"100px\" width=\"120px\">\n            <!--<h4>Database</h4>\n            <hr>\n            <h5>MongoDB - NoSQL database. Hosted by mLab.</h5>-->\n        </div>\n    </div>\n</div>\n\n<div class=\"footer col-md-12 col-sm-12 col-xs-12 text-cente\">\n    <div class=\"info col-md-2 col-sm-2 col-xs-3 text-left wow swing\">\n        <h5 style=\"font-size: 25px;\">Studie</h5>\n    </div>\n    <div class=\"info col-md-4 col-sm-4 col-xs-9 text-left wow swing\">\n        <h5>Trung NGUYEN</h5>\n        <h6>Frontend Programmer</h6>\n        <h6><span class=\"glyphicon glyphicon-envelope\"></span> trungnus96@gmail.com</h6>\n        <h6><span class=\"glyphicon glyphicon-phone\"></span> (+61) 416 024 875</h6>\n        <br>\n        <h5>Get Connected</h5>\n        <a href=\"https://www.facebook.com/trungnguyenn96\" target=\"_blank\"><i class=\"fa fa-facebook-square fa-2x\" aria-hidden=\"true\"></i></a>\n        <a href=\"https://www.linkedin.com/in/trung-nguyen-364593b9/\" target=\"_blank\"><i class=\"fa fa-linkedin-square fa-2x\" aria-hidden=\"true\"></i></a>\n        <a href=\"https://www.instagram.com/trungnguyenn96\" target=\"_blank\"><i class=\"fa fa-instagram fa-2x\" aria-hidden=\"true\"></i></a>\n    </div>\n    <div class=\"send-message col-md-6 col-sm-6 col-xs-12\">\n        <form #sendEmailForm=\"ngForm\" *ngIf=\"active\" (ngSubmit)=\"sendEmailSubmit()\" class=\"form-horizontal wow zoomIn\">\n            <fieldset>\n                <legend class=\"text-center\">Hit Me Up</legend>\n                <div class=\"form-group\">\n                    <div class=\"col-md-6\">\n                        <input type=\"text\" class=\"form-control\" id=\"firstName\" placeholder=\"First Name\" name=\"firstName\" [(ngModel)]=\"firstName\">\n                    </div>\n                    <div class=\"col-md-6\">\n                        <input type=\"text\" class=\"form-control\" id=\"lastName\" placeholder=\"Last Name\" name=\"lastName\" [(ngModel)]=\"lastName\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"col-md-6\">\n                        <input type=\"text\" class=\"form-control\" id=\"email\" placeholder=\"Email\" name=\"email\" [(ngModel)]=\"email\">\n                    </div>\n                    <div class=\"col-md-6\">\n                        <input type=\"text\" class=\"form-control\" id=\"company\" placeholder=\"Company\" name=\"company\" [(ngModel)]=\"company\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"col-md-12\">\n                        <textarea class=\"form-control\" rows=\"2\" id=\"message\" placeholder=\"Say something ...\" name=\"message\" [(ngModel)]=\"message\"></textarea>\n                    </div>\n                </div>\n                <div class=\"form-group text-center\">\n                    <button type=\"submit\" class=\"btn btn-info\" [disabled]=\"disable_button\">\n                        <div *ngIf=\"!disable_button\">Send message <i class=\"fa fa-paper-plane-o\" aria-hidden=\"true\"></i></div>\n                        <div *ngIf=\"disable_button\">Sending <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></div>\n                    </button>\n                </div>\n            </fieldset>\n        </form>\n    </div>\n    <h5 class=\"footer text-center\">Copyright © 2017 Studie v1.0 Trung Nguyen. All rights reserved.</h5>\n</div>"

/***/ }),

/***/ 566:
/***/ (function(module, exports) {

module.exports = "<h1 class=\"text-center\"><strong><i class=\"fa fa-graduation-cap\" aria-hidden=\"true\"></i> Studie </strong> Management Console</h1>\n<h4 class=\"text-center\"><small>by </small> Trung Nguyen</h4>\n<div class=\"content col-md-5 col-sm-7 col-xs-10 col-centered\">\n    <form class=\"form-horizontal\" #loginForm=\"ngForm\" (ngSubmit)=\"login()\">\n        <fieldset>\n            <div class=\"form-group\">\n                <label for=\"username\" class=\"col-md-4 col-sm-3 col-xs-3 control-label\">Username</label>\n                <div class=\"col-md-6 col-sm-8 col-xs-9\">\n                    <input type=\"text\" class=\"form-control\" id=\"username\" [(ngModel)]=\"_username\" required name=\"username\" placeholder=\"Username\"\n                        #username=\"ngModel\">\n                </div>\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password\" class=\"col-md-4 col-sm-3 col-xs-3 control-label\">Password</label>\n                <div class=\"col-md-6 col-sm-8 col-xs-9\">\n                    <input type=\"password\" class=\"form-control\" id=\"password\" [(ngModel)]=\"_password\" name=\"password\" placeholder=\"Password\"\n                        required #password=\"ngModel\">\n                </div>\n            </div>\n            <div class=\"button\">\n                <input type=\"submit\" [disabled]=\"!loginForm.form.valid\" class=\"btn btn-primary\" value=\"Login\">\n            </div>\n        </fieldset>\n    </form>\n</div>\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-backdrop=\"static\"\n    data-keyboard=\"false\">\n    <div class=\"modal-dialog modal-sm\" role=\"document\">\n        <div class=\"modal-content\">\n            <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n                <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n            </div>\n            <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n                <h3>{{modal_msg}}\n                    <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n                    <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n                </h3>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<!--commented for code revision-->\n\n<!--<div class=\"modal fade bs-example-modal-sm\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" data-backdrop=\"static\" data-keyboard=\"false\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\" id=\"myModalLabel\">Modal title</h4>\n      </div>\n      <div class=\"modal-body\">\n        ...\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\">Save changes</button>\n      </div>\n    </div>\n  </div>\n</div>-->"

/***/ }),

/***/ 567:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default\">\n    <div class=\"container\">\n        <div class=\"navbar-header\">\n            <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\"\n                aria-controls=\"navbar\">\n            <span class=\"sr-only\">Toggle navigation</span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n            <span class=\"icon-bar\"></span>\n          </button>\n            <a class=\"navbar-brand\" href=\"/\">Studie</a>\n        </div>\n        <div id=\"navbar\" class=\"collapse navbar-collapse\">\n            <ul class=\"nav navbar-nav navbar-left\">\n                <!--<li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/']\">Home</a></li>-->\n                <!--<li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/admin/user-mgmt']\">Admin</a></li>-->\n                <!--<li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/profile']\">Profile</a></li>\n                <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/user/add-school']\">School</a></li>\n                <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/user/add-degree']\">Degree</a></li>\n                <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/user/add-mark']\">Mark</a></li>\n                <li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/academic-overview']\">Aca</a></li>-->\n            </ul>\n\n            <ul class=\"nav navbar-nav navbar-right\">\n                <!--<li *ngIf=\"userService.loggedIn()\"[routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/dashboard']\">Dash</a></li>-->\n                <!--<li *ngIf=\"!userService.loggedIn()\" [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/login']\">Login</a></li>-->\n                <!--<li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/register']\">Register</a></li>-->\n                <!--<li [routerLinkActive]=\"['active']\" [routerLinkActiveOptions]=\"{exact:true}\"><a [routerLink]=\"['/contact']\">Contact</a></li>-->\n                <li *ngIf=\"userService.loggedIn()\"><a (click)=\"displayLogoutModal()\">Logout</a></li>\n            </ul>\n        </div>\n        <!--/.nav-collapse -->\n    </div>\n</nav>\n\n<div *ngIf=\"userService.loggedIn() && !userService.isHomePage()\" class=\"sidebar col-md-3 col-sm-3 col-xs-3\"> \n    <div class=\"button-1\" [routerLink]=\"['/dashboard']\">\n      <h3><span class=\"text\">Dashboard </span><i class=\"fa fa-home\" aria-hidden=\"true\"></i></h3>\n    </div>\n    <div class=\"button-2\" [routerLink]=\"['/profile']\">\n      <h3><span class=\"text\">Profile </span><i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i></h3>\n    </div>\n    <div *ngIf=\"userService.isAdmin()\" class=\"button-5\" [routerLink]=\"['/admin/user-mgmt']\">\n      <h3><span class=\"text\">Users Management </span><i class=\"fa fa-users\" aria-hidden=\"true\"></i></h3>\n    </div>\n    <div class=\"button-3\" [routerLink]=\"['/study-console']\">\n      <h3><span class=\"text\">Study Console </span><i class=\"fa fa-graduation-cap\" aria-hidden=\"true\"></i></h3>\n    </div>\n    <div class=\"button-4\" [routerLink]=\"['/contact']\">\n      <h3><span class=\"text\">Contact </span><i class=\"fa fa-comments\" aria-hidden=\"true\"></i></h3>\n    </div>\n</div>\n\n<!--modal for logout-->\n<div class=\"modal fade\" id=\"logoutModal\" tabindex=\"-1\" role=\"dialog\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n        <h4 class=\"modal-title\">Logout</h4>\n      </div>\n      <div class=\"modal-body\">\n        <p>Are you sure you want to logout?</p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"logout()\">Logout</button>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n"

/***/ }),

/***/ 568:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-9 col-sm-9 col-xs-9\">\n    <ol class=\"breadcrumb\">\n        <li><a href=\"/dashboard\">Dashboard</a></li>\n        <li class=\"active\">Profile</li>\n    </ol>\n    <div class=\"panel-body\">\n        <div class=\"tab col-md-4\">\n            <ul>\n                <li class=\"active\">\n                    <a href=\"#accountOverview\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\" (click)=\"disableEdit()\">Account Overview</a>\n                </li>\n                <hr>\n                <li>\n                    <a href=\"#updateProfile\" aria-controls=\"profile\" role=\"tab\" data-toggle=\"tab\" (click)=\"disableEdit()\">Update Profile</a>\n                </li>\n                <hr>\n                <li>\n                    <a href=\"#updatePassword\" aria-controls=\"profile\" role=\"tab\" data-toggle=\"tab\" (click)=\"disableEdit()\">Update Password</a>\n                </li>\n                <hr>\n            </ul>\n        </div>\n        <div class=\"col-md-8 col-sm-12 col-xs-12\">\n            <div class=\"tab-content\">\n                <div class=\"tab-pane active\" id=\"accountOverview\">\n                    <legend class=\"text-center\">Account Overview</legend>\n                    <div class=\"img col-md-3 col-sm-3\">\n                        <img src=\"../../../assets/images/user.png\" height=\"100%\" width=\"100%\">\n                    </div>\n                    <div class=\"info col-md-9 col-sm-9 col-xs-12\">\n                        <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n                            <h5>Username</h5>\n                        </div>\n                        <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n                            <h5>{{_username}} </h5>\n                        </div>\n                        <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n                            <h5>Full Name</h5>\n                        </div>\n                        <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n                            <h5>{{_name}} </h5>\n                        </div>\n                        <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n                            <h5>Date of Birth</h5>\n                        </div>\n                        <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n                            <h5>{{_dob}} </h5>\n                        </div>\n                        <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n                            <h5>Email</h5>\n                        </div>\n                        <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n                            <h5>{{_email}} </h5>\n                        </div>\n                        <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n                            <h5>Phone Number</h5>\n                        </div>\n                        <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n                            <h5>{{_phone}} </h5>\n                        </div>\n                        <div class=\"heading col-md-5 col-sm-6 col-xs-6\">\n                            <h5>Type</h5>\n                        </div>\n                        <div class=\"data col-md-7 col-sm-6 col-xs-6\">\n                            <h5 style=\"border: 2px solid black; display: inline-block;padding: 7px;\">{{_type}} </h5>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"tab-pane\" id=\"updateProfile\">\n                    <form class=\"form-horizontal\" #updateProfileForm=\"ngForm\" (ngSubmit)=\"updateProfile()\">\n                        <fieldset>\n                            <legend class=\"text-center\">Update Profile</legend>\n                            <div class=\"form-group\">\n                                <label for=\"name\" class=\"col-md-4 control-label\">Full Name</label>\n                                <div class=\"col-md-8\">\n                                    <input type=\"text\" class=\"form-control\" id=\"name\" placeholder=\"Full name\" required minlength=\"1\" maxlength=\"24\" name=\"name\"\n                                        [(ngModel)]=\"_name\" #name=\"ngModel\" [disabled]=\"!edit_profile\">\n                                    <div *ngIf=\"name.errors && (name.dirty || name.touched)\" class=\"custom_alert\">\n                                        <div [hidden]=\"!name.errors.required\">\n                                            Name is required\n                                        </div>\n                                        <div [hidden]=\"!name.errors.minlength\">\n                                            Name must be at least 1 characters long.\n                                        </div>\n                                        <div [hidden]=\"!name.errors.maxlength\">\n                                            Name cannot be more than 24 characters long.\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"dob\" class=\"col-md-4 control-label\">Date Of Birth</label>\n                                <div class=\"col-md-8\">\n                                    <input type=\"text\" class=\"form-control\" id=\"dob\" placeholder=\"Date of Birth\" required name=\"dob\" [(ngModel)]=\"_dob\" #dob=\"ngModel\"\n                                        [disabled]=\"!edit_profile\">\n                                    <div *ngIf=\"dob.errors && (dob.dirty || dob.touched)\" class=\"custom_alert\">\n                                        <div [hidden]=\"!dob.errors.required\">\n                                            Date of Birth is required\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"email\" class=\"col-md-4 control-label\">Email</label>\n                                <div class=\"col-md-8\">\n                                    <input type=\"text\" class=\"form-control\" id=\"email\" placeholder=\"Email\" required name=\"email\" [(ngModel)]=\"_email\" #email=\"ngModel\"\n                                        [disabled]=\"!edit_profile\">\n                                    <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"custom_alert\">\n                                        <div [hidden]=\"!email.errors.required\">\n                                            Email is required\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"phone\" class=\"col-md-4 control-label\">Phone Number</label>\n                                <div class=\"col-md-8\">\n                                    <input type=\"text\" class=\"form-control\" id=\"phone\" placeholder=\"Phone number\" required name=\"phone\" [(ngModel)]=\"_phone\"\n                                        #phone=\"ngModel\" [disabled]=\"!edit_profile\">\n                                    <a data-toggle=\"tooltip\" title=\"\n                                            <h6>Examples</h6>\n                                            <p>(123) 456-7890</p>\n                                            <p>123-456-7890</p>\n                                            <p>123.456.7890</p>\n                                            <p>1234567890</p>\n                                            <p>+31636363634</p>\n                                            <p>075-63546725</p>\" data-html=\"true\" data-placement=\"right\">Hover over me</a>\n                                    <div *ngIf=\"phone.errors && (phone.dirty || phone.touched)\" class=\"custom_alert\">\n                                        <div [hidden]=\"!phone.errors.required\">\n                                            Phone is required\n                                        </div>\n                                    </div>\n                                    <br>\n                                    <button class=\"btn btn-info\" (click)=\"editProfile()\" [disabled]=\"edit_profile\">Edit</button>\n                                    <input type=\"submit\" [disabled]=\"!updateProfileForm.form.valid || updateProfileForm.pristine\" class=\"btn btn-primary\" value=\"Save\">\n                                </div>\n                            </div>\n                        </fieldset>\n                    </form>\n                </div>\n                <div class=\"tab-pane\" id=\"updatePassword\">\n                    <form class=\"form-horizontal\" #updatePasswordForm=\"ngForm\" (ngSubmit)=\"updatePassword()\">\n                        <fieldset>\n                            <legend class=\"text-center\">Update Password</legend>\n                            <div class=\"form-group\">\n                                <label for=\"password\" class=\"col-md-4 control-label\">Password</label>\n                                <div class=\"col-md-8\">\n                                    <input type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\" required name=\"password\" [(ngModel)]=\"_password\"\n                                        #password=\"ngModel\">\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"newPassword\" class=\"col-md-4 control-label\">New Password</label>\n                                <div class=\"col-md-8\">\n                                    <input type=\"password\" class=\"form-control\" id=\"newPassword\" placeholder=\"New Password\" required minlength=\"6\" maxlength=\"20\"\n                                        name=\"newPassword\" [(ngModel)]=\"_newPassword\" #newPassword=\"ngModel\">\n                                    <div *ngIf=\"newPassword.errors && (newPassword.dirty || newPassword.touched)\" class=\"custom_alert\">\n                                        <div [hidden]=\"!newPassword.errors.required\">\n                                            Password is required\n                                        </div>\n                                        <div [hidden]=\"!newPassword.errors.minlength\">\n                                            Password must be at least 6 characters long.\n                                        </div>\n                                        <div [hidden]=\"!newPassword.errors.maxlength\">\n                                            Password cannot be more than 20 characters long.\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"confirmNewPassword\" class=\"col-md-4 control-label\">Re-type</label>\n                                <div class=\"col-md-8\">\n                                    <input type=\"password\" class=\"form-control\" id=\"confirmNewPassword\" placeholder=\"Re-type New Password\" required name=\"confirmNewPassword\"\n                                        [(ngModel)]=\"_confirmNewPassword\" #confirmNewPassword=\"ngModel\">\n                                    <div *ngIf=\"!isPasswordMatch\" class=\"custom_alert\">\n                                        Password does not match\n                                    </div>\n                                    <br>\n                                    <input type=\"submit\" [disabled]=\"!updatePasswordForm.form.valid\" class=\"btn btn-primary\" value=\"Update\">\n                                </div>\n                            </div>\n                        </fieldset>\n                    </form>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n    <div class=\"modal-dialog modal-sm\" role=\"document\">\n        <div class=\"modal-content\">\n            <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n                <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n            </div>\n            <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n                <h3>{{modal_msg}}\n                    <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n                    <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n                </h3>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 569:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12\">\n    <div class=\"well bs-component\">\n        <form #registerForm=\"ngForm\" *ngIf=\"active\" (ngSubmit)=\"registerUserSubmit()\" class=\"form-horizontal\">\n            <fieldset>\n                <legend>Register</legend>\n\n                <div class=\"form-group\">\n                    <label for=\"username\" class=\"col-md-2 control-label\">Username</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"text\" class=\"form-control\" id=\"username\" [(ngModel)]=\"_username\" required minlength=\"6\" maxlength=\"20\" name=\"username\"\n                            placeholder=\"Username\" #username=\"ngModel\">\n                        <div *ngIf=\"username.errors && (username.dirty || username.touched)\" class=\"custom_alert\">\n                            <div [hidden]=\"!username.errors.required\">\n                                Username is required\n                            </div>\n                            <div [hidden]=\"!username.errors.minlength\">\n                                Username must be at least 6 characters long.\n                            </div>\n                            <div [hidden]=\"!username.errors.maxlength\">\n                                Username cannot be more than 20 characters long.\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"name\" class=\"col-md-2 control-label\">Name</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"text\" class=\"form-control\" id=\"name\" [(ngModel)]=\"_name\" name=\"name\" required minlength=\"1\" maxlength=\"24\" placeholder=\"Name\"\n                            #name=\"ngModel\">\n                        <div *ngIf=\"name.errors && (name.dirty || name.touched)\" class=\"custom_alert\">\n                            <div [hidden]=\"!name.errors.required\">\n                                Name is required\n                            </div>\n                            <div [hidden]=\"!name.errors.minlength\">\n                                Name must be at least 1 characters long.\n                            </div>\n                            <div [hidden]=\"!name.errors.maxlength\">\n                                Name cannot be more than 24 characters long.\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"dob\" class=\"col-md-2 control-label\">DOB</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"text\" class=\"form-control\" id=\"dob\" [(ngModel)]=\"_dob\" name=\"dob\" placeholder=\"Date of Birth\" required #dob=\"ngModel\">                        * dd/mm/yyyy\n                        <div *ngIf=\"dob.errors && (dob.dirty || dob.touched)\" class=\"custom_alert\">\n                            <div [hidden]=\"!dob.errors.required\">\n                                Date of Birth is required\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"email\" class=\"col-md-2 control-label\">Email</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"text\" class=\"form-control\" id=\"email\" [(ngModel)]=\"_email\" name=\"email\" placeholder=\"Email\" required #email=\"ngModel\">\n                        <div *ngIf=\"email.errors && (email.dirty || email.touched)\" class=\"custom_alert\">\n                            <div [hidden]=\"!email.errors.required\">\n                                Email is required\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"password\" class=\"col-md-2 control-label\">Password</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"password\" class=\"form-control\" id=\"password\" [(ngModel)]=\"_password\" name=\"password\" placeholder=\"Password\"\n                            required minlength=\"6\" maxlength=\"20\" #password=\"ngModel\">\n                        <div *ngIf=\"password.errors && (password.dirty || password.touched)\" class=\"custom_alert\">\n                            <div [hidden]=\"!password.errors.required\">\n                                Password is required\n                            </div>\n                            <div [hidden]=\"!password.errors.minlength\">\n                                Password must be at least 6 characters long.\n                            </div>\n                            <div [hidden]=\"!password.errors.maxlength\">\n                                Password cannot be more than 20 characters long.\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"confirmNewPassword\" class=\"col-md-2 control-label\">Re-type</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"password\" class=\"form-control\" id=\"confirmNewPassword\" placeholder=\"Re-type Password\" required name=\"confirmNewPassword\"\n                            [(ngModel)]=\"_confirmNewPassword\" #confirmNewPassword=\"ngModel\">\n                        <div *ngIf=\"!isPasswordMatch\" class=\"custom_alert\">\n                            Password does not match\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"phone\" class=\"col-md-2 control-label\">Phone</label>\n                    <div class=\"col-md-10\">\n                        <input type=\"phone\" class=\"form-control\" id=\"phone\" [(ngModel)]=\"_phone\" name=\"phone\" placeholder=\"Phone Number\" required\n                            #phone=\"ngModel\">\n                        <a data-toggle=\"tooltip\" title=\"\n                                            <h6>Examples</h6>\n                                            <p>(123) 456-7890</p>\n                                            <p>123-456-7890</p>\n                                            <p>123.456.7890</p>\n                                            <p>1234567890</p>\n                                            <p>+31636363634</p>\n                                            <p>075-63546725</p>\" data-html=\"true\" data-placement=\"right\">Hover over me</a>\n                        <div *ngIf=\"phone.errors && (phone.dirty || phone.touched)\" class=\"custom_alert\">\n                            <div [hidden]=\"!phone.errors.required\">\n                                Phone is required\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"form-group\">\n                    <label class=\"col-md-2 control-label\">Type</label>\n                    <div class=\"col-md-10\">\n                        <div class=\"radio\">\n                            <label>\n                              <input type=\"radio\" name=\"option\" id=\"adminOption\" value=\"admin\" [(ngModel)]=\"_option\">\n                              Admin\n                              </label>\n                        </div>\n                        <div class=\"radio\">\n                            <label>\n                              <input type=\"radio\" name=\"option\" id=\"staffOption\" value=\"staff\" [(ngModel)]=\"_option\">\n                              Staff\n                            </label>\n                        </div>\n                        <div class=\"radio\">\n                            <label>\n                              <input type=\"radio\" name=\"option\" id=\"memberOption\" value=\"member\" [(ngModel)]=\"_option\">\n                              Member\n                            </label>\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <label class=\"col-md-2 control-label\">Disable</label>\n                    <div class=\"col-md-8\">\n                        <div class=\"checkbox\">\n                            <label>\n                              <input type=\"checkbox\" id=\"isDisable\" [(ngModel)]=\"_isDisable\" name=\"isDisable\">Check it if you want to disable this account\n                            </label>\n                        </div>\n                    </div>\n                </div>\n\n                <div class=\"button\">\n                    <input type=\"submit\" [disabled]=\"!registerForm.form.valid\" class=\"btn btn-primary\" value=\"Register\">\n                    <input type=\"submit\" (click)=\"clearForm()\" class=\"btn btn-info\" value=\"Clear\">\n                </div>\n            </fieldset>\n        </form>\n    </div>\n</div>\n\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"register-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"register-modalLabel\" data-backdrop=\"static\"\n    data-keyboard=\"false\">\n    <div class=\"modal-dialog modal-sm\" role=\"document\">\n        <div class=\"modal-content\">\n            <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n                <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n            </div>\n            <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n                <h3>{{modal_msg}}\n                    <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n                    <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n                </h3>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 570:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-9 col-sm-9 col-xs-9\">\n  <ol class=\"breadcrumb\">\n    <li><a href=\"/dashboard\">Dashboard</a></li>\n    <li class=\"active\">Study Console</li>\n  </ol>\n  <app-academic-overview></app-academic-overview>\n</div>"

/***/ }),

/***/ 571:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12\">\n  <div class=\"well bs-component\">\n    <form #addDegreeForm=\"ngForm\" *ngIf=\"active\" (ngSubmit)=\"addDegreeSubmit()\" class=\"form-horizontal\">\n      <fieldset>\n        <legend>Add Degree</legend>\n\n        <div class=\"form-group\">\n          <label for=\"degreeName\" class=\"col-md-3 control-label\">Degree name</label>\n          <div class=\"col-md-8\">\n            <input type=\"text\" class=\"form-control\" id=\"degreeName\" [(ngModel)]=\"_degree_name\" required minlength=\"6\" name=\"degreeName\"\n              placeholder=\"Degree name\" #degreeName=\"ngModel\">\n            <div *ngIf=\"degreeName.errors && (degreeName.dirty || degreeName.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!degreeName.errors.required\">\n                Degree Name is required\n              </div>\n              <div [hidden]=\"!degreeName.errors.minlength\">\n                Degree Name must be at least 6 characters long.\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"duration\" class=\"col-md-3 control-label\">Duration (years)</label>\n          <div class=\"col-md-8\">\n            <input type=\"number\" class=\"form-control\" id=\"duration\" [(ngModel)]=\"_duration\" required name=\"duration\" placeholder=\"Duration\"\n              #duration=\"ngModel\">\n            <div *ngIf=\"duration.errors && (duration.dirty || duration.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!duration.errors.required\">\n                Duration is required\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label class=\"col-md-3 control-label\">School</label>\n          <div class=\"col-md-8\">\n            <i *ngIf=\"isLoading\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n            <div class=\"radio\" *ngFor=\"let school of schools\">\n              <label>\n                <input type=\"radio\" name=\"option\" name=\"school\" value=\"{{school._id}}\">\n                {{school.school_name}}\n                </label>\n            </div>\n            <br>\n            <div class=\"button\">\n              <input type=\"submit\" [disabled]=\"!addDegreeForm.form.valid\" class=\"btn btn-primary\" value=\"Add\">\n              <input (click)=\"clearForm()\" class=\"btn btn-info\" value=\"Clear\">\n            </div>\n          </div>\n        </div>\n      </fieldset>\n    </form>\n  </div>\n</div>\n\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"add-degree-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-degree-modalLabel\" data-backdrop=\"static\"\n  data-keyboard=\"false\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 572:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12\">\n  <div class=\"well bs-component\">\n    <form #addMarkForm=\"ngForm\" *ngIf=\"active\" (ngSubmit)=\"addMarkSubmit()\" class=\"form-horizontal\">\n      <fieldset>\n        <legend>Add Mark</legend>\n\n        <div class=\"form-group\">\n          <label for=\"subjectName\" class=\"col-md-3 control-label\">Subject name</label>\n          <div class=\"col-md-8\">\n            <input type=\"text\" class=\"form-control\" id=\"subjectName\" [(ngModel)]=\"_subject_name\" required name=\"subjectName\" placeholder=\"Subject name\"\n              #subjectName=\"ngModel\">\n            <div *ngIf=\"subjectName.errors && (subjectName.dirty || subjectName.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!subjectName.errors.required\">\n                School Name is required\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"subjectCode\" class=\"col-md-3 control-label\">Subject code</label>\n          <div class=\"col-md-8\">\n            <input type=\"text\" class=\"form-control\" id=\"subjectCode\" [(ngModel)]=\"_subject_code\" required name=\"subjectCode\" placeholder=\"Subject code\"\n              #subjectCode=\"ngModel\">\n            <div *ngIf=\"subjectCode.errors && (subjectCode.dirty || subjectCode.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!subjectCode.errors.required\">\n                Subject Code is required\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"semester\" class=\"col-md-3 control-label\">Semester </label>\n          <div class=\"col-md-8\">\n            <input type=\"number\" class=\"form-control\" id=\"semester\" [(ngModel)]=\"_semester\" required name=\"semester\" placeholder=\"Semester\"\n              #semester=\"ngModel\">\n            <div *ngIf=\"semester.errors && (semester.dirty || semester.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!semester.errors.required\">\n                Semester is required\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"yearLevel\" class=\"col-md-3 control-label\">Year Level</label>\n          <div class=\"col-md-8\">\n            <input type=\"number\" class=\"form-control\" id=\"yearLevel\" [(ngModel)]=\"_year_level\" required name=\"yearLevel\" placeholder=\"Year level\"\n              #yearLevel=\"ngModel\">\n            <div *ngIf=\"yearLevel.errors && (yearLevel.dirty || yearLevel.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!yearLevel.errors.required\">\n                Year Level is required\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"mark\" class=\"col-md-3 control-label\">Mark </label>\n          <div class=\"col-md-8\">\n            <input type=\"number\" class=\"form-control\" id=\"mark\" [(ngModel)]=\"_mark\" required name=\"mark\" placeholder=\"Mark\" #mark=\"ngModel\">\n            <div *ngIf=\"mark.errors && (mark.dirty || mark.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!mark.errors.required\">\n                Mark is required\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group text-left\">\n          <label class=\"col-md-3 control-label\">Degree</label>\n          <div class=\"col-md-8\">\n            <i *ngIf=\"isLoading\" class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i>\n            <div class=\"radio\" *ngFor=\"let degree of degrees\">\n              <label>\n                <input type=\"radio\" name=\"option\" name=\"degree\" value=\"{{degree._id}}\">\n                 {{degree.degree_name}} - <strong>{{degree.school_name}}</strong>\n                </label>\n            </div>\n            <br>\n            <div class=\"button\">\n              <input type=\"submit\" [disabled]=\"!addMarkForm.form.valid\" class=\"btn btn-primary\" value=\"Add\">\n              <input (click)=\"clearForm()\" class=\"btn btn-info\" value=\"Clear\">\n            </div>\n          </div>\n        </div>\n      </fieldset>\n    </form>\n  </div>\n</div>\n\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"add-mark-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-mark-modalLabel\" data-backdrop=\"static\"\n  data-keyboard=\"false\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 573:
/***/ (function(module, exports) {

module.exports = "<div class=\"col-md-12\">\n  <div class=\"well bs-component\">\n    <form #addSchoolForm=\"ngForm\" *ngIf=\"active\" (ngSubmit)=\"addSchoolSubmit()\" class=\"form-horizontal\">\n      <fieldset>\n        <legend>Add School</legend>\n\n        <div class=\"form-group\">\n          <label for=\"schoolName\" class=\"col-md-3 control-label\">School name</label>\n          <div class=\"col-md-8\">\n            <input type=\"text\" class=\"form-control\" id=\"schoolName\" [(ngModel)]=\"_school_name\" required minlength=\"6\" name=\"schoolName\"\n              placeholder=\"School name\" #schoolName=\"ngModel\">\n            <div *ngIf=\"schoolName.errors && (schoolName.dirty || schoolName.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!schoolName.errors.required\">\n                School Name is required\n              </div>\n              <div [hidden]=\"!schoolName.errors.minlength\">\n                School Name must be at least 6 characters long.\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"city\" class=\"col-md-3 control-label\">City</label>\n          <div class=\"col-md-8\">\n            <input type=\"text\" class=\"form-control\" id=\"city\" [(ngModel)]=\"_city\" required name=\"city\" placeholder=\"City\" #city=\"ngModel\">\n            <div *ngIf=\"city.errors && (city.dirty || city.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!city.errors.required\">\n                City is required\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"state\" class=\"col-md-3 control-label\">State</label>\n          <div class=\"col-md-8\">\n            <input type=\"text\" class=\"form-control\" id=\"state\" [(ngModel)]=\"_state\" required name=\"state\" placeholder=\"State\" #state=\"ngModel\">\n            <div *ngIf=\"state.errors && (state.dirty || state.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!state.errors.required\">\n                State is required\n              </div>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <label for=\"country\" class=\"col-md-3 control-label\">Country</label>\n          <div class=\"col-md-8\">\n            <input type=\"text\" class=\"form-control\" id=\"country\" [(ngModel)]=\"_country\" required name=\"country\" placeholder=\"Country\"\n              #country=\"ngModel\">\n            <div *ngIf=\"country.errors && (country.dirty || country.touched)\" class=\"custom_alert\">\n              <div [hidden]=\"!country.errors.required\">\n                Country is required\n              </div>\n            </div>\n            <br>\n            <div class=\"button\">\n              <input type=\"submit\" [disabled]=\"!addSchoolForm.form.valid\" class=\"btn btn-primary\" value=\"Add\">\n              <input type=\"submit\" (click)=\"clearForm()\" class=\"btn btn-info\" value=\"Clear\">\n            </div>\n          </div>\n        </div>\n      </fieldset>\n    </form>\n  </div>\n</div>\n\n\n<!--modal component-->\n<div class=\"modal bs-example-modal-sm\" id=\"add-school-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"add-school-modalLabel\" data-backdrop=\"static\">\n  <div class=\"modal-dialog modal-sm\" role=\"document\">\n    <div class=\"modal-content\">\n      <div *ngIf=\"!modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>In progress <i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i></h3>\n      </div>\n      <div *ngIf=\"modal_msg_controller\" class=\"modal-body text-center\">\n        <h3>{{modal_msg}}\n          <i *ngIf=\"modal_msg_on_success\" class=\"fa fa-check-circle animated zoomIn\" style=\"color:green\"></i>\n          <i *ngIf=\"!modal_msg_on_success\" class=\"fa fa-times-circle animated zoomIn\" style=\"color: darkred\"></i>\n        </h3>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "h.5819da99b6ace850688d.png";

/***/ }),

/***/ 594:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(342);


/***/ })

},[594]);
//# sourceMappingURL=main.bundle.js.map