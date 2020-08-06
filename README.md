# React SPA Explained

## Description

This project shows how to set up a simple single page application based on React (without create-react-app) and explains how it works step by step.

## Installation

1. Install Node.js v.13+.
   [https://nodejs.org/en/download/](https://nodejs.org/en/download/). It comes with npm (package manager)

1. Create your project directory and enter it:
    ```shell script
    $ mkdir your-project-name && cd "$_"
    ```
   
1. Create a `package.json`:
    ```shell script
    $ npm init -y
    ```
   This file which holds project info, and a list of packages that will be used. `-y` argument is added to skip the questionnaire, you can always fix `package.json` fields later.
   
1. Create an `src` sources directory and `public`:
    ```shell script
    $ mkdir src && mkdir public
    ```
   'src' directory is for files that will be processed.
   'public' directory is for files that will **not** be processed.
   
1. Create an `index.html` file:
    ```shell script
    $ touch public/index.html
    ```
    ```html
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>My React App</title>
      </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
    ```
   This file will be a template for your application.
   
1. Install React and ReactDOM packages:
    ```shell script
    $ npm install react react-dom
    ```
   
1. Create an index.js file:
    ```shell script
    $ touch src/index.js
    ```
    
    ```jsx
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from 'components/App/App';
    
    ReactDOM.render(<App />, document.getElementById('root'));
    ```
    This file will be a starting point for your application.

1. Create the root `App` component:
   ```shell script
   $ mkdir -p src/components/App && touch src/components/App/App.jsx
   ```

   ```jsx
   import React from 'react';
   
   const App = () => {
     return (
       <div>Hello World!</div>
     );
   }
   
   export default App;
   ```
   
1. Install Webpack:
    ```shell script
    $ npm install webpack webpack-cli --save-dev
    ```
   
1. Create `webpack.config.js`:
    ```shell script
    $ touch webpack.config.js
    ```
    
    ```js
    const webpack = require('webpack');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    
    module.exports = {
     entry: ['./src/index.js'],
     output: {
       path: __dirname + '/build',
       filename: 'bundle.js',
     },
     module: {
       rules: [
         {
           test: /\.(js|jsx)$/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-react'],
             },
           },
           exclude: /node_modules/,
         },
       ],
     },
     resolve: {
       extensions: ['.js', '.jsx'],
       modules: ['node_modules', __dirname + '/src'],
     },
     plugins: [
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
         template: 'public/index.html',
       }),
     ],
    };
    ```

1. Install Babel:
    ```shell script
    $ npm install @babel/core @babel/preset-react babel-loader --save-dev
    ```
   You will need Babel itself, babel preset for transpiling JSX syntax to pure JS and a `babel-loader` plugin for webpack
1. Install CleanWebpackPlugin and HtmlWebpackPlugin:
    ```shell script
    $ npm install html-webpack-plugin clean-webpack-plugin --save-dev
    ```
    HtmlWebpackPlugin will take your .html and add processed resources inside.
    CleanWebpackPlugin will clean your build directory on every build.
   
1. Add build task to `./package.json`:
    ```diff
    "scripts": {
    -    "test": "echo \"Error: no test specified\" && exit 1"
    +    "test": "echo \"Error: no test specified\" && exit 1",
    +    "build": "webpack --mode production"
    },
    ```
   When you run `npm run taskname` it will refer to a task in this section.
   From this point you can use `npm run build` to start Webpack, that will process your source files and put the result in your build directory.
   >🏁 Checkpoint.<br/><br/>
   Run `npm run build` and open `./build/index.html` file to see your app with 'Hello world!' text.
   
### CSS
To add CSS to your project you will need to create CSS files, import them and use a special Webpack loader to process them.

1. Install `style-loader` and `css-loader`:
    ```shell script
    $ npm install style-loader css-loader --save-dev
    ```
   CSS loader tells webpack how to import .css files.
   Style loader tells webpack how to inject .css files to your .html template.

1. Add CSS loaders to your `webpack.config.js`:
    ```diff
    module: {
      rules: [
        ...
    +    {
    +      test: /\.css$/,
    +      use: ['style-loader', 'css-loader'],
    +    },
      ],
    },
    ```

1. Create a CSS file for App component:
    ```shell script
    $ touch src/components/App/App.module.css
    ```
    
    ```css
    .app {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    .text {
      font: bold 42px monospace;
      text-transform: uppercase;
      transform: skew(-12deg, -4deg);
    }
    ```
    Use 'name.module.css' pattern for CSS loader to recognize you want to use CSS modules (this can be configured).
    CSS modules will modify your CSS selector names, so you don't have to worry about them conflicting with names in other files.

1. Import global styles in 'App.jsx' file and add corresponding classes:
    ```diff
    import React from 'react';
    +import s from './App.module.css';
    
    const App = () => {
      return (
    -   <div>Hello World!</div>
    +   <div className={s.app}>
    +     <div className={s.text}>Hello World!</div>
    +   </div>
      );
    }
    ```
   After importing CSS file, you can refer to selectors with dot notation.

1. Create a CSS file for global styles:
    ```shell script
    $ touch src/index.css
    ```
    
    ```css
    html {
      height: 100%;
    }
    
    body {
      height: 100%;
      margin: 0;
    }
    
    #root {
      height: 100%;
    }
    ```
   
1. Import global styles to `./src/index.js` file:
    ```diff
    import App from 'components/App/App';
    +import './index.css';
    
    ReactDOM.render(<App />, document.getElementById('root'));
    ```
    Global styles are imported like a file because CSS modules are not needed here.
 
    >🏁 Checkpoint.<br/><br/>
    Run `npm run build` and open `./build/index.html` file to see your app with 'Hello world!' text with some styling.
   

### Images
To add images to your project you will need to add image files, import them inside components and use a special Webpack loader to process them.

1. Install `file-loader`:
    ```shell script
    $ npm install file-loader --save-dev
    ```
   File loader tells webpack how to import files that are not related to code and puts them in build directory.
   
1. Add file loader to your `webpack.config.js`:
   ```diff
   module: {
     rules: [
       ...
   +    {
   +      test: /\.(png|jpe?g|gif)$/i,
   +      use: ['file-loader'],
   +    },
     ],
   },
   ```
   
1. Create a directory for App component images:
    ```shell script
    $ mkdir src/components/App/images
    ```

1. Copy an image from this repository to your directory or add your own:
    ```shell script
    $ curl "https://raw.githubusercontent.com/yakovenkomax/react-spa-explained/master/src/components/App/images/star.png" --output "./src/components/App/images/star.png"
    ```
   
1. Add the image to your App component:
    ```diff
    import React from 'react';
    +import starImage from './images/star.png';
    import s from './App.module.css';
    
    const App = () => {
      return (
        <div className={s.app}>
    +     <img className={s.image} src={starImage} alt="star" />
          <div className={s.text}>Hello World!</div>
        </div>
    ```
   
1. Add some styles for the image in your `App.module.css`:
    ```diff
    .app {
      display: flex;
      height: 100%;
    + flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    
    +.image {
    +  width: 100px;
    +}
    
    .text {
    + margin-top: 36px;
      font: bold 42px monospace;
      text-transform: uppercase;
      transform: skew(-12deg, -4deg);
    }
    ```
    >🏁 Checkpoint.<br/><br/>
    Run `npm run build` and open `./build/index.html` file to see your app with 'Hello world!' text, an image, and some styling.
      
## Usage

Build your SPA from source files:
    ```shell script
    $ npm run build
    ```
    
Open `/build/index.html` file in your browser.
