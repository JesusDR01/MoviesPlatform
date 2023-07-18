import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { MovieList } from 'components/templates'

import type { NextPage } from 'next'

const MovieListPage: NextPage = () => {
  return <MovieList />
}

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    revalidate: 10,
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

export default MovieListPage
