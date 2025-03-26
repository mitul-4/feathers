import { SearchBox } from "@/components/search-box";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center grow w-full">
      <div className="fixed inset-0 bg-cover bg-center z-[-2]">
        <Image
          src="/background.jpg"
          height={400}
          width={800}
          alt="background"
          style={{ width: '100%', height: 'auto' }}
        />
      </div>
      <div className="fixed inset-0 bg-black opacity-75 z-[-1]"></div>
      <SearchBox />
    </div>
  )
};