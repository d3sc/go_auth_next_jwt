FROM golang:1.24-alpine3.20 AS builder

WORKDIR /app

COPY . .

RUN go get -d -v ./...

RUN go build -o go_auth .

EXPOSE 8000

CMD ["./go_auth"]