/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Jasmine__________ Student ID: 101594232_______ Date: 21-01-2025___________
* Vercel Link: web422-gilt.vercel.app__________________________________
********************************************************************************/
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const MoviesDB = require("./modules/moviesDB");

const app = express();
const db = new MoviesDB(); // Instantiate MoviesDB class
const HTTP_PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database connection and start server
db.initialize(process.env.MONGODB_CONN_STRING)
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Failed to initialize the database: ${err.message}`);
  });

// Routes
app.get("/",(req, res) => {
  res.json( {message: "API LISTENING"});
});

// POST /api/movies - Add a new movie
app.post("/api/movies", async (req, res) => {
  try {
    const newMovie = await db.addNewMovie(req.body);
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/movies - Get all movies (with optional filters)
app.get("/api/movies", async (req, res) => {
  const { page, perPage, title } = req.query;
  try {
    const movies = await db.getAllMovies(page, perPage, title);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/movies/:id - Get movie by ID
app.get("/api/movies/:id", async (req, res) => {
  try {
    const movie = await db.getMovieById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/movies/:id - Update a movie by ID
app.put("/api/movies/:id", async (req, res) => {
  try {
    const updated = await db.updateMovieById(req.body, req.params.id);
    if (updated.modifiedCount > 0) {
      res.status(204).send(); // Success, no content
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/movies/:id - Delete a movie by ID
app.delete("/api/movies/:id", async (req, res) => {
  try {
    const deleted = await db.deleteMovieById(req.params.id);
    if (deleted.deletedCount > 0) {
      res.status(204).send(); // Success, no content
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Catch-all route for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
