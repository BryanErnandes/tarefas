const { sequelize, Tarefa } = require("./models");

describe("Tarefas", () => {
  /**
   * Tarefa
   *
   * titulo
   * Descrição
   * Data
   * concluido: sim ou não
   *
   * Apenas o titulo é obrigatorio
   */

  beforeAll(async () => {
    await sequelize.sync({ logging: false });
  });

  beforeEach(async () => {
    await Tarefa.truncate();
  });

  test("Tarefa inserir", async () => {
    await expect(
      Tarefa.create({
        titulo: "Geografia",
        descricao: "Mapa do mundo",
        concluida: false,
        data: "01/07/22",
      })
    ).resolves.toBeDefined();

    await expect(
      Tarefa.findOne({
        where: {
          titulo: "Geografia",
        },
      })
    ).resolves.not.toBeNull();

    await expect(
      Tarefa.create({
        titulo: "Geografia 2",
      })
    ).resolves.toBeDefined();
  });

  test("Tarefa sem título", async () => {
    await expect(
      Tarefa.create({
        titulo: "",
      })
    ).rejects.toThrow();

    await expect(
      Tarefa.create({
        titulo: " ",
      })
    ).rejects.toThrow();

    await expect(
      Tarefa.create({
        concluida: false,
        data: "01/07/22",
      })
    ).rejects.toThrow();

    await expect(Tarefa.create({})).rejects.toThrow();
  });

  test("Marcar como concluida", async () => {
    const tarefa = await Tarefa.create({
      titulo: "Geografia",
      descricao: "Mapa do mundo",
    });

    const tarefaDb = await Tarefa.findOne({
      where: {
        titulo: "Geografia",
      },
    });

    tarefaDb.concluida = true;
    await expect(tarefaDb.save()).resolves.not.toBeNull();

    await tarefaDb.reload();

    expect(tarefaDb.concluida).toBeTruthy();
  });
});
