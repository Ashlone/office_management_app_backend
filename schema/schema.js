import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import Office from "../model/Office.js";

//Office Type
const OfficeType = new GraphQLObjectType({
  name: "Office",
  fields: () => ({
    id: { type: GraphQLID },
    officeName: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
    physicalAddress: { type: GraphQLString },
    maximumCapacity: { type: GraphQLString },
    color: { type: GraphQLString },
    staff: { type: new GraphQLList(StaffType) },
  }),
});

const StaffType = new GraphQLObjectType({
  name: "Staff",
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    avatar: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    offices: {
      //returning all offices
      type: new GraphQLList(OfficeType),
      resolve(parent, args) {
        return Office.find();
      },
    },
    //returning only an office
    office: {
      type: OfficeType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Office.findById(args.id);
      },
    },
  },
});

//Mutations
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    // Add a office
    addOffice: {
      type: OfficeType,
      args: {
        officeName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        physicalAddress: { type: GraphQLNonNull(GraphQLString) },
        maximumCapacity: { type: GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const office = new Office({
          officeName: args.officeName,
          email: args.email,
          phone: args.phone,
          physicalAddress: args.physicalAddress,
          maximumCapacity: args.maximumCapacity,
          color: args.color,
        });

        return office.save();
      },
    },
    // Delete an office
    deleteOffice: {
      type: OfficeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Office.findByIdAndDelete(args.id);
      },
    },

    // Update an office
    updateOffice: {
      type: OfficeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        officeName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
        physicalAddress: { type: GraphQLNonNull(GraphQLString) },
        maximumCapacity: { type: GraphQLNonNull(GraphQLString) },
        color: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Office.findByIdAndUpdate(
          args.id,
          {
            $set: {
              officeName: args.officeName,
              phone: args.phone,
              email: args.email,
              physicalAddress: args.physicalAddress,
              maximumCapacity: args.maximumCapacity,
              color: args.color,
            },
          },
          { new: true }
        );
      },
    },

    // Add a staff member
    addStaff: {
      type: OfficeType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        avatar: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Office.findByIdAndUpdate(
          args.id,
          {
            $push: {
              staff: {
                firstName: args.firstName,
                lastName: args.lastName,
                avatar: args.avatar,
              },
            },
          },
          { new: true }
        );
      },
    },
    // Update a staff member
    updateStaff: {
      type: OfficeType,
      args: {
        staffid: { type: GraphQLNonNull(GraphQLID) },
        id: { type: GraphQLNonNull(GraphQLID) },
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        avatar: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return Office.findOneAndUpdate(
          { _id :args.id, "staff._id": args.staffid},
          {
           $set: {
            "staff.$.firstName": args.firstName,
             "staff.$.lastName": args.lastName,
             "staff.$.avatar": args.avatar,
            },
          },
        )
      },
    },
    // Delete a staff member
    deleteStaff: {
      type: OfficeType,
      args: {
        officeid: { type: GraphQLNonNull(GraphQLID) },
        staffid: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Office.findByIdAndUpdate(args.officeid, {
          $pull: { staff: { _id: args.staffid } },
        });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation,
});

export default schema;
