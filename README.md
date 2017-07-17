# HLS.js Custom Controls

Uses Gulp, LESS

Features **livereload**, **image
minification**, **concat & minify** JS files, **compile** LESS files and
organize and prefix CSS.

## Installation

    $ npm install

## Usage
  
    $ gulp

Will build all source code files and fire a livereload server which serves the 
files in `dist/`. You also have the following tasks:

 * **less**: Compile all `*.less` files in the `less/` folder into 
   `dist/css/style.css`
 * **scripts**: Concatenate and minify all `*.js` files in the `js/` directory into
   `dist/js/main.min.js`
 * **images**: Minify all images in the `img/` folder
 * **html**: Copy all html files from `src/` `to `dist/`

## Deploy to gh-pages

Step 1
Remove the dist directory from the project’s .gitignore file

Step 2
Make sure git knows about your subtree (the subfolder with your site).
git add dist && git commit -m "Initial dist subtree commit"

Step 3
Use subtree push to send it to the gh-pages branch on GitHub.
git subtree push --prefix dist origin gh-pages

## Demo Url

http://abhisheksliam.github.io/hls-demo