import { Template } from "meteor/templating";
import "./Auth.html";

import { ReactiveVar } from "meteor/reactive-var";

currentView = new ReactiveVar("loginContainer");

Template.authContainer.helpers({
  currentView: function () {
    return currentView.get();
  },
});

Template.loginContainer.events({
  "click span": function (e) {
    e.preventDefault();
    currentView.set("signupContainer");
  },
  "submit #loginForm"(e) {
    e.preventDefault();

    const target = e.target;

    const username = target.username.value;
    const password = target.password.value;

    Meteor.loginWithPassword(username, password, (err) => {
      if (err) {
        alert(err);
      }
    });
  },
});

Template.signupContainer.events({
  "click span": function (e) {
    e.preventDefault();
    currentView.set("loginContainer");
  },
  "submit #signupForm"(e) {
    e.preventDefault();

    const target = e.target;

    const username = target.username.value;
    const password = target.password.value;
    const confirmPassword = target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    Accounts.createUser(
      {
        username,
        password,
      },
      (err) => {
        if (err) {
          alert(err);
        }
      }
    );
  },
});