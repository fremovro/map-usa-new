import DS from 'ember-data';
import ENV from 'map-usa/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: ENV.backendURL,

  handleResponse(status, headers, payload) {
    const meta = {
      total: headers['x-total-count'],
    };

    payload.meta = meta;

    return this._super(status, headers, payload);
  },
});
