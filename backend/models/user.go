package models

// create user model with struct
type User struct {
	// jika memasang json:"" maka field akan menampilkan response sesuai dari nama jsonnya
	Id    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email" gorm:"unique"`
	// jika memasang json:"-" maka field tidak akan ditampilkan saat mengambil data dari database
	Password []byte `json:"-"`
}
