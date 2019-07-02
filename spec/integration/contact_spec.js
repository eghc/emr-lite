const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000";
const Contact = require("../../src/db/models").Contact;
const Patient = require("../../src/db/models").Patient;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : vitals", () => {

  let patient = null;
  beforeEach((done) => {

    Contact.sync({
      force:true
    })
    .then(() => {
      done(null);
    })
    .catch((err) => {
      console.log(err);
      done();
    });

    Patient.create({
      firstname: "Kyle",
      middlename: null,
      lastname: "Test",
      dob: "2019-01-01",
      icon: '/images/avatars/avatar_1.png',
      gender: "Female",
      query: ""
    })
    .then((p) => {
      patient = p;
    })
    catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("POST /updateContact/:id", () => {

// #1
  it("should create a new contact", (done) => {

    const options = {
      url: base + '/updateContact/' + patient.id,
      form: {
        patientId: patient.id,
        email: "kyle@gmail.com",
        homephone: "8058958558",
        cellphone: null,
        street1: "1001 State St",
        street2: "Carpinteria",
        state: "CA",
        zip: "933333"
      }
    }

    request.post(options,
      (err, res, body) => {
        //console.log(body);

        Contact.findOne({where: {patientId: patient.id}})
        .then((contact) => {
          expect(contact.cellphone).toBeNull();
          expect(contact.email).toBe("kyle@gmail.com");
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

  describe("GET /getContacts/:id", () => {

// #1
  it("should get history of contact for patients", (done) => {

    Contact.create({
      patientId: patient.id,
      email: "hello@gmail.com",
      homephone: null,
      cellphone: null,
      street1: "1001 State St",
      street2: "Carpinteria",
      state: "CA",
      zip: "933333"
    })
    .then((contact0) =>{

      Contact.create({
        patientId: patient.id,
        email: null,
        homephone: null,
        cellphone: null,
        street1: "1001 State St",
        street2: "Carpinteria",
        state: "CA",
        zip: "933333"
      })
      .then((contact1) =>{
        const options = {
          url: base + '/getContacts/' + patient.id
        }

        request.get(options,
          (err, res, body) => {
            //console.log(body);
            expect(body).toEqual([
              {
                patientId: contact1.patientId,
                email: null,
                homephone: null,
                cellphone: null,
                street1: contact1.street1,
                street2: contact1.street2,
                state: contact1.state,
                zip: contact1.zip
              },
              {
                patientId: contact0.patientId,
                email: contact0.email,
                homephone: null,
                cellphone: null,
                street1: contact0.street1,
                street2: contact0.street2,
                state: contact0.state,
                zip: contact0.zip
              }
            ]);
            done();
        );

      })
      .catch((err) => {
        console.log(err);
        done();
      });

    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  });
  });


  describe("GET /getRecentContact/:id", () => {

// #1
  it("should get the most recent contact for a patient", (done) => {

    Contact.create({
      patientId: patient.id,
      email: "hello@gmail.com",
      homephone: null,
      cellphone: null,
      street1: "1001 State St",
      street2: "Carpinteria",
      state: "CA",
      zip: "933333"
    })
    .then((contact0) =>{

      Contact.create({
        patientId: patient.id,
        email: "hello@gmail.com",
        homephone: null,
        cellphone: null,
        street1: "1001 State St Unit A",
        street2: "Carpinteria",
        state: "CA",
        zip: "933333"
      })
      .then((contact1) =>{
        const options = {
          url: base + '/getRecentContact/' + patient.id
        }

        request.get(options,
          (err, res, body) => {
            //console.log(body);
            expect(body).toContain("1001 State St Unit A");
            done();
        );

      })
      .catch((err) => {
        console.log(err);
        done();
      });

    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });
});





});
