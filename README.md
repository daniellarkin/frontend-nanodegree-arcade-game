
frontend-nanodegree-arcade-game
===============================

# Gameplay
* Use the up/down/left/right keys to control the player
* The goal of the game is to avoid the bugs and reach the "safe" area in the water (top of screen)
* When the player reaches the safe area, their score increases by 10 points and the player moves back to the starting position
* As the game time increases extra enemies are added to the playing canvas
* If the player collides with an bug, their score is decreased by 10 points and the player returns to the starting position


Aside from the requirements of the [rubric](https://review.udacity.com/#!/projects/2696458597/rubric), I also did the following:

# Extra tooling related features
============
1. gulp task for jsDoc; special comments are extracted from app.js. I looked at doxygen as well, but jsDoc seems to have more widespread usage. 
2. gulp task for AWS s3 deployment. I wanted a free remote hosting option (other than github pages which I've already setup for www.purergb.com).I settled on using AWS s3. This is straight-forward to setup and allows a quick deployment from gulp (typical 3-5 seconds for small updates once files are cached).
3. Investigated Javascript unit testing via Jasmine. Attempted to translate the rubric into a behaviour driven development plan. This is available in src/js/specs/ - remains a work in progress. Learnt a huge amount from exploring unit testing at this stage.
4. Set up gulp based jasmine
5. Investigated code coverage using a gulp plugin for Istanbul
6. Investigated a "headless" Jasmine flow via phantomJS. This remains a work in progress, as experience challenges compiling from phantomJS and associated dependancies on my ARM v7
7. Added .bowerrc file and change the default directory. Now everything is self contained within the src directory. This makes it easier when generating the dist release.
8. Read up on npm vs bower; it seems the general conclusion is that bower is some what redunant with npm 3. In subsequent projects I'll consider migrating fully to npm. 

# Extra Game related features:
============
- enemies increases as the game time increases , up to a maximum number of 15
- enemies sprites are randomly scaled between 50%-100%
- scoreboard logic added to canvas
- high score retrieved using jQuery getJson (wrapper for ajax) call. To store new high scores it probably would be best to use a database driven solution on the server side.
- Used base and "derived" objects to explore object oriented concepts such as inheritance, polyphorism and encapsultion (via accesor pattern)
- Gems are drawn on screen, but reusing the collision detection method is not used to increase score etc. TBD

