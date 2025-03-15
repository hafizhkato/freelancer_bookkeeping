import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  ClientTable: a
    .model({
      clientId: a.id().required(),
      clientName: a.string().required(),
      clientEmail: a.email(),
      clientPhoneNumber: a.phone(),
      clientAddress: a.string(),
      description: a.string(),
      members: a.hasMany('ClientDocuments', ['clientId','clientName'])
    })
    .identifier(['clientId', 'clientName'])
    .authorization((allow) => [allow.owner()]),

    ClientDocuments: a
    .model({
      title: a.string().required(),
      clientId: a.id().required(),
      clientName: a.string().required(),
      date: a.date(),
      documentType: a.string(),
      documentURL: a.url().required(),
      description: a.string(),
      document: a.belongsTo('ClientTable',['clientId','clientName'])
    })
    .authorization((allow) => [allow.owner()]),

    InvoiceTable: a
    .model({
      invoiceId: a.id().required(),
      clientId: a.id().required(),
      invoiceDate: a.date(),
      amount: a.float(),
      status: a.enum(['Pending', 'Paid', 'Overdue', 'Cancel']),
      description: a.string(),
      invoiceURL: a.url(),
      members: a.hasMany('InvoiceItem', ['invoiceId','clientId'])
    })
    .identifier(['invoiceId', 'clientId'])
    .authorization((allow) => [allow.owner()]),
   
    InvoiceItem: a
    .model({
      itemName: a.string().required(),
      itemQuantity: a.integer().required(),
      invoiceId: a.id().required(),
      clientId: a.id().required(),
      itemPrice: a.float().required(),
      totalAmount: a.float().required(),
      description: a.string(),
      invoice: a.belongsTo('InvoiceTable', ['invoiceId', 'clientId'])
    })
    .authorization((allow) => [allow.owner()]),

    ExpenseTable: a
    .model({
      expenseId: a.id().required(),
      expenseDate: a.date(),
      category: a.string(),
      amount: a.float().required(),
      description: a.string(),
      receiptURL: a.url(),
      members: a.hasMany('ExpenseItem', 'expenseId')
    })
    .identifier(['expenseId'])
    .authorization((allow) => [allow.owner()]),

    ExpenseItem: a
    .model({
      itemName: a.string().required(),
      itemQuantity: a.integer().required(),
      expenseId: a.id().required(),
      itemPrice: a.float().required(),
      totalAmount: a.float().required(),
      description: a.string(),
      expense: a.belongsTo('ExpenseTable','expenseId')
    })
    .authorization((allow) => [allow.owner()]),



});

    

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});


