import DS from 'ember-data';

export default DS.Model.extend({
  properties: DS.attr('properties'),
  geometry: DS.attr('geometry'),
});
