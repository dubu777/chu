# Use an official OpenJDK runtime as a base image
FROM openjdk:11-jdk

# /app 디렉토리 생성
RUN mkdir /app

# 작업 디렉토리 설정
WORKDIR /app

# Copy the application JAR file into the container
COPY target/Chu.jar /app/Chu.jar

# Expose the port that the Spring Boot application listens on
EXPOSE 8081

# Command to run the Spring Boot application
CMD ["java", "-jar", "Chu.jar"]
