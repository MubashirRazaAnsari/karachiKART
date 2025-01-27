import { defineType, defineField } from 'sanity'
import type { NumberRule } from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'productOrServiceId',
      type: 'reference',
      to: [{ type: 'product' }, { type: 'service' }],
      title: 'Product/Service'
    }),
    defineField({
      name: 'userId',
      type: 'reference',
      to: [{ type: 'customer' }, { type: 'seller' }],
      title: 'User'
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Rating',
      validation: (rule: NumberRule) => rule.min(1).max(5)
    }),
    defineField({
      name: 'comment',
      type: 'text',
      title: 'Comment'
    }),
    defineField({
      name: 'timestamp',
      type: 'datetime',
      title: 'Timestamp'
    })
  ]
})