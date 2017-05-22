---

---
### Overview

Jetray is a lightweight toolkit that enables the rapid creation, development and deployment of JavaScript-centric (ok, React and Angular) portlets for Liferay DXP. At present, Jetray provides support for React version 0.15.4 and Angular version 4.1. The generated Angular portlet also includes support for both JIT mode (development) as well as AoT (production).

Jetray uses the tools you are familiar with from a standard UX development environment (yeoman, npm, gulp, webpack), but also supports using Gradle as a primary build system and hides all the gory details of deploying your portlets into the Liferay DXP server environment. You can also use techniques like "watch" and "live reload" for your portlet-based development.

Jetray starts with a yeoman generator that, after installation, is invoked by typing “**yo jetray**”. This generator then provides a series of prompts such as “Angular vs React”, “npm vs gradle” that are answered by the user to indicate which type of portlet project they wish to create. Once the appropriate choices have been made, the generator will create a new project in the current working directory. This generated project contains the following elements:

-   A sample application portlet (using Angular or React)
-   A *gulpfile.js* build script used to provide high level control for all build and deploy operations
-   A webpack configuration file used to transpile code and bundle the application into a single JS file
-   Library scripts used to create the Liferay DXP JAR file for your portlet and deploy it into the local DXP environment
-   A copy of the framework “runtime” for either Angular or React. This runtime is built separately and shipped with Jetray, but can be customized or upgraded by the end user as required.
-   A pre-built *package.json* file that defines all of the required dependencies so that the items listed above “just work”
-   (Optional) A development tool for using  JSON-based databases as REST services. This tool, provided as a separately installable OSGi module, can be used to rapidly develop and use JSON files as fully CRUD-enabled REST services.
-   (Optional) a Gradle build environment that hosts all of the above elements and provides support for development of custom Java code elements along with the React/Angular portlet code
