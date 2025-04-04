'use client'
import { useState, useEffect } from "react"
import db from '@/utils/firebase'
import { collection, getDocs, writeBatch, doc } from 'firebase/firestore'

interface RewardItem {
  name: string
  price: number
  imageUrl: string
}

interface DisplayItem {
  id: number
  name: string
  price: number
  imageUrl: string
}

const itemsToDisplay: DisplayItem[] = [
  { id: 1, name: "House socks", price: 60, imageUrl: "/sockss.jpg" },
  { id: 2, name: "Griffles Plushie", price: 130, imageUrl: "/background.jpg" },
  { id: 3, name: "Griffles Plushie House Keychain", price: 70, imageUrl: "/background.jpg" },
  { id: 4, name: "Track & Field Singlet", price: 60, imageUrl: "/background.jpg" },
  { id: 5, name: "Shirts ALL", price: 80, imageUrl: "/background.jpg" },
  { id: 6, name: "Iron Press Badges (House)", price: 35, imageUrl: "/background.jpg" },
  { id: 7, name: "Team Raffles Games'22 Pins ", price: 40, imageUrl: "/background.jpg" },
  { id: 8, name: "Stickers (Buckle-Buckley)", price: 20, imageUrl: "/background.jpg" },
  { id: 9, name: "Stickers (Morrison-Richardson)", price: 20, imageUrl: "/background.jpg" },
  { id: 10, name: "Stickers (Dream Light Unite)", price: 10, imageUrl: "/background.jpg" },
  { id: 11, name: "Open House folder ", price: 20, imageUrl: "/background.jpg" },
  { id: 12, name: "Pencil Case (Wonderland)", price: 20, imageUrl: "/background.jpg" },
  { id: 13, name: "Notebook (Open house'23)", price: 30, imageUrl: "/background.jpg" },
  { id: 14, name: "Notebook (Mangata)", price: 30, imageUrl: "/background.jpg" },
  { id: 15, name: "Bookmark (Open House '23)", price: 10, imageUrl: "/background.jpg" },
  { id: 16, name: "Shoebag (Mangata)", price: 30, imageUrl: "/background.jpg" },
  { id: 17, name: "Shoebag (Wonderland)", price: 40, imageUrl: "/background.jpg" },
  { id: 18, name: "Shoebag (Wayfarers)", price: 40, imageUrl: "/background.jpg" },
  { id: 19, name: "Totebag (Open House'23)", price: 80, imageUrl: "/background.jpg" },
  { id: 20, name: "Box Files ALL", price: 40, imageUrl: "/background.jpg" },
  { id: 21, name: "Team Raffles Metal Water Bottle", price: 40, imageUrl: "/background.jpg" },
  { id: 22, name: "Towel (Mangata)", price: 20, imageUrl: "/background.jpg" },
  { id: 23, name: "Collapsible Cups Raffles", price: 30, imageUrl: "/background.jpg" },
  { id: 24, name: "Wristband (Morrison-Richardson)", price: 30, imageUrl: "/background.jpg" },
  { id: 25, name: "Totebag (Buckle-Buckley)", price: 80, imageUrl: "/background.jpg" },
  { id: 26, name: "Tattoo (Wonderland)", price: 10, imageUrl: "/background.jpg" },
  { id: 27, name: "Keychain Open House'22", price: 10, imageUrl: "/background.jpg" },
]

