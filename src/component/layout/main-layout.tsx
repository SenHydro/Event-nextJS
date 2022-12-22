import { Footer } from '../footer/footer'
import { Header } from '../header/header'

const Mainlayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default Mainlayout
