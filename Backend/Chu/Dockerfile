FROM openjdk:11-jdk AS builder
ENV PUBLIC_IP=13.125.135.111
#ENV DB_URL=jdbc:mysql://$PUBLIC_IP:3306/chu?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8
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
COPY --from=builder build/libs/*.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "/app.jar"]