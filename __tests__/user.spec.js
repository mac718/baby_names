const server = require("../server");
const request = require("supertest");
const User = require("../models/user");
const usersController = require("../controllers/users");
const asyncWrapper = require("../middleware/async");

afterEach(async () => {
  await User.deleteMany({});
});

describe("users controller", () => {
  describe("createUser", () => {
    it("should return 200 status code on valid request", (done) => {
      const user = {
        firstName: "first",
        lastName: "last",
        email: "first@foo.com",
        password: "password",
      };

      request(server)
        .post("/api/v1/users/register")
        .send(user)
        .then((response) => {
          expect(response.status).toBe(200);
          done();
        });
    });

    it("should add a user to the db on a successful request", (done) => {
      const user = {
        firstName: "first",
        lastName: "last",
        email: "first@foo.com",
        password: "password",
      };

      request(server)
        .post("/api/v1/users/register")
        .send(user)
        .then(async (response) => {
          expect(response.status).toBe(200);
          let userList = await User.find({});
          expect(userList.length).toBe(1);
          done();
        });
    });

    it("should add a user to the db on a successful request", (done) => {
      const user = {
        firstName: "first",
        lastName: "last",
        email: "first@foo.com",
        password: "password",
      };

      request(server)
        .post("/api/v1/users/register")
        .send(user)
        .then(async (response) => {
          expect(response.status).toBe(200);
          let user = await User.find({ email: "first@foo.com" });
          expect(user[0].email).toBe("first@foo.com");
          done();
        });
    });
  });

  describe("getUser", () => {
    // it("returns error", (done) => {
    //   const spy = jest.spyOn(User, "findOne").mockReturnValue(Promise.reject());
    //   const req = {
    //     body: { _id: "5c0f66b979af55031b34728a" },
    //   };
    //   usersController
    //     .getUser(req, {}, () => {})
    //     .then(() => {
    //       expect(spy).toHaveBeenCalled();
    //       done();
    //     });
    // });
  });

  // it("should return throw an error if accessing the db fails", (done) => {
  //   //const save = jest.fn();
  //   let user = {
  //     firstName: "",
  //     lastName: "last",
  //     email: "first@foo.com",
  //     password: "password",
  //   };

  //   let req = {
  //     body: user,
  //   };

  //   console.log("save", User.prototype.save);

  //   jest.spyOn(User.prototype, "save");

  //   asyncWrapper(
  //     usersController
  //       .createUser(req, {}, () => {})
  //       .then((res) => {
  //         console.log(res);
  //         expect(res).toBe(undefined);
  //         done();
  //       })
  //   );
  // });
});
