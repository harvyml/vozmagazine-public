module.exports = {
	mode: 'development',
 	entry:{ 
		 app_bundle: './src/hydrated/App.js',
		 post_bundle: './src/hydrated/Post.js',
		 posts_bundle: './src/hydrated/Posts.js',
		 topic_bundle: './src/hydrated/Topic.js',
		 semana_bundle: './src/hydrated/Semana.js',
		 admin_login_bundle: './src/hydrated/AdminLogin.js',
		 admin_bundle: './src/hydrated/Admin.js',
		 register_bundle: './src/hydrated/Register.js',
		 login_bundle: './src/hydrated/Login.js',
		 profile_bundle: './src/hydrated/Profile.js',
		 myprofile_bundle: './src/hydrated/MyProfile.js',
	},
 	module: {
 		rules: [//These are the loaders
 			{test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
			 {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
			 {test: /\.js$/, loader: 'babel-loader', exclude: /pulse-editor/ },
			 {test: /\.jsx$/, loader: 'babel-loader', exclude: /pulse-editor/ },

            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
			},
			
		 ]
		 
 	},
 	output: {
		filename: '[name].js',
		path: __dirname + '/build/public/bundles',
		publicPath: '/build/public'
	},
	watch: true,
	watchOptions: {
		ignored: ['files/**/*.js', 'node_modules', "pulse-editor"],
		//poll: 1000 // Check for changes every second
	},
 }