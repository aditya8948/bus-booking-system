-- =============================================
-- Bus Booking System — Database Schema
-- =============================================

-- 1. Users Table
-- Stores user information (name and email).
CREATE TABLE Users (
    id    INT          PRIMARY KEY,
    name  VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL
);

-- 2. Buses Table
-- Stores information about available buses.
CREATE TABLE Buses (
    id             INT         PRIMARY KEY,
    busNumber      VARCHAR(50) NOT NULL,
    totalSeats     INT         NOT NULL,
    availableSeats INT         NOT NULL
);

-- 3. Bookings Table
-- Stores seat bookings.
CREATE TABLE Bookings (
    id         INT PRIMARY KEY,
    seatNumber INT NOT NULL
);

-- 4. Payments Table
-- Stores payment information.
CREATE TABLE Payments (
    id            INT            PRIMARY KEY,
    amountPaid    DECIMAL(10, 2) NOT NULL,
    paymentStatus VARCHAR(50)    NOT NULL
);
