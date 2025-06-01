import { useEffect, useState } from "react";
import { ethers } from "ethers";
import BlogAbi from "./contracts/Blog.json";

const CONTRACT_ADDRESS = "0x282800f5480b79bF74f9bEc9aE8916e9DC782017";

export default function BlogApp() {
  const [contract, setContract] = useState(null);
  const [posts, setPosts] = useState([]);
  const [account, setAccount] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const blog = new ethers.Contract(CONTRACT_ADDRESS, BlogAbi.abi, signer);

    setAccount(address);
    setContract(blog);

    const count = await blog.postCount();
    const fetchedPosts = [];
    for (let i = 1; i <= count; i++) {
      const post = await blog.getPost(i);
      fetchedPosts.push(post);
    }

    setPosts(fetchedPosts.reverse());
  }

  function disconnectWallet() {
    setAccount("");
    setContract(null);
    setPosts([]);
    setTitle("");
    setContent("");
  }

  async function createPost(e) {
    e.preventDefault();
    if (!title || !content) return;

    const tx = await contract.createPost(title, content);
    await tx.wait();
    window.location.reload(); 
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 DeBlog</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Connect Wallet
        </button>
      ) : (
        <p className="text-sm text-gray-600">Connected as: {account}</p>
      )}

      {account && (
        <form onSubmit={createPost} className="mb-6">
          <input
            className="w-full p-2 border mb-2"
            placeholder="Post title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className="w-full p-2 border mb-2"
            placeholder="Post content"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <div className="flex flex-row justify-center gap-5">
            <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
              Publish
            </button>
            <button
              onClick={disconnectWallet}
              className="bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Disconnect
            </button>
          </div>
        </form>
      )}

      <div>
        {posts.map((post) => (
          <div key={post.id} className="border p-3 mb-4 rounded shadow">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">By: {post.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
