package com.chu.openvidu;

import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class OpenViduTokenGenerator {

    public static String generateToken(String openViduUrl, String openViduSecret, String sessionId, String role) throws IOException {
        String url = openViduUrl + "/api/sessions/" + sessionId + "/connection";

        HttpClient httpClient = HttpClientBuilder.create().build();
        HttpPost httpPost = new HttpPost(url);
        httpPost.setHeader("Authorization", "Basic " + java.util.Base64.getEncoder().encodeToString(("OPENVIDUAPP:" + openViduSecret).getBytes()));
        httpPost.setHeader("Content-Type", "application/json");

        JSONObject requestBody = new JSONObject();
        requestBody.put("role", role);

        StringEntity params = new StringEntity(requestBody.toString());
        httpPost.setEntity(params);

        HttpResponse response = httpClient.execute(httpPost);

        if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(response.getEntity().getContent()));
            StringBuilder result = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                result.append(line);
            }

            JSONObject jsonResponse = new JSONObject(result.toString());
            return jsonResponse.getString("token");
        } else {
            throw new IOException("Failed to generate user token");
        }
    }

    public static void main(String[] args) {
        String openViduUrl = "https://your-openvidu-server-url";
        String openViduSecret = "your-openvidu-secret";
        String sessionId = "your-session-id";
        String role = "publisher"; // or "subscriber" depending on the user's role

        try {
            String userToken = generateToken(openViduUrl, openViduSecret, sessionId, role);
            System.out.println("User Token: " + userToken);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}