// data/users.js
// Preloaded sample users data

const initialUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    createdAt: new Date('2023-01-15T10:30:00Z').toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    age: 34,
    createdAt: new Date('2023-02-20T14:45:00Z').toISOString()
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    age: 42,
    createdAt: new Date('2023-03-10T09:15:00Z').toISOString()
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    age: 25,
    createdAt: new Date('2023-04-05T16:20:00Z').toISOString()
  },
  {
    id: '5',
    name: 'Robert Brown',
    email: 'robert.b@example.com',
    age: 31,
    createdAt: new Date('2023-05-12T11:00:00Z').toISOString()
  }
];

module.exports = { initialUsers };