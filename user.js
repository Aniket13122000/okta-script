const axios = require('axios');
const fs = require('fs');
const path = require("path");
const csv = require("csv-parser");
const { log } = require('console');

const filePath = path.join(__dirname, "Export Users 2023-07-31 15-38-10.csv");
var USer_IDs = [];
fs.createReadStream(filePath)
  .pipe(csv())
  .on("data", async (row) => {
    console.log(row.User_Id);
   
    await USer_IDs.push(row.User_Id);
  })
  .on("end", () => {
    console.log(USer_IDs);
   processAppIds(USer_IDs);
  // console.log(App_IDs)
    console.log("CSV file successfully processed.");
  });

  async function processAppIds(USer_IDs) {
    
    const appData = {}; // Initialize an empty object to accumulate data
     const User_id=[]
    for (const appId of USer_IDs) {
      const data = await find_groups(appId);
      if (data) {
      // console.log('addd');
      
       let ob={
        Groupp_ids:data,
        USer_ID:appId
       }
    
       User_id.push(ob)
      }
    }
  
    // Write the entire appData object to a JSON file
    const jsonData = JSON.stringify(User_id, null, 2);
    const filePath = 'User_id.json';
  
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file created successfully!');
      }
    });
    console.log(User_id);
  }

let find_groups = async(appId) => {

    var User_g=[]
    const config = {
        method: 'get',
        url: `https://dev-72858647.okta.com/api/v1/users/${appId}/groups`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `SSWS 00iqTA_9Yk6DeXK3VxfHK-bgd9tY6iYZgat9cRq8bD`,
          'Cookie':'JSESSIONID=44DD5128BE2B0192AD4ED5FA43D939FF'
        }
      };

      const response = await axios.request(config);
     // console.log(response.data);
     var data;
      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index].id;
        console.log(element);
        User_g.push(element);
        
        

      }
      return User_g;
      
    //   const jsonData = JSON.stringify(User_g, null, 2);
    //   const filePath = 'User_id.json';
    
    //   fs.writeFile(filePath, jsonData, (err) => {
    //     if (err) {
    //       console.error('Error writing JSON file:', err);
    //     } else {

    //       console.log('JSON file created successfully!');
    //     }
    //   });
}


//find_groups();