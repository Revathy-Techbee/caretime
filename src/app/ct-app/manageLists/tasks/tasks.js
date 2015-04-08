angular.module('ctApp.tasks', [
    'ui.router'
])

.config(['$stateProvider', function config($stateProvider) {
    var access = routingConfig.accessLevels;
    $stateProvider.state('ctApp.tasks', {
        url: '/tasks',
        views: {
            "appNested": {
                controller: 'TasksCtrl',
                templateUrl: 'ct-app/manageLists/tasks/tasks.tpl.html'
            }
        },
        data: {
            pageTitle: 'Tasks',
            access: access.tasks
        }
    }).state('ctApp.addUpdateTask', {
        url: '/task/:taskId',
        views: {
            "appNested": {
                controller: 'AddUpdateTaskCtrl',
                templateUrl: 'ct-app/manageLists/tasks/add-update-task.tpl.html'
            }
        },
        data: {
            pageTitle: 'Add/Edit Task',
            access: access.tasks
        }
    });

}])

.controller("TasksCtrl", ["$scope", "Services", "$state", "$modal",
    function($scope, Services, $state, $modal) {
        $scope.config = {
            general: {
                searchtxt: ""
            },
            page_size: 15,
            loaded_all_records: false,
            show_tasks_loader: true
        };
        $scope.disable_infinite_scroll = false;
        $scope.sortField = "task_name";
        $scope.sortType = "asc";
        $scope.taskDetailList = [];


        $scope.getNextData = function(offset) { // on pagination
            if ($scope.disable_infinite_scroll || $scope.config.loaded_all_records) {
                return;
            }
            $scope.disable_infinite_scroll = true;
            $scope.config.show_tasks_loader = true;
            $scope.filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                offset: $scope.taskDetailList.length,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter:'agency_id='+Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter+' and task_name like "%' + $scope.config.general.searchtxt + '%"';
            }
            Services.tasksName.get($scope.filterObj, function(data) {
                for (var i = 0; i < data.record.length; i++) {
                    $scope.taskDetailList.push(data.record[i]);
                }
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                }
                $scope.disable_infinite_scroll = false;
                $scope.config.show_tasks_loader = false;

            });
        };

        $scope.updateTableData = function(isFilter) { // on limit change
            $scope.taskDetailList = [];
            $scope.config.show_tasks_loader = true;
            $scope.filterObj = {
                limit: $scope.config.page_size,
                include_count: true,
                order: $scope.sortField + ' ' + $scope.sortType,
                filter:'agency_id='+Services.getAgencyID()
            };
            if ($scope.config.general.searchtxt && $scope.config.general.searchtxt !== '') {
                $scope.filterObj.filter = $scope.filterObj.filter+' and task_name like "%' + $scope.config.general.searchtxt + '%"';
            }
            Services.tasksName.get($scope.filterObj, function(data) {
                $scope.taskDetailList = data.record;
                if (data.record.length < $scope.config.page_size) {
                    $scope.config.loaded_all_records = true;
                } else {
                    $scope.config.loaded_all_records = false;
                }
                $scope.config.show_tasks_loader = false;
            });

        };

        $scope.applyProgramSort = function() {
            $scope.updateTableData();
        };

        $scope.clearSearch = function() {
            $scope.config.general.searchtxt = "";
            $scope.updateTableData();
        };


        $scope.enableEditView = function(id) {
            $state.go("ctApp.addUpdateTask", {
                taskId: id
            });
        };
        $scope.enableDelete = function(id) {
            Services.setModelTempVar(id);
            $scope.modalInstance = $modal.open({
                template: '<div class="modal-header"> <h3 class="modal-title">Delete</h3></div><div class="modal-body"><b> Would you like to delete the Task permanently?</b></div><div class="modal-footer"> <button class="btn btn-default" ng-click="cancel()">Cancel</button><button class="btn btn-primary" ng-click="all()">Delete</button> </div>',
                controller: 'DeleteTaskCtrl'
            });
            $scope.modalInstance.result.then(function(id) {
                Services.tasksName.delete({
                    filter: "id='" + id + "'"
                }, function(data) {
                    $scope.updateTableData();
                });

            }, function() {

            });

        };


    }
])

