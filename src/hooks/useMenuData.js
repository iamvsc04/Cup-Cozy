import { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import { sanityConfig } from '../sanity/config';

// Initialize a client specifically for live DEV mode fetching bypassing the CDN entirely
const devClient = createClient({
  ...sanityConfig,
  useCdn: false,
});

const query = `*[_type == "menuItem" && available != false] {
  name, description, price, emoji, category
}`;

export function useMenuData() {
  const [menuData, setMenuData] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        if (import.meta.env.DEV) {
          // LIVE DEV MODE: Fetch directly from Sanity database so local Studio edits appear instantly
          const data = await devClient.fetch(query);
          const groupedData = {};
          
          data.forEach(item => {
            const cat = item.category || "Uncategorized";
            if (!groupedData[cat]) groupedData[cat] = [];
            
            // Remove category from payload as it acts as the dictionary key
            const { category, ...rest } = item;
            groupedData[cat].push(rest);
          });
          
          setMenuData(groupedData);
          setCategories(Object.keys(groupedData));
        } else {
          // PRODUCTION MODE: Fetch the pre-computed static JSON for max speed & 0 API overhead
          const response = await fetch('/data/menu.json');
          if (!response.ok) {
            throw new Error('Static menu JSON not found. Build script may have failed.');
          }
          const data = await response.json();
          
          setMenuData(data);
          setCategories(Object.keys(data));
        }
      } catch (err) {
        console.error('Failed to load menu data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchMenu();
  }, []);

  return { menuData, categories, loading };
}
