const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000";
const Patient = require("../../src/db/models").Patient;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : patients", () => {

  beforeEach((done) => {

    Patient.sync({
      force:true
    })
    .then(() => {
      done(null);
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("POST /addPatientToEmr", () => {

// #1
  it("should create a new user with valid values", (done) => {

    const options = {
      url: base + '/addPatientToEmr',
      form: {
        firstname: "Test",
        middlename: null,
        lastname: "Testy",
        dob: "2019-06-01",
        icon: "",
        gender: "male"
      }
    }

    request.post(options,
      (err, res, body) => {
        //console.log(body);

        Patient.findOne({where: {firstname: "Test"}})
        .then((patient) => {
          expect(patient).not.toBeNull();
          expect(patient.firstname).toBe("Test");
          expect(patient.id).toBe(1);
          done();
        })
        .catch((err) => {
          console.log(err);
          done();
        });
      }
    );
  });

// #3
    it("should not create a new user with invalid attributes", (done) => {
      request.post(
        {
          url: base + '/addPatientToEmr',
          form: {
            firstname: "Test",
            middlename: null,
            lastname: "Testy",
            dob: null,
            icon: "",
            gender: "male"
          }
        },
        (err, res, body) => {
          Patient.findOne({where: {firstname: "Test"}})
          .then((patient) => {
            expect(patient).toBeNull();
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /getPatients/:query ", () => {
    Patient.create({
      firstname: "Kelly",
      middlename: null,
      lastname: "Test",
      dob: "2019-01-01",
      icon: '/images/avatars/avatar_1.png',
      gender: "Female",
      query: ""
    })
    .then((patient) => {
      const options2 = {
        url: base + '/getPatients/'+patient.firstname
      }

      request.post(options2,
        (err, res, body) =>{
          expect(body).toContain("Kelly");
          done();
        });

    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("GET /patient/:id ", () => {
    Patient.create({
      firstname: "Kyle",
      middlename: null,
      lastname: "Test",
      dob: "2019-01-01",
      icon: '/images/avatars/avatar_1.png',
      gender: "Female",
      query: ""
    })
    .then((patient) => {
      const options2 = {
        url: base + '/patient/'+patient.id
      }

      request.post(options2,
        (err, res, body) =>{
          expect(body).toContain("Kyle");
          done();
        });

    })
    catch((err) => {
      console.log(err);
      done();
    });

  });


  describe("GET /getPatients/:begin/:limit ", () => {
    Patient.create({
      firstname: "Rachel",
      middlename: null,
      lastname: "Test",
      dob: "2019-01-01",
      icon: '/images/avatars/avatar_1.png',
      gender: "Female",
      query: ""
    })
    .then((patient0) => {
      Patient.create({
        firstname: "Erin",
        middlename: null,
        lastname: "Test",
        dob: "2019-01-01",
        icon: '/images/avatars/avatar_1.png',
        gender: "Female",
        query: ""
      })
      .then((patient1) => {
        const options = {
          url: base + '/getPatients/1/1'
        }

        request.post(options,
          (err, res, body) =>{
            expect(body).toContain("Rachel");
            expect(body).not.toContain("Erin");
            done();
          });
      })
      .catch((err) => {
        console.log(err);
        done();
      })


    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });




});
