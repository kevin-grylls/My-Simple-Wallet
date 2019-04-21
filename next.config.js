const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
module.exports = withSass(
    withCss({
        webpack(config) {
            config.module.rules.push(
                {
                    test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/i,
                    use: {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            publicPath: "./",
                            outputPath: "static/css/",
                            name: "[name].[ext]"
                        }
                    }
                },
                {
                    test: /\.txt$/,
                    use: "raw-loader"
                }
            );

            return config;
        },
        sassLoaderOptions: {
            includePaths: ["./"],
            cssModules: true,
            cssLoaderOptios: {
                importLoaders: 1,
                localIdentName: "[local]_[hash:base64:5]"
            }
        }
    })
);
