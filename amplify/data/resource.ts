import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  ClientTable: a
    .model({
      clientId: a.id().required(),
      clientName: a.string().required(),
      clientEmail: a.email().required(),
      clientPhoneNumber: a.phone().required(),
      clientCompanyName: a.string(),
      clientAddress: a.string(),
      status: a.enum(['Ongoing','Waiting_for_payment','Completed','Cancelled']),
      members: a.hasMany('ClientDocuments','clientId')
    })
    .identifier(['clientId'])
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
      document: a.belongsTo('ClientTable','clientId')
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


