# Jon Graf's Food Truck Permit Lookup System Showcase
Systems architecture includes:
- Java Spring Boot REST APIs
- ReactJS Typescript UI

# Getting Started
Ensure you have Docker installed.
1. Run `docker-compose up`

# URLs
Backend documentation: http://localhost:8080/swagger-ui/index.html
Frontend UI: http://localhost:3000

# 📖 Generate API via Swagger Schema
`brew install swagger-codegen`

`rm -rf src/swagger-codegen && swagger-codegen generate -i http://localhost:8080/api-docs -l typescript-axios -o src/swagger-codegen`

