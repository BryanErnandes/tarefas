const request = require("supertest");
const app = require("./app");
const { sequelize, Tarefa } = require("./models");

describe("Rota Tarefas", () => {
  beforeAll(async () => {
    await sequelize.sync();

    await Tarefa.create({
      titulo: "Geografia",
      descricao: "coisas",
      data: "01/07/22",
      concluido: false,
    });
  });
  test("get /", (done) => {
    request(app).get("/tarefas").set("Accetp", "appication/json")
      .expect("Content-type", /json/)
      .expect(200, done);
  });

  test("Post /", (done) => {
    request(app)
      .post("/tarefas")
      .send({
        titulo: "Geografia",
        descricao: "coisas",
        data: "01/07/22",
        concluido: false,
      })
      .set("accept", "application/json")
      .expect("content-Type", /json/)
      .expect(200, done);
  });
  });