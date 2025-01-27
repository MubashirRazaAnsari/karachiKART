const categorySchema = {
    name: 'category',
    type: 'document',
    title: 'Category',
    fields: [
      { name: 'categoryId', type: 'string', title: 'Category ID' },
      { name: 'name', type: 'string', title: 'Name' },
      { name: 'subcategories', type: 'array', of: [{ type: 'string' }], title: 'Subcategories' },
      { name: 'tags', type: 'array', of: [{ type: 'string' }], title: 'Tags' },
    ],
  };

export default categorySchema;