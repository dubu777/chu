FROM adoptopenjdk/openjdk11
ENV PUBLIC_IP=13.124.89.62
ENV DB_USERNAME=chufamily11
ENV DB_PASSWORD=gmbefamily11!
ENV SSL_KEY_PATH=
ENV SSL_PASSWORD=love
COPY ./keystore.p12 /keystore.p12
COPY ./Chu-0.0.1-SNAPSHOT.jar /Chu-0.0.1-SNAPSHOT.jar
CMD ["java", "-jar", "Chu-0.0.1-SNAPSHOT.jar"]
