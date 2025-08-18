# Fashion MNIST Frontend

An interactive Angular web application for classifying fashion images using AI, styled with TailwindCSS 4.

## Features

- Upload and classify images from the Fashion MNIST dataset
- Real-time predictions via REST API
- Responsive, modern UI with light/dark mode
- Built with Angular 19 and TailwindCSS 4

## Quality Assurance

The codebase has passed SonarQube scanner checks for code quality and maintainability.

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/achrafmataich/fashion_mnist_frontend.git
cd fashion_mnist_frontend
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

The project uses environment files for different modes: development, staging, and production.

- Copy `src/environments/environment.example.ts` to create your own environment files:

```sh
cp src/environments/environment.example.ts src/environments/environment.development.ts
cp src/environments/environment.example.ts src/environments/environment.staging.ts
cp src/environments/environment.example.ts src/environments/environment.production.ts
```

- Edit each file and set the correct API endpoints:

```ts
// src/environments/environment.development.ts
export const environment = {
  apiUrl: "http://localhost:8080/",
  predictEndpoint: "/prediction/predict/json",
};
```

Repeat for staging and production as needed.

### 4. Run the Application (Development)

```sh
npm start
```

The app will be available at [http://localhost:4200](http://localhost:4200).


## Building for Production or Staging

```sh
npm run build           # Production build
npm run build:staging   # Staging build
```

Output files will be in the `dist/` directory.


## Docker Deployment

### 1. Build Docker Image

First build the image with

```sh
docker build -t fashion-mnist-frontend .
```

Then run the container using this image

```sh
docker run -d --name fashion-mnist-frontend -p 80:80 --network fashion-mnist-network fashion-mnist-frontend
```

The app will be available at [http://localhost:80](http://localhost:80).


## Environment Management

- The `.gitignore` excludes your actual environment files (`environment.production.ts`, `environment.staging.ts`, `environment.development.ts`).
- Always use `environment.example.ts` as a template for your own configuration.


## Project Structure

- `src/app/` — Angular components and services
- `src/environments/` — Environment configuration files
- `src/styles.css` — Global Angular app styles
- `Dockerfile` — Docker build file
- `nginx.conf` — Nginx configuration for static hosting used in docker image

## Contributing

Feel free to open issues or submit pull requests!

## Author

<img src="https://avatars.githubusercontent.com/u/100163733?size=128" alt="Achraf MATAICH" width="64" height="64" style="border-radius: 50%;">

[Achraf MATAICH](https://github.com/achrafmataich) <achraf.mataich@outlook.com>
