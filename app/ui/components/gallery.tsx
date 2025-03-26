import PrizeCard from "./prizecard";

const prizes = [
  { image: "/prize1.jpg", name: "Notebook", points: 50 },
  { image: "/prize2.jpg", name: "Gift Card", points: 100 },
  { image: "/prize3.jpg", name: "Wireless Earbuds", points: 250 },
];

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {prizes.map((prize, index) => (
        <PrizeCard key={index} {...prize} />
      ))}
    </div>
  );
}
