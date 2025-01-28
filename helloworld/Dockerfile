# Dockerfile

# Use the official GCC image (includes g++ for C++ development)
FROM gcc:latest

# Set working directory
WORKDIR /app

# Copy the C++ source code to the container
COPY hello.cpp .

# Compile the C++ program
RUN g++ -o hello hello.cpp

# Set the default command to run the compiled program
CMD ["./hello"]
