package com.awsbasics.simpleapp.service;

import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.SdkBytes;
import software.amazon.awssdk.services.lambda.LambdaClient;
import software.amazon.awssdk.services.lambda.model.InvokeRequest;
import software.amazon.awssdk.services.lambda.model.InvokeResponse;

@Service
public class LambdaInvokerService {

    private final LambdaClient lambdaClient = LambdaClient.builder()
            .region(software.amazon.awssdk.regions.Region.US_EAST_2) // Replace with your region
            .build();

    public String invokeLambda(String payload) {
        InvokeRequest request = InvokeRequest.builder()
                .functionName("serverless-DataConsistencyFunctionTrue")
                .payload(SdkBytes.fromUtf8String(payload))
                .build();

        InvokeResponse response = lambdaClient.invoke(request);

        return response.payload().asUtf8String();
    }
}
