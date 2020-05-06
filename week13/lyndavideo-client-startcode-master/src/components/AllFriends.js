import React from "react";
import { useQuery } from "@apollo/react-hooks"
import { gql } from "apollo-boost"

const ALL_FRIENDS = gql`
{
  allFriends{
    id
    firstName
    lastName
    language
    gender
    age
    email
  }
}
`

export default function All() {
  return <h2>Fetch and show all friends here</h2>
}