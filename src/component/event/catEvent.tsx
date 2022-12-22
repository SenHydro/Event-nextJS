import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const CatEvent = ({ data, pageName }: any) => {
  return (
    <div className="cat_events">
      <h1> Events in {pageName} </h1>

      <div className="content">
        {data.map((ev: any) => (
          <Link className="card" key={ev.id} href={`/event/${ev.city}/${ev.id}`} passHref>
            <Image width={300} height={300} alt={ev.title} src={ev.image} />
            <h2> {ev.title} </h2>
            <p> {ev.description} </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CatEvent
