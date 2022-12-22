import AllEvents from '../../src/component/event/events-page'

const EventsPage = ({ data }: any) => {
  return <AllEvents data={data} />
}

export default EventsPage

export async function getStaticProps() {
  const { events_categories } = await import('../../data/data.json')
  // console.log(events_categories)
  return {
    props: {
      data: events_categories,
    },
  }
}
