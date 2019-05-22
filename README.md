# TIOS

-   Install the project packages locally
    ```
    npm install
    ```
-   Generate the svg sprite for the first time
    ```
    gulp sprite
    ```
-   To generate the both the CSS & JavaScript run
    ```
    gulp
    ```

## Running the local site on your machine

To view the site in your browser you will need to set up your local IIS web server. Instructions can be found on the wiki under IIS Setup on the [Umbraco wiki page](http://tech.addison-group.co/wiki/wiki/132/umbraco-site-procedures)

## Updating and using the sprite

-   Put the svg icon(s) in to the assets/img/sprite/src folder
-   Regenerate the svg sprite and associated CSS by running
    ```
    gulp sprite
    ```
-   To use your new icon in your css, call
    ```
    @include sprite(your-icon-name);
    ```

Note: The icon size is automatically pulled in from the SVG's viewbox so production must make sure this is the correct pixel values.

## CSS / Sass

### Plugins

We use the gulp-autoprefixer and gulp-pxtorem plugins. The gulp-autoprefixer adds vendor prefixes so you do not need to manually add them when writing your CSS. The gulp-pxtorem means you can write your font-size and line-height values in px and they will get converted to rem units when compiled.

### Folder structure

The folder structure based on the 7-1 pattern: [http://sass-guidelin.es/#the-7-1-pattern](http://sass-guidelin.es/#the-7-1-pattern)

-   1 - base – global styles, such as resets, typography, colors, etc
-   2 - components – each self-contained component in its own .scss partial
-   3 - layout – styling for larger layout components; e.g. nav, header, footer, etc
-   4 - pages – page-specific styling, if necessary
-   5 - themes – styling for different themes eg IHG brands section - delete if not required
-   6 - utils – global mixins, functions, helper selectors, etc. (Rule of thumb: should not output a single line of CSS when compiled on its own)
-   7 - vendors – contains 3rd-party styles, mixins, etc, eg default slick css - delete if not required

## Javascript / Webpack

By default the starter kit uses Webpack to manage JavaScript dependencies. This may be overkill for your project if there is not much JavaScript. Also included in the gulpfile is a simple scripts task which could be used as an alternative. It looks for JavaScript files, concatinates them before minifying the file.

```
gulp scripts
```

If you use this method you will need to update the build tasks in the gulpfile.js

## Browser Sync

When building your templates you might want to run gulp sync which will run the watch & browser-sync tasks: it will watch for any CSS or JavaScript changes and compile them on save and then refresh your browser. Depending on how your local copy is set up you will need to go into the gulpfile.js and change the browser-sync task proxy to whatever you've set it up as in IIS.

```
gulp sync
```

If you're finding Browser Sync buggy you can just run the the watch command, which will rebuild the CSS and javascript everytime you save a file. Obviously without the Browser Sync running you will need to manually refresh the page in the browser to see the changes.

```
gulp watch
```

## Summary of Gulp commands

### Most common

-   `gulp`
    Default task: generates CSS & Javascript
-   `gulp sprite`
    Generates the SVG & PNG sprites
-   `gulp sync`
    Launches browser window and then watches to see if specific file types are edited. Once an edit is detected it rebuilds the CSS & Javascript if necessary, and reloads the browser window
-   `gulp watch`
    Watches for changes in CSS & Javascript source files and rebuilds if an edit is detected

### Others

-   `gulp sass`
    Generates CSS
-   `gulp webpack`
    Generates Javascript
-   `gulp svgSprite`
    Generates the SVG sprite only
-   `gulp pngSprite`
    Generates the SVG & PNG sprites
-   `gulp scripts`
    An alternative task to webpack that concatinates and minifies the javascript files. If using this approach you will want to edit the default and watch tasks to use this instead webpack
