import readline from 'readline';
import fs from 'fs';

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

const createfile=()=>{
    rl.question("Enter your filename: ",(filename)=>{
        rl.question("Enter content in your file: ",(content)=>{
            fs.writeFile(`${filename}.txt`,content,'utf-8',(err)=>{
                if(err){
                    console.error(err);
                }
                else{
                    console.log(`file "${filename}.txt" created successfully...`)
                }
                rl.close()
            })
        })

    })
}
createfile()