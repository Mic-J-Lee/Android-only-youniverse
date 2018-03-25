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
    name:  'string',
    gold:  {type: 'int', default: 0},
    purse: {type: 'int', default: 100},
    flux:  {type: 'int', default: 0},
    flask: {type: 'int', default: 0}
  }
}

export const GameSchema = {
  name: 'Game',
  properties: {
    user:        'User?',
    introStatus: {type: 'string', default: 'not started'},
    activeColor: {type: 'string', default: 'red'},
    red:         {type: 'bool', default: true},
    orange:      {type: 'bool', default: true},
    yellow:      {type: 'bool', default: true},
    green:       {type: 'bool', default: true},
    blue:        {type: 'bool', default: true},
    purple:      {type: 'bool', default: true}
  }
}