/*
 * Add Update
 * Task Controller....
 * **/

.controller("AddUpdateTaskCtrl", ["$scope", "Services", "$state", "$stateParams", "$timeout", "HelperService", "$localStorage",
    function($scope, Services, $state, $stateParams, $timeout, HelperService, $localStorage) {

        $scope.task_id = $stateParams.taskId;
        $scope.task = {};
        $scope.pageTitle = "Add New";
        $scope.taskDBField = null;
        $scope.show_task_form_loader = false;
        $scope.task.status = 1;

        $scope.getTaskDetail = function() {
            if ($scope.task_id) {
                $scope.pageTitle = "Update";


                Services.tasksName.get({
                    "filter": "id='" + $scope.task_id + "'"
                }, function(resp) {
                    $scope.taskDBField = resp.record[0];
                    angular.extend($scope.task, {
                        name: $scope.taskDBField.task_name,
                        status: $scope.taskDBField.status,
                        created_on: HelperService.converttimeZone($scope.taskDBField.created_date),
                        // created_by: $scope.taskDBField.created_by,
                        editedOn: HelperService.converttimeZone($scope.taskDBField.modified_date),
                        // edited_by: $scope.taskDBField.edited_by
                    });
                });


            }
        };
        $scope.getTaskDetail();
        $scope.taskManage = function(step) {
            $scope.showerrorMsg = false;
            if ($scope.addUpdateTaskForm.$valid) {
                $scope.show_task_form_loader = true;
                $scope.taskDBField = {
                   // id:100,
                    task_name: $scope.task.name,
                    status: $scope.task.status
                };

                if ($scope.task_id) { // means it is in edit state
                    //$scope.taskDBField.modified_date = moment().utc();
                    /* $scope.taskDBField.edited_by = JSON.stringify({
                        name: $localStorage.user_info.username,
                        id: $localStorage.user_info.user_id
                    });
*/


                } else {
                    $scope.taskDBField.agency_id=Services.getAgencyID();
                    $scope.taskDBField.created_date = moment().utc();
                    $scope.taskDBField.modified_date =moment().utc();
                    /* $scope.taskDBField.created_by = JSON.stringify({
                         name: $localStorage.user_info.username,
                         id: $localStorage.user_info.user_id
                     });*/

                }

                if ($scope.task_id) {

                    Services.tasksName.update({
                        id: $stateParams.taskId
                    }, $scope.taskDBField, function(data) {
                        $scope.show_task_form_loader = false;
                        $scope.showMessageFunc("Task detail edited sucessfully.", "success", function() {
                            $timeout(function() {
                                $scope.showerrorMsg = false;
                                $state.go("ctApp.tasks");
                            }, 3000);
                        });
                    });

                } else {

                    Services.tasksName.save($scope.taskDBField, function(data) {
                        $scope.showMessageFunc("New Task added sucessfully.", "success", function() {
                            $scope.show_task_form_loader = false;
                            $timeout(function() {
                                $scope.showerrorMsg = false;
                                $state.go("ctApp.tasks");
                            }, 3000);
                        });
                    });

                }


            }

        };

        $scope.showMessageFunc = function(error_msg, error_class, callback) {
            $scope.ErrorMsg = error_msg || "Operation was successfull.";
            $scope.ErrorClass = error_class || "success";
            if (callback) {
                callback();
            } else {
                $timeout(function() {
                    $scope.showerrorMsg = false;
                }, 3000);
            }
            $scope.showerrorMsg = true;
        };




        $scope.cancelTask = function() {
            $state.go("ctApp.tasks");
        };

    }
]).controller("DeleteTaskCtrl", ["$scope", "Services", "$modalInstance", function($scope, Services, $modalInstance) {
    var TaskID = Services.getModelTempVar();
    Services.setModelTempVar('');
    $scope.all = function() {
        $modalInstance.close(TaskID);
    };
    $scope.cancel = function() {

        $modalInstance.dismiss('cancel');

    };
}]);