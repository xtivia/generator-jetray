import React from 'react';
import ReactDOM from 'react-dom';
import {UIRouter, UIView, UISref, UISrefActive, hashLocationPlugin} from 'ui-router-react';
import {TodoList} from './TodoList';
import {UserList} from './UserList';

// define states
var app_states = [
  {name: "home",  url: '',           component: UserList },
  {name: "users", url: "/userList",  component: UserList },
  {name: "todos", url: "/todoList",  component: TodoList }
];

var uiRouterConfigFn = function(router: UIRouter) {

  // If no URL matches, and we don't already have a current state,
  // then go to the `home` state by default. This function is primarily
  // intended to handle the case where a saved bookmark targets some
  // other portlet on the page with a hashed URL.
  //  
  // In that initial loading case, we want this portlet to go to its home state
  // but in subsequent cases where this portlet has moved to an active state we
  // want it to stay where it is in terms of state upon receipt of an unknown url.

  router.urlRouter.otherwise(function(_router,_url) {
    //console.log("React router handling unknown url="+ _url.path);
    let currentState = router.stateService.current.name;
    if (!currentState) {
      router.stateService.go('home',null,{location:false});
      //console.log("React router resetting to home state");
    }
    return;
  });
}

ReactDOM.render(
   <UIRouter plugins={[hashLocationPlugin]} states={app_states} config={uiRouterConfigFn} >
    <div>
      <UISrefActive class="active"><UISref to="users"><a>Users</a></UISref></UISrefActive>
      &nbsp;&nbsp;&nbsp;
      <UISrefActive class="active"><UISref to="todos"><a>ToDos</a></UISref></UISrefActive>
      <UIView/>
    </div>
  </UIRouter>,
  document.getElementById('@@portletNameCleaned')
);