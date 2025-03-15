import { defineStorage } from '@aws-amplify/backend';


export const storage = defineStorage({
  name: 'UserStorages',
  access: (allow) => ({
    'expenses_documents/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],

    'income_documents/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],

    'client_documents/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],

}),
});