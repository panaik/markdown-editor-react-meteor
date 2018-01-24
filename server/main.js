import { Meteor } from 'meteor/meteor';
import { Bins } from '../imports/collections/bins';

Meteor.startup(() => {
  // code to run on server at startup

  // list of bins that a user owns
  Meteor.publish('bins', function() {
    return Bins.find({ ownerId: this.userId }); // this.userId is the id for the currently logged in user
  });

  // list of bins that are shared with a particular user
  Meteor.publish('sharedBins', function() {
    // find the user with this userId from Meteor's users list
    const user = Meteor.users.findOne(this.userId);

    if (!user) {
      return;
    }

    // a user in Meteor can have multiple email addresses, that is a single user may have registered multiple accounts
    // we can assume we only allow one email, which is true with our application
    const email = user.emails[0].address;

    // finally we can do a search on all the bins searching through the list of email addresses tied to each

    // SO look through all the Bins that we have
    // look at the sharedWith property on each
    // the sharedWith property should be an array
    // so walk through that array and find an element that matches to or eqaul to 'email'
    // So this way we get all the bins that are shared with this particular user
    return Bins.find({
      sharedWith: { $elemMatch: { $eq: email } }
    });
  });
});
