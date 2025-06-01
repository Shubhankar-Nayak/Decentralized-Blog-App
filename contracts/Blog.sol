// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract Blog {
    struct Post {
        uint256 id;
        address author;
        string title;
        string content;
        uint256 timestamp;
    }

    uint256 public postCount = 0;
    mapping(uint256 => Post) public posts;

    event postCreated(uint256 id, address indexed author, string title, uint256 timestamp);
    event postUpdated(uint256 id, string newContent, string newTitle, uint256 timestamp);

    function createPost(string memory _title, string memory _content) public {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(bytes(_content).length > 0, "Content cannot be empty");

        postCount++;
        posts[postCount] = Post(postCount, msg.sender, _title, _content, block.timestamp);
        emit postCreated(postCount, msg.sender, _title, block.timestamp);
    }

    function updatePost(uint256 _id, string memory _newTitle, string memory _newContent) public {
        Post storage post = posts[_id];
        require(post.author == msg.sender, "You are not the author");
        require(bytes(_newTitle).length > 0, "Title cannot be empty");
        require(bytes(_newContent).length > 0, "Content cannot be empty");

        post.title = _newTitle;
        post.content = _newContent;
        post.timestamp = block.timestamp;

        emit postUpdated(_id, _newContent, _newTitle, block.timestamp);
    }

    function getPost(uint256 _id) public view returns(Post memory) {
        return posts[_id];
    }
}
