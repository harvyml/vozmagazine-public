if(process.env.NODE_ENV !== "production"){
	require("dotenv").config()
}
const fsE = require("fs-extra")
const bodyParser = require("body-parser")
const bcrypt = require("bcrypt")
const passport = require("passport")
const session = require("express-session")
const morgan = require("morgan")
const path = require("path")
const fs = require("fs")
const express = require("express")
const app = express()
const router = express.Router({strict: true})
var secure = require('express-force-https');
app.use(secure);
//Initialize Passport 
const initializePassport = require("./passport-config.js").default
//morgan -> see what happens to the server on the console 
app.use(morgan("dev"))
//router
app.use("/", router)
//Serve static files
app.use('/', express.static('build/public'))
//models
const Post = require("./models/post")
const User = require("./models/user")
//pages
const index = fs.readFileSync("./build/public/index.html", "utf8")
const postHTML = fs.readFileSync("./build/public/post.html", "utf8")
const posts = fs.readFileSync("./build/public/posts.html", "utf8")
const topic = fs.readFileSync("./build/public/topic.html", "utf8")	
const semana = fs.readFileSync("./build/public/temadelasemana.html", "utf8")
const register = fs.readFileSync("./build/public/register.html", "utf8")
const adminLogin = fs.readFileSync("./build/public/adminlogin.html", "utf8")
const admin = fs.readFileSync("./build/public/admin.html", "utf8")
const login = fs.readFileSync("./build/public/login.html", "utf8")
const profile = fs.readFileSync("./build/public/profile.html", "utf8")
const myprofile = fs.readFileSync("./build/public/myprofile.html", "utf8")
/** ================ Database API ================= */
const mongoose = require("mongoose")
// Connection URL
const url = process.env.MONGO;//process.env.MONGO
// Use connect method to connect to the Server
mongoose.connect(url, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false
})
//body-parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/", router)
//for errors
//===================================
router.get("/", (req, res) => {
    res.send(posts)
})

//nosotros page is actually the index
router.get("/nosotros", (req, res) => {
	res.send(index)
})

// categories
// enterateconvoz
// lenteconvoz
// ciencia
// vozopina
router.get("/posts/:_id", (req, res) => {
    bringPostInfo(req, res).then(snap => {
		let new_html = postHTML.replace("<!-- metatags -->", `
			<!-- Global site tag (gtag.js) - Google Analytics -->
			<script async src="https://www.googletagmanager.com/gtag/js?id=UA-101758526-3"></script>
			<script>
				window.dataLayer = window.dataLayer || [];
				function gtag(){dataLayer.push(arguments);}
				gtag('js', new Date());

				gtag('config', 'UA-101758526-3');
			</script>

            <title>Voz Magazine | ${snap.title}</title>
            <meta name="keywords" content="${snap.tags}"/>
            <meta name="description" content="${snap.description}"/>
            <meta name="author" content="${snap.author}"/>
            <meta property="og:image" content="${snap.media}" />
            <meta property="og:image:width" content="200" />
            <meta property="og:image:height" content="200" />
            <meta property="og:title" content="Voz Magazine | ${snap.title}" />
            <meta property="og:description" content="${snap.title} | ${snap.description}"/>
            <meta property="og:url" content="https://vozmagazine.com/posts/${snap._id}"/>
            <meta itemprop="url" content="https://vozmagazine/posts/${snap._id}"/>
            <link rel="canonical" href="https://vozmagazine.com/posts/${snap._id}"/>
        `)
        res.send(new_html)
    }).catch(err => res.send(err.message))
})
router.get("/posts", (req, res) => {
    res.send(posts)
})
router.get("/posts/", (req, res) => {
	res.redirect("/posts")
})
router.get("/semana", (req, res) => {
	res.send(semana)
})
app.get("/profile/:id", (req, res) => {
	req.user && req.user._id == req.params.id ? res.send(myprofile) : res.send(profile)
})
app.get("/api/postsbyid", (req, res) => {
	bringPostsByUserId(req, res).then(snap => {
		res.json(snap)
	}).catch(err => res.send(err))
})
app.get("/admin", isAdmin, (req, res, next) => {
	//isAuthenticated(req, res, next)
	let promise = new Promise((resolve, reject) => {
		req.isAuthenticated() ? res.send(admin) : res.redirect("/")
	})
	promise.then(() => {
		console.log("done")
	}).catch(err => console.log(err.message))
})
app.get("/admin/", (req, res) => {
	res.redirect("/admin")
})
router.get("/adminlogin", (req, res) => {
	res.send(adminLogin)
})
router.get("/login", (req, res) => {
	res.send(login)
})
app.get("/api/user", (req, res) => {
	res.json(req.user)
})
/**
 * /posts/ gets the html of topics and topic.html takes the bundle of topic_bundle.html
 */
