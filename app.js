const express = require("express");
const app = express();
const expressError = require("./expressError");
//randomm middleware -> run for every incoming request
// app.use((req,res, next)=>{
//     console.log("Hi, I am middleware");
//     // res.send("middleware finished"); generally middleware not send response
//     next();
// });

// app.use((req,res, next)=>{
//     console.log("Hi, I am 2ndd middleware");

//     // res.send("middleware finished"); generally middleware will not used for sending response

//     //next();
//     //console.log("after next"); it will also execute

//     return next();
//     //console.log("after next"); it will not execute   
// });


//creating utility middleware-> Logger
// app.use((req,res,next)=>{
//     req.time = new Date (Date.now());
//     console.log(req.method, req.hostname, req.path, req.time);
//     next();
// });

app.use("/random",(req,res,next)=>{
    console.log("I am only for random");
    next();
});

//api token as query string
// app.use("/api",(req,res,next)=>{
//        let {token} = req.query;
//        if(token ==="giveaccess"){
//         next();
//        }
//        res.send("Access Denied");
// });
// app.get("/api",(req,res)=>{
//     res.send("data");
// });

//passing multiple middlewares
const checkToken = (req,res,next)=>{
    let {token} = req.query;
    if(token === "giveaccess"){
        next();
    }
    throw new expressError(401,"Access Denied!");
};

app.get("/api",checkToken,(req,res)=>{
       res.send("data");
});

app.get("/",(req,res)=>{
    res.send("Hi, I am root");
});

app.get("/random",(req,res)=>{
    res.send("this is a random page");
});


app.get("/err",(req,res)=>{
    abcd = abcd;

});

app.get("/admin",(req,res)=>{
      throw new expressError(403, "Access to admin is forbeddin");
});


//error handling
//custom error handler
app.use((err,req,res,next)=>{
      let{status=500,message="failed"} = err;
      res.status(status).send(message);
});


//if path not found then this middleware execute
// app.use((req,res)=>{
//     // res.send("Page not found!");
//     res.status(404).send("page not found!");
// });

app.listen(8080,()=>{
    console.log("server listening to port 8080");
});