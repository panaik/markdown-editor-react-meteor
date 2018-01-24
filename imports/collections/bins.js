import { Mongo } from 'meteor/mongo';

// Remove the Insecure package first and then write Meteor Methods

// this.userId : is the reason why we have 'function' keyword instead of 'fat arrow function'
// because we want the value of 'this' at runtime and access the logged in userId off of it
// using fat arrow function will break the content and bind this to the insert function and not the runtime context
Meteor.methods({
  'bins.insert': function() {
    return Bins.insert({
      createdAt: new Date(),
      content: '', // default it to empty string
      sharedWith: [], // default to empty array, will contain email addresses
      ownerId: this.userId // In Meteor methods the currently logged in user can be accessed via this.userId
    });
  },

  // Meteor uses the nomenclature of removing records instead of deleting records
  // pass in the bin object or model
  'bins.remove': function(bin) {
    return Bins.remove(bin);
  },

  'bins.update': function(bin, newContent) {
    // we want to entirely replace the content of the model with new content, using Mongo Modifier '$set'
    // So in the Bins collection, find the bin with this id and then for updating
    // we want to 'set' the value of content to be newContent
    return Bins.update(bin._id, { $set: { content: newContent } });
  },

  'bins.share': function(bin, email) {
    // '$push' mongo modifier will push a new record into the sharedWith array
    // So find the bin with this bin._id, find the property with id sharedWith, it should be an array
    // and on that array push this new email
    return Bins.update(bin._id, { $push: { sharedWith: email } });
  }
});

export const Bins = new Mongo.Collection('bins');
