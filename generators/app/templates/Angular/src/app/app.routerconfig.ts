import {UIRouter,StateDeclaration} from "@uirouter/angular";
import {Injector, Injectable} from "@angular/core";

export function uiRouterConfigFn(router: UIRouter, injector: Injector) {

  // If no URL matches, and we don't already have a current state,
  // then go to the `tasks` state by default. This function is 
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
      router.stateService.go('tasks',null,{location:false});
    }
    return;
  });
  
}