(function(exports){

    var config = {

        /* List all the roles you wish to use in the app
        * You have a max of 31 before the bit shift pushes the accompanying integer out of
        * the memory footprint for an integer
        */
       /* roles :[
            'public',
            'user',
            'administrator',
            'employee',
            'supervisor',
            'consumer'
        ],
        */
        roles :[
            'Admin',
            'HR',
            'Nursing',
            'OfficeClerical',
            'OfficeMgr',
            'OnCall',
            'CorporateBillingDepartment',
            'Scheduler',
            'public',
            'Basic',
            'SuperAdmin'
        ],

        /*
        Build out all the access levels you want referencing the roles listed above
        You can use the "*" symbol to represent access to all roles
         */
        /*accessLevels : {
            'public' : "*",
            'anon': ['public'],
            'user' : ['consumer', 'supervisor', 'administrator', 'employee'],
            'administrator': ['administrator'],
            'employee' : ['employee'],
            'supervisor' : ['supervisor'],
            'consumer': ['consumer']

        }*/
        accessLevels : {
            'public' : "*",
            'mainDashboard' :['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler','Basic'],
            'agencyDetail' :['SuperAdmin','Admin'],

            'payTypes' :['SuperAdmin','Admin','OfficeClerical','OfficeMgr','CorporateBillingDepartment'],
            'serviceItems' :['SuperAdmin','Admin','OfficeClerical','OfficeMgr','CorporateBillingDepartment'],
            'customPrompts' :['SuperAdmin','Admin','Nursing'],
            'payors' :['SuperAdmin','Admin','OfficeClerical','OfficeMgr','CorporateBillingDepartment'],
            'activities' :['SuperAdmin','Admin','Nursing','OfficeClerical','OfficeMgr','CorporateBillingDepartment'],
            'skills' :['SuperAdmin','Admin','Nursing','OfficeClerical','CorporateBillingDepartment'],
            'payClasses' :['SuperAdmin','Admin','OfficeClerical','OfficeMgr','CorporateBillingDepartment'],
            'tasks': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','Scheduler'],
            'observations': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','Scheduler'],
            'activityCodes': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','Scheduler'],



            'zones' :['SuperAdmin','Admin','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment'],
            'jobs' : ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'employees': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'authorizations':['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'schedules': ['SuperAdmin','Admin','HR','Nursing','OfficeMgr','OnCall','Scheduler'],
             'mapView': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],



            'timeCard':['SuperAdmin','Admin','OfficeMgr','CorporateBillingDepartment','Scheduler'],
            'callLog' : ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'employeeActivity' : ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'customPrompt' : ['SuperAdmin','Admin','Nursing','OfficeMgr'],
            'alertLog': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],

            

            'timecardsEmployee' : ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'timecardsJobs': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
           
            'scheduleReport' : ['SuperAdmin','Admin','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'inactivityEmployee': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'jobNoSchedule': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'activityReporting' : ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'employeeWeeklyHours': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'jobWeeklyHours': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
           'dailyHoursChart': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'accountActivities': ['SuperAdmin','Admin','OfficeMgr','CorporateBillingDepartment'],
            'jobTask': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','Scheduler'],
            'jobObservation': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','Scheduler'],
            
         
            'scheduleVsActuall': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'authorizedVsActuall': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'budgetVsActual': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],

            'employeeList': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'jobList': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'mapReport': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],
            'timecardsExport': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler'],

            'updatePassword': ['SuperAdmin','Admin','HR','Nursing','OfficeClerical','OfficeMgr','OnCall','CorporateBillingDepartment','Scheduler','Basic'],

            'adminAgency': ['SuperAdmin'],

            //'zoneRestriction': ['SuperAdmin','Admin']

        }

    };

    exports.userRoles = buildRoles(config.roles);
    exports.accessLevels = buildAccessLevels(config.accessLevels, exports.userRoles);

    /*
        Method to build a distinct bit mask for each role
        It starts off with "1" and shifts the bit to the left for each element in the
        roles array parameter
     */

    function buildRoles(roles){

        var bitMask = "01";
        var userRoles = {};

        for(var role in roles){
            var intCode = parseInt(bitMask, 2);
            userRoles[roles[role]] = {
                bitMask: intCode,
                title: roles[role]
            };
            bitMask = (intCode << 1 ).toString(2);
        }

        return userRoles;
    }

    /*
    This method builds access level bit masks based on the accessLevelDeclaration parameter which must
    contain an array for each access level containing the allowed user roles.
     */
    function buildAccessLevels(accessLevelDeclarations, userRoles){

        var accessLevels = {};
        for(var level in accessLevelDeclarations){
            var resultBitMask;
            if(typeof accessLevelDeclarations[level] == 'string'){
                if(accessLevelDeclarations[level] == '*'){

                    resultBitMask = '';

                    for( var user_role in userRoles){
                        resultBitMask += "1";
                    }
                    //accessLevels[level] = parseInt(resultBitMask, 2);
                    accessLevels[level] = {
                        bitMask: parseInt(resultBitMask, 2)
                    };
                }
                else {
                    console.log("Access Control Error: Could not parse '" + accessLevelDeclarations[level] + "' as access definition for level '" + level + "'");
                }

            }
            else {

                resultBitMask = 0;
                for(var role in accessLevelDeclarations[level]){
                    if(userRoles.hasOwnProperty(accessLevelDeclarations[level][role])){
                        resultBitMask = resultBitMask | userRoles[accessLevelDeclarations[level][role]].bitMask;
                    }
                    else {
                        console.log("Access Control Error: Could not find role '" + accessLevelDeclarations[level][role] + "' in registered roles while building access for '" + level + "'");
                    }
                }
                accessLevels[level] = {
                    bitMask: resultBitMask
                };
            }
        }

        return accessLevels;
    }

})(typeof exports === 'undefined' ? this['routingConfig'] = {} : exports);