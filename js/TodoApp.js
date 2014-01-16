/*
 * Todo application implementation
 *
 * Created by Yigal Omer
 * Date: 10-1-2013
 */

// Constants
//var EVENT_NOT_DEFINED = "EVENT_NOT_DEFINED";
var EVENT_ADD_TASK_CLICKED = "EVENT_ADD_TASK_CLICKED";  // UI -> CONTROLLER
var EVENT_TASK_ADDED= "EVENT_TASK_ADDED"; // MODEL -> CONTROLLER

var EVENT_DELETE_TASK_CLICKED = "EVENT_DELETE_TASK_CLICKED"; // UI -> CONTROLLER
var EVENT_TASK_DELETED = "EVENT_TASK_DELETED"; // MODEL -> CONTROLLER

var EVENT_TASK_DONE_CLICKED = "EVENT_TASK_DONE_CLICKED"; // UI -> CONTROLLER
var EVENT_TASK_DONE = "EVENT_TASK_DONE"; // MODEL -> CONTROLLER

var EVENT_TASK_UNDONE_CLICKED = "EVENT_TASK_UNDONE_CLICKED"; // UI -> CONTROLLER
var EVENT_TASK_UNDONE = "EVENT_TASK_UNDONE"; // MODEL -> CONTROLLER


// TODO
// 1. change inheritance
// 2. add statistics
// 3. add local storage

// Event which is passed between Model->Controller and  UI->Controller
function ObserverEvent(type,contextData) {

    this.mEventType = type ;
    this.mContextData = contextData ; // any data to be passed with the event e.g. new task item

}

// Task item
function TaskItem(text,isCompleted) {

    this.text = text ;
    this.isCompleted = isCompleted ;

}


$(document).ready(function () {

    var model = new Model([]);

    var view = new View(model);

    var controller = new Controller(model, view);


    // Model Derived from Subject and notifies the controller about data changes,
    // for example when task is added, controller updates the view with the new task to present
    inherits(new Subject(), model) ;

    // View Derived from Subject and notifies the controller about user actions,
    // for example: when Add-Task selected by the user, View sends an event to the controller
    // which updates the Model with the new task
    inherits(new Subject(), view) ;

    // Controller derived from Observer, listen to View user action and Model Changes
    inherits(new Observer(), controller ) ;

    // Controller observes the View for user actions
    view.addObserver(controller);

    // Controller observes the Model for data changes
    model.addObserver(controller);


    view.show();


});