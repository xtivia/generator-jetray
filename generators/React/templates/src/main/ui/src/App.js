import React from 'react';
import ReactDOM from 'react-dom';
import {UIRouter, UIView, UISref, UISrefActive, hashLocationPlugin} from 'ui-router-react';
import {TodoList} from './TodoList';
import {UserList} from './UserList';

// define states
var app_states = [
  {name: "users", url: "/userList",  component: UserList },
  {name: "todos", url: "/todoList",  component: TodoList }
];

var uiRouterConfigFn = function(router: UIRouter) {
  
  // If no URL matches, and we don't already have a current state,
  // then go to the `users` state by default. This function is 
  // intended to handle the case where a saved bookmark targets some
  // other portlet on the page with a hashed URL, as well as the 
  // default state ('')
  //  
  // In that initial loading case, we want this portlet to go to its home state
  // but in subsequent cases where this portlet has moved to an active state we
  // want it to stay where it is in terms of state upon receipt of an unknown url.

  router.urlService.rules.otherwise(function(_router,_url) {
    let currentState = router.stateService.current.name;
    if (!currentState) {
      router.stateService.go('users',null,{location:false});
    }
    return;
  });
}

ReactDOM.render(
   <UIRouter plugins={[hashLocationPlugin]} states={app_states} config={uiRouterConfigFn} >
    <div>
      <nav className='navbar navbar-default'>
          <ul className='nav nav-pills'>
            <UISrefActive class="active"><li className="nav-item"><UISref to="users"><a className="nav-link">Users</a></UISref></li></UISrefActive>
            <UISrefActive class="active"><li className="nav-item"><UISref to="todos"><a className="nav-link">ToDos</a></UISref></li></UISrefActive>
          </ul>
        </nav>
      <UIView/>
    </div>
  </UIRouter>,
  document.getElementById('@@portletNameCleaned')
);