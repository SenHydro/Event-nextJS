import SingleEvent from '../../../src/component/event/single-event'

const EventPage = ({ data }: any) => {
  // console.log(data)
  return <SingleEvent data={data} />
}

export default EventPage

export async function getStaticPaths() {
  const data = await import('../../../data/data.json')
  const allEvents = data.allEvents
  const allPaths = allEvents.map((path) => {
    return {
      params: {
        category: path.city,
        id: path.id,
      },
    }
  })
  return {
    paths: allPaths,
    fallback: false,
  }
}

export async function getStaticProps(context: any) {
  // console.log(context)
  const id = context.params.id
  const { allEvents } = await import('../../../data/data.json')
  const eventData = allEvents.find((ev) => ev.id === id)
  return {
    props: { data: eventData },
  }
}
