import DS from 'ember-data';

export default DS.Model.extend({
  properties: {
    name: DS.attr('string'),
    foundation: DS.attr('string'),
    capital: DS.attr('string'),
  },
  geometry: {
    geometryType: DS.attr('string'),
    coordinates: DS.attr('array'),
  },
});
