---
path: "/websocket-authentication"
title: Authenticated websocket connection with Spring Boot and ReactJS
date: 2017-02-17
image: "./img/spring-react.jpg"
excerpt: "One of many ways to secure websocket endpoints in Spring application and ReactJS client [outdated]"
category: programming
tags: [java, javascript, software-development, spring-framework]
---

Websockets are an easy way to update data on clients side without making request to server where there is no new data. 
It gives "wow effect" for clients and lower server costs for you.

## Server side - Spring Framework
We will start from adding proper dependency in `pom.xml` on backend side. In my case it latest stable version was `2.0.2.RELEASE`.

```xml{}
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```
    
Basic websockets configuration in Spring is easy as copy-paste configuration files and handle connection on client side.
Create new configuration class annotated with `@Configuration` and `@EnableWebSocketMessageBroker` and extend it with 
``AbstractWebSocketMessageBrokerConfigurer``.


```java{}{}
@Autowired
private ThreadPoolTaskScheduler threadPoolTaskScheduler;

@Override
public void configureMessageBroker(MessageBrokerRegistry config) {
  config
      .enableSimpleBroker("/queue")
      .setTaskScheduler(threadPoolTaskScheduler);
}

@Override
public void registerStompEndpoints(StompEndpointRegistry registry) {
  registry
      .addEndpoint("/ws")
      .setAllowedOrigins(ALLOWED_ORIGINS)
      .withSockJS()
      .setTaskScheduler(threadPoolTaskScheduler);
}
```

Remember to provide ```TaskScheduler``` which is required to sending messages. 
In above example I also configured CORS by using list of allowed origins from ```*.yml``` configuration.

## Support for websocket authentication
Unfortunelty as far as I know Spring websockets does not support authentication, so we need to implement it on our own. 
I came up with very simple idea, I'm authenticating user on ``SessionSubscribeEvent``.

```java{}
@EventListener(SessionSubscribeEvent.class)
public void onWebSocketSessionsConnected(SessionSubscribeEvent event) {
  Message<byte[]> eventMessage = event.getMessage();
  String token = getAuthorizationToken(eventMessage);
  // Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  // do whatever you need with user, throw exception if user should not be connected
  // ...
}

private String getAuthorizationToken(Message<byte[]> message) {
  StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);

  List<String> authorization = Optional.of(headerAccessor)
      .map($ -> $.getNativeHeader(WebSocketHttpHeaders.AUTHORIZATION))
      .orElse(Collections.emptyList());
  // if header does not exists returns null instead empty list 😳 /r/mildlyinfuriating

  return authorization.stream()
      .findFirst()
      .orElseThrow(() -> new IllegalArgumentException("Missing access token in Stomp message headers"));
}
```


Now we are ready to send data to connected clients! In my application I'm using application events
to send updates with ease to connected companies from any place in code. 
In my case I'm sending update to dashboard page on every new transaction for company.
Every user subscribe his company message channel and get update on every transaction or alert if occurred.

```java{}
@Autowired
private SimpMessagingTemplate webSocket;
	
@EventListener(UpdateDashboardRequestEvent.class)
public void onClientUpdate(UpdateDashboardRequestEvent request) {
  String companyName = request.getCompanyName();
  log.info("Sending dashboard update to {}", companyName);
  List<String> connectedCompanies = connectedUsersService.getConnectedCompanies();
  // when user/companies successfully connects to server I add him to list of connected users/companies
  
  boolean isConnected = connectedCompanies.contains(companyName);

  if (!isConnected) {
    log.warn("Company is not on connection list");
    return;
  }
  String companyDestinationUrl = "/queue/" + updateForCompany + "/company";
  Response response = ... 
  //response will be converted using message converters like on regular class annotated with @RestController
  webSocket.convertAndSend(companyDestinationUrl, response);
}
```





## Client side - ReactJS 

On client side I'm using two additional depedencies, one for sockJs and second for webstomp of course.

[https://github.com/sockjs/sockjs-client](https://github.com/sockjs/sockjs-client) 

[https://github.com/JSteunou/webstomp-client](https://github.com/JSteunou/webstomp-client)

```java{}
import React from "react";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";

// types of Props & State

class Dashboard extends React.Component<Props, State> {
  subscribeUpdates = () => {
    const {companyName} = this.props;
    this.topicSubscription = this.client.subscribe(
        `/queue/${companyName}/company`, this.onUpdate,
        {Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`},
    );
  };

  connectSocket = () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    //pure accessToken without 'Bearer' part
    const sockjs = new SockJS(
        `${process.env.REACT_APP_API_URL}/ws`, null,
        { headers: {Authorization: `Bearer ${token}` }},
    );
    this.client = webstomp.over(sockjs, { debug: false });
    this.client.connect({Authorization: `Bearer ${token}`}, this.subscribeUpdates);
  };

  componentDidMount() {
    this.connectSocket();
  }
  
  onUpdate = ({body = "{}"}) => {
    const message = JSON.parse(body)
    // do whatever you want, eg. setState to update view
  }
```


## Conclusions

And we are done. Below is an example how it looks like in my application. 
In terminal we see logs from the server for test demo company with few vending machines. 
Every time machine sold a product data are send to our server and then transaction is 
validated and eventualy inserted to database. In the end I'm sending event 
``UpdateDashboardRequestEvent`` to update dashboard.
