package controllers

import (
	"go_auth/database"
	"go_auth/models"
	"strconv"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret"

func Register(c *fiber.Ctx) error {
	// create var data to get the data from the request
	var data map[string]string

	// parse the data from the request to the var data
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// genereted the password
	password, _ := bcrypt.GenerateFromPassword([]byte(data["password"]), 14)

	// create the user
	user := models.User{
		Name:     data["name"],
		Email:    data["email"],
		Password: password,
	}

	database.DB.Create(&user)

	return c.JSON(user)
}

func Login(c *fiber.Ctx) error {
	var data map[string]string

	// parse the data from the request to the var data
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	var user models.User

	// find the user by email
	database.DB.Where("email = ?", data["email"]).First(&user)

	if user.Id == 0 {
		c.Status(fiber.StatusNotFound)
		return c.JSON(fiber.Map{
			"message": "user not found",
		})
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"])); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "incorrect password",
		})
	}

	// create the jwt token
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer: strconv.Itoa(int(user.Id)),
		// create expires time in 24 hours or 1 day
		ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
	})

	token, err := claims.SignedString([]byte(SecretKey))

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not login",
		})
	}

	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}

	c.Cookie(&cookie)

	return c.JSON(fiber.Map{
		"message": "success",
	})
}

func User(c *fiber.Ctx) error {

	// first, extract the jwt token from the cookie

	// get the cookie from the request
	cookie := c.Cookies("jwt")

	// parse the token
	token, error := jwt.ParseWithClaims(cookie, &jwt.StandardClaims{}, func(t *jwt.Token) (interface{}, error) {
		// returning interface = []byte(SecretKey) and error = nil
		return []byte(SecretKey), nil
	})

	if error != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"message": "unauthenticated",
		})
	}

	// get the claims from the token
	claims := token.Claims.(*jwt.StandardClaims)

	// get the user from the database
	var user models.User
	database.DB.Where("id = ?", claims.Issuer).First(&user)

	return c.JSON(user)

}

func Logout(c *fiber.Ctx) error {
	// delete the cookie
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}

	// return to response
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}
