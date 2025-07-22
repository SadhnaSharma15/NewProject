import chalk from 'chalk';
import https from 'https';
import readline from 'readline';

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const apiKey = 'a8c5b3f70e5091c56eeb6128';
const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const convertCurrency=(amount,rate)=>{
return (amount*rate).toFixed(2);
}
//tofixed(2) will return only two digits after decimal
https.get(url,(response)=>{
   let data = '';
   response.on('data',(chunk)=>{
    data+=chunk;
   });
   response.on('end',()=>{
    const rates= JSON.parse(data).conversion_rates;
    rl.question(chalk.blue("Enter the amount in USD: "),(amount)=>{
    rl.question(chalk.greenBright("Enter the currency you want to convert (eg., INR) "),(currency)=>{
        const rate = rates[currency.toUpperCase()];
        if(rate){
            console.log(chalk.magentaBright(` ${amount} USD is approximately ${convertCurrency(amount,rate)} ${currency}`))
        }
        else{
            console.log(chalk.red("Invalid Currency Code."));
        }
        rl.close();
    });
    })
   })
})

