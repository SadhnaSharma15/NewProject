import https from 'https';
import chalk from 'chalk';

const Fact=()=>{
     const url ='https://catfact.ninja/fact';
    https.get(url,(response)=>{
         let data="";
        response.on('data',(chunk)=>{
            data+=chunk;
        });
        response.on('end',()=>{
            const fact = JSON.parse(data);
            console.log("Here is your Random fact about Cat:");
      console.log(chalk.bgCyanBright.black(fact.fact));
        
        })
    })
}
Fact()