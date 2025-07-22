import {createServer} from 'http';
import { readFile } from 'fs/promises';
import path from 'path';

const PORT =3003;
const server =createServer(async(req,res)=>{
    console.log(req.url);
    if(req.method ==="GET"){
        if(req.url ==="/"){
            
            try{
                const data = await readFile(path.join("public","index.html"));
                res.writeHead(200,{'Content-Type':'text/html'})
                res.end(data);
            }
            catch(error){
                
                res.writeHead(404,{'Content-Type':'text/html'})
                res.end("404,Page not found");

            }
        }
    }
     if(req.method ==="GET"){
        if(req.url ==="/style.css"){
            
            try{
                const data = await readFile(path.join("public","style.css"));
                res.writeHead(200,{'Content-Type':'text/css'})
                res.end(data);
            }
            catch(error){
                
                res.writeHead(404,{'Content-Type':'text/html'})
                res.end("404,Page not found");

            }
        }
    }
})
server.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})