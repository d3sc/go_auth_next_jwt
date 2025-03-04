package database

import (
	"go_auth/models"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {
	// connect to database
	//* after dockerize, change the connection (localhost:3306) to (db_mysql:3306)
	//* db_mysql is a service name in docker-compose.yml
	connection, err := gorm.Open(mysql.Open("root:rootroot@tcp(db_mysql:3306)/go_auth"), &gorm.Config{})

	// if connection failed
	if err != nil {
		panic("could not connect to the database")
	}

	// assign connection to DB
	DB = connection

	// migrate user model to database
	connection.AutoMigrate(&models.User{})
}
