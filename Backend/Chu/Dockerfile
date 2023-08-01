## Use an official OpenJDK runtime as a base image
#FROM openjdk:11-jdk
#
## /app 디렉토리 생성
#RUN mkdir /app
#RUN chmod +x ./gradlew
#RUN ./gradlew bootJAR
## 작업 디렉토리 설정
#WORKDIR /app
#
## Copy the application JAR file into the container
#COPY build/libs/*.jar app.jar
#
## Expose the port that the Spring Boot application listens on
#EXPOSE 8081
#
## Command to run the Spring Boot application
#CMD ["java", "-jar", "/app.jar"]


FROM openjdk:11-jdk AS builder
ENV DB_URL=${DB_URL}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew build

FROM openjdk:11-jdk
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app.jar"]