import fs from 'fs';

// Read the JSON file
const filePath = './data-test.json';
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));


function generateRandomId() {
    return (Math.random() * 100000).toFixed(5);
}
  
  // Function to recursively update ids in an object
  function updateIds(obj) {
    if (obj && typeof obj === 'object') {
      for (const key in obj) {
        if (key === 'id') {
          obj[key] = generateRandomId();
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach(updateIds);
        } else if (obj[key] && typeof obj[key] === 'object') {
          updateIds(obj[key]);
        }
      }
    }
  }
  
  // Update all ids in the JSON data
  updateIds(jsonData);
  
  // Write the updated JSON data back to the file
  fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
  
  console.log("All ids in tasks and categories updated. Data written back to the file.");
  