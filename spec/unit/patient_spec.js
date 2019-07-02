const sequelize = require("../../src/db/models/index").sequelize;
const Patient = require("../../src/db/models").Patient;

describe("Patient", () => {

  beforeEach((done) => {
// #1
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {

// #2
    it("should create a Patient object with no middlename ", (done) => {
      Patient.create({
        firstname: "Test",
        middlename: null,
        lastname: "Test",
        dob: "2019-01-01",
        icon: '/images/avatars/avatar_1.png',
        gender: "Female",
        query: ""
      })
      .then((user) => {
        expect(user.firstname).toBe("Test");
        expect(user.middlename).toBeNull();
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

// #3
    it("should not create a patient without a firstname", (done) => {
      Patient.create({
        firstname: null,
        middlename: null,
        lastname: "Test",
        dob: "2019-01-01",
        icon: '/images/avatars/avatar_1.png',
        gender: "Female",
        query: ""
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error");
        done();
      });

    });


  });

});
