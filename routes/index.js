import user from './user';
import product from './product';
import region from './region';
import advisory from './advisory';

export default app => {
  app.use('/user', user);
  app.use('/product', product);
  app.use('/region', region);
  app.use('/advisory', advisory);
};
