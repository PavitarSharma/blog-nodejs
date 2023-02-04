const request = require("supertest");
const Blog = require("../model/blog.model");
const { createBlog } = require("../controllers/blog.controller");

jest.mock("../model/blog.model", () => ({
  create: jest.fn().mockResolvedValue({}),
}));

describe("Create a blog post", () => {
  it("should create a blog post", async () => {
    const res = await request(createBlog).post("/api/blog").send({
      title: "Test Blog",
      description: "Test Description",
      createdBy: "Test Created by"
    });

    expect(res.statusCode).toEqual(201);
    expect(Blog.create).toHaveBeenCalledWith({
      title: "Test Blog",
      description: "Test Description",
      createdBy: "Test Created by",
      createdOn: "Test Date now"
    });
  });
});
