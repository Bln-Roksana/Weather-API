const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

  res.sendFile(__dirname+"/index.html")
  // res.send("Server is up!");
})

app.post("/", function(req, res){
  // console.log(req.body.cityName);
  // console.log("Post received.");

  const query=req.body.cityName;
  const apiKey="XXXXXXXXXXXXXXXXXXXXX";
  const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const feelsTemp=weatherData.main.feels_like;
      const descr=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const iconURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"

      res.write("<h1>The temperature in "+query+" is "+temp+" but it feels like "+feelsTemp+".</h1>");
      res.write("<p>How is the weather like? It looks like " +  descr+".</p>");
      res.write("<img src="+iconURL+">");
      res.send();

    })
  })
})

// const query="Manchester";
// const apiKey="";
// const unit="metric"
// const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
// https.get(url,function(response){
//   console.log(response.statusCode);
//
//   response.on("data", function(data){
//     const weatherData=JSON.parse(data);
//     const temp=weatherData.main.temp;
//     const feelsTemp=weatherData.main.feels_like;
//     const descr=weatherData.weather[0].description;
//     const icon=weatherData.weather[0].icon;
//     const iconURL="http://openweathermap.org/img/wn/"+icon+"@2x.png"
//
//     res.write("<h1>The temperature in Manchester is "+temp+" but it feels like "+feelsTemp+".</h1>");
//     res.write("<p>How is the weather like? It looks like " +  descr+".</p>");
//     res.write("<img src="+iconURL+">");
//     res.send();
//
//   })
// })


app.listen(3000, function(){
  console.log("the server is running...");
})
