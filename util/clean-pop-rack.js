const KEY_MAPPING = [
  'rack_id',
  'position',
  'dp_name',
  'position_name',
  'address',
  'city',
  'category',
  'sub_category',
  'web_category',
  'position_type',
  'rack_type',
  'status',
  'print_quantity',
  'tour_name',
  'sequency',
  'delivery_hour',
  'retrieval_hour',
  'latitude',
  'longitude',
]

const cleanPopRack = (racks) => {
  let cleanData = []

  racks.forEach((rack) => {
    const values = Object.values(rack)
    const merged = KEY_MAPPING.reduce((obj, key, index) => (
      { ...obj, [key]: values[index] }),
      {}
    );

    const cleaned = {
      ...merged,
      position: merged['position'].replace(/\s+/g, ''),
      latitude: Number(merged['latitude']),
      longitude: Number(merged['longitude']),
      location: {
        type: "Point",
        coordinates: [Number(merged['longitude']), Number(merged['latitude'])]
      },
      status: merged['status'] === 'Actif' ? true : false
    }

    cleanData.push(cleaned)
   })

  return cleanData
}

export default cleanPopRack
