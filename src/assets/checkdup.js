import fs from 'fs';

// Read the JSON file
const filePath = './data-test.json';
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));



function checkForDuplicateTaskIds(categories) {
    const taskIds = new Set();
  
    for (const category of categories) {
      for (const task of category.tasks) {
        if (taskIds.has(task.id)) {
          return true; // Duplicate id found
        }
        taskIds.add(task.id);
      }
    }
  
    return false; // No duplicate ids found
  }
  
  // Check for duplicate task ids across all categories
  const hasDuplicateTaskIds = checkForDuplicateTaskIds(jsonData.categories);
  
  if (hasDuplicateTaskIds) {
    console.log("There are tasks with duplicate ids across all categories.");
  } else {
    console.log("No duplicate ids found in tasks across all categories.");
  }