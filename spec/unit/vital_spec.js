const sequelize = require("../../src/db/models/index").sequelize;
const Patient = require("../../src/db/models").Patient;
const Vital = require("../../src/db/models").Vital;

describe("Vital", () => {

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
    it("should create a Vital object", (done) => {
      Vital.create({
        patientId: patient.id,
        height: 170,
        weight: 135,
        bodytemp: 98,
        heartrate: 78,
        blood: "120/90",
        resprate: 20
      })
      .then((vital) => {
        expect(vital.height).toEqual(170);
        expect(vital.blood).toBe("120/90");
        expect(vital.patientId).toBe(patient.id);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should create a Vital object with some null values", (done) => {
      Vital.create({
        patientId: patient.id,
        height: null,
        weight: 135,
        bodytemp: 98,
        heartrate: null,
        blood: "120/90",
        resprate: 20
      })
      .then((vital) => {
        expect(vital.height).toBeNull();
        expect(vital.heartrate).toBeNull();
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a Vital object w/o a patientId", (done) => {
      Vital.create({
        patientId: null,
        height: null,
        weight: 135,
        bodytemp: 98,
        heartrate: null,
        blood: "120/90",
        resprate: 20
      })
      .then((vital) => {
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });



  });

});
