# Documentation

_Amazon Amplify Frontend and Backend Service_

This page demonstrates how to manage clients using Amazon Amplify's DataStore. You can create, read, update, and delete clients. The client data is stored in a DynamoDB table and synchronized in real-time across all clients.

## Data Schema

Using Amplify's GraphQL-based schema definition, I define my data model using the Amplify Data schema. The schema is automatically translated into DynamoDB tables, allowing efficient data operations.

```ts
const schema = a.schema({
  ClientTable: a
    .model({
      clientId: a.id().required(),
      clientName: a.string().required(),
      clientEmail: a.email().required(),
      clientPhoneNumber: a.phone().required(),
      clientCompanyName: a.string(),
      clientAddress: a.string(),
      status: a.enum(['Ongoing','Waiting_for_payment','Completed','Cancelled'])
    })
    .identifier(['clientId'])
    .authorization((allow) => [allow.owner()]),
});
```

Amplify simplifies DynamoDB authorization by integrating with AWS Cognito and IAM roles. Access to data can be restricted based on:

- **Owner-based access control**  
Used to limit access to individual users based on identity.

- **Attribute-based access control**  
Grants or denies access based on specific user attributes like roles or departments.

- **Group-based access control**  
Lets you manage access through user groups in Cognito.

- **Public access**  
Anyone can access the data without authentication.

```ts
export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
```

With Amplify's automatic authorization handling, I can perform CRUD operations without manually managing API Gateway or IAM permissions. This allows for a fully managed, serverless backend that scales effortlessly.
