interface PrizeCardProps {
    image: string;
    name: string;
    points: number;
  }
  
  export default function PrizeCard({ image, name, points }: PrizeCardProps) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <img src={image} alt={name} className="w-full h-40 object-cover rounded-md"/>
        <h2 className="text-lg font-semibold mt-2">{name}</h2>
        <p className="text-green-700 font-bold mt-1">{points} Feathers 🪶</p>
        <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
          Redeem
        </button>
      </div>
    );
  }
  