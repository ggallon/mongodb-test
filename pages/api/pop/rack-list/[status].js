import { getSession } from 'next-auth/client';
import cleanPopRack from '@/util/clean-pop-rack';
import { connectToDatabase } from '@/util/mongodb';

async function rackList(req, res) {
  const session = await getSession({ req });
  if (!session) {
    res
      .status(401)
      .send({ error: 'You must be sign in to view the protected content on this page.' });
  }

  // Status options: -1 (all), 1 (active), 0 (inactive)
  const {
    query: { status }
  } = req;
  const API_URL = `${process.env.POP_API_URL}?status=${status}`;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.POP_API_KEY
    }
  });

  const jsonData = await response.json();

  if (jsonData.errors) {
    res.status(500).json(jsonData.errors);
  }

  const dataNormalized = cleanPopRack(jsonData.data);

  const { db } = await connectToDatabase();
  const bulk = await db.collection('racks').initializeOrderedBulkOp();
  dataNormalized.map(rack => bulk.insert(rack));
  const result = await bulk.execute();

  res.status(200).json({
    success: true,
    data: result
  });
}

export default rackList;
