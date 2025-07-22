//~ Get weather using latitude & longitude
import https from 'https';
import readline from 'readline';
import chalk  from 'chalk';

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

rl.question(chalk.green("Enter the latitude: "),(lat)=>{
    rl.question(chalk.green("Enter the longitude: "),(lon)=>{
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,showers`;
        https.get(url,(response)=>{
            let body='';
            response.on('data',(chunk)=>{
                body+=chunk;
            });
            response.on('end',()=>{
                 const weather = JSON.parse(body);
                console.log(chalk.cyanBright(`📍 Location: [${weather.latitude}, ${weather.longitude}]`));
                console.log(chalk.red(`🌡️ Temperature: ${weather.current.temperature_2m}°C`));
                console.log(chalk.yellowBright(`💧 Humidity: ${weather.current.relative_humidity_2m}%`));
                console.log(chalk.blueBright(`🌧️ Showers: ${weather.current.showers}%`));
        })
            })
        })

    })





