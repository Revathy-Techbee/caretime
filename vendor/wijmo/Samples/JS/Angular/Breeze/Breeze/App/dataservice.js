'use strict';

// define functions that select, update, add and remove data with BreezeJS.
app.dataservice = (function (breeze, logger) {

    // backingStore is the modelLibrary for Angular
    breeze.config.initializeAdapterInstance("modelLibrary", "backingStore", true); 

    // route to the (same origin) Web Api controller
    var serviceName = 'breeze/WijmoNxtNorthBreeze'; 

    // gets metadata from /breeze/NorthBreeze/Metadata
    var manager = new breeze.EntityManager(serviceName);  

    var _isSaving = false;

    return {
        //define all the functions exposed in this service.
        getCustomerPage: getCustomerPage,
        getOrders: getOrders,
        getChanges: getChanges,
        subscribeChanges: subscribeChanges,
        saveChanges: saveChanges,
        rejectChanges: rejectChanges
    };

    /*** implementation details ***/
   
    // query the customer information according to the specified filter(searchText) and page(skip, take).
    function getCustomerPage(skip, take, searchText) {
        var query = breeze.EntityQuery
                .from("Customers")
                .orderBy("CompanyName")
                .inlineCount(true);
        if (skip >= 0 && take > 0) {
        	query = query.skip(skip).take(take)
        }
        if (searchText) {
            query = query.where("CompanyName", "contains", searchText);
        }

        return manager.executeQuery(query);
    }

    // query the orders belongs to the specified customer.
    // if the customer is not set, query 50 orders.
    function getOrders(customer) {
        if (customer) {
            return customer.entityAspect.loadNavigationProperty("Orders");
        }
        else {
            var query = breeze.EntityQuery
                    .from("Orders")
                    .take(50);

            return manager.executeQuery(query);
        }
    }    

    // return an array of entities that have changes
    function getChanges(entityType) {
        return manager.getChanges(entityType);
    }

    // subscribe to the entityChanged event
    function subscribeChanges(callback) {
        manager.entityChanged.subscribe(callback);
    }

    // reject the appended changes.
    function rejectChanges() {
        manager.rejectChanges();
    }

    // save the changes
    function saveChanges(entities, succeeded, failed) {
        if (manager.hasChanges()) {
            if (_isSaving) {
                setTimeout(function () {
                    saveChanges(entities, succeeded, failed);
                }, 50);
                return;
            }
            _isSaving = true;
            manager.saveChanges(entities)
                .then(function (saveResult) {
                    saveSucceeded(saveResult);
                    if (succeeded) {
                        succeeded(saveResult);
                    }
                })
                .fail(function (error) {
                    saveFailed(error);
                    if (failed) {
                        failed(error);
                    }
                })
                .fin(saveFinished);
        } else {
            logger.info("Nothing to save");
        };
    }

    function saveSucceeded(saveResult) {
        logger.success("# of entities saved = " + saveResult.entities.length);
        logger.log(saveResult);
    }

    // process the error information when saving fails.
    function saveFailed(error) {
        var reason = error.message;
        var detail = error.detail;
        var entityErrors = error.entityErrors;

        if (entityErrors && entityErrors.length) {
            handleSaveValidationError(entityErrors);
            return;
        }
        if (detail && detail.ExceptionType &&
            detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
            // Concurrency error 
            reason =
                "Another user, perhaps the server, may have deleted one or all of the same entities.";
            manager.rejectChanges(); // DEMO ONLY: discard all pending changes
        }

        logger.error(error,
            "Failed to save changes. " + reason +
            " You may have to restart the app.");
    };

    function saveFinished() { _isSaving = false; }

    function handleSaveValidationError(entityErrors) {
        // http://www.breezejs.com/documentation/server-side-validation
        var message = "Not saved due to validation errors";
        try {
            // fish out the first error
            var messages = entityErrors.map(function (er) {
                return er.errorMessage;
            });
            message += ": " + messages.join(';\n');
        } catch (e) { /* eat it for now */ }
        logger.error(message);
    }

})(breeze, app.logger);