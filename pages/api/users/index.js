import { getSession } from 'next-auth/client';
import { manyToOne, query } from "@kaviar/nova";
import { connectToDatabase } from '@/util/mongodb';

async function UsersList(req, res) {
  const { method } = req
  const session = await getSession({ req });
  if (!session) {
    res
      .status(401)
      .send({ error: 'You must be sign in to view the protected content on this page.' });
  }

  switch (method) {
    case 'GET':
      try {
        const { db } = await connectToDatabase();
        const Users = await db.collection('users');
        const Accounts = await db.collection('accounts');

        manyToOne(Accounts, User, {
          linkName: "user",
          inversedLinkName: "accounts",
          // field will be `postId`
        });

        const results = await query(Users, {
          $: {
            // MongoDB Options
            options: {
              sort: {
                createdAt: -1,
              },
              limit: 20,
              skip: 0,
            },
          },
          name: 1,
          mail: 1,
          accounts: {
            $: {
              options: {
                sort: {
                  createdAt: -1,
                },
              },
            },
            providerId: 1,
            accessToken: 1
          }
        }).fetch();

        res.status(200).json({ success: true, data: results })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

export default UsersList;
