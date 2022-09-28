import user from './user';
import product from './product';

export default app => {
  app.use('/user', user);
  app.use('/product', product);
};
