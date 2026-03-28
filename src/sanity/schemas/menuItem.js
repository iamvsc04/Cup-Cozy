export default {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price (e.g. ₹ 250)',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'emoji',
      title: 'Emoji Icon (e.g. ☕)',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'e.g. "Hot Coffees", "Teas", "Desserts". Items with the exact same category name will be automatically grouped together on the menu.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'available',
      title: 'Available',
      type: 'boolean',
      initialValue: true,
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      emoji: 'emoji'
    },
    prepare(selection) {
      return {
        title: `${selection.emoji || ''} ${selection.title}`,
        subtitle: selection.subtitle
      };
    }
  }
};
