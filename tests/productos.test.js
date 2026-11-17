
const request = require("supertest");
const app = require("../app");

describe("Pruebas de productos", () => {

  test("Debe rechazar consulta sin token", async () => {
    const respuesta = await request(app)
      .get("/api/productos");

    expect(respuesta.statusCode).toBe(401);
  });

  test("Debe rechazar creación sin token", async () => {
    const respuesta = await request(app)
      .post("/api/productos")
      .send({
        nombre: "Laptop de prueba",
        descripcion: "Producto para pruebas",
        precio: 15000,
        stock: 10,
        categoria: "Computadoras"
      });

    expect(respuesta.statusCode).toBe(401);
  });

  test("Debe rechazar eliminación sin token", async () => {
    const respuesta = await request(app)
      .delete("/api/productos/507f1f77bcf86cd799439011");

    expect(respuesta.statusCode).toBe(401);
  });

});
