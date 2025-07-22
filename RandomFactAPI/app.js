import https from 'https';
import chalk from 'chalk';



const Joke=()=>{
    const url='https://official-joke-api.appspot.com/random_joke';
    https.get(url,(response)=>{
        let data="";
        response.on('data',(chunk)=>{
                data+=chunk;
        });
        response.on('end',()=>{
           const joke=JSON.parse(data);
            console.log("Here's a joke for you:");
        console.log(chalk.magenta(joke.setup));
        console.log(chalk.blue.bgCyan.bold(joke.punchline));
        });
    });

}
Joke();