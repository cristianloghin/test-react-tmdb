import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchResults, Result, SearchResults } from '@/client/api';

function formatData(base_url: string, pages: SearchResults[]) {
  return pages.reduce(
    (acc: Result[], curr) =>
      acc.concat(
        curr.results
          .filter((m) => m.poster_path)
          .map((m) => ({
            ...m,
            poster_path: `${base_url}w185${m.poster_path}`,
          }))
      ),
    []
  );
}

export const useSearch = (image_base_url: string | undefined) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      ['search', ...searchValue.toLowerCase().split(' ')],
      ({ pageParam = 1 }) => fetchResults(encodeURI(searchValue), pageParam),
      {
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.total_pages == pages.length) {
            return undefined;
          }
          return pages.length + 1;
        },
        enabled: !!searchValue && !!image_base_url,
        staleTime: Infinity,
      }
    );

  return {
    data:
      image_base_url && data
        ? formatData(image_base_url, data.pages)
        : undefined,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    search: setSearchValue,
  };
};

/*
import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { ref, inView } = useInView()

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['projects'],
    async ({ pageParam = 0 }) => {
      const res = await axios.get('/api/projects?cursor=' + pageParam)
      return res.data
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
    },
  )

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <div>
      <h1>Infinite Loading</h1>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <div>
            <button
              onClick={() => fetchPreviousPage()}
              disabled={!hasPreviousPage || isFetchingPreviousPage}
            >
              {isFetchingPreviousPage
                ? 'Loading more...'
                : hasPreviousPage
                ? 'Load Older'
                : 'Nothing more to load'}
            </button>
          </div>
          {data.pages.map((page) => (
            <React.Fragment key={page.nextId}>
              {page.data.map((project) => (
                <p
                  style={{
                    border: '1px solid gray',
                    borderRadius: '5px',
                    padding: '10rem 1rem',
                    background: `hsla(${project.id * 30}, 60%, 80%, 1)`,
                  }}
                  key={project.id}
                >
                  {project.name}
                </p>
              ))}
            </React.Fragment>
          ))}
          <div>
            <button
              ref={ref}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {isFetchingNextPage
                ? 'Loading more...'
                : hasNextPage
                ? 'Load Newer'
                : 'Nothing more to load'}
            </button>
          </div>
          <div>
            {isFetching && !isFetchingNextPage
              ? 'Background Updating...'
              : null}
          </div>
        </>
      )}
      <hr />
      <Link href="/about">
        <a>Go to another page</a>
      </Link>
      <ReactQueryDevtools initialIsOpen />
    </div>
  )
}
*/
