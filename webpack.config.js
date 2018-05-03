const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack  = require('webpack');
const ExtractPlugin = require('extract-text-webpack-plugin'); //单独打包静态文件

const isDev = process.env.NODE_ENV === 'development';

let config = {
	target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
    	filename: 'bundle.[hash:8].js',
    	path: path.join(__dirname, 'dist')
    },
    module: {
    	rules: [
    		{
    			test: /\.vue$/,
    			loader: 'vue-loader'
    		},
    		{
    			test: /\.jsx$/,
    			loader: 'babel-loader'
    		},

    		{
    			test: /\.(gif|jpg|jpeg|png|svg)$/,
    			use: [
    				{
    					loader: 'url-loader',
    					options: {
    						limit: 1024,
    						name: '[name].[ext]'
    					}
    				}
    			]
    		}
    	]
    },
    plugins: [
    	//根据不同环境区分打包
    	new webpack.DefinePlugin({
    		'process.env': {
    			NODE_ENV: isDev ? '"development"' : '"production"'
    		}
    	}),
    	new HTMLPlugin()
    ]
}

if(isDev) {
    config.module.rules.push({
        test: /\.less$/,
        use: [
            'style-loader',
            'css-loader',
            'less-loader'
        ]
    });
	config.devServer = {
		port: 3000,
		host: '0.0.0.0',
		overlay: {
			errors: true,
		},
		hot: true
	};
	config.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)
}
else {
    config.entry = {
        app: path.join(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    config.output.filename = '[name].[chunkhash:8].js';
    config.module.rules.push(
        {
            test: /\.less$/,
            use: ExtractPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'less-loader'
                ]
            })
        }
    );
    config.plugins.push(
        new ExtractPlugin('styles.[contentHash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime'
        })
    )
}

module.exports = config;