import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const AllEvents = ({ data }: any) => {
  return (
    <div className="events_page">
      {data?.map((ev: any) => (
        <Link className="card" key={ev.id} href={`/event/${ev.id}`} passHref>
          <Image src={ev.image} alt={ev.title} width={500} height={500} /> <h2>{ev.title} </h2>
        </Link>
      ))}
    </div>
  )
}

export default AllEvents
