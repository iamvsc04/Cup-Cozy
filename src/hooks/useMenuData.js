import { useState, useEffect } from 'react';

export function useMenuData() {
  const [menuData, setMenuData] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch('/data/menu.csv');
        const text = await response.text();
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');

        const items = lines.slice(1).map(line => {
          const values = line.split(',');
          const item = {};
          headers.forEach((h, i) => {
            item[h.trim()] = values[i]?.trim();
          });
          return item;
        });

        // Group by category
        const grouped = {};
        const cats = [];
        items.forEach(item => {
          if (!grouped[item.category]) {
            grouped[item.category] = [];
            cats.push(item.category);
          }
          grouped[item.category].push(item);
        });

        setMenuData(grouped);
        setCategories(cats);
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
