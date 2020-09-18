import { getSession } from 'next-auth/client';
import { connectToDatabase } from '@/util/mongodb';

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
        const options = {
          sort: { position: 1 },
          limit: 20,
          projection: {
            rack_id: 1,
            category: 1,
            sub_category: 1,
            position:1,
            dp_name: 1
          }
        };

        const collection = await db.collection('racks')
        const result = await collection.find({}, options)
        const racks = await result.forEach((doc) => { return doc })

        console.log('racks', racks);

        res.status(200).json({ success: true, data: racks })
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
