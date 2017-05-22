---

---
### Webpack

Jetray uses webpack as its primary tool for application bundling. In this context, bundling refers to execution of the steps required to create a single final JavaScript file representing the entire application and can involve multiple steps such as code transpilation, dependency "walking" and code aggregation.

Jetray uses different webpack configuration specifications for development and production modes -- this allows certain operations such as minification to be performed only during production mode, for example. In the case of the Angular portlet, the development-based version of the webpack configuration file drives a JIT-based build, while in the production configuration creates an AoT-based application.

As with the Jetray provided gulpfile you may add your own extensions or adjustments to the supplied webpack configuration files but you should be very careful to ensure that the OOB characteristics of the webpack configuration files are maintained.