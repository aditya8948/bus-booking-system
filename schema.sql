-- Bus Booking System — Database Schema
CREATE TABLE Users (
    id    INT          PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL
);

CREATE TABLE Buses (
    id             INT         PRIMARY KEY,
    busNumber      VARCHAR(50) NOT NULL,
    totalSeats     INT         NOT NULL,
    availableSeats INT         NOT NULL
);

CREATE TABLE Bookings (
    id         INT PRIMARY KEY,
    seatNumber INT NOT NULL
);


CREATE TABLE Payments (
    id            INT            PRIMARY KEY,
    amountPaid    DECIMAL(10, 2) NOT NULL,
    paymentStatus VARCHAR(50)    NOT NULL
);
