const sequelize = require("../../src/db/models/index").sequelize;
const Patient = require("../../src/db/models").Patient;
const Contact = require("../../src/db/models").Contact;

describe("Contact", () => {

  beforeEach((done) => {
// #1
    let patient = null;
    sequelize.sync({force: true})
    .then(() => {
      Patient.create({
        firstname: "Test",
        middlename: null,
        lastname: "Test",
        dob: "2019-01-01",
        icon: '/images/avatars/avatar_1.png',
        gender: "Female",
        query: ""
      })
      .then((p) => {
        patient = p;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {

// #2
    it("should create a Contact object", (done) => {
      Contact.create({
        patientId: patient.id,
        email: "erin@wellapp.com",
        homephone: "8058958558",
        cellphone: null,
        street1: '',
        street2: '',
        state: 'Alabama',
        zip: '90011'
      })
      .then((contact) => {
        expect(contact.email).toBe("erin@wellapp.com");
        expect(contact.cellphone).toBeNull();
        expect(contact.id).toBe(1);
        expect(contact.patientId).toBe(patient.id);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a Contact object w/o a patientId", (done) => {
      Contact.create({
        patientId: null,
        email: "erin@wellapp.com",
        homephone: "8058958558",
        cellphone: null,
        street1: '',
        street2: '',
        state: 'Alabama',
        zip: '90011'
      })
      .then((contact) => {
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });



  });

});
