// export const DogSchema = {
//   name: 'Dog',
//   properties: {
//     name: 'string'
//   }
// }

export const UserSchema = {
  name: 'User',
  primaryKey: 'name',
  properties: {
    name: 'string',
    gold: {type: 'int', default: 0},
    flux: {type: 'int', default: 0}
  }
}

export const GameSchema = {
  name: 'Game',
  properties: {
    user: 'User?',
    introStatus: {type: 'string', default: 'not started'}
  }
}
