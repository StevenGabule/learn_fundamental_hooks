import Product from "./Product";
import { useState, useEffect } from "react";

function generateVoteCount() {
  return Math.floor(Math.random() * 50 + 15);
}

const PRODUCTS = [
  {
    id: 1,
    title: "Yellow Pail",
    description: "On-demand sand castle construction expertise.",
    url: "#",
    votes: generateVoteCount(),
    submitterAvatarUrl: "images/avatars/daniel.jpg",
    productImageUrl: "images/products/image-aqua.png",
  },
  {
    id: 2,
    title: "Supermajority: The Fantasy Congress League",
    description: "Earn points when your favorite politicians pass legislation.",
    url: "#",
    votes: generateVoteCount(),
    submitterAvatarUrl: "images/avatars/kristy.png",
    productImageUrl: "images/products/image-rose.png",
  },
  {
    id: 3,
    title: "Tinfoild: Tailored tinfoil hats",
    description: "We already have your measurements and shipping address.",
    url: "#",
    votes: generateVoteCount(),
    submitterAvatarUrl: "images/avatars/veronika.jpg",
    productImageUrl: "images/products/image-steel.png",
  },
  {
    id: 4,
    title: "Haught or Naught",
    description: "High-minded or absent-minded? You decide.",
    url: "#",
    votes: generateVoteCount(),
    submitterAvatarUrl: "images/avatars/molly.png",
    productImageUrl: "images/products/image-yellow.png",
  },
];

function ProductList() {
  const [items, setItems] = useState(PRODUCTS);

  function handleProductUpVote(productId) {
    const newProducts = items.map((item) => {
      if (item.id === productId) {
        return Object.assign({}, item, {
          votes: item.votes + 1,
        });
      }
      return item;
    });
    setItems(newProducts);
  }

  return (
    <div className="ui unstackable items">
      {items
        .sort((a, b) => b.votes - a.votes)
        .map((item) => (
          <Product key={item.id} {...item} onVote={handleProductUpVote} />
        ))}
    </div>
  );
}

export default ProductList;
