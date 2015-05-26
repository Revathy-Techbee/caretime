angular.module('templates-app', ['access/access.tpl.html', 'access/employeeLogin/employeeLogin.tpl.html', 'access/forgotPassword/forgotPassword.tpl.html', 'access/resetPassword/resetPassword.tpl.html', 'access/sign-in/sign-in.tpl.html', 'access/sign-up/sign-up.tpl.html', 'admin/admin.tpl.html', 'admin/agency/add-update-agency.tpl.html', 'admin/agency/agencies.tpl.html', 'admin/agency/mapDetailView.tpl.html', 'admin/updatePassword/updatePassword.tpl.html', 'ct-app/agency/add-update-agency.tpl.html', 'ct-app/agency/mapDetailView.tpl.html', 'ct-app/authorizations/add-update-authorizations.tpl.html', 'ct-app/authorizations/authorizations.tpl.html', 'ct-app/ct-app.tpl.html', 'ct-app/employees/add-update-employee.tpl.html', 'ct-app/employees/employee-dashboard.tpl.html', 'ct-app/employees/employee-dashboard_bk.tpl.html', 'ct-app/employees/employees.tpl.html', 'ct-app/employees/mapDetailView.tpl.html', 'ct-app/employees/upload-skeleton.tpl.html', 'ct-app/employees/view-employee.tpl.html', 'ct-app/jobs/add-update-job.tpl.html', 'ct-app/jobs/job-dashboard.tpl.html', 'ct-app/jobs/jobs.tpl.html', 'ct-app/jobs/mapDetailView.tpl.html', 'ct-app/jobs/view-job.tpl.html', 'ct-app/logs/alertLog/add-update-alertLog.tpl.html', 'ct-app/logs/alertLog/alertLog.tpl.html', 'ct-app/logs/callLog/callLogs.tpl.html', 'ct-app/logs/customPrompts/customPrompts.tpl.html', 'ct-app/logs/employeeActivities/employeeActivities.tpl.html', 'ct-app/logs/timeCards/InactiveTimeCard.tpl.html', 'ct-app/logs/timeCards/add-update-timeCard.tpl.html', 'ct-app/logs/timeCards/timeCards.tpl.html', 'ct-app/mainDashboard/mainDashboard.tpl.html', 'ct-app/manageLists/activities/activities.tpl.html', 'ct-app/manageLists/activities/add-update-activity.tpl.html', 'ct-app/manageLists/activityCodes/activityCodes.tpl.html', 'ct-app/manageLists/activityCodes/add-update-activityCode.tpl.html', 'ct-app/manageLists/customPrompts/add-update-customPrompt.tpl.html', 'ct-app/manageLists/customPrompts/customPrompts.tpl.html', 'ct-app/manageLists/observations/add-update-observation.tpl.html', 'ct-app/manageLists/observations/observations.tpl.html', 'ct-app/manageLists/payClasses/add-update-payClass.tpl.html', 'ct-app/manageLists/payClasses/payClasses.tpl.html', 'ct-app/manageLists/payTypes/add-update-payType.tpl.html', 'ct-app/manageLists/payTypes/payTypes.tpl.html', 'ct-app/manageLists/payors/add-update-payor.tpl.html', 'ct-app/manageLists/payors/payors.tpl.html', 'ct-app/manageLists/serviceItems/add-update-serviceItem.tpl.html', 'ct-app/manageLists/serviceItems/serviceItems.tpl.html', 'ct-app/manageLists/skills/add-update-skill.tpl.html', 'ct-app/manageLists/skills/skills.tpl.html', 'ct-app/manageLists/tasks/add-update-task.tpl.html', 'ct-app/manageLists/tasks/tasks.tpl.html', 'ct-app/mapView/mapView.tpl.html', 'ct-app/reports/accountActivities/accountActivities.tpl.html', 'ct-app/reports/activityReports/activityReports.tpl.html', 'ct-app/reports/authorizedVsActuall/authorizedVsActuall.tpl.html', 'ct-app/reports/dailyHoursChart/dailyHoursChart.tpl.html', 'ct-app/reports/employeeList/employeeList.tpl.html', 'ct-app/reports/employeeTimecard/employeeTimecard.tpl.html', 'ct-app/reports/employeeWeeklyHours/employeeWeeklyHours.tpl.html', 'ct-app/reports/inactivityEmployees/inactivityEmployees.tpl.html', 'ct-app/reports/jobList/jobList.tpl.html', 'ct-app/reports/jobNoSchedule/jobNoSchedule.tpl.html', 'ct-app/reports/jobObservation/jobObservation.tpl.html', 'ct-app/reports/jobTask/jobTask.tpl.html', 'ct-app/reports/jobTimecard/jobTimecard.tpl.html', 'ct-app/reports/jobWeeklyHours/jobWeeklyHours.tpl.html', 'ct-app/reports/mapReport/mapReport.tpl.html', 'ct-app/reports/scheduleReport/scheduleReport.tpl.html', 'ct-app/reports/scheduleVsActuall/scheduleVsActuall.tpl.html', 'ct-app/reports/timecardExport/timecardExport.tpl.html', 'ct-app/schedules/add-update-schedule.tpl.html', 'ct-app/schedules/schedules.tpl.html', 'ct-app/updatePassword/updatePassword.tpl.html', 'ct-app/zones/add-update-zone.tpl.html', 'ct-app/zones/zone-employee-dashboard.tpl.html', 'ct-app/zones/zones.tpl.html', 'partials/access_header.tpl.html', 'partials/admin_header.tpl.html', 'partials/admin_nav.tpl.html', 'partials/aside.tpl.html', 'partials/datepicker.tpl.html', 'partials/header.tpl.html', 'partials/nav.tpl.html', 'partials/page_footer.tpl.html', 'partials/settings.tpl.html', 'utils/directive-templates/dropdown.tpl.html', 'utils/directive-templates/inline-edit.tpl.html', 'utils/directive-templates/popover-html-unsafe-popup.tpl.html']);

angular.module("access/access.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/access.tpl.html",
    "<!-- navbar -->\n" +
    "  <div data-ng-include=\" 'partials/access_header.tpl.html' \" class=\"app-header navbar\">\n" +
    "  </div>\n" +
    "  <!-- / navbar -->\n" +
    "\n" +
    "\n" +
    "  <!-- content -->\n" +
    "    <div ui-view=\"accessNested\" class=\"fade-in-right-big smooth\"></div>\n" +
    "\n" +
    "  <!-- /content -->\n" +
    "\n" +
    "  <!-- footer -->\n" +
    "\n" +
    "  <!--<div class=\"app-footer wrapper b-t bg-light\">\n" +
    "    <span class=\"pull-right\">{{app.version}} <a href ui-scroll=\"app\" class=\"m-l-sm text-muted\"><i class=\"fa fa-long-arrow-up\"></i></a></span>\n" +
    "    &copy; 2014 Caretime Copyright.\n" +
    "  </div>-->\n" +
    "\n" +
    "\n" +
    "  \n" +
    "\n" +
    "  <!-- / footer -->\n" +
    "\n" +
    " <!-- <div data-ng-include=\" 'partials/settings.tpl.html' \" ></div> Revathy Not Needed-->");
}]);

angular.module("access/employeeLogin/employeeLogin.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/employeeLogin/employeeLogin.tpl.html",
    "<a href class=\"navbar-brand block m-t\">{{app.name}}<span ng-if=\"agencyName && agencyName!=''\">  - {{agencyName}}</span></a>\n" +
    "<div class=\"container w-xxl w-auto-xs\">\n" +
    "    <div class=\"m-b-lg\">\n" +
    "        <div class=\"wrapper text-center\">\n" +
    "            <strong>Set Your Password</strong>\n" +
    "        </div>\n" +
    "\n" +
    "        <form name=\"empLogin\" class=\"form-validation form-horizontal\" rc-submit=\"employeeLogin()\" novalidate>\n" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': rc.empLogin.needsAttention(empLogin.username)}\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <input readonly placeholder=\"UserName\" name=\"username\" ng-model=\"username\" class=\"form-control\" required=\"\">\n" +
    "                    <span class=\"help-block\" ng-show=\"empLogin.username.$error.required && rc.empLogin.needsAttention(empLogin.username)\">Username is required.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': rc.empLogin.needsAttention(empLogin.password1)}\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <input type=\"password\" placeholder=\"Set Password\" id=\"password1\" name=\"password1\" ng-model=\"password1\" class=\"form-control\" required=\"\">\n" +
    "                    <span class=\"help-block\" ng-show=\"empLogin.password1.$error.required && rc.empLogin.needsAttention(empLogin.password1)\">Password is required.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': rc.empLogin.needsAttention(empLogin.password2)}\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <input type=\"password\" placeholder=\"Confirm Password\" id=\"password2\" name=\"password2\" ng-model=\"password2\" class=\"form-control\" required=\"\">\n" +
    "                    <span class=\"help-block\" ng-show=\"empLogin.password2.$error.required && rc.empLogin.needsAttention(empLogin.password2)\">Confirm Password is required.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"alert alert-danger\" ng-show=\"empLogin.password2.$error.pwmatch\">\n" +
    "                <span>Passwords don't match.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                        {{ErrorMsg}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block\">Set Password</button>\n" +
    "            <div class=\"line line-dashed\"></div>\n" +
    "            <p class=\"text-center\"><small>Already have an account?</small>\n" +
    "            </p>\n" +
    "            <a ui-sref=\"access.signin\" class=\"btn btn-lg btn-default btn-block\">Sign in</a>\n" +
    "\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"text-center\" ng-include=\"'partials/page_footer.tpl.html'\"></div>\n" +
    "</div>");
}]);

angular.module("access/forgotPassword/forgotPassword.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/forgotPassword/forgotPassword.tpl.html",
    "<a href class=\"navbar-brand block m-t\">{{app.name}}<span ng-if=\"agencyName && agencyName!=''\">  - {{agencyName}}</span></a>\n" +
    "<div class=\"container w-xl w-auto-xs\">\n" +
    "    \n" +
    "    <div class=\"m-b-lg\">\n" +
    "        <div class=\"wrapper text-center\">\n" +
    "            <strong>Forgot Password</strong>\n" +
    "        </div>\n" +
    "        <form name=\"forgotPwd\" class=\"form-validation form-horizontal\" rc-submit=\"forgotPassword()\" novalidate>\n" +
    "           \n" +
    "            \n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.forgotPwd.needsAttention(empLogin.username)}\">\n" +
    "                    <input type=\"text\" placeholder=\"UserName\" capitalize name=\"username\" ng-model=\"username\" class=\"form-control\" ng-required=\"true\" />\n" +
    "                    \n" +
    "                   <!-- <em class=\"m-b-none text-muted\">A reset link sent to your email address, please check it will be active only 24 hours. </em> -->\n" +
    "                    <span class=\"help-block\" ng-show=\"forgotPwd.username.$error.required && rc.forgotPwd.needsAttention(forgotPwd.username)\">UserName is required.</span>\n" +
    "                </div>\n" +
    "                 <div class=\"form-group\">\n" +
    "                <button type=\"submit\" ng-disabled=\"savedisable==1\" class=\"btn btn-lg btn-primary btn-block\">Send</button>\n" +
    "                </div>\n" +
    "                <div class=\"text-center m-t m-b\"><a ui-sref=\"access.signin\">Go Back to Login Page</a></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    \n" +
    "                        <div class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                            {{ErrorMsg}}\n" +
    "                        \n" +
    "                    </div>\n" +
    "                </div>\n" +
    "        </form>\n" +
    "        \n" +
    "    </div>\n" +
    "    <div class=\"text-center\" ng-include=\"'partials/page_footer.tpl.html'\"></div>\n" +
    "</div>");
}]);

angular.module("access/resetPassword/resetPassword.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/resetPassword/resetPassword.tpl.html",
    "<a href class=\"navbar-brand block m-t\">{{app.name}}<span ng-if=\"agencyName && agencyName!=''\">  - {{agencyName}}</span></a>\n" +
    "<div class=\"container w-xl w-auto-xs\">\n" +
    "    <div class=\"m-b-lg\">\n" +
    "        <div class=\"wrapper text-center\">\n" +
    "            <strong>Reset your password</strong>\n" +
    "        </div>\n" +
    "      <form name=\"resetPwd\" class=\"form-validation form-horizontal resetPwd\" rc-submit=\"resetPassword()\" novalidate>\n" +
    "           \n" +
    "            \n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.resetPwd.needsAttention(resetPwd.password1)}\">\n" +
    "                \n" +
    "                    <input type=\"password\" placeholder=\"Set Password\" id=\"password1\" name=\"password1\" ng-model=\"password1\" class=\"form-control\" required=\"\">\n" +
    "                     <span class=\"help-block\" ng-show=\"resetPwd.password1.$error.required && rc.resetPwd.needsAttention(resetPwd.password1)\">Set Password is required.</span>\n" +
    "                \n" +
    "            </div>\n" +
    "            <div class=\"form-group\" ng-class=\"{'has-error': rc.resetPwd.needsAttention(resetPwd.password2)}\">\n" +
    "                \n" +
    "                    <input type=\"password\" placeholder=\"Confirm Password\" id=\"password2\" name=\"password2\" pw-check=\"password1\" ng-model=password2 class=\"form-control\" required=\"\">\n" +
    "                     <span class=\"help-block\" ng-show=\"resetPwd.password2.$error.required && rc.resetPwd.needsAttention(resetPwd.password2)\">Confirm Password is required.</span>\n" +
    "                \n" +
    "            </div>\n" +
    "                 <div class=\"form-group\">\n" +
    "                <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block\" ng-disabled=\"savedisable==1\">Update</button>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    \n" +
    "                        <div class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                            {{ErrorMsg}}\n" +
    "                        </div>\n" +
    "                    \n" +
    "                </div>\n" +
    "        </form>\n" +
    "        \n" +
    "    </div>\n" +
    "    <div class=\"text-center\" ng-include=\"'partials/page_footer.tpl.html'\"></div>\n" +
    "</div>");
}]);

angular.module("access/sign-in/sign-in.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/sign-in/sign-in.tpl.html",
    "<div class=\"wrapper-md\" >\n" +
    "    <div>\n" +
    "      <a href class=\"navbar-brand block m-t\">{{app.name}}<span ng-if=\"agencyName && agencyName!=''\">  - {{agencyName}}</span></a>\n" +
    "    </div>\n" +
    "    <div class=\"container w-xxl w-auto-xs\">\n" +
    "        \n" +
    "        <div class=\"m-b-lg\">\n" +
    "            <div class=\"wrapper text-center\">\n" +
    "                <strong>Enter your email address and Password to access the system</strong>\n" +
    "            </div>\n" +
    "            <form name=\"singInForm\" class=\"form-validation form-horizontal general\"\n" +
    "                  rc-submit=\"signInUser()\" novalidate>\n" +
    "\n" +
    "                <div class=\"form-group\"\n" +
    "                     ng-class=\"{'has-error': rc.singInForm.needsAttention(singInForm.username)}\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <input type=\"text\" placeholder=\"UserName\"\n" +
    "                               capitalize name=\"username\"\n" +
    "                               ng-model=\"user.user_email\"\n" +
    "                               class=\"form-control\"\n" +
    "                               ng-required=\"true\" />\n" +
    "\n" +
    "                        <span class=\"help-block\" ng-show=\"singInForm.username.$error.required &&\n" +
    "                        rc.singInForm.needsAttention(singInForm.username)\">Username is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\"\n" +
    "                     ng-class=\"{'has-error': rc.singInForm.needsAttention(singInForm.password)}\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <input type=\"password\"\n" +
    "                               placeholder=\"Password\"\n" +
    "                               name=\"password\"\n" +
    "                               ng-model=\"user.user_password\"\n" +
    "                               class=\"form-control\"\n" +
    "                               ng-required=\"true\" />\n" +
    "                        <span class=\"help-block\" ng-show=\"singInForm.password.$error.required && rc.singInForm.needsAttention(singInForm.password)\">Password is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div show-loader=\"show_form_loader\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                            {{ErrorMsg}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block\">Log in</button>\n" +
    "\n" +
    "                <div class=\"text-center m-t m-b\"><a ui-sref=\"access.forgotPassword\">Forgot password?</a></div>\n" +
    "                 <!--<div class=\"line line-dashed\"></div>\n" +
    "               <p class=\"text-center\"><small>Do not have an account?</small></p>\n" +
    "                <a ui-sref=\"access.signup\" class=\"btn btn-lg btn-default btn-block\">Create an account</a>-->\n" +
    "            </form>\n" +
    "        </div>\n" +
    "        <div class=\"text-center\" ng-include=\"'partials/page_footer.tpl.html'\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("access/sign-up/sign-up.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("access/sign-up/sign-up.tpl.html",
    "<div >\n" +
    "    <div class=\"container w-xxl w-auto-xs\">\n" +
    "        <a href class=\"navbar-brand block m-t\">{{app.name}}</a>\n" +
    "        <div class=\"m-b-lg\">\n" +
    "            <div class=\"wrapper text-center\">\n" +
    "                <strong>Sign up to find interesting thing</strong>\n" +
    "            </div>\n" +
    "            <form name=\"signUpForm\" class=\"form-validation form-horizontal signup\"\n" +
    "                  rc-submit=\"signup_user()\" novalidate>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\" ng-class=\"{'has-error': rc.signUpForm.needsAttention(signUpForm.username)}\">\n" +
    "                        <input placeholder=\"Name\"  name=\"username\" capitalize ng-model=\"user.user_name\" class=\"form-control\" required=\"\" >\n" +
    "                        <span class=\"help-block\" ng-show=\"signUpForm.username.$error.required && rc.signUpForm.needsAttention(signUpForm.username)\">Username is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\" ng-class=\"{'has-error': rc.signUpForm.needsAttention(signUpForm.email)}\">\n" +
    "                        <input type=\"email\" placeholder=\"Email\" capitalize name=\"email\" ng-model=\"user.user_email\" class=\"form-control\" required=\"\">\n" +
    "                        <span class=\"help-block\" ng-show=\"signUpForm.email.$error.required && rc.signUpForm.needsAttention(signUpForm.email)\">Email is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\" ng-class=\"{'has-error': rc.signUpForm.needsAttention(signUpForm.password1)}\">\n" +
    "                        <input type=\"password\" placeholder=\"Password\" id=\"password1\" name=\"password1\" ng-model=\"user.user_password\" class=\"form-control\" required=\"\">\n" +
    "                        <span class=\"help-block\" ng-show=\"signUpForm.password1.$error.required && rc.signUpForm.needsAttention(signUpForm.password1)\">Password is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\" ng-class=\"{'has-error': rc.signUpForm.needsAttention(signUpForm.password2)}\">\n" +
    "                        <input type=\"password\" placeholder=\"Confirm Password\"  id=\"password2\" name=\"password2\" pw-check=\"password1\" ng-model=\"user.user_password2\" class=\"form-control\" required=\"\">\n" +
    "                        <span class=\"help-block\" ng-show=\"signUpForm.password2.$error.required && rc.signUpForm.needsAttention(signUpForm.password2)\">Confirm password is required.</span>\n" +
    "                        <span class=\"help-block\" ng-show=\"signUpForm.password2.$error.pwmatch\"> Passwords don't match. </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"checkbox m-b-md m-t-none\">\n" +
    "                        <div class=\"col-sm-12\">\n" +
    "                            <label class=\"i-checks\" ng-class=\"{'has-error': rc.signUpForm.needsAttention(signUpForm.user_agree_checkbox)}\">\n" +
    "                                <input ng-model=\"user.user_agree\" class=\"form-field\" name=\"user_agree_checkbox\" type=\"checkbox\" required=\"\"><i></i> Agree the <a href>terms and policy</a>\n" +
    "                                <span class=\"help-block\" ng-show=\"signUpForm.user_agree_checkbox.$error.required && rc.signUpForm.needsAttention(signUpForm.user_agree_checkbox)\">Please accept the agreement.</span>\n" +
    "\n" +
    "                            </label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div show-loader=\"show_form_loader\"></div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "\n" +
    "                            {{ErrorMsg}}\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block\">Sign up</button>\n" +
    "                <div class=\"line line-dashed\"></div>\n" +
    "                <p class=\"text-center\"><small>Already have an account?</small></p>\n" +
    "                <a ui-sref=\"access.signin\" class=\"btn btn-lg btn-default btn-block\">Sign in</a>\n" +
    "\n" +
    "            </form>\n" +
    "        </div>\n" +
    "        <div class=\"text-center\" ng-include=\"'partials/page_footer.tpl.html'\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/admin.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/admin.tpl.html",
    "<!-- navbar -->\n" +
    "<div data-ng-include=\" 'partials/admin_header.tpl.html' \" class=\"app-header navbar\">\n" +
    "</div>\n" +
    "<!-- / navbar -->\n" +
    "<!-- menu -->\n" +
    " <div data-ng-include=\" 'partials/admin_nav.tpl.html' \" class=\"app-aside hidden-xs {{app.settings.asideColor}}\">\n" +
    "  </div>\n" +
    "\n" +
    "<!-- / menu -->\n" +
    "<!-- content -->\n" +
    "<div class=\"app-content\">\n" +
    "   <div ui-butterbar></div>\n" +
    "   <div class=\"app-content-body fade-in-up\" ui-view=\"appNested\"></div>\n" +
    "   <div  style=\"clear: both;\"></div>\n" +
    "</div>\n" +
    "<!-- /content -->\n" +
    "<!-- footer -->\n" +
    "<div data-ng-include=\" 'partials/page_footer.tpl.html' \" class=\"app-footer wrapper b-t bg-light\">\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("admin/agency/add-update-agency.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/agency/add-update-agency.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "  <h1 class=\"m-n font-thin h3\">{{pageTitle}} Agency</h1>\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "\n" +
    "	<div>\n" +
    "			<tabset class=\"tab-container\">\n" +
    "			<tab heading=\"General\" active=\"empSteps.general\" select=\"empSteps.percent=50\">\n" +
    "				<p class=\"m-b\">Agency Detail General details. <em class=\"text-danger\">Required fields are in Red</em></p>\n" +
    "	      		<progressbar value=\"empSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "		  		<form name=\"general\"  class=\"form-validation form-horizontal agency\" rc-submit=\"agencyManage('general')\" novalidate>\n" +
    "	      			<div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.agency_name)}\">\n" +
    "			          <label class=\"col-sm-2 control-label text-danger\"> Agency Name</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            <div class=\"row\">\n" +
    "			              <div class=\"col-md-12\">\n" +
    "			                \n" +
    "			                <input type=\"text\" capitalize class=\"form-control\" name=\"agency_name\" required=\"\" placeholder=\"Agency Name\" ng-model=\"agency.agency_name\" >\n" +
    "			                <span class=\"help-block\" ng-show=\"general.agency_name.$error.required\n" +
    "                                && rc.general.needsAttention(general.agency_name)\">Agency Name is required.</span>\n" +
    "\n" +
    "			              \n" +
    "			              </div>\n" +
    "			            </div>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        <div class=\"form-group\"  ng-if=\"pageTitle=='Update'\">\n" +
    "			          <label class=\"col-sm-2 control-label\"> Agency Code <i class=\"fa fa-question-circle\" popover=\"Agency Code is a generated unique code\" popover-trigger=\"mouseenter\"  popover-placement=\"right\"></i></label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            \n" +
    "			                <input type=\"text\" capitalize class=\"form-control\" readonly=\"\" disabled=\"\" placeholder=\"Agency Name\" ng-model=\"agency.agency_id\" >\n" +
    "			              \n" +
    "			            \n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			\n" +
    "			        <div class=\"form-group\"  ng-class=\"{'has-error': rc.general.needsAttention(general.address)}\">\n" +
    "			          <label class=\"col-sm-2 control-label text-danger\">Address1</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			              <!-- <input type=\"text\" class=\"form-control\" ng-model=\"agency.primary_address1\" required=\"\"  placeholder=\"Address line 1\"> -->\n" +
    "			                <input type=\"text\" id=\"Autocomplete2\" capitalize class=\"form-control\" placeholder=\"Address line 1\" name=\"address\" required=\"\" ng-model=\"agency.primary_address1\" ng-autocomplete options=\"options\" details=\"details\" ng-keypress=\"preventNext($event)\">\n" +
    "			                 <span class=\"help-block\" ng-show=\"general.address.$error.required\n" +
    "                                && rc.general.needsAttention(general.address)\">Address1 is required.</span>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			\n" +
    "			        <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Address2</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			              <input type=\"text\" class=\"form-control\" capitalize ng-model=\"agency.primary_address2\"  placeholder=\"Address line 2\">\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			       <div class=\"form-group\"  ng-class=\"{'has-error': rc.general.needsAttention(general.primary_zip)}\">\n" +
    "				        <label class=\"col-sm-2 control-label text-danger\">Zip/County/City/State</label>\n" +
    "				          <div class=\"col-sm-10\">\n" +
    "				            <div class=\"row\">\n" +
    "				              <div class=\"col-md-3\">\n" +
    "				                \n" +
    "								   <input type=\"text\" capitalize class=\"form-control\" ng-required=\"true\" name=\"primary_zip\"  required=\"\"  placeholder=\"ZIP\" ng-model=\"agency.primary_zip\" ng-pattern=\"/^[0-9]+$/\">\n" +
    "								    <span class=\"help-block\" ng-show=\"general.primary_zip.$error.required\n" +
    "                                && rc.general.needsAttention(general.primary_zip)\">Zip is required.</span>\n" +
    "				              \n" +
    "				            \n" +
    "				              </div>\n" +
    "				              <div class=\"col-md-3\">\n" +
    "				                <input type=\"text\" class=\"form-control\" capitalize placeholder=\"County\" ng-model=\"agency.primary_county\" name=\"primary_county\" >\n" +
    "				                <!-- <span class=\"help-block\" ng-show=\"general.primary_county.$error.required\n" +
    "                                && rc.general.needsAttention(general.primary_county)\">County is required.</span> -->\n" +
    "				              </div>\n" +
    "				              <div class=\"col-md-4\">\n" +
    "				                <input type=\"text\" class=\"form-control\" capitalize  placeholder=\"City\" ng-model=\"agency.primary_city\" name=\"primary_city\" required=\"\" >\n" +
    "				                 <span class=\"help-block\" ng-show=\"general.primary_city.$error.required\n" +
    "                                && rc.general.needsAttention(general.primary_city)\">City is required.</span>\n" +
    "				              </div>\n" +
    "				              <div class=\"col-md-2\">\n" +
    "				                <input type=\"text\" class=\"form-control\" capitalize name=\"primary_state\" required=\"\" placeholder=\"State\" ng-model=\"agency.primary_state\" >\n" +
    "				                 <span class=\"help-block\" ng-show=\"general.primary_state.$error.required\n" +
    "                                && rc.general.needsAttention(general.primary_state)\">State is required.</span>\n" +
    "				              </div>\n" +
    "				              \n" +
    "				            </div>\n" +
    "				            \n" +
    "				            <div class=\"row\" ng-show=\"showZipError\">\n" +
    "			            <div class=\"line\"></div>\n" +
    "				      		<div class=\"col-sm-12\">\n" +
    "				      			<div role=\"alert\" class=\"alert ng-isolate-scope alert-warning alert-dismissable\"  type=\"warning\" >\n" +
    "								    <div ><span class=\"ng-binding ng-scope\">No match found, but continue adding the data</span></div>\n" +
    "								</div>\n" +
    "				      		</div>      \n" +
    "			            </div>\n" +
    "				          </div>\n" +
    "		  		   </div> \n" +
    "			        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "			        <div class=\"form-group\">\n" +
    "			       	      <label class=\"col-sm-2 control-label\">Country</label>\n" +
    "			               <div class=\"col-sm-5\">\n" +
    "                    		<!--<a ng-href=\"{{agency.url}}\" class=\"btn btn-sm btn-info\" target=\"_blank\">Click here to View</a>-->\n" +
    "							   <input type=\"text\" readonly=\"\" class=\"form-control\" capitalize name=\"country\" required=\"\" placeholder=\"Country\" ng-model=\"agency.country\">\n" +
    "							</div>\n" +
    "							<div class=\"col-sm-5\">\n" +
    "\n" +
    "							   <a ng-click=\"mapView(agency)\"  target=\"_blank\" ng-disabled=\"agency.primary_address1==''\">Click here to View Map in Google</a>\n" +
    "                		</div>\n" +
    "                	</div>\n" +
    "                	<div class=\"line\"></div>\n" +
    "                	\n" +
    "			        <div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.contact_name)}\">\n" +
    "			          <label class=\"col-sm-2 control-label text-danger\">Contact Name</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            <input type=\"text\" capitalize class=\"form-control\" name=\"contact_name\" required=\"\"  placeholder=\"Contact Name\" ng-model=\"agency.contact_name\" >\n" +
    "			            <span class=\"help-block\" ng-show=\"general.contact_name.$error.required\n" +
    "                                && rc.general.needsAttention(general.contact_name)\">Contact Name is required.</span>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        <div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.contact_email)}\">\n" +
    "			          <label class=\"col-sm-2 control-label text-danger\">Contact Email</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            <input type=\"email\"  class=\"form-control\" name=\"contact_email\" required=\"\"  placeholder=\"Contact Email\" ng-model=\"agency.contact_email\" >\n" +
    "			            <span class=\"help-block\" ng-show=\"general.contact_email.$error.required\n" +
    "                                && rc.general.needsAttention(general.contact_email)\">Contact Email is required.</span>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Contact Phone</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            <input type=\"text\"  class=\"form-control\"  ng-if=\"agency.country=='United States'\" ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"true\" ng-model=\"agency.contact_phone\" >\n" +
    "			            <input type=\"text\" class=\"form-control\" ng-pattern=\"/^[0-9]+$/\" ng-if=\"agency.country!='United States'\" ng-model=\"agency.contact_phone\" >\n" +
    "			          </div>\n" +
    "			        </div>			        \n" +
    "					\n" +
    "					 <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Telephone / fax</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            <div class=\"row\">\n" +
    "			              <div class=\"col-md-6\">\n" +
    "				              <input type=\"text\"  class=\"form-control\"   placeholder=\"Telephone\" ng-model=\"agency.telephone\" >\n" +
    "			              </div>\n" +
    "			              <div class=\"col-md-6\">\n" +
    "			                  <input type=\"text\"  class=\"form-control\"   placeholder=\"fax\" ng-model=\"agency.fax\" >\n" +
    "			              </div>\n" +
    "			              </div>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "					<div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "			        \n" +
    "			         <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Timezone</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            <div class=\"row\">\n" +
    "			              <div class=\"col-md-6\">\n" +
    "					          <input  type=\"text\" readonly capitalize ng-model=\"agency.timezone\" placeholder=\"Time Zone\"  class=\"form-control\">\n" +
    "					       \n" +
    "			              </div>\n" +
    "			              <div class=\"col-md-6\">\n" +
    "			                  <div class=\"checkbox\">\n" +
    "					              <label class=\"i-checks\">\n" +
    "					                <input type=\"checkbox\"  value=\"1\" ng-model=\"agency.daylight_time_format\">\n" +
    "					                <i></i>\n" +
    "										Observe Daylight Saving Time?\n" +
    "					              </label>\n" +
    "			           \n" +
    "							  </div>\n" +
    "\n" +
    "			              </div>\n" +
    "			              </div>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        \n" +
    "			        <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Enable Alert</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			           <div class=\"checkbox\">\n" +
    "				              <label class=\"i-checks\">\n" +
    "				                <input type=\"checkbox\"  value=\"1\" ng-model=\"agency.enable_alert\">\n" +
    "				                <i></i>\n" +
    "				               Used to disable company alerts during holidays - check to enable (default), uncheck to disable alerts\n" +
    "				              </label>\n" +
    "			           \n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "					</div>	\n" +
    "					<div class=\"form-group\">\n" +
    "	                    <label class=\"col-sm-2 control-label text-danger\">Status</label>\n" +
    "	                    <div class=\"col-sm-10\">\n" +
    "	                        <label class=\"radio-inline i-checks\">\n" +
    "	                            <input type=\"radio\" name=\"status\" value=\"1\" ng-model=\"agency.status\"><i></i> Active\n" +
    "	                        </label>\n" +
    "	                        <label class=\"radio-inline i-checks\">\n" +
    "	                            <input type=\"radio\" name=\"status\" value=\"2\" ng-model=\"agency.status\"><i></i> Trial\n" +
    "	                        </label>\n" +
    "	                        <label class=\"radio-inline i-checks\">\n" +
    "	                            <input type=\"radio\" name=\"status\" value=\"0\" ng-model=\"agency.status\"><i></i> Inactive\n" +
    "	                        </label>\n" +
    "	                    </div>\n" +
    "	                </div>\n" +
    "\n" +
    "			        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "			        <div class=\"form-group\">\n" +
    "			          <div class=\"col-sm-8\">			          \n" +
    "			          <button type=\"submit\"  class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "					\n" +
    "				           <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "						          \n" +
    "						          {{ErrorMsg}}\n" +
    "						  </span>\n" +
    "			          </div>\n" +
    "			          <div class=\"col-sm-4\">\n" +
    "			          <div class=\"pull-right\">\n" +
    "			          <button ng-show=\"agency.agency_id && agency.contact_name && agency.contact_email\" type=\"button\" ng-click='Resendemail()' class=\"btn btn-default  btn-rounded\">Resend mail</button>		\n" +
    "						<button type=\"button\" ng-click='previous_state()' class=\"btn btn-default  btn-rounded\">Cancel</button>		\n" +
    "					</div>		         \n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        <div class=\"form-group\" ng-show=\"agency.agency_id\">\n" +
    "			          <div class=\"col-sm-12\">\n" +
    "			           <div class=\"alert alert-info\">\n" +
    "			         		 <p>Created by: {{agency.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{agency.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"agency.editedOn\">\n" +
    "                                        Edited by: {{agency.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{agency.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                            </div>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "	      		</form>\n" +
    "	      		</tab>\n" +
    "	      	\n" +
    "	      	\n" +
    "	      	<tab heading=\"Configuration\" disabled=\"general.$invalid\" active=\"empSteps.configuration\" select=\"empSteps.percent=100\">\n" +
    "				<p class=\"m-b\">Congratulations! You got to the last step!. <em class=\"text-danger\">Required fields are in Red</em></p>\n" +
    "				<progressbar value=\"empSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "				<form name=\"configuration\" class=\"form-validation form-horizontal configuration\" rc-submit=\"agencyManage('configuration')\" novalidate>\n" +
    "					<div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Greetings</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			             <textarea capitalize rows=\"4\" ng-model=\"agency.ivr_greetings\" cols=\"50\"></textarea>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        <div class=\"form-group\" ng-class=\"{'has-error': rc.configuration.needsAttention(configuration.ivr_number)}\">\n" +
    "			          <label class=\"col-sm-2 control-label text-danger\">IVR Number</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            <input type=\"text\"  ng-if=\"agency.country=='United States'\" name=\"ivr_number\" class=\"form-control\" ui-mask=\"(999) 999-9999\" required=\"\" ui-mask-use-viewvalue=\"false\" ng-model=\"agency.ivr_number\">\n" +
    "			             <input type=\"text\"  ng-if=\"agency.country!='United States'\" name=\"ivr_number\" class=\"form-control\" required=\"\" ng-pattern=\"/^[0-9]+$/\" ng-model=\"agency.ivr_number\">\n" +
    "			            <span class=\"help-block\" ng-show=\"configuration.ivr_number.$error.required\n" +
    "                                && rc.configuration.needsAttention(configuration.ivr_number)\">IVR Number is required.</span>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "					     \n" +
    "			       <!-- <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">External Code1</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			             <input type=\"text\"  capitalize class=\"form-control\"    placeholder=\"Enter custom code\" ng-model=\"agency.external_code.code1\" >\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "					\n" +
    "					 <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">External Code2</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			             <input type=\"text\" capitalize  class=\"form-control\"   placeholder=\"Enter custom code\" ng-model=\"agency.external_code.code2\" >\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        \n" +
    "			        <div class=\"line line-dashed b-b line-lg pull-in\"></div> -->\n" +
    "			        			        \n" +
    "			        <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Label for Zones</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			             <input type=\"text\"  class=\"form-control\" capitalize  placeholder=\" Label for Zones\" ng-model=\"agency.labels.zones\" >\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "					\n" +
    "					 <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Label for Jobs</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			             <input type=\"text\"  class=\"form-control\" capitalize  placeholder=\"Label for Jobs\" ng-model=\"agency.labels.jobs\" >\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Label for Employees</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			             <input type=\"text\"  class=\"form-control\" capitalize  placeholder=\"Label for Employees\" ng-model=\"agency.labels.employees\" >\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "			        <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Payroll Period</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            <label class=\"radio-inline i-checks\">\n" +
    "			              <input type=\"radio\" name=\"a\" value=\"0\"  ng-model=\"agency.pay_period\" ><i></i> Weekly\n" +
    "			            </label>\n" +
    "			            <label class=\"radio-inline i-checks\">\n" +
    "			              <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"agency.pay_period\" ><i></i> Bi-Weekly\n" +
    "			            </label>\n" +
    "			            <label class=\"radio-inline i-checks\">\n" +
    "			              <input type=\"radio\" name=\"a\" value=\"2\" ng-model=\"agency.pay_period\" ><i></i> Monthly\n" +
    "			            </label>\n" +
    "			            <label class=\"radio-inline i-checks\">\n" +
    "			              <input type=\"radio\" name=\"a\" value=\"3\" ng-model=\"agency.pay_period\" ><i></i> Semi monthly\n" +
    "			            </label>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			         <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Work Week</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "				\n" +
    "			            <div>\n" +
    "			              <select ui-select2 class=\"form-control w-md\" ng-model=\"agency.work_week\" >\n" +
    "			                <option value=\"0\">Sunday</option>\n" +
    "			                <option value=\"1\">Monday</option>\n" +
    "			                <option value=\"2\">Tuesday</option>\n" +
    "			                <option value=\"3\">Wednesday</option>\n" +
    "			                <option value=\"4\">Thursday</option>\n" +
    "			                <option value=\"5\">Friday</option>\n" +
    "			                <option value=\"6\">Saturday</option>\n" +
    "			              </select>\n" +
    "			            </div>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "			      \n" +
    "			        <div class=\"form-group\" ng-class=\"{'has-error': rc.configuration.needsAttention(configuration.config_zone_code)}\" ng-show=\"!agency.agency_id\">\n" +
    "						<label class=\"col-sm-2 control-label text-danger\">Digits for Zone Code</label>\n" +
    "						<div class=\"col-sm-10\">\n" +
    "			  				<input type=\"number\" required readonly  data-min='4' data-max=\"6\" class=\"form-control\" name=\"config_zone_code\"   placeholder=\"Size of Zone code\" ng-model=\"agency.config_zone_code\" >\n" +
    "			  				<span class=\"help-block\" ng-show=\"configuration.config_zone_code.$error.required\n" +
    "                                && rc.configuration.needsAttention(configuration.config_zone_code)\">Digits for Zone Code is required.</span>\n" +
    "                    	</div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.configuration.needsAttention(configuration.config_employee_code)}\"  ng-show=\"!agency.agency_id\">\n" +
    "						<label class=\"col-sm-2 control-label text-danger\">Digits for Employee Code</label>\n" +
    "						<div class=\"col-sm-10\">\n" +
    "			  				<input type=\"number\" required readonly data-min='4'  data-max=\"6\" class=\"form-control\" name=\"config_employee_code\"  placeholder=\"Size of Employee code\" ng-model=\"agency.config_employee_code\" >\n" +
    "			  				<span class=\"help-block\" ng-show=\"configuration.config_employee_code.$error.required  && rc.configuration.needsAttention(configuration.config_employee_code)\">Digits for Employee Code is required.</span>\n" +
    "                    	</div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.configuration.needsAttention(configuration.config_job_code)}\" ng-show=\"!agency.agency_id\">\n" +
    "						<label class=\"col-sm-2 control-label text-danger\">Digits for Job Code</label>\n" +
    "						<div class=\"col-sm-10\">\n" +
    "			  				<input type=\"number\" required readonly  data-min='4' data-max=\"6\" class=\"form-control\" name=\"config_job_code\" placeholder=\"Size of job Code\" ng-model=\"agency.config_job_code\" >\n" +
    "			  				<span class=\"help-block\" ng-show=\"configuration.config_job_code.$error.required  && rc.configuration.needsAttention(configuration.config_job_code)\">Digits for Job Code  is required.</span>\n" +
    "                    	</div>\n" +
    "                    </div>	\n" +
    "                    <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">Clock-in Notification Duration</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			            <div>\n" +
    "			              <select ui-select2 class=\"form-control w-md\" ng-model=\"agency.notify_interval\" >\n" +
    "			                <option value=\"15\">15 Min</option>\n" +
    "			                <option value=\"30\">30 Min</option>\n" +
    "			                \n" +
    "			               \n" +
    "			              </select>\n" +
    "			            </div>\n" +
    "			          </div>\n" +
    "			        </div>		\n" +
    "			        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "			        \n" +
    "			        <div class=\"form-group\">\n" +
    "			          <div class=\"col-sm-8\">			          \n" +
    "			          <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click=\"agencyManagePrev('configuration')\">Prev</button>			          \n" +
    "				          <button type=\"submit\" class=\"btn btn-primary  btn-rounded\">Save Changes</button>\n" +
    "				           <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "						          \n" +
    "						          {{ErrorMsg}}\n" +
    "						  </span>\n" +
    "			          </div>\n" +
    "				      <div class=\"col-sm-4\">\n" +
    "						<div class=\"pull-right\">\n" +
    "							<button ng-show=\"agency.agency_id && agency.contact_name && agency.contact_email\" type=\"button\" ng-click='Resendemail()' class=\"btn btn-default  btn-rounded\">Resend mail</button>			\n" +
    "							<button type=\"button\" ng-click='previous_state()' class=\"btn btn-default  btn-rounded\">Cancel</button>				         \n" +
    "			          </div>\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        <div class=\"form-group\" ng-show=\"agency.agency_id\">\n" +
    "			          <div class=\"col-sm-12\">\n" +
    "			           <div class=\"alert alert-info\">\n" +
    "			         \n" +
    "                            <p>Created by: {{agency.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{agency.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"agency.editedOn\">\n" +
    "                                        Edited by: {{agency.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{agency.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "\n" +
    "\n" +
    "                            </div>\n" +
    "			          </div>\n" +
    "			        </div>			        \n" +
    "			        \n" +
    "			        \n" +
    "				</form>\n" +
    "			</tab>\n" +
    "	</div>\n" +
    "</div>");
}]);

angular.module("admin/agency/agencies.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/agency/agencies.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Agency List <a ui-sref=\"admin.AddUpdateAgency\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Agency</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                \n" +
    "                <ui-select ng-change=\"updateTableData()\" ng-model=\"config.general.status\" theme=\"select2\" style=\"min-width: 225px;\">\n" +
    "                        <ui-select-match placeholder=\"Status for search\">{{$select.selected.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"item in statusSearchOption\">\n" +
    "                            <div ng-bind-html=\"item.name\"></div>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-{{ErrorClass}}\"  ng-if=\"showerrorMsg\">\n" +
    "                        {{ErrorMsg}}\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"id\" class=\"sort-item asc\">Agency Code &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"agency_name\" class=\"sort-item asc\" style=\"width:20%;\">Agency Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"primary_city\" class=\"sort-item asc\">City &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"primary_state\" class=\"sort-item asc\">State &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"contact_name\" class=\"sort-item asc\">Contact Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"contact_name\" class=\"sort-item asc\">Date Created &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"contact_name\" class=\"sort-item asc\">Last Logged In &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in agencyDetailList\" class=\"animate-repeat\">\n" +
    "                        <!--<td>{{detail.id | generateAgencyCode}}</td> -->\n" +
    "                        <td>{{detail.id}}</td>\n" +
    "                        <td>{{detail.agency_name}}</td>\n" +
    "                        <td>{{detail.primary_city}}</td>\n" +
    "                        <td>{{detail.primary_state}}</td>\n" +
    "                        <td>{{detail.contact_name}}</td>\n" +
    "                        <td>{{detail.created_on | datewithtimeformat:empCountry}}</td>\n" +
    "                        <td>{{detail.last_logged_in | datewithtimeformat:empCountry}}</td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkAgencystatus\">{{detail.status | checkAgencystatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-eye\"></i>\n" +
    "                            </button>\n" +
    "                             <button ng-click=\"resendEmail(detail)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-envelope\"></i>\n" +
    "                            <button ng-disabled=\"hidegeneratepwd==1\"ng-click=\"generatePassword(detail)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-key\"></i>\n" +
    "                             \n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_agencies_loader\">\n" +
    "                        <td colspan=\"8\">\n" +
    "                            <div show-loader=\"config.show_agencies_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_agencies_loader && agencyDetailList.length==0\">\n" +
    "                        <td colspan='9' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("admin/agency/mapDetailView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/agency/mapDetailView.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">{{title}}, {{county}}, {{primary_state}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "\n" +
    "<iframe id=\"jobMapId\" width=\"567\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" ng-src=\"{{currentProjectUrl}}\" mozbrowser remote></iframe> \n" +
    "\n" +
    "</div>\n" +
    "    	      \n" +
    "    	     \n" +
    "<div class=\"modal-footer\">              \n" +
    "   <a ng-href=\"{{fullMapUrl}}\" class=\"btn btn-sm btn-info\" target=\"_blank\">VIEW IN GOOGLE MAP</a>\n" +
    "    <button class=\"btn btn-default\" ng-click=\"cancel()\">CANCEL</button>\n" +
    "</div>");
}]);

angular.module("admin/updatePassword/updatePassword.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("admin/updatePassword/updatePassword.tpl.html",
    "<div class=\"container w-xxl w-auto-xs\">\n" +
    "    <a href class=\"navbar-brand block m-t\">{{app.name}}</a>\n" +
    "    <div class=\"m-b-lg\">\n" +
    "        <div class=\"wrapper text-center\">\n" +
    "            <strong>Update Your Password</strong>\n" +
    "        </div>\n" +
    "        <form name=\"updatePassword\" class=\"form-validation form-horizontal empLogin\" rc-submit=\"changePassword()\" novalidate>\n" +
    "\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-12\"  ng-class=\"{'has-error': rc.updatePassword.needsAttention(updatePassword.password1)}\">\n" +
    "                    <input type=\"password\" placeholder=\"Set Password\" id=\"password1\" name=\"password1\" ng-model=\"password1\" class=\"form-control\" required=\"\">\n" +
    "                     <span class=\"help-block\" ng-show=\"updatePassword.password1.$error.required && rc.updatePassword.needsAttention(updatePassword.password1)\">Set Password is required.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-12\" ng-class=\"{'has-error': rc.updatePassword.needsAttention(updatePassword.password2)}\">\n" +
    "                    <input type=\"password\" placeholder=\"Confirm Password\" id=\"password2\" name=\"password2\" pw-check=\"password1\" ng-model=password2 class=\"form-control\" required=\"\">\n" +
    "                     <span class=\"help-block\" ng-show=\"updatePassword.password2.$error.required && rc.updatePassword.needsAttention(updatePassword.password2)\">Confirm Password is required.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"alert alert-danger\" ng-show=\"empLogin.password2.$error.pwmatch\">\n" +
    "                <span>Passwords don't match.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                        {{ErrorMsg}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block\">Set Password</button>\n" +
    "            <div class=\"line line-dashed\"></div>\n" +
    "\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("ct-app/agency/add-update-agency.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/agency/add-update-agency.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Agency Detail</h1>\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "\n" +
    "    <div>\n" +
    "        <tabset class=\"tab-container\">\n" +
    "            <tab heading=\"General\" active=\"empSteps.general\" select=\"empSteps.percent=50\">\n" +
    "                <p class=\"m-b\">Agency Detail General details. <em class=\"text-danger\">Required fields are in Red</em></p>\n" +
    "                <progressbar value=\"empSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "                <form name=\"general\" class=\"form-validation form-horizontal agency\" rc-submit=\"agencyManage('general')\" novalidate>\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.agency_name)}\">\n" +
    "                        <label class=\"col-sm-2 control-label text-danger\"> Agency Name</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-md-12\">\n" +
    "\n" +
    "                                    <input type=\"text\" capitalize class=\"form-control\" name=\"agency_name\" required=\"\" placeholder=\"Agency Name\" ng-model=\"agency.agency_name\">\n" +
    "                                    <span class=\"help-block\" ng-show=\"general.agency_name.$error.required\n" +
    "                                && rc.general.needsAttention(general.agency_name)\">Agency Name is required.</span>\n" +
    "\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\"> Agency Code <i class=\"fa fa-question-circle\" popover=\"Agency Code is a generated unique code\" popover-trigger=\"mouseenter\" popover-placement=\"right\"></i></label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "\n" +
    "                            <input type=\"text\" capitalize class=\"form-control\" readonly=\"\" disabled=\"\" placeholder=\"Agency Name\" ng-model=\"agency.agency_id\">\n" +
    "\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.address)}\">\n" +
    "                        <label class=\"col-sm-2 control-label text-danger\">Address1</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <!-- <input type=\"text\" class=\"form-control\" ng-model=\"agency.primary_address1\" required=\"\"  placeholder=\"Address line 1\"> -->\n" +
    "                            <input type=\"text\" id=\"Autocomplete2\" capitalize class=\"form-control\" placeholder=\"Address line 1\" name=\"address\" required=\"\" ng-model=\"agency.primary_address1\" ng-autocomplete options=\"options\" details=\"details\" ng-keypress=\"preventNext($event)\">\n" +
    "                            <span class=\"help-block\" ng-show=\"general.address.$error.required\n" +
    "                                && rc.general.needsAttention(general.address)\">Address1 is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Address2</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input type=\"text\" class=\"form-control\" capitalize ng-model=\"agency.primary_address2\" placeholder=\"Address line 2\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.primary_zip)}\">\n" +
    "                        <label class=\"col-sm-2 control-label text-danger\">Zip/County/City/State</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-md-3\">\n" +
    "                                    <!--\n" +
    "								   <input type=\"text\" capitalize class=\"form-control\" ng-change=\"getZipDetail()\" ng-required=\"true\" name=\"primary_zip\" required=\"\" ng-maxlength=\"5\" placeholder=\"ZIP\" ng-model=\"agency.primary_zip\" ng-pattern=\"/^[0-9]+$/\">\n" +
    "								   -->\n" +
    "                                    <input type=\"text\" capitalize class=\"form-control\" ng-required=\"true\" name=\"primary_zip\" required=\"\"  placeholder=\"ZIP\" ng-model=\"agency.primary_zip\" ng-pattern=\"/^[0-9]+$/\">\n" +
    "                                    <span class=\"help-block\" ng-show=\"general.primary_zip.$error.required\n" +
    "                                && rc.general.needsAttention(general.primary_zip)\">Zip is required.</span>\n" +
    "\n" +
    "\n" +
    "                                </div>\n" +
    "                                <div class=\"col-md-3\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" capitalize placeholder=\"County\" ng-model=\"agency.primary_county\" name=\"primary_county\" >\n" +
    "                                    <!--<span class=\"help-block\" ng-show=\"general.primary_county.$error.required\n" +
    "                                && rc.general.needsAttention(general.primary_county)\">County is required.</span> -->\n" +
    "                                </div>\n" +
    "                                <div class=\"col-md-4\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" capitalize placeholder=\"City\" ng-model=\"agency.primary_city\" name=\"primary_city\" required=\"\">\n" +
    "                                    <span class=\"help-block\" ng-show=\"general.primary_city.$error.required\n" +
    "                                && rc.general.needsAttention(general.primary_city)\">City is required.</span>\n" +
    "                                </div>\n" +
    "                                <div class=\"col-md-2\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" capitalize name=\"primary_state\" required=\"\" placeholder=\"State\" ng-model=\"agency.primary_state\">\n" +
    "                                    <span class=\"help-block\" ng-show=\"general.primary_state.$error.required\n" +
    "                                && rc.general.needsAttention(general.primary_state)\">State is required.</span>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"row\" ng-show=\"showZipError\">\n" +
    "                                <div class=\"line\"></div>\n" +
    "                                <div class=\"col-sm-12\">\n" +
    "                                    <div role=\"alert\" class=\"alert ng-isolate-scope alert-warning alert-dismissable\" type=\"warning\">\n" +
    "                                        <div><span class=\"ng-binding ng-scope\">No match found, but continue adding the data</span></div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Country</label>\n" +
    "                        <div class=\"col-sm-5\">\n" +
    "                            <input type=\"text\" class=\"form-control\" capitalize name=\"country\" required=\"\" placeholder=\"Country\" readonly=\"\" ng-model=\"agency.country\">\n" +
    "                            <!--<a ng-href=\"{{agency.url}}\" class=\"btn btn-sm btn-info\" target=\"_blank\">Click here to View</a>-->\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-5\">\n" +
    "                            <a ng-click=\"mapView(agency)\"  target=\"_blank\" ng-disabled=\"agency.primary_address1==''\">Click here to View Map in Google</a>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"line\"></div>\n" +
    "\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.contact_name)}\">\n" +
    "                        <label class=\"col-sm-2 control-label text-danger\">Contact Name</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input type=\"text\" capitalize class=\"form-control\" name=\"contact_name\" required=\"\" placeholder=\"Contact Name\" ng-model=\"agency.contact_name\">\n" +
    "                            <span class=\"help-block\" ng-show=\"general.contact_name.$error.required\n" +
    "                                && rc.general.needsAttention(general.contact_name)\">Contact Name is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.contact_email)}\">\n" +
    "                        <label class=\"col-sm-2 control-label text-danger\">Contact Email</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input type=\"email\" capitalize class=\"form-control\" name=\"contact_email\" required=\"\" placeholder=\"Contact Email\" ng-model=\"agency.contact_email\">\n" +
    "                            <span class=\"help-block\" ng-show=\"general.contact_email.$error.required\n" +
    "                                && rc.general.needsAttention(general.contact_email)\">Contact Email is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Contact Phone</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input type=\"text\" ng-if=\"agency.country=='United States'\" class=\"form-control\" ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"true\" ng-model=\"agency.contact_phone\">\n" +
    "                            <input type=\"text\" ng-if=\"agency.country!='United States'\" ng-pattern=\"/^[0-9]+$/\" class=\"form-control\" ng-model=\"agency.contact_phone\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Telephone / fax</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-md-6\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" placeholder=\"Telephone\" ng-model=\"agency.telephone\">\n" +
    "                                </div>\n" +
    "                                <div class=\"col-md-6\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" placeholder=\"fax\" ng-model=\"agency.fax\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Timezone</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <div class=\"row\">\n" +
    "                                <div class=\"col-md-6\">\n" +
    "                                                 \n" +
    "                                        <input type=\"text\" readonly ng-model=\"agency.timezone\" placeholder=\"Time Zone\" class=\"form-control\">\n" +
    "                                    \n" +
    "                                </div>\n" +
    "                                <div class=\"col-md-6\">\n" +
    "                                    <div class=\"checkbox\">\n" +
    "                                        <label class=\"i-checks\">\n" +
    "                                            <input type=\"checkbox\" value=\"1\" ng-model=\"agency.daylight_time_format\">\n" +
    "                                            <i></i> Observe Daylight Saving Time?\n" +
    "                                        </label>\n" +
    "\n" +
    "                                    </div>\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Enable Alert</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <div class=\"checkbox\">\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"agency.enable_alert\">\n" +
    "                                    <i></i> Used to disable company alerts during holidays - check to enable (default), uncheck to disable alerts\n" +
    "                                </label>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-sm-6\">\n" +
    "                            <button type=\"submit\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "\n" +
    "                            <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "						          \n" +
    "						          {{ErrorMsg}}\n" +
    "						  </span>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-4\">\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-show=\"agency.agency_id\">\n" +
    "                        <div class=\"col-sm-12\">\n" +
    "                            <div class=\"alert alert-info\">\n" +
    "                                <p>Created by: {{agency.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{agency.created_on | date:'medium'}}</em>\n" +
    "                                </p>\n" +
    "                                <p ng-show=\"agency.editedOn\">\n" +
    "                                    Edited by: {{agency.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{agency.editedOn | date:'medium' }}</em>\n" +
    "                                </p>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </form>\n" +
    "            </tab>\n" +
    "\n" +
    "\n" +
    "            <tab heading=\"Configuration\" disabled=\"general.$invalid\" active=\"empSteps.configuration\" select=\"empSteps.percent=100\">\n" +
    "                <p class=\"m-b\">Congratulations! You got to the last step!. <em class=\"text-danger\">Required fields are in Red</em></p>\n" +
    "                <progressbar value=\"empSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "                <form name=\"configuration\" class=\"form-validation form-horizontal configuration\" rc-submit=\"agencyManage('configuration')\" novalidate>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Greetings</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <textarea capitalize rows=\"4\" ng-model=\"agency.ivr_greetings\" cols=\"50\"></textarea>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.configuration.needsAttention(configuration.ivr_number)}\">\n" +
    "                        <label class=\"col-sm-2 control-label text-danger\">IVR Number</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input type=\"text\"  ng-if=\"agency.country=='United States'\" name=\"ivr_number\" class=\"form-control\" ui-mask=\"(999) 999-9999\" required=\"\" ui-mask-use-viewvalue=\"false\" ng-model=\"agency.ivr_number\">\n" +
    "\n" +
    "                             <input type=\"text\"  ng-if=\"agency.country!='United States'\" name=\"ivr_number\" class=\"form-control\" ng-pattern=\"/^[0-9]+$/\" required=\"\"  ng-model=\"agency.ivr_number\">\n" +
    "                            <span class=\"help-block\" ng-show=\"configuration.ivr_number.$error.required\n" +
    "                                && rc.configuration.needsAttention(configuration.ivr_number)\">IVR Number is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                    <!-- <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">External Code1</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			             <input type=\"text\"  capitalize class=\"form-control\"    placeholder=\"Enter custom code\" ng-model=\"agency.external_code.code1\" >\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "					\n" +
    "					 <div class=\"form-group\">\n" +
    "			          <label class=\"col-sm-2 control-label\">External Code2</label>\n" +
    "			          <div class=\"col-sm-10\">\n" +
    "			             <input type=\"text\" capitalize  class=\"form-control\"   placeholder=\"Enter custom code\" ng-model=\"agency.external_code.code2\" >\n" +
    "			          </div>\n" +
    "			        </div>\n" +
    "			        \n" +
    "			        \n" +
    "			        <div class=\"line line-dashed b-b line-lg pull-in\"></div> -->\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Label for Zones</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input type=\"text\" class=\"form-control\" capitalize placeholder=\" Label for Zones\" ng-model=\"agency.labels.zones\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Label for Jobs</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input type=\"text\" class=\"form-control\" capitalize placeholder=\"Label for Jobs\" ng-model=\"agency.labels.jobs\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Label for Employees</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <input type=\"text\" class=\"form-control\" capitalize placeholder=\"Label for Employees\" ng-model=\"agency.labels.employees\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Payroll Period</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <label class=\"radio-inline i-checks\">\n" +
    "                                <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"agency.pay_period\"><i></i> Weekly\n" +
    "                            </label>\n" +
    "                            <label class=\"radio-inline i-checks\">\n" +
    "                                <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"agency.pay_period\"><i></i> Bi-Weekly\n" +
    "                            </label>\n" +
    "                            <label class=\"radio-inline i-checks\">\n" +
    "                                <input type=\"radio\" name=\"a\" value=\"2\" ng-model=\"agency.pay_period\"><i></i> Monthly\n" +
    "                            </label>\n" +
    "                            <label class=\"radio-inline i-checks\">\n" +
    "                                <input type=\"radio\" name=\"a\" value=\"3\" ng-model=\"agency.pay_period\"><i></i> Semi monthly\n" +
    "                            </label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Work Week</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "\n" +
    "                            <div>\n" +
    "                                <select ui-select2 class=\"form-control w-md\" ng-model=\"agency.work_week\">\n" +
    "                                    <option value=\"0\">Sunday</option>\n" +
    "                                    <option value=\"1\">Monday</option>\n" +
    "                                    <option value=\"2\">Tuesday</option>\n" +
    "                                    <option value=\"3\">Wednesday</option>\n" +
    "                                    <option value=\"4\">Thursday</option>\n" +
    "                                    <option value=\"5\">Friday</option>\n" +
    "                                    <option value=\"6\">Saturday</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                    <!--<div class=\"form-group\">\n" +
    "						<label class=\"col-sm-2 control-label\">Digits for Zone Code</label>\n" +
    "						<div class=\"col-sm-10\">\n" +
    "			  				<input type=\"number\" readonly data-min='4' data-max=\"6\" class=\"form-control\"   placeholder=\"Size of Zone code\" ng-model=\"agency.config_zone_code\" >\n" +
    "                    	</div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "						<label class=\"col-sm-2 control-label\">Digits for Employee Code</label>\n" +
    "						<div class=\"col-sm-10\">\n" +
    "			  				<input type=\"number\" readonly data-min='4' data-max=\"6\" class=\"form-control\"   placeholder=\"Size of Employee code\" ng-model=\"agency.config_employee_code\" >\n" +
    "                    	</div>\n" +
    "                    </div>\n" +
    "                    			        <div class=\"form-group\">\n" +
    "						<label class=\"col-sm-2 control-label\">Digits for Job Code</label>\n" +
    "						<div class=\"col-sm-10\">\n" +
    "			  				<input type=\"number\"  readonly data-min='4' data-max=\"6\" class=\"form-control\" placeholder=\"Size of job Code\" ng-model=\"agency.config_job_code\" >\n" +
    "                    	</div>\n" +
    "                    </div>-->\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Clock-in Notification Duration</label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <div>\n" +
    "                                <select ui-select2 class=\"form-control w-md\" ng-model=\"agency.notify_interval\">\n" +
    "                                    <option value=\"15\">15 Min</option>\n" +
    "                                    <option value=\"30\">30 Min</option>\n" +
    "\n" +
    "\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-sm-8\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click=\"agencyManagePrev('configuration')\">Prev</button>\n" +
    "                            <button type=\"submit\" class=\"btn btn-primary  btn-rounded\">Save Changes</button>\n" +
    "                            <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "						          \n" +
    "						          {{ErrorMsg}}\n" +
    "						  </span>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-4\">\n" +
    "                            <button type=\"button\" ng-click='previous_state()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-show=\"agency.agency_id\">\n" +
    "                        <div class=\"col-sm-12\">\n" +
    "                            <div class=\"alert alert-info\">\n" +
    "\n" +
    "                                <p>Created by: {{agency.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{agency.created_on | date:'medium'}}</em>\n" +
    "                                </p>\n" +
    "                                <p ng-show=\"agency.editedOn\">\n" +
    "                                    Edited by: {{agency.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{agency.editedOn | date:'medium' }}</em>\n" +
    "                                </p>\n" +
    "\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                </form>\n" +
    "            </tab>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/agency/mapDetailView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/agency/mapDetailView.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">{{title}}, {{county}}, {{primary_state}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "\n" +
    "<iframe id=\"jobMapId\" width=\"567\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" ng-src=\"{{currentProjectUrl}}\" mozbrowser remote></iframe> \n" +
    "\n" +
    "</div>\n" +
    "    	      \n" +
    "    	     \n" +
    "<div class=\"modal-footer\">              \n" +
    "   <a ng-href=\"{{fullMapUrl}}\" class=\"btn btn-sm btn-info\" target=\"_blank\">VIEW IN GOOGLE MAP</a>\n" +
    "    <button class=\"btn btn-default\" ng-click=\"cancel()\">CANCEL</button>\n" +
    "</div>");
}]);

angular.module("ct-app/authorizations/add-update-authorizations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/authorizations/add-update-authorizations.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Job  Authorization</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\">Enter Payor authorization work hours for a job</p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"job_Authorization_form\" class=\"form-validation form-horizontal job_Authorization\" rc-submit=\"saveJobAuthorization()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.job_Authorization_form.needsAttention(job_Authorization_form.zone_name)}\">\n" +
    "\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Select Zone</label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <div>\n" +
    "                            <input class=\"form-control \" required=\"\" name=\"zone_name\" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"jobAuthorization.zone\">\n" +
    "                            <span class=\"help-block\" ng-show=\"job_Authorization_form.zone_name.$error.required\n" +
    "                                && rc.job_Authorization_form.needsAttention(job_Authorization_form.zone_name)\">Zone is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.job_Authorization_form.needsAttention(job_Authorization_form.job_name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Select Job</label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <div>\n" +
    "                            <input class=\"form-control \"  name=\"job_name\" required=\"\"  ng-disabled=\"!jobAuthorization.zone\" ui-select2=\"selectJob\" value=\"\" placeholder=\"Select Job \" ng-model=\"jobAuthorization.job\">\n" +
    "                            <span class=\"help-block\" ng-show=\"job_Authorization_form.job_name.$error.required\n" +
    "                                && rc.job_Authorization_form.needsAttention(job_Authorization_form.job_name)\">Job is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.job_Authorization_form.needsAttention(job_Authorization_form.payor_name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Payor </label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <div>\n" +
    "                            <input class=\"form-control \" required=\"\" name=\"payor_name\" ui-select2=\"selectPayors\" value=\"\" placeholder=\"Select Payor\" ng-model=\"jobAuthorization.payor\">\n" +
    "                            <span class=\"help-block\" ng-show=\"job_Authorization_form.payor_name.$error.required\n" +
    "                                && rc.job_Authorization_form.needsAttention(job_Authorization_form.payor_name)\">Payor is required.</span>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\"> Payor Ref Number </label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <input ctype=\"text\" class=\"form-control\"  placeholder=\"Payor Ref Number \" ng-model=\"jobAuthorization.payor_ref_number\" capitalize>\n" +
    "                    </div>\n" +
    "                    <label class=\"col-sm-2 control-label\">Payor Medicare Id </label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <input ctype=\"text\" class=\"form-control\"  placeholder=\"Payor Medicare Id\" ng-model=\"jobAuthorization.payor_medicare_id\" capitalize>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.job_Authorization_form.needsAttention(job_Authorization_form.skill_name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Select Skill?</label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <div>\n" +
    "                            <input class=\"form-control \" required=\"\" name=\"skill_name\"  ui-select2=\"selectSkills\" value=\"\" placeholder=\"Select Skill\" ng-model=\"jobAuthorization.skill\">\n" +
    "                            <span class=\"help-block\" ng-show=\"job_Authorization_form.skill_name.$error.required\n" +
    "                                && rc.job_Authorization_form.needsAttention(job_Authorization_form.skill_name)\">Skill is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Select Activity?</label>\n" +
    "                    <div class=\"col-sm-4\" ng-class=\"{'has-error': rc.job_Authorization_form.needsAttention(job_Authorization_form.activity_name)}\">\n" +
    "                        <div>\n" +
    "                            <input class=\"form-control \" required=\"\" name=\"activity_name\" ui-select2=\"selectActivity\" value=\"\" placeholder=\"Select Activity\" ng-model=\"jobAuthorization.acitivity\">\n" +
    "                            <span class=\"help-block\" ng-show=\"job_Authorization_form.activity_name.$error.required && rc.job_Authorization_form.needsAttention(job_Authorization_form.activity_name)\">Activity is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div ng-class=\"{'has-error': rc.job_Authorization_form.needsAttention(job_Authorization_form.startdate)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Start Date</label>\n" +
    "                    <div class=\"col-sm-4\"  ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                        <div class=\"input-group \">\n" +
    "                            <input type=\"text\" class=\"form-control\" required=\"\" name=\"startdate\" readonly datepicker-popup=\"{{format}}\" ng-model=\"jobAuthorization.startdate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-change=\"calculateTotalhrs()\" />\n" +
    "                            <span class=\"input-group-btn\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                        <span class=\"help-block\" ng-show=\"job_Authorization_form.startdate.$error.required && rc.job_Authorization_form.needsAttention(job_Authorization_form.startdate)\">Start Date is required.</span>\n" +
    "\n" +
    "                    </div>\n" +
    "                    </div>\n" +
    "                    <div ng-class=\"{'has-error': rc.job_Authorization_form.needsAttention(job_Authorization_form.enddate)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">End Date</label>\n" +
    "                    <div class=\"col-sm-4\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                        <div class=\"input-group \">\n" +
    "                            <input type=\"text\" class=\"form-control\" required=\"\" name=\"enddate\" readonly datepicker-popup=\"{{format}}\" ng-model=\"jobAuthorization.enddate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-change=\"calculateTotalhrs()\" />\n" +
    "                            <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                        </div>\n" +
    "                         <span class=\"help-block\" ng-show=\"job_Authorization_form.enddate.$error.required && rc.job_Authorization_form.needsAttention(job_Authorization_form.enddate)\">End Date is required.</span>\n" +
    "                    </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                     <div ng-class=\"{'has-error': rc.job_Authorization_form.needsAttention(job_Authorization_form.hours)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Authorized Hours</label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "\n" +
    "                        <input type=\"text\" class=\"form-control\" required=\"\" name=\"hours\" ng-change=\"calculateTotalhrs()\" placeholder=\"Authorized Hours\" ng-pattern=\"/\\d+(\\.\\d{1,2})?/\" ng-model=\"jobAuthorization.hours\">\n" +
    "                        <span class=\"help-block\" ng-show=\"job_Authorization_form.hours.$error.required && rc.job_Authorization_form.needsAttention(job_Authorization_form.hours)\">Authorized Hours is required.</span>\n" +
    "\n" +
    "                    </div>\n" +
    "                    </div>\n" +
    "                    <div ng-class=\"{'has-error': rc.job_Authorization_form.needsAttention(job_Authorization_form.frequancy)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Frequency</label>\n" +
    "                    <div class=\"col-sm-4\" >\n" +
    "                        <div>\n" +
    "                            <input class=\"form-control \" required=\"\" name=\"frequancy\" ng-change=\"calculateTotalhrs()\" ui-select2=\"frequancy\" value=\"\" placeholder=\"Select Frequency\" ng-model=\"jobAuthorization.frequancy\">\n" +
    "                            <span class=\"help-block\" ng-show=\"job_Authorization_form.frequancy.$error.required && rc.job_Authorization_form.needsAttention(job_Authorization_form.frequancy)\"> Frequency is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Total hours</label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <input type=\"text\" class=\"form-control\" placeholder=\"Total hours\" readonly ng-model=\"jobAuthorization.total_hours\">\n" +
    "                    </div>\n" +
    "                    <label class=\"col-sm-2 control-label\"> Status </label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=1 ng-model=\"jobAuthorization.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=0 ng-model=\"jobAuthorization.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Notes </label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <textarea cols=\"34\" ng-show=\"pageTitle=='Update'\" ng-model=\"jobAuthorization.notes\" capitalize=\"\" rows=\"4\" class=\"ng-pristine ng-valid\"></textarea>\n" +
    "                        <textarea cols=\"44\" ng-show=\"pageTitle=='Add New'\" ng-model=\"jobAuthorization.notes\" capitalize=\"\" rows=\"4\" class=\"ng-pristine ng-valid\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        \n" +
    "                        <button type=\"button\" class=\"btn btn-default btn-rounded pull-right\" ng-click='cancelAuthorization()'>Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  \n" +
    "                                  {{ErrorMsg}}\n" +
    "                          </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"authorization_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                         <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{jobAuthorization.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{jobAuthorization.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"jobAuthorization.editedOn\">\n" +
    "                                Edited by: {{jobAuthorization.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{jobAuthorization.editedOn | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/authorizations/authorizations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/authorizations/authorizations.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Authorization List\n" +
    " <a ui-sref=\"ctApp.addUpdateAuthorization\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Authorization</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                    <div  class=\"form-control \" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"config.general.zone\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered word-break\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"job\" class=\"sort-item asc\" >Job &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"payor\" class=\"sort-item\">Authorization &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <!--<th id=\"skill\" class=\"sort-item\">Skill &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                         <th id=\"acitivity\" class=\"sort-item\">Activity &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>-->\n" +
    "                        <th id=\"authorization_start_date\" class=\"sort-item\">Date &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"hours\" class=\"sort-item\">Authorized Hours  &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                         <th id=\"total_hours\" class=\"sort-item\">Total Authorized Hours   &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in authorizationDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.job_detail | parseToJson:0:'text'}}</td>\n" +
    "                        <td>{{detail.payor_detail  | parseToJson:0:'text'}}</td>\n" +
    "                        <!--<td>{{detail.skill_detail |  parseToJson:0:'text'}}</td>\n" +
    "                        <td>{{detail.acitivity_detail |  parseToJson:0:'text' }}</td>-->\n" +
    "                        <td>{{detail.authorization_start_date | onlydate}} &nbsp; - &nbsp; {{detail.authorization_end_date | onlydate}}</td>\n" +
    "                        <td>{{detail.frequency}} {{detail.hours}} hrs</td>\n" +
    "                        <td>{{detail.total_hours}}</td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableCopy(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-recycle\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_authorizations_loader\">\n" +
    "                        <td colspan=\"7\">\n" +
    "                            <div show-loader=\"config.show_authorizations_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_authorizations_loader && authorizationDetailList.length==0\">\n" +
    "                        <td colspan='7' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/ct-app.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/ct-app.tpl.html",
    "<!-- navbar -->\n" +
    "  <div data-ng-include=\" 'partials/header.tpl.html' \" class=\"app-header navbar\">\n" +
    "  </div>\n" +
    "  <!-- / navbar -->\n" +
    "\n" +
    "  <!-- menu -->\n" +
    "  <div data-ng-include=\" 'partials/aside.tpl.html' \" class=\"app-aside hidden-xs {{app.settings.asideColor}}\">\n" +
    "  </div>\n" +
    "  <!-- / menu -->\n" +
    "\n" +
    "  <!-- content -->\n" +
    "  <div class=\"app-content\">\n" +
    "    <div ui-butterbar></div>\n" +
    "    <div class=\"app-content-body fade-in-up\" ui-view=\"appNested\"></div>\n" +
    "                      <div  style=\"clear: both;\"></div>\n" +
    "\n" +
    "  </div>\n" +
    "  <!-- /content -->\n" +
    "\n" +
    "  <!-- footer -->\n" +
    "\n" +
    "  <!--<div class=\"app-footer wrapper b-t bg-light\">\n" +
    "    <span class=\"pull-right\">{{app.version}} <a href ui-scroll=\"app\" class=\"m-l-sm text-muted\"><i class=\"fa fa-long-arrow-up\"></i></a></span>\n" +
    "    &copy; 2014 Caretime Copyright.\n" +
    "  </div>-->\n" +
    "\n" +
    "<div data-ng-include=\" 'partials/page_footer.tpl.html' \" class=\"app-footer wrapper b-t bg-light\">\n" +
    "  </div>\n" +
    "  \n" +
    "\n" +
    "  <!-- / footer -->\n" +
    "\n" +
    " <!-- <div data-ng-include=\" 'partials/settings.tpl.html' \" ></div> Revathy Not Needed-->");
}]);

angular.module("ct-app/employees/add-update-employee.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/employees/add-update-employee.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} {{labels.Employees }}</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\">\n" +
    "        <div>\n" +
    "            <tabset class=\"tab-container\">\n" +
    "                <tab heading=\"General\" active=\"empSteps.general\" select=\"empSteps.percent=50\">\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Enter Employees ({{labels.Employees}}) general details. <em class=\"text-danger\">Required fields are in RED.</em>\n" +
    "                    </p>\n" +
    "                    <progressbar value=\"empSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "                    <form name=\"general\" class=\"form-validation form-horizontal general\" rc-submit=\"employeeManage('general')\" novalidate>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label text-danger\"> Employee Name</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-6\" ng-class=\"{'has-error': rc.general.needsAttention(general.firstname)}\">\n" +
    "                                        <input type=\"text\" autocomplete=\"off\" required=\"\" name=\"firstname\" class=\"form-control\" capitalize placeholder=\"First Name\" ng-model=\"employee.firstname\" ng-pattern=\"/^[a-zA-Z\\d\\s\\-\\':]*$/\" ng-blur=\"checkEmpName()\" ng-keyup=\"generateUsername()\">\n" +
    "                                        <span class=\"help-block\" ng-show=\"general.firstname.$error.required\n" +
    "                                && rc.general.needsAttention(general.firstname)\">First Name is required.</span>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-6\" ng-class=\"{'has-error': rc.general.needsAttention(general.lastname)}\">\n" +
    "                                        <input type=\"text\" autocomplete=\"off\" class=\"form-control\" capitalize name=\"lastname\" required=\"\" placeholder=\"Last Name\" ng-model=\"employee.lastname\" ng-pattern=\"/^[a-zA-Z\\d\\s\\-\\':]*$/\" ng-blur=\"checkEmpName()\" ng-keyup=\"generateUsername()\">\n" +
    "                                        <span class=\"help-block\" ng-show=\"general.lastname.$error.required\n" +
    "                                && rc.general.needsAttention(general.lastname)\">Last Name is required.</span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.zone)}\">\n" +
    "                            <label class=\"col-sm-2 control-label text-danger\">Employee Zone</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div>\n" +
    "                                    <input class=\"w-md\" required=\"\" name=\"zone\" ui-select2=\"selectZone\" value=\"\" required=\"\" ng-model=\"employee.zone\">\n" +
    "                                    <em class=\"m-b-none text-muted\">The Zone the Employee is associated with.</em>\n" +
    "                                    <span class=\"help-block\" ng-show=\"general.zone.$error.required\n" +
    "                                && rc.general.needsAttention(general.zone)\">Employee Zone is required.</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Language</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <select ui-select2 multiple class=\"w-md\" ng-model=\"employee.language\">\n" +
    "                                    <option value=\"English\" selected=\"\">English</option>\n" +
    "                                    <option value=\"Spanish\">Spanish</option>\n" +
    "                                    <option value=\"German\">German</option>\n" +
    "                                    <option value=\"French\">French</option>\n" +
    "                                    <option value=\"Italian\">Italian</option>\n" +
    "                                </select>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Employee Level</label>\n" +
    "                            <div class=\"col-sm-10\" ng-if=\"islevelAccess\">\n" +
    "\n" +
    "                                <select ui-select2 class=\"w-md\" ng-model=\"employee.level\">\n" +
    "                                    <option value=\"0\">Nursing</option>\n" +
    "                                    <option value=\"2\">HR</option>\n" +
    "                                    <option value=\"3\">Office Clerical</option>\n" +
    "                                    <option value=\"4\">Office Manager</option>\n" +
    "                                    <option value=\"5\">On Call</option>\n" +
    "                                    <option value=\"6\">Corporate Billing Department</option>\n" +
    "                                    <option value=\"7\">Scheduler</option>\n" +
    "                                    <option value=\"8\">Basic</option>\n" +
    "                                </select>\n" +
    "\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-10\" ng-if=\"!islevelAccess\">\n" +
    "                                <input ng-bind-html=\"employee.level | checklevel\" class=\"form-control w-md\" type=\"text\" readonly value=\"{{employee.level | checklevel}}\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Employee Skill</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div>\n" +
    "                                    <input type=\"text\" class=\"w-md\" ui-select2=\"selectSkill\" value=\"\" placeholder=\"Select Skill\" ng-model=\"employee.skill\">\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "                         <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Agency Emp. ID</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div>\n" +
    "                                    <input type=\"text\" class=\"form-control w-md\"  placeholder=\"Agency Emp. ID\" ng-model=\"employee.agency_empid\">\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\" ng-class=\"{'has-error': rc.general.needsAttention(general.curStatus)}\">\n" +
    "                            <label class=\"col-sm-2 control-label text-danger\">Current Status</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"curStatus\" required=\"\" value=\"1\" ng-model=\"employee.curStatus\"><i></i> Active\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"curStatus\" required=\"\" value=\"0\" ng-model=\"employee.curStatus\"><i></i> Inactive\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"curStatus\" required=\"\" value=\"2\" ng-model=\"employee.curStatus\"><i></i> Terminated\n" +
    "                                </label>\n" +
    "                                <span class=\"help-block\" ng-show=\"general.curStatus.$error.required\n" +
    "                                && rc.general.needsAttention(general.curStatus)\">Current Status is required.</span>\n" +
    "                            </div>\n" +
    "\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Clock OUT Safeguard</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-12\">\n" +
    "                                        <input capitalize type=\"text\" class=\"form-control w-md\" placeholder=\"Enter Hours\" ng-pattern=\"/^[0-9]+$/\" ng-model=\"employee.clockOutSafeguardHours\" ng-change=\"changeSafeguard()\" >\n" +
    "                                        <em class=\"m-b-none text-muted\">Number of hours before the system will CLOCK-OUT the Employee</em>\n" +
    "                                    </div>\n" +
    "\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "                                <button type=\"submit\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "                                <button type=\"button\" ng-if=\"pageTitle=='Update'\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\" ng-click=\"employeeManage('general', false)\">Save changes</button>\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  \n" +
    "                                  {{ErrorMsg}}\n" +
    "                          </span>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-if=\"pageTitle=='Update'\" class=\"btn btn-default btn-rounded\" ng-click='deleteEmployee(employee.accesscode)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelEmployee()'>Cancel</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\" ng-show=\"employee_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Employee: <em class=\"ng-binding\">{{employee.accesscode}}</em>, User Name: <em class=\"ng-binding\">{{employee.username}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{employee.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{employee.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"employee.editedOn\">\n" +
    "                                        Edited by: {{employee.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{employee.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                     <p ><span ng-show=\"employee.last_clockedin\"  >Last Clocked In :<em class=\"ng-binding\"> {{employee.last_clockedin}}</em></span><span ng-show=\"employee.last_scheduled\"  >  Last Scheduled On : <em class=\"ng-binding\">{{employee.last_scheduled}}</em></span>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                </tab>\n" +
    "\n" +
    "                <tab heading=\"Personal\" disabled=\"general.$invalid\" active=\"empSteps.personal\" select=\"empSteps.percent=40\">\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Continue entering Employees ({{labels.Employees}}) address and contact details. <em class=\"text-danger\">Required fields are in RED.</em>\n" +
    "                    </p>\n" +
    "                    <progressbar value=\"empSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "                    <form name=\"personal\" class=\"form-validation form-horizontal personal\" rc-submit=\"employeeManage('personal')\" novalidate>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Address Line </label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <input type=\"text\" id=\"Autocomplete2\" capitalize class=\"form-control\" placeholder=\"Enter Address line\" ng-model=\"employee.address1\" ng-autocomplete options=\"options\" details=\"details\" ng-enter=\"addressline()\">\n" +
    "                                <em class=\"help-block m-b-none text-muted\">Google Map will validate the address as you type it.</em>\n" +
    "                            </div>\n" +
    "                            <div class=\"line\"></div>\n" +
    "                            <label class=\"col-sm-2 control-label\">Address Line 2</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <input type=\"text\" capitalize class=\"form-control\" placeholder=\"Address line 2 (optional)\" ng-model=\"employee.address2\">\n" +
    "                            </div>\n" +
    "                            <div class=\"line\"></div>\n" +
    "                            <label class=\"col-sm-2 control-label\">Zip/County/City/State </label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-3\">\n" +
    "\n" +
    "                                        <input type=\"text\" capitalize class=\"form-control\" placeholder=\"ZIP\" ng-model=\"employee.zip\" ng-pattern=\"/^[0-9]+$/\">\n" +
    "\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-3\">\n" +
    "                                        <input type=\"text\" class=\"form-control\" capitalize placeholder=\"County\" ng-model=\"employee.county\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-4\">\n" +
    "                                        <input type=\"text\" class=\"form-control\" capitalize placeholder=\"City\" ng-model=\"employee.city\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-2\">\n" +
    "                                        <input type=\"text\" class=\"form-control\" capitalize placeholder=\"State\" ng-model=\"employee.state\">\n" +
    "                                    </div>\n" +
    "\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"row\" ng-show=\"showZipError\">\n" +
    "                                    <div class=\"line\"></div>\n" +
    "                                    <div class=\"col-sm-12\">\n" +
    "                                        <div role=\"alert\" class=\"alert ng-isolate-scope alert-warning alert-dismissable\" type=\"warning\">\n" +
    "                                            <div><span class=\"ng-binding ng-scope\">No match found, but continue adding the data</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"line\"></div>\n" +
    "                            <label class=\"col-sm-2 control-label\">Country</label>\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <input type=\"text\" class=\"form-control\" capitalize name=\"country\" required=\"\" placeholder=\"Country\" readonly=\"\" ng-model=\"employee.country\">\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-6\">\n" +
    "                                <a ng-click=\"mapView(employee)\"  target=\"_blank\" ng-disabled=\"!employee.address1\">Click here to View Map in Google</a>\n" +
    "                            </div>\n" +
    "                            <div class=\"line\"></div>\n" +
    "                            <div ng-class=\"{'has-error': rc.personal.needsAttention(personal.timezone)}\">\n" +
    "                                <label class=\"col-sm-2 control-label text-danger\">Time Zone</label>\n" +
    "                                <div class=\"col-sm-10\">\n" +
    "                                    \n" +
    "                                        <input type=\"text\" ng-model=\"employee.timezone\" readonly=\"\" name=\"timezone\" capitalize required=\"\" placeholder=\"Time Zone\" class=\"form-control\">\n" +
    "                                        <em class=\"help-block m-b-none text-muted\">The Time Zone is required for Schedules/Shifts and IVR. </em>\n" +
    "                                        <span class=\"help-block\" ng-show=\"personal.timezone.$error.required\n" +
    "                                && rc.personal.needsAttention(personal.timezone)\">Time Zone is required.</span>\n" +
    "                                    \n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                        <!--<div class=\"form-group\" ng-class=\"{'has-error': rc.personal.needsAttention(personal.workphone)}\">-->\n" +
    "                        <div class=\"form-group\" >\n" +
    "                            <label class=\"col-sm-2 control-label\">Work Phone </label>\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "\n" +
    "                                <input type=\"text\" name=\"workphone\" class=\"form-control\" ng-if=\"employee.country=='United States'\"  ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"false\" ng-model=\"employee.workphone\">\n" +
    "\n" +
    "                                 <input type=\"text\" name=\"workphone\" class=\"form-control\" ng-if=\"employee.country!='United States'\"  ng-pattern=\"/^[0-9]+$/\" ng-model=\"employee.workphone\">\n" +
    "                                <em class=\"help-block m-b-none text-muted\">This phone will be used for alert notification.</em>\n" +
    "                                <!--<span class=\"help-block\" ng-show=\"personal.workphone.$error.required && rc.personal.needsAttention(personal.workphone)\">Work Phone is required.</span>-->\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Home Phone</label>\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <input type=\"text\" class=\"form-control\" ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"false\" ng-model=\"employee.Secphone.homephone\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">Other Phone</label>\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <input type=\"text\" class=\"form-control\" ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"false\" ng-model=\"employee.Secphone.otherphone\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Choose Pay Class</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div>\n" +
    "                                    <input class=\"w-md\" ui-select2=\"selectPayClass\" value=\"\" ng-model=\"employee.payclass\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Hire Date </label>\n" +
    "                            <div class=\"col-sm-10\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                                <div class=\"input-group w-md\">\n" +
    "                                    <input readonly=\"\" type=\"text\" class=\"form-control\" max-date=\"{{dt}}\" datepicker-popup=\"{{format}}\" ng-model=\"employee.hiredate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                                    <span class=\"input-group-btn\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                          </span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!--<div class=\"form-group\" ng-class=\"{'has-error': rc.personal.needsAttention(personal.birthdate)}\"> -->\n" +
    "                        <div class=\"form-group\" >\n" +
    "                            <label class=\"col-sm-2 control-label \">Birthday</label>\n" +
    "                            <div class=\"col-sm-10\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                                <div class=\"input-group w-md\">\n" +
    "                                    <input  readonly=\"\" type=\"text\" class=\"form-control\" max-date=\"{{dt}}\" datepicker-popup=\"{{format}}\" ng-model=\"employee.birthdate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" name=\"birthdate\" />\n" +
    "                                    <span class=\"input-group-btn\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                          </span> \n" +
    "                                </div>\n" +
    "                                <em class=\"help-block m-b-none text-muted\">Required for Mobile authentication.</em>\n" +
    "                                <!--<span class=\"help-block\" ng-show=\"personal.birthdate.$error.required\n" +
    "                                && rc.personal.needsAttention(personal.birthdate)\">Birthday is required.</span>-->\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click=\"employeeManagePrev('personal')\">Prev</button>\n" +
    "                                <button type=\"submit\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "                                <button type=\"button\" ng-if=\"pageTitle=='Update'\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\" ng-click=\"employeeManage('personal', false)\">Save changes</button>\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  {{ErrorMsg}}\n" +
    "                      </span>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-if=\"pageTitle=='Update'\" class=\"btn btn-default btn-rounded\" ng-click='deleteEmployee(employee.accesscode)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelEmployee()'>Cancel</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\" ng-show=\"employee_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Employee: <em class=\"ng-binding\">{{employee.accesscode}}</em>, User Name: <em class=\"ng-binding\">{{employee.username}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{employee.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{employee.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"employee.editedOn\">\n" +
    "                                        Edited by: {{employee.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{employee.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                </tab>\n" +
    "\n" +
    "                <tab heading=\"Advanced\" disabled=\"general.$invalid\" active=\"empSteps.advanced\" select=\"empSteps.percent=60\">\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Continue entering Employees ({{labels.Employees}}) notes and External Codes.</p>\n" +
    "                    <progressbar value=\"empSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "                    <form name=\"advanced\" class=\"form-validation form-horizontal Advanced\" ng-submit=\"employeeManage('advanced')\" novalidate>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Notes</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <textarea rows=\"4\" capitalize ng-model=\"employee.notes\" cols=\"50\"></textarea>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                         <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">External Code 1</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <input type=\"text\" capitalize class=\"form-control\" ng-model=\"employee.externalCode.code1\" placeholder=\"Extenal Code 1\">\n" +
    "                                <em class=\"help-block m-b-none text-muted\">Custom fields for the agency to use.</em>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">External Code 2</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <input type=\"text\" capitalize class=\"form-control\" ng-model=\"employee.externalCode.code2\" placeholder=\"Extenal Code 2\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">External Code 3</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <input type=\"text\" capitalize class=\"form-control\" ng-model=\"employee.externalCode.code3\" placeholder=\"Extenal Code 3\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Preferred Method of Communication</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-sm-12 form-group\">\n" +
    "                                        <div class=\"col-md-3\">\n" +
    "                                            <div class=\"checkbox\">\n" +
    "                                                <label class=\"i-checks\">\n" +
    "                                                    <input type=\"checkbox\" value=\"1\" ng-model=\"employee.communication.isVoice\">\n" +
    "                                                    <i></i> Voice Message\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"col-md-9\">\n" +
    "                                            <!-- <input type=\"text\" class=\"col-md-7\" ng-model=\"employee.communication.voice\" ng-if=\"employee.communication.isVoice\" ng-init=\"employee.communication.voice=employee.workphone\" required=\"\" ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"false\"> -->\n" +
    "                                            <input type=\"text\" class=\"col-md-7\" ng-model=\"employee.communication.voice\" ng-if=\"employee.communication.isVoice\" ng-init=\"employee.communication.voice= employee.communication.text!= null && employee.communication.voice!='' ?employee.communication.voice:employee.workphone\" ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"false\">\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-sm-12 form-group\">\n" +
    "                                        <div class=\"col-md-3\">\n" +
    "                                            <div class=\"checkbox\">\n" +
    "                                                <label class=\"i-checks\">\n" +
    "                                                    <input type=\"checkbox\" value=\"1\" checked=\"\" ng-model=\"employee.communication.isText\">\n" +
    "                                                    <i></i> Text/SMS\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"col-md-9\">\n" +
    "                                            <input type=\"text\" class=\"col-md-7\" ng-model=\"employee.communication.text\" ng-init=\"employee.communication.text=employee.communication.text!= null && employee.communication.text!= '' ?employee.communication.text:employee.workphone\" ng-if=\"employee.communication.isText\" ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"false\">\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-sm-12 form-group\">\n" +
    "                                        <div class=\"col-md-3\">\n" +
    "                                            <div class=\"checkbox\">\n" +
    "                                                <label class=\"i-checks\">\n" +
    "                                                    <input type=\"checkbox\" value=\"1\" checked=\"\" ng-model=\"employee.communication.isEmail\">\n" +
    "                                                    <i></i> Email\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"col-md-9\">\n" +
    "                                            <input type=\"email\" class=\"col-md-7\" ng-model=\"employee.communication.email\" ng-init=\"employee.communication.email=employee.communication.email != null && employee.communication.email !=''?employee.communication.email:employee.email\" ng-if=\"employee.communication.isEmail\">\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                         <div class=\"form-group\" >\n" +
    "                            <label class=\"col-sm-2 control-label text-danger\">Track Location</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"track_location\" required=\"\" value=\"1\" ng-model=\"employee.track_location\"><i></i> Yes\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"track_location\" required=\"\" value=\"0\" ng-model=\"employee.track_location\"><i></i> No\n" +
    "                                </label>\n" +
    "                               \n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click=\"employeeManagePrev('advanced')\">Prev</button>\n" +
    "                                <button type=\"submit\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "                                <button type=\"button\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\" ng-click=\"employeeManage('advanced', false)\">Save changes</button>\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  {{ErrorMsg}}\n" +
    "                        </span>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-if=\"pageTitle=='Update'\" class=\"btn btn-default btn-rounded\" ng-click='deleteEmployee(employee.accesscode)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelEmployee()'>Cancel</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\" ng-show=\"employee_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Employee: <em class=\"ng-binding\">{{employee.accesscode}}</em>, User Name: <em class=\"ng-binding\">{{employee.username}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{employee.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{employee.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"employee.editedOn\">\n" +
    "                                        Edited by: {{employee.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{employee.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                </tab>\n" +
    "\n" +
    "                <tab heading=\"Certification\" disabled=\"pageTitle=='Add New'\" active=\"empSteps.certification\" select=\"empSteps.percent=80\">\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Enter upto three certifications for the Employee. You can upload a PDF for each certification entered.\n" +
    "                    </p>\n" +
    "\n" +
    "                    <progressbar value=\"empSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "                    <form name=\"certification\" enctype=\"multipart/form-data\" target=\"take_the_upload\" method=\"post\" class=\"form-validation form-horizontal certification\" novalidate>\n" +
    "\n" +
    "\n" +
    "                        <div ng-repeat=\"(key, certificate) in employee.certificates\" class=\"certificateCont wrapper-md\">\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <label class=\"col-sm-2 control-label\">Certificate Name </label>\n" +
    "                                <div class=\"col-sm-10\">\n" +
    "                                    <input type=\"text\" class=\"form-control\" capitalize placeholder=\"Enter Certificate Name\" ng-model=\"certificate.name\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <label class=\"col-sm-2 control-label\">Certificate Date</label>\n" +
    "                                <div class=\"col-sm-10\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                                    <div class=\"input-group w-md\">\n" +
    "                                        <input type=\"text\" class=\"form-control\" max-date=\"{{dt}}\" datepicker-popup=\"{{format}}\" ng-model=\"certificate.ctdate\" is-open=\"opened\" readonly datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                                        <span class=\"input-group-btn\">\n" +
    "                                            <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                                         </span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <label class=\"col-sm-2 control-label\">Renewal Date</label>\n" +
    "                                <div class=\"col-sm-10\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                                    <div class=\"input-group w-md\">\n" +
    "                                        <input type=\"text\" readonly class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"certificate.renewaldate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                                        <span class=\"input-group-btn\">\n" +
    "                                            <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                                        </span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <label class=\"col-sm-2 control-label\">Notes</label>\n" +
    "                                <div class=\"col-sm-10\">\n" +
    "                                    <textarea rows=\"4\" capitalize ng-model=\"certificate.notes\" cols=\"50\"></textarea>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <label class=\"col-sm-2 control-label\">Upload certificate</label>\n" +
    "                                <div class=\"col-sm-10\">\n" +
    "                                    <div new-Uploader uploadPath=\"uploads\" rel=\"{{key}}\" uploadtarget=\"upload_iframe1\">Click to Add File</div>\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div id=\"main_content\" align=\"left\">\n" +
    "                                <div id=\"uploadedFilesCont\">\n" +
    "                                    <div class=\"test\" id=\"UPD_listingCont\" ng-repeat=\"file in certificate.files\" ng-show=\"certificate.files.length\">\n" +
    "\n" +
    "\n" +
    "                                        <div class=\"fuObject\" data-target=\"{{file.path}}\" data-type=\"file\">\n" +
    "\n" +
    "                                            <table class=\"table table-striped bg-white b-a\">\n" +
    "                                                <tbody>\n" +
    "                                                    <tr>\n" +
    "                                                        <td><img src=\"assets/gfx/file-pdf.png\" /> {{file.name | uppercase }} </td>\n" +
    "                                                        <td><a href=\"javascript:void(0);\" class=\"downloadFile floatRight\" ng-click=\"downloadCurrFile(file.path)\"><i class=\"fa fa-eye text-muted\"></i> View File</a>\n" +
    "                                                        </td>\n" +
    "                                                        <td><a href=\"javascript:void(0);\" class=\"deleteFile floatRight\" ng-click=\"deleteCurrFile(file, $parent.key, key)\"><i class=\"fa fa-trash-o text-muted\"></i> Delete File</a>\n" +
    "                                                        </td>\n" +
    "                                                        <td><i class=\"fa fa-clock-o text-muted\"></i> {{file.last_modified}}</td>\n" +
    "                                                    </tr>\n" +
    "                                                </tbody>\n" +
    "                                            </table>\n" +
    "                                        </div>\n" +
    "\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"cClear\"></div>\n" +
    "                                    <div class=\"line line-lg b-b b-light\"></div>\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "\n" +
    "                            <div class=\"form-group\">\n" +
    "                                <div class=\"col-sm-8\">\n" +
    "                                </div>\n" +
    "                                <div class=\"col-sm-4 textRight\">\n" +
    "                                    <span ng-show=\"$index > 0\"><a href=\"\" class=\"btn btn-rounded btn-sm btn-icon btn-primary\" ng-click=\"removeCertificate(key)\"><i class=\"fa fa-trash-o\"></i></a></span>\n" +
    "                                    <span ng-show=\"$index > employee.certificatesaddshow && $index < employee.certificatesMax-1\"><a href=\"\" class=\"btn btn-rounded btn-sm btn-icon btn-primary\" ng-click=\"addCertificate($index, key, $event)\"><i class=\"fa fa-plus\"></i></a></span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click=\"employeeManagePrev('certification')\">Prev</button>\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-if=\"adminUser\" ng-click=\"employeeManage('certification')\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-primary  btn-rounded\" ng-click=\"employeeManage('certification', false)\">Save changes</button>\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                    {{ErrorMsg}}\n" +
    "                                </span>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-if=\"pageTitle=='Update'\" class=\"btn btn-default btn-rounded\" ng-click='deleteEmployee(employee.accesscode)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelEmployee()'>Cancel</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\" ng-show=\"employee_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Employee: <em class=\"ng-binding\">{{employee.accesscode}}</em>, User Name: <em class=\"ng-binding\">{{employee.username}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{employee.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{employee.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"employee.editedOn\">\n" +
    "                                        Edited by: {{employee.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{employee.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </form>\n" +
    "                    <iframe id=\"take_the_upload\" name=\"take_the_upload\" style=\"display: none\"></iframe>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "                <tab heading=\"Authorization\" disabled=\"pageTitle=='Add New'\" active=\"empSteps.authorization\" select=\"empSteps.percent=100\">\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Enter Employee's email address. Login credentials will be sent to this email address.\n" +
    "                    </p>\n" +
    "                    <progressbar value=\"empSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "                    <form name=\"authorization\" class=\"form-validation form-horizontal  authorization\" ng-submit=\"employeeManage('authorization')\" novalidate>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Enter Email Address</label>\n" +
    "                            <div class=\"col-sm-8\">\n" +
    "                                <input type=\"email\" class=\"form-control\" id=\"email\" name=\"email\" ng-model=\"employee.email\" placeholder=\"Full Email address including domain.\">\n" +
    "                                <em class=\"help-block m-b-none text-muted\">Example: Jane.Smith@Gmail.com</em>\n" +
    "                            </div>\n" +
    "                            <div class=\"cpl-sm-2\">\n" +
    "                                <button type=\"button\"  class=\"btn btn-info\" ng-click=\"sendAuthorization()\">Send</button>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click=\"employeeManagePrev('authorization')\">Prev</button>\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-primary  btn-rounded\" ng-click=\"employeeManage('authorization', false)\">Save changes</button>\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  {{ErrorMsg}}\n" +
    "                        </span>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-if=\"pageTitle=='Update'\" class=\"btn btn-default btn-rounded\" ng-click='deleteEmployee(employee.accesscode)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelEmployee()'>Cancel</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\" ng-show=\"employee_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Employee: <em class=\"ng-binding\">{{employee.accesscode}}</em>, User Name: <em class=\"ng-binding\">{{employee.username}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{employee.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{employee.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"employee.editedOn\">\n" +
    "                                        Edited by: {{employee.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{employee.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/employees/employee-dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/employees/employee-dashboard.tpl.html",
    "<div class=\"hbox hbox-auto-xs hbox-auto-sm\">\n" +
    "    <!-- main -->\n" +
    "    <div class=\"col\">\n" +
    "        <!-- main header -->\n" +
    "        <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-6 col-xs-12\">\n" +
    "                    <h1 class=\"m-n font-thin h3 text-black\">Employee Dashboard - {{empName}}</h1>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-6 text-right hidden-xs\">\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- / main header -->\n" +
    "        <div class=\"wrapper-md\">\n" +
    "            <!-- stats -->\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12 bg-light lter  wrapper-md\">                   \n" +
    "                    <div >\n" +
    "                        <h1 class=\"m-n font-thin h3\">DASHBOARD AS OF {{startDateonly}} - {{lastDateonly}} </h1>\n" +
    "                    </div>                    \n" +
    "                    <div class=\"pull-right\">\n" +
    "\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateDetails()\">REFRESH</button>\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getdetails(1)\">-1 Week</button>\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getdetails(2)\">-2 Week</button>\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getdetails(month)\">This month</button>\n" +
    "\n" +
    "                    </div>\n" +
    "                \n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"row row-sm text-center\">\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"panel padder-v bg-default item\">\n" +
    "                                <div class=\"h1 text-primary font-thin h1\">\n" +
    "                                    <div class=\"spinner\" ng-show=\"loading\"></div>{{jobShiftCount}}</div>\n" +
    "                                <span class=\"text-muted text-xs\">Total Scheduled Visits(SHIFTS)</span>\n" +
    "                                <div class=\"top text-right\">\n" +
    "                                    <i class=\"fa fa-medkit text-muted m-r-sm\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"panel padder-v bg-default item\">\n" +
    "                                <div class=\"h1 text-primary font-thin h1\">{{totalClockin}}</div>\n" +
    "                                <span class=\"text-muted text-xs\">Total Clock-IN</span>\n" +
    "                                <div class=\"top text-right\">\n" +
    "                                    <i class=\"fa fa-medkit text-muted m-r-sm\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <a href class=\"block panel padder-v bg-default item\">\n" +
    "                                <span class=\"text-primary font-thin h1 block\">{{totalClockout}}</span>\n" +
    "                                <span class=\"text-muted text-xs\">Total Clock-OUT</span>\n" +
    "                                <span class=\"top text-right\">\n" +
    "                                 <i class=\"fa fa-medkit text-muted m-r-sm\"></i>\n" +
    "                                </span>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <a href class=\"block panel padder-v bg-default item\">\n" +
    "                                <span class=\"text-success font-thin h1 block\">{{totalOnClockin}}</span>\n" +
    "                                <span class=\"text-success text-xs\">ON-TIME CLOCK IN</span>\n" +
    "                                <span class=\"top text-right\">\n" +
    "                  <i class=\"fa fa-users text-muted m-r-sm\"></i>\n" +
    "                </span>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <a href class=\"block panel padder-v bg-default item\">\n" +
    "                                <span class=\"text-warning font-thin h1 block\">{{totalLateClockin}}</span>\n" +
    "                                <span class=\"text-warning text-xs\">LATE CLOCK IN</span>\n" +
    "                                <span class=\"top text-right\">\n" +
    "                  <i class=\"fa fa-users text-muted m-r-sm\"></i>\n" +
    "                </span>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"panel padder-v bg-default item\">\n" +
    "                                <div class=\"text-danger font-thin h1\">{{totalNotClockin}}</div>\n" +
    "                                <span class=\"text-danger text-xs\">NOT CLOCK IN</span>\n" +
    "                                <div class=\"top text-right\">\n" +
    "                                    <i class=\"fa fa-users text-muted m-r-sm\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                    <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <wj-flex-chart class=\"custom-flex-chart\" items-source=\"Chartdetails\" binding-x=\"date_time\" chart-type=\"SplineSymbols\">\n" +
    "                        <wj-flex-chart-axis wj-property=\"axisX\" axis-line=\"true\" major-grid=\"true\" label-Angle=\"45\">\n" +
    "                        </wj-flex-chart-axis>\n" +
    "                        <wj-flex-chart-axis wj-property=\"axisY\" axis-line=\"false\" major-grid=\"true\">\n" +
    "                        </wj-flex-chart-axis>\n" +
    "                        <wj-flex-chart-series name=\"Clock In\" binding=\"clockin\"></wj-flex-chart-series>\n" +
    "                        <wj-flex-chart-series name=\"Clock Out\" binding=\"clockout\"></wj-flex-chart-series>\n" +
    "\n" +
    "                        <wj-flex-chart-legend position=\"Bottom\"></wj-flex-chart-legend>\n" +
    "                    </wj-flex-chart>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <wj-flex-grid items-source=\"calllogListDetail\">\n" +
    "                        <!--<wj-flex-grid-column header=\"Employee \" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>-->\n" +
    "                        <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_code\" width=\"*\"> </wj-flex-grid-column >\n" +
    "                        <wj-flex-grid-column header=\"Log Type\" is-read-only=\"true\" binding=\"log_type\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Work Duration\" is-read-only=\"true\" binding=\"call_duriation\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Time Stamp\" is-read-only=\"true\" binding=\"timestamp\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Call Status\" is-read-only=\"true\" binding=\"call_status\"> </wj-flex-grid-column>\n" +
    "                    </wj-flex-grid>\n" +
    "                    <div class=\"row wrapper\">\n" +
    "                        <wj-menu value=\"calllogListDetail.pageSize\" header=\"Rows per Page\">\n" +
    "                            <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                            <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                            <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                            <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                        </wj-menu>\n" +
    "                        <div class=\"btn-group col-md-8\" ng-show=\"calllogListDetail.pageSize > 0\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{calllogListDetail.pageIndex+1}} / {{calllogListDetail.pageCount}} </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  \n" +
    "</div>");
}]);

angular.module("ct-app/employees/employee-dashboard_bk.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/employees/employee-dashboard_bk.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">{{labels.Employees }} Dashboard</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-6\">\n" +
    "            <div class=\"panel panel-default\">\n" +
    "                <div class=\"panel-heading\">\n" +
    "                    <div class=\"clearfix\">\n" +
    "\n" +
    "                        <div class=\"clear\">\n" +
    "                            <div class=\"h2 m-t-xs m-b-xs\">\n" +
    "                                {{employeeStateDetail.first_name}} {{employeeStateDetail.last_name}}\n" +
    "                                <span ng-bind-html=\"employeeStateDetail.status | checkStatStatus\"> {{employeeStateDetail.status}}</i></span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"list-group no-radius alt\">\n" +
    "                    <li class=\"list-group-item\">\n" +
    "                        <span class=\"pull-right\">{{employeeStateDetail.agency_id}}</span>\n" +
    "                        <i class=\"fa fa-university fa-fw text-muted\"></i> Agency\n" +
    "                    </li>\n" +
    "                    <li class=\"list-group-item\">\n" +
    "                        <span class=\"pull-right\" ng-bind-html=\"employeeStateDetail.is_supervisor | checklevel\">{{employeeStateDetail.is_supervisor | checklevel}}</span>\n" +
    "                        <i class=\"fa fa-users fa-fw text-muted\"></i> User Type\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"list-group-item\">\n" +
    "                        <span class=\"pull-right\">{{employeeStateDetail.username}}</span>\n" +
    "                        <i class=\"fa fa-user fa-fw text-muted\"></i> Username\n" +
    "                    </li>\n" +
    "                    <li class=\"list-group-item\">\n" +
    "                        <span class=\"pull-right\">{{employeeStateDetail.access_code}}</span>\n" +
    "                        <i class=\"fa fa-unlock-alt fa-fw text-muted\"></i> Access Code\n" +
    "                    </li>\n" +
    "\n" +
    "                    <li class=\"list-group-item\">\n" +
    "                        <span class=\"pull-right\">{{employeeStateDetail.primary_phone | phoneFormat}}</span>\n" +
    "                        <i class=\"fa fa-phone fa-fw text-muted\"></i> Telephone\n" +
    "                    </li>\n" +
    "                    <li class=\"list-group-item\">\n" +
    "                        <span class=\"pull-right\">{{employeeStateDetail.email}}</span>\n" +
    "                        <i class=\"fa fa-envelope fa-fw text-muted\"></i> eMail\n" +
    "                    </li>\n" +
    "                    <li class=\"list-group-item\">\n" +
    "                        <span class=\"pull-right\">{{employeeStateDetail.primary_address1}} {{employeeStateDetail.primary_address2}}, {{employeeStateDetail.primary_county}} {{employeeStateDetail.primary_city}}, {{employeeStateDetail.state}} {{employeeStateDetail.primary_zip}}</span>\n" +
    "                        <i class=\"fa fa-home fa-fw text-muted\"></i> Address\n" +
    "                    </li>\n" +
    "                    <li class=\"list-group-item\">\n" +
    "                        <span class=\"pull-right\">$ {{employeeStateDetail.pay_rate}}</span>\n" +
    "                        <i class=\"fa fa-money fa-fw text-muted\"></i> Pay Rate\n" +
    "                    </li>\n" +
    "\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"panel panel-info\">\n" +
    "\n" +
    "                <div class=\"input-group\">\n" +
    "                    <input type=\"text\" class=\"form-control input-lg\" placeholder=\"Send John a message\">\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                <button class=\"btn btn-primary btn-lg\" type=\"button\">SEND</button>\n" +
    "              </span>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"panel b-a\">\n" +
    "                <div class=\"panel-heading font-bold bg-primary\">Employee Activity</div>\n" +
    "                <table class=\"table table-striped m-b-none\">\n" +
    "                    <thead>\n" +
    "                        <tr>\n" +
    "                            <th ng-click=\"empSortMe('Zone_code ', 'Zone_code ')\" class=\"sortable Zone_code \">Zone &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "                            <th ng-click=\"empSortMe('Job_code ', 'Job_code ')\" class=\"sortable Job_code \">Job &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "                            <th ng-click=\"empSortMe('clockin ', 'clockin ')\" class=\"sortable clockin \">ClockIn &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "                            <th ng-click=\"empSortMe('clockout', 'clockout')\" class=\"sortable clockout\">Clockout &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "                            <th ng-click=\"empSortMe('work_duration', 'work_duration')\" class=\"sortable work_duration\" class=\"hidden-xs\">Duration &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "\n" +
    "                        </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "\n" +
    "\n" +
    "                        <tr ng-repeat=\"detail in employeelogDetails\">\n" +
    "                            <td>{{detail.Zone_name }}({{detail.Zone_code }})</td>\n" +
    "                            <td>{{detail.job_name }}({{detail.Job_code}})</td>\n" +
    "                            <td>{{detail.clockin}} </td>\n" +
    "                            <td>{{detail.clockout}}</td>\n" +
    "                            <td class=\"hidden-xs\">{{detail.work_duration}}</td>\n" +
    "\n" +
    "                        </tr>\n" +
    "                        <tr ng-if=\"employeelogDetails.length==0\">\n" +
    "                            <td colspan='5'> No Record Found </td>\n" +
    "                        </tr>\n" +
    "\n" +
    "\n" +
    "                    </tbody>\n" +
    "                    <tr ng-if=\"employeelogDetails.length>0\">\n" +
    "                        <td colspan='3'>\n" +
    "                            <div class=\"text-right\">\n" +
    "                                <small class=\"text-muted inline m-t-sm m-b-sm\">showing {{empConfig.list.itemFrom}}-{{empConfig.list.itemTo}} of {{empConfig.list.itemTotalCount}} items </small>\n" +
    "                            </div>\n" +
    "                        </td>\n" +
    "                        <td colspan='2'>\n" +
    "\n" +
    "                            <div class=\"text-right\">\n" +
    "                                <ul class=\"pagination pagination-sm m-t-none m-b-none\">\n" +
    "                                    <li><a href=\"javascript:void(0)\" ng-click=\"getNextData(empConfig.list.preOffset)\" ng-show=\"empConfig.list.currentPage>1\"><i class=\"fa fa-chevron-left\"></i></a>\n" +
    "                                    </li>\n" +
    "                                    <li><a href=\"javascript:void(0)\" ng-repeat=\"page in empConfig.list.pagination\" ng-click=\"getEmpNextData(page.offset)\">{{page.number}}</a>\n" +
    "                                    </li>\n" +
    "                                    <li><a href=\"javascript:void(0)\" ng-click=\"getNextData(empConfig.list.nextOffset)\" ng-show=\"empConfig.list.currentPage < Config.list.paginationCount\"><i class=\"fa fa-chevron-right\"></i></a>\n" +
    "                                    </li>\n" +
    "                                </ul>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            <div class=\"panel b-a\">\n" +
    "                <div class=\"panel-heading font-bold bg-primary\">Employee Schedule</div>\n" +
    "                <table class=\"table table-striped m-b-none\">\n" +
    "                    <thead>\n" +
    "                        <tr>\n" +
    "                            <th width=\"20%\" ng-click=\"sortMe('zone_id', 'zone_id')\" class=\"sortable zone_id\">Zone &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "                            <th width=\"20%\" ng-click=\"sortMe('job_id', 'job_id')\" class=\"sortable job_id\">Job &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "                            <th width=\"20%\" ng-click=\"sortMe('in_at', 'in_at')\" class=\"sortable in_at\">Start on &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "                            <th width=\"20%\" ng-click=\"sortMe('out_at', 'out_at')\" class=\"sortable out_at\">End at &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "                            <th width=\"20%\" ng-click=\"sortMe('duriation', 'duriation')\" class=\"sortable duriation\" class=\"hidden-xs\">Duration &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                            </th>\n" +
    "\n" +
    "                        </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "\n" +
    "\n" +
    "                        <tr ng-repeat=\"detail in employeeshiftDetails\">\n" +
    "                            <td>{{detail.zone | parseToJson:0:'zone'}}</td>\n" +
    "                            <td>{{detail.job | parseToJson:0:'zone'}}</td>\n" +
    "                            <td>{{detail.in_date}} {{detail.in_time}}</td>\n" +
    "                            <td>{{detail.out_date}} {{detail.out_time}}</td>\n" +
    "                            <td class=\"hidden-xs\">{{detail.duriation}}</td>\n" +
    "\n" +
    "                        </tr>\n" +
    "                        <tr ng-if=\"employeeshiftDetails.length==0\">\n" +
    "                            <td colspan='5'> No Record Found </td>\n" +
    "                        </tr>\n" +
    "\n" +
    "\n" +
    "                    </tbody>\n" +
    "                    <tr ng-if=\"employeeshiftDetails.length>0\">\n" +
    "                        <td colspan='3'>\n" +
    "                            <div class=\"text-right\">\n" +
    "                                <small class=\"text-muted inline m-t-sm m-b-sm\">showing {{Config.list.itemFrom}}-{{Config.list.itemTo}} of {{Config.list.itemTotalCount}} items </small>\n" +
    "                            </div>\n" +
    "                        </td>\n" +
    "                        <td colspan='2'>\n" +
    "\n" +
    "                            <div class=\"text-right\">\n" +
    "                                <ul class=\"pagination pagination-sm m-t-none m-b-none\">\n" +
    "                                    <li><a href=\"javascript:void(0)\" ng-click=\"getNextData(Config.list.preOffset)\" ng-show=\"Config.list.currentPage>1\"><i class=\"fa fa-chevron-left\"></i></a>\n" +
    "                                    </li>\n" +
    "                                    <li><a href=\"javascript:void(0)\" ng-repeat=\"page in Config.list.pagination\" ng-click=\"getNextData(page.offset)\">{{page.number}}</a>\n" +
    "                                    </li>\n" +
    "                                    <li><a href=\"javascript:void(0)\" ng-click=\"getNextData(Config.list.nextOffset)\" ng-show=\"Config.list.currentPage < Config.list.paginationCount\"><i class=\"fa fa-chevron-right\"></i></a>\n" +
    "                                    </li>\n" +
    "                                </ul>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "       <div class=\"col-md-6\">\n" +
    "            <div class=\"panel b-a\">\n" +
    "              <!-- <div class=\"padder-v b-t b-light bg-light lter row text-center no-gutter\">\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <div>Clock-In/Out</div>\n" +
    "                        <div class=\"inline m-t-sm\">\n" +
    "                            <div ui-jq=\"easyPieChart\" ui-options=\"{\n" +
    "                      percent: 88,\n" +
    "                      lineWidth: 3,\n" +
    "                      trackColor: '{{app.color.light}}',\n" +
    "                      barColor: '{{app.color.primary}}',\n" +
    "                      scaleColor: false,\n" +
    "                      color: '#fff',\n" +
    "                      size: 65,\n" +
    "                      lineCap: 'butt',\n" +
    "                      rotate: 45,\n" +
    "                      animate: 1000\n" +
    "                    }\">\n" +
    "                                <div>\n" +
    "                                    <span class=\"step\">88</span>%\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <div>On Time</div>\n" +
    "                        <div class=\"inline m-t-sm\">\n" +
    "                            <div ui-jq=\"easyPieChart\" ui-options=\"{\n" +
    "                      percent: 90,\n" +
    "                      lineWidth: 3,\n" +
    "                      trackColor: '{{app.color.light}}',\n" +
    "                      barColor: '{{app.color.info}}',\n" +
    "                      scaleColor: false,\n" +
    "                      color: '#fff',\n" +
    "                      size: 65,\n" +
    "                      lineCap: 'butt',\n" +
    "                      rotate: 90,\n" +
    "                      animate: 1000\n" +
    "                    }\">\n" +
    "                                <div>\n" +
    "                                    <span class=\"step\">90</span>%\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-xs-4\">\n" +
    "                        <div>Other</div>\n" +
    "                        <div class=\"inline m-t-sm\">\n" +
    "                            <div ui-jq=\"easyPieChart\" ui-options=\"{\n" +
    "                      percent: 20,\n" +
    "                      lineWidth: 3,\n" +
    "                      trackColor: '{{app.color.light}}',\n" +
    "                      barColor: '{{app.color.warning}}',\n" +
    "                      scaleColor: false,\n" +
    "                      color: '#fff',\n" +
    "                      size: 65,\n" +
    "                      lineCap: 'butt',\n" +
    "                      rotate: 180,\n" +
    "                      animate: 1000\n" +
    "                    }\">\n" +
    "                                <div>\n" +
    "                                    <span class=\"step\">20</span>%\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>-->\n" +
    "\n" +
    "                <div class=\"hbox text-center b-t b-light\">\n" +
    "                    <a href class=\"col padder-v text-muted b-r b-light\">\n" +
    "                        <div class=\"h3\">210</div>\n" +
    "                        <span>Clock OUT</span>\n" +
    "                    </a>\n" +
    "                    <a href class=\"col padder-v text-muted\">\n" +
    "                        <div class=\"h3\">203</div>\n" +
    "                        <span>Clock OUT</span>\n" +
    "                    </a>\n" +
    "                    <a href class=\"col padder-v text-muted\">\n" +
    "                        <div class=\"h3\">7</div>\n" +
    "                        <span>Error</span>\n" +
    "                    </a>\n" +
    "                </div>\n" +
    "\n" +
    "                <footer class=\"panel-footer bg-info text-center no-padder\">\n" +
    "                    <div class=\"row no-gutter\">\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"wrapper\">\n" +
    "                                <span class=\"m-b-xs h3 block text-white\">$1,342.23</span>\n" +
    "                                <small class=\"text-muted\">This Month</small>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4 dk\">\n" +
    "                            <div class=\"wrapper\">\n" +
    "                                <span class=\"m-b-xs h3 block text-white\">$7,326.78</span>\n" +
    "                                <small class=\"text-muted\">YTD</small>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"wrapper\">\n" +
    "                                <span class=\"m-b-xs h3 block text-white\">$462.04</span>\n" +
    "                                <small class=\"text-muted\">Overtime</small>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </footer>\n" +
    "\n" +
    "            </div>\n" +
    "            <!--\n" +
    "            <div ng-controller=\"FlotChartDemoCtrl\">\n" +
    "                <div class=\"panel b-a\">\n" +
    "                    <div class=\"panel-heading font-bold bg-info\">Check In / Check Out</div>\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <div ui-jq=\"plot\" ui-options=\"\n" +
    "              [\n" +
    "                { data: {{d0_1}}, label: 'IN', points: { show: true }, lines: { show: true, fill: true, fillColor: { colors: [{ opacity: 0.1 }, { opacity: 0.1}] } } }, \n" +
    "                { data: {{d0_2}}, label: 'OUT', points: { show: true, radius: 4 } }\n" +
    "              ],\n" +
    "              {\n" +
    "                colors: [ '{{app.color.info}}','{{app.color.warning}}' ],\n" +
    "                series: { shadowSize: 2 },\n" +
    "                xaxis:{ font: { color: '#ccc' } },\n" +
    "                yaxis:{ font: { color: '#ccc' } },\n" +
    "                grid: { hoverable: true, clickable: true, borderWidth: 0, color: '#ccc' },\n" +
    "                tooltip: true,\n" +
    "                tooltipOpts: { content: '%s of %x.1 is %y.4',  defaultTheme: false, shifts: { x: 0, y: 20 } }\n" +
    "              }\n" +
    "            \" style=\"height:240px\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "                <div class=\"panel b-a\">\n" +
    "                    <div class=\"panel-heading font-bold bg-info\">Status Codes</div>\n" +
    "                    <div class=\"panel-body\">\n" +
    "                        <div ui-jq=\"plot\" ui-options=\"\n" +
    "              {{d3}},\n" +
    "              {\n" +
    "                series: { pie: { show: true, innerRadius: 0.5, stroke: { width: 0 }, label: { show: true, threshold: 0.05 } } },\n" +
    "                colors: ['{{app.color.primary}}','{{app.color.info}}','{{app.color.success}}','{{app.color.warning}}','{{app.color.danger}}'],\n" +
    "                grid: { hoverable: true, clickable: true, borderWidth: 0, color: '#ccc' },   \n" +
    "                tooltip: true,\n" +
    "                tooltipOpts: { content: '%s: %p.0%' }\n" +
    "              }\n" +
    "            \" style=\"height:240px\"></div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "              -->\n" +
    "\n" +
    "\n" +
    "        </div> \n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("ct-app/employees/employees.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/employees/employees.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">{{labels.Employees }} List <span class=\"pull-right\"><a ui-sref=\"ctApp.addUpdateEmployee\" class=\"btn btn-sm btn-info\" type=\"button\">Add {{labels.Employees }}</a>&nbsp;<a ui-sref=\"ctApp.employeeList\" class=\"btn btn-sm btn-info\" type=\"button\">EMPLOYEE LIST</a></span> </h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                    <div  class=\"form-control \" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"config.general.zone\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"input-group col-sm-12\">\n" +
    "                    \n" +
    "                    <ui-select ng-change=\"updateTableData()\" ng-model=\"config.general.filterStatus\" theme=\"select2\" style=\"min-width: 225px;\">\n" +
    "                        <ui-select-match placeholder=\"Status for search\">{{$select.selected.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"item in statusSearchOption\">\n" +
    "                            <div ng-bind-html=\"item.name\"></div>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "               \n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"input-group col-sm-12\">\n" +
    "\n" +
    "                     <ui-select ng-model=\"config.general.filterDBField\" theme=\"select2\" style=\"min-width: 225px;\">\n" +
    "                        <ui-select-match placeholder=\"Optional filter for search\">{{$select.selected.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"item in employeeSearchOption\">\n" +
    "                            <div ng-bind-html=\"item.name\"></div>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "                </div>\n" +
    "                \n" +
    "                \n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" capitalize ui-keypress=\"{13:'updateTableData(true)'}\">\n" +
    "            </div>\n" +
    "           \n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"access_code\" class=\"sort-item asc\" style=\"width:20%;\">Employee Code &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"first_name\" class=\"sort-item\">Employee Name &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"primary_city\" class=\"sort-item\">City  &nbsp;<i class=\"fa fa-sort\"></i></th>\n" +
    "                        <th id=\"primary_state\" class=\"sort-item\">State  &nbsp;<i class=\"fa fa-sort\"></i> </th>\n" +
    "                        <th id=\"zone_id\" class=\"sort-item\">Zone &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in employeeDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.access_code}}</td>\n" +
    "                        <td><span ng-bind-html=\"detail.last_clocked_in_date | iconColor\">{{detail.last_clocked_in_date  | iconColor}}</span> &nbsp;   <span ng-bind-html=\"detail.last_scheduled_date | calenderIconColor\">{{detail.last_scheduled_date  | iconColor}}</span> &nbsp;  {{detail.first_name}} {{detail.last_name }} \n" +
    "                         </td>\n" +
    "                        <td>{{detail.primary_city   }}</td>\n" +
    "                        <td>{{detail.primary_state  }}</td>\n" +
    "                        <td>{{detail.zone_detail  |  parseToJson:0:'zone' }}</td>\n" +
    "                         <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status  | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button  ng-click=\"enableView(detail.access_code)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-eye\"></i></button>\n" +
    "                            \n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                         <!--   <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button> -->\n" +
    "                            <button ng-click=\"enableDashboard(detail.access_code)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-dashboard\"></i>\n" +
    "                            </button> \n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_employees_loader\">\n" +
    "                        <td colspan=\"7\">\n" +
    "                            <div show-loader=\"config.show_employees_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_employees_loader && employeeDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/employees/mapDetailView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/employees/mapDetailView.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">{{title}}, {{county}}, {{job_state}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "<!-- <div ng-bind-html=\"trustedHtml\"></div> -->\n" +
    "\n" +
    "<iframe id=\"jobMapId\" width=\"567\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" ng-src=\"{{currentProjectUrl}}\" mozbrowser remote></iframe> \n" +
    "\n" +
    "</div>\n" +
    "    	      \n" +
    "    	     \n" +
    "<div class=\"modal-footer\">              \n" +
    "   <a ng-href=\"{{fullMapUrl}}\" class=\"btn btn-sm btn-info\" target=\"_blank\">VIEW IN GOOGLE MAP</a>\n" +
    "    <button class=\"btn btn-default\" ng-click=\"cancel()\">CANCEL</button>\n" +
    "</div>");
}]);

angular.module("ct-app/employees/upload-skeleton.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/employees/upload-skeleton.tpl.html",
    "<div class=\"uploadCtrlCont\">\n" +
    "    <div data-ng-controller=\"uploadMultipleCtrl\">\n" +
    "            <span>\n" +
    "                <span class=\"uploadHolder\" style=\"display: none;\"></span>\n" +
    "                <a class=\"uploadAnchor btn btn-info uploadAnchor_{{key}}\" href=\"javascript:void(0);\" ng-click= fileUploadClick($event) ng-class=\"{active:certificate.files.length == 0, disabled : certificate.files.length >= 1}\" >Pick a file to upload </a>\n" +
    "            </span>\n" +
    "            <div data-ng-controller=\"ProgressDemoCtrl\" class=\"panel-body col-sm-5 pull-right showLoad_{{key}}\" style=\"display:none\" >\n" +
    "                            <progressbar class=\"progress-striped active m-b-sm\" value=\"100\" type=\"info\"> </progressbar>\n" +
    "                         </div>\n" +
    "                         \n" +
    "            <!-- <a ng-click=\"importFile()\" class=\"btn btn-primary\">Import</a> -->\n" +
    "            <span ng-show=\"uploadErrorCont\" class=\"UPDerrorCont ng-hide\">\n" +
    "                {{uploadErrorMsg}}\n" +
    "            </span>\n" +
    "            <span ng-show=\"updLoading\" class=\"updLoading ng-hide\">&nbsp;</span>\n" +
    "            <span ng-show=\"downloadCont\" class=\"downloadCont ng-hide\">Download: <a class=\"file-download-link\" target=\"_blank\"></a></span>\n" +
    "        \n" +
    "        <div id=\"UPD_lightbox\">\n" +
    "            <div class=\"UPD_overlay ng-hide\" ng-show=\"UPDoverlay\"></div>\n" +
    "            <div class=\"UPD_loading ng-hide\" ng-show=\"UPDloadingInt\"></div>\n" +
    "        </div>\n" +
    "        <script type=\"text/ng-template\" id=\"UPDdeleteModalContent.html\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <h3>Confirm your action</h3>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "                \n" +
    "                Are you sure you want to delete this file permanently: \n" +
    "                <br /><b>{{ currFile.name }}</b>\n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <span class=\"updLoading ng-hide\" ng-show=\"modalLoading\"></span>\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"deleteOK()\">OK</button>\n" +
    "                <button class=\"btn btn-warning\" ng-click=\"deleteCANCEL()\">Cancel</button>\n" +
    "            </div>\n" +
    "        </script>\n" +
    "        \n" +
    "        <script type=\"text/ng-template\" id=\"UPDfileExistModalContent.html\">\n" +
    "            <div class=\"modal-header\">\n" +
    "                <h3>Confirm your action</h3>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\">\n" +
    "                <form class=\"form-horizontal\">\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-sm-12\">\n" +
    "                            File <b>{{ currUPDFile }}</b> already Exists! Choose your action: \n" +
    "                        </div>                  \n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-sm-12\">\n" +
    "                            <div class=\"col-sm-4 text-right\">\n" +
    "                                Change your filename \n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-6\">\n" +
    "                                <input type=\"text\" name=\"renameFile\" value=\"\" class=\"form-control\" ng-model=\"renameFilenameInp\" id=\"renameFilenameInp\" />\n" +
    "                            </div>  \n" +
    "                            <div class=\"col-sm-2\">\n" +
    "                                <button class=\"btn btn-primary\" ng-click=\"renameFILE()\">Rename</button>\n" +
    "                            </div>  \n" +
    "                        </div>              \n" +
    "                    </div>\n" +
    "                </form>\n" +
    "                \n" +
    "            </div>\n" +
    "            <div class=\"modal-footer\">\n" +
    "                <span class=\"updLoadingFileExist ng-hide\" ng-show=\"modalLoading\"></span>\n" +
    "                <button class=\"btn btn-primary\" ng-click=\"overwriteOK()\">Overwrite</button>\n" +
    "                <button class=\"btn btn-warning\" ng-click=\"overwriteCANCEL()\">CANCEL</button>\n" +
    "            </div>\n" +
    "        </script>\n" +
    "        <iframe id=\"{{frameTarget}}\" class=\"uploadIframe\" name=\"{{frameTarget}}\" src=\"about:blank\" newframe-onload=\"iframeLoadedCallBack(this)\" style=\"display: hidden\" height=\"0\" width=\"0\" frameborder=\"0\"></iframe>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("ct-app/employees/view-employee.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/employees/view-employee.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">Employee Detail</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <tabset class=\"tab-container\">\n" +
    "        <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon glyphicon-info-sign\"></i> General\n" +
    "            </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Employee Name\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.last_name}}, {{employee.first_name}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Username\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.username}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr class=\"hide\">\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Email\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.email}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Access Code\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.access_code}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Employee Zone\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "\n" +
    "                            <span ng-bind-html=\"employee.zone_detail | parseToJson:0:'zone'\"></span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Language\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            <span ng-bind-html=\"employee.language | parseToJson:0:'language'\"></span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Employee Level\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\" ng-bind-html=\"employee.is_supervisor | checklevel\">\n" +
    "                            {{employee.is_supervisor | checklevel}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Agency Emp. ID\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\" >\n" +
    "                            {{employee.agency_empid}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Current Status\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\" ng-bind-html=\"employee.status | checkstatus\">\n" +
    "                            {{employee.status | checkstatus}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Clock OUT Safeguard\n" +
    "                        </th>\n" +
    "                       \n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.clock_out_safe_hour}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon glyphicon-user\"></i> Personal\n" +
    "            </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Addresss\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.primary_address1}} {{employee.primary_address2}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Zip / City / State\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.primary_zip}} {{employee.primary_city}} {{employee.primary_state}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            View on Google map\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            <a ng-href=\"{{employee.map_url}}\" class=\"btn btn-sm btn-info\" target=\"_blank\">Click here to View</a>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Time Zone\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.primary_timezone}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th>\n" +
    "                            Work Phone\n" +
    "                        </th>\n" +
    "                        <td>\n" +
    "                            <span ng-if=\"employee.primary_phone && employee.primary_county=='United States'\"> {{employee.primary_phone | phoneFormat}}  </span>\n" +
    "                            <span ng-if=\"employee.primary_phone && employee.primary_county!='United States'\"> {{employee.primary_phone}}  </span> <span ng-if=\"!employee.primary_phone\">-</span>\n" +
    "                        </td>\n" +
    "                        <th>\n" +
    "                            Others\n" +
    "                        </th>\n" +
    "                        <td ng-bind-html=\"employee.secondary_phone |  SecPhoneParseToJson\">\n" +
    "                            <span ng-if=\"employee.secondary_phone\">{{employee.secondary_phone |  SecPhoneParseToJson}}</span><span ng-if=\"!employee.secondary_phone\">-</span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                   \n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Pay Class\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.pay_class | payclass }}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <th>\n" +
    "                            Hire Date\n" +
    "                        </th>\n" +
    "                        <td>\n" +
    "                            {{employee.hire_date | onlydate}}\n" +
    "                        </td>\n" +
    "                        <th>\n" +
    "                            Birth Date\n" +
    "                        </th>\n" +
    "                        <td>\n" +
    "                            {{employee.birth_date | onlydate}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon  glyphicon-plus\"></i> Advanced\n" +
    "            </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\" class=\"col-sm-4\">\n" +
    "                            Notes\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{employee.notes}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            External code\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            <span ng-bind-html=\"employee.external_code | parseToJson:0:'externalCode'\"></span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Preferred Method of Communication\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "\n" +
    "                            <span ng-bind-html=\"employee.preferred_communication | parseToJson:0:'preferCommunication'\"></span>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                     <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Track Location\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            <span ng-bind-html=\"employee.track_location | yesOrNo\"></span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "\n" +
    "                </table>\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "\n" +
    "       <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon  glyphicon-plus\"></i> Certification\n" +
    "            </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\" ng-repeat=\"certificate in employee.certificates\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\" class=\"col-sm-4\">\n" +
    "                            Certificate Name\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{certificate.name}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Certificate Date\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{certificate.ctdate | onlydate }}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Renewal Date\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{certificate.renewaldate | onlydate}}\n" +
    "\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Uploaded certificate\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            <span ng-repeat=\"item in certificate.files\">\n" +
    "	                	 {{item.name}} \n" +
    "	                	 </span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Notes\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{certificate.notes }}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </table>\n" +
    "            </div>\n" +
    "        </tab> <!---->\n" +
    "    </tabset>\n" +
    "\n" +
    "\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-default btn-rounded\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button class=\"btn btn-primary btn-rounded\" ng-click=\"ok()\">Edit</button>\n" +
    "    </div>");
}]);

angular.module("ct-app/jobs/add-update-job.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/jobs/add-update-job.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} {{labels.Jobs }}</h1>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"wrapper-md\">\n" +
    "\n" +
    "        <div>\n" +
    "\n" +
    "            <tabset class=\"tab-container\">\n" +
    "\n" +
    "                <tab heading=\"Basic Setup\" active=\"jobSteps.basic\" select=\"jobSteps.percent=20\">\n" +
    "\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Enter the basic details about the Job. <em class=\"text-danger\">Required fields are in Red</em> </p>\n" +
    "\n" +
    "                    <progressbar value=\"jobSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "\n" +
    "                    <form name=\"basic\" class=\"form-validation form-horizontal\" rc-submit=\"jobManage('basic')\" novalidate>\n" +
    "\n" +
    "                        <div class=\"form-group\" ng-class=\"{'has-error': rc.basic.needsAttention(basic.job_name)}\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label text-danger\"> Job Name</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "\n" +
    "                                <input type=\"text\" class=\"form-control\" capitalize name=\"job_name\" required=\"\" placeholder=\"Job Name\" ng-pattern=\"/^[a-zA-Z\\d\\s\\-\\':]*$/\"  ng-blur=\"checkJobName()\" ng-model=\"job.job_name\">\n" +
    "                                <span class=\"help-block\" ng-show=\"basic.job_name.$error.required\n" +
    "                                && rc.basic.needsAttention(basic.job_name)\">Job Name is required.</span>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"form-group\" ng-class=\"{'has-error': rc.basic.needsAttention(basic.job_zone)}\">\n" +
    "                            <label class=\"col-sm-2 control-label text-danger\">Job Zone</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div>\n" +
    "                                    <input class=\"w-md\" ui-select2=\"selectZone\" value=\"\" placeholder=\"Enter Zone\" name=\"job_zone\" required=\"\"  ng-model=\"job.job_zone\">\n" +
    "                                     <span class=\"help-block\" ng-show=\"basic.job_zone.$error.required\n" +
    "                                && rc.basic.needsAttention(basic.job_zone)\">Job Zone is required.</span>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">Contact Name</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "\n" +
    "                                <input type=\"text\" class=\"form-control\" capitalize ng-model=\"job.contact_name\" placeholder=\"Contact Name\">\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        \n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Employee Charting </label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"employee_chart\" value=\"1\" ng-model=\"job.employee_chart\"><i></i> Yes\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"employee_chart\" value=\"0\" ng-model=\"job.employee_chart\"><i></i> No\n" +
    "                                </label>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Scheduled Visits Only </label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"job.visitonly\"><i></i> Yes\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"job.visitonly\"><i></i> No\n" +
    "                                </label>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"b\" value=\"1\" ng-model=\"job.status\"><i></i> Active\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"b\" value=\"0\" ng-model=\"job.status\"><i></i> Inactive\n" +
    "                                </label>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "\n" +
    "                                <button type=\"submit\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "\n" +
    "                                <button type=\"button\" class=\"btn btn-primary btn-rounded\" ng-disabled=\"savedisable == 1\" ng-click=\"jobManage('basic', false)\">Save changes</button>\n" +
    "\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "\n" +
    "                                    {{ErrorMsg}}\n" +
    "\n" +
    "                                 </span>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-show=\"job_id\" class=\"btn btn-default btn-rounded\" ng-click='deleteJob(job.job_code)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelJob()'>Cancel</button>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\" ng-show=\"job_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Job: <em class=\"ng-binding\">{{job.job_name}} ({{job.job_code}}) </em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{job.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{job.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"job.editedOn\">\n" +
    "                                        Edited by: {{job.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{job.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                    <p><span ng-show=\"job.last_clockedin\" >Last Clocked In :<em class=\"ng-binding\"> {{job.last_clockedin}}</em></span><span ng-show=\"job.last_scheduled\" >  Last Scheduled On : <em class=\"ng-binding\">{{job.last_scheduled}}</em></span>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                    </form>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <tab heading=\"Location\" disabled=\"basic.$invalid\" active=\"jobSteps.location\" select=\"jobSteps.percent=40\">\n" +
    "\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Add address/location details. We use Google Map to validate the address. </p>\n" +
    "\n" +
    "                    <progressbar value=\"jobSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "\n" +
    "                    <form name=\"location\" class=\"form-validation form-horizontal location\" rc-submit=\"jobManage('location')\" novalidate>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Address Line</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <input type=\"text\" id=\"Autocomplete2\" capitalize class=\"form-control\" placeholder=\"Enter Address line\" ng-model=\"job.job_address1\" ng-autocomplete options=\"options\" details=\"details\" ng-keypress=\"preventNext($event)\">\n" +
    "                                 <em class=\"help-block m-b-none text-muted\">Google Map will validate the address as you type it.</em>\n" +
    "                            </div>\n" +
    "                            <div class=\"line\"></div>\n" +
    "                            <label class=\"col-sm-2 control-label\">Address Line 2</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <input type=\"text\" class=\"form-control\" capitalize placeholder=\"Address line 2 (optional)\" ng-model=\"job.job_address2\">\n" +
    "                            </div>\n" +
    "                            <div class=\"line\"></div>\n" +
    "                            <label class=\"col-sm-2 control-label\">Zip/County/City/State</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div class=\"row\">\n" +
    "                                    <div class=\"col-md-3\">\n" +
    "                                        <input type=\"text\" class=\"form-control\" placeholder=\"ZIP\" ng-model=\"job.zip\" ng-pattern=\"/^[0-9]+$/\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-3\">\n" +
    "                                        <input type=\"text\" class=\"form-control\" capitalize placeholder=\"County\" ng-model=\"job.county\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-4\">\n" +
    "                                        <input type=\"text\" class=\"form-control\" capitalize placeholder=\"City\" ng-model=\"job.city\">\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-md-2\">\n" +
    "                                        <input type=\"text\" class=\"form-control\" capitalize placeholder=\"State\" ng-model=\"job.state\">\n" +
    "                                    </div>\n" +
    "\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"row\" ng-show=\"showZipError\">\n" +
    "                                    <div class=\"line\"></div>\n" +
    "                                    <div class=\"col-sm-12\">\n" +
    "                                        <div role=\"alert\" class=\"alert ng-isolate-scope alert-warning alert-dismissable\" type=\"warning\">\n" +
    "                                            <div><span class=\"ng-binding ng-scope\">No match found, but continue adding the data</span>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                            <div class=\"line\"></div>\n" +
    "                            <label class=\"col-sm-2 control-label\">Country</label>\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <input type=\"text\" class=\"form-control\" capitalize name=\"country\" required=\"\" placeholder=\"Country\" readonly=\"\" ng-model=\"job.country\">\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-6\">\n" +
    "                                <a ng-click=\"mapView(job)\"  target=\"_blank\" ng-disabled=\"job.job_address1==''\">Click here to View Map in Google</a>\n" +
    "                            </div>\n" +
    "                            <div class=\"line\"></div>\n" +
    "                            <div ng-class=\"{'has-error': rc.location.needsAttention(location.timezone)}\">\n" +
    "                            <label class=\"col-sm-2 control-label text-danger\">Time Zone</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                    <input type=\"text\" readonly capitalize name=\"timezone\" required=\"\" ng-model=\"job.timezone\" placeholder=\"Time Zone\" class=\"form-control\">\n" +
    "                                    <em class=\"help-block m-b-none text-muted\">The Time Zone is required for Schedules/Shifts and IVR. </em>\n" +
    "                                     <span class=\"help-block\" ng-show=\"location.timezone.$error.required\n" +
    "                                && rc.location.needsAttention(location.timezone)\">Time Zone is required.</span>\n" +
    "                                \n" +
    "                            </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Authorized Phone </label>\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <div class=\"row m-b\" ng-repeat=\"authorized in job.workphones\">\n" +
    "                                    <div class=\"col-sm-8 padding-r-none\">\n" +
    "                                        <input type=\"text\" class=\"form-control\"  ng-if=\"job.country=='United States'\" ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"false\" ng-model=\"authorized.phone\" />\n" +
    "                                         <input type=\"text\" class=\"form-control\"  ng-if=\"job.country!='United States'\" ng-pattern=\"/^[0-9]+$/\" ng-model=\"authorized.phone\" />\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"col-sm-4\">\n" +
    "                                        <span ><a href=\"\" class=\"btn btn-rounded btn-sm btn-icon btn-primary\" ng-click=\"removeAuthorizedPhone($index)\"><i class=\"fa fa-trash-o\"></i></a></span>\n" +
    "                                        <span ng-show=\"$index > job.workphones.addshow && $index < job.workphonesMax-1\"><a href=\"\" class=\"btn btn-rounded btn-sm btn-icon btn-primary\" ng-click=\"addAuthorizedPhone($index)\"><i class=\"fa fa-plus\"></i></a></span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click=\"jobManagePrev('location')\">Prev</button>\n" +
    "                                <button type=\"submit\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "                                <button type=\"button\" class=\"btn btn-primary btn-rounded\" ng-click=\"jobManage('location', false)\" ng-disabled=\"savedisable == 1\">Save changes</button>\n" +
    "\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                     {{ErrorMsg}}\n" +
    "                                </span>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                     <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-show=\"job_id\" class=\"btn btn-default btn-rounded\" ng-click='deleteJob(job.job_code)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelJob()'>Cancel</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\" ng-show=\"job_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Job: <em class=\"ng-binding\">{{job.job_name}} ({{job.job_code}}) </em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{job.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{job.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"job.editedOn\">\n" +
    "                                        Edited by: {{job.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{job.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                    </form>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "\n" +
    "                <tab heading=\"Advanced\" disabled=\"basic.$invalid\" active=\"jobSteps.advanced\" select=\"jobSteps.percent=60\">\n" +
    "\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Add advanced details ablut this Job.</p>\n" +
    "\n" +
    "                    <progressbar value=\"jobSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "\n" +
    "                    <form name=\"advanced\" class=\"form-validation form-horizontal advanced\" ng-submit=\"jobManage('advanced')\" novalidate>\n" +
    "\n" +
    "                    \n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">External Code 1</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "\n" +
    "                                <input type=\"text\" capitalize class=\"form-control\" ng-model=\"job.external_code.code1\" placeholder=\"Extenal Code 1\">\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">External Code 2</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "\n" +
    "                                <input type=\"text\" class=\"form-control\" capitalize ng-model=\"job.external_code.code2\" placeholder=\"Extenal Code 2\">\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">External Code 3</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "\n" +
    "                                <input type=\"text\" class=\"form-control\" capitalize ng-model=\"job.external_code.code3\" placeholder=\"Extenal Code 3\">\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">Service Item</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div>\n" +
    "                                    <input class=\"w-md\" ui-select2=\"selectServiceItem\" value=\"\" placeholder=\"Service Item\" ng-model=\"job.service_item\">\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">Pay Type</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div>\n" +
    "                                    <input class=\"w-md\" ui-select2=\"selectPayType\" value=\"\" placeholder=\"Pay Type\" ng-model=\"job.pay_type\">\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Late Clock-in Notification</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"job.late_notify\"><i></i> Yes\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"job.late_notify\"><i></i> No\n" +
    "                                </label>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                         <div class=\"form-group\">\n" +
    "                            \n" +
    "                                <label class=\"col-sm-2 control-label\">Job Group</label>\n" +
    "                                <div class=\"col-sm-4\">\n" +
    "                                    <input type=\"text\" class=\"form-control w-md\"  placeholder=\"Job Group\" ng-pattern=\"/^[0-9]+$/\" ng-model=\"job.jobgroup\" ng-change=\"checkjobgroup()\" ng-minlength=\"jobcode_length\">\n" +
    "                                   \n" +
    "                                </div>\n" +
    "                                <div class=\"col-sm-6\">\n" +
    "                                     <span>{{job.jobDes_Name}}</span>\n" +
    "                                </div>\n" +
    "                            \n" +
    "                            <!--<div class=\"col-sm-6\">\n" +
    "                                <label class=\"col-sm-2 control-label\">Job Description</label>\n" +
    "                                <div class=\"col-sm-10\">\n" +
    "                                    <div>\n" +
    "                                        <input type=\"text\" class=\"form-control w-md\"  ng-model=\"employee.jobDes_Name\">\n" +
    "\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div> -->\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "                                <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click=\"jobManagePrev('advanced')\" ng-disabled=\"savedisable == 1\">Prev</button>\n" +
    "                                <button type=\"submit\" class=\"btn btn-default btn-rounded\" ng-disabled=\"savedisable == 1\">Next</button>\n" +
    "\n" +
    "                                <button type=\"button\" class=\"btn btn-primary btn-rounded\" ng-disabled=\"savedisable == 1\" ng-click=\"jobManage('advanced', false)\">Save changes</button>\n" +
    "\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                     {{ErrorMsg}}\n" +
    "                                 </span>\n" +
    "                            </div>\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-show=\"job_id\" class=\"btn btn-default btn-rounded\" ng-click='deleteJob(job.job_code)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelJob()'>Cancel</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"form-group\" ng-show=\"job_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Job: <em class=\"ng-binding\">{{job.job_name}} ({{job.job_code}}) </em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{job.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{job.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"job.editedOn\">\n" +
    "                                        Edited by: {{job.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{job.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "\n" +
    "                <tab heading=\"Notes\" disabled=\"basic.$invalid\" active=\"jobSteps.notes\" select=\"jobSteps.percent=75\">\n" +
    "\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Add a note. This is optional.</p>\n" +
    "\n" +
    "                    <progressbar value=\"jobSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "\n" +
    "                    <form name=\"notes\" class=\"form-validation form-horizontal notes\" ng-submit=\"jobManage('notes')\" novalidate>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">Notes</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "\n" +
    "                                <textarea rows=\"4\" capitalize ng-model=\"job.job_notes\" cols=\"50\"></textarea>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click=\"jobManagePrev('notes')\">Prev</button>\n" +
    "\n" +
    "                                <button type=\"submit\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "                                <button type=\"button\" ng-click=\"jobManage('notes', false)\" class=\"btn btn-primary btn-rounded\" ng-disabled=\"savedisable == 1\">Save changes</button>\n" +
    "\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "\n" +
    "                                    {{ErrorMsg}}\n" +
    "\n" +
    "                                </span>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                     <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-show=\"job_id\" class=\"btn btn-default btn-rounded\" ng-click='deleteJob(job.job_code)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelJob()'>Cancel</button>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\" ng-show=\"job_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Job: <em class=\"ng-binding\">{{job.job_name}} ({{job.job_code}}) </em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{job.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{job.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"job.editedOn\">\n" +
    "                                        Edited by: {{job.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{job.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Activity Code\" disabled=\"basic.$invalid\" active=\"jobSteps.activityCode\" select=\"jobSteps.percent=75\">\n" +
    "\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Add Activity Code.</p>\n" +
    "\n" +
    "                    <progressbar value=\"jobSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "\n" +
    "                    <form name=\"activityCode\" class=\"form-validation form-horizontal activityCode\" ng-submit=\"jobManage('activityCode')\" novalidate>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">Select Activity</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                 <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"activity\" value=0 ng-model=\"job.activity\"><i></i> None\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"activity\" value=1 ng-model=\"job.activity\"><i></i> Default Activity\n" +
    "                                </label>\n" +
    "                                 <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"activity\" value=2 ng-model=\"job.activity\"><i></i> Prompt for code \n" +
    "                                </label>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "                         <div class=\"form-group\" ng-if=\"job.activity==1\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">Default Activity</label>\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <input class=\"w-md\"  name=\"activityDetail\" ui-select2=\"selectActivity\" value=\"\"  ng-model=\"job.activityDetail\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click=\"jobManagePrev('notes')\">Prev</button>\n" +
    "\n" +
    "                                <button type=\"submit\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "                                <button type=\"button\" ng-click=\"jobManage('notes', false)\" class=\"btn btn-primary btn-rounded\" ng-disabled=\"savedisable == 1\">Save changes</button>\n" +
    "\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "\n" +
    "                                    {{ErrorMsg}}\n" +
    "\n" +
    "                                </span>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                     <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-show=\"job_id\" class=\"btn btn-default btn-rounded\" ng-click='deleteJob(job.job_code)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelJob()'>Cancel</button>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\" ng-show=\"job_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Job: <em class=\"ng-binding\">{{job.job_name}} ({{job.job_code}}) </em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{job.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{job.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"job.editedOn\">\n" +
    "                                        Edited by: {{job.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{job.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "\n" +
    "                </tab>\n" +
    "                <tab heading=\"Custom Prompts\" disabled=\"basic.$invalid\" active=\"jobSteps.customPrompt\" select=\"jobSteps.percent=85\">\n" +
    "\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> If custom Prompts are required for this Job,select one or more prompts. The Order the Prompts are,will be the order the IVR will use.</p>\n" +
    "\n" +
    "                    <progressbar value=\"jobSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "\n" +
    "                    <form name=\"notes\" class=\"form-validation form-horizontal location\" ng-submit=\"jobManage('customPrompt')\" novalidate>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">When?</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"a\" value=1 ng-model=\"job.logtype\"><i></i> During Clock-in\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" name=\"a\" value=2 ng-model=\"job.logtype\"><i></i> During Clock-out\n" +
    "                                </label>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <label class=\"col-sm-2 control-label\">Add Prompts</label>\n" +
    "\n" +
    "                            <div class=\"col-sm-10\">\n" +
    "                                <div class=\"row m-b\" ng-repeat=\"custom_prompt in job.customPrompt\">\n" +
    "                                    <div class=\"col-sm-4 padding-r-none\">\n" +
    "                                        <div>\n" +
    "                                            \n" +
    "                                            <ui-select ng-model=\"custom_prompt.prompt\" theme=\"select2\" class=\"col-md-12 padlr0\">\n" +
    "                                        <ui-select-match placeholder=\"Select Prompt\">\n" +
    "                                            {{$select.selected.text}}\n" +
    "                                        </ui-select-match>\n" +
    "                                            <ui-select-choices repeat=\"prompt in prompts track by $index\" refresh=\"refreshSelectPrompt($select.search)\" refresh-delay=\"0\">\n" +
    "                                            <div ng-bind-html=\"prompt.text\"></div>\n" +
    "                                        </ui-select-choices>\n" +
    "                                        </ui-select>\n" +
    "\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-sm-2\">\n" +
    "                                        <span ><a href=\"\" class=\"btn btn-rounded btn-sm btn-icon btn-primary\" ng-click=\"removeprompt($index)\"><i class=\"fa fa-trash-o\"></i></a></span>\n" +
    "                                        <span ng-show=\"$index > job.customPrompt.addshow && $index < job.customPromptMax-1\"><a href=\"\" class=\"btn btn-rounded btn-sm btn-icon btn-primary\" ng-click=\"addprompt($index)\"><i class=\"fa fa-plus\"></i></a></span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "\n" +
    "                                <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click=\"jobManagePrev('customPrompt')\">Prev</button>\n" +
    "\n" +
    "                                <button type=\"submit\"  class=\"btn btn-primary btn-rounded\" ng-disabled=\"savedisable == 1\">Save changes</button>\n" +
    "\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "\n" +
    "                                    {{ErrorMsg}}\n" +
    "\n" +
    "                                 </span>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"pull-right\">\n" +
    "                                     <button type=\"button\" ng-disabled=\"savedisable == 1\" ng-show=\"job_id\" class=\"btn btn-default btn-rounded\" ng-click='deleteJob(job.job_code)'>Delete</button>\n" +
    "                                    <button type=\"button\" ng-disabled=\"savedisable == 1\" class=\"btn btn-default btn-rounded\" ng-click='cancelJob()'>Cancel</button>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"form-group\" ng-show=\"job_id\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <div class=\"alert alert-info\">\n" +
    "                                    <p>Job: <em class=\"ng-binding\">{{job.job_name}} ({{job.job_code}}) </em>\n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{job.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{job.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"job.editedOn\">\n" +
    "                                        Edited by: {{job.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{job.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </form>\n" +
    "\n" +
    "                </tab>\n" +
    "\n" +
    "                <tab heading=\" Authorization History\" disabled=\"basic.$invalid\" active=\"jobSteps.authorizations\" select=\"jobSteps.percent=100\">\n" +
    "\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Authorizations received for this Job/ Patient</p>\n" +
    "\n" +
    "                    <progressbar value=\"jobSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "\n" +
    "\n" +
    "                    <div class=\"table-responsive\" style=\"max-height: 350px; overflow-y: scroll;\">\n" +
    "                        <table class=\"table table-striped b-t b-light\">\n" +
    "                            <thead>\n" +
    "                                <tr>\n" +
    "                                    <th class=\"sortable id\"> IDs </i>\n" +
    "                                    </th>\n" +
    "\n" +
    "                                    <th class=\"sortable payor\">Payor </i>\n" +
    "                                    </th>\n" +
    "                                    <th class=\"sortable skill\">Skill </i>\n" +
    "                                    </th>\n" +
    "                                    <th class=\"sortable acitivity\">Activity </i>\n" +
    "                                    </th>\n" +
    "\n" +
    "                                    <th class=\"sortable authorization_start_date\">Date </i>\n" +
    "                                    </th>\n" +
    "                                    <th class=\"sortable hours\">Total Authorized Hours </i>\n" +
    "                                    </th>\n" +
    "                                    <th class=\"sortable status\">Status </i>\n" +
    "                                    </th>\n" +
    "\n" +
    "                                </tr>\n" +
    "                            </thead>\n" +
    "                            <tbody>\n" +
    "                                <tr ng-repeat=\"detail in authorizations\">\n" +
    "\n" +
    "                                    <td>{{detail.id}}</td>\n" +
    "                                    <td>{{detail.payor_detail | parseToJson:0:'text' }}</td>\n" +
    "                                    <td>{{detail.skill_detail |  parseToJson:0:'text'}}</td>\n" +
    "                                    <td>{{detail.acitivity_detail |  parseToJson:0:'text' }}</td>\n" +
    "                                    <td>{{detail.authorization_start_date |onlydate }} &nbsp; - &nbsp; {{detail.authorization_end_date |onlydate }}</td>\n" +
    "                                    <td>{{detail.total_hours}}</td>\n" +
    "                                    <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                                </tr>\n" +
    "                                <tr ng-if=\"authorizations.length==0\">\n" +
    "                                    <td colspan='7' class=\"alert alert-danger\">\n" +
    "                                        <center> No Records Found.</center>\n" +
    "                                    </td>\n" +
    "                                </tr>\n" +
    "\n" +
    "\n" +
    "\n" +
    "                            </tbody>\n" +
    "                        </table>\n" +
    "                    </div>\n" +
    "\n" +
    "                </tab> \n" +
    "\n" +
    "\n" +
    "            </tabset>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/jobs/job-dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/jobs/job-dashboard.tpl.html",
    "<div class=\"hbox hbox-auto-xs hbox-auto-sm\">\n" +
    "    <!-- main -->\n" +
    "    <div class=\"col\">\n" +
    "        <!-- main header -->\n" +
    "        <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-6 col-xs-12\">\n" +
    "                    <h1 class=\"m-n font-thin h3 text-black\">Job Dashboard - {{jobName}}</h1>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-6 text-right hidden-xs\">\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- / main header -->\n" +
    "        <div class=\"wrapper-md\">\n" +
    "            <!-- stats -->\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12 bg-light lter  wrapper-md\">                   \n" +
    "                    <div >\n" +
    "                        <h1 class=\"m-n font-thin h3\">DASHBOARD AS OF {{startDateonly}} - {{lastDateonly}} </h1>\n" +
    "                    </div>                    \n" +
    "                    <div class=\"pull-right\">\n" +
    "\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateDetails()\">REFRESH</button>\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getdetails(1)\">-1 Week</button>\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getdetails(2)\">-2 Week</button>\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getdetails(month)\">This month</button>\n" +
    "\n" +
    "                    </div>\n" +
    "                \n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"row row-sm text-center\">\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"panel padder-v bg-default item\">\n" +
    "                                <div class=\"h1 text-primary font-thin h1\">\n" +
    "                                    <div class=\"spinner\" ng-show=\"loading\"></div>{{jobShiftCount}}</div>\n" +
    "                                <span class=\"text-muted text-xs\">Total Scheduled Visits(SHIFTS)</span>\n" +
    "                                <div class=\"top text-right\">\n" +
    "                                    <i class=\"fa fa-medkit text-muted m-r-sm\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"panel padder-v bg-default item\">\n" +
    "                                <div class=\"h1 text-primary font-thin h1\">{{totalClockin}}</div>\n" +
    "                                <span class=\"text-muted text-xs\">Total Clock-IN</span>\n" +
    "                                <div class=\"top text-right\">\n" +
    "                                    <i class=\"fa fa-medkit text-muted m-r-sm\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <a href class=\"block panel padder-v bg-default item\">\n" +
    "                                <span class=\"text-primary font-thin h1 block\">{{totalClockout}}</span>\n" +
    "                                <span class=\"text-muted text-xs\">Total Clock-OUT</span>\n" +
    "                                <span class=\"top text-right\">\n" +
    "                                 <i class=\"fa fa-medkit text-muted m-r-sm\"></i>\n" +
    "                                </span>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <a href class=\"block panel padder-v bg-default item\">\n" +
    "                                <span class=\"text-success font-thin h1 block\">{{totalOnClockin}}</span>\n" +
    "                                <span class=\"text-success text-xs\">ON-TIME CLOCK IN</span>\n" +
    "                                <span class=\"top text-right\">\n" +
    "                  <i class=\"fa fa-users text-muted m-r-sm\"></i>\n" +
    "                </span>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <a href class=\"block panel padder-v bg-default item\">\n" +
    "                                <span class=\"text-warning font-thin h1 block\">{{totalLateClockin}}</span>\n" +
    "                                <span class=\"text-warning text-xs\">LATE CLOCK IN</span>\n" +
    "                                <span class=\"top text-right\">\n" +
    "                  <i class=\"fa fa-users text-muted m-r-sm\"></i>\n" +
    "                </span>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"panel padder-v bg-default item\">\n" +
    "                                <div class=\"text-danger font-thin h1\">{{totalNotClockin}}</div>\n" +
    "                                <span class=\"text-danger text-xs\">NOT CLOCK IN</span>\n" +
    "                                <div class=\"top text-right\">\n" +
    "                                    <i class=\"fa fa-users text-muted m-r-sm\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                    <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <wj-flex-chart class=\"custom-flex-chart\" items-source=\"Chartdetails\" binding-x=\"date_time\" chart-type=\"SplineSymbols\">\n" +
    "                        <wj-flex-chart-axis wj-property=\"axisX\" axis-line=\"true\" major-grid=\"true\" label-Angle=\"45\">\n" +
    "                        </wj-flex-chart-axis>\n" +
    "                        <wj-flex-chart-axis wj-property=\"axisY\" axis-line=\"false\" major-grid=\"true\">\n" +
    "                        </wj-flex-chart-axis>\n" +
    "                        <wj-flex-chart-series name=\"Clock In\" binding=\"clockin\"></wj-flex-chart-series>\n" +
    "                        <wj-flex-chart-series name=\"Clock Out\" binding=\"clockout\"></wj-flex-chart-series>\n" +
    "\n" +
    "                        <wj-flex-chart-legend position=\"Bottom\"></wj-flex-chart-legend>\n" +
    "                    </wj-flex-chart>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <wj-flex-grid items-source=\"calllogListDetail\">\n" +
    "                        <wj-flex-grid-column header=\"Employee \" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                        <!--<wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column >-->\n" +
    "                        <wj-flex-grid-column header=\"Log Type\" is-read-only=\"true\" binding=\"log_type\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Work Duration\" is-read-only=\"true\" binding=\"call_duriation\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Time Stamp\" is-read-only=\"true\" binding=\"timestamp\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Call Status\" is-read-only=\"true\" binding=\"call_status\"> </wj-flex-grid-column>\n" +
    "                    </wj-flex-grid>\n" +
    "                    <div class=\"row wrapper\">\n" +
    "                        <wj-menu value=\"calllogListDetail.pageSize\" header=\"Rows per Page\">\n" +
    "                            <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                            <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                            <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                            <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                        </wj-menu>\n" +
    "                        <div class=\"btn-group col-md-8\" ng-show=\"calllogListDetail.pageSize > 0\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{calllogListDetail.pageIndex+1}} / {{calllogListDetail.pageCount}} </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "  \n" +
    "</div>");
}]);

angular.module("ct-app/jobs/jobs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/jobs/jobs.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">{{labels.Jobs }} List <span class=\"pull-right\"><a ui-sref=\"ctApp.addUpdateJob\" class=\"btn btn-sm btn-info\" type=\"button\">Add {{labels.Jobs }}</a>&nbsp;<a ui-sref=\"ctApp.jobList\" class=\"btn btn-sm btn-info\" type=\"button\">JOB LIST</a></span></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                    <div  class=\"form-control \" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"config.general.zone\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"input-group col-sm-12\">\n" +
    "\n" +
    "                    <ui-select ng-change=\"updateTableData()\" ng-model=\"config.general.filterStatus\" theme=\"select2\" style=\"min-width: 225px;\">\n" +
    "                        <ui-select-match placeholder=\"Status for search\">{{$select.selected.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"item in statusSearchOption\">\n" +
    "                            <div ng-bind-html=\"item.name\"></div>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "                </div>\n" +
    "             \n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"input-group col-sm-12\">\n" +
    "\n" +
    "                     <ui-select ng-model=\"config.general.filterDBField\" theme=\"select2\" style=\"min-width: 225px;\">\n" +
    "                        <ui-select-match placeholder=\"Optional filter for search\">{{$select.selected.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"item in jobSearchOption\">\n" +
    "                            <div ng-bind-html=\"item.name\"></div>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "                </div>\n" +
    "                \n" +
    "                \n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" capitalize ui-keypress=\"{13:'updateTableData(true)'}\">\n" +
    "            </div>\n" +
    "           \n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                    <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                    <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered word-break\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"job_code\" class=\"sort-item asc\" style=\"width:20%;\">Job Code &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"job_name\" class=\"sort-item\">Job Name &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"job_zone\" class=\"sort-item\">Zone &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th >Authorized Phone &nbsp; </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in jobDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.job_code }}</td>\n" +
    "                        <td> <span ng-bind-html=\"detail.last_clocked_in_date | iconColor\">{{detail.last_clocked_in_date  | iconColor}}</span> &nbsp;   <span ng-bind-html=\"detail.last_scheduled_date | calenderIconColor\">{{detail.last_scheduled_date  | iconColor}}</span> &nbsp; {{detail.job_name  }}</td>\n" +
    "                        <td>{{detail.job_zone_detail |  parseToJson:0:'zone' }}</td>\n" +
    "                        <td ng-if=\"empCountry=='' || empCountry=='United States'\">{{detail.authorized_phone_format }}</td>\n" +
    "                        <td ng-if=\"empCountry!='' && empCountry!='United States'\">{{detail.work_phone_format}}</td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button  ng-click=\"enableView(detail.job_code)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-eye\"></i></button>\n" +
    "\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <!--<button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i> \n" +
    "                            </button>-->\n" +
    "                            <button ng-click=\"enableDashboard(detail.job_code)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-dashboard\"></i>\n" +
    "                            </button> \n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_jobs_loader\">\n" +
    "                        <td colspan=\"7\">\n" +
    "                            <div show-loader=\"config.show_jobs_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_jobs_loader && jobDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/jobs/mapDetailView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/jobs/mapDetailView.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">{{title}}, {{county}}, {{job_state}}</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "<!-- <div ng-bind-html=\"trustedHtml\"></div> -->\n" +
    "\n" +
    "<iframe id=\"jobMapId\" width=\"567\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" ng-src=\"{{currentProjectUrl}}\" mozbrowser remote></iframe> \n" +
    "\n" +
    "</div>\n" +
    "    	      \n" +
    "    	     \n" +
    "<div class=\"modal-footer\">              \n" +
    "   <a ng-href=\"{{fullMapUrl}}\" class=\"btn btn-sm btn-info\" target=\"_blank\">VIEW IN GOOGLE MAP</a>\n" +
    "    <button class=\"btn btn-default\" ng-click=\"cancel()\">CANCEL</button>\n" +
    "</div>");
}]);

angular.module("ct-app/jobs/view-job.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/jobs/view-job.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">Job Detail</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" >\n" +
    " <tabset class=\"tab-container\">\n" +
    "        <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon glyphicon-info-sign\"></i> Basic Setup\n" +
    "            </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Job Name\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.job_name}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Job Code\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.job_code}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Job Zone\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.job_zone_detail | parseToJson:0:'zone'}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Contact Name\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.contact_name}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Authorized Phone\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.authorized_phone_format}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <th colspan=\"2\">\n" +
    "                        Scheduled Visits Only\n" +
    "                    </th>\n" +
    "                    <td colspan=\"2\">\n" +
    "                        {{job.visitonly | visitonly }}\n" +
    "                    </td>\n" +
    "\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Status\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\" ng-bind-html=\"job.status | checkstatus\">\n" +
    "                            {{job.status | checkstatus}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </table>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "      <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon glyphicon-user\"></i> Location\n" +
    "            </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Address Line\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.job_address1}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Address Line 2\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.job_address2}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Zip / County / City / State\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.job_zip}} {{job.job_county}} {{job.job_city}} {{job.job_state}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            View on Google map\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            <a ng-href=\"{{job.map_url}}\" class=\"btn btn-sm btn-info\" target=\"_blank\">Click here to View</a>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Time Zone\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.timezone}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </table>\n" +
    "\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "         <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon  glyphicon-plus\"></i> Advanced\n" +
    "            </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            External code\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.external_code | parseToJson}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Service Item\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.service_item_detail | parseToJson:0:'text' }}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Pay Type\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.pay_type_detail | parseToJson:0:'text'}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "\n" +
    "                </table>\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "        <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon  glyphicon-plus\"></i> Notes\n" +
    "            </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Notes\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.job_notes}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </table>\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "         <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon  glyphicon-plus\"></i> Activity Code </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Select Activity\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.activity_type | activity}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            Default Activity\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.activity_detail  | parseToJson:0:'text'}}\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "\n" +
    "       <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon  glyphicon-plus\"></i> Custom Prompts\n" +
    "            </tab-heading>\n" +
    "            <div class=\"table-responsive\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <tr>\n" +
    "                        <th colspan=\"2\">\n" +
    "                            When\n" +
    "                        </th>\n" +
    "                        <td colspan=\"2\">\n" +
    "                            {{job.prompt_logtype | logtype}}\n" +
    "                        </td>\n" +
    "                        <tr>\n" +
    "                            <th colspan=\"2\">\n" +
    "                                Prompts Added\n" +
    "                            </th>\n" +
    "                            <td colspan=\"2\">\n" +
    "                                {{job.prompt_details | prompt_details}}\n" +
    "\n" +
    "\n" +
    "\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                    </tr>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "\n" +
    "         <tab>\n" +
    "            <tab-heading>\n" +
    "                <i class=\"glyphicon  glyphicon-plus\"></i> Authorization History\n" +
    "            </tab-heading>\n" +
    "            <div class=\"row wrapper\" ng-if=\"job_authorization.length==0\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div class=\"alert alert-danger\">No Record Found </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"table-responsive\" ng-if=\"job_authorization.length!=0\">\n" +
    "                <table class=\"table table-striped b-t b-light\">\n" +
    "                    <thead>\n" +
    "                        <tr>\n" +
    "                            <th class=\"sortable id\"> IDs </i>\n" +
    "                            </th>\n" +
    "\n" +
    "                            <th class=\"sortable payor\">Payor </i>\n" +
    "                            </th>\n" +
    "                            <th class=\"sortable skill\">Skill </i>\n" +
    "                            </th>\n" +
    "                            <th class=\"sortable acitivity\">Activity </i>\n" +
    "                            </th>\n" +
    "\n" +
    "                            <th class=\"sortable authorization_start_date\">Date </i>\n" +
    "                            </th>\n" +
    "\n" +
    "                            <th class=\"sortable hours\">Total Authorized Hours </i>\n" +
    "                            </th>\n" +
    "                            <th class=\"sortable status\">Status </i>\n" +
    "                            </th>\n" +
    "\n" +
    "                        </tr>\n" +
    "                    </thead>\n" +
    "\n" +
    "                    <tbody>\n" +
    "                        <tr ng-repeat=\"detail in job_authorization\">\n" +
    "\n" +
    "                            <td>{{detail.id}}</td>\n" +
    "                            <td>{{detail.payor_detail | parseToJson:0:'text'}}</td>\n" +
    "                            <td>{{detail.skill_detail | parseToJson:0:'text'}}</td>\n" +
    "                            <td>{{detail.acitivity_detail | parseToJson:0:'text' }}</td>\n" +
    "                            <td>{{detail.authorization_start_date | onlydate}} &nbsp; - &nbsp; {{detail.authorization_end_date | onlydate}}</td>\n" +
    "                            <td>{{detail.total_hours}}</td>\n" +
    "                            <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        </tr>\n" +
    "\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "        </tab>\n" +
    "    </tabset>\n" +
    "\n" +
    "\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-default btn-rounded\" ng-click=\"cancel()\">Close</button>\n" +
    "        <button class=\"btn btn-primary btn-rounded\" ng-click=\"ok()\">Edit</button>\n" +
    "    </div>\n" +
    "    </div>");
}]);

angular.module("ct-app/logs/alertLog/add-update-alertLog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/logs/alertLog/add-update-alertLog.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">Update Notes</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\">\n" +
    "\n" +
    "        <div>\n" +
    "\n" +
    "            <form name=\"addtimecard\" class=\"form-validation form-horizontal addtimecard\" rc-submit=\"saveNotes()\" novalidate>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Notes</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <textarea rows=\"4\" capitalize ng-model=\"notes\" cols=\"50\" placeholder=\"Notes\"></textarea>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save changes</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  {{ErrorMsg}}\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-sm-2\">\n" +
    "                        <div class=\"pull-right\">\n" +
    "\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click='modelclose()'>Cancel</button>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/logs/alertLog/alertLog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/logs/alertLog/alertLog.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Alert Log</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-2\">\n" +
    "\n" +
    "                <input class=\"form-control \" ui-select2=\"Selectfield\" value=\"\" placeholder=\"Select Field\" ng-model=\"logFilters.field\">\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <div class=\"form-control \"  ng-disabled=\"logFilters.field == ''\" placeholder=\"Select Zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"logFilters.zone\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "         \n" +
    "\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <div ng-if=\"logFilters.zone == '' || logFilters.zone == null || logFilters.field == '' || logFilters.field.id=='startDate' || logFilters.zone[0].id =='all' || logFilters.field == ''\"\n" +
    "                >\n" +
    "                    <input class=\"form-control \"  ui-select2=\"selectAlertType\" value=\"\" placeholder=\"Alert Type\" ng-model=\"logFilters.alertType\">\n" +
    "\n" +
    "\n" +
    "                </div>\n" +
    "                <div ng-if=\"logFilters.zone != '' && logFilters.zone != null && logFilters.field != '' &&logFilters.field.id !='startDate' && logFilters.zone[0].id !='all' && logFilters.field != ''\" >\n" +
    "                    <input class=\"form-control \"  ui-select2=\"selectValue\" value=\"\" placeholder=\"Select Value\" ng-model=\"logFilters.field_value\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"logFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"logFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"AlertLog.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                 \n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"AlertDetails\">\n" +
    "                <wj-flex-grid-column header=\"Employee Code\" is-read-only=\"true\" binding=\"empcode\" width=\"*\"> </wj-flex-grid-column>\n" +
    "               \n" +
    "                <wj-flex-grid-column header=\"Job Code\" is-read-only=\"true\" binding=\"jobcode\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Alert Type\" is-read-only=\"true\" binding=\"alert_type\"> </wj-flex-grid-column width=\"*\">\n" +
    "                <wj-flex-grid-column header=\"Date\" is-read-only=\"true\" binding=\"date_time\"> </wj-flex-grid-column>\n" +
    "                 <wj-flex-grid-column header=\"Employee Zone Code\" is-read-only=\"true\" binding=\"emp_zone\" > </wj-flex-grid-column>\n" +
    "               \n" +
    "                <wj-flex-grid-column header=\"Job Zone Code\" is-read-only=\"true\" binding=\"job_zone\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Notes\" is-read-only=\"true\" binding=\"notes\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Edit\" is-read-only=\"true\" binding=\"id\" align=\"center\">\n" +
    "                    <button type=\"button\" class=\"btn btn-rounded btn-sm btn-icon btn-default\" ng-click=\"enableEditView()\"><i class=\"fa fa-pencil\"></i>\n" +
    "                    </button>\n" +
    "                </wj-flex-grid-column>\n" +
    "               </wj-flex-grid-column>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"AlertDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"AlertDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"AlertDetails.pageIndex <= 0\" ng-click=\"AlertDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"AlertDetails.pageIndex <= 0\" ng-click=\"AlertDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{AlertDetails.pageIndex+1}} / {{AlertDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"AlertDetails.pageIndex >= AlertDetails.pageCount - 1\" ng-click=\"AlertDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"AlertDetails.pageIndex >= AlertDetails.pageCount - 1\" ng-click=\"AlertDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/logs/callLog/callLogs.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/logs/callLog/callLogs.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">LOG LIST</h1>\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-2 \">\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Job/Employee\" ui-select2=\"Selectfield\" ng-model=\"logFilters.filterName\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZoneOptions\" value=\"\" ng-model=\"logFilters.zoneName\" ng-disabled=\"logFilters.filterName.id =='all'\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Value\" ui-select2=\"getFilterValue\" ng-model=\"logFilters.filterValue\" ng-disabled=\"logFilters.filterName=='' || logFilters.zoneName=='' || logFilters.zoneName==null || logFilters.zoneName[0].id =='all' || logFilters.filterName.id=='all'\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" placeholder=\"Select Start Date\" readonly datepicker-popup=\"{{format}}\" ng-model=\"logFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" placeholder=\"Select End Date\" readonly datepicker-popup=\"{{format}}\" ng-model=\"logFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"CallLog.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                 \n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"calllogListDetail\">\n" +
    "                <wj-flex-grid-column header=\"Employee \" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Log Type\" is-read-only=\"true\" binding=\"log_type\"> </wj-flex-grid-column>\n" +
    "\n" +
    "                <wj-flex-grid-column header=\"Work Duration\" is-read-only=\"true\" binding=\"call_duriation\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Phone Number\" is-read-only=\"true\" binding=\"phone_number\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Call Status\" is-read-only=\"true\" binding=\"call_status\"> </wj-flex-grid-column>\n" +
    "\n" +
    "                <wj-flex-grid-column header=\"Created On\" is-read-only=\"true\" binding=\"created_on\"> </wj-flex-grid-column>\n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"calllogListDetail.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"calllogListDetail.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{calllogListDetail.pageIndex+1}} / {{calllogListDetail.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/logs/customPrompts/customPrompts.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/logs/customPrompts/customPrompts.tpl.html",
    "<style type=\"text/css\">\n" +
    "    svg {\n" +
    "    \n" +
    "    width: 100%;\n" +
    "}\n" +
    "</style>\n" +
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">CUSTOM PROMPT LOG</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"panel panel-default\">\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-2\">\n" +
    "\n" +
    "                <div class=\"form-control \" placeholder=\"Select Zone\" ui-select2=\"selectZoneOptions\" value=\"\" ng-model=\"logFilters.zoneName\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-2\">\n" +
    "\n" +
    "                <div>\n" +
    "\n" +
    "\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Employee\" ui-select2=\"selectEmployee\" ng-model=\"logFilters.filterValue\" ng-disabled=\"logFilters.zoneName=='' || logFilters.zoneName==null || logFilters.zoneName[0].id =='all'\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" placeholder=\"Select Start Date\"\n" +
    " readonly datepicker-popup=\"{{format}}\" ng-model=\"logFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select End Date\" datepicker-popup=\"{{format}}\" ng-model=\"logFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showerrorMsg\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <wj-flex-grid items-source=\"customPromptListDetail\" selection-mode=\"Row\">\n" +
    "\n" +
    "                    <wj-flex-grid-column header=\"Job\" width=\"*\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Clock In\" is-read-only=\"true\" binding=\"clockin\"> </wj-flex-grid-column>\n" +
    "\n" +
    "                    <wj-flex-grid-column header=\"Clock Out\" is-read-only=\"true\" binding=\"clockout\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Total Hours\" is-read-only=\"true\" binding=\"work_duration\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"(h m)\" is-read-only=\"true\" binding=\"work_duration_formated\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Total Hrs(Rounded)\" is-read-only=\"true\" binding=\"work_duration_rounded\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"(h m)\" is-read-only=\"true\" binding=\"work_duration_rounded_formated\"> </wj-flex-grid-column>\n" +
    "\n" +
    "                </wj-flex-grid>\n" +
    "                <div class=\"row wrapper\">\n" +
    "                    <wj-menu value=\"customPromptListDetail.pageSize\" header=\"Rows per Page\">\n" +
    "                        <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                    </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                    <div class=\"btn-group col-md-8\" ng-show=\"customPromptListDetail.pageSize > 0\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"customPromptListDetail.pageIndex <= 0\" ng-click=\"customPromptListDetail.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"customPromptListDetail.pageIndex <= 0\" ng-click=\"customPromptListDetail.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{customPromptListDetail.pageIndex+1}} / {{customPromptListDetail.pageCount}} </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"customPromptListDetail.pageIndex >= customPromptListDetail.pageCount - 1\" ng-click=\"customPromptListDetail.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"customPromptListDetail.pageIndex >= customPromptListDetail.pageCount - 1\" ng-click=\"customPromptListDetail.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showdetails==1\">\n" +
    "            <div class=\"panel-heading\">\n" +
    "                <div class=\"h4 text-info font-thick h4\"><span class=\"text-muted\">Results for: </span> {{activity_details}}</div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-12\" ng-if=\"prompt_norecord==''\" >\n" +
    "                <wj-flex-grid items-source=\"allpromptdetails\">\n" +
    "\n" +
    "                    <wj-flex-grid-column header=\"When\" is-read-only=\"true\" binding=\"prompt_when\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Prompt ID\" is-read-only=\"true\" binding=\"id\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Prompt Name\"   is-read-only=\"true\" binding=\"prompt_name\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Prompt\" width=\"*\" is-read-only=\"true\" binding=\"prompt_text\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Result\" is-read-only=\"true\" binding=\"AnsWithId\"> </wj-flex-grid-column>\n" +
    "                </wj-flex-grid>\n" +
    "             \n" +
    "            </div>\n" +
    "            <div class=\"col-sm-12\" ng-if=\"prompt_norecord!=''\" ng-bind-html=\"prompt_norecord\"> {{prompt_norecord }}</div>\n" +
    "\n" +
    "        </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/logs/employeeActivities/employeeActivities.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/logs/employeeActivities/employeeActivities.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">EMPLOYEE ACTIVITIES LIST</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-2 \">\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Job/Employee\" ui-select2=\"Selectfield\" ng-model=\"logFilters.filterName\" >\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZoneOptions\" value=\"\" ng-model=\"logFilters.zoneName\" ng-disabled=\"logFilters.filterName.id =='all'\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Value\" ui-select2=\"getFilterValue\" ng-model=\"logFilters.filterValue\" ng-disabled=\"logFilters.filterName=='' || logFilters.zoneName=='' || logFilters.zoneName==null || logFilters.zoneName[0].id =='all' || logFilters.filterName.id=='all'\">\n" +
    "\n" +
    "               </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" readonly  placeholder=\"Select Start Date\"\n" +
    " datepicker-popup=\"{{format}}\" ng-model=\"logFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select End Date\" datepicker-popup=\"{{format}}\" ng-model=\"logFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "             <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"EmployeeActivityLog.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                 \n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"employeeActivityListDetail\">\n" +
    "                <wj-flex-grid-column header=\"Employee \" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Zone\" is-read-only=\"true\" binding=\"Zone_code\"> </wj-flex-grid-column>\n" +
    "\n" +
    "                <wj-flex-grid-column header=\"Clock In\" is-read-only=\"true\" binding=\"clockin\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Clock Out\" is-read-only=\"true\" binding=\"clockout\"> </wj-flex-grid-column>\n" +
    "\n" +
    "                <wj-flex-grid-column header=\"Original Clock In\" is-read-only=\"true\" binding=\"orig_clock_in\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Original Clock Out\" is-read-only=\"true\" binding=\"orig_clock_out\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Call Status IN\" is-read-only=\"true\" binding=\"Call_status_IN\"> </wj-flex-grid-column>\n" +
    "                 <wj-flex-grid-column header=\"Call Status OUT\" is-read-only=\"true\" binding=\"Call_status_OUT\"> </wj-flex-grid-column>\n" +
    "                  <wj-flex-grid-column header=\"Work Duration\" is-read-only=\"true\" binding=\"work_duration\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Original Work Duration\" is-read-only=\"true\" binding=\"orig_work_duration\"> </wj-flex-grid-column>\n" +
    "                  <wj-flex-grid-column header=\"Activity\" is-read-only=\"true\" binding=\"activities\"> </wj-flex-grid-column>\n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"employeeActivityListDetail.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"employeeActivityListDetail.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"employeeActivityListDetail.pageIndex <= 0\" ng-click=\"employeeActivityListDetail.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"employeeActivityListDetail.pageIndex <= 0\" ng-click=\"employeeActivityListDetail.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{employeeActivityListDetail.pageIndex+1}} / {{employeeActivityListDetail.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"employeeActivityListDetail.pageIndex >= employeeActivityListDetail.pageCount - 1\" ng-click=\"employeeActivityListDetail.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"employeeActivityListDetail.pageIndex >= employeeActivityListDetail.pageCount - 1\" ng-click=\"employeeActivityListDetail.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/logs/timeCards/InactiveTimeCard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/logs/timeCards/InactiveTimeCard.tpl.html",
    "<div class=\"modal-header\">\n" +
    "    <h3 class=\"modal-title\">INACTIVE TIME CARD</h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "    <div>\n" +
    "\n" +
    "        The following timecard will not be included in timesheet\n" +
    "\n" +
    "        <div class=\"table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light\">\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        Employee\n" +
    "                    </th>\n" +
    "                    <td>\n" +
    "                        {{employee_code}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        Job\n" +
    "                    </th>\n" +
    "                    <td>\n" +
    "                        {{jobNamecode}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        Clock-in \n" +
    "                    </th>\n" +
    "                    <td>\n" +
    "                        {{clock_in}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        Clock-out \n" +
    "                    </th>\n" +
    "                    <td>\n" +
    "                        {{clock_out}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        Work Duration\n" +
    "                    </th>\n" +
    "                    <td>\n" +
    "                        {{duration}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        ClockIn Status\n" +
    "                    </th>\n" +
    "                    <td>\n" +
    "                        {{clockInSat}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr>\n" +
    "                    <th>\n" +
    "                        ClockOut Status\n" +
    "                    </th>\n" +
    "                    <td>\n" +
    "                        {{clockOutSat}}\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"modal-footer\">\n" +
    "            <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                          {{ErrorMsg}}\n" +
    "            </span>\n" +
    "            <button type=\"button\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\" ng-click='saveInactivetimecard()'>Submit</button>\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click='Inactivemodelclose()'>Cancel</button>\n" +
    "                    \n" +
    "        </div>\n" +
    "                \n" +
    "        \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/logs/timeCards/add-update-timeCard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/logs/timeCards/add-update-timeCard.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} TIME CARD</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\">\n" +
    "\n" +
    "        <div>\n" +
    "\n" +
    "            <p class=\"m-b\">Manually add a Time Card for an employee. A clock-in and a clock-out record will be created. The status will be recorded as maunally entered. <em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "\n" +
    "            <form name=\"addtimecard\" class=\"form-validation form-horizontal addtimecard\" rc-submit=\"savetimecard()\" novalidate>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label ng-if=\"pageTitle=='Add New' || timecard.txtzone\" class=\"col-sm-2 control-label text-danger\">Zone</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <div ng-if=\"pageTitle=='Add New'\">\n" +
    "                            <div ng-class=\"{'has-error': rc.addtimecard.needsAttention(addtimecard.zone_name)}\">\n" +
    "                                <input required=\"\" class=\"form-control w-md\" ui-select2=\"selectZoneOptions\" ng-model=\"timecard.zone\" required=\"\" ng-change=\"getFilterValue()\">\n" +
    "                                <span class=\"help-block\" ng-show=\"addtimecard.zone_name.$error.required\n" +
    "                                && rc.addtimecard.needsAttention(addtimecard.zone_name)\">Zone is required.</span>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"pageTitle=='Update' && timecard.txtzone\">\n" +
    "                            <input type=\"text\" Readonly class=\"form-control w-md\" ng-model=\"timecard.txtzone\">\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addtimecard.needsAttention(addtimecard.employee_code)}\">\n" +
    "                    <label class=\"col-sm-2 control-label  text-danger\"> Employee Code</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <div ng-if=\"pageTitle=='Add New'\">\n" +
    "                            <div>\n" +
    "\n" +
    "\n" +
    "                                <input ng-disabled=\"pageTitle=='Update'\" name=\"employee_code\" required=\"\" class=\"form-control w-md\" ui-select2=\"selectEmployeeOptions\" ng-model=\"timecard.employee_code\">\n" +
    "\n" +
    "                                <span class=\"help-block\" ng-show=\"addtimecard.employee_code.$error.required\n" +
    "                                && rc.addtimecard.needsAttention(addtimecard.employee_code)\">Employee Code is required.</span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"pageTitle=='Update'\">\n" +
    "                            <input type=\"text\" Readonly class=\"form-control w-md\" ng-model=\"timecard.employee_code \">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addtimecard.needsAttention(addtimecard.job_code)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Job Code</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <div ng-if=\"pageTitle=='Add New'\">\n" +
    "\n" +
    "                            <div>\n" +
    "\n" +
    "                                <input ng-disabled=\"pageTitle=='Update'\" name=\"job_code\" required=\"\" class=\"form-control w-md\" ui-select2=\"selectJobOptions\" ng-model=\"timecard.job_code\">\n" +
    "\n" +
    "                                <span class=\"help-block\" ng-show=\"addtimecard.job_code.$error.required\n" +
    "                                && rc.addtimecard.needsAttention(addtimecard.job_code)\">Job Code is required.</span>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div ng-if=\"pageTitle=='Update'\">\n" +
    "                            <input type=\"text\" Readonly class=\"form-control w-md\" ng-model=\"timecard.jobNamecode\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\" ng-if=\"pageTitle=='Update'\">\n" +
    "                    <label class=\"col-sm-2 text-right \">Current Date/time</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <span class=\"padding\"> {{timecard.current_date}}</span>\n" +
    "                        <!--<div class=\"input-group w-md\">\n" +
    "                            <input type=\"text\" Readonly class=\"form-control w-md\" ng-model=\"timecard.current_date\">\n" +
    "\n" +
    "                        </div>-->\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\" ng-if=\"pageTitle=='Add New' || log_type=='1'\" ng-class=\"{'has-error': rc.addtimecard.needsAttention(addtimecard.clock_in)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\" ng-if=\"pageTitle=='Update'\">New Date/time</label>\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\" ng-if=\"pageTitle=='Add New'\">Clock-in Date/time</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <div class=\"input-group w-md\" appendcalendar>\n" +
    "                            <input type=\"text\" readonly class=\"form-control w-md\" date-time ng-model=\"timecard.clock_in\" name=\"clock_in\" required=\"true\" partial=\"true\"  view=\"date\">\n" +
    "                            <span class=\"input-group-btn\">\n" +
    "                            \n" +
    "                                <button class=\"btn btn-default\"  type=\"button\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                               \n" +
    "                            </span>\n" +
    "                        </div>\n" +
    "                        <span class=\"help-block\" ng-show=\"addtimecard.clock_in.$error.required\n" +
    "                                && rc.addtimecard.needsAttention(addtimecard.clock_in)\">Date/time is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "                <div class=\"form-group\" ng-if=\"pageTitle=='Add New' || log_type=='2'\" ng-class=\"{'has-error': rc.addtimecard.needsAttention(addtimecard.clock_out)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\" ng-if=\"pageTitle=='Update'\">New Date/time</label>\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\" ng-if=\"pageTitle=='Add New'\">Clock-out Date/time</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <div class=\"input-group w-md\" appendcalendar>\n" +
    "                            <input type=\"text\" readonly name=\"clock_out\" class=\"form-control \" date-time ng-model=\"timecard.clock_out\" required=\"true\" partial=\"true\"  view=\"date\">\n" +
    "                            <span class=\"input-group-btn\">\n" +
    "                                <button class=\"btn btn-default\"   type=\"button\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                           </span>\n" +
    "                        </div>\n" +
    "                        <span class=\"help-block\" ng-show=\"addtimecard.clock_out.$error.required\n" +
    "                                && rc.addtimecard.needsAttention(addtimecard.clock_out)\">Date/time is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-if=\"pageTitle=='Add New' || log_type=='2'\">\n" +
    "                    <label class=\"col-sm-2 control-label\"> Work Duration</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" Readonly class=\"form-control w-md\" ng-model=\"timecard.duration\" required=\"\" ng-pattern=\"/\\d+(\\.\\d{1,2})?/\" ng-keyup=\"calcuateDiff()\" placeholder=\"Call Duration\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" >\n" +
    "                    <label class=\"col-sm-2 control-label\"> Authorization </label>\n" +
    "                    <div class=\"col-sm-4\">\n" +
    "                        <input class=\"form-control w-md\" ng-disabled=\"timecard.job_code=='' || !timecard.clock_in \" ui-select2=\"selectAuthorization\" value=\"\" ng-change=\"getAuthorizationNotes()\" placeholder=\"Enter Authorization\" ng-model=\"timecard.authorization\">\n" +
    "                        \n" +
    "                    </div>\n" +
    "                    \n" +
    "                    <label class=\"col-sm-1 control-label\" ng-if=\"timecard.authorization_notes\"> Notes</label>\n" +
    "                    <div class=\"col-sm-3\" ng-if=\"timecard.authorization_notes\">\n" +
    "                        <p class=\"col-sm-12 m-t-sm\">{{timecard.authorization_notes}}</p>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Notes</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <textarea rows=\"4\" capitalize ng-model=\"timecard.notes\" cols=\"50\" placeholder=\"Notes\"></textarea>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save changes</button>\n" +
    "                        <button type=\"button\" ng-show=\"timecardId && showinactive==1\" class=\"btn btn-default btn-rounded\" ng-click='inactiveTimecard(timecard)'>Inactive Timecard</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  {{ErrorMsg}}\n" +
    "                        </span>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-sm-2\">\n" +
    "                        <div class=\"pull-right\">\n" +
    "\n" +
    "                            <button type=\"button\" ng-show=\"pageTitle=='Add New'\" class=\"btn btn-default btn-rounded\" ng-click='cancel()'>Cancel</button>\n" +
    "                            <button type=\"button\" ng-show=\"pageTitle!='Add New'\" class=\"btn btn-default btn-rounded\" ng-click='modelclose()'>Cancel</button>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-if=\"showWarningMsg\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-{{WarningClass}}\">\n" +
    "                            Please Note there is a log entry exist at\n" +
    "                            <div ng-repeat=\"avaliabledate in existdate\">\n" +
    "                                {{avaliabledate.clockin | datewithtimeformat:empCountry}} - {{avaliabledate.clockout| datewithtimeformat:empCountry}}\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-if=\"authWarning\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-warning\">\n" +
    "\n" +
    "                        Please Note Authorization Ends  on {{ timecard.authorization.enddate }}, there is no Time card added  after {{timecard.authorization.enddate}}\n" +
    "\n" +
    "                            \n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"timecardId\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{timecard.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{timecard.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"timecard.editedOn\">\n" +
    "                                Edited by: {{timecard.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{timecard.editedOn | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </form>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/logs/timeCards/timeCards.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/logs/timeCards/timeCards.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">TIME CARD LIST<a ui-sref=\"ctApp.addUpdateTimeCard\" class=\"btn btn-md btn-info pull-right\" type=\"button\">ADD TIME CARD</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-2 \">\n" +
    "                <input class=\"form-control \" placeholder=\"Select Job/Employee\" ui-select2=\"Selectfield\" ng-model=\"logFilters.filterName\">\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2\">\n" +
    "\n" +
    "                <div class=\"form-control \" ng-disabled=\"logFilters.filterName.id =='all'\" placeholder=\"Select zone\" ui-select2=\"selectZoneOptions\" value=\"\" ng-model=\"logFilters.zoneName\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <input class=\"form-control \" placeholder=\"Select Value\" ui-select2=\"getFilterValue\" ng-model=\"logFilters.filterValue\" ng-disabled=\"logFilters.filterName=='' || logFilters.zoneName=='' || logFilters.zoneName==null || logFilters.zoneName[0].id =='all' || logFilters.filterName.id=='all'\">\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" placeholder=\"Select Start Date\" readonly datepicker-popup=\"{{format}}\" ng-model=\"logFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select End Date\" datepicker-popup=\"{{format}}\" ng-model=\"logFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"TimeLog.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"calllogListDetail\">\n" +
    "                <wj-flex-grid-column header=\"Employee \" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Log Type\" is-read-only=\"true\" binding=\"log_type\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Work Duration\" is-read-only=\"true\" binding=\"call_duriation\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Time Stamp\" is-read-only=\"true\" binding=\"timestamp\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Call Status\" is-read-only=\"true\" binding=\"call_status\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Original Time Stamp\" is-read-only=\"true\" binding=\"adjusted_timestamp\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Original Work Duration\" is-read-only=\"true\" binding=\"adjusted_call_duriation\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Activity Code\" is-read-only=\"true\" binding=\"activity_code\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Entered By\" is-read-only=\"true\" binding=\"created_by\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Edit\" is-read-only=\"true\" binding=\"id\" width=\"65\" align=\"center\">\n" +
    "                    <button type=\"button\" class=\"btn btn-rounded btn-sm btn-icon btn-default\" ng-click=\"enableEditView()\"><i class=\"fa fa-pencil\"></i>\n" +
    "                    </button>\n" +
    "                </wj-flex-grid-column>\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"calllogListDetail.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"calllogListDetail.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{calllogListDetail.pageIndex+1}} / {{calllogListDetail.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/mainDashboard/mainDashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/mainDashboard/mainDashboard.tpl.html",
    "<div class=\"hbox hbox-auto-xs hbox-auto-sm\">\n" +
    "    <!-- main -->\n" +
    "    <div class=\"col\">\n" +
    "        <!-- main header -->\n" +
    "        <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-6 col-xs-12\">\n" +
    "                    <h1 class=\"m-n font-thin h3 text-black\">Main Dashboard</h1>\n" +
    "                    <small class=\"text-muted\">{{dashboardOverview}}</small>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-6 text-right hidden-xs\">\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!-- / main header -->\n" +
    "        <div class=\"wrapper-md\">\n" +
    "            <!-- stats -->\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12 bg-light lter  wrapper-md\">\n" +
    "                    <div class=\"col-md-7\">\n" +
    "                        <div class=\"\">\n" +
    "                            <h1 class=\"m-n font-thin h3\">DASHBOARD AS OF {{currentDateonly }} at {{currentTime }}</h1>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"col-md-5\">\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateDetails()\">REFRESH</button>\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getdetails(1)\">-1 day</button>\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getdetails(2)\">-2 days</button>\n" +
    "                        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getdetails(3)\">-3 days</button>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <div class=\"row row-sm text-center\">\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"panel padder-v bg-default item\">\n" +
    "                                <div class=\"h1 text-primary font-thin h1\">\n" +
    "                                    <div class=\"spinner\" ng-show=\"loading\"></div>{{jobShiftCount}}</div>\n" +
    "                                <span class=\"text-muted text-xs\">Total Scheduled Visits(SHIFTS)</span>\n" +
    "                                <div class=\"top text-right\">\n" +
    "                                    <i class=\"fa fa-medkit text-muted m-r-sm\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"panel padder-v bg-default item\">\n" +
    "                                <div class=\"h1 text-primary font-thin h1\">{{totalClockin}}</div>\n" +
    "                                <span class=\"text-muted text-xs\">Total Clock-IN</span>\n" +
    "                                <div class=\"top text-right\">\n" +
    "                                    <i class=\"fa fa-medkit text-muted m-r-sm\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <a href class=\"block panel padder-v bg-default item\">\n" +
    "                                <span class=\"text-primary font-thin h1 block\">{{totalClockout}}</span>\n" +
    "                                <span class=\"text-muted text-xs\">Total Clock-OUT</span>\n" +
    "                                <span class=\"top text-right\">\n" +
    "                                 <i class=\"fa fa-medkit text-muted m-r-sm\"></i>\n" +
    "                                </span>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <a href class=\"block panel padder-v bg-default item\">\n" +
    "                                <span class=\"text-success font-thin h1 block\">{{totalOnClockin}}</span>\n" +
    "                                <span class=\"text-success text-xs\">ON-TIME CLOCK IN</span>\n" +
    "                                <span class=\"top text-right\">\n" +
    "                  <i class=\"fa fa-users text-muted m-r-sm\"></i>\n" +
    "                </span>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <a href class=\"block panel padder-v bg-default item\">\n" +
    "                                <span class=\"text-warning font-thin h1 block\">{{totalLateClockin}}</span>\n" +
    "                                <span class=\"text-warning text-xs\">LATE CLOCK IN</span>\n" +
    "                                <span class=\"top text-right\">\n" +
    "                  <i class=\"fa fa-users text-muted m-r-sm\"></i>\n" +
    "                </span>\n" +
    "                            </a>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-xs-4\">\n" +
    "                            <div class=\"panel padder-v bg-default item\">\n" +
    "                                <div class=\"text-danger font-thin h1\">{{totalNotClockin}}</div>\n" +
    "                                <span class=\"text-danger text-xs\">NOT CLOCK IN</span>\n" +
    "                                <div class=\"top text-right\">\n" +
    "                                    <i class=\"fa fa-users text-muted m-r-sm\"></i>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                    <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <wj-flex-chart class=\"custom-flex-chart\" items-source=\"Chartdetails\" binding-x=\"date_time\" chart-type=\"SplineSymbols\">\n" +
    "                        <wj-flex-chart-axis wj-property=\"axisX\" axis-line=\"true\" major-grid=\"true\" label-Angle=\"45\">\n" +
    "                        </wj-flex-chart-axis>\n" +
    "                        <wj-flex-chart-axis wj-property=\"axisY\" axis-line=\"false\" major-grid=\"true\">\n" +
    "                        </wj-flex-chart-axis>\n" +
    "                        <wj-flex-chart-series name=\"Clock In\" binding=\"clockin\"></wj-flex-chart-series>\n" +
    "                        <wj-flex-chart-series name=\"Clock Out\" binding=\"clockout\"></wj-flex-chart-series>\n" +
    "\n" +
    "                        <wj-flex-chart-legend position=\"Bottom\"></wj-flex-chart-legend>\n" +
    "                    </wj-flex-chart>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "                <div class=\"col-md-12\">\n" +
    "                    <wj-flex-grid items-source=\"calllogListDetail\">\n" +
    "                        <wj-flex-grid-column header=\"Employee \" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Log Type\" is-read-only=\"true\" binding=\"log_type\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Work Duration\" is-read-only=\"true\" binding=\"call_duriation\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Time Stamp\" is-read-only=\"true\" binding=\"timestamp\"> </wj-flex-grid-column>\n" +
    "                        <wj-flex-grid-column header=\"Call Status\" is-read-only=\"true\" binding=\"call_status\"> </wj-flex-grid-column>\n" +
    "                    </wj-flex-grid>\n" +
    "                    <div class=\"row wrapper\">\n" +
    "                        <wj-menu value=\"calllogListDetail.pageSize\" header=\"Rows per Page\">\n" +
    "                            <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                            <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                            <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                            <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                        </wj-menu>\n" +
    "                        <div class=\"btn-group col-md-8\" ng-show=\"calllogListDetail.pageSize > 0\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{calllogListDetail.pageIndex+1}} / {{calllogListDetail.pageCount}} </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- / main -->\n" +
    "    <!-- right col -->\n" +
    "    <div class=\"col w-md bg-white-only b-l bg-auto bg-auto-right no-border-xs\">\n" +
    "        <tabset class=\"nav-tabs-alt\" justified=\"true\">\n" +
    "            <tab>\n" +
    "                <tab-heading>\n" +
    "                    <i class=\"glyphicon glyphicon-user text-md text-muted wrapper-sm\"></i>\n" +
    "                </tab-heading>\n" +
    "                <div class=\"wrapper-md\">\n" +
    "                    <div class=\"m-b-sm text-md\">Latest Jobs</div>\n" +
    "                    <ul class=\"list-group no-bg no-borders pull-in\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"job in jobLatest\">\n" +
    "                            <div class=\"clear\">\n" +
    "                                <div><a href>{{job.job_name}}</a>\n" +
    "                                </div>\n" +
    "                                <small class=\"text-muted\">{{job.job_city}}, {{job.job_state}}</small>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "\n" +
    "                    </ul>\n" +
    "                    <div class=\"text-center\">\n" +
    "                        <a ui-sref=\"ctApp.jobs\" class=\"btn btn-sm btn-primary padder-md m-b\">More Job</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </tab>\n" +
    "            <tab>\n" +
    "                <tab-heading>\n" +
    "                    <i class=\"glyphicon glyphicon-time text-md text-muted wrapper-sm\"></i>\n" +
    "                </tab-heading>\n" +
    "                <div class=\"wrapper-md\">\n" +
    "                    <div class=\"m-b-sm text-md\">Latest Activity</div>\n" +
    "                    <ul class=\"list-group no-borders pull-in auto\">\n" +
    "                        <li class=\"list-group-item\" ng-repeat=\"emp in LatestActivity\">\n" +
    "                            <a href class=\"text-muted\"><i class=\"fa fa-clock-o pull-right m-t-sm text-sm\"></i></a>\n" +
    "                            <div class=\"clear\">\n" +
    "                                <div><a href=\"\">{{ emp.employee_name }} </a>\n" +
    "                                </div>\n" +
    "                                <small class=\"text-muted\">{{emp.clockin | MMDDYYYY:empCountry}}</small>\n" +
    "                                <small class=\"text-muted\"> - {{emp.clockout | MMDDYYYY:empCountry}}</small>\n" +
    "                            </div>\n" +
    "                        </li>\n" +
    "\n" +
    "                    </ul>\n" +
    "                    <div class=\"text-center\">\n" +
    "                        <a ui-sref=\"ctApp.employeeActivity\" class=\"btn btn-sm btn-primary padder-md m-b\">More Activities</a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </tab>\n" +
    "        </tabset>\n" +
    "        <div class=\"padder-md\">\n" +
    "            <!-- streamline -->\n" +
    "            <div class=\"m-b text-md\">Recent Shifts</div>\n" +
    "            <div class=\"streamline b-l\">\n" +
    "                <div class=\"sl-item b-success b-l\" ng-repeat=\"shift in shiftLatest\">\n" +
    "                    <div class=\"m-l\">\n" +
    "                        <div class=\"text-default\">{{shift.created_on | MMDDYYYY:empCountry}}</div>\n" +
    "                        <p><a href class=\"text-muted\">CO:</a><a href class=\"text-info\"> {{shift.employee |  parseToJson:'text'}}</a>\n" +
    "                            <br />\n" +
    "                            <a href class=\"text-muted\">PA:</a><a href class=\"text-success\"> {{shift.job |  parseToJson:'text'}}</a>\n" +
    "                        </p>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <!-- / streamline -->\n" +
    "            <div class=\"text-center\">\n" +
    "                <a ui-sref=\"ctApp.schedules\" class=\"btn btn-sm btn-primary padder-md m-b\">See All Shifts</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <!-- / right col -->\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/activities/activities.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/activities/activities.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Activities List <a ui-sref=\"ctApp.addUpdateActivity\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Activity</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"name\" class=\"sort-item asc\" style=\"width:30%;\">Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"edited_on\" class=\"sort-item\">Updated On &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in activityDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.name}}</td>\n" +
    "                        <td>{{detail.edited_on | MMDDYYYY:empCountry}}</td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_activities_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_activities_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_activities_loader && activityDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/activities/add-update-activity.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/activities/add-update-activity.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Activity</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdateActivityForm\" class=\"form-validation form-horizontal general\" rc-submit=\"activityManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateActivityForm.needsAttention(addUpdateActivityForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"Activity Name\" name=\"name\" ng-model=\"activity.name\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateActivityForm.name.$error.required && rc.addUpdateActivityForm.needsAttention(addUpdateActivityForm.name)\">Activity name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"activity.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"activity.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelActivity()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">{{ErrorMsg}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"activity_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{activity.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{activity.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"activity.editedOn\">\n" +
    "                                Edited by: {{activity.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{activity.editedOn | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/activityCodes/activityCodes.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/activityCodes/activityCodes.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Activity Codes List <a ui-sref=\"ctApp.addUpdateActivityCode\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Activity Code</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"code\" class=\"sort-item\">Activity Code  &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        <th id=\"name\" class=\"sort-item asc\" style=\"width:30%;\"> Activity Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"billed\" class=\"sort-item asc\" > Billable  &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in activityCodeDetailList\" class=\"animate-repeat\">\n" +
    "                       <td>{{detail.code}}</td>\n" +
    "                        <td>{{detail.name}}</td>\n" +
    "                        <td>{{detail.billed | yesOrNo }} </td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_activityCodes_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_activityCodes_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_activityCodes_loader && activityCodeDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/activityCodes/add-update-activityCode.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/activityCodes/add-update-activityCode.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Activity Code</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdateActivityCodeForm\" class=\"form-validation form-horizontal general\" rc-submit=\"activityCodeManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateActivityCodeForm.needsAttention(addUpdateActivityCodeForm.code)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Activity Code</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input   ng-maxlength=\"4\" type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"Activity Code\" name=\"code\" ng-model=\"activityCode.code\" ng-pattern=\"/^[0-9]+$/\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateActivityCodeForm.code.$error.required && rc.addUpdateActivityCodeForm.needsAttention(addUpdateActivityCodeForm.code)\">Activity Code  is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateActivityCodeForm.needsAttention(addUpdateActivityCodeForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Activity Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"Activity Name\" name=\"name\" ng-model=\"activityCode.name\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateActivityCodeForm.name.$error.required && rc.addUpdateActivityCodeForm.needsAttention(addUpdateActivityCodeForm.name)\">Activity name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Activity Description</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                         <textarea capitalize rows=\"4\" ng-model=\"activityCode.description\" cols=\"45\"></textarea>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Billable</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"billable\" value=\"1\" ng-model=\"activityCode.billed\"><i></i> Yes\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"billable\" value=\"0\" ng-model=\"activityCode.billed\"><i></i> No\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"activityCode.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"activityCode.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelActivityCode()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">{{ErrorMsg}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"activityCode_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{activityCode.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{activityCode.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"activityCode.editedOn\">\n" +
    "                                Edited by: {{activityCode.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{activityCode.editedOn | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/customPrompts/add-update-customPrompt.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/customPrompts/add-update-customPrompt.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Custom Prompt</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><strong>Prompt Text</strong> is the question stated in the IVR dialog. <strong>Prompt Answer</strong> is the answer choices stated in the IVR dialog. Example: For answers, 1 for Yes and 2 for No, only enter YES,NO as the input field. <em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdateCustomPromptForm\" class=\"form-validation form-horizontal general\" rc-submit=\"customPromptManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateCustomPromptForm.needsAttention(addUpdateCustomPromptForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Prompt Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control\" name=\"prompt_name\" required=\"\" placeholder=\"Prompt Name \" ng-model=\"customPrompt.prompt_name\" capitalize>\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateCustomPromptForm.prompt_name.$error.required && rc.addUpdateCustomPromptForm.needsAttention(addUpdateCustomPromptForm.prompt_name)\"> Prompt Name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateCustomPromptForm.needsAttention(addUpdateCustomPromptForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Prompt Text </label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input ctype=\"text\" class=\"form-control\" name=\"prompt_text\" required=\"\" placeholder=\"The question stated in the IVR.\" ng-model=\"customPrompt.prompt_text\" capitalize>\n" +
    "                        <em class=\"m-b-none text-muted\">Example: Did you feed the patient?</em>\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateCustomPromptForm.prompt_text.$error.required && rc.addUpdateCustomPromptForm.needsAttention(addUpdateCustomPromptForm.prompt_text)\">Prompt Text is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateCustomPromptForm.needsAttention(addUpdateCustomPromptForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Prompt Answers</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input ctype=\"text\" class=\"form-control\" name=\"prompt_answers\" required=\"\" placeholder=\"Answer choices stated in IVR.\" ng-model=\"customPrompt.prompt_answers\" capitalize>\n" +
    "                        <em class=\"m-b-none text-muted\">Enter prompt answers separated by comma with no space before or after comma</em>\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateCustomPromptForm.prompt_answers.$error.required && rc.addUpdateCustomPromptForm.needsAttention(addUpdateCustomPromptForm.prompt_answers)\">Paytype name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Status </label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=1 ng-model=\"customPrompt.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=0 ng-model=\"customPrompt.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelCustomPrompt()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  \n" +
    "                                  {{ErrorMsg}}\n" +
    "                          </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"customPrompt_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{customPrompt.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{customPrompt.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"customPrompt.updated_on\">\n" +
    "                                Edited by: {{customPrompt.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{customPrompt.updated_on | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/customPrompts/customPrompts.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/customPrompts/customPrompts.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Custom Prompts List <a ui-sref=\"ctApp.addUpdateCustomPrompt\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Custom Prompt</a></h1>\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"prompt_name\" class=\"sort-item asc\" style=\"width:30%;\">Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"created_on\" class=\"sort-item\">Created On &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"updated_on\" class=\"sort-item\">Updated On &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in customPromptDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.prompt_name}}</td>\n" +
    "                        <td>{{detail.created_on | MMDDYYYY:empCountry }} </td>\n" +
    "                        <td>{{detail.updated_on | MMDDYYYY:empCountry}} </td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_customPrompts_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_customPrompts_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_customPrompts_loader && customPromptDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/observations/add-update-observation.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/observations/add-update-observation.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Observation</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdateObservationForm\" class=\"form-validation form-horizontal general\" rc-submit=\"observationManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateObservationForm.needsAttention(addUpdateObservationForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"Observation Name\" name=\"name\" ng-model=\"observation.name\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateObservationForm.name.$error.required && rc.addUpdateObservationForm.needsAttention(addUpdateObservationForm.name)\">Observation name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateObservationForm.needsAttention(addUpdateObservationForm.category)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Category</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"Observation Category\" name=\"category\" ng-model=\"observation.category\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateObservationForm.category.$error.required && rc.addUpdateObservationForm.needsAttention(addUpdateObservationForm.category)\">Observation category is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"observation.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"observation.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelObservation()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">{{ErrorMsg}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"observation_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created date is: <em class=\"ng-binding\">{{observation.created_on}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"observation.editedOn\">\n" +
    "                                Last Edited date is: <em class=\"ng-binding\">{{observation.editedOn}}</em>\n" +
    "                            </p> \n" +
    "                           <!-- <p>Created by: {{observation.created_by | removeJSONName}}, Created date is: <em class=\"ng-binding\">{{observation.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"observation.editedOn\">\n" +
    "                                Edited by: {{observation.edited_by | removeJSONName}}, Last Edited date is: <em class=\"ng-binding\">{{observation.editedOn | date:'medium' }}</em>\n" +
    "                            </p> -->\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/observations/observations.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/observations/observations.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Observations List <a ui-sref=\"ctApp.addUpdateObservation\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Observation</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"obv_name\" class=\"sort-item asc\" style=\"width:30%;\">Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"modified_date\" class=\"sort-item\">Updated On &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in observationDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.obv_name}}</td>\n" +
    "                        <td>{{detail.modified_date  | MMDDYYYY:empCountry}}</td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_observations_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_observations_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_observations_loader && observationDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/payClasses/add-update-payClass.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/payClasses/add-update-payClass.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Pay Class</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdatePayClassForm\" class=\"form-validation form-horizontal general\" rc-submit=\"payClassManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdatePayClassForm.needsAttention(addUpdatePayClassForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\">Employee class Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"PayClass Name\" name=\"name\" ng-model=\"payClass.pay_class\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdatePayClassForm.name.$error.required && rc.addUpdatePayClassForm.needsAttention(addUpdatePayClassForm.name)\">Employee class name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"status\" value=\"1\" ng-model=\"payClass.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"status\" value=\"0\" ng-model=\"payClass.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelPayClass()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">{{ErrorMsg}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"payClass_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{payClass.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{payClass.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"payClass.editedOn\">\n" +
    "                                Edited by: {{payClass.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{payClass.editedOn | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/payClasses/payClasses.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/payClasses/payClasses.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Pay Classes List <a ui-sref=\"ctApp.addUpdatePayClass\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Pay Class</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"pay_class\" class=\"sort-item asc\" style=\"width:30%;\">Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"edited_on\" class=\"sort-item\">Updated On &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in payClassDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.pay_class}}</td>\n" +
    "                        <td>{{detail.edited_on  | MMDDYYYY:empCountry}}</td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_payClasses_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_payClasses_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_payClasses_loader && payClassDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/payTypes/add-update-payType.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/payTypes/add-update-payType.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Pay Type</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdatePayTypeForm\" class=\"form-validation form-horizontal general\" rc-submit=\"payTypeManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdatePayTypeForm.needsAttention(addUpdatePayTypeForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"PayType Name\" name=\"name\" ng-model=\"payType.name\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdatePayTypeForm.name.$error.required && rc.addUpdatePayTypeForm.needsAttention(addUpdatePayTypeForm.name)\">PayType name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Overtime Exempt</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <ui-select ng-model=\"payType.overtime_exempt\" theme=\"select2\" class=\"col-md-12 padlr0 w-md\">\n" +
    "                            <ui-select-match placeholder=\"Overtime Exempt\">\n" +
    "                                {{$select.selected.text}}\n" +
    "                            </ui-select-match>\n" +
    "                            <ui-select-choices repeat=\"overtime_exempt in overtime_exempts track by $index\">\n" +
    "                                <div ng-bind-html=\"overtime_exempt.text\"></div>\n" +
    "                            </ui-select-choices>\n" +
    "                        </ui-select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"payType.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"payType.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelPayType()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">{{ErrorMsg}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"payType_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{payType.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{payType.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"payType.editedOn\">\n" +
    "                                Edited by: {{payType.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{payType.editedOn | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/payTypes/payTypes.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/payTypes/payTypes.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Pay Types List <a ui-sref=\"ctApp.addUpdatePayType\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Pay Type</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"name\" class=\"sort-item asc\" style=\"width:30%;\">Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"overtime_exempt\" class=\"sort-item\">Overtime Exempt &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in payTypeDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.name}}</td>\n" +
    "                        <td>{{detail.overtime_exempt | yesOrNo }} </td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_payTypes_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_payTypes_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_payTypes_loader && payTypeDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/payors/add-update-payor.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/payors/add-update-payor.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Payor</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdatePayorForm\" class=\"form-validation form-horizontal general\" rc-submit=\"payorManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdatePayorForm.needsAttention(addUpdatePayorForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"Payor Name\" name=\"name\" ng-model=\"payor.name\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdatePayorForm.name.$error.required && rc.addUpdatePayorForm.needsAttention(addUpdatePayorForm.name)\">Payor name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"payor.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"payor.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelPayor()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">{{ErrorMsg}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"payor_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{payor.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{payor.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"payor.editedOn\">\n" +
    "                                Edited by: {{payor.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{payor.editedOn | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/payors/payors.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/payors/payors.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Payors List <a ui-sref=\"ctApp.addUpdatePayor\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Payor</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"name\" class=\"sort-item asc\" style=\"width:30%;\">Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"edited_on\" class=\"sort-item\">Updated On &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in payorDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.name}}</td>\n" +
    "                        <td>{{detail.edited_on  | MMDDYYYY:empCountry}}</td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_payors_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_payors_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_payors_loader && payorDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/serviceItems/add-update-serviceItem.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/serviceItems/add-update-serviceItem.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Service Item</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdateserviceItemForm\" class=\"form-validation form-horizontal general\" rc-submit=\"serviceItemManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateserviceItemForm.needsAttention(addUpdateserviceItemForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"Service Name\" name=\"name\" ng-model=\"serviceItem.name\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateserviceItemForm.name.$error.required && rc.addUpdateserviceItemForm.needsAttention(addUpdateserviceItemForm.name)\">Service name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Billable Hours</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "\n" +
    "                        <ui-select ng-model=\"serviceItem.billable_hours\" theme=\"select2\" class=\"col-md-12 padlr0 w-md\">\n" +
    "                            <ui-select-match placeholder=\"Billable Hours\">\n" +
    "                                {{$select.selected.text}}\n" +
    "                            </ui-select-match>\n" +
    "                            <ui-select-choices repeat=\"billable_hour in billable_hours track by $index\">\n" +
    "                                <div ng-bind-html=\"billable_hour.text\"></div>\n" +
    "                            </ui-select-choices>\n" +
    "                        </ui-select>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"serviceItem.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"serviceItem.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelServiceItem()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  \n" +
    "                                  {{ErrorMsg}}\n" +
    "                          </span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"serviceItem_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{serviceItem.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{serviceItem.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"serviceItem.editedOn\">\n" +
    "                                Edited by: {{serviceItem.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{serviceItem.editedOn | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/serviceItems/serviceItems.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/serviceItems/serviceItems.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Service Items List\n" +
    "        <a ui-sref=\"ctApp.addUpdateServiceItem\" class=\"btn btn-md btn-info pull-right\" type=\"button\">Add Service Item</a></h1>\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"name\" class=\"sort-item asc\" style=\"width:30%;\"> Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"billable_hours\" class=\"sort-item\">Billable Hours &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in serviceItemDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.name}}</td>\n" +
    "                        <td><a>{{detail.billable_hours | yesOrNo }} </a>\n" +
    "                        </td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\" title=\"Edit ServiceItems\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\" title=\"Delete ServiceItems\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_serviceItems_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_serviceItems_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_serviceItems_loader && serviceItemDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/skills/add-update-skill.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/skills/add-update-skill.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Skill</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdateSkillForm\" class=\"form-validation form-horizontal general\" rc-submit=\"skillManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateSkillForm.needsAttention(addUpdateSkillForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"Skill Name\" name=\"name\" ng-model=\"skill.name\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateSkillForm.name.$error.required && rc.addUpdateSkillForm.needsAttention(addUpdateSkillForm.name)\">Skill name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"skill.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"skill.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelSkill()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">{{ErrorMsg}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"skill_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created by: {{skill.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{skill.created_on | date:'medium'}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"skill.editedOn\">\n" +
    "                                Edited by: {{skill.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{skill.editedOn | date:'medium' }}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/skills/skills.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/skills/skills.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Skills List <a ui-sref=\"ctApp.addUpdateSkill\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Skill</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"name\" class=\"sort-item asc\" style=\"width:30%;\">Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"edited_on\" class=\"sort-item\">Updated On &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in skillDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.name}}</td>\n" +
    "                        <td>{{detail.edited_on  | MMDDYYYY:empCountry}}</td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_skills_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_skills_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_skills_loader && skillDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/tasks/add-update-task.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/tasks/add-update-task.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} Task</h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <p class=\"m-b\"><em class=\"text-danger\">Required fields are in Red</em>\n" +
    "            </p>\n" +
    "            <progressbar value=\"100\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "            <form name=\"addUpdateTaskForm\" class=\"form-validation form-horizontal general\" rc-submit=\"taskManage()\" novalidate>\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': rc.addUpdateTaskForm.needsAttention(addUpdateTaskForm.name)}\">\n" +
    "                    <label class=\"col-sm-2 control-label text-danger\"> Name</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <input type=\"text\" class=\"form-control w-md\" capitalize required=\"\" placeholder=\"Task Name\" name=\"name\" ng-model=\"task.name\">\n" +
    "                        <span class=\"help-block\" ng-show=\"addUpdateTaskForm.name.$error.required && rc.addUpdateTaskForm.needsAttention(addUpdateTaskForm.name)\">Task name is required.</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                \n" +
    "                <div class=\"form-group\">\n" +
    "                    <label class=\"col-sm-2 control-label\">Status</label>\n" +
    "                    <div class=\"col-sm-10\">\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"task.status\"><i></i> Active\n" +
    "                        </label>\n" +
    "                        <label class=\"radio-inline i-checks\">\n" +
    "                            <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"task.status\"><i></i> Inactive\n" +
    "                        </label>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                <div class=\"form-group\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                        <button type=\"button\" ng-click='cancelTask()' class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                        <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">{{ErrorMsg}}</span>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "                <div class=\"form-group\" ng-show=\"task_id\">\n" +
    "                    <div class=\"col-sm-12\">\n" +
    "                        <div class=\"alert alert-info\">\n" +
    "                            <p>Created date is: <em class=\"ng-binding\">{{task.created_on}}</em>\n" +
    "                            </p>\n" +
    "                            <p ng-show=\"task.editedOn\">\n" +
    "                                Last Edited date is: <em class=\"ng-binding\">{{task.editedOn}}</em>\n" +
    "                            </p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/manageLists/tasks/tasks.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/manageLists/tasks/tasks.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Tasks List <a ui-sref=\"ctApp.addUpdateTask\" class=\"btn btn-sm btn-info pull-right\" type=\"button\">Add Task</a></h1>\n" +
    "\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" placeholder=\"Search Text\" ng-model=\"config.general.searchtxt\" ui-keypress=\"{13:'updateTableData(true)'}\" capitalize>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                    <tr>\n" +
    "                        <th id=\"task_name\" class=\"sort-item asc\" style=\"width:30%;\">Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"modified_date\" class=\"sort-item\">Updated On &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th id=\"status\" class=\"sort-item\">Status &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th>Action</th>\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()' infinite-scroll-disabled='disable_infinite_scroll' infinite-scroll-distance='0'>\n" +
    "                    <tr ng-repeat=\"detail in taskDetailList\" class=\"animate-repeat\">\n" +
    "                        <td>{{detail.task_name}}</td>\n" +
    "                        <td>{{detail.modified_date  | MMDDYYYY:empCountry}}</td>\n" +
    "                        <td ng-bind-html=\"detail.status | checkstatus\">{{detail.status | checkstatus}}</td>\n" +
    "                        <td>\n" +
    "                            <button ng-click=\"enableEditView(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-pencil\"></i>\n" +
    "                            </button>\n" +
    "                            <button ng-click=\"enableDelete(detail.id)\" class=\"btn btn-rounded btn-sm btn-icon btn-default\"><i class=\"fa fa-trash-o\"></i>\n" +
    "                            </button>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"config.show_tasks_loader\">\n" +
    "                        <td colspan=\"4\">\n" +
    "                            <div show-loader=\"config.show_tasks_loader\"></div>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    <tr ng-if=\"!config.show_tasks_loader && taskDetailList.length==0\">\n" +
    "                        <td colspan='4' class=\"alert alert-danger\">\n" +
    "                            <center> No Records Found.</center>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/mapView/mapView.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/mapView/mapView.tpl.html",
    "<div >\n" +
    "<div class=\"row wrapper\">\n" +
    "<div class=\"form-group\">\n" +
    "    <label class=\"col-sm-2 control-label\"> <h4>Select Zone/Filters</h4></label>\n" +
    "\n" +
    "   <div class=\"col-sm-3\">\n" +
    "    <div >                      \n" +
    "        <input class=\"form-control w-md\"  ui-select2=\"selectOptions\" value=\"\" ng-model=\"filterTerm\" placeholder=\"Select a zone\" >\n" +
    "    </div>                      \n" +
    "   </div>\n" +
    "   \n" +
    "   <div class=\"col-sm-3\">\n" +
    "    <div >                      \n" +
    "        <input ng-disabled=\"filterTerm == ''\" class=\"form-control w-md\"  ui-select2=\"selectJob\" value=\"\" ng-model=\"filterJob\" placeholder=\"Select a job\">\n" +
    "    </div>                      \n" +
    "   </div>\n" +
    "   \n" +
    "\n" +
    "   <div class=\"col-sm-2\">\n" +
    "       <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getRecords()\">Search</button>\n" +
    "       <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "    </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row wrapper\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "<div class=\"test col-sm-12\" style=\"position: relative; height: 500px\">\n" +
    "    <div id='map'></div>\n" +
    "    <div id='directions'> \n" +
    "    <div id=\"newroutes\">\n" +
    "        <h4 ng-if=\"jobsMapListSelected.properties\"> Distance from Job [{{jobsMapListSelected.properties.code}}] - {{jobsMapListSelected.properties.name}}, {{jobsMapListSelected.properties.city}}, {{jobsMapListSelected.properties.state}}, {{jobsMapListSelected.properties.zip}} </h4>\n" +
    "        <div class=\"newroute\" ng-repeat=\"detail in newdetails.employee\" id=\"newrouteItems\">\n" +
    "            <div>\n" +
    "                <span ng-if=\"detail.properties.name\">{{detail.properties.name}} [{{detail.properties.code}}]</span>\n" +
    "                <span ng-if=\"detail.properties.address1\">, {{detail.properties.address1}}</span>\n" +
    "                <span ng-if=\"detail.properties.city\">, {{detail.properties.city}}</span>\n" +
    "                <span ng-if=\"detail.properties.state\">, {{detail.properties.state}}</span>\n" +
    "                <span ng-if=\"detail.properties.zip\">, {{detail.properties.zip}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"routeSummary\" ng-if=\"detail.route.summary\">Route summary: {{detail.route.summary}}</div>\n" +
    "            <div class=\"routeDistDur\" ng-if=\"detail.route.distdur\">\n" +
    "                Dist &amp; Duration:  {{detail.route.distdur}}\n" +
    "            </div>\n" +
    "            <div class=\"addShiftCont\">\n" +
    "                <span class=\"inline\"><a href=\"javascript:void(0);\" title=\"\" ng-click=\"addshift(detail)\" class=\"btn btn-primary\">Add Shift</a></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "      \n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"col-sm-12\">\n" +
    "  \n" +
    " <div class=\"table-responsive jobsListClass\" >\n" +
    "\n" +
    "      <table class=\"table table-striped b-t b-light\">\n" +
    "\n" +
    "        <thead ng-hide=\"searchAlert == true\">\n" +
    "         <tr>\n" +
    "         \n" +
    "          <th ng-click=\"sortMe('last_name', 'last_name')\" class=\"sortable last_name\">Employee Name &nbsp;<i class=\"fa fa-sort\"></i></th>\n" +
    "          <th ng-click=\"sortMe('primary_address1', 'primary_address1')\" class=\"sortable primary_address1\">Address &nbsp;<i class=\"fa fa-sort\"></i></th>\n" +
    "          <th ng-click=\"sortMe('primary_city', 'primary_city')\" class=\"sortable primary_city\">City &nbsp;<i class=\"fa fa-sort\"></i></th>\n" +
    "          <th ng-click=\"sortMe('primary_state', 'primary_state')\" class=\"sortable primary_state\">State &nbsp;<i class=\"fa fa-sort\"></i></th>\n" +
    "          <th ng-click=\"sortMe('primary_zip', 'primary_zip')\" class=\"sortable primary_zip\">Zip &nbsp;<i class=\"fa fa-sort\"></i></th>\n" +
    "          <th ng-click=\"sortMe('primary_phone', 'primary_phone')\" class=\"sortable primary_phone\">Work Phone &nbsp;<i class=\"fa fa-sort\"></i></th>\n" +
    "         </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr>\n" +
    "         <td colspan='6' ng-show=\"searchAlert == true\" ng-if=\"empMapList.length > 0\">Please Select a Zone to get employee     </td>\n" +
    "        </tr>\n" +
    "        \n" +
    "        <tr ng-repeat=\"emp in empMapList\" ng-hide=\"searchAlert == true\" ng-click=\"showPopUp(emp.leafletid)\">\n" +
    "           <td class=\"job_title\">{{emp.properties.name}}</td>\n" +
    "           <td>{{emp.properties.address1}}</td>\n" +
    "           <td>{{emp.properties.city}}</td>\n" +
    "           <td>{{emp.properties.state}}</td>\n" +
    "           <td>{{emp.properties.zip}}</td>\n" +
    "           <td>{{emp.properties.phone}}</td>\n" +
    "          </tr>\n" +
    "          \n" +
    "          \n" +
    "         <tr>\n" +
    "          <td colspan='6' ng-if=\"empMapList.length == '0' && searchAlert ==false\">No employees in {{filterTerm.text}} </td>\n" +
    "         </tr>\n" +
    "        </tbody> \n" +
    "        </table>\n" +
    "  </div>    \n" +
    "  <p ng-if=\"empMapList.length > 0\"> Employees Count: {{empMapList.length}}</p>\n" +
    "   \n" +
    "</div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("ct-app/reports/accountActivities/accountActivities.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/accountActivities/accountActivities.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">ACCOUNT ACTIVITY REPORT</h1>\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> The table displays the hours worked per week. You can filter by the Zone, Job, and a date range.</p>\n" +
    "\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-2 \">\n" +
    "                <div  class=\"form-control \" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "           <div class=\"col-sm-2\">\n" +
    "                <div >\n" +
    "                    <input class=\"form-control \" ng-disabled=\"reportFilters.zone=='' || reportFilters.zone==null || reportFilters.zone[0].id =='all'\" ui-select2=\"selectJob\" value=\"\" placeholder=\"Job \" ng-model=\"reportFilters.job\">\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                <div class=\"input-group w-md\">\n" +
    "                    <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select Start Date\" datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.from\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                <div class=\"input-group w-md\">\n" +
    "                    <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select End Date\" datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.to\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2 \">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showSearchErrorMsg\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showSearchErrorMsg\">{{Search_Errmsg}}</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <!--<div class=\"row wrapper\" ng-if=\"show_norecord==1\">\n" +
    "            <div class=\"col-sm-12\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "\n" +
    "        </div>-->\n" +
    "        <div class=\"row wrapper\" ng-if=\"show_norecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"show_norecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"show_norecord==2\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <wj-flex-grid items-source=\"accountDetails\">\n" +
    "                    <wj-flex-grid-column header=\"Date\" is-read-only=\"true\" binding=\"timestamp\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Total Calls\" is-read-only=\"true\" binding=\"totalcalls\" format=\"n0\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "\n" +
    "                </wj-flex-grid>\n" +
    "\n" +
    "                <div class=\"row wrapper\">\n" +
    "                    <wj-menu value=\"accountDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                        <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                    </wj-menu>\n" +
    "                    <div class=\"btn-group col-md-8\" ng-show=\"accountDetails.pageSize > 0\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"accountDetails.pageIndex <= 0\" ng-click=\"accountDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"accountDetails.pageIndex <= 0\" ng-click=\"accountDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{accountDetails.pageIndex+1}} / {{accountDetails.pageCount}} </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"accountDetails.pageIndex >= accountDetails.pageCount - 1\" ng-click=\"accountDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"accountDetails.pageIndex >= accountDetails.pageCount - 1\" ng-click=\"accountDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/activityReports/activityReports.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/activityReports/activityReports.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Activity Reporting</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3 \">              \n" +
    "                <input class=\"form-control \" placeholder=\"Select Job/Employee\" ui-select2=\"Selectfield\" ng-model=\"logFilters.filterName\" >\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <!--<input class=\"form-control \" placeholder=\"Select zone\" ng-disabled=\"logFilters.filterName== '' || logFilters.filterName.id== 'all' \" ui-select2=\"selectZoneOptions\" value=\"\" ng-model=\"logFilters.zoneName\"> -->\n" +
    "                <div class=\"form-control \" placeholder=\"Select zone\" ng-disabled=\"logFilters.filterName.id== 'all' \" ui-select2=\"selectZoneOptions\" value=\"\" ng-model=\"logFilters.zoneName\"></div>\n" +
    "            </div>\n" +
    "            \n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input class=\"form-control \" placeholder=\"Select Value\" ui-select2=\"getFilterValue\" ng-model=\"logFilters.filterValue\" ng-disabled=\"logFilters.zoneName==null ||logFilters.zoneName=='' || logFilters.zoneName[0].id =='all' ||logFilters.filterName.id=='all' || logFilters.filterName==''\">\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\" >\n" +
    "                <input class=\"form-control \" ui-select2=\"selectCallStatus\" value=\"\" placeholder=\"Select Call Status\" ng-model=\"logFilters.callStatus\">\n" +
    "            </div>\n" +
    "            \n" +
    "        </div>\n" +
    "         <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "            </div>\n" +
    "             <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                     <div class=\"col-sm-4\"  ng-if=\"show_download_loader\" >\n" +
    "                    <div ng-if=\"show_download_loader\" show-loader=\"show_download_loader\"></div>\n" +
    "                    </div>\n" +
    "                     <a ng-disabled=\"noRecord==1\" download=\"ActivityReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                    <a ng-disabled=\"noRecord==1\" class=\"btn btn-md btn-info\"  ng-click=\"downloadpdf()\">Download PDF</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "         </div>\n" +
    "      \n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"calllogListDetail\">\n" +
    "                <wj-flex-grid-column header=\"Employee \" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Log Type\" is-read-only=\"true\" binding=\"log_type\"> </wj-flex-grid-column>\n" +
    "\n" +
    "                <wj-flex-grid-column header=\"Work Duration\" is-read-only=\"true\" binding=\"call_duriation\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Date\" is-read-only=\"true\" binding=\"timestamp\"> </wj-flex-grid-column>\n" +
    "                 <wj-flex-grid-column header=\"Phone Number\" is-read-only=\"true\" binding=\"phone_number\"> </wj-flex-grid-column>\n" +
    "                  <wj-flex-grid-column header=\"Call Status\" is-read-only=\"true\" binding=\"call_status\"> </wj-flex-grid-column>\n" +
    "               \n" +
    "               \n" +
    "            <wj-flex-grid-column header=\"Entered By\" is-read-only=\"true\" binding=\"created_by\"> </wj-flex-grid-column>\n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"calllogListDetail.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"calllogListDetail.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex <= 0\" ng-click=\"calllogListDetail.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{calllogListDetail.pageIndex+1}} / {{calllogListDetail.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"calllogListDetail.pageIndex >= calllogListDetail.pageCount - 1\" ng-click=\"calllogListDetail.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>  \n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "      \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/authorizedVsActuall/authorizedVsActuall.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/authorizedVsActuall/authorizedVsActuall.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Authorized Vs Actual Report</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Job\" ui-select2=\"selectJob\" ng-model=\"reportFilters.job\" ng-disabled=\"reportFilters.zone==null || reportFilters.zone=='' || reportFilters.zone[0].id =='all'\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    \n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"AuthorizedVsActualReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                    \n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "           \n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\"  items-source=\"AuthorizedDetails\">\n" +
    "                 <wj-flex-grid-column header=\"Date (Auth END DATE)\" is-read-only=\"true\" binding=\"endDate\"  width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Zone\" is-read-only=\"true\" binding=\"zone\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Payor\" is-read-only=\"true\" binding=\"payor\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Authorized Hours\" is-read-only=\"true\" binding=\"authorizedHours\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Total Authorized\" is-read-only=\"true\" binding=\"totalauthorizedHours\"> </wj-flex-grid-column>\n" +
    "                 <wj-flex-grid-column header=\"Hours Used\" is-read-only=\"true\" binding=\"hoursUsed\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Hours Remaining\" is-read-only=\"true\" binding=\"hoursRemaining\"  ng-style=\"{color:getAmountColor($item.hoursRemainingNo)}\" > </wj-flex-grid-column>\n" +
    "                \n" +
    "                 \n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"AuthorizedDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"AuthorizedDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"AuthorizedDetails.pageIndex <= 0\" ng-click=\"AuthorizedDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"AuthorizedDetails.pageIndex <= 0\" ng-click=\"AuthorizedDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{AuthorizedDetails.pageIndex+1}} / {{AuthorizedDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"AuthorizedDetails.pageIndex >= AuthorizedDetails.pageCount - 1\" ng-click=\"AuthorizedDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"AuthorizedDetails.pageIndex >= AuthorizedDetails.pageCount - 1\" ng-click=\"AuthorizedDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>  \n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "      \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/dailyHoursChart/dailyHoursChart.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/dailyHoursChart/dailyHoursChart.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\"> Daily Hours Chart</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\" >\n" +
    "\n" +
    "    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> View the aggregated hours of work per day. You can filter by the Zone, Employee, and a date range.</p>\n" +
    "\n" +
    "    <div class=\"panel panel-default\">\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-2 \">\n" +
    "               \n" +
    "                    <div class=\"form-control \" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col-sm-2\">\n" +
    "\n" +
    "\n" +
    "                <div >\n" +
    "                    <input class=\"form-control \" ng-disabled=\"reportFilters.zone=='' || reportFilters.zone==null || reportFilters.zone[0].id =='all'\" ui-select2=\"selectEmployee\" value=\"\" placeholder=\"Select Employee\" ng-model=\"reportFilters.employee\">\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col-sm-3\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                <div class=\"input-group w-md\">\n" +
    "                    <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select Start Date\" datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.from\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                <div class=\"input-group w-md\">\n" +
    "                    <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select End Date\" datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.to\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2 \">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showSearchErrorMsg\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showSearchErrorMsg\">{{Search_Errmsg}}</span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "         <div class=\"row wrapper\" ng-if=\"show_norecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"show_norecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"show_norecord==2\">\n" +
    "            <wj-flex-chart class=\"custom-flex-chart\" items-source=\"chartResult\" binding-x=\"dateclockin\" chart-type=\"SplineSymbols\">\n" +
    "\n" +
    "                <wj-flex-chart-axis wj-property=\"axisX\" axis-line=\"true\" major-grid=\"true\" label-Angle=\"45\">\n" +
    "                </wj-flex-chart-axis>\n" +
    "\n" +
    "                <wj-flex-chart-axis wj-property=\"axisY\" axis-line=\"false\" major-grid=\"true\">\n" +
    "\n" +
    "                </wj-flex-chart-axis>\n" +
    "\n" +
    "                <wj-flex-chart-series name=\"Hrs. Worked per Day\" binding=\"regularhours\"></wj-flex-chart-series>\n" +
    "\n" +
    "                <wj-flex-chart-legend position=\"Bottom\"></wj-flex-chart-legend>\n" +
    "\n" +
    "            </wj-flex-chart>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/employeeList/employeeList.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/employeeList/employeeList.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Employee List</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            \n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select Zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input class=\"form-control \" ui-select2=\"Selectfield\" value=\"\" placeholder=\"Select Field\" ng-model=\"reportFilters.field\">\n" +
    "            </div>\n" +
    "          \n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                   \n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"EmployeeList.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                    \n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"EmployeeDetails\">\n" +
    "                 <wj-flex-grid-column header=\"Employee Code\" is-read-only=\"true\" binding=\"access_code\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Agency Emp ID\" is-read-only=\"true\" binding=\"agency_empid\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Employee Name\" is-read-only=\"true\" binding=\"employee_name\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Address line 1\" is-read-only=\"true\" binding=\"primary_address1\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"City\" is-read-only=\"true\" binding=\"primary_city\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"State\" is-read-only=\"true\" binding=\"primary_state\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Zip\" is-read-only=\"true\" binding=\"primary_zip\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Birthday\" is-read-only=\"true\" binding=\"birth_date\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Zone\" is-read-only=\"true\" binding=\"zone_detail\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Employee Level\" is-read-only=\"true\" binding=\"is_supervisor\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Work Phone\" is-read-only=\"true\" binding=\"primary_phone\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Current Status\" is-read-only=\"true\" binding=\"status\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Created Date\" is-read-only=\"true\" binding=\"created_on\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Last Clocked IN\" is-read-only=\"true\" binding=\"last_clocked_in_date\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Last Scheduled\" is-read-only=\"true\" binding=\"last_scheduled_date\"> </wj-flex-grid-column>\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"EmployeeDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"EmployeeDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex <= 0\" ng-click=\"EmployeeDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex <= 0\" ng-click=\"EmployeeDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{EmployeeDetails.pageIndex+1}} / {{EmployeeDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex >= EmployeeDetails.pageCount - 1\" ng-click=\"EmployeeDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex >= EmployeeDetails.pageCount - 1\" ng-click=\"EmployeeDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/employeeTimecard/employeeTimecard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/employeeTimecard/employeeTimecard.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Timecard Report by Employee</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input class=\"form-control \" placeholder=\"Select Employee\" ui-select2=\"selectEmployee\" ng-model=\"reportFilters.employee\" ng-disabled=\"reportFilters.zone==null || reportFilters.zone=='' || reportFilters.zone[0].id =='all'\">\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    <div class=\"col-sm-4\" ng-if=\"show_download_loader\">\n" +
    "                        <div ng-if=\"show_download_loader\" show-loader=\"show_download_loader\"></div>\n" +
    "                    </div>\n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"EmpTimeCardReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                    <a ng-disabled=\"noRecord==1\" class=\"btn btn-md btn-info\" ng-click=\"downloadpdf()\">Download PDF</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <!--<div class=\"row wrapper\" ng-if=\"noRecord==1\">\n" +
    "            <div class=\"col-sm-12\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "\n" +
    "        </div>-->\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"EmployeeDetails\">\n" +
    "                <!--<wj-flex-grid-column header=\"Employee Code\" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column> -->\n" +
    "                <wj-flex-grid-column header=\"Employee\" is-read-only=\"true\" binding=\"employee_name\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_name\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Clock In\" is-read-only=\"true\" binding=\"clockin\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Clock Out\" is-read-only=\"true\" binding=\"clockout\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Total Hours\" is-read-only=\"true\" binding=\"work_duration_non_rounded_number\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"(h m)\" is-read-only=\"true\" binding=\"work_duration_formated\" format=\"n2\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Total Hrs(Rounded)\" is-read-only=\"true\" binding=\"work_duration_rounded_number\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"(h m)\" is-read-only=\"true\" binding=\"work_duration_rounded_formated\" format=\"n2\"> </wj-flex-grid-column>\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"EmployeeDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"EmployeeDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex <= 0\" ng-click=\"EmployeeDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex <= 0\" ng-click=\"EmployeeDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{EmployeeDetails.pageIndex+1}} / {{EmployeeDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex >= EmployeeDetails.pageCount - 1\" ng-click=\"EmployeeDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex >= EmployeeDetails.pageCount - 1\" ng-click=\"EmployeeDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/employeeWeeklyHours/employeeWeeklyHours.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/employeeWeeklyHours/employeeWeeklyHours.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\"> Employee Weekly Hours Report</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "\n" +
    "    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> The table displays the hours worked per week. You can filter by the Zone, Employee, and a date range.</p>\n" +
    "\n" +
    "    <div class=\"panel panel-default\">\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3 \">\n" +
    "                \n" +
    "                    <div class=\"form-control \" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" ng-disabled=\"reportFilters.zone=='' || reportFilters.zone==null ||reportFilters.zone[0].id =='all'\" ui-select2=\"selectEmployee\" value=\"\" placeholder=\"Select Employee \" ng-model=\"reportFilters.employee\">\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col-sm-3\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                <div class=\"input-group w-md\">\n" +
    "                    <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select Start Date\" datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.from\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                <div class=\"input-group w-md\">\n" +
    "                    <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select End Date\" datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.to\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "           \n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" >\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                 <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showSearchErrorMsg\">{{Search_Errmsg}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    \n" +
    "                    <a ng-disabled=\"show_norecord==1\" download=\"EmpWeeklyHrsReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"show_norecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"show_norecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"show_norecord==2\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"EmpReport\">\n" +
    "                    <wj-flex-grid-column header=\"Employee Name\" is-read-only=\"true\" binding=\"empname\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Regular Hours\" is-read-only=\"true\" binding=\"regularhours\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Over 40 Hours\" is-read-only=\"true\" binding=\"overhours\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Total Hours\" is-read-only=\"true\" binding=\"totalhours\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Week\" is-read-only=\"true\" binding=\"weekno\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Week Start\" is-read-only=\"true\" binding=\"weekstart\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Week End\" is-read-only=\"true\" binding=\"weekend\"> </wj-flex-grid-column>\n" +
    "                </wj-flex-grid>\n" +
    "\n" +
    "                <div class=\"row wrapper\">\n" +
    "                    <wj-menu value=\"EmpReport.pageSize\" header=\"Rows per Page\">\n" +
    "                        <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                    </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                    <div class=\"btn-group col-md-8\" ng-show=\"EmpReport.pageSize > 0\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmpReport.pageIndex <= 0\" ng-click=\"EmpReport.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmpReport.pageIndex <= 0\" ng-click=\"EmpReport.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{EmpReport.pageIndex+1}} / {{EmpReport.pageCount}} </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmpReport.pageIndex >= EmpReport.pageCount - 1\" ng-click=\"EmpReport.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmpReport.pageIndex >= EmpReport.pageCount - 1\" ng-click=\"EmpReport.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/inactivityEmployees/inactivityEmployees.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/inactivityEmployees/inactivityEmployees.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Inactive Employee List <span  ng-if=\"startDate && endDate\"> {{startDate}} - {{ endDate }} </span></h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "             <div class=\"col-sm-3\">\n" +
    "                <div  class=\"form-control \" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input class=\"form-control \" placeholder=\"Search Text\" value=\"\" ng-model=\"reportFilters.searchtxt\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "           <!-- <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                 <a ng-disabled=\"noRecord==1\" download=\"InActivityEmployee.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "\n" +
    "            </div>-->\n" +
    "           \n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" >\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <span ng-if=\"showerrorMsg\" class=\"alert alert-danger\">{{error_msg}}</span>\n" +
    "          \n" +
    "                 <a ng-disabled=\"noRecord==1\" download=\"jobNoSchedule.xlsx\" class=\"btn btn-md btn-info pull-right\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"EmployeeDetails\">\n" +
    "                <!--<wj-flex-grid-column format=\"none\" header=\"Employee Code\" is-read-only=\"true\" binding=\"access_code\"> </wj-flex-grid-column> -->\n" +
    "                <wj-flex-grid-column header=\"Employee Name\" is-read-only=\"true\" binding=\"employee_name\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"State\" is-read-only=\"true\" binding=\"primary_state\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"City\" is-read-only=\"true\" binding=\"primary_city\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Zone Name\" is-read-only=\"true\" binding=\"zone_detail\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Last active date\" is-read-only=\"true\" binding=\"lastActive\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Status\" is-read-only=\"true\" binding=\"status\"> </wj-flex-grid-column>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"EmployeeDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"EmployeeDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex <= 0\" ng-click=\"EmployeeDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex <= 0\" ng-click=\"EmployeeDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{EmployeeDetails.pageIndex+1}} / {{EmployeeDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex >= EmployeeDetails.pageCount - 1\" ng-click=\"EmployeeDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex >= EmployeeDetails.pageCount - 1\" ng-click=\"EmployeeDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/jobList/jobList.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/jobList/jobList.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Job List</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            \n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select Zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\"></div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input class=\"form-control \" ui-select2=\"Selectfield\" value=\"\" placeholder=\"Select Field\" ng-model=\"reportFilters.field\">\n" +
    "            </div>\n" +
    "          \n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                   \n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"JobList.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                    \n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"JobDetails\">\n" +
    "                 <wj-flex-grid-column header=\"Job Code\" is-read-only=\"true\" binding=\"job_code\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Name\" is-read-only=\"true\" binding=\"job_name\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Address line 1\" is-read-only=\"true\" binding=\"job_address1\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"City\" is-read-only=\"true\" binding=\"job_city\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"State\" is-read-only=\"true\" binding=\"job_state\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Zip\" is-read-only=\"true\" binding=\"job_zip\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Authorized Phone\" is-read-only=\"true\" binding=\"authorized_phone_format\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Current Status\" is-read-only=\"true\" binding=\"status\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Created Date\" is-read-only=\"true\" binding=\"created_on\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Last Clocked IN\" is-read-only=\"true\" binding=\"last_clocked_in_date\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Last Scheduled\" is-read-only=\"true\" binding=\"last_scheduled_date\"> </wj-flex-grid-column>\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"JobDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"JobDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex <= 0\" ng-click=\"JobDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex <= 0\" ng-click=\"JobDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{JobDetails.pageIndex+1}} / {{JobDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex >= JobDetails.pageCount - 1\" ng-click=\"JobDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex >= JobDetails.pageCount - 1\" ng-click=\"JobDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/jobNoSchedule/jobNoSchedule.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/jobNoSchedule/jobNoSchedule.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Jobs List without Schedule <span  ng-if=\"startDate && endDate\"> {{startDate }} - {{ endDate }} </span></h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div  class=\"form-control \" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input class=\"form-control \" placeholder=\"Search Text\" value=\"\" ng-model=\"reportFilters.searchtxt\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <!--<div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                 <a ng-disabled=\"noRecord==1\" download=\"jobNoSchedule.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "\n" +
    "            </div>-->\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" >\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-10\">\n" +
    "                <span ng-if=\"showerrorMsg\" class=\"alert alert-danger\">{{error_msg}}</span>\n" +
    "          \n" +
    "                 <a ng-disabled=\"noRecord==1\" download=\"jobNoSchedule.xlsx\" class=\"btn btn-md btn-info pull-right\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"JobDetails\">\n" +
    "                <!--<wj-flex-grid-column header=\"Job Code\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column> -->\n" +
    "                <wj-flex-grid-column header=\"Job Name\" is-read-only=\"true\" binding=\"job_name\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Zone Name\" is-read-only=\"true\" binding=\"zone_name\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Contact Name\" is-read-only=\"true\" binding=\"contact_name\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Authorized Phone\" is-read-only=\"true\" binding=\"authorized_phone_format\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Last active date\" is-read-only=\"true\" binding=\"lastActive\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Status\" is-read-only=\"true\" binding=\"status\"> </wj-flex-grid-column>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"JobDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"JobDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex <= 0\" ng-click=\"JobDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex <= 0\" ng-click=\"JobDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{JobDetails.pageIndex+1}} / {{JobDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex >= JobDetails.pageCount - 1\" ng-click=\"JobDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex >= JobDetails.pageCount - 1\" ng-click=\"JobDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/jobObservation/jobObservation.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/jobObservation/jobObservation.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Job Observation Report</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Job\" ui-select2=\"selectJob\" ng-model=\"reportFilters.job\" ng-disabled=\"reportFilters.zone=='' || reportFilters.zone==null|| reportFilters.zone[0].id =='all'\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "             <div class=\"pull-right\">\n" +
    "                   \n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"JobObservationReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"ObservationDetails\">\n" +
    "                <wj-flex-grid-column header=\"Employee\" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Observation\" is-read-only=\"true\" binding=\"obv_id\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Comment\" is-read-only=\"true\" binding=\"comment\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Created Date\" is-read-only=\"true\" binding=\"created_date\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Modified Date\" is-read-only=\"true\" binding=\"modified_date\"> </wj-flex-grid-column>\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"ObservationDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"ObservationDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"ObservationDetails.pageIndex <= 0\" ng-click=\"ObservationDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"ObservationDetails.pageIndex <= 0\" ng-click=\"ObservationDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{ObservationDetails.pageIndex+1}} / {{ObservationDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"ObservationDetails.pageIndex >= ObservationDetails.pageCount - 1\" ng-click=\"ObservationDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"ObservationDetails.pageIndex >= ObservationDetails.pageCount - 1\" ng-click=\"ObservationDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>  \n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "      \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/jobTask/jobTask.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/jobTask/jobTask.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Job Task Report</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Job\" ui-select2=\"selectJob\" ng-model=\"reportFilters.job\" ng-disabled=\"reportFilters.zone=='' || reportFilters.zone==null || reportFilters.zone[0].id =='all'\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\"pull-right\">\n" +
    "                   \n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"JobTaskReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"TaskDetails\">\n" +
    "                <wj-flex-grid-column header=\"Employee\" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"job_code\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Task\" is-read-only=\"true\" binding=\"task_code\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Duration\" format=\"n2\" aggregate=\"Sum\" is-read-only=\"true\" binding=\"duration\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Created Date\" is-read-only=\"true\" binding=\"created_date\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Modified Date\" is-read-only=\"true\" binding=\"modified_date\"> </wj-flex-grid-column>\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"TaskDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"TaskDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"TaskDetails.pageIndex <= 0\" ng-click=\"TaskDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"TaskDetails.pageIndex <= 0\" ng-click=\"TaskDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{TaskDetails.pageIndex+1}} / {{TaskDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"TaskDetails.pageIndex >= TaskDetails.pageCount - 1\" ng-click=\"TaskDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"TaskDetails.pageIndex >= TaskDetails.pageCount - 1\" ng-click=\"TaskDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>  \n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "      \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/jobTimecard/jobTimecard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/jobTimecard/jobTimecard.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Timecard Report by Job</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Job\" ui-select2=\"selectJob\" ng-model=\"reportFilters.job\" ng-disabled=\"reportFilters.zone==null || reportFilters.zone=='' || reportFilters.zone[0].id =='all'\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    <div class=\"col-sm-4\"  ng-if=\"show_download_loader\" >\n" +
    "                    <div ng-if=\"show_download_loader\" show-loader=\"show_download_loader\"></div>\n" +
    "                    </div>\n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"JobTimeCardReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "\n" +
    "                    <a ng-disabled=\"noRecord==1\" class=\"btn btn-md btn-info\"  ng-click=\"downloadpdf()\">Download PDF</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"JobDetails\">\n" +
    "               <!-- <wj-flex-grid-column header=\"Job Code \" is-read-only=\"true\" binding=\"job_name\"> </wj-flex-grid-column> -->\n" +
    "                  <wj-flex-grid-column header=\"Job Name\" is-read-only=\"true\" binding=\"job_name\"  width=\"*\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Employee Name\" is-read-only=\"true\" binding=\"employee_name\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Clock In\" is-read-only=\"true\" binding=\"clockin\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Clock Out\" is-read-only=\"true\" binding=\"clockout\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Total Hours\" is-read-only=\"true\" binding=\"work_duration_non_rounded_number\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                 <wj-flex-grid-column header=\"(h m)\" is-read-only=\"true\" binding=\"work_duration_formated\" format=\"n2\" > </wj-flex-grid-column>\n" +
    "                 <wj-flex-grid-column header=\"Total Hrs(Rounded)\" is-read-only=\"true\" binding=\"work_duration_rounded_number\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                  <wj-flex-grid-column header=\"(h m)\" is-read-only=\"true\" binding=\"work_duration_rounded_formated\" format=\"n2\" > </wj-flex-grid-column>\n" +
    "                 <wj-flex-grid-column header=\"Activity\" is-read-only=\"true\" binding=\"activities\"> </wj-flex-grid-column>\n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"JobDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"JobDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex <= 0\" ng-click=\"JobDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex <= 0\" ng-click=\"JobDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{JobDetails.pageIndex+1}} / {{JobDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex >= JobDetails.pageCount - 1\" ng-click=\"JobDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"JobDetails.pageIndex >= JobDetails.pageCount - 1\" ng-click=\"JobDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>  \n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "      \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/jobWeeklyHours/jobWeeklyHours.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/jobWeeklyHours/jobWeeklyHours.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\"> Job Weekly Hours Report</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "\n" +
    "    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> The table displays the hours worked per week. You can filter by the Zone, Job, and a date range.</p>\n" +
    "\n" +
    "    <div class=\"panel panel-default\">\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3 \">\n" +
    "                <div class=\"form-control \" ui-select2=\"selectzone\" value=\"\" placeholder=\"Select Zone\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" ng-disabled=\"reportFilters.zone==''|| reportFilters.zone==null || reportFilters.zone[0].id =='all'\" ui-select2=\"selectJob\" value=\"\" placeholder=\" Select Job \" ng-model=\"reportFilters.job\">\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col-sm-3\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                <div class=\"input-group w-md\">\n" +
    "                    <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select Start Date\"\n" +
    " datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.from\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                <div class=\"input-group w-md\">\n" +
    "                    <input type=\"text\" class=\"form-control\" readonly placeholder=\"Select End Date\"\n" +
    " datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.to\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                    <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "        </div>\n" +
    "         <div class=\"row wrapper\" >\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showSearchErrorMsg\">{{Search_Errmsg}}</span>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    \n" +
    "                    <a ng-disabled=\"show_norecord==1\" download=\"JobWeeklyHrsReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"show_norecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"show_norecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"show_norecord==2\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"jobWeeklyDetail\">\n" +
    "                    <wj-flex-grid-column header=\"Job Name\" is-read-only=\"true\" binding=\"jobname\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Scheduled Hours\" is-read-only=\"true\" binding=\"scheduledhours\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Worked Hours\" is-read-only=\"true\" binding=\"workedhours\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Difference\" is-read-only=\"true\" binding=\"remaininghours\" format=\"n2\" ng-style=\"{color:getAmountColor($item.remaininghours)}\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Week\" is-read-only=\"true\" binding=\"weekno\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Week Start\" is-read-only=\"true\" binding=\"weekstart\"> </wj-flex-grid-column>\n" +
    "                    <wj-flex-grid-column header=\"Week End\" is-read-only=\"true\" binding=\"weekend\"> </wj-flex-grid-column>\n" +
    "                </wj-flex-grid>\n" +
    "\n" +
    "                <div class=\"row wrapper\">\n" +
    "                    <wj-menu value=\"jobWeeklyDetail.pageSize\" header=\"Rows per Page\">\n" +
    "                        <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                        <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                    </wj-menu>\n" +
    "\n" +
    "                    <div class=\"btn-group col-md-8\" ng-show=\"jobWeeklyDetail.pageSize > 0\">\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"jobWeeklyDetail.pageIndex <= 0\" ng-click=\"jobWeeklyDetail.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"jobWeeklyDetail.pageIndex <= 0\" ng-click=\"jobWeeklyDetail.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{jobWeeklyDetail.pageIndex+1}} / {{jobWeeklyDetail.pageCount}} </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"jobWeeklyDetail.pageIndex >= jobWeeklyDetail.pageCount - 1\" ng-click=\"jobWeeklyDetail.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                        <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"jobWeeklyDetail.pageIndex >= jobWeeklyDetail.pageCount - 1\" ng-click=\"jobWeeklyDetail.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/mapReport/mapReport.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/mapReport/mapReport.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Mobile Map Report</h1>\n" +
    "</div>\n" +
    "\n" +
    "<!--<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\"> -->\n" +
    "<div class=\"row wrapper\">\n" +
    "    <div class=\"col-sm-3\">\n" +
    "        <div class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\">\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-3\">\n" +
    "        <div>\n" +
    "            <input class=\"form-control \" placeholder=\"Select Job\" ui-select2=\"selectJob\" ng-model=\"reportFilters.job\" ng-disabled=\"reportFilters.zone==null || reportFilters.zone=='' || reportFilters.zone[0].id =='all'\">\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-3\">\n" +
    "\n" +
    "        <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "            <div class=\"input-group\">\n" +
    "                <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-3\">\n" +
    "\n" +
    "        <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "            <div class=\"input-group\">\n" +
    "                <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row wrapper\">\n" +
    "    <div class=\"col-sm-6\">\n" +
    "        <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"getRecords()\">Search</button>\n" +
    "        <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "        <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"row wrapper\">\n" +
    "    <div class=\"col-sm-12\" style=\"position: relative; height: 500px\">\n" +
    "        <div id='map'></div>\n" +
    "        <div id='directions'>\n" +
    "            <div id=\"newroutes\">\n" +
    "                <h4 ng-if=\"jobsMapListSelected.properties\"> Distance from Job [{{jobsMapListSelected.properties.code}}] - {{jobsMapListSelected.properties.name}}, {{jobsMapListSelected.properties.city}}, {{jobsMapListSelected.properties.state}}, {{jobsMapListSelected.properties.zip}} </h4>\n" +
    "                <div class=\"newroute\" ng-repeat=\"detail in newdetails.employee\" id=\"newrouteItems\">\n" +
    "                    <div>\n" +
    "                        <span ng-if=\"detail.properties.jobcode\">{{detail.properties.jobcode}}</span>\n" +
    "                        <span ng-if=\"detail.properties.empcode\">, {{detail.properties.empcode}}</span>\n" +
    "                        <span ng-if=\"detail.properties.timestamp\">, {{detail.properties.timestamp}}</span>\n" +
    "                        <span ng-if=\"detail.properties.logtype\">, {{detail.properties.logtype}}</span>\n" +
    "                    </div>\n" +
    "                    <div class=\"routeSummary\" ng-if=\"detail.route.summary\">Route summary: {{detail.route.summary}}</div>\n" +
    "                    <div class=\"routeDistDur\" ng-if=\"detail.route.distdur\">\n" +
    "                        Dist &amp; Duration: {{detail.route.distdur}}\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-sm-12\">\n" +
    "\n" +
    "        <div class=\"table-responsive\">\n" +
    "\n" +
    "            <table class=\"table table-striped b-t b-light\">\n" +
    "\n" +
    "                <thead ng-hide=\"searchAlert == true\">\n" +
    "                    <tr>\n" +
    "\n" +
    "                        <th ng-click=\"sortMe('job_code', 'job_code')\" class=\"sortable job_code\">Job &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th ng-click=\"sortMe('employee_code', 'employee_code')\" class=\"sortable employee_code\">Employee &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th ng-click=\"sortMe('timestamp', 'timestamp')\" class=\"sortable timestamp\">Timestamp &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th ng-click=\"sortMe('log_type', 'log_type')\" class=\"sortable log_type\">Log Type &nbsp;<i class=\"fa fa-sort\"></i>\n" +
    "                        </th>\n" +
    "                        <th >Location</th>\n" +
    "\n" +
    "                    </tr>\n" +
    "                </thead>\n" +
    "                <tbody>\n" +
    "                    <tr>\n" +
    "                        <td colspan='6' ng-show=\"searchAlert == true\" ng-if=\"logMapList.length > 0\">Please Select a Zone to get list </td>\n" +
    "                    </tr>\n" +
    "\n" +
    "                    <tr ng-repeat=\"emp in logMapList\" ng-hide=\"searchAlert == true\" ng-click=\"showPopUp(emp.leafletid)\">\n" +
    "                        <td class=\"job_title\">{{emp.properties.jobcode}}</td>\n" +
    "                        <td>{{emp.properties.empcode}}</td>\n" +
    "                        <td>{{emp.properties.timestamp}}</td>\n" +
    "                        <td>{{emp.properties.logtype}}</td>\n" +
    "                        <td><a ng-href=\"{{emp.properties.location}}\" class=\"btn btn-sm btn-info\" target=\"_blank\">Click here to View</a></td>\n" +
    "\n" +
    "                    </tr>\n" +
    "\n" +
    "\n" +
    "                    <tr>\n" +
    "                        <td colspan='6' ng-if=\"logMapList.length == '0' && searchAlert ==false\">No Logs in {{reportFilters.job.text}} </td>\n" +
    "                    </tr>\n" +
    "                </tbody>\n" +
    "            </table>\n" +
    "        </div>\n" +
    "        <p ng-if=\"logMapList.length > 0\"> Employees Count: {{logMapList.length}}</p>\n" +
    "\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<!--  </div>\n" +
    "</div> -->");
}]);

angular.module("ct-app/reports/scheduleReport/scheduleReport.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/scheduleReport/scheduleReport.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Schedule Reporting</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-2\">\n" +
    "\n" +
    "                <input class=\"form-control \" ui-select2=\"Selectfield\" value=\"\" placeholder=\"Select Field\" ng-model=\"reportFilters.field\">\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select Zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "            <div class=\"col-sm-2\">\n" +
    "                <input class=\"form-control \" ng-disabled=\"reportFilters.zone == null || reportFilters.zone == ''|| reportFilters.field == '' || reportFilters.field.id=='startDate' || reportFilters.zone[0].id =='all'\" ui-select2=\"selectValue\" value=\"\" placeholder=\"Select Value\" ng-model=\"reportFilters.field_value\">\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    <div class=\"col-sm-4\" ng-if=\"show_download_loader\">\n" +
    "                        <div ng-if=\"show_download_loader\" show-loader=\"show_download_loader\"></div>\n" +
    "                    </div>\n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"ScheduleReporting.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "                    <a ng-disabled=\"noRecord==1\" class=\"btn btn-md btn-info\" ng-click=\"downloadpdf()\">Download PDF</a>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"EmployeeDetails\">\n" +
    "                <!--<wj-flex-grid-column header=\"Employee Code\" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column> -->\n" +
    "                <wj-flex-grid-column header=\"Employee Name\" is-read-only=\"true\" binding=\"employee_name\" width=\"*\"> </wj-flex-grid-column>\n" +
    "                <!--<wj-flex-grid-column header=\"Job Code\" is-read-only=\"true\" binding=\"job_id\"> </wj-flex-grid-column> -->\n" +
    "                <wj-flex-grid-column header=\"Job Name\" is-read-only=\"true\" binding=\"job_name\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Start Date\" is-read-only=\"true\" binding=\"ref_in_at\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Start Time\" is-read-only=\"true\" binding=\"startTime\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"End Date\" is-read-only=\"true\" binding=\"endDate\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"End Time\" is-read-only=\"true\" binding=\"endTime\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Total Hours\" is-read-only=\"true\" binding=\"duriation\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"EmployeeDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"EmployeeDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex <= 0\" ng-click=\"EmployeeDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex <= 0\" ng-click=\"EmployeeDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{EmployeeDetails.pageIndex+1}} / {{EmployeeDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex >= EmployeeDetails.pageCount - 1\" ng-click=\"EmployeeDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"EmployeeDetails.pageIndex >= EmployeeDetails.pageCount - 1\" ng-click=\"EmployeeDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/scheduleVsActuall/scheduleVsActuall.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/scheduleVsActuall/scheduleVsActuall.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\"> Actual vs Scheduled Report</h1>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-3\">\n" +
    "            \n" +
    "                <div  class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\"></div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div>\n" +
    "                    <input class=\"form-control \" placeholder=\"Select Job\" ui-select2=\"selectJob\" ng-model=\"reportFilters.job\"  ng-disabled=\"reportFilters.zone==null || reportFilters.zone=='' || reportFilters.zone[0].id =='all'\">\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\"pull-right\">\n" +
    "                   \n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"ActualvsScheduledReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            \n" +
    "            \n" +
    "\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"ScheduleActuallDetails\">\n" +
    "                <wj-flex-grid-column header=\"Date\" is-read-only=\"true\" binding=\"date\"> </wj-flex-grid-column>\n" +
    "                  <wj-flex-grid-column header=\"Job\" is-read-only=\"true\" binding=\"jobDetail\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Scheduled Employee\" is-read-only=\"true\" binding=\"scheduleEmployee\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Actual Employee\" is-read-only=\"true\" binding=\"actuallemployeeDetail\" > </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Scheduled Start\" is-read-only=\"true\" binding=\"scheduleStart\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Scheduled End\" is-read-only=\"true\" binding=\"scheduleEnd\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Scheduled Duration\" is-read-only=\"true\" binding=\"scheduleDuration\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Actual Start\" is-read-only=\"true\" binding=\"actuallStart\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Actual End\" is-read-only=\"true\" binding=\"actuallEnd\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Actual Duration\" is-read-only=\"true\" binding=\"actuallDuration\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column  header=\"Variance\" is-read-only=\"true\" binding=\"variance\" ng-style=\"{color:getVarianceColor($item.variance)}\"> </wj-flex-grid-column>\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"ScheduleActuallDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"ScheduleActuallDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"ScheduleActuallDetails.pageIndex <= 0\" ng-click=\"ScheduleActuallDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"ScheduleActuallDetails.pageIndex <= 0\" ng-click=\"ScheduleActuallDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{ScheduleActuallDetails.pageIndex+1}} / {{ScheduleActuallDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"ScheduleActuallDetails.pageIndex >= ScheduleActuallDetails.pageCount - 1\" ng-click=\"ScheduleActuallDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"ScheduleActuallDetails.pageIndex >= ScheduleActuallDetails.pageCount - 1\" ng-click=\"ScheduleActuallDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>  \n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "      \n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/reports/timecardExport/timecardExport.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/reports/timecardExport/timecardExport.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">Timecard Export Report</h1>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"wrapper-md\">\n" +
    "    <div class=\"panel panel-default\">\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                SELECT FIELDS TO DISPLAY IN REPORT\n" +
    "             </div>\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <table class=\"table borderless\" ct-table-sort=\"sortField\" sort-order=\"sortType\" callback=\"applyProgramSort()\">\n" +
    "                   <tbody>\n" +
    "                        <tr>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.agencyid\">\n" +
    "                                    <i></i> Agency ID\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empzone\">\n" +
    "                                    <i></i> Emp zone\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empname\">\n" +
    "                                    <i></i> Emp Name\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.level\">\n" +
    "                                    <i></i> Emp Level\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.skill\">\n" +
    "                                    <i></i> Emp Skill\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empstatus\">\n" +
    "                                    <i></i> Emp Status\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            \n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empext1\">\n" +
    "                                    <i></i> Emp Ext 1\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empext2\">\n" +
    "                                    <i></i> Emp Ext 2\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empext3\">\n" +
    "                                    <i></i> Emp Ext 3\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empaddress1\">\n" +
    "                                    <i></i> Emp Address \n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empaddress2\">\n" +
    "                                    <i></i> Emp Address 2 \n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empcity\">\n" +
    "                                    <i></i> Emp City \n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empstate\">\n" +
    "                                    <i></i> Emp State \n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.empzip\">\n" +
    "                                    <i></i> Emp Zip \n" +
    "                                </label>\n" +
    "                            </td>  \n" +
    "                        </tr>\n" +
    "                        <tr> \n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.roundedhrs\">\n" +
    "                                    <i></i> Rounded Hrs\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.jobzone\">\n" +
    "                                    <i></i> Job Zone\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.jobname\">\n" +
    "                                    <i></i> Job Name\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.contact\">\n" +
    "                                    <i></i> Job Contact\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.Service\">\n" +
    "                                    <i></i> Job Service\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                       \n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.jobstatus\">\n" +
    "                                    <i></i> Job Status\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.jobpaytype\">\n" +
    "                                    <i></i> Pay Type\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                        <tr>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.jobgroup\">\n" +
    "                                    <i></i> Job Group\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.jobext1\">\n" +
    "                                    <i></i> Job Ext 1\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.jobext2\">\n" +
    "                                    <i></i> Job Ext 2\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "                            <td>\n" +
    "                                <label class=\"i-checks\">\n" +
    "                                    <input type=\"checkbox\" value=\"1\" ng-model=\"field.jobext3\">\n" +
    "                                    <i></i> Job Ext 3\n" +
    "                                </label>\n" +
    "                            </td>\n" +
    "\n" +
    "                        </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <span>GROUP BY : &nbsp;</span>\n" +
    "\n" +
    "                <label class=\"radio-inline i-checks\">\n" +
    "                    <input type=\"radio\" name=\"groupby\" required=\"\" value=\"employee_code\" ng-model=\"groupBy\"><i></i> Employee\n" +
    "                </label>\n" +
    "                <label class=\"radio-inline i-checks\">\n" +
    "                    <input type=\"radio\" name=\"groupby\" required=\"\" value=\"Job_code\" ng-model=\"groupBy\"><i></i> Job\n" +
    "                </label>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                SELECT FILTER\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"form-control \" placeholder=\"Select zone\" ui-select2=\"selectZone\" value=\"\" ng-model=\"reportFilters.zone\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input class=\"form-control \" placeholder=\"Select Employee\" ui-select2=\"selectEmployee\" ng-model=\"reportFilters.employee\" ng-disabled=\"reportFilters.zone==null || reportFilters.zone=='' || reportFilters.zone[0].id =='all'\">\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select Start Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.startDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "\n" +
    "                <div ng-controller=\"DatepickerDemoCtrl\">\n" +
    "\n" +
    "                    <div class=\"input-group\">\n" +
    "                        <input type=\"text\" placeholder=\"Select End Date\" class=\"form-control\" readonly datepicker-popup=\"{{format}}\" ng-model=\"reportFilters.endDate\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" />\n" +
    "                        <span class=\"input-group-btn\">\n" +
    "                      <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                    </span>\n" +
    "                    </div>\n" +
    "\n" +
    "                </div>\n" +
    "\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData()\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "                <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-6\">\n" +
    "                <div class=\" pull-right\">\n" +
    "                    <div class=\"col-sm-4\" ng-if=\"show_download_loader\">\n" +
    "                        <div ng-if=\"show_download_loader\" show-loader=\"show_download_loader\"></div>\n" +
    "                    </div>\n" +
    "                    <a ng-disabled=\"noRecord==1\" download=\"TimeCardExportReport.xlsx\" class=\"btn btn-md btn-info\" id=\"export\" ng-click=\"exportExcel()\">Export Excel</a>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "        <!--<div class=\"row wrapper\" ng-if=\"noRecord==1\">\n" +
    "            <div class=\"col-sm-12\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "\n" +
    "        </div>-->\n" +
    "        <div class=\"row wrapper\" ng-if=\"noRecord==1 || show_activities_loader\">\n" +
    "            <div class=\"col-sm-12\">\n" +
    "                <div ng-if=\"noRecord==1\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "                <div ng-if=\"show_activities_loader\" show-loader=\"show_activities_loader\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"row wrapper\" ng-if=\"showRecord==1\">\n" +
    "            <wj-flex-grid control=\"ctx.flexGrid\" items-source=\"TimecardDetails\">\n" +
    "                <wj-flex-grid-column header=\"Emp Code\" is-read-only=\"true\" binding=\"employee_code\" width=\"*\"> </wj-flex-grid-column>\n" +
    "\n" +
    "                <wj-flex-grid-column header=\"Job Code\" is-read-only=\"true\" binding=\"Job_code\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Clock In\" is-read-only=\"true\" binding=\"clockin\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Clock Out\" is-read-only=\"true\" binding=\"clockout\"> </wj-flex-grid-column>\n" +
    "                 <wj-flex-grid-column header=\"Activity\" is-read-only=\"true\" binding=\"activities\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Total Hours\" is-read-only=\"true\" binding=\"work_duration_non_rounded_number\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"(h m)\" is-read-only=\"true\" binding=\"work_duration_formated\" format=\"n2\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Rounded Hrs\" ng-if=\"field.roundedhrs\" is-read-only=\"true\" binding=\"work_duration_rounded_number\" format=\"n2\" aggregate=\"Sum\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"(h m)\" ng-if=\"field.roundedhrs\" is-read-only=\"true\" binding=\"work_duration_rounded_formated\" format=\"n2\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Name\" ng-if=\"field.empname\" is-read-only=\"true\" binding=\"employee_name\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Level\" ng-if=\"field.level\" is-read-only=\"true\" binding=\"empLevel\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Skill\" ng-if=\"field.skill\" is-read-only=\"true\" binding=\"empskill\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Agency ID\" ng-if=\"field.agencyid\" is-read-only=\"true\" binding=\"empagencyid\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Status\" ng-if=\"field.empstatus\" is-read-only=\"true\" binding=\"empStatus\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Zone\" ng-if=\"field.empzone\" is-read-only=\"true\" binding=\"empZone\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Ext 1\" ng-if=\"field.empext1\" is-read-only=\"true\" binding=\"empext1\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Ext 2\" ng-if=\"field.empext2\" is-read-only=\"true\" binding=\"empext2\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Ext 3\" ng-if=\"field.empext3\" is-read-only=\"true\" binding=\"empext3\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Address\" ng-if=\"field.empaddress1\" is-read-only=\"true\" binding=\"primary_address1\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Address 2\" ng-if=\"field.empaddress2\" is-read-only=\"true\" binding=\"primary_address2\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp City\" ng-if=\"field.empcity\" is-read-only=\"true\" binding=\"primary_city\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp State\" ng-if=\"field.empstate\" is-read-only=\"true\" binding=\"primary_state\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Emp Zip\" ng-if=\"field.empzip\" is-read-only=\"true\" binding=\"primary_zip\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Name\" ng-if=\"field.jobname\" is-read-only=\"true\" binding=\"job_name\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Zone\" ng-if=\"field.jobzone\" is-read-only=\"true\" binding=\"jobZone\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Contact\" ng-if=\"field.contact\" is-read-only=\"true\" binding=\"jobContact\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Status\" ng-if=\"field.jobstatus\" is-read-only=\"true\" binding=\"jobStatus\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Pay Type\" ng-if=\"field.jobpaytype\" is-read-only=\"true\" binding=\"jobPaytype\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Service\" ng-if=\"field.Service\" is-read-only=\"true\" binding=\"jobServiceitem\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Group\" ng-if=\"field.jobgroup\" is-read-only=\"true\" binding=\"jobGroup\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Ext 1\" ng-if=\"field.jobext1\" is-read-only=\"true\" binding=\"jobext1\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Ext 2\" ng-if=\"field.jobext2\" is-read-only=\"true\" binding=\"jobext2\"> </wj-flex-grid-column>\n" +
    "                <wj-flex-grid-column header=\"Job Ext 3\" ng-if=\"field.jobext3\" is-read-only=\"true\" binding=\"jobext3\"> </wj-flex-grid-column>\n" +
    "\n" +
    "            </wj-flex-grid>\n" +
    "            <div class=\"row wrapper\">\n" +
    "                <wj-menu value=\"TimecardDetails.pageSize\" header=\"Rows per Page\">\n" +
    "                    <wj-menu-item value=\"10\"> 10</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"25\"> 25</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"50\"> 50</wj-menu-item>\n" +
    "                    <wj-menu-item value=\"100\"> 100</wj-menu-item>\n" +
    "                </wj-menu>\n" +
    "                <div class=\"btn-group col-md-8\" ng-show=\"TimecardDetails.pageSize > 0\">\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"TimecardDetails.pageIndex <= 0\" ng-click=\"TimecardDetails.moveToFirstPage()\"> <span class=\"glyphicon glyphicon-fast-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"TimecardDetails.pageIndex <= 0\" ng-click=\"TimecardDetails.moveToPreviousPage()\"> <span class=\"glyphicon glyphicon-step-backward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" disabled style=\"width:100px\"> {{TimecardDetails.pageIndex+1}} / {{TimecardDetails.pageCount}} </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"TimecardDetails.pageIndex >= TimecardDetails.pageCount - 1\" ng-click=\"TimecardDetails.moveToNextPage()\"> <span class=\"glyphicon glyphicon-step-forward\"></span> </button>\n" +
    "                    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"TimecardDetails.pageIndex >= TimecardDetails.pageCount - 1\" ng-click=\"TimecardDetails.moveToLastPage()\"> <span class=\"glyphicon glyphicon-fast-forward\"></span> </button>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/schedules/add-update-schedule.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/schedules/add-update-schedule.tpl.html",
    "<div>\n" +
    "    <div class=\"modal-header\">\n" +
    "        <h3 class=\"modal-title\">{{shiftTitle}} Shift</h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <tabset class=\"tab-container\">\n" +
    "            <tab heading=\"Time and Employee\" disabled=\"basic.$invalid\" active=\"empSteps.basic\">\n" +
    "                <form name=\"basic\" class=\"form-validation form-horizontal basic\" rc-submit=\"scheduleManage('basic')\" novalidate>\n" +
    "\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.basic.needsAttention(basic.zone_name)}\">\n" +
    "                        <label class=\"col-sm-3 control-label text-danger\">Job Zone</label>\n" +
    "                        <div class=\"col-sm-8\">\n" +
    "                            <div>\n" +
    "                                <input class=\"w-md\" ui-select2=\"selectZone\" value=\"\" placeholder=\"Enter Job Zone\" required ng-model=\"shift.zone\" name=\"zone_name\" required=\"\" ng-change=\"generateShiftcode()\">\n" +
    "                                <span class=\"help-block\" ng-show=\"basic.zone_name.$error.required\n" +
    "                                && rc.basic.needsAttention(basic.zone_name)\">Job Zone is required.</span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.basic.needsAttention(basic.job)}\">\n" +
    "                        <label class=\"col-sm-3 control-label text-danger\">Job</label>\n" +
    "                        <div class=\"col-sm-4\">\n" +
    "                            <div>\n" +
    "                                <input class=\"w-md\" ng-disabled=\"!shift.zone \" ng-change=\"Authorization('job')\" ui-select2=\"selectJob\" value=\"\" placeholder=\"Enter Job\" name=\"job\" required=\"\" ng-model=\"shift.job\">\n" +
    "                                <span class=\"help-block\" ng-show=\"basic.job.$error.required\n" +
    "                                && rc.basic.needsAttention(basic.job)\">Job is required.</span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                       <label class=\"col-sm-2 control-label\" ng-if=\"listAuth\">Authorization</label>\n" +
    "                        <div class=\"col-sm-3\" ng-if=\"listAuth\">\n" +
    "                            <div>\n" +
    "                                <input class=\"form-control\" ng-disabled=\"!shift.job \" ui-select2=\"selectAuthorization\" value=\"\" ng-change=\"getAuthorizationNotes()\" placeholder=\"Enter Authorization\" ng-model=\"shift.authorization\">\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.basic.needsAttention(basic.empzone_name)}\">\n" +
    "                        <label class=\"col-sm-3 control-label text-danger\">Employee Zone</label>\n" +
    "                        <div class=\"col-sm-4\">\n" +
    "                            <div>\n" +
    "                                <input class=\"w-md\" ui-select2=\"selectEmpZone\" value=\"\" placeholder=\"Enter Employee Zone\" required ng-model=\"shift.empZone\" name=\"empzone_name\" required=\"\">\n" +
    "                                <span class=\"help-block\" ng-show=\"basic.empzone_name.$error.required\n" +
    "                                && rc.basic.needsAttention(basic.empzone_name)\">Employee Zone is required.</span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <label class=\"col-sm-2 control-label\" ng-if=\"shift.authorization_notes\">Notes</label>\n" +
    "                        <div class=\"col-sm-3\" ng-if=\"shift.authorization_notes\">\n" +
    "\n" +
    "                            <p class=\"col-sm-12 m-t-sm\">{{shift.authorization_notes}}</p>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.basic.needsAttention(basic.employee)}\">\n" +
    "                        <label class=\"col-sm-3 control-label text-danger\">Employee</label>\n" +
    "                        <div class=\"col-sm-4\">\n" +
    "                            <div>\n" +
    "                                <input class=\"w-md\" ng-disabled=\"!shift.empZone\" ui-select2=\"selectEmployee\" value=\"\" placeholder=\"Employee \" name=\"employee\" required=\"\" ng-model=\"shift.employee\">\n" +
    "                                <span class=\"help-block\" ng-show=\"basic.employee.$error.required\n" +
    "                                && rc.basic.needsAttention(basic.employee)\">Employee is required.</span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                     \n" +
    "                    </div>\n" +
    "\n" +
    "                    <input type=\"hidden\" class=\"form-control w-md\" ng-model=\"shift.shift_code\" placeholder=\"Shift Code\" readonly=\"\">\n" +
    "\n" +
    "                    \n" +
    "\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.basic.needsAttention(basic.inAt)}\">\n" +
    "                        <label class=\"col-sm-3 control-label text-danger\">Starts at</label>\n" +
    "                        <div class=\"col-sm-9\">\n" +
    "                            <div class=\"input-group w-md col-sm-9\">\n" +
    "\n" +
    "                                <input type=\"text\" ng-blur=\"Authorization('job')\" readonly class=\"form-control\" date-time ng-model=\"shift.inAt\" required=\"true\" partial=\"true\" name=\"inAt\" required=\"\" max-view=\"date\" view=\"date\">\n" +
    "                                <span class=\"help-block\" ng-show=\"basic.inAt.$error.required\n" +
    "                                && rc.basic.needsAttention(basic.inAt)\">Starts at is required.</span>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.basic.needsAttention(basic.duration)}\">\n" +
    "                        <label class=\"col-sm-3 control-label text-danger\">Duration</label>\n" +
    "                        <div class=\"col-sm-8 w-md\">\n" +
    "                            <input type=\"text\" class=\"form-control\" ng-model=\"shift.duration\" name=\"duration\" required=\"\" ng-pattern=\"/^[0-9]{1,7}(\\.[0-9]+)?$/\" ng-keyup=\"calcuateDiff()\" placeholder=\"Duration hours\">\n" +
    "                            <span class=\"help-block\" ng-show=\"basic.duration.$error.required\n" +
    "                                && rc.basic.needsAttention(basic.duration)\">Duration is required.</span>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"form-group\" ng-class=\"{'has-error': rc.basic.needsAttention(basic.outAt)}\">\n" +
    "                        <label class=\"col-sm-3 control-label text-danger\">End at</label>\n" +
    "                        <div class=\"col-sm-9\">\n" +
    "                            <div class=\"input-group col-sm-10 w-md\">\n" +
    "                                <input type=\"text\" readonly name=\"outAt\" class=\"form-control\" date-time ng-model=\"shift.outAt\" required=\"true\" required=\"\" partial=\"true\" max-view=\"date\" view=\"date\">\n" +
    "                                <span class=\"help-block\" ng-show=\"basic.outAt.$error.required\n" +
    "                                && rc.basic.needsAttention(basic.outAt)\">End at is required.</span>\n" +
    "                            </div>\n" +
    "\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-3 control-label\">Notes</label>\n" +
    "                        <div class=\"col-sm-8\">\n" +
    "                            <textarea capitalize rows=\"4\" ng-model=\"shift.notes\" cols=\"45\"></textarea>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <button type=\"submit\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-if=\"shiftId\" ng-click=\"removeShifts()\">Remove</button>\n" +
    "                            <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">                  \n" +
    "                            {{ErrorMsg}}\n" +
    "                          </span>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-2\">\n" +
    "\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click='cancel()'>Cancel</button>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                  \n" +
    "                    <div class=\"form-group\" ng-if=\"WarningClass || showShiftError\">\n" +
    "                        <div class=\"col-sm-12\">\n" +
    "                            <div class=\"alert alert-warning\" ng-if=\"WarningClass\">\n" +
    "                                Please Note Authorization Ends on {{ shift.authorization.enddate }}, there is no Shift added after {{shift.authorization.enddate}}\n" +
    "                            </div>\n" +
    "                            <div class=\"alert alert-danger\" ng-if=\"showShiftError\">                       \n" +
    "                                <p>Date conflict for the Employee selected, please select a different employee.</p>\n" +
    "                                <p>The following is a list of dates that conflicted</p>\n" +
    "                                <p class=\"schedule_error\">  {{ShiftErrorMsg}}</p>                              \n" +
    "                                <p class=\"text-right\" >\n" +
    "                                    <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click='ShiftErrorClose()'>Close</button>\n" +
    "                                </p>                                \n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-show=\"shiftId != ''\">\n" +
    "                        <div class=\"col-sm-12\">\n" +
    "                            <div class=\"alert alert-info\">\n" +
    "                                <p>Created by: {{shift.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{shift.created_on | date:'medium'}}</em>\n" +
    "                                </p>\n" +
    "                                <p ng-show=\"shift.editedOn\">\n" +
    "                                    Edited by: {{shift.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{shift.editedOn | date:'medium' }}</em>\n" +
    "                                </p>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "\n" +
    "                </form>\n" +
    "\n" +
    "            </tab>\n" +
    "            <tab heading=\"Recurrence\" disabled=\"basic.$invalid\" active=\"empSteps.recurrence\">\n" +
    "\n" +
    "                <form name=\"recurrence\" class=\"form-validation form-horizontal recurrence\" ng-submit=\"scheduleManage('recurrence')\" novalidate>\n" +
    "\n" +
    "\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <label class=\"col-sm-2 control-label\">Recurrence </label>\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <label class=\"radio-inline i-checks\">\n" +
    "                                <input type=\"radio\" name=\"a\" value=\"1\" ng-model=\"shift.recurrence.is\"><i></i> Yes\n" +
    "                            </label>\n" +
    "                            <label class=\"radio-inline i-checks\">\n" +
    "                                <input type=\"radio\" name=\"a\" value=\"0\" ng-model=\"shift.recurrence.is\"><i></i> No\n" +
    "                            </label>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div>\n" +
    "                        <div class=\"form-group\" ng-if=\"shift.recurrence.is=='1'\">\n" +
    "\n" +
    "                            <div class=\"col-sm-3\">\n" +
    "                                <div class=\"radio\">\n" +
    "                                    <label class=\"i-checks\">\n" +
    "                                        <input type=\"radio\" checked=\"\" value=\"0\" ng-model=\"shift.recurrence.type\" name=\"rec\">\n" +
    "                                        <i></i> Daily\n" +
    "                                    </label>\n" +
    "                                </div>\n" +
    "                                <div class=\"radio\">\n" +
    "                                    <label class=\"i-checks\">\n" +
    "                                        <input type=\"radio\" checked=\"\" value=\"1\" ng-model=\"shift.recurrence.type\" name=\"rec\">\n" +
    "                                        <i></i> Weekly\n" +
    "                                    </label>\n" +
    "                                </div>\n" +
    "                                <div class=\"radio\">\n" +
    "                                    <label class=\"i-checks\">\n" +
    "                                        <input type=\"radio\" checked=\"\" value=\"2\" ng-model=\"shift.recurrence.type\" name=\"rec\">\n" +
    "                                        <i></i> Monthy\n" +
    "                                    </label>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"col-sm-9\">\n" +
    "\n" +
    "                                <div class=\"row\" ng-if=\"shift.recurrence.type==0\">\n" +
    "                                    <div class=\"col-sm-12\">\n" +
    "                                        <div class=\"row\">\n" +
    "                                            <div class=\"col-sm-6\">\n" +
    "                                                <div class=\"radio\">\n" +
    "                                                    <label class=\"i-checks\">\n" +
    "                                                        <input type=\"radio\" checked=\"\" value=\"1\" ng-model=\"shift.recurrence.daily.isdayLimit\" name=\"recDT\">\n" +
    "                                                        <i></i> Every &nbsp;\n" +
    "                                                    </label>\n" +
    "\n" +
    "                                                </div>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-sm-3 radio\">\n" +
    "                                                <input type=\"text\" required=\"\" class=\"col-sm-8\" ng-model=\"shift.recurrence.daily.dayLimit\">\n" +
    "\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-sm-3 radio\">\n" +
    "                                                Days\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                    <div class=\"col-sm-6\">\n" +
    "                                        <div class=\"radio\">\n" +
    "                                            <label class=\"i-checks\">\n" +
    "                                                <input type=\"radio\" checked=\"\" value=\"2\" ng-model=\"shift.recurrence.daily.isdayLimit\" name=\"recDT\">\n" +
    "                                                <i></i> Every Weekday\n" +
    "                                            </label>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"row\" ng-if=\"shift.recurrence.type==1\">\n" +
    "\n" +
    "                                    <div class=\"col-sm-12\">\n" +
    "                                        <label class=\"col-sm-4 control-label\">Recur every &nbsp;</label>\n" +
    "                                        <div class=\"col-sm-4\">\n" +
    "                                            <input type=\"text\" required=\"\" class=\"col-sm-10\" ng-model=\"shift.recurrence.week.weeklimt\">\n" +
    "                                        </div>\n" +
    "                                        <label class=\"col-sm-3 control-label\">Week(s) on</label>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"line\"></div>\n" +
    "                                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                                    <div class=\"col-sm-12\">\n" +
    "                                        <div class=\"row\">\n" +
    "                                            <div class=\"col-sm-4\">\n" +
    "                                                <label class=\"checkbox-inline i-checks\">\n" +
    "                                                    <input value=\"1\" type=\"checkbox\" ng-model=\"shift.recurrence.week.isSun\" name=\"w1\"><i></i> Sunday\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-sm-4\">\n" +
    "                                                <label class=\"checkbox-inline i-checks\">\n" +
    "                                                    <input value=\"1\" type=\"checkbox\" ng-model=\"shift.recurrence.week.isMon\" name=\"w2\"><i></i> Monday\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-sm-4\">\n" +
    "                                                <label class=\"checkbox-inline i-checks\">\n" +
    "                                                    <input value=\"1\" type=\"checkbox\" ng-model=\"shift.recurrence.week.isTue\" name=\"w3\"><i></i> Tuesday\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-sm-4\">\n" +
    "                                                <label class=\"checkbox-inline i-checks\">\n" +
    "                                                    <input value=\"1\" type=\"checkbox\" ng-model=\"shift.recurrence.week.isWed\" name=\"w4\"><i></i> Wednesday\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-sm-4\">\n" +
    "                                                <label class=\"checkbox-inline i-checks\">\n" +
    "                                                    <input value=\"1\" type=\"checkbox\" ng-model=\"shift.recurrence.week.isThur\" name=\"w5\"><i></i> Thursday\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-sm-4\">\n" +
    "                                                <label class=\"checkbox-inline i-checks\">\n" +
    "                                                    <input value=\"1\" type=\"checkbox\" ng-model=\"shift.recurrence.week.isFri\" name=\"w6\"><i></i> Friday\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                            <div class=\"col-sm-4\">\n" +
    "                                                <label class=\"checkbox-inline i-checks\">\n" +
    "                                                    <input value=\"1\" type=\"checkbox\" ng-model=\"shift.recurrence.week.isSat\" name=\"w7\"><i></i> Saturday\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "\n" +
    "\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                                <div class=\"row\" ng-if=\"shift.recurrence.type==2\">\n" +
    "\n" +
    "                                    <div class=\"col-sm-12\">\n" +
    "\n" +
    "                                        <div class=\"row\">\n" +
    "                                            <div class=\"col-sm-12\">\n" +
    "                                                <label class=\"radio-inline i-checks\">\n" +
    "                                                    <input type=\"radio\" ng-model=\"shift.recurrence.month.isDay\" value=\"1\" name=\"mon1\" class=\"ng-valid ng-dirty inputSmall\"><i></i> Day\n" +
    "                                                </label>\n" +
    "                                                <label class=\"radio-inline\">\n" +
    "                                                    <input type=\"text\" ng-model=\"shift.recurrence.month.thDay\" value=\"1\" name=\"a\" class=\"ng-valid ng-dirty inputSmall\"><i></i> of every\n" +
    "                                                </label>\n" +
    "                                                <label class=\"radio-inline\">\n" +
    "                                                    <input type=\"text\" ng-model=\"shift.recurrence.month.thMonth\" value=\"1\" name=\"a\" class=\"ng-valid ng-dirty inputSmall\"><i></i> months(s)\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "                                        <div class=\"row hide\">\n" +
    "                                            <div class=\"col-sm-12\">\n" +
    "                                                <label class=\"radio-inline i-checks\">\n" +
    "                                                    <input type=\"radio\" ng-model=\"shift.recurrence.month.isDay\" value=\"2\" name=\"mon1\" class=\"ng-valid ng-dirty inputSmall\"><i></i> The\n" +
    "                                                </label>\n" +
    "                                                <label class=\"radio-inline\">\n" +
    "\n" +
    "                                                    <select ng-model=\"shift.recurrence.month.thEDay\" class=\"\">\n" +
    "                                                        <option value=\"1\">First</option>\n" +
    "                                                        <option value=\"2\">Second</option>\n" +
    "                                                        <option value=\"3\">Third</option>\n" +
    "                                                        <option value=\"4\">Fourth</option>\n" +
    "\n" +
    "                                                    </select>\n" +
    "                                                </label>\n" +
    "                                                <label class=\"radio-inline\">\n" +
    "                                                    <select ng-model=\"shift.recurrence.month.thEEDay\" class=\"\">\n" +
    "                                                        <option value=\"weekday\">Weekday</option>\n" +
    "                                                        <option value=\"weekend\">Weekend day</option>\n" +
    "                                                        <option value=\"1\">Sunday</option>\n" +
    "                                                        <option value=\"2\">Monday</option>\n" +
    "                                                        <option value=\"3\">Wednesday</option>\n" +
    "                                                        <option value=\"4\">Thursday</option>\n" +
    "                                                        <option value=\"5\">Friday</option>\n" +
    "                                                        <option value=\"6\">Saturday</option>\n" +
    "                                                    </select>\n" +
    "                                                    &nbsp; of every\n" +
    "\n" +
    "\n" +
    "                                                </label>\n" +
    "                                                <label class=\"radio-inline\">\n" +
    "                                                    <input type=\"text\" ng-model=\"shift.recurrence.month.thEMonth\" value=\"1\" name=\"a\" class=\"ng-valid ng-dirty inputSmall\"><i></i> months(s)\n" +
    "                                                </label>\n" +
    "                                            </div>\n" +
    "                                        </div>\n" +
    "\n" +
    "\n" +
    "                                    </div>\n" +
    "\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"  ng-if=\"shift.recurrence.is=='1'\"></div>\n" +
    "                        <div class=\"form-group\" ng-if=\"shift.recurrence.is=='1'\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" ng-model=\"shift.recurrence.end.isendOccur\" ng-click=\"shift.recurrence.end.date=''\" value=\"1\" name=\"ef\" class=\"ng-valid ng-dirty inputSmall\"><i></i> End After\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline\">\n" +
    "                                    <input type=\"text\" ng-model=\"shift.recurrence.end.occurcount\" value=\"1\" name=\"a\" class=\"ng-valid ng-dirty inputSmall\"><i></i> occurrences\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline i-checks\">\n" +
    "                                    <input type=\"radio\" ng-model=\"shift.recurrence.end.isendOccur\" value=\"2\" ng-click=\"shift.recurrence.end.occurcount=''\" name=\"ef\" class=\"ng-valid ng-dirty inputSmall\"><i></i> End on\n" +
    "                                </label>\n" +
    "                                <label class=\"radio-inline\">\n" +
    "                                    <input type=\"text\" ng-model=\"shift.recurrence.end.date\" name=\"a\" class=\"ng-valid ng-dirty\" date-time partial=\"true\"  min-view=\"date\" view=\"date\"><i></i>\n" +
    "                                </label>\n" +
    "                                <!--\n" +
    "                                    <div  ng-controller=\"DatepickerDemoCtrl\">\n" +
    "                                    <div class=\"input-group w-md\">\n" +
    "                                        <input type=\"text\" class=\"form-control\" min-date=\"{{dt}}\" datepicker-popup=\"{{format}}\" is-open=\"opened\" datepicker-options=\"dateOptions\" close-text=\"Close\" ng-model=\"shift.recurrence.end.date\" />\n" +
    "                                    <span class=\"input-group-btn\">\n" +
    "                                    <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "                                    </span>\n" +
    "                                    </div>\n" +
    "                                 -->\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                    <div class=\"form-group\">\n" +
    "                        <div class=\"col-sm-10\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click=\"scheduleManagePrev('recurrence')\">Prev</button>\n" +
    "                            <button type=\"submit\" class=\"btn btn-primary btn-rounded\" ng-disabled=\"savedisable == 1\">Save changes</button>\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-if=\"shiftId\" ng-click=\"removeShifts()\">Remove</button>\n" +
    "                            <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                        {{ErrorMsg}}\n" +
    "                         </span>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-sm-2\">\n" +
    "\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click='cancel()'>Cancel</button>\n" +
    "\n" +
    "                        </div>\n" +
    "\n" +
    "                    </div>\n" +
    "                   \n" +
    "                    <div class=\"form-group\" ng-if=\"WarningClass || showShiftError\">\n" +
    "                        <div class=\"col-sm-12\">\n" +
    "                            <div class=\"alert alert-warning\" ng-if=\"WarningClass\">\n" +
    "                                Please Note Authorization Ends on {{ shift.authorization.enddate }}, there is no Shift added after {{shift.authorization.enddate}}\n" +
    "                            </div>\n" +
    "                            <div class=\"alert alert-danger\" ng-if=\"showShiftError\">                       \n" +
    "                                <p>Date conflict for the Employee selected, please select a different employee.</p>\n" +
    "                                <p>The following is a list of dates that conflicted</p>\n" +
    "                                <p class=\"schedule_error\">  {{ShiftErrorMsg}}</p>                              \n" +
    "                                <p class=\"text-right\" >\n" +
    "                                    <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click='ShiftErrorClose()'>Close</button>\n" +
    "                                </p>                                \n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                    <div class=\"form-group\" ng-show=\"shiftId != ''\">\n" +
    "                        <div class=\"col-sm-12\">\n" +
    "                            <div class=\"alert alert-info\">\n" +
    "                                <p>Created by: {{shift.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{shift.created_on | date:'medium'}}</em>\n" +
    "                                </p>\n" +
    "                                <p ng-show=\"shift.editedOn\">\n" +
    "                                    Edited by: {{shift.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{shift.editedOn | date:'medium' }}</em>\n" +
    "                                </p>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                </form>\n" +
    "            </tab>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "        </tabset>\n" +
    "\n" +
    "\n" +
    "        <div class=\"modal-body\">\n" +
    "\n" +
    "            <h3>Summary</h3>\n" +
    "            <ul>\n" +
    "                <li>Employee : {{shift.employee.text }}</li>\n" +
    "                <li>Scheduled Time : {{shift.inAt | date:'medium' }} - {{shift.outAt | date:'medium' }}</li>\n" +
    "                <li>Duration : {{shift.duration }} hours</li>\n" +
    "                <li>Recurrence : <span ng-if=\"shift.recurrence.is==0\">No</span>\n" +
    "                    <span ng-if=\"shift.recurrence.is==1\">\n" +
    "                    <span ng-if=\"shift.recurrence.type==0\">Daily</span>\n" +
    "                    <span ng-if=\"shift.recurrence.type==1\">Weekly</span>\n" +
    "                    <span ng-if=\"shift.recurrence.type==2\">Monthy</span>\n" +
    "                    </span>\n" +
    "                </li>\n" +
    "                <ul ng-if=\"shift.recurrence.is==1\">\n" +
    "                    <li ng-if=\"shift.recurrence.type==0\">\n" +
    "                        <span ng-if=\"shift.recurrence.daily.isdayLimit==1\">Every {{shift.recurrence.daily.dayLimit}} Days</span>\n" +
    "                        <span ng-if=\"shift.recurrence.daily.isdayLimit==2\">Every Weekday {{shift.recurrence.daily.dayLimit}} Days</span>\n" +
    "                    </li>\n" +
    "                    <li ng-if=\"shift.recurrence.type==1\">\n" +
    "                        Every {{shift.recurrence.week.weeklimt}} Week(s) on\n" +
    "                        <span ng-if=\"shift.recurrence.week.isSun\"> Sunday</span>\n" +
    "                        <span ng-if=\"shift.recurrence.week.isMon\"> Monday</span>\n" +
    "                        <span ng-if=\"shift.recurrence.week.isTue\"> Tuesday</span>\n" +
    "                        <span ng-if=\"shift.recurrence.week.isWed\"> Wednesday</span>\n" +
    "                        <span ng-if=\"shift.recurrence.week.isThur\"> Thursday</span>\n" +
    "                        <span ng-if=\"shift.recurrence.week.isFri\"> Friday</span>\n" +
    "                        <span ng-if=\"shift.recurrence.week.isSat\"> Saturday</span>\n" +
    "                    </li>\n" +
    "                    <li ng-if=\"shift.recurrence.type==2\">\n" +
    "                        <span ng-if=\"shift.recurrence.month.isDay==1\">{{shift.recurrence.month.thDay}} of every {{shift.recurrence.month.thMonth}} Month(s)</span>\n" +
    "                        <span ng-if=\"shift.recurrence.month.isDay==2\">{{shift.recurrence.month.thEDay}}, {{shift.recurrence.month.thEEDay}} of every {{shift.recurrence.month.thEMonth}} months</span>\n" +
    "                    </li>\n" +
    "                    <li ng-if=\"shift.recurrence.end.isendOccur==1\"><span>End after {{shift.recurrence.end.occurcount}} Occurrences</span>\n" +
    "                    </li>\n" +
    "                    <li ng-if=\"shift.recurrence.end.isendOccur==2\"><span>End On {{shift.recurrence.end.date | onlydateMMDDYYYY:empCountry}}</span>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "                <li>Alerts :\n" +
    "                    <span ng-if=\"shift.alerts==0\">None</span>\n" +
    "                    <span ng-if=\"shift.alerts==1\">Minutes</span>\n" +
    "                    <span ng-if=\"shift.alerts==2\">Date and Time</span>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/schedules/schedules.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/schedules/schedules.tpl.html",
    "<div>\n" +
    " \n" +
    "  <div class=\"hbox hbox-auto-xs hbox-auto-sm\">\n" +
    "    <div class=\"col wrapper-md\">\n" +
    "      <div class=\"clearfix m-b\">\n" +
    "      \n" +
    "      <div class=\"pull-left\">\n" +
    "        <button type=\"button\" class=\"btn btn-sm btn-primary btn-addon\" ng-click=\"addEvent()\">\n" +
    "          <i class=\"fa fa-plus\"></i>Add\n" +
    "        </button>\n" +
    "        </div> \n" +
    "      <div class=\"col-sm-8\">\n" +
    "          <div class=\"col-sm-3\" >\n" +
    "              <input  class=\"form-control\"  ui-select2=\"shiftZoneOptions\" value=\"\"  ng-model=\"shiftFilters.zoneName\" placeholder=\"Select a Zone\">\n" +
    "            </div>\n" +
    "	      <div class=\"col-sm-3\" >\n" +
    "             \n" +
    "         <input class=\"form-control\" ui-select2=\"Selectfield\" value=\"\" ng-model=\"shiftFilters.filterName\" ng-disabled=\"shiftFilters.zoneName=='' || shiftFilters.zoneName.id =='all'\"  placeholder=\"Select Job/Employee\">\n" +
    "              \n" +
    "            </div>\n" +
    "	      <div class=\"col-sm-3\">\n" +
    "          \n" +
    "\n" +
    "              <input  class=\"form-control\"  ui-select2=\"shiftFilterOptions\" value=\"\"  placeholder=\"Select a Name\" ng-model=\"shiftFilters.filterValue\" ng-disabled=\"!shiftFilters.filterName || shiftFilters.filterName.id =='all'\">\n" +
    "    </div>\n" +
    "	      <div class=\"col-sm-3\">\n" +
    "		      <button class=\"btn btn-sm btn-info\" type=\"button\" ng-click=\"filterCalender('calendar1')\">Search</button>\n" +
    "		      <button class=\"btn btn-sm btn-warning\" type=\"button\" ng-click=\"clearSearch('calendar1')\">Clear</button>\n" +
    "	      </div>\n" +
    "      </div> \n" +
    "      <div class=\"col-sm-3\">\n" +
    "       <span class=\"alert alert-danger\" ng-if=\"showerrorMsg\">{{error_msg}}</span>\n" +
    "      </div>\n" +
    "\n" +
    "        \n" +
    "      </div>\n" +
    "      <div class=\"pos-rlt\">\n" +
    "        <div class=\"fc-overlay\"> <!-- ng-repeat=\"event in events\" -->\n" +
    "          <div class=\"panel bg-white b-a pos-rlt\">\n" +
    "            <span class=\"arrow\"></span>\n" +
    "            <div class=\"h4 font-thin m-b-sm\">{{event.title}}</div>\n" +
    "            <div class=\"line b-b b-light\"></div>\n" +
    "            <div><i class=\"icon-calendar text-muted m-r-xs\"></i> {{event.start | date:'medium'}}</div>\n" +
    "            <div class=\"ng-hide\" ng-show='event.end'><i class=\"icon-clock text-muted m-r-xs\"></i> {{event.end | date:'medium'}}</div>\n" +
    "            <div class=\"ng-hide\" ng-show='event.location'><i class=\"icon-pointer text-muted m-r-xs\"></i> {{event.location}}</div>\n" +
    "            <div class=\"m-t-sm\">{{event.info}}</div>\n" +
    "            <div class=\"m-t-sm\">{{event.url}}</div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div class=\"calendar schduleCal\" ng-model=\"eventSources\" calendar=\"calendar1\" id=\"calendar\" config=\"uiConfig.calendar\" ui-calendar=\"uiConfig.calendar\">\n" +
    "	        \n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col w-md w-auto-xs bg-light dk bg-auto b-l hide\" id=\"aside\">\n" +
    "      <div class=\"wrapper\">\n" +
    "        <div ng-repeat=\"e in events\" class=\"bg-white-only r r-2x m-b-xs wrapper-sm {{e.className[0]}}\">          \n" +
    "          <input ng-model=\"e.title\" class=\"form-control m-t-n-xs no-border no-padder no-bg\">\n" +
    "          <a class=\"pull-right text-xs text-muted\" ng-click=\"remove($index)\"><i class=\"fa fa-trash-o\"></i></a>\n" +
    "          </div>\n" +
    "		\n" +
    "		       \n" +
    "          <div class=\"text-xs text-muted\">{{e.start | date:\"MMM dd\"}} - {{e.end | date:\"MMM dd\"}}</div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("ct-app/updatePassword/updatePassword.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/updatePassword/updatePassword.tpl.html",
    "<div class=\"container w-xxl w-auto-xs\">\n" +
    "    <a href class=\"navbar-brand block m-t\">{{app.name}}</a>\n" +
    "    <div class=\"m-b-lg\">\n" +
    "        <div class=\"wrapper text-center\">\n" +
    "            <strong>Update Your Password</strong>\n" +
    "        </div>\n" +
    "        <form name=\"updatePassword\" class=\"form-validation form-horizontal empLogin\" rc-submit=\"changePassword()\" novalidate>\n" +
    "\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-12\"  ng-class=\"{'has-error': rc.updatePassword.needsAttention(updatePassword.password1)}\">\n" +
    "                    <input type=\"password\" placeholder=\"Set Password\" id=\"password1\" name=\"password1\" ng-model=\"password1\" class=\"form-control\" required=\"\">\n" +
    "                     <span class=\"help-block\" ng-show=\"updatePassword.password1.$error.required && rc.updatePassword.needsAttention(updatePassword.password1)\">Set Password is required.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-12\" ng-class=\"{'has-error': rc.updatePassword.needsAttention(updatePassword.password2)}\">\n" +
    "                    <input type=\"password\" placeholder=\"Confirm Password\" id=\"password2\" name=\"password2\" pw-check=\"password1\" ng-model=password2 class=\"form-control\" required=\"\">\n" +
    "                     <span class=\"help-block\" ng-show=\"updatePassword.password2.$error.required && rc.updatePassword.needsAttention(updatePassword.password2)\">Confirm Password is required.</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"alert alert-danger\" ng-show=\"empLogin.password2.$error.pwmatch\">\n" +
    "                <span>Passwords don't match.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <div class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                        {{ErrorMsg}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <button type=\"submit\" class=\"btn btn-lg btn-primary btn-block\">Set Password</button>\n" +
    "            <div class=\"line line-dashed\"></div>\n" +
    "\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("ct-app/zones/add-update-zone.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/zones/add-update-zone.tpl.html",
    "<div>\n" +
    "    <div class=\"bg-light lter b-b wrapper-md\">\n" +
    "        <h1 class=\"m-n font-thin h3\">{{pageTitle}} {{labels.Zones }} </h1>\n" +
    "    </div>\n" +
    "    <div class=\"wrapper-md\" style=\"background:#FFF;\">\n" +
    "        <div>\n" +
    "            <tabset class=\"tab-container\">\n" +
    "\n" +
    "                <tab heading=\"Basic Setup\" active=\"zoneSteps.general\" select=\"zoneSteps.percent=50\">\n" +
    "\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Enter the basic details about the Job. <em class=\"text-danger\">Required fields are in Red</em> </p>\n" +
    "                    <progressbar value=\"zoneSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "                    <form name=\"addUpdateZoneForm\" class=\"form-validation form-horizontal general\" rc-submit=\"zoneManage('general')\" novalidate>\n" +
    "                        <div class=\"form-group \" ng-class=\"{'has-error': rc.addUpdateZoneForm.needsAttention(addUpdateZoneForm.zone_name)}\">\n" +
    "                            <label class=\"col-sm-2 control-label text-danger\"> Zone Name *</label>\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <input type=\"text\" class=\"form-control\" required=\"\" capitalize placeholder=\"Zone Name\" name=\"zone_name\" ng-model=\"zone.zone_name\">\n" +
    "                                <span class=\"help-block\" ng-show=\"addUpdateZoneForm.zone_name.$error.required\n" +
    "                                && rc.addUpdateZoneForm.needsAttention(addUpdateZoneForm.zone_name)\">Zone name is required.</span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Supervisor </label>\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <div>\n" +
    "                                    <ui-select ng-model=\"zone.supervisor\" theme=\"select2\" class=\"col-md-12 padlr0\">\n" +
    "                                        <ui-select-match placeholder=\"Supervisor\">\n" +
    "                                            {{$select.selected.text}}\n" +
    "                                        </ui-select-match>\n" +
    "                                        <ui-select-choices repeat=\"supervisor in supervisors track by $index\" refresh=\"refreshSupervisors($select.search)\" refresh-delay=\"0\">\n" +
    "                                            <div ng-bind-html=\"supervisor.text\"></div>\n" +
    "                                        </ui-select-choices>\n" +
    "                                    </ui-select>\n" +
    "\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!--<div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">IVR Number</label>\n" +
    "                            <div class=\"col-sm-4\">\n" +
    "                                <input type=\"text\" class=\"form-control\" ui-mask=\"(999) 999-9999\" ui-mask-use-viewvalue=\"false\" ng-model=\"zone.ivr_number\">\n" +
    "                            </div>\n" +
    "                        </div>-->\n" +
    "                        <div class=\"col-sm-4 col-sm-offset-2\">\n" +
    "                            <div show-loader=\"show_zone_form_loader\"></div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                                <button type=\"submit\" class=\"btn btn-default btn-rounded\">Next</button>\n" +
    "                                <button type=\"button\" ng-click=\"cancelZone()\" class=\"btn btn-default  btn-rounded pull-right\">Cancel</button>\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                     {{ErrorMsg}}\n" +
    "                                </span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"alert alert-info\" ng-show=\"zone_id\">\n" +
    "                                    <p>Zone Code: <em class=\"ng-binding\">{{zone.zone_code}} </em> \n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{zone.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{zone.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"zone.editedOn\">\n" +
    "                                        Edited by: {{zone.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{zone.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                    </form>\n" +
    "                </tab>\n" +
    "                <tab heading=\"Notify\" disabled=\"addUpdateZoneForm.$invalid\" active=\"zoneSteps.notify\" select=\"zoneSteps.percent=100\">\n" +
    "\n" +
    "                    <p class=\"m-b\"><i class=\"fa fa-question-circle\"></i> Add one or more people that needed to be alerted on missed clock-ins</p>\n" +
    "                    <progressbar value=\"zoneSteps.percent\" class=\"progress-xs\" type=\"success\"></progressbar>\n" +
    "                    \n" +
    "\n" +
    "                    <form name=\"notify\" class=\"form-validation form-horizontal notify\" ng-submit=\"zoneManage('notify')\" novalidate>\n" +
    "\n" +
    "                        <!-- <div class=\"form-group\"   ng-if=\"noemployee=='1'\">\n" +
    "                        <div class=\"col-sm-12\" ng-bind-html=\"norecord\"> {{norecord }}</div>\n" +
    "           \n" +
    "                        </div> \n" +
    "                        <div class=\"form-group\" ng-if=\"noemployee=='0'\">-->\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <label class=\"col-sm-2 control-label\">Add Employee</label>\n" +
    "                            <div class=\"col-sm-5\">\n" +
    "\n" +
    "                                <div class=\"row m-b\" ng-repeat=\"empname in zone.notify_empname\">\n" +
    "\n" +
    "                                    <div class=\"col-sm-8 padding-r-none\">\n" +
    "\n" +
    "                                       \n" +
    "                                         <div>\n" +
    "                                    <ui-select ng-model=\"empname.Employee\" theme=\"select2\" class=\"col-md-12 padlr0\">\n" +
    "                                        <ui-select-match placeholder=\"Select Employee\">\n" +
    "                                            {{$select.selected.text}}\n" +
    "                                        </ui-select-match>\n" +
    "                                        <ui-select-choices repeat=\"NotifyEmployee in NotifyEmployees track by $index\" refresh=\"refreshNotifyEmp($select.search)\" refresh-delay=\"0\">\n" +
    "                                            <div ng-bind-html=\"NotifyEmployee.text\"></div>\n" +
    "                                        </ui-select-choices>\n" +
    "                                    </ui-select>\n" +
    "\n" +
    "                                </div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                    <div class=\"col-sm-4\">\n" +
    "                                        <span ><a href=\"\" class=\"btn btn-rounded btn-sm btn-icon btn-primary\" ng-click=\"removeEmpdetails($index)\"><i class=\"fa fa-trash-o\"></i></a></span>\n" +
    "                                        <span ng-show=\"$index > zone.notify_empname.addshow && $index < zone.notify_empMax-1\"><a href=\"\" class=\"btn btn-rounded btn-sm btn-icon btn-primary\" ng-click=\"addEmpdetails($index)\"><i class=\"fa fa-plus\"></i></a></span>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                         <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "                        <div class=\"form-group\">\n" +
    "                            <div class=\"col-sm-12\">\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-rounded\" ng-click=\"zoneManagePrev('notify')\">Prev</button>\n" +
    "                                <button type=\"submit\" class=\"btn btn-primary  btn-rounded\" ng-disabled=\"savedisable == 1\">Save Changes</button>\n" +
    "                                <button class=\"btn btn-default  btn-rounded pull-right\" ng-click=\"cancelZone()\" type=\"button\">Cancel</button>\n" +
    "                                <span class=\"alert alert-{{ErrorClass}}\" ng-if=\"showerrorMsg\">\n" +
    "                                  \n" +
    "                                  {{ErrorMsg}}\n" +
    "                          </span>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                       \n" +
    "                       <div class=\"alert alert-info\" ng-show=\"zone_id\">\n" +
    "                                    <p>Zone Code: <em class=\"ng-binding\">{{zone.zone_code}} </em> \n" +
    "                                    </p>\n" +
    "                                    <p>Created by: {{zone.created_by | AddEditUser}}, Created date is: <em class=\"ng-binding\">{{zone.created_on | date:'medium'}}</em>\n" +
    "                                    </p>\n" +
    "                                    <p ng-show=\"zone.editedOn\">\n" +
    "                                        Edited by: {{zone.edited_by | AddEditUser}}, Last Edited date is: <em class=\"ng-binding\">{{zone.editedOn | date:'medium' }}</em>\n" +
    "                                    </p>\n" +
    "                                </div>\n" +
    "                         \n" +
    "\n" +
    "                     \n" +
    "                    </form>\n" +
    "                </tab>\n" +
    "\n" +
    "            </tabset>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("ct-app/zones/zone-employee-dashboard.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/zones/zone-employee-dashboard.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "  <h1 class=\"m-n font-thin h3\">Employee</h1>\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\" ng-controller=\"FormDemoCtrl\">\n" +
    "\n" +
    "\n" +
    "  <div class=\"panel panel-default\">\n" +
    "    <div class=\"panel-heading font-bold\">\n" +
    "      Employee Setup\n" +
    "    </div>\n" +
    "    <div class=\"panel-body\">\n" +
    "      <form class=\"form-horizontal\" method=\"get\">\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Employee Name</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-md-6\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Last Name\">\n" +
    "              </div>\n" +
    "              <div class=\"col-md-6\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"First Name\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Username</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "              <input type=\"text\" class=\"form-control\" ng-model=\"user.name\" ng-pattern=\"/^[a-zA-Z0-9]{4,10}$/\" placeholder=\"allow a-zA-Z0-9, 4-10 length\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Email</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "              <input type=\"email\" class=\"form-control\" ng-model=\"user.email\" required >\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Access Code</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <input type=\"text\"  class=\"form-control\" placeholder=\"Enter 6 digit Access Code\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Employee Zone</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <input type=\"text\"  class=\"form-control\" placeholder=\"Enter Zone\">\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Language</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <select ui-jq=\"chosen\" multiple class=\"w-md\">\n" +
    "              <option value=\"eng\">English</option>\n" +
    "              <option value=\"spa\">Spanish</option>\n" +
    "              <option value=\"ger\">German</option>\n" +
    "              <option value=\"frn\">French</option>\n" +
    "              <option value=\"itl\">Italian</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Eloyee Level</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <div ui-module=\"select2\">\n" +
    "              <select ui-select2 ng-model=\"select1\" class=\"form-control w-md\">\n" +
    "                <option value=\"basic\">Basic</option>\n" +
    "                <option value=\"supervisor\">Supervisor</option>\n" +
    "              </select>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Current Status</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <label class=\"radio-inline i-checks\">\n" +
    "              <input type=\"radio\" name=\"a\" value=\"option1\" checked><i></i> Active\n" +
    "            </label>\n" +
    "            <label class=\"radio-inline i-checks\">\n" +
    "              <input type=\"radio\" name=\"a\" value=\"option2\"><i></i> Inactive\n" +
    "            </label>\n" +
    "            <label class=\"radio-inline i-checks\">\n" +
    "              <input type=\"radio\" name=\"a\" value=\"option3\"><i></i> Terminated\n" +
    "            </label>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Voice Verification</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <select ui-jq=\"chosen\" class=\"w-md\">\n" +
    "              <option value=\"dis\">Disabled</option>\n" +
    "              <option value=\"5\">5%</option>\n" +
    "              <option value=\"10\">10%</option>\n" +
    "              <option value=\"25\">25%</option>\n" +
    "              <option value=\"50\">50% (Caution)</option>\n" +
    "              <option value=\"75\">75% (Caution)</option>\n" +
    "              <option value=\"100\">100% (Caution)</option>\n" +
    "            </select>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Clock OUT Safeguard</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-md-6>\">\n" +
    "              <select ui-jq=\"chosen\" class=\"w-md\">\n" +
    "                <option value=\"ah\">Timecard Reset after Hours </option>\n" +
    "                <option value=\"td\">Timecard Reset after Time of day</option>\n" +
    "                <option value=\"dis\">Timecard Reset Disabled</option>\n" +
    "              </select>\n" +
    "              </div>\n" +
    "              <div class=\"col-md-6\">\n" +
    "                  <input type=\"text\" class=\"form-control\" placeholder=\"Enter Hours\" ng-model=\"g.c\" ng-pattern=\"/^[0-9]+$/\" required >\n" +
    "              </div>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Address Line</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <input type=\"text\"  class=\"form-control\" placeholder=\"Enter Address line\">\n" +
    "          </div>\n" +
    "          <div class=\"line\"></div>\n" +
    "          <label class=\"col-sm-2 control-label\">Address Line 2</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <input type=\"text\"  class=\"form-control\" placeholder=\"Address line 2 (optional)\">\n" +
    "          </div>\n" +
    "        <div class=\"line\"></div>                \n" +
    "          <label class=\"col-sm-2 control-label\">City/State/Zip</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <div class=\"row\">\n" +
    "              <div class=\"col-md-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"City\">\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"State\">\n" +
    "              </div>\n" +
    "              <div class=\"col-md-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"ZIP\">\n" +
    "              </div>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Home Phone</label>\n" +
    "          <div class=\"col-sm-4\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"(123) 333 4444\" ng-model=\"phone\" ng-pattern=\"/\\([0-9]{3}\\) ([0-9]{3}) ([0-9]{4})$/\" required >\n" +
    "          </div>\n" +
    "          <div class=\"line\"></div>\n" +
    "          <label class=\"col-sm-2 control-label\">Work Phone</label>\n" +
    "          <div class=\"col-sm-4\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"(123) 333 4444\" ng-model=\"phone\" ng-pattern=\"/\\([0-9]{3}\\) ([0-9]{3}) ([0-9]{4})$/\" required >\n" +
    "          </div>\n" +
    "          <div class=\"line\"></div>\n" +
    "          <label class=\"col-sm-2 control-label\">Other Phone</label>\n" +
    "          <div class=\"col-sm-4\">\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"(123) 333 4444\" ng-model=\"phone\" ng-pattern=\"/\\([0-9]{3}\\) ([0-9]{3}) ([0-9]{4})$/\" required >\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "          <div class=\"form-group\">\n" +
    "            <label class=\"col-sm-2 control-label\">Pay Rate (US$)</label>\n" +
    "              <div class=\"col-sm-4\">\n" +
    "                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Pay Rate\" ng-model=\"g.c\" ng-pattern=\"/^[0-9]+$/\" required >\n" +
    "              </div>\n" +
    "          </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Free-form Tags</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <div ui-module=\"select2\">\n" +
    "              <input\n" +
    "                type=\"hidden\"\n" +
    "                ui-select2=\"select2Options\"\n" +
    "                ng-model=\"list_of_string\"\n" +
    "                class=\"form-control w-md\"\n" +
    "                >\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Hire Date</label>\n" +
    "          <div class=\"col-sm-10\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "            <div class=\"input-group w-md\">\n" +
    "              <input type=\"text\" class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"dt\" is-open=\"opened\" datepicker-options=\"dateOptions\" ng-required=\"true\" close-text=\"Close\" />\n" +
    "              <span class=\"input-group-btn\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Birthday</label>\n" +
    "          <div class=\"col-sm-10\" ng-controller=\"DatepickerDemoCtrl\">\n" +
    "            <div class=\"input-group w-md\">\n" +
    "              <input type=\"text\" class=\"form-control\" datepicker-popup=\"{{format}}\" ng-model=\"dt\" is-open=\"opened\" datepicker-options=\"dateOptions\" ng-required=\"true\" close-text=\"Close\" />\n" +
    "              <span class=\"input-group-btn\">\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"open($event)\"><i class=\"glyphicon glyphicon-calendar\"></i></button>\n" +
    "              </span>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    " \n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <label class=\"col-sm-2 control-label\">Notes</label>\n" +
    "          <div class=\"col-sm-10\">\n" +
    "            <div class=\"btn-toolbar m-b-sm btn-editor\" data-role=\"editor-toolbar\" data-target=\"#editor\">\n" +
    "              <div class=\"btn-group dropdown\">\n" +
    "                <a class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" tooltip=\"Font\"><i class=\"fa fa-font\"></i><b class=\"caret\"></b></a>\n" +
    "                <ul class=\"dropdown-menu\">\n" +
    "                  <li><a href dropdown-toggle data-edit=\"fontName Serif\" style=\"font-family:'Serif'\">Serif</a></li> \n" +
    "                  <li><a href dropdown-toggle data-edit=\"fontName Sans\" style=\"font-family:'Sans'\">Sans</a></li>\n" +
    "                  <li><a href dropdown-toggle data-edit=\"fontName Arial\" style=\"font-family:'Arial'\">Arial</a></li></ul>\n" +
    "              </div>\n" +
    "              <div class=\"btn-group dropdown\">\n" +
    "                <a class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" tooltip=\"Font Size\"><i class=\"fa fa-text-height\"></i>&nbsp;<b class=\"caret\"></b></a>\n" +
    "                <ul class=\"dropdown-menu\">\n" +
    "                  <li><a href dropdown-toggle data-edit=\"fontSize 5\" style=\"font-size:24px\">Huge</a></li>\n" +
    "                  <li><a href dropdown-toggle data-edit=\"fontSize 3\" style=\"font-size:18px\">Normal</a></li>\n" +
    "                  <li><a href dropdown-toggle data-edit=\"fontSize 1\" style=\"font-size:14px\">Small</a></li>\n" +
    "                </ul>\n" +
    "              </div>\n" +
    "              <div class=\"btn-group\">\n" +
    "                <a class=\"btn btn-default\" data-edit=\"bold\" tooltip=\"Bold (Ctrl/Cmd+B)\"><i class=\"fa fa-bold\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"italic\" tooltip=\"Italic (Ctrl/Cmd+I)\"><i class=\"fa fa-italic\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"strikethrough\" tooltip=\"Strikethrough\"><i class=\"fa fa-strikethrough\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"underline\" tooltip=\"Underline (Ctrl/Cmd+U)\"><i class=\"fa fa-underline\"></i></a>\n" +
    "              </div>\n" +
    "              <div class=\"btn-group\">\n" +
    "                <a class=\"btn btn-default\" data-edit=\"insertunorderedlist\" tooltip=\"Bullet list\"><i class=\"fa fa-list-ul\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"insertorderedlist\" tooltip=\"Number list\"><i class=\"fa fa-list-ol\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"outdent\" tooltip=\"Reduce indent (Shift+Tab)\"><i class=\"fa fa-dedent\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"indent\" tooltip=\"Indent (Tab)\"><i class=\"fa fa-indent\"></i></a>\n" +
    "              </div>\n" +
    "              <div class=\"btn-group\">\n" +
    "                <a class=\"btn btn-default\" data-edit=\"justifyleft\" tooltip=\"Align Left (Ctrl/Cmd+L)\"><i class=\"fa fa-align-left\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"justifycenter\" tooltip=\"Center (Ctrl/Cmd+E)\"><i class=\"fa fa-align-center\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"justifyright\" tooltip=\"Align Right (Ctrl/Cmd+R)\"><i class=\"fa fa-align-right\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"justifyfull\" tooltip=\"Justify (Ctrl/Cmd+J)\"><i class=\"fa fa-align-justify\"></i></a>\n" +
    "              </div>\n" +
    "              <div class=\"btn-group dropdown\">\n" +
    "                <a class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\" tooltip=\"Hyperlink\"><i class=\"fa fa-link\"></i></a>\n" +
    "                <div class=\"dropdown-menu\">\n" +
    "                  <div class=\"input-group m-l-xs m-r-xs\">\n" +
    "                    <input class=\"form-control input-sm\" onclick=\"return false;\" placeholder=\"URL\" type=\"text\" data-edit=\"createLink\"/>\n" +
    "                    <div class=\"input-group-btn\">\n" +
    "                      <button class=\"btn btn-sm btn-default\" type=\"button\">Add</button>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "                </div>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"unlink\" tooltip=\"Remove Hyperlink\"><i class=\"fa fa-cut\"></i></a>\n" +
    "              </div>\n" +
    "              \n" +
    "              <div class=\"btn-group\">\n" +
    "                <a class=\"btn btn-default\" tooltip=\"Insert picture (or just drag & drop)\" id=\"pictureBtn\"><i class=\"fa fa-picture-o\"></i></a>\n" +
    "                <input type=\"file\" data-edit=\"insertImage\" style=\"position:absolute; opacity:0; width:41px; height:34px\" />\n" +
    "              </div>\n" +
    "              <div class=\"btn-group\">\n" +
    "                <a class=\"btn btn-default\" data-edit=\"undo\" tooltip=\"Undo (Ctrl/Cmd+Z)\"><i class=\"fa fa-undo\"></i></a>\n" +
    "                <a class=\"btn btn-default\" data-edit=\"redo\" tooltip=\"Redo (Ctrl/Cmd+Y)\"><i class=\"fa fa-repeat\"></i></a>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div ui-jq=\"wysiwyg\" class=\"form-control\" style=\"overflow:scroll;height:200px;max-height:200px\">\n" +
    "              Go ahead&hellip;\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        \n" +
    "        <div class=\"line line-dashed b-b line-lg pull-in\"></div>\n" +
    "        <div class=\"form-group\">\n" +
    "          <div class=\"col-sm-4 col-sm-offset-2\">\n" +
    "            <button type=\"submit\" class=\"btn btn-default\">Cancel</button>\n" +
    "            <button type=\"submit\" class=\"btn btn-primary\">Save changes</button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </form>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("ct-app/zones/zones.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("ct-app/zones/zones.tpl.html",
    "<div class=\"bg-light lter b-b wrapper-md\">\n" +
    "    <h1 class=\"m-n font-thin h3\">{{labels.Zones }} List\n" +
    "        <a ng-if=\"addAccess\" ui-sref=\"ctApp.addUpdateZone\" class=\"btn btn-md btn-info pull-right\" type=\"button\">Add {{labels.Zones }}</a></h1>\n" +
    "</div>\n" +
    "<div class=\"wrapper-md\">\n" +
    "\n" +
    "\n" +
    "\n" +
    "    <div class=\"panel panel-default\">\n" +
    "\n" +
    "        <div class=\"row wrapper\">\n" +
    "\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <div class=\"input-group col-sm-12\">\n" +
    "\n" +
    "                    <ui-select ng-model=\"config.general.filterDBField\" theme=\"select2\" style=\"min-width: 225px;\">\n" +
    "                        <ui-select-match placeholder=\"Optional filter for search\">{{$select.selected.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"item in zoneSearchOption\">\n" +
    "                            <div ng-bind-html=\"item.name\"></div>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <input type=\"text\" class=\"input-md form-control\" capitalize placeholder=\"Search Text\" ui-keypress=\"{13:'updateTableData(true)'}\" ng-model=\"config.general.searchtxt\">\n" +
    "            </div>\n" +
    "            <div class=\"col-sm-3\">\n" +
    "                <button class=\"btn btn-md btn-info\" type=\"button\" ng-click=\"updateTableData(true)\">Search</button>\n" +
    "                <button class=\"btn btn-md btn-warning\" type=\"button\" ng-click=\"clearSearch()\">Clear</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"table-wrapper table-responsive\">\n" +
    "            <table class=\"table table-striped b-t b-light table-bordered word-break\"\n" +
    "                   ct-table-sort=\"sortField\"\n" +
    "                   sort-order=\"sortType\"\n" +
    "                   callback=\"applyProgramSort()\">\n" +
    "                <thead>\n" +
    "                <tr>\n" +
    "                    <th id=\"zone_name\"  class=\"sort-item asc\" style=\"width:30%;\">Zone Name &nbsp;<i class=\"fa fa-sort fa-sort-up\"></i></th>\n" +
    "                    <th id=\"zone_code\" class=\"sort-item\">Zone Code &nbsp;<i class=\"fa fa-sort\"></i></th>\n" +
    "                    <th id=\"supervisor_detail\"  class=\"sort-item\" >Supervisor &nbsp;<i class=\"fa fa-sort\"></i></th>\n" +
    "                    <th>Action</th>\n" +
    "                </tr>\n" +
    "                </thead>\n" +
    "                <tbody infinite-scroll='getNextData()'\n" +
    "                       infinite-scroll-disabled='disable_infinite_scroll'\n" +
    "                       infinite-scroll-distance='0'>\n" +
    "                <tr ng-repeat=\"detail in zoneDetailList\" class=\"animate-repeat\">\n" +
    "                    <td>{{detail.zone_name}}</td>\n" +
    "                    <td><a>{{detail.zone_code}} </a></td>\n" +
    "                    <td>{{detail.supervisor_detail | payclass}}</td>\n" +
    "                    <td>\n" +
    "                        <button ng-click=\"enableEditView(detail.id)\"  class=\"btn btn-rounded btn-sm btn-icon btn-default\" title=\"Edit Zone\"><i class=\"fa fa-pencil\"></i></button>\n" +
    "                        <!--<button ng-click=\"enableEdit(detail.id,true)\"  class=\"btn btn-default\" title=\"View Dashboard\"><i class=\"fa fa-dashboard\"></i></button>-->\n" +
    "                    </td>\n" +
    "\n" +
    "                </tr>\n" +
    "\n" +
    "                <tr ng-if=\"config.show_zones_loader\" >\n" +
    "                    <td colspan=\"4\">\n" +
    "                        <div show-loader=\"config.show_zones_loader\"></div>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "                <tr ng-if=\"!config.show_zones_loader && zoneDetailList.length==0\">\n" +
    "                    <td colspan='4' class=\"alert alert-danger\">\n" +
    "                        <center> No Records Found.</center>\n" +
    "                    </td>\n" +
    "                </tr>\n" +
    "\n" +
    "                </tbody>\n" +
    "\n" +
    "            </table>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/access_header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/access_header.tpl.html",
    "<!-- navbar header -->\n" +
    "<div class=\"navbar-header {{app.settings.navbarHeaderColor}}\">\n" +
    "  \n" +
    "  <!-- brand -->\n" +
    "  <a href=\"javascript:void(0)\" class=\"navbar-brand text-white ct-nav-brand logopaddingbottom\">\n" +
    "  \n" +
    "    <img src=\"assets/logo-sm.png\" alt=\".\" >\n" +
    "    <span class=\"hidden-folded m-l-xs text-white\"><img alt=\"CareTime\" src=\"assets/logotext.png\"></span>\n" +
    "\n" +
    "    <!--<span class=\"hidden-folded m-l-xs text-white\">\n" +
    "      CARETIME\n" +
    "    </span>-->\n" +
    "  </a>\n" +
    "  <!-- / brand -->\n" +
    "</div>\n" +
    "<!-- / navbar header -->\n" +
    "\n" +
    "<!-- navbar collapse -->\n" +
    "<div class=\"collapse navbar-collapse box-shadow {{app.settings.navbarCollapseColor}}\" >\n" +
    "  \n" +
    "\n" +
    "  \n" +
    "</div>\n" +
    "<!-- / navbar collapse -->");
}]);

angular.module("partials/admin_header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/admin_header.tpl.html",
    "<!-- navbar header -->\n" +
    "<div class=\"navbar-header {{app.settings.navbarHeaderColor}}\">\n" +
    "   <button class=\"pull-right visible-xs dk\" ui-toggle-class=\"show\" data-target=\".navbar-collapse\">\n" +
    "   <i class=\"glyphicon glyphicon-cog\">\n" +
    "   </i>\n" +
    "   </button>\n" +
    "   <button class=\"pull-right visible-xs\" ui-toggle-class=\"show\" data-target=\".app-aside\" ui-scroll=\"app\">\n" +
    "   <i class=\"glyphicon glyphicon-align-justify\">\n" +
    "   </i>\n" +
    "   </button>\n" +
    "   <!-- brand -->\n" +
    "   <a href=\"javascript:void(0)\" class=\"navbar-brand text-white ct-nav-brand\">\n" +
    "      <img src=\"assets/logo-sm.png\" alt=\".\" >\n" +
    "      <span class=\"hidden-folded m-l-xs text-white\"><img alt=\"CareTime\" src=\"assets/logotext.png\"></span>\n" +
    "      <!--<span class=\"hidden-folded m-l-xs text-white\">\n" +
    "         CARETIME\n" +
    "         </span>-->\n" +
    "   </a>\n" +
    "   <!-- / brand -->\n" +
    "</div>\n" +
    "<!-- / navbar header -->\n" +
    "<!-- navbar collapse -->\n" +
    "<div class=\"collapse navbar-collapse box-shadow {{app.settings.navbarCollapseColor}}\" ng-controller=\"AdminheaderController\">\n" +
    "   <!-- buttons -->\n" +
    "   <div class=\"nav navbar-nav m-l-sm hidden-xs\">\n" +
    "      <a href class=\"btn no-shadow navbar-btn\" ng-click=\"app.settings.asideFolded = !app.settings.asideFolded\">\n" +
    "      <i class=\"fa {{app.settings.asideFolded ? 'fa-indent' : 'fa-dedent'}} fa-fw\">\n" +
    "      </i>\n" +
    "      </a>\n" +
    "   </div>\n" +
    "   <!-- nabar right -->\n" +
    "   <ul class=\"nav navbar-nav navbar-right\">\n" +
    "      <li class=\"dropdown\">\n" +
    "         <a href=\"https://caretime.zendesk.com/hc/en-us/requests/new\" class=\"dropdown-toggle\">\n" +
    "         <i class=\"icon-heart fa-fw\"></i>\n" +
    "         <span class=\"visible-xs-inline\">Help</span>\n" +
    "         <span class=\"badge badge-sm up bg-danger pull-right-xs\"></span>\n" +
    "         </a>\n" +
    "         <!-- dropdown -->\n" +
    "         <ul class=\"dropdown-menu animated fadeInRight w\">\n" +
    "            <li>\n" +
    "               <a href=\"https://caretime.zendesk.com/hc/en-us\" target=\"_blank\">Help Docs</a>\n" +
    "            </li>\n" +
    "            <li class=\"divider\"></li>\n" +
    "            <li>\n" +
    "               <a href=\"https://caretime.zendesk.com/hc/en-us\" target=\"_blank\">Submit Ticket</a>\n" +
    "            </li>\n" +
    "         </ul>\n" +
    "         <!-- / dropdown -->\n" +
    "      </li>\n" +
    "      <li class=\"dropdown\">\n" +
    "         <a href class=\"dropdown-toggle clear\" data-toggle=\"dropdown\">\n" +
    "         <span class=\"text-white\">\n" +
    "         {{currentUser.last_name}} {{currentUser.first_name}}\n" +
    "         </span>\n" +
    "         <b class=\"caret\">\n" +
    "         </b>\n" +
    "         </a>\n" +
    "         <!-- dropdown -->\n" +
    "         <ul class=\"dropdown-menu animated fadeInRight w\">\n" +
    "            <li>\n" +
    "               <a ui-sref=\"admin.updatePassword\">\n" +
    "               Update Password\n" +
    "               </a>\n" +
    "            </li>\n" +
    "            <li class=\"divider\">\n" +
    "            </li>\n" +
    "            <li>\n" +
    "               <a ng-click=\"logOut()\">\n" +
    "               Logout\n" +
    "               </a>\n" +
    "            </li>\n" +
    "         </ul>\n" +
    "         <!-- / dropdown -->\n" +
    "      </li>\n" +
    "   </ul>\n" +
    "   <!-- / navbar right -->\n" +
    "</div>\n" +
    "<!-- / navbar collapse -->\n" +
    "\n" +
    "");
}]);

angular.module("partials/admin_nav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/admin_nav.tpl.html",
    "<!-- first -->\n" +
    "<div class=\"aside-wrap\">\n" +
    "   <div class=\"navi-wrap\">\n" +
    "    <nav ui-nav class=\"navi\" >\n" +
    "  		<ul class=\"nav\">\n" +
    "  		<li class=\"hidden-folded padder m-t m-b-sm text-muted text-xs\">\n" +
    "		    <span >\n" +
    "		      NAVIGATION \n" +
    "		    </span>\n" +
    "	  	</li>\n" +
    "		 <li data-access-level=\"accessLevels.agencyDetail\">\n" +
    "		    <a ui-sref=\"admin.agency\" >\n" +
    "		    <i class=\"glyphicon glyphicon-record icon text-primary-lter\">\n" +
    "		    </i>\n" +
    "		    <span>\n" +
    "		    AGENCY DETAIL \n" +
    "		    </span>\n" +
    "		    </a>\n" +
    "		 </li>\n" +
    "		</ul>\n" +
    "	</nav>\n" +
    " </div>\n" +
    "</div>\n" +
    "  \n" +
    "<!-- / third -->\n" +
    "\n" +
    "");
}]);

angular.module("partials/aside.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/aside.tpl.html",
    "<div class=\"aside-wrap\">\n" +
    "  <div class=\"navi-wrap\">\n" +
    "    <!-- user -->\n" +
    "    <div class=\"clearfix hidden-xs text-center hide\" id=\"aside-user\">\n" +
    "      <div class=\"dropdown wrapper\">\n" +
    "        <a ui-sref=\"app.page.profile\">\n" +
    "          <span class=\"thumb-lg w-auto-folded avatar m-t-sm\">\n" +
    "            <img src=\"assets/a0.jpg\" class=\"img-full\" alt=\"...\">\n" +
    "          </span>\n" +
    "        </a>\n" +
    "        <a href class=\"dropdown-toggle hidden-folded\">\n" +
    "          <span class=\"clear\">\n" +
    "            <span class=\"block m-t-sm\">\n" +
    "              <strong class=\"font-bold text-lt\">{{username}}h</strong> \n" +
    "              <b class=\"caret\"></b>\n" +
    "            </span>\n" +
    "            <span class=\"text-muted text-xs block\">Director</span>\n" +
    "          </span>\n" +
    "        </a>\n" +
    "        <!-- dropdown -->\n" +
    "        <ul class=\"dropdown-menu animated fadeInRight w hidden-folded\">\n" +
    "          <li class=\"wrapper b-b m-b-sm bg-info m-t-n-xs\">\n" +
    "            <span class=\"arrow top hidden-folded arrow-info\"></span>\n" +
    "            <div>\n" +
    "              <p>300mb of 500mb used</p>\n" +
    "            </div>\n" +
    "            <progressbar value=\"60\" type=\"white\" class=\"progress-xs m-b-none dker\"></progressbar>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href>Settings</a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a ui-sref=\"app.page.profile\">Profile</a>\n" +
    "          </li>\n" +
    "          <li>\n" +
    "            <a href>\n" +
    "              <span class=\"badge bg-danger pull-right\">3</span>\n" +
    "              Notifications\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li class=\"divider\"></li>\n" +
    "          <li>\n" +
    "            <a ui-sref=\"access.signin\">Logout</a>\n" +
    "          </li>\n" +
    "        </ul>\n" +
    "        <!-- / dropdown -->\n" +
    "      </div>\n" +
    "      <div class=\"line dk hidden-folded\"></div>\n" +
    "    </div>\n" +
    "    <!-- / user -->\n" +
    "\n" +
    "    <!-- nav -->\n" +
    "    <nav ui-nav class=\"navi\" ng-include=\"'partials/nav.tpl.html'\"></nav>\n" +
    "    <!-- nav -->\n" +
    "\n" +
    "    <!-- aside footer \n" +
    "    <div class=\"wrapper m-t\">\n" +
    "      <div class=\"text-center-folded\">\n" +
    "        <span class=\"pull-right pull-none-folded\">60%</span>\n" +
    "        <span class=\"hidden-folded\" translate=\"aside.MILESTONE\">Milestone</span>\n" +
    "      </div>\n" +
    "      <progressbar value=\"60\" class=\"progress-xxs m-t-sm dk\" type=\"info\"></progressbar>\n" +
    "      <div class=\"text-center-folded\">\n" +
    "        <span class=\"pull-right pull-none-folded\">35%</span>\n" +
    "        <span class=\"hidden-folded\" translate=\"aside.RELEASE\">Release</span>\n" +
    "      </div>\n" +
    "      <progressbar value=\"35\" class=\"progress-xxs m-t-sm dk\" type=\"primary\"></progressbar>\n" +
    "    </div>\n" +
    "    <!-- / aside footer -->\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("partials/datepicker.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/datepicker.tpl.html",
    "<div ng-switch=\"view\">\n" +
    "  <div ng-switch-when=\"date\">\n" +
    "    <table>\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th ng-click=\"prev()\"><i class=\"glyphicon glyphicon-chevron-left\"></i></th>\n" +
    "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('month')\">{{date|date:\"yyyy MMMM\"}}</th>\n" +
    "        <th ng-click=\"next()\"><i class=\"glyphicon glyphicon-chevron-right\"></i></th>\n" +
    "      </tr>\n" +
    "      <tr>\n" +
    "        <th ng-repeat=\"day in weekdays\" style=\"overflow: hidden\">{{ day|date:\"EEE\" }}</th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr ng-repeat=\"week in weeks\">\n" +
    "        <td ng-repeat=\"day in week\">\n" +
    "          <span\n" +
    "            ng-class=\"{'now':isNow(day),'active':isSameDay(day),'disabled':(day.getMonth()!=date.getMonth()),'after':isAfter(day),'before':isBefore(day)}\"\n" +
    "            ng-click=\"setDate(day)\" ng-bind=\"day.getDate()\"></span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div ng-switch-when=\"year\">\n" +
    "    <table>\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th ng-click=\"prev(10)\"><i class=\"glyphicon glyphicon-chevron-left\"></i></th>\n" +
    "        <th colspan=\"5\" class=\"switch\">{{years[0].getFullYear()}}-{{years[years.length-1].getFullYear()}}</th>\n" +
    "        <th ng-click=\"next(10)\"><i class=\"glyphicon glyphicon-chevron-right\"></i></th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr>\n" +
    "        <td colspan=\"7\">\n" +
    "          <span ng-class=\"{'active':isSameYear(year),'now':isNow(year)}\"\n" +
    "                ng-repeat=\"year in years\"\n" +
    "                ng-click=\"setDate(year)\" ng-bind=\"year.getFullYear()\"></span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div ng-switch-when=\"month\">\n" +
    "    <table>\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th ng-click=\"prev()\"><i class=\"glyphicon glyphicon-chevron-left\"></i></th>\n" +
    "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('year')\">{{ date|date:\"yyyy\" }}</th>\n" +
    "        <th ng-click=\"next()\"><i class=\"glyphicon glyphicon-chevron-right\"></i></th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr>\n" +
    "        <td colspan=\"7\">\n" +
    "          <span ng-repeat=\"month in months\"\n" +
    "                ng-class=\"{'active':isSameMonth(month),'after':isAfter(month),'before':isBefore(month),'now':isNow(month)}\"\n" +
    "                ng-click=\"setDate(month)\"\n" +
    "                ng-bind=\"month|date:'MMM'\"></span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div ng-switch-when=\"hours\">\n" +
    "    <table>\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th ng-click=\"prev(24)\"><i class=\"glyphicon glyphicon-chevron-left\"></i></th>\n" +
    "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('date')\">{{ date|date:\"dd MMMM yyyy\" }}</th>\n" +
    "        <th ng-click=\"next(24)\"><i class=\"glyphicon glyphicon-chevron-right\"></i></th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr>\n" +
    "        <td colspan=\"7\">\n" +
    "          <span ng-repeat=\"hour in hours\"\n" +
    "                ng-class=\"{'now':isNow(hour),'active':isSameHour(hour)}\"\n" +
    "                ng-click=\"setDate(hour)\" ng-bind=\"hour | date:'hh a'\"></span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "  <div ng-switch-when=\"minutes\">\n" +
    "    <table>\n" +
    "      <thead>\n" +
    "      <tr>\n" +
    "        <th ng-click=\"prev()\"><i class=\"glyphicon glyphicon-chevron-left\"></i></th>\n" +
    "        <th colspan=\"5\" class=\"switch\" ng-click=\"setView('hours')\">{{ date|date:\"dd MMMM yyyy\" }}\n" +
    "        </th>\n" +
    "        <th ng-click=\"next()\"><i class=\"glyphicon glyphicon-chevron-right\"></i></th>\n" +
    "      </tr>\n" +
    "      </thead>\n" +
    "      <tbody>\n" +
    "      <tr>\n" +
    "        <td colspan=\"7\">\n" +
    "          <span ng-repeat=\"minute in minutes\"\n" +
    "                ng-class=\"{active:isSameMinutes(minute),'now':isNow(minute)}\"\n" +
    "                ng-click=\"setDate(minute,true)\"\n" +
    "                ng-bind=\"minute | date:'hh:mm'\"></span>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "      </tbody>\n" +
    "    </table>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("partials/header.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/header.tpl.html",
    "<!-- navbar header -->\n" +
    "<div class=\"navbar-header {{app.settings.navbarHeaderColor}}\">\n" +
    "  <button class=\"pull-right visible-xs dk\" ui-toggle-class=\"show\" data-target=\".navbar-collapse\">\n" +
    "    <i class=\"glyphicon glyphicon-cog\">\n" +
    "    </i>\n" +
    "  </button>\n" +
    "  <button class=\"pull-right visible-xs\" ui-toggle-class=\"show\" data-target=\".app-aside\" ui-scroll=\"app\">\n" +
    "    <i class=\"glyphicon glyphicon-align-justify\">\n" +
    "    </i>\n" +
    "  </button>\n" +
    "  <!-- brand -->\n" +
    "  <a href=\"javascript:void(0)\" class=\"navbar-brand text-white ct-nav-brand\">\n" +
    "  \n" +
    "    <img src=\"assets/logo-sm.png\" alt=\".\" >\n" +
    "    <span class=\"hidden-folded m-l-xs text-white\"><img alt=\"CareTime\" src=\"assets/logotext.png\"></span>\n" +
    "\n" +
    "    <!--<span class=\"hidden-folded m-l-xs text-white\">\n" +
    "      CARETIME\n" +
    "    </span>-->\n" +
    "  </a>\n" +
    "  <!-- / brand -->\n" +
    "</div>\n" +
    "<!-- / navbar header -->\n" +
    "\n" +
    "<!-- navbar collapse -->\n" +
    "<div class=\"collapse navbar-collapse box-shadow {{app.settings.navbarCollapseColor}}\" ng-controller=\"headerController\">\n" +
    "  <!-- buttons -->\n" +
    "  <div class=\"nav navbar-nav m-l-sm hidden-xs\">\n" +
    "    <a href class=\"btn no-shadow navbar-btn\" ng-click=\"app.settings.asideFolded = !app.settings.asideFolded\">\n" +
    "      <i class=\"fa {{app.settings.asideFolded ? 'fa-indent' : 'fa-dedent'}} fa-fw\">\n" +
    "      </i>\n" +
    "    </a>\n" +
    "    \n" +
    "  </div>\n" +
    "\n" +
    "\n" +
    "  <!-- / buttons -->\n" +
    "  \n" +
    "  \n" +
    "  \n" +
    "  \n" +
    "  \n" +
    "  <!-- nabar right -->\n" +
    "  <ul class=\"nav navbar-nav navbar-right\">\n" +
    "    <li>\n" +
    "      <a class=\"text-white font-bold \">{{agency_name}}</a>\n" +
    "    </li>\n" +
    "    <li class=\"dropdown\">\n" +
    "      <a href class=\"dropdown-toggle clear\" data-toggle=\"dropdown\">\n" +
    "        <span class=\"text-white\">\n" +
    "          REPORTS\n" +
    "        </span>\n" +
    "        \n" +
    "        <b class=\"caret\">\n" +
    "        </b>\n" +
    "      </a>\n" +
    "      <ul class=\"dropdown-menu animated fadeInRight w\">\n" +
    "         \n" +
    "          <li data-access-level=\"accessLevels.scheduleVsActuall\">\n" +
    "          <a ui-sref=\"ctApp.scheduleVsActuall\">\n" +
    "            <span>\n" +
    "             Actual vs Scheduled Report\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li data-access-level=\"accessLevels.authorizedVsActuall\">\n" +
    "          <a ui-sref=\"ctApp.authorizedVsActuall\">\n" +
    "            <span>\n" +
    "             Authorized Vs Actual Report\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "         <li data-access-level=\"accessLevels.employeeWeeklyHours\">\n" +
    "          <a ui-sref=\"ctApp.employeeWeeklyHours\">\n" +
    "            <span>\n" +
    "              Employee Weekly Hours\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li data-access-level=\"accessLevels.jobWeeklyHours\" >\n" +
    "          <a ui-sref=\"ctApp.jobWeeklyHours\">\n" +
    "            <span>\n" +
    "              Job Weekly Hours\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "         <li data-access-level=\"accessLevels.jobNoSchedule\" >\n" +
    "          <a ui-sref=\"ctApp.jobNoSchedule\">\n" +
    "            <span>\n" +
    "              Jobs Without Schedule\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li data-access-level=\"accessLevels.inactivityEmployee\" >\n" +
    "          <a ui-sref=\"ctApp.inactivityEmployee\">\n" +
    "            <span>\n" +
    "              Inactive Employee Report\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "\n" +
    "        <li class=\"divider\">\n" +
    "        </li>\n" +
    "\n" +
    "        <li data-access-level=\"accessLevels.scheduleReport\" >\n" +
    "          <a ui-sref=\"ctApp.scheduleReport\">\n" +
    "            <span>\n" +
    "              Schedule\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "               \n" +
    "        <li data-access-level=\"accessLevels.activityReporting\" >\n" +
    "          <a ui-sref=\"ctApp.activityReports\">\n" +
    "            <span>\n" +
    "              Activity Reporting\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "                  \n" +
    "      \n" +
    "        \n" +
    "        <li data-access-level=\"accessLevels.jobTask\">\n" +
    "          <a ui-sref=\"ctApp.jobTask\">\n" +
    "            <span>\n" +
    "              Job Task Report\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li data-access-level=\"accessLevels.jobObservation\">\n" +
    "          <a ui-sref=\"ctApp.jobObservation\">\n" +
    "            <span>\n" +
    "              Job Observation Report\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <!-- <li data-access-level=\"accessLevels.alertReport\">\n" +
    "          <a ui-sref=\"ctApp.alertReport\">\n" +
    "            <span>\n" +
    "              Alert Report\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li> -->\n" +
    "       \n" +
    "                \n" +
    "        <li data-access-level=\"accessLevels.employeeList\">\n" +
    "          <a ui-sref=\"ctApp.employeeList\">\n" +
    "            <span>\n" +
    "            Employee List\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li data-access-level=\"accessLevels.jobList\">\n" +
    "          <a ui-sref=\"ctApp.jobList\">\n" +
    "            <span>\n" +
    "            Job List\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "         <li data-access-level=\"accessLevels.accountActivities\">\n" +
    "          <a ui-sref=\"ctApp.accountActivities\">\n" +
    "            <span>\n" +
    "              Account Activity\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "         \n" +
    "       \n" +
    "        \n" +
    "        \n" +
    "      </ul>\n" +
    "    </li>\n" +
    "    \n" +
    "    <li >\n" +
    "      <li class=\"dropdown\">\n" +
    "        <a href class=\"dropdown-toggle clear\" data-toggle=\"dropdown\">\n" +
    "          <span class=\"text-white\">\n" +
    "            LOGS/TIMECARD\n" +
    "          </span>\n" +
    "          \n" +
    "          <b class=\"caret\">\n" +
    "          </b>\n" +
    "        </a>\n" +
    "        <ul class=\"dropdown-menu animated fadeInRight w\">\n" +
    "          \n" +
    "          <li data-access-level=\"accessLevels.timeCard\">\n" +
    "            <a ui-sref=\"ctApp.timeCard\">\n" +
    "              <span>\n" +
    "                Time Cards\n" +
    "              </span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          <li data-access-level=\"accessLevels.callLog\">\n" +
    "            <a ui-sref=\"ctApp.callLog\">\n" +
    "              <span>\n" +
    "                Call Log\n" +
    "              </span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          \n" +
    "          <li data-access-level=\"accessLevels.employeeActivity\">\n" +
    "            <a ui-sref=\"ctApp.employeeActivity\">\n" +
    "              <span>\n" +
    "                Employee Activities\n" +
    "              </span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "          \n" +
    "          <li data-access-level=\"accessLevels.customPrompt\">\n" +
    "            <a ui-sref=\"ctApp.customPrompt\">\n" +
    "              <span>\n" +
    "                Custom Prompts\n" +
    "              </span>\n" +
    "            </a>\n" +
    "          </li>\n" +
    "           <li data-access-level=\"accessLevels.alertLog\">\n" +
    "          <a ui-sref=\"ctApp.alertLog\">\n" +
    "            <span>\n" +
    "              Alert Log\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li class=\"divider\"></li>\n" +
    "        <li data-access-level=\"accessLevels.timecardsEmployee\" >\n" +
    "          <a ui-sref=\"ctApp.employeeTimecard\">\n" +
    "            <span>\n" +
    "              Time Cards by Employee\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li data-access-level=\"accessLevels.timecardsJobs\" >\n" +
    "          <a ui-sref=\"ctApp.jobTimecard\">\n" +
    "            <span>\n" +
    "              Time Cards by Job\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li data-access-level=\"access.timecardsExport\" >\n" +
    "          <a ui-sref=\"ctApp.timecardExport\">\n" +
    "            <span>\n" +
    "              Timecard Export \n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "         <li data-access-level=\"accessLevels.mapReport\" >\n" +
    "          <a ui-sref=\"ctApp.mapReport\">\n" +
    "            <span>\n" +
    "             Mobile Map Report\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "          <li data-access-level=\"accessLevels.dailyHoursChart\">\n" +
    "          <a ui-sref=\"ctApp.dailyHoursChart\">\n" +
    "            <span>\n" +
    "             Daily Hours Chart\n" +
    "            </span>\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        </ul>\n" +
    "    </li>\n" +
    "   \n" +
    "    <li class=\"dropdown\">\n" +
    "            <a href=\"https://caretime.zendesk.com/hc/en-us/requests/new\" class=\"dropdown-toggle\">\n" +
    "              <i class=\"icon-heart fa-fw\"></i>\n" +
    "              <span class=\"visible-xs-inline\">Help</span>\n" +
    "              <span class=\"badge badge-sm up bg-danger pull-right-xs\"></span>\n" +
    "            </a>\n" +
    "            <!-- dropdown -->\n" +
    "            <ul class=\"dropdown-menu animated fadeInRight w\">             \n" +
    "              <li>\n" +
    "                <a href=\"https://caretime.zendesk.com/hc/en-us\" target=\"_blank\">Help Docs</a>\n" +
    "              </li>\n" +
    "              <li class=\"divider\"></li>              \n" +
    "              <li>\n" +
    "                <a href=\"https://caretime.zendesk.com/hc/en-us\" target=\"_blank\">Submit Ticket</a>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "            <!-- / dropdown -->\n" +
    "    </li>\n" +
    "    <li class=\"dropdown\">\n" +
    "      <a href class=\"dropdown-toggle clear\" data-toggle=\"dropdown\">\n" +
    "     \n" +
    "        <span class=\"text-white\">\n" +
    "          {{currentUser.last_name}} {{currentUser.first_name}}\n" +
    "        </span>\n" +
    "        \n" +
    "        <b class=\"caret\">\n" +
    "        </b>\n" +
    "      </a>\n" +
    "      <!-- dropdown -->\n" +
    "      <ul class=\"dropdown-menu animated fadeInRight w\">\n" +
    "        \n" +
    "        <li ng-show=\"((supervisorUser == true) || (employeeUser == true))\">\n" +
    "          <a ng-click=\"$state.go('app.addemployee',{employeeId:employee_ID})\" href=\"\">\n" +
    "            Update Employee Detail\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        <li>\n" +
    "          <a ui-sref=\"ctApp.updatePassword\">\n" +
    "            Update Password\n" +
    "          </a>\n" +
    "        </li>\n" +
    "        \n" +
    "        <li class=\"divider\">\n" +
    "        </li>\n" +
    "        \n" +
    "        <li>\n" +
    "         <a ng-click=\"logOut()\">\n" +
    "          Logout\n" +
    "         </a>\n" +
    "        </li>\n" +
    "      </ul>\n" +
    "      <!-- / dropdown -->\n" +
    "    </li>\n" +
    "  </ul>\n" +
    "  <!-- / navbar right -->\n" +
    "  \n" +
    "</div>\n" +
    "<!-- / navbar collapse -->");
}]);

angular.module("partials/nav.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/nav.tpl.html",
    "<!-- first -->\n" +
    "\n" +
    "<ul class=\"nav\" ng-controller=\"NavCtrl\">\n" +
    "  <li class=\"hidden-folded padder m-t m-b-sm text-muted text-xs\">\n" +
    "    <span >\n" +
    "      NAVIGATION \n" +
    "    </span>\n" +
    "  </li>\n" +
    "  <li data-access-level=\"accessLevels.adminAgency\">\n" +
    "    <a ui-sref=\"admin.agency({'agencyService':{{ServiceName}}})\">\n" +
    "      <i class=\"glyphicon glyphicon-dashboard icon text-primary-dker\">\n" +
    "      </i>\n" +
    "      <span>\n" +
    "        AGENCY LIST\n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "\n" +
    "  <li data-access-level=\"accessLevels.mainDashboard\">\n" +
    "    <a ui-sref=\"ctApp.mainDashboard\">\n" +
    "      <i class=\"glyphicon glyphicon-dashboard icon text-primary-dker\">\n" +
    "      </i>\n" +
    "      <span>\n" +
    "        DASHBOARD\n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li class=\"line dk\">\n" +
    "  </li>\n" +
    "  <li data-access-level=\"accessLevels.agencyDetail\">\n" +
    "    <a ui-sref=\"ctApp.AddUpdateAgency({'agencyId':{{AgencyID}}})\" >\n" +
    "      <i class=\"glyphicon glyphicon-record icon text-primary-lter\">\n" +
    "      </i>\n" +
    "      <span>\n" +
    "        AGENCY DETAIL \n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  \n" +
    "  <li>\n" +
    "    <a href class=\"auto\">\n" +
    "      <span class=\"pull-right text-muted\">\n" +
    "        <i class=\"fa fa-fw fa-angle-right text\">\n" +
    "        </i>\n" +
    "        <i class=\"fa fa-fw fa-angle-down text-active\">\n" +
    "        </i>\n" +
    "      </span>\n" +
    "      <i class=\"glyphicon glyphicon-pushpin icon text-primary-lter\">\n" +
    "      </i>\n" +
    "      <span>\n" +
    "        MANAGE LISTS\n" +
    "      </span>\n" +
    "    </a>\n" +
    "    <ul class=\"nav nav-sub dk\">\n" +
    "      \n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.payTypes\"  data-access-level=\"accessLevels.payTypes\">\n" +
    "          <span>\n" +
    "            Pay Types\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.serviceItems\" data-access-level=\"accessLevels.serviceItems\">\n" +
    "          <span>\n" +
    "            Service Items\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.customPrompts\" data-access-level=\"accessLevels.customPrompts\">\n" +
    "          <span>\n" +
    "            Custom Prompts\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.payors\" data-access-level=\"accessLevels.payors\">\n" +
    "          <span>\n" +
    "            Payors\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.activities\" data-access-level=\"accessLevels.activities\">\n" +
    "          <span>\n" +
    "            Activities\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.skills\" data-access-level=\"accessLevels.skills\">\n" +
    "          <span>\n" +
    "            Skills\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.payClasses\" data-access-level=\"accessLevels.payClasses\">\n" +
    "          <span>\n" +
    "            Pay Classes\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.tasks\" data-access-level=\"accessLevels.tasks\">\n" +
    "          <span>\n" +
    "            Tasks\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.observations\" data-access-level=\"accessLevels.observations\">\n" +
    "          <span>\n" +
    "            Observations\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        <a ui-sref=\"ctApp.activityCodes\" data-access-level=\"accessLevels.activityCodes\">\n" +
    "          <span>\n" +
    "            Activity Codes\n" +
    "          </span>\n" +
    "        </a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </li>\n" +
    "  \n" +
    "  <li class=\"line dk\">\n" +
    "  </li>\n" +
    "  <li ui-sref-active=\"ctApp.zones\" data-access-level=\"accessLevels.zones\" >\n" +
    "    <a ui-sref=\"ctApp.zones\" >\n" +
    "      <i class=\"glyphicon glyphicon-map-marker icon text-primary-dker\">\n" +
    "      </i>\n" +
    "      <span ng-if=\"labels.Zones == ''\" translate=\"aside.nav.ZONES\">\n" +
    "        Zones\n" +
    "      </span>\n" +
    "      <span ng-if=\"labels.Zones !== ''\">\n" +
    "        {{labels.Zones}}\n" +
    "      </span>\n" +
    "      \n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li data-access-level=\"accessLevels.employees\" >\n" +
    "    <a ui-sref=\"ctApp.employees\">\n" +
    "      <i class=\"glyphicon glyphicon-user icon text-primary-dker\">\n" +
    "      </i>\n" +
    "      <span ng-if=\"labels.Employees == ''\" translate=\"aside.nav.EMPLOYEES\">\n" +
    "        Employees\n" +
    "      </span>\n" +
    "      <span ng-if=\"labels.Employees !== ''\" >\n" +
    "        {{labels.Employees}}\n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li data-access-level=\"accessLevels.jobs\">\n" +
    "    <a ui-sref=\"ctApp.jobs\">\n" +
    "      <i class=\"glyphicon glyphicon-barcode icon text-primary-dker\">\n" +
    "      </i>\n" +
    "      <span ng-if=\"labels.Jobs == ''\" translate=\"aside.nav.JOBS\">\n" +
    "        Jobs\n" +
    "      </span>\n" +
    "      <span ng-if=\"labels.Jobs !== ''\" >\n" +
    "        {{labels.Jobs}}\n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li data-access-level=\"accessLevels.authorizations\">\n" +
    "    <a ui-sref=\"ctApp.authorizations\">\n" +
    "      <i class=\"glyphicon glyphicon-check icon text-primary-dker\">\n" +
    "      </i>\n" +
    "      <span>\n" +
    "        AUTHORIZATION\n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  \n" +
    "  <li class=\"line dk\">\n" +
    "  </li>\n" +
    "  \n" +
    "  <li data-access-level=\"accessLevels.schedules\">\n" +
    "    <a ui-sref=\"ctApp.schedules\">\n" +
    "      <i class=\"glyphicon glyphicon-calendar icon text-primary-dker\">\n" +
    "      </i>\n" +
    "      <span>\n" +
    "        SCHEDULING\n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    "  <li data-access-level=\"accessLevels.mapView\" >\n" +
    "    <a ui-sref=\"ctApp.mapView\">\n" +
    "      <i class=\"glyphicon glyphicon-map-marker icon text-primary-dker\">\n" +
    "      </i>\n" +
    "      <span>\n" +
    "        MAP VIEW\n" +
    "      </span>\n" +
    "    </a>\n" +
    "  </li>\n" +
    " \n" +
    "</ul>\n" +
    "<!-- / third -->\n" +
    "\n" +
    "");
}]);

angular.module("partials/page_footer.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/page_footer.tpl.html",
    "<div>\n" +
    "  <small class=\"text-muted\">&copy; CareTime 2014 </small>\n" +
    "<!--<div id=\"hc-container\"></div>-->\n" +
    "  <!--<div class=\"pull-right\">\n" +
    "    <a href=\"https://caretime.zendesk.com/hc/en-us\" class=\"bg-success\">Help </a>\n" +
    "  </div> -->\n" +
    "</div>\n" +
    "<!-- Start of Zendesk Widget script -->\n" +
    "<script>/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement(\"iframe\");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src=\"javascript:false\",r.title=\"\",r.role=\"presentation\",(r.frameElement||r).style.cssText=\"display: none\",d=document.getElementsByTagName(\"script\"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(c){n=document.domain,r.src='javascript:var d=document.open();d.domain=\"'+n+'\";void(0);',o=s}o.open()._l=function(){var o=this.createElement(\"script\");n&&(this.domain=n),o.id=\"js-iframe-async\",o.src=e,this.t=+new Date,this.zendeskHost=t,this.zEQueue=a,this.body.appendChild(o)},o.write('<body onload=\"document._l();\">'),o.close()}(\"//assets.zendesk.com/embeddable_framework/main.js\",\"caretime.zendesk.com\");/*]]>*/</script>\n" +
    "<!-- End of Zendesk Widget script -->");
}]);

angular.module("partials/settings.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/settings.tpl.html",
    "<div class=\"settings panel panel-default\" ng-class=\"{active : show_setting_panel}\">\n" +
    "<!-- settings -->\n" +
    "<button class=\"btn btn-default no-shadow pos-abt\" ng-click=\"show_setting_panel=!show_setting_panel;\" target=\".settings\"><i class=\"fa fa-gear\"></i></button>\n" +
    "<div class=\"panel-heading\">\n" +
    "    Settings\n" +
    "</div>\n" +
    "<div class=\"panel-body\">\n" +
    "    <div class=\"m-b-sm\">\n" +
    "        <label class=\"i-switch bg-info pull-right\">\n" +
    "            <input type=\"checkbox\" ng-model=\"app.settings.headerFixed\">\n" +
    "            <i></i>\n" +
    "        </label>\n" +
    "        Fixed header\n" +
    "    </div>\n" +
    "    <div class=\"m-b-sm\">\n" +
    "        <label class=\"i-switch bg-info pull-right\">\n" +
    "            <input type=\"checkbox\" ng-model=\"app.settings.asideFixed\">\n" +
    "            <i></i>\n" +
    "        </label>\n" +
    "        Fixed aside\n" +
    "    </div>\n" +
    "    <div>\n" +
    "        <label class=\"i-switch bg-info pull-right\">\n" +
    "            <input type=\"checkbox\" ng-model=\"app.settings.asideFolded\">\n" +
    "            <i></i>\n" +
    "        </label>\n" +
    "        Folded aside\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div class=\"wrapper b-t b-light bg-light lter r-b\">\n" +
    "    <div class=\"row row-sm\">\n" +
    "        <div class=\"col-xs-6\">\n" +
    "\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-black'; \n" +
    "          app.settings.navbarCollapseColor='bg-black'; \n" +
    "          app.settings.asideColor='bg-white b-r';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"1\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-black header\"></b>\n" +
    "            <b class=\"bg-black header\"></b>\n" +
    "            <b class=\"bg-white\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-white-only'; \n" +
    "          app.settings.navbarCollapseColor='bg-white-only'; \n" +
    "          app.settings.asideColor='bg-black';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"2\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-white header\"></b>\n" +
    "            <b class=\"bg-white header\"></b>\n" +
    "            <b class=\"bg-black\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-primary'; \n" +
    "          app.settings.navbarCollapseColor='bg-white-only'; \n" +
    "          app.settings.asideColor='bg-dark';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"3\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-primary header\"></b>\n" +
    "            <b class=\"bg-white header\"></b>\n" +
    "            <b class=\"bg-dark\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-info'; \n" +
    "          app.settings.navbarCollapseColor='bg-white-only'; \n" +
    "          app.settings.asideColor='bg-black';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"4\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-info header\"></b>\n" +
    "            <b class=\"bg-white header\"></b>\n" +
    "            <b class=\"bg-black\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-success'; \n" +
    "          app.settings.navbarCollapseColor='bg-white-only'; \n" +
    "          app.settings.asideColor='bg-dark';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"5\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-success header\"></b>\n" +
    "            <b class=\"bg-white header\"></b>\n" +
    "            <b class=\"bg-dark\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"i-checks block\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-danger'; \n" +
    "          app.settings.navbarCollapseColor='bg-white-only'; \n" +
    "          app.settings.asideColor='bg-dark';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"6\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-danger header\"></b>\n" +
    "            <b class=\"bg-white header\"></b>\n" +
    "            <b class=\"bg-dark\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div class=\"col-xs-6\">\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-primary'; \n" +
    "          app.settings.navbarCollapseColor='bg-primary'; \n" +
    "          app.settings.asideColor='bg-white b-r';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"7\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-primary header\"></b>\n" +
    "            <b class=\"bg-primary header\"></b>\n" +
    "            <b class=\"bg-white\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-info dker'; \n" +
    "          app.settings.navbarCollapseColor='bg-info dker'; \n" +
    "          app.settings.asideColor='bg-light dker b-r';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"8\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-info dker header\"></b>\n" +
    "            <b class=\"bg-info dker header\"></b>\n" +
    "            <b class=\"bg-light dker\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-primary'; \n" +
    "          app.settings.navbarCollapseColor='bg-primary'; \n" +
    "          app.settings.asideColor='bg-dark';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"9\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-primary header\"></b>\n" +
    "            <b class=\"bg-primary header\"></b>\n" +
    "            <b class=\"bg-dark\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-info dker'; \n" +
    "          app.settings.navbarCollapseColor='bg-info dk'; \n" +
    "          app.settings.asideColor='bg-black';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"10\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-info dker header\"></b>\n" +
    "            <b class=\"bg-info dk header\"></b>\n" +
    "            <b class=\"bg-black\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"i-checks block m-b\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-success'; \n" +
    "          app.settings.navbarCollapseColor='bg-success';\n" +
    "          app.settings.asideColor='bg-dark';\n" +
    "          \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"11\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-success header\"></b>\n" +
    "            <b class=\"bg-success header\"></b>\n" +
    "            <b class=\"bg-dark\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "\n" +
    "            <label class=\"i-checks block\" ng-click=\"\n" +
    "          app.settings.navbarHeaderColor='bg-danger dker bg-gd'; \n" +
    "          app.settings.navbarCollapseColor='bg-danger dker bg-gd'; \n" +
    "          app.settings.asideColor='bg-dark';\n" +
    "         \">\n" +
    "                <input type=\"radio\" ng-model=\"app.settings.themeID\" value=\"12\">\n" +
    "          <span class=\"block bg-light clearfix pos-rlt\">\n" +
    "            <span class=\"active pos-abt w-full h-full bg-black-opacity text-center\">\n" +
    "              <i class=\"glyphicon glyphicon-ok text-white m-t-xs\"></i>\n" +
    "            </span>\n" +
    "            <b class=\"bg-danger dker header\"></b>\n" +
    "            <b class=\"bg-danger dker header\"></b>\n" +
    "            <b class=\"bg-dark\"></b>\n" +
    "          </span>\n" +
    "            </label>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<!-- /settings -->\n" +
    "</div>\n" +
    "");
}]);

angular.module("utils/directive-templates/dropdown.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/directive-templates/dropdown.tpl.html",
    "<div >\n" +
    "    <div class=\"btn-group btn-block animate-if\" dropdown is-open=\"dropdown_options.is_open\">\n" +
    "        <button type=\"button\" class=\"btn btn-default dropdown-toggle btn-block {{ dropdown_options.btn_class }}\"  ng-disabled=\"dropdown_options.disable_btn\"\n" +
    "                ng-class=\"{'btn-lg' : dropdown_options.big_btn}\" data-toggle=\"dropdown\">\n" +
    "            <span class=\"dropdown-label\"></span><span class=\"caret\"></span>\n" +
    "        </button>\n" +
    "        <ul ng-if=\"!dropdown_options.is_key_value\" class=\"dropdown-menu apply-max\" role=\"menu\">\n" +
    "            <li data-ng-repeat=\"item in array_list\" data-value=\"{{ item }}\" data-name=\"{{ item }}\">\n" +
    "                <a href=\"javascript:void(0);\">{{ item }}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <ul ng-if=\"dropdown_options.is_key_value\" class=\"dropdown-menu apply-max\" role=\"menu\">\n" +
    "            <li data-ng-repeat=\"item in array_list\" data-value=\"{{ getValue(item, dropdown_options.key_value)}}\" data-name=\"{{ getValue(item, dropdown_options.key_name) }}\">\n" +
    "                <a href=\"javascript:void(0);\">{{ getValue(item, dropdown_options.key_name) }}</a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("utils/directive-templates/inline-edit.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/directive-templates/inline-edit.tpl.html",
    "<div class=\"inline-edit-wrapper\">\n" +
    "    <div ng-show=\"renderTemplate('textarea')\">\n" +
    "        <textarea  on-enter=\"saveAndNext()\" class=\"form-control\" on-esc=\"cancel()\" ng-model=\"model\" ng-show=\"editMode\" eat-click focus-on-show = \"adding_task\"></textarea>\n" +
    "    </div>\n" +
    "    <div ng-show=\"renderTemplate('textfield')\">\n" +
    "        <input type=\"text\" on-enter=\"save()\" on-esc=\"cancel()\" ng-model=\"model\" ng-placeholder=\"pholder\" ng-show=\"editMode\" eat-click class=\"form-control\"/>\n" +
    "    </div>\n" +
    "    <a href ng-click=\"save()\" ng-show=\"editMode\" eat-click class='task-action'>\n" +
    "        <span class='fa fa-check-circle-o text-success' style=\"font-size: 16px;\"></span>\n" +
    "    </a>\n" +
    "    <a href ng-click=\"cancel()\" ng-show=\"editMode\" eat-click >\n" +
    "        <span class='fa fa-times-circle-o text-muted' style=\"font-size: 15px;\"></span>\n" +
    "    </a>\n" +
    "\n" +
    "    <p class=\"form-control-static\" ng-mouseenter=\"showEdit = true\" ng-mouseleave=\"showEdit = false\" class=\"editable\">\n" +
    "        <span class=\"editable-text\" ng-hide=\"editMode\" ng-click=\"edit()\" eat-click>{{model}}</span>\n" +
    "        <span class=\"editable-text\" ng-hide=\"model||editMode\" ng-click=\"edit()\">{{ pholder }}</span>\n" +
    "    </p>\n" +
    "</div>");
}]);

angular.module("utils/directive-templates/popover-html-unsafe-popup.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("utils/directive-templates/popover-html-unsafe-popup.tpl.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" bind-html-unsafe=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>");
}]);
