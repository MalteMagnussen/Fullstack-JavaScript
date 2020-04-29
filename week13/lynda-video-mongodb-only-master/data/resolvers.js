import mongoose from "mongoose";
import {Friends} from "./dbConnectors"


export const resolvers = {
  Query: {
    getOneFriend: (root,{ id }) => {
      return Friends.findById(id);
    }
  },
  Mutation: {
    createFriend: (root,{ input }) => {
       const newFriend = new Friends({
         firstName: input.firstName,
         lastName: input.firstName,
         gender: input.gender,
         age: input.age,
         language: input.language,
         email : input.email,
         contacts: input.contacts
       })
       newFriend.id = newFriend._id;
       return newFriend.save();
    },
    updateFriend: (root,{input}) => {
      return Friends.findOneAndUpdate({_id:input.id},input,{new:true});
    },
    deleteFriend : async (root, {id}) => {
      try{
        await Friends.findOneAndRemove({_id:id})
        return `Friend with id: ${id} deleted`
      } catch(err){
        return `Failed to delete friend with id: ${id} deleted`
      }

    }
  }
}

