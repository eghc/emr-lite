const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:5000";
const Vital = require("../../src/db/models").Vital;
const Patient = require("../../src/db/models").Patient;
const sequelize = require("../../src/db/models/index").sequelize;

describe("routes : vitals", () => {

  let patient = null;
  beforeEach((done) => {

    Vital.sync({
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

  describe("POST /updateVital/:id", () => {

// #1
  it("should create a new contact", (done) => {

    const options = {
      url: base + '/updateVital/' + patient.id,
      form: {
        patientId: patient.id,
        height: "160",
        weight: "140",
        bodytemp: null,
        heartrate: "45",
        blood: "120/90",
        resprate: "20"
      }
    }

    request.post(options,
      (err, res, body) => {
        //console.log(body);

        Vital.findOne({where: {patientId: patient.id}})
        .then((vital) => {
          expect(vital.bodytemp).toBeNull();
          expect(vital.blood).toBe("120/90");
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

  describe("GET /getVitals/:id", () => {

// #1
  it("should get history of vital for patients", (done) => {

    Vital.create({
      patientId: patient.id,
      height: 160,
      weight: 140,
      bodytemp: null,
      heartrate: 45,
      blood: "120/90",
      resprate: 20
    })
    .then((vital0) =>{

      Vital.create({
        patientId: patient.id,
        height: 160,
        weight: 150,
        bodytemp: null,
        heartrate: 45,
        blood: "120/90",
        resprate: 20
      })
      .then((vital1) =>{
        const options = {
          url: base + '/getVitals/' + patient.id
        }

        request.get(options,
          (err, res, body) => {
            //console.log(body);
            expect(body).toEqual([
              {
                patientId: patient.id,
                height: 160,
                weight: 150,
                bodytemp: null,
                heartrate: 45,
                blood: "120/90",
                resprate: 20
              },
              {
                patientId: patient.id,
                height: 160,
                weight: 140,
                bodytemp: null,
                heartrate: 45,
                blood: "120/90",
                resprate: 20
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


  describe("GET /getRecentVital/:id", () => {

// #1
  it("should get the most recent vital for a patient", (done) => {

        Vital.create({
          patientId: patient.id,
          height: 160,
          weight: 140,
          bodytemp: null,
          heartrate: 45,
          blood: "120/90",
          resprate: 20
        })
        .then((vital0) =>{

          Vital.create({
            patientId: patient.id,
            height: 160,
            weight: 150,
            bodytemp: null,
            heartrate: 45,
            blood: "120/90",
            resprate: 20
          })
          .then((vital1) =>{
            const options = {
              url: base + '/getRecentVital/' + patient.id
            }

            request.get(options,
              (err, res, body) => {
                //console.log(body);
                expect(body.weight).toEqual(150);
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





});