router.get("/temas/:category", (req, res) => {
	let newHTML = topic.replace("<!-- metatags -->", `
		<!-- Global site tag (gtag.js) - Google Analytics -->
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-101758526-3"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());

			gtag('config', 'UA-101758526-3');
		</script>

		<title>Voz Magazine | ${req.params.category}</title>
		<meta name="keywords" content="Voz Magazine, Voz, voz magazine, Magazine, ${req.params.category}"/>
		<meta name="description" content="Voz Magazine | ${req.params.category} | Somos un grupo de jóvenes lleno de ideas que están cansados de las formas tradicionales de hacer periodismo. Buscamos que la gente no solo conozca los sucesos de su entorno, sino que logre entenderlos a profundidad. "/>
		<link rel="canonical" href="https://vozmagazine.com/temas/${req.params.category}"/>
	`)
	res.send(newHTML)
})


router.get("/temas", (req, res) => {
	res.redirect("/posts")
})
router.get("/temas/", (req, res) => {
	res.redirect("/posts")
})
router.get("/registrate", (req, res) => {
	res.send(register)
})


// API CALLS
app.get("/api/post", (req, res) => {
    bringPost(req, res)
})
// api endopoint bring alien user
app.get("/api/alienuser", (req, res) => {
	bringAlienuser(req, res).then(snap => {
		res.send(snap)
	}).catch(err => res.send("Error"))
})
//alien user posts
app.get("/api/alienuserposts", (req, res) => {
	bringAlienuserPosts(req, res).then(snap => {
		res.json(snap)
	}).catch(err => res.send("Error"))
})
app.get("/api/posts", (req, res) => {
	bringPostByCategory(req, res).then(snap => {
		res.json(snap)
	}).catch(err => res.send(err.message))
})
//the information for the main card at the right side of the post
app.get("/api/sidemain", (req, res) => {
	Post.find().sort({_id: -1}).limit(1).then(snap => {
		res.json(snap[0])
	}).catch(err => res.send(err.message))
})
//the information on the right side of the post
app.get("/api/side", (req, res) => {
    Post.find().limit(3).then(snap => {
        res.json(snap)
    }).catch(err => res.send(err.message))
})
//endpoint for uploading posts
app.post("/api/post", (req, res) => {
	uploadPost(req, res)
})
//topics page
app.get("/api/postslimit", (req, res) => {
	bringPostsByLimit(req, res).then(snap => {
		res.json(snap)
	}).catch(err => res.send(err.message))
})

app.get("/sitemap.txt", (req, res) => {
	res.set('Cache-Control: no-cache');
	var ready = false;
	var all = ""
	res.write("https://vozmagazine.com\n")
	res.write("https://vozmagazine.com/noticias\n")
	res.write("https://vozmagazine.com/nosotros\n")
	res.write("https://vozmagazine.com/temas/vozopina\n")
	res.write("https://vozmagazine.com/temas/lente\n")
	res.write("https://vozmagazine.com/temas/trazos\n")
	res.write("https://vozmagazine.com/temas/colabora\n")
	Post.find().then(snap => {
		let keys = Object.keys(snap)
		for(var i = 0; i <= keys.length; i++){
			var k = keys[i]
			res.write(`
				https://vozmagazine.com/posts/${k ? snap[k]._id : ""}\n
			`)
			ready = true;
		}
	})
	setInterval(function(){
		if(ready){
			res.end()
		}else{
			console.log("Loading")
		}
	}, 1000)
	
})

/**
 * @porpose send comment to database
 */
app.post("/api/comment", (req, res) => {
	if(req.user._id){
		uploadComment(req, res).then(snap => {
			res.json(snap)
		}).catch(err => res.send(err.message))
	}else{
		res.redirect(`/posts/${req.body.userId}?comment=false`)
	}
})

/**
 * @porpose send like to database
 */
app.post("/api/like", (req, res) => {
	if(req.user._id){
		Post.find({_id: req.body._id, likes: {$eq: req.user._id}}).then(snap => {
			console.log(snap)
			if(snap.length > 0){
				req.isAuthenticated() ? unlike(req, res) : res.redirect("/login")
			}else{
				req.isAuthenticated() ? like(req, res) : res.redirect("/login")
			}
		})
	}else{
		res.redirect("/login")
	}
})
// app.post("/api/unlike", (req, res) => {
// 	req.isAuthenticated() ? unlike(req, res) : res.redirect("/login")
// })
app.post("/api/register", async (req, res) => {//Changed from "/api/addUsers" to "/api/register"
	console.log(req.body)
	try{
		const userexists = await User.findOne({email: req.body.email})
		if(req.body.name == "" || req.body.password == "" || req.body.email == ""){
			res.redirect("/registrate?error=true")
		}else if(!req.body.name || !req.body.password || !req.body.email){
			res.redirect("/registrate?error=true")
		}
		console.log(userexists)
		if(userexists !== null){
			console.log("El usuario ya existe")
			setTimeout(() => {
				res.redirect("/")
			}, 1000	)
		}else{
			let hashedPassword = await bcrypt.hash(req.body.password, 10)
			let user = new User({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
				role: 1
			})
			console.log(user)
			user.save().then(() => {
				res.redirect("/")
			}).catch(err => res.send(err.message))
		}
		
	}catch(err){
		res.send(err.message)
	}
})
/** Session Configuration */
app.post("/api/registeradmin", async (req, res) => {//Changed from "/api/addUsers" to "/api/register"
	console.log(req.body)
	try{
		const userexists = await User.findOne({email: req.body.email})
		console.log(userexists)
		if(req.body.name == "" || req.body.password == "" || req.body.email == ""){
			res.redirect("/registrate?error=true")
		}else if(!req.body.name || !req.body.password || !req.body.email){
			res.redirect("/registrate?error=true")
		}
		if(userexists !== null){
			console.log("El usuario ya existe")
			setTimeout(() => {
				res.redirect("/")
			}, 1000	)
		}else{
			let hashedPassword = await bcrypt.hash(req.body.password, 10)
			let user = new User({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				email: req.body.email,
				password: hashedPassword,
				phone: req.body.phone,
				role: 1
			})
			console.log(user)
			user.save().then(() => {
				res.redirect("/admin")
			}).catch(err => res.send(err.message))
		}
		
	}catch(err){
		res.send(err.message)
	}
})

