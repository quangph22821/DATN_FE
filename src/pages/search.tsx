import React from 'react'
import { useSelector } from 'react-redux'

export const search = () => {
    const searchTerm = useSelector((state) => state.search.searchTerm)

  return (
    <>{searchTerm}</>
  )
}
