const mongoose= require('mongoose')

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


module.exports = mongoose.model('Property', PropertySchema)