const mongoose= require('mongoose')

const geocoder= require('../utils/geocoder')

const PropertySchema= new mongoose.Schema({
  property_name :{
      type: String,
  },
  onlyfor:{
    type: String,
    default: 'Boys'
  },
  images:[String],
  rent:{
      type:Number,
      // required: true,
      min:0,
      max:100000
  },
  disc:{
      type:String,
      // required:true,
      trim:true
  },
  owner:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
  },
  no_rooms:{
      type:Number,
      default: 1
  },
  max_student_per_room:{
      type:Number,
      default: 1
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  facilitates:{
      bathroom:{
          type: Boolean,
          default: true
      },
      kitchen:{
          type:Boolean
      },
      furniture:{
          type:Boolean
      },
  }, 
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAddress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

});

PropertySchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress
    };
  
    // Do not save address
    this.address = undefined;
    next();
});


module.exports = mongoose.model('Property', PropertySchema)