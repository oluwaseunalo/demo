## Events Creation and Registration

This repository allows event creators to create events and view all registered events from events participants.

### Run Locally

Clone the project

```bash
  git clone https://github.com/oluwaseunalo/docuwaretask.git
```

Go to the project directory

```bash
  cd docuwaretask
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Create Docker Image

```bash
   docker build -t app .
```

Run Docker Container

```bash
    docker run -p 3001:3000 app
```

### Running Tests

To run tests, run the following command

```bash
  npm run test
```

### Tech Stack

Next.js, Prisma, Typescript, MySQL
