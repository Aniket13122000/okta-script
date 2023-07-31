const { log } = require('console');
const fs = require('fs');

const filePath = 'P_name.json';
var Priority_name ;
var User_groups
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading the file: ${filePath}`);
    return;
  }

  try {
     Priority_name = JSON.parse(data);
     const filePath1 = 'User_id.json';

fs.readFile(filePath1, 'utf8', (err, data) => {
   
    try {
         User_groups = JSON.parse(data);
        checkGroups()

  
      
      console.log('Name:', name);
    } catch (error) {
      console.error('Error parsing the JSON file:', error.message);
    }
  });


    // Access the data in the JSON object
    // For example, if your JSON contains a "name" property, you can access it like this:
    

    // Do something with the data...
  } catch (error) {
    console.error('Error parsing the JSON file:', error.message);
  }
});


const checkGroups=async()=>{
    for( let k=0;k<User_groups.length;k++){
        outerLoop:for (let i = 0; i < Priority_name.length; i++) {
      for(let j=0;j<Priority_name[i].groups.length;j++){
      //  console.log(Priority_name[i].groups[j])
        if (User_groups[k].Groupp_ids.includes(Priority_name[i].groups[j])) {

            console.log(`${Priority_name[i].P_name} ,${User_groups[k].USer_ID} is present in the array.`);
            break outerLoop;
          } 
      }
    }
   }
}




