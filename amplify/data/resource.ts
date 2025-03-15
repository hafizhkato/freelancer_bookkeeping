import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  ClientTable: a
    .model({
      clientId: a.id().required(),
      clientName: a.string().required(),
      clientEmail: a.email(),
      clientPhoneNumber: a.phone(),
      clientAddress: a.string(),
    })
    .identifier(['clientId', 'clientName'])
    .authorization((allow) => [allow.owner()]),

    InvoiceTable: a
    .model({
      invoiceId: a.id().required(),
      clientId: a.id().required(),
      invoiceDate: a.date(),
      amount: a.float(),
      status: a.enum(['Pending', 'Paid', 'Overdue', 'Cancel']),
    })
    .identifier(['invoiceId', 'clientId'])
    .authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});


