<img src="assets/svg/api_logo.svg" width="280">

# Description

This repository contains the **backend API** for Mabell Application.

The backend API serves as the foundation for both the client and admin applications, handling user authentication, music content management, playlists, and real-time data processing. The architecture follows the **hexagonal architecture** to ensure scalability, maintainability, and clear separation of concerns.

## Features

- 🔒 **User Authentication**: JWT token-based authentication ensures secure access for both users and admins.
- 🎶 **Music Content Management**: CRUD operations for managing tracks, albums, and playlists, including uploading and editing music metadata.
- 🎧 **Playlist Management**: Create, modify, and delete playlists for users.
- 🔍 **Search Engine**: **Typesense** provides fast and efficient full-text search for music tracks and albums.
- 💾 **Caching**: **Redis** is used to cache frequently accessed data, improving performance and reducing database load.
- 📊 **Real-Time Analytics**: Track user interactions and monitor active users,

## Technologies Used

- **NestJS**: A Node.js framework for building scalable and maintainable server-side applications. It uses decorators and provides a modular system for easy scalability.
- **TypeScript**: A statically typed superset of JavaScript that enhances the maintainability and scalability of the codebase.
- **MongoDB**: A NoSQL database that stores music data, user information, playlists, and more. It is highly scalable and flexible.
- **Redis**: In-memory data store used for caching frequently accessed data, improving performance and reducing database load.
- **Typesense**: A fast, typo-tolerant search engine that provides real-time, full-text search capabilities for tracks, albums, and other music content.
- **JWT (JSON Web Tokens)**: Secure token-based authentication method for managing user and admin access. JWTs are used to authenticate API requests.
- **Mongoose**: A MongoDB object modeling tool that provides a schema-based solution to model application data.
- **Swagger**: API documentation tool used to generate interactive API docs, allowing developers to understand and test endpoints easily.
- **Docker**: Containerization tool used for isolating the application environment and ensuring consistent deployment across different environments.

## License

This code is provided for demonstration purposes only. It is not intended for production use or redistribution. All rights reserved. The code is shared for educational and personal review purposes.
