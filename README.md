# Scratchup
Rest-API made with NodeJs that has a single endpoint to get information about clinics.


## Author

- [@Mathss18](https://github.com/Mathss18)


## Stacks

**Back-end:** Node, Express, Node-cache, Nginx, Jest and Typescript

**Devops:** Docker and docker-compose


## Instalation

The API was made using docker and docker-compose
- (Docker version 20.10.21)
- (Docker Compose version v2.13.0)

Clone the project
```bash
 git clone https://github.com/Mathss18/scratchpay
```

Go to the scratchpay folder
```bash
  cd scratchpay
```

Create `.env` from `.env.example`
```bash
  cp .env.example .env
```

Build the project with Docker
```bash
  docker-compose up --build -d
```

- If everything is up, you now can make a POST request to:  http://localhost/api/clinics
## API Docs

####  Cache Configuration

You can enable cache for request by changing values in the .env file

####  Rate Limit Configuration

You can set the rate limit for requests by changing values in the .env file

####  Retrieve all clinics

```http
  POST /api/clinics
```

| Param   | Type       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Optional** |
| `state` | `string` | **Optional** |
| `from` | `string` | **Optional** |
| `to` | `string` | **Optional** |

**PS: When filtering using `from` and `to`, make sure to send both params in the request, in order to get all clinics that fit between the time provided**




## Screenshots

**Load Tests when cache is enabled**
![App Screenshot](https://i.imgur.com/lAZhJ1G.png)

###

**Tests Coverage**
![App Screenshot](https://i.imgur.com/YBhAsVi.png)

