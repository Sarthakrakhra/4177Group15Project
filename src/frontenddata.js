export const users = [
  {
    userid: 1,
    username: "Wendy",
    userdescription:
      "Hi, I'm Wendy! I'm a 4th year biology major at Dalhousie.",
    joindate: "2020-06-15T05:24:17.000Z",
  },
  {
    userid: 2,
    username: "Jim",
    userdescription: "Howdy folks, drop me a message anytime.",
    joindate: "2020-06-15T07:38:21.000Z",
  },
  {
    userid: 3,
    username: "Alicia",
    userdescription:
      "As a TA at Dalhousie university I strive to uphold the noble goal of academic integrity.",
    joindate: "2020-06-17T12:23:02.000Z",
  },
  {
    userid: 4,
    username: "Jackson",
    userdescription: "I'm not even a Dal student, I just like the site.",
    joindate: "2020-06-19T01:55:43.000Z",
  },
];

export const forums = [
  {
    forumid: 1,
    forumname: "General",
    forumdescription: "Everything goes!",
    privacy: "public",
  },
  {
    forumid: 2,
    forumname: "Grad School",
    forumdescription:
      "Discussions about applying to grad school, or work in grad school, or anything else related to graduate studies.",
    privacy: "public",
  },
  {
    forumid: 3,
    forumname: "CSCI4199",
    forumdescription: "Private forum for the class of CSCI 4199",
    privacy: "private",
  },
  {
    forumid: 4,
    forumname: "Halifax",
    forumdescription: "News, events, and other Halifax discussion",
    privacy: "public",
  },
  {
    forumid: 5,
    forumname: "Food",
    forumdescription:
      "Discuss your favourite meals, restaurants, recipes, or whatever else about food here!",
    privacy: "public",
  },
];

export const threads = [
  {
    threadid: 1,
    threadtitle: "Hi everyone!",
    threadtext: "Maybe we can all introduce ourselves?",
    postdate: "2020-06-19T02:00:43.000Z",
    forumid: 1,
    userid: 4,
  },
  {
    threadid: 2,
    threadtitle: "Assignment 1 Extension",
    threadtext:
      "Please note that CSCI 4199 assignment 1 has been extended to give an extra week to work on it.",
    postdate: "2020-06-19T02:01:43.000Z",
    forumid: 3,
    userid: 3,
  },
  {
    threadid: 3,
    threadtitle: "It's so late I want to sleep",
    threadtext: "See title",
    postdate: "2020-06-19T02:02:43.000Z",
    forumid: 1,
    userid: 2,
  },
];

export const comments = [
  {
    threadid: 1,
    userid: 1,
    postdate: "2020-06-20T02:02:43.000Z",
    commenttext: "Hi! I'm Wendy, a bio major!",
  },
  {
    threadid: 1,
    userid: 2,
    postdate: "2020-06-20T02:03:43.000Z",
    commenttext: "Name's Jim, fourth year student at Dal",
  },
  {
    threadid: 3,
    userid: 4,
    postdate: "2020-06-20T02:04:43.000Z",
    commenttext: "Mood bro, hang in there.",
  },
  {
    threadid: 2,
    userid: 2,
    postdate: "2020-06-20T02:05:43.000Z",
    commenttext: "Yo, thank goodness",
  },
];
