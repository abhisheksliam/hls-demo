# HLS.js Custom Controls

## Working
* Controls: Play/ Pause, Mute/Unmute, Video Quality Settings, Video Seek Bar
  Automatically hides controls if no mouse activity for a while, Display controls on mouse hover, Display controls on mouse movement only if pointer is on video.
* Video Quality: Default quality is set to auto, Quality options created from hls levels manifest. On manual quality selection,        quality changed to selected quality level.

* Demo Url: http://abhisheksliam.github.io/hls-demo

(Supported Browsers: Latest Chrome / Firefox)

## Source Code 
(https://github.com/abhisheksliam/hls-demo)

  Uses Gulp, LESS, Javascript

  ```
  src/                          --> development source (html, less, js)
      js/                       --> folder to keep js files
          custom.controls.js    --> player configuration and custom controls event handling
          animate.controls.js   --> extra animation show/hide handling for controls
      less/                     --> folder to keep styles (.less)
          player.less           --> styles specific to controls and video player
          page.less             --> extra styles for placing player on page
          style.less            --> less imports
      index.html                --> base html file (video source to be provided in data-src)
  dist/                         --> build output files (html, css, js) 
  ```

## Installation - Build / Usage 
    $ git clone https://github.com/abhisheksliam/hls-demo.git .
    $ npm install

    $ gulp

Build all source code files and fire a livereload server which serves the 
files in `dist/`. (Build files:  (https://github.com/abhisheksliam/hls-demo/tree/gh-pages))

 * **less**: Compile all `*.less` files in the `less/` folder into 
   `dist/css/style.css`
 * **scripts**: Concatenate and minify all `*.js` files in the `js/` directory into
   `dist/js/main.min.js`
 * **html**: Copy all html files from `src/` `to `dist/`

## Deploy to gh-pages

**Step 1 :**
Remove the dist directory from the project’s .gitignore file
Remove gh-pages branch if already exists: `git push origin --delete gh-pages`

**Step 2 :**
Make sure git knows about your subtree (the subfolder with your site).
`git add dist && git commit -m "Initial dist subtree commit"`

**Step 3:**
Use subtree push to send it to the gh-pages branch on GitHub.
`git subtree push --prefix dist origin gh-pages`