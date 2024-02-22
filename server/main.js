import { Meteor } from "meteor/meteor";
import '/imports/api/ChatsMethods';
import '/imports/api/ChatsPublications';
import { ChatsCollection } from "/imports/api/ChatsCollection";
import { Accounts } from 'meteor/accounts-base';

const SEED_USERNAME = "admin";
const SEED_PASSWORD = "admin";

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }

  const user = Accounts.findUserByUsername(SEED_USERNAME);

  if (ChatsCollection.find().count() === 0) {
    ChatsCollection.insert({
      messageText: 'Welcome to the chat app!',
      createdAt: new Date(),
      username: user.username,
    });
  }
});