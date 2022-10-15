import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    console.log(this.store.findAll('feature'));
    return this.store.findAll('feature');
  },
});
