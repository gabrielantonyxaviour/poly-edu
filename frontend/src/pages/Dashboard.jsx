import React, { Fragment, useState } from "react";
import { Button, Hero, Typography, Input, Avatar, Tag, Table } from "web3uikit";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
function Dashboard() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);

  const SEARCH_QUERY = ``;

  const FETCH_QUERY = `
  query {
    courses {
      id
      creator
      course_meta
      certificate_meta
    }
  }
  `;
  const client = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/gabrielantonyxaviour/polyedu-mumbai-test",
    cache: new InMemoryCache(),
  });
  client
    .query({
      query: gql(FETCH_QUERY),
    })
    .then((data) => console.log("Subgraph data: ", data))
    .catch((err) => {
      console.log("Error fetching data: ", err);
    });
  function goToCourse(projectId) {
    console.log(projectId);
    // go to coursePage of the projectId
  }

  const testDataFromGraph = [
    {
      name: "Gabriel",
      metaUri: "https://dadfnajkfnaeje.com",
      projectId: 65456,
      creator: "0x38953215423513535135",
      isCourse: false,
      price: 314,
      purchases: [],
    },
    {
      name: "Gabriel",
      metaUri: "https://dadfnajkfnaeje.com",
      projectId: 65456,
      creator: "0x38953215423513535135",
      isCourse: false,
      price: 314,
      purchases: [],
    },
    {
      name: "Gabriel",
      metaUri: "https://dadfnajkfnaeje.com",
      projectId: 65456,
      creator: "0x38953215423513535135",
      isCourse: false,
      price: 314,
      purchases: [],
    },
    {
      name: "Gabriel",
      metaUri: "https://dadfnajkfnaeje.com",
      projectId: 65456,
      creator: "0x38953215423513535135",
      isCourse: false,
      price: 314,
      purchases: [],
    },
    {
      name: "Gabriel",
      metaUri: "https://dadfnajkfnaeje.com",
      projectId: 65456,
      creator: "0x38953215423513535135",
      isCourse: false,
      price: 314,
      purchases: [],
    },
  ];
  const tableEntries = testDataFromGraph.map((data) => [
    <Avatar fontSize={36} isRounded theme="image" image={data.metaUri} />,
    <a onClick={(index) => goToCourse(index)}>
      <Tag color="green" text={data.name} />
    </a>,
    data.creator,
    data.price,
  ]);

  const tableEntryTemplate = [
    <Avatar
      fontSize={36}
      isRounded
      theme="image"
      image="https://www.mintface.xyz/content/images/2021/08/QmTndiF423kjdXsNzsip1QQkBQqDuzDhJnGuJAXtv4XXiZ-1.png"
    />,
    <a onClick={goToCourse}>
      <Tag color="green" text="Nft Collection" />
    </a>,
    "Course Description",
    "Price",
  ];

  async function fetchCourses() {}
  return (
    <div className="container vh-100">
      {/* <h1 className="">Dashboard</h1> */}
      <Hero
        align="right"
        backgroundURL="https://media.istockphoto.com/id/1328368631/photo/ready-for-school-concept-background-with-books-alarm-clock-and-accessory.jpg?b=1&s=170667a&w=0&k=20&c=I1oVAJ9aPkEBHtPEa5GAMvjD_rpzZiaMezHR0peDzfw="
        rounded="20px"
      >
        <Fragment key=".0">
          <Typography className="m-2" variant="h2" color="white" weight="bold">
            Proof of Education
          </Typography>
          <Typography
            className="m-2"
            variant="h4"
            color="white"
            weight="regular"
          >
            Own what you learn.
          </Typography>
          <a href="#courses">
            <Button
              className="m-2"
              text="Get Started"
              icon="arrowCircleRight"
              theme="coloured"
              color="green"
            />
          </a>
        </Fragment>
      </Hero>
      <section id="courses" className="">
        <div className="d-flex align-items-center justify-content-between">
          {" "}
          <h1 className="p-4">Latest courses</h1>
          <div className="d-flex">
            <Input
              label="Search Courses"
              name="search"
              prefixIcon="search"
              onBlur={function noRefCheck() {}}
              onChange={function noRefCheck(e) {
                setSearch(e.target.value);
              }}
            />
            <Button text="Go" onClick={fetchCourses}></Button>
          </div>
        </div>
        <Table
          columnsConfig="80px 3fr 4fr 1fr 80px"
          data={tableEntries}
          header={[
            "",
            <span>Name</span>,
            <span>Creator</span>,
            <span>Price in MATIC</span>,
            "",
          ]}
          onPageNumberChanged={function noRefCheck() {}}
          pageSize={5}
        />
      </section>
    </div>
  );
}
export default Dashboard;
