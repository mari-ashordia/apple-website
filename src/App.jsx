import Header from "./components/Header"
import Hero from "./components/Hero"
import Highlights from "./components/Highlights"
import { Explore } from "./components/Explore"
import {Model} from "./components/Model"
import { Chip } from "./components/Chip"
import Footer from "./components/footer"

const App = () => {


  return (
    <main className = "bg-black text-white">
      <Header/>
      <Hero />
      <Highlights />
      <Model />
      <Explore />
      <Chip />
      <Footer />
    </main>
  )
}

export default App
