import CatEvent from '../../../src/component/event/catEvent'

const EventsCatPage = ({ data, pageName }: any) => <CatEvent data={data} pageName={pageName} />

export default EventsCatPage

export async function getStaticPaths() {
  const { events_categories } = await import('../../../data/data.json')
  const Allpath = events_categories.map((event) => {
    return {
      params: {
        category: event.id.toString(),
      },
    }
  })
  // console.log(Allpath)

  return {
    paths: Allpath,
    fallback: false, // show 404 if not right paths
  }
}

export async function getStaticProps(context: any) {
  // console.log(context)
  const id = context?.params.category
  // console.log(id)
  const { allEvents } = await import('../../../data/data.json')
  const data = allEvents.filter((ev) => ev.city === id)
  // console.log(data)
  return { props: { data, pageName: id } }
}
