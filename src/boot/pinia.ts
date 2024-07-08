import { boot } from 'quasar/wrappers';
import { createPinia } from 'pinia';

export default boot(async ({ app }) => {
  console.log('### Pinia Boot ### ');

  app.use(createPinia());
});
