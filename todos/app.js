import readline from 'readline';
const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
const tasks=[];
const showMenu=()=>{
    console.log("\n1:Add a Task");
    console.log("2:View a Task");
    console.log("3.Exit");
    rl.question("Select an option ",HandleInput)
}

const HandleInput=(option)=>{
    if(option==="1"){
        rl.question("Add a Task ",(task)=>{
           tasks.push(task);
           console.log("Task Added Successfully!!");
           showMenu();

        });
    }
  else if (option === "2") {
  console.log("View Tasks: ");
  tasks.forEach((task, idx) => {
    idx=idx+1;
    console.log(` ${idx}: ${task}`);
  });
  showMenu();
}

        
    
   else if(option==="3"){
        
        console.log("Good Bye!!");
        rl.close();
    }
    else{
        console.log("Wrong input,try again!");
        showMenu();
    }
}
showMenu();
