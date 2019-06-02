const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000";
const sequelize = require("../../src/db/models/index").sequelize;
const Patient = require("../../src/db/models").Patient;

describe("routes : patients", () => {

  beforeEach((done) => {
    this.patient;
    sequelize.sync({force: true}).then((res) => {

     Patient.create({
       firstname: "Erin",
       lastname: "Clayton",
       dob: '1992-11-01',
       icon: "/images/avatars/avatar_1.png",
       gender: "female",
       query: "ErinClayton"
     })
      .then((patient) => {
        this.patient = patient;
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });

    });

  });


  describe("GET /getPatients/0/10", () => {

    it("should return a status code 200", (done) => {
        request.get(base+'/getPatients/0/10', (err, res, body) => {

         expect(err).toBeNull();
         //console.log(body);
         expect(body).toContain("Erin");
         expect(body).toContain("Clayton");
         expect(body).toContain("female");
         expect(res.statusCode).toBe(200);
         // expect(body).toContain("JS Frameworks");
         done();
       });
     });
  });

  describe("GET /getPatients/:query", () => {

    it("should return the patient", (done) => {
        request.get(base+'/getPatients/layton', (err, res, body) => {
          //console.log(base+'/getPatients/ErinClayton');
         expect(err).toBeNull();
         //console.log(body);
         expect(body).toContain("Erin");
         expect(body).toContain("Clayton");
         expect(body).toContain("female");
         expect(res.statusCode).toBe(200);
         // expect(body).toContain("JS Frameworks");
         done();
       });
     });


     it("should return nothing", (done) => {
         request.get(base+'/getPatients/eeee', (err, res, body) => {
           //console.log(base+'/getPatients/ErinClayton');
          expect(err).toBeNull();
          //console.log(body);
          expect(body).toContain("[]");
          expect(res.statusCode).toBe(200);
          // expect(body).toContain("JS Frameworks");
          done();
        });
      });
  });

});
