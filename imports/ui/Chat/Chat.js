import { Template } from "meteor/templating";
import { ChatsCollection } from "/imports/api/ChatsCollection";
import "./Chat.html";
import "../Auth/Auth.js"

Meteor.subscribe("chats");

Template.chatContent.helpers({
  chats() {
    return ChatsCollection.find({}, { sort: { createdAt: 1 } });
  },
});

Template.body.events({
  "click #sendMessage": function () {
    const messageElement = document.querySelector("#message");
    if (messageElement.value.trim()) {
      Meteor.call("chats.sendMessage", messageElement.value.trim());
      messageElement.value = "";
    }
  },
});

Template.body.helpers({
  isUserLogged() {
    return !!Meteor.userId() && !Meteor.loggingIn();
  },
});

Template.body.events({
  "click #sendMessage": function () {
    const messageElement = document.querySelector("#message");
    if (messageElement.value.trim()) {
      Meteor.call("chats.sendMessage", messageElement.value.trim());
      messageElement.value = "";
    }
  },
  "click #logout": function () {
    Meteor.logout();
  },
});
