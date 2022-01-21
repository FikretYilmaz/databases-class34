const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup',
});

connection.connect();

const dropDatabase = 'DROP DATABASE IF EXISTS meetup';
connection.query(dropDatabase, (error, results, fields) => {
  if (error) {
    throw error;
  }
});

const createDatabase = 'CREATE DATABASE meetup';
connection.query(createDatabase, (error, results, fields) => {
  if (error) {
    throw error;
  }
});

const connectMeetup = 'USE meetup';
connection.query(connectMeetup, (error, results, fields) => {
  if (error) {
    throw error;
  }
});
const createTableInvitee =
  'CREATE TABLE Invite (invitee_no INT, invitee_name VARCHAR(50), invitee_by VARCHAR(50))';
connection.query(createTableInvitee, (error, results, fields) => {
  if (error) {
    throw error;
  }
});

const createTableRoom =
  'CREATE TABLE Room (room_no SMALLINT, room_name VARCHAR(50), floor_number SMALLINT)';
connection.query(createTableRoom, (error, results, fields) => {
  if (error) {
    throw error;
  }
});

const createTableMeeting =
  'CREATE TABLE Meeting (meeting_no INT, meeting_title TEXT, starting_time DATETIME, ending_time DATETIME, room_no SMALLINT)';
connection.query(createTableMeeting, (error, results, fields) => {
  if (error) {
    throw error;
  }
});

const insertValueInvite =
  'INSERT INTO Invite (invitee_no, invitee_name, invitee_by) VALUES ?';
const inviteValues = [
  [01, 'Fikret', 'Ali'],
  [02, 'Emine', 'Ali'],
  [03, 'Umut', 'Ahmet'],
  [04, 'Bera', 'Mehmet'],
  [05, 'Hatice', 'Ali'],
];
connection.query(
  insertValueInvite,
  [inviteValues],
  function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('The value of invite added');
  },
);

const insertValueMeeting =
  'INSERT INTO meeting (meeting_no, meeting_title,starting_time, ending_time, room_no) VALUES ?';
const meetingValues = [
  [01, 'Project', '2021-01-01 12:30:00', '2021-01-02 13:00;00', 21],
  [02, 'Eating', '2021-02-01 13:00:00', '2021-02-02 14:00:00', 22],
  [03, 'Meeting', '2021-01-04 14:30:00', '2021-01-04 15:00:00', 24],
  [04, 'Movie', '2021-01-01 11:30:00', '2021-01-02 11:50:00', 26],
  [05, 'Sales', '2021=05-01 10:00:00', '2021-05-02 11:00:00', 21],
];

connection.query(
  insertValueMeeting,
  [meetingValues],
  function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('The value of meeting added');
  },
);

const insertValueRoom =
  'INSERT INTO Room (room_no, room_name,floor_number) VALUES ?';
const roomValues = [
  [11, 'Project', 1],
  [22, 'Eating', 2],
  [24, 'Meeting', 4],
  [26, 'Movie', 2],
  [21, 'Sales', 2],
];

connection.query(
  insertValueRoom,
  [roomValues],
  function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('The value of room added');
  },
);

connection.end();