const itemsToStore: RewardItem[] = [
    { id: 1, name: "House socks", price: 60, imageUrl: "/sockss.jpg" },
    { id: 2, name: "Griffles Plushie", price: 130, imageUrl: "/background.jpg" },
    { id: 3, name: "Griffles Plushie House Keychain", price: 70, imageUrl: "/background.jpg" },
    { id: 4, name: "Track & Field Singlet", price: 60, imageUrl: "/background.jpg" },
    { id: 5, name: "Shirts ALL", price: 80, imageUrl: "/background.jpg" },
    { id: 6, name: "Iron Press Badges (House)", price: 35, imageUrl: "/background.jpg" },
    { id: 7, name: "Team Raffles Games'22 Pins ", price: 40, imageUrl: "/background.jpg" },
    { id: 8, name: "Stickers (Buckle-Buckley)", price: 20, imageUrl: "/background.jpg" },
    { id: 9, name: "Stickers (Morrison-Richardson)", price: 20, imageUrl: "/background.jpg" },
    { id: 10, name: "Stickers (Dream Light Unite)", price: 10, imageUrl: "/background.jpg" },
    { id: 11, name: "Open House folder ", price: 20, imageUrl: "/background.jpg" },
    { id: 12, name: "Pencil Case (Wonderland)", price: 20, imageUrl: "/background.jpg" },
    { id: 13, name: "Notebook (Open house'23)", price: 30, imageUrl: "/background.jpg" },
    { id: 14, name: "Notebook (Mangata)", price: 30, imageUrl: "/background.jpg" },
    { id: 15, name: "Bookmark (Open House '23)", price: 10, imageUrl: "/background.jpg" },
    { id: 16, name: "Shoebag (Mangata)", price: 30, imageUrl: "/background.jpg" },
    { id: 17, name: "Shoebag (Wonderland)", price: 40, imageUrl: "/background.jpg" },
    { id: 18, name: "Shoebag (Wayfarers)", price: 40, imageUrl: "/background.jpg" },
    { ame: "Totebag (Open House'23)", price: 80, imageUrl: "/background.jpg" },
    { name: "Box Files ALL", price: 40, imageUrl: "/background.jpg" },
    { name: "Team Raffles Metal Water Bottle", price: 40, imageUrl: "/background.jpg" },
    { name: "Towel (Mangata)", price: 20, imageUrl: "/background.jpg" },
    { name: "Collapsible Cups Raffles", price: 30, imageUrl: "/background.jpg" },
    { name: "Wristband (Morrison-Richardson)", price: 30, imageUrl: "/background.jpg" },
    { name: "Totebag (Buckle-Buckley)", price: 80, imageUrl: "/background.jpg" },
    { name: "Tattoo (Wonderland)", price: 10, imageUrl: "/background.jpg" },
    { name: "Keychain Open House'22", price: 10, imageUrl: "/background.jpg" },
]

export default function RewardsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage: number = 9
  const totalPages: number = Math.ceil(itemsToDisplay.length / itemsPerPage)

  const paginatedItems = itemsToDisplay.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const populateRewards = async () => {
    try {
      const rewardsRef = collection(db, 'rewards')
      const snapshot = await getDocs(rewardsRef)

      // Only populate if collection is empty
      if (snapshot.empty) {
        const batch = writeBatch(db)

        itemsToStore.forEach((item) => {
          const docRef = doc(rewardsRef, item.name)
          batch.set(docRef, {
            name: item.name,
            price: item.price,
            imageUrl: item.imageUrl
          })
        })

        await batch.commit()
        console.log('All rewards have been added successfully!')
      } else {
        console.log('Rewards collection already populated')
      }
    } catch (error) {
      console.error('Error adding rewards:', error)
    }
  }

  // Run populateRewards once on component mount
  useEffect(() => {
    populateRewards()
  }, [])

  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-800 via-black to-green-600 opacity-90">
      <div className="absolute inset-0 bg-black opacity-40"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-6 relative z-10">
        {paginatedItems.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-lg bg-white">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-full h-60 object-cover rounded-lg" 
            />
            <h1 className="text-2xl font-bold mt-4 text-gray-900">{item.name}</h1>
            <p className="text-gray-700">{item.price} feathers</p>
          </div>
        ))}
      </div>

      <div className="pagination flex justify-center gap-4 mt-6 mb-6 relative z-10">
        <button 
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
          disabled={currentPage === 1}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <span className="text-lg text-white">Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
          disabled={currentPage === totalPages}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  )
}