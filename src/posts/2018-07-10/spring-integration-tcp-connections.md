---
path: "/spring-integration"
title: Spring&nbsp;Integration - sending TCP messages to&nbsp;IoT&nbsp;devices
date: 2018-05-17
image: "./spring-react.jpg"
categories: [spring-framework, iot]
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
