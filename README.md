# Jetray
Yeoman generator for React, Angular and (v2.0+) Vue portlets on Liferay DXP

NOTE: As of v2.1, JetRay optionally supports using yarn as your package manager (instead of npm) for Javascript-centric (non-Gradle) builds.

[https://xtivia.github.io/generator-jetray](https://xtivia.github.io/generator-jetray)

#### TL;DR

1. make sure you have node installed, and then packages yo and gulp-cli installed globally via npm...

2. run 'npm i -g xtivia/generator-jetray'

3. create a new portlet project directory, cd into it, and run 'yo jetray' and follow the prompts

4. run 'gulp build' 

5. when ready, run 'gulp deploy' to push to Liferay

6. Enjoy seeing your SPA portlet in Liferay

#### HISTORY

Version 2.2.0 June 24 2019

- Removed security vulnerabilities for the Yeoman generator
- Removed security vulnerabilities for all generated applications
- Upgraded React support to 16.5.2
- Upgraded Vue support to 2.6.10
- Implemented built-in cache busting for generated applications
- Upgraded Gulp support to 4.x in generated applications
- Changed the 'gulp deploy' task in generated applications to do a physical copy of the JAR into the DXP 'deploy' directory. The in-place deploy of previous versions was removed as Liferay has made the gogo shell a non-automatic feature going forward. Note that this now requires an additional parameter be provided at generation time (the Liferay home directory)

