import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: "t47fzr5t",
  dataset: "production",
  apiVersion: "2024-03-28",
  useCdn: false,  
});

const query = `*[_type == "menuItem" && available != false] {
  name, description, price, emoji, category
}`;

async function fetchMenu() {
  console.log('Fetching static menu data from Sanity...');
  try { 
    const data = await client.fetch(query);
    
    const groupedData = {};
    data.forEach(item => {
      const cat = item.category || "Uncategorized";
      if (!groupedData[cat]) {
        groupedData[cat] = [];
      }
      // Remove category from item payload since it serves as the parent key
      const { category, ...rest } = item;
      groupedData[cat].push(rest);
    });

    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const outputPath = path.join(__dirname, 'public', 'data', 'menu.json');
    
    fs.writeFileSync(outputPath, JSON.stringify(groupedData, null, 2));
    console.log(`Successfully wrote ${Object.keys(groupedData).length} categories to public/data/menu.json`);
  } catch (error) {
    console.error('Error fetching Sanity data during build:', error);
    process.exit(1); 
  }
}

// Execute the build-time fetch
fetchMenu();
