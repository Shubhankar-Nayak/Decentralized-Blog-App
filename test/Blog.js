const { expect } = require("chai");

describe("Blog Contract", function () {
  let Blog, blog;
  let owner, addr1;

  beforeEach(async function () {
    Blog = await ethers.getContractFactory("Blog");
    [owner, addr1] = await ethers.getSigners();
    blog = await Blog.deploy();
    await blog.deployed();
  });

  it("Should deploy the contract with initial post count = 0", async function () {
    expect(await blog.postCount()).to.equal(0);
  });

  it("Should allow user to create a post", async function () {
    const title = "My First Blog";
    const content = "This is the content of the blog.";

    await blog.createPost(title, content);
    const post = await blog.posts(1);

    expect(post.id).to.equal(1);
    expect(post.title).to.equal(title);
    expect(post.content).to.equal(content);
    expect(post.author).to.equal(owner.address);
    expect(await blog.postCount()).to.equal(1);
  });

  it("Should not allow empty title or content", async function () {
    await expect(blog.createPost("", "Some content")).to.be.revertedWith("Title cannot be empty");
    await expect(blog.createPost("Some title", "")).to.be.revertedWith("Content cannot be empty");
  });

  it("Should allow the author to update a post", async function () {
    await blog.createPost("Original Title", "Original Content");

    await blog.updatePost(1, "Updated Title", "Updated Content");

    const post = await blog.posts(1);
    expect(post.title).to.equal("Updated Title");
    expect(post.content).to.equal("Updated Content");
  });

  it("Should NOT allow non-author to update a post", async function () {
    await blog.createPost("Title", "Content");

    await expect(
      blog.connect(addr1).updatePost(1, "Hack Title", "Hack Content")
    ).to.be.revertedWith("You are not the author");
  });

  it("Should return correct post from getPost()", async function () {
    await blog.createPost("Read Post", "Post content");

    const post = await blog.getPost(1);

    expect(post.id).to.equal(1);
    expect(post.title).to.equal("Read Post");
    expect(post.content).to.equal("Post content");
  });
});
//0x282800f5480b79bF74f9bEc9aE8916e9DC782017