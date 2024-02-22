import { Meteor } from "meteor/meteor";

import { ChatsCollection } from "./ChatsCollection";

Meteor.publish("chats", function () {
  return ChatsCollection.find({}, { sort: { createdAt: -1 } });
});