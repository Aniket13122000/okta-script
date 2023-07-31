const axios = require('axios');
const fs = require('fs');

let find_groups = async() => {

    var User_g=[]
    const config = {
        method: 'get',
        url: `https://dev-72858647.okta.com/api/v1/policies?type=MFA_ENROLL`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `SSWS 00iqTA_9Yk6DeXK3VxfHK-bgd9tY6iYZgat9cRq8bD`,
          'Cookie':'JSESSIONID=D02F5F368AC23B728AA3EA96DC59F975'
        }
      };

      const response = await axios.request(config);
     // console.log(response.data[0].conditions.people.groups.include);

      for (let index = 0; index < response.data.length; index++) {
        const element = response.data[index].conditions.people.groups.include;
        // console.log(response.data[index].name);
        // console.log(element);
        User_g.push({
            groups:element,
            P_name:response.data[index].name,
            P_priority:response.data[index].priority
        });
      }
console.log(User_g);
      const jsonData = JSON.stringify(User_g, null, 2);
      const filePath = 'P_name.json';
    
      fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
          console.error('Error writing JSON file:', err);
        } else {

          console.log('JSON file created successfully!');
        }
      });
}


find_groups();