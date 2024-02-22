import { Meteor } from 'meteor/meteor';
import { ChatsCollection } from "./ChatsCollection";

Meteor.methods({
  'chats.sendMessage'(message) { 
    const username = Meteor.user()?.username;

    ChatsCollection.insert({
      messageText: message,
      createdAt: new Date(),
      username: username
    });
  }
});