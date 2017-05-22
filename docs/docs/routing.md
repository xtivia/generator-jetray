---

---

### Routing

Jetray sample portlets (both Angular and React ) use URL hash (#foo) based routing. However, in Jetray's case neither implementation uses what might be considered the *pro forma* routing tool. In the case of React this would be *React-Router* and in the case of Angular it would be the *@angular/router* module. We did investigate the use of each of these routers in the context of portal usage and found that they could not easily handle a couple of portal-unique routing scenarios (described below) and thus [UI-Router](https://ui-router.github.io/) was chosen as Jetray's standard implementation for routing in both the Angular and React example portlets.

#### Portlet Routing "Special Cases"

Inside a portal, where multiple SPAs (portlets) can reside on a single page, a couple of special routing scenarios arise that the selected routing framework must be able to handle (or at least, must provide coding mechanisms that allow the application developer to handle it appropriately).

Both of these special cases revolve around scenarios where multiple SPA portlets, call them A and B for example's sake, have been installed on the same portal page.

1. At runtime, when both A and B have presumably navigated to some non-initial state, we need to ensure that any changes that A makes to the URL hash have no impact on B. In particular, this assumes that proper route design has ensured that A and B do not share any common routes, but we still need the code in B to handle scenarios where A makes a change to the URL hash, B is informed of the URL change, and B handles this "unknown route" by simply remaining in its current state. It is also important that B <u>does not change the URL hash</u> when it receives an "unknown route" otherwise it would result in an endless loop of URL route/hash changes between A and B.
2. A slightly different scenario arises when an end user has saved a bookmarked URL associated with one portlet on the page, and then uses this bookmarked URL in the browser to trigger a fresh navigation to the page containing both portlets. As an example, if the bookmarked URL contains a route hash (e.g., #foosomething) associated with A, then at initial page load, B must recognize both that this is an unknown route/hash and that it has not previously transitioned to any known UI state. In that scenario the routing logic in B is responsible for trigger a transition to some default/home state (and again in a way that <u>does not change the URL hash</u>).

#### UI-Router

As mentioned earlier to solve the problems described above, as well as being able to leverage a router that is state-based and not wholly dependent just on URL based view transition/navigation, we have chosen to use the [UI-Router](https://ui-router.github.io/)  open source framework as the routing toolkit for Jetray application portlets. Other factors driving the adoption of this toolkit include its presence and usage all throughout the AngularJS (i.e., "Angular 1") era as well as the fact that it provides an implementation of the framework for both Angular and React.

The UI-Router web site provides detailed documentation for both the Angular ([main site](https://ui-router.github.io/ng2/) and [API docs](https://ui-router.github.io/ng2/docs/latest/)) and React ([main site](https://ui-router.github.io/react/) and [API docs](https://ui-router.github.io/react/docs/latest/)) instances of the framework and readers are encouraged to visit these links for answers to specific "how do I ..." types of questions for customized routing in your portlets. Additionally, example coding solutions are provided for both [Angular](https://ui-router.github.io/ng2/tutorial/helloworld) and [React](https://ui-router.github.io/react/tutorial/helloworld).

