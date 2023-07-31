FROM openjdk:11-jdk AS builder
ENV DB_USERNAME=chufamily11
ENV DB_PASSWORD=gmbefamily11!
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .
COPY src src
RUN chmod +x ./gradlew
RUN ./gradlew build

#FROM openjdk:11-jdk AS builder
#COPY gradlew .
#COPY gradle gradle
#COPY build.gradle .
#COPY settings.gradle .
#COPY src src
#RUN chmod +x ./gradlew
#RUN ./gradlew build

FROM openjdk:11-jdk
ENV DB_USERNAME=chufamily11
ENV DB_PASSWORD=gmbefamily11!
COPY ./mylastkey.p12 /mylastkey.p12
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app.jar"]