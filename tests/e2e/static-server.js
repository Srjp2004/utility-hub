const http=require("node:http"),fs=require("node:fs"),path=require("node:path");
const root=path.resolve(__dirname,"../.."),port=4173;
const mime={".html":"text/html; charset=utf-8",".js":"text/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".xml":"application/xml; charset=utf-8",".txt":"text/plain; charset=utf-8",".svg":"image/svg+xml",".webmanifest":"application/manifest+json"};
const server=http.createServer((req,res)=>{
  const raw=decodeURIComponent((req.url||"/").split("?")[0]), requested=raw==="/" ? "/index.html" : raw;
  const file=path.resolve(root,"."+requested);
  if(!file.startsWith(root+path.sep)){res.writeHead(400);res.end("Bad request");return;}
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404,{"Content-Type":mime[".html"]});res.end(fs.readFileSync(path.join(root,"404.html")));return;}
  res.writeHead(200,{"Content-Type":mime[path.extname(file)]||"application/octet-stream"});fs.createReadStream(file).pipe(res);
});
server.listen(port,"127.0.0.1");
process.on("SIGTERM",()=>server.close(()=>process.exit(0)));process.on("SIGINT",()=>server.close(()=>process.exit(0)));
