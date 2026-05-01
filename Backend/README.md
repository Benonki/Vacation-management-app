# Vacation Management App

A vacation leave request system — Spring Boot backend with PostgreSQL.

## Requirements

- Java 25
- Maven
- Docker Desktop

---

## Running during development

Run only the database in Docker and start the application from IntelliJ.

**1. Start PostgreSQL:**
```bash
docker-compose up postgres
```

**2. Start the application from IntelliJ:**

Click the green **Run** button on `VacationManagementApplication`.

**3. Open Swagger:**
```
http://localhost:8080/swagger
```
## Running everything in Docker

Builds and starts both the application and the database in containers.

**1. Run:**
```bash
docker-compose up --build
```

**2. Open Swagger:**
```
http://localhost:8080/swagger
```

## Stopping

```bash
# Stop containers
docker-compose down

# Stop and remove database data
docker-compose down -v
```

## Tech stack

- Java 25 / Spring Boot
- Spring Security + JWT
- Spring Data JPA + Hibernate
- PostgreSQL
- Docker / Docker Compose
- Swagger (springdoc-openapi)