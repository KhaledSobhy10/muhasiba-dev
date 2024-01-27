import fs from 'fs';

// Read the JSON file
const filePath = './data-test.json';
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Iterate through each category and update maxScore with the sum of task scores
jsonData.categories.forEach(category => {
  const sumOfTaskScores = category.tasks.reduce((sum, task) => sum + task.score, 0);
  category.maxScore = sumOfTaskScores;
});

// Write the updated JSON data back to the file
fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

console.log("Updated maxScore for each category. Data written back to the file.");