//admin login
app.post("/api/loginadmin", passport.authenticate('local-signin', {
	successRedirect: "/admin",
	failureRedirect: "/adminlogin",
	failureFlash: false
}))

// user login
app.post("/api/login", passport.authenticate('local-signin', {
	successRedirect: "/",
	failureRedirect: "/login?err=true",
	failureFlash: false
}))

//logout
app.get("/api/logout", (req, res) => {
	req.logout()
	res.redirect("/")
})
app.post("/api/reg", (req, res) => {
	res.redirect("/registrate?error=true")
})


//functions 
const bringPost = (req, res) => {
    let post = Post.findOne({_id: mongoose.Types.ObjectId(req.query._id)})
    post.then(snap => {
        res.json(snap)
    }).catch(err => console.log(err.message))
}

const bringPostInfo = async (req, res) => {
    let post = await Post.findOne({_id: mongoose.Types.ObjectId(req.params._id)})
    return post
}

const bringPostByCategory = async (req, res) => {
	let posts = await Post.find({category: req.query.category}).sort({_id: -1})
	return posts
}

const bringPostsByLimit = async (req, res) => {
	let limit = parseInt(req.query.limit)
	let posts = await Post.find({category: req.query.category}).sort({_id: -1}).limit(limit)
	return posts
}

const bringPostsByUserId = async (req, res) => {
	let posts = await Post.find({userId: req.user._id}).sort({_id: -1})
	return posts
}

//bring user different from the logged one
const bringAlienuser = async (req, res) => {
	let alienuser = await User.findOne({_id: mongoose.Types.ObjectId(req.query._id)})
	return alienuser
}
//bring user posts different from the logged one
const bringAlienuserPosts = async (req, res) => {
	let alienuser = await Post.find({userId: req.query._id})
	return alienuser
}
//like post
const like = (req, res) => {
	let like = Post.findOneAndUpdate({_id: req.body._id}, {$push : {likes: req.user._id}}, {upsert: true})
	like.then(snap => {
		console.log("liked: "+snap)
	}).catch(err => console.log("error"))
}
//dislike post
const unlike = (req, res) => {
	let unlike = Post.findOneAndUpdate({_id: req.body._id}, {$pull: {likes: req.user._id}}, {upsert: true})
	unlike.then(snap => {
		console.log("unliked"+snap)
	}).catch(err => console.log("error"))
}
/**
 * uploads a comment to the database
 * @param {req} req 
 * @param {res} res 
 */
const uploadComment = (req, res) => {
	let post = Post.findOneAndUpdate({_id: mongoose.Types.ObjectId(req.body.postId)}, {$push: {comments: {userId: req.user._id, name: req.user.name, markdown: req.body.markdown, date: new Date().getTime()}}}, {upsert: true})
	return post
}


const uploadPost = (req, res) => {
	console.log(req.body)
	let _id = new mongoose.Types.ObjectId()
	let post = new Post({
		_id: _id,
		userId: new mongoose.Types.ObjectId(req.user._id),
		author: req.user.name,
		title: req.body.title,
		hasvideo: req.body.hasvideo == true || req.body.hasvideo == "true",
		media: req.body.media,
		markdown: req.body.markdown,
		description: req.body.description,
		datems: new Date().getTime(),
		tags: req.body.tags,
		city: req.body.city,
		claps: 0, //initial in 0
		category: req.body.category
	}) 
	console.log(req.body)
	post.save().then((snap) => {
		console.log(snap)
		res.redirect("/posts/"+_id)
	}).catch(err => res.send("Error, contactate con el desarrollador"))
}
//functions for different stuff
function isAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next()//Que pase a la siguiente ruta
	}
	res.redirect("/adminlogin")
}

function isAdmin(req, res, next){
	if(req.user && req.user.role != 0){
		res.redirect("/")
	}
	return next()
}
//listening on port 3000
app.listen(process.env.PORT || 3000, () => console.log(process.env.MONGO))