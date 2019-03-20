const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');

//Conexión a la base de datos
mongoose.Promise= global.Promise;
mongoose.connect('mongodb://localhost:27017/u3', {useNewUrlParser:true});

//Construyendo el esquema
const productSchema= new mongoose.Schema({
	code:{
		type:String,
		required:true
	},
	name:{
		type:String,
		required:true
	},
	price:{
		type:Number,
		required:true
	}
});

const userSchema= new mongoose.Schema({
	email:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	name:{
		firstName:{
			type:String,
			required:true
		},
		lastName:{
			type:String,
			required:true
		}
	}
});

//Modelo
const Product= mongoose.model('Product', productSchema, 'products');
const User= mongoose.model('User',userSchema,'users');

//Definir endpoints
const productRouter= express.Router();
const userRouter= express.Router();

productRouter.post("/", (req, res)=>{
	const product= req.body;
	Product.create(product).
	then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:'Saved',
			detail:data
		});
	}).
	catch(error=>{
			console.log(error);
			res.status(400);
			res.json({
				code:400,
				msg:'No se pudo insertar',
				detail:error
			});
	});
});

userRouter.post("/", (req, res)=>{
	const user= req.body;
	User.create(user).
	then(data=>{
		console.log(data);
		res.status(200);
		res.json({
			code:200,
			msg:'Saved',
			detail:data
		});
	}).
	catch(error=>{
			console.log(error);
			res.status(400);
			res.json({
				code:400,
				msg:'No se pudo insertar',
				detail:error
			});
	});
});

productRouter.get("/", (req, res)=>{
	Product.find({}).
	then(products=>{
		res.status(200);
		res.json({
			code:200,
			msg:'Consulta exitosa',
			detail:products
		});
	}).
	catch(error=>{
		res.status(400);
		res.json({
			code:400,
			msg:'Error',
			detail:error
		});
	});
});

userRouter.get("/", (req, res)=>{
	User.find({}).
	then(users=>{
		res.status(200);
		res.json({
			code:200,
			msg:'Consulta exitosa',
			detail:users
		});
	}).
	catch(error=>{
		res.status(400);
		res.json({
			code:400,
			msg:'Error',
			detail:error
		});
	});
});

productRouter.get("/:id", (req, res)=>{
	const id= req.params.id;
	Product.findOne({_id:id}).
	then(products=>{
		res.status(200);
		res.json({
			code:200,
			msg:'Consulta exitosa',
			detail:products
		});
	}).
	catch(error=>{
		res.status(400);
		res.json({
			code:400,
			msg:'Error',
			detail:error
		});
	});
});

userRouter.get("/:id", (req, res)=>{
	const id= req.params.id;
	User.findOne({_id:id}).
	then(users=>{
		res.status(200);
		res.json({
			code:200,
			msg:'Consulta exitosa',
			detail:users
		});
	}).
	catch(error=>{
		res.status(400);
		res.json({
			code:400,
			msg:'Error',
			detail:error
		});
	});
});

productRouter.delete("/:id", (req, res)=>{
	const {id}= req.params;
	Product.remove({_id:id}).
	then(products=>{
		res.status(200);
		res.json({
			code:200,
			msg:'Consulta exitosa',
			detail:products
		});
	}).
	catch(error=>{
		res.status(400);
		res.json({
			code:400,
			msg:'Error',
			detail:error
		});
	});
});

userRouter.delete("/:id", (req, res)=>{
	const {id}= req.params;
	User.remove({_id:id}).
	then(users=>{
		res.status(200);
		res.json({
			code:200,
			msg:'Consulta exitosa',
			detail:users
		});
	}).
	catch(error=>{
		res.status(400);
		res.json({
			code:400,
			msg:'Error',
			detail:error
		});
	});
});

productRouter.put("/:price", (req, res)=>{
	const {price}= req.params;
	Product.update({price:price}).
	then(products=>{
		res.status(200);
		res.json({
			code:200,
			msg:'Actualización exitosa',
			detail:products
		});
	}).
	catch(error=>{
		res.status(400);
		res.json({
			code:400,
			msg:'Error',
			detail:error
		});
	});
});

userRouter.put("/:email", (req, res)=>{
	const {email}= req.params;
	User.update({email:email}).
	then(users=>{
		res.status(200);
		res.json({
			code:200,
			msg:'Actualización exitosa',
			detail:users
		});
	}).
	catch(error=>{
		res.status(400);
		res.json({
			code:400,
			msg:'Error',
			detail:error
		});
	});
});

//Configurando servidor express
let app= express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/products", productRouter);
app.use('/users', userRouter);

//Configurando el servidor HTTP
const server= require('http').Server(app);
const port= 3002;

//Ejecutando el servidor
server.listen(port);
console.log(`Running on port ${port}`);
