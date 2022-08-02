const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: './assets/js/script.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    //Inside the empty array, we need to tell webpack which plugin we 
    //want to use. We're going to use the providePlugin plugin to 
    //define the $ and jQuery variables to use the installed npm 
    //package. If we did not do this, the code would still not work 
    //even though we installed jQuery. Whenever you work with libraries 
    //that are dependent on the use of a global variable, just like 
    //jQuery is with $ and jQuery, you must tell webpack to make 
    //exceptions for these variables by using webpack.ProvidePlugin
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
    ],
    mode: 'development'
};