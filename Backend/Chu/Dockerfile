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


#FROM openjdk:11-jdk AS builder
#COPY gradlew .
#COPY gradle gradle
#COPY build.gradle .
#COPY settings.gradle .
#COPY src src
#RUN chmod +x ./gradlew
#RUN ./gradlew build

#FROM openjdk:11-jdk
#COPY --from=builder build/libs/*.jar app.jar
#EXPOSE 8081
#ENTRYPOINT ["java", "-jar", "/app.jar"]

#FROM openjdk:11-jdk
#COPY --from=builder build/libs/*.jar app.jar
#EXPOSE 8081
#ENTRYPOINT ["java", "-jar", "/app.jar"]

# 실행에 필요한 단계만을 처리하는 Dockerfile
FROM openjdk:11-jdk

# 빌드 단계에서 생성된 jar 파일을 복사합니다. (저장된 경로를 적절히 수정해주세요.)
COPY /path/to/your/artifact/directory/chu-backend.jar app.jar

# 포트를 노출합니다. (만약 사용하고자 하는 포트가 있다면 지정해주면 됩니다)
EXPOSE 8081

# 애플리케이션을 실행합니다. (실행 명령어는 여기에 맞게 수정해야 합니다)
CMD ["java", "-jar", "/app.jar"]