import { getSession } from 'next-auth/client';
import { connectToDatabase } from '@/util/mongodb';
import { query } from "@kaviar/nova";

async function rackList(req, res) {
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
        const Racks = await db.collection('racks');

        const result = await query(Racks, {
          $: {
            options: {
              sort: { position: 1 },
              limit: 20,
              skip: 0
            }
          },
          rack_id: 1,
          category: 1,
          sub_category: 1,
          position:1,
          dp_name: 1
        }).fetch();

        res.status(200).json({ success: true, data: result })
      } catch (error) {
        console.log('errorerror', error);
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}

export default rackList;
