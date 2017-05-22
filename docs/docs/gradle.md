---

---
### Gradle

While the focus in creating the Jetray toolset has always been to bring traditional npm-toolchain based development for Angular and React into the Liferay portlet development space, it was recognized that not all clients or potential users of the framework may be comfortable using purely a npm-based set of tooling. 

Additionally, while the baked-in usage of the Lifeay MVC portlet by the Jetray tools may cover a large percentage of use cases, we recognize that some solutions will require the development of other portlet class implementations in Java, and that there may still be a desire to reap the benefits of "npm-style" UX development while including custom Java classes of various kinds. Further, some enterprise development environments may just be more comfortable using Gradle as the primary component of their CI infrastructure instead of NodeJS and npm.

So to that end, Jetray provides an option at project generation time to build a gradle-based project instead of an purely npm-based project. Given the "nature of the beast" ( i.e Angular and React development is fundamentally based around npm packages and thus will always require NodeJS/npm to make use of them at all) the generated project will still include the same project structure for the user interface elements of the project but will do so inside of a more traditional Gradle project shell.

When creating a gradle-based project, the Jetray generators hoists the project structure described earlier into a *src/main/ui* subdirectory and tweaks the Gulp based build included there to defer to Gradle for JAR construction and Liferay deployment. This approach allows UX developers to essentially cd the into *src/main/ui* folder of a Gradle-based project and work as they did inside a pure npm-based world, while "under the covers" Gradle is being used to construct and deploy the Liferay DXP JAR artifact.