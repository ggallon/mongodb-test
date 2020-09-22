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
  'longitude'
];

const cleanPopRack = racks => {
  const cleanData = [];

  racks.forEach(rack => {
    const values = Object.values(rack);
    const merged = KEY_MAPPING.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
    const street = merged.address.split(',');
    const location = merged.city.split(' ');

    delete merged.address;
    delete merged.city;

    const cleaned = {
      ...merged,
      position: merged.position.replace(/\s+/g, ''),
      address: {
        streetNumber: street[0],
        streetType: street[1].toLocaleLowerCase(),
        streetName: street[2],
        zipCode: location.shift(),
        city: location.join(' ')
      },
      latitude: Number(merged.latitude),
      longitude: Number(merged.longitude),
      location: {
        type: 'Point',
        coordinates: [Number(merged.longitude), Number(merged.latitude)]
      },
      status: merged.status === 'Actif'
    };

    cleanData.push(cleaned);
  });

  return cleanData;
};

export default cleanPopRack;
