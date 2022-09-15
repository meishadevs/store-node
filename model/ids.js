import mongoose from 'mongoose';

const idsSchema = new mongoose.Schema({
  userId: Number
});

const Ids = mongoose.model('Ids', idsSchema);

/* eslint-disable handle-callback-err */
Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      userId: 0
    });

    newIds.save();
  }
});

export default Ids;
