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



// ObserverEvent which is passed between Model->Controller and  UI->Controller
function ObserverEvent(type,contextData) {

    this.mEventType = type ;
    this.mContextData = contextData ; // any data to be passed with the event e.g. new task item

}

// Task item
function TaskItem(text,isDone) {

    this.text = text ;
    this.isDone = isDone ;

}







window.onload = function () {

    var model = new Model([]);

    var view = new View(model, {
        'todoList':  document.getElementById('todo-list'),
        'newTodoInputText': document.getElementById('new-todo')

    });

    var controller = new Controller(model, view);


    // View Derived from Subject and notifies the controller about user actions,
    // for example: when Add Task selected by the user, View sends an event to the controller
    // which updates the Model with the new task
    inherits(new Subject(), view) ;

    // Controller derived from Observer, listen to View user action and Model Changes
    inherits(new Observer(), controller ) ;
    view.addObserver(controller);

    // Model Derived from Subject and notifies the controller about data changes,
    // for example when Task Added, controller updates the view with the new task to present
    inherits(new Subject(), model) ;
    model.addObserver(controller);


    view.show();
};