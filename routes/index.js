import user from './user';
import product from './product';
import region from './region';

export default app => {
  app.use('/user', user);
  app.use('/product', product);
  app.use('/region', region);
};
