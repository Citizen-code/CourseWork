import Header from '@/components/home/header'
import Footer from '@/components/home/footer'
import Carousel from '@/components/home/carousel'
import About from '@/components/home/about'
import Services from '@/components/home/services'
import Gallery from '@/components/home/gallery'
import Feedback from '@/components/home/feedback'

export default function Home() {
  return (
    <div>
      <Header/>
      <Carousel/>
      <div id='Services'>
        <Services/>
      </div>
      <div id='About'>
        <About/>
      </div>
      <div id='Gallery'>
        <Gallery/>
      </div>
      <div id='Feedback'>
        <Feedback/>
      </div>
      <Footer/>
    </div>
  )
}
