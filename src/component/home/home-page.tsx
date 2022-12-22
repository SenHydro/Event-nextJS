import Image from 'next/image'
import Link from 'next/link'

export const HomePage = ({ data }: any) => {
  return (
    <div className="home-body">
      {data.map((event: any) => (
        <Link className="card" key={event.id} href={`/event/${event.id}`} passHref>
          <div className="image">
            <Image alt={event.title} src={event.image} width={400} height={300} />
          </div>
          <div className="content">
            <h2>{event.title}</h2>
            <p>{event.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
