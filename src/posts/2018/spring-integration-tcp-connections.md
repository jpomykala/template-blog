---
path: "/spring-integration"
title: Spring Integration - sending TCP messages to IoT devices
image: "./img/spring-react.jpg"
excerpt: "My experience from connecting IoT M2M devices to AWS services and Spring application"
category: programming
tags: [java]
---

{% highlight java %}
@Bean
public MessageChannel inboundChannel() {
  return new DirectChannel();
}

@Bean
public MessageChannel outboundChannel() {
  return new DirectChannel();
}

@Bean
public AbstractServerConnectionFactory serverConnectionFactory() {
  TcpNetServerConnectionFactory factory = new TcpNetServerConnectionFactory(port);
  factory.setSoKeepAlive(true);
  factory.setSingleUse(false);
  return factory;
}

@Bean
public TcpReceivingChannelAdapter inboundChannelAdapter() {
  TcpReceivingChannelAdapter receivingChannelAdapter = new TcpReceivingChannelAdapter();
  receivingChannelAdapter.setConnectionFactory(serverConnectionFactory());
  receivingChannelAdapter.setOutputChannel(inboundChannel());
  return receivingChannelAdapter;
}


@Bean
@ServiceActivator(inputChannel = "outboundChannel")
public MessageHandler outboundClient() {
  TcpSendingMessageHandler sendingMessageHandler = new TcpSendingMessageHandler();
  sendingMessageHandler.setConnectionFactory(serverConnectionFactory());
  return sendingMessageHandler;
}
{% endhighlight %}
