// ignition/modules/Blog.js
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("BlogModule", (m) => {
  const blog = m.contract("Blog");
  return { blog };
});
