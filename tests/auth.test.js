
const request = require("supertest");
const app = require("../app");

describe("Pruebas de autenticación", () => {

  test("La API debe responder correctamente", async () => {
    const respuesta = await request(app).get("/api");

    expect(respuesta.statusCode).toBe(200);
    expect(respuesta.body.estado).toBe("OK");
  });

  test("Debe rechazar el acceso al perfil sin token", async () => {
    const respuesta = await request(app)
      .get("/api/auth/perfil");

    expect(respuesta.statusCode).toBe(401);
  });

  test("Debe rechazar rutas inexistentes", async () => {
    const respuesta = await request(app)
      .get("/api/ruta-inexistente");

    expect(respuesta.statusCode).toBe(404);
  });

});
