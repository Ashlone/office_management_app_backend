import mongoose from "mongoose";

const StaffSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required:true
    },
    lastName: {
      type: String,
      required:true
    },
    avatar: {
      type: String,
      required:true
    },
  },
  { timestamps: true }
);

const OfficeSchema = new mongoose.Schema(
  {
    officeName: {
      type: String,
      required:true
    },
    email: {
      type: String,
      required:true
    },
    phone: {
      type: String,
      required:true
    },
    physicalAddress: {
      type: String,
      required:true
    },
    maximumCapacity: {
      type: String,
      required:true
    },
    color: {
      type: String,
      required:true
    },
    staff: [StaffSchema],
  },
  { timestamps: true }
);

const office = mongoose.model("Office", OfficeSchema);
export default office;
