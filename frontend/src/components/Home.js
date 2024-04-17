import { useEffect, useState } from 'react'

const Home = () => {
  const [chats, setChats] = useState("")
  const getAllChats = async () => {
    const response = await fetch("http://localhost:4000/")
    const data = await response.json()
    setChats(data)
  }

  useEffect(() => {
    getAllChats()
  }, [])
  return (
    <div>
      {chats}
    </div>
  )
}

export default Home