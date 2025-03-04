package main

import (
	"go_auth/database"
	"go_auth/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	// connect to database
	database.Connect()

	// create a new fiber app
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
		AllowOrigins:     "http://localhost:3000",
	}))

	// setup routes
	routes.Setup(app)

	app.Listen(":8000")
}
