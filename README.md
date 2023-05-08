# Jon Graf's Food Truck Permit Lookup System Showcase
Systems architecture includes:
- Java Spring Boot REST APIs
- ReactJS Typescript UI

# What Does This App Do?
- The Open Data Network exposes San Francisco's Food Truck Permits using an interface it calls SODA.
- The data can be queried using "SoQL".
- The user interface exposes this data and allows it to be searched.

# Getting Started
> Note: Ensure you have Docker installed.
1. Run `docker-compose up`

# URLs
| App Layer | Link |
| ------ | ------ |
| Frontend UI | http://localhost:3000 |
| Backend documentation | http://localhost:8080/swagger-ui/index.html |

## Tech Features

- APIs coded using the SODA SoQL REST interface: get all, get one, get by status, search 
- All APIs are paginated except for the search API which SODA offers as a "non-SQL" style feature
- Auto-generated API documentation, human-reading with Swagger
- Auto-generated OpenAPI spec
- Used `swagger-codegen` to generate Typescript interfaces for the API schema
- Dockerfiles for server and client
- Docker Compose orchestration allowing a single command to boot up the entire system (wow!)
- Axios REST API invocation
- Bootstrap UI elements
- Java 19 Records using Jackson auto-conversion from JSON to Java Object

## Features
- Enter whole word search terms in the search bar ("hot dog", "Natan", "pita")
- Erase input in the search bar and Dashboard reappears
- Click Detail to open Modal
- Google Maps link (not embedded, sorry, it ain't free, lolz)
- If latitude/longitude isn't available, the Google Maps link will not appear and a message indicating lack of map data appears instead
- Pagination of dashboard and pending permit results

## Interesting moments during construction
- SODA has a Java SDK but because Oracle decided to move Java EE to the Jakarta open source community, there was a terrible runtime error where `javax.ws.rs.*` classes were getting all mixed up with `jakarta.*` classes.  It seemed like this wasn't fully tested on the SODA end of things.  I ended up just using the SoQL interface directly.
- The Food Truck Permit data is a bit funny.  The `locationid` is displayed on the SODA UI but the database column is actually called `objectid`.
- Learning how to query SoQL was all sorts of "fun".  You can use a `where` clause without a `select` until you do need a `select`.  The inconsistency may drive one wild.
- On the frontend side of things, it was a pretty standard experience.  I typically do better when I have a UI design provided to me.

I do hope whomever views this enjoys reviewing it!  Ask me anything!
