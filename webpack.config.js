const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
    },
    output: {
        //The name of each attribute in the entry object will be used in place of [name] 
        //in each bundle.js file that is created. So, the bundle file for script.js will 
        //be app.bundle.js, the bundle file for events.js will be events.bundle.js, and 
        //so on, with each using the key name from each key-value pair in the object for [name].
        filename: "[name].bundle.js",
        path: __dirname + "/dist"
    },
    module: {
        //In the config object, we added an object to the rules array. This 
        //object will identify the type of files to pre-process using the test 
        //property to find a regular expression, or regex. In our case, we are 
        //trying to process any image file with the file extension of .jpg. We 
        //could expand this expression to also search for other image file 
        //extensions such as .png, .svg, or .gif.
        rules: [
            {
                test: /\.jpg$/i,
                //add another property called use where the actual loader 
                //is implemented. The default behavior of file-loader is 
                //such that file will be treated as an ES5 module. As a result, 
                //paths to images might be formatted incorrectly. To prevent this 
                //we can add a key-value pair in our options 
                //object: esModule: false,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name(file) {
                                return "[path][name].[ext]"
                            },
                            publicPath: function (url) {
                                return url.replace("../", "/assets/")
                            }
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    }
                ]
            },
        ]
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
        new BundleAnalyzerPlugin({
            analyzerMode: "static", // the report outputs to an HTML file in the dist folder
        })
    ],
    mode: 'development'
};