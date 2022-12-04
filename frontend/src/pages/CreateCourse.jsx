// Fetch from graphql show both created and available to create courses with a division

import React, { useState } from "react";
import { Table, Avatar, Tag } from "web3uikit";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

function CreateCourse() {
  const [listing, setListing] = useState({});
  const [valistProjects, setValistProjects] = useState([]);
  const [createdCourses, setCreatedCourses] = useState([]);

  const VALIST_PROJECTS_QUERY = `query{
      accounts(where:{members_:{id:"0x3000405c82a723773b2c97525dc2cdb8402532cc"}})
      {
        projects{
          id
          name
        }
      }
  }`;
  const CREATED_COURSES_QUERY = `query{
    courses(where:{creator:"0x3000405c82a723773b2c97525dC2cdB8402532Cc"}) {
      id
      creator
      course_meta
      certificate_meta
    }
  }`;
  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/valist-io/valistmumbai",
    cache: new InMemoryCache(),
  });
  client
    .query({
      query: gql(VALIST_PROJECTS_QUERY),
    })
    .then(({ data }) => {
      setValistProjects(data.accounts[0].projects);
      console.log("Valist projects: ", valistProjects);
    })
    .catch((err) => {
      console.log("Error fetching data: ", err);
    });

  const client2 = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/gabrielantonyxaviour/polyedu-mumbai-test",
    cache: new InMemoryCache(),
  });
  client2
    .query({
      query: gql(CREATED_COURSES_QUERY),
    })
    .then(({ data }) => {
      setCreatedCourses(data.courses);
      console.log("Created Courses: ", createdCourses);
    })
    .catch((err) => {
      console.log("Error fetching data: ", err);
    });

  return (
    <div className="">
      <h1 className="d-flex align-items-center justify-content m-4">
        Your Valist Projects
      </h1>
      <Table
        columnsConfig="80px 3fr 2fr 2fr 80px"
        data={[
          [
            <Avatar isRounded size={36} theme="image" />,
            "Moralis Magi",
            <Tag color="blue" text="Nft Collection" />,
            "0x18...130e",
          ],

          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "My Cool Nft",
            <Tag color="red" text="Lazy Nft" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Magi Cool Topen",
            <Tag color="yellow" text="Pack" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "My Marketplace",
            <Tag color="red" text="Nft Marketplace" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Owl Magi",
            <Tag color="purple" text="Bundle" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Owl Nft",
            <Tag color="green" text="Token" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Ape Yacht",
            <Tag color="blue" text="Nft Collection" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Charzard",
            <Tag color="red" text="Bundle" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Magi",
            <Tag color="green" text="Token" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Moralis Magi",
            <Tag color="blue" text="Nft Collection" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "My Cool Nft",
            <Tag color="red" text="Lazy Nft" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Magi Cool Topen",
            <Tag color="yellow" text="Pack" />,
            "0x18...130e",
          ],
        ]}
        header={[
          "",
          <span>Name</span>,
          <span>Type</span>,
          <span>Module</span>,
          "",
        ]}
        isColumnSortable={[false, true, false, false]}
        maxPages={3}
        onPageNumberChanged={function noRefCheck() {}}
        onRowClick={function noRefCheck() {}}
        pageSize={5}
      />
      <h1 className="d-flex align-items-center justify-content m-4">
        Courses Created
      </h1>
      <Table
        columnsConfig="80px 3fr 2fr 2fr 80px"
        data={[
          [
            <Avatar isRounded size={36} theme="image" />,
            "Moralis Magi",
            <Tag color="blue" text="Nft Collection" />,
            "0x18...130e",
          ],

          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "My Cool Nft",
            <Tag color="red" text="Lazy Nft" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Magi Cool Topen",
            <Tag color="yellow" text="Pack" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "My Marketplace",
            <Tag color="red" text="Nft Marketplace" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Owl Magi",
            <Tag color="purple" text="Bundle" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Owl Nft",
            <Tag color="green" text="Token" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Ape Yacht",
            <Tag color="blue" text="Nft Collection" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Charzard",
            <Tag color="red" text="Bundle" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Magi",
            <Tag color="green" text="Token" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Moralis Magi",
            <Tag color="blue" text="Nft Collection" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "My Cool Nft",
            <Tag color="red" text="Lazy Nft" />,
            "0x18...130e",
          ],
          [
            <Avatar fontSize={36} isRounded theme="image" />,
            "Magi Cool Topen",
            <Tag color="yellow" text="Pack" />,
            "0x18...130e",
          ],
        ]}
        header={[
          "",
          <span>Name</span>,
          <span>Type</span>,
          <span>Module</span>,
          "",
        ]}
        isColumnSortable={[false, true, false, false]}
        maxPages={3}
        onPageNumberChanged={function noRefCheck() {}}
        onRowClick={function noRefCheck() {}}
        pageSize={5}
      />
      <input
        type="file"
        className="ml-0 mt-1 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        name="image-url"
        id="image-url"
        onChange={(e) => {
          let file = e.target.files[0];
          setListing({
            ...listing,
            image: file,
          });
        }}
        autoComplete="family-name"
        // className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
      />
    </div>
  );
}
export default CreateCourse;
