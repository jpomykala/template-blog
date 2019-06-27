---
title: Start your blog journey with this template
date: 2019-06-26
image: "./header.jpg"
excerpt: "Developer blog? See this post"
tags: [software-development, programming]
---

I orignaly made this template for my self, so you can be sure I put as much love I can have to made it easy to use, beatiful, well configured.


# Template features

- Good SEO configuration
- Markdown
- CSS and SCSS 
- Optimized images
- Code support


## Technicals

#### How to start with this template?

- Type in terminal `npm run develop`, and that's it!

#### How to publish my blog?

- Run `npm run build` and copy the `build` directory

# Stack

- Markdown
- GatsbyJS
- CSS and SCSS 
- Code support

## Requirements

- 30 minutes of time to write a blog post
- Good template, like this one

Nullam ut ipsum nec augue ultricies porttitor. Vivamus et nunc placerat, sodales justo cursus, tempor sem. Nulla at nunc condimentum, ullamcorper ipsum quis, interdum odio. In maximus suscipit lacus at placerat. Vestibulum accumsan sollicitudin libero ut viverra. Cras quis orci sem. Quisque pharetra tortor rhoncus maximus vulputate. Curabitur nec arcu facilisis ligula pulvinar placerat at eget quam. Etiam quam massa, maximus vitae mattis sed, mollis at risus.

## What do you need a blog?
- I don't know
- Give me money for this template, because I don't need it


## Code? No problemo!

```dockerfile{}
FROM maven:3.6-jdk-11
MAINTAINER Jakub Pomykała <hello@jpomykala.me>

ENV PATH                   $PATH:$JAVA_HOME/bin
ENV JAVA_OPTS              "-server -XX:+UseG1GC -XX:+UseStringDeduplication -XX:+OptimizeStringConcat -Dsun.net.inetaddr.ttl=60"
ENV HEAP_SPACE             "-Xms512m -Xmx2g"

CMD ["mvn", "--version"]
```

First of all we need to should create our own `Dockerfile` with environment. 
I used official `maven` image from Docker Hub, we can choose there maven and Java version.
https://hub.docker.com/_/maven/
I added few environment variables and own `CMD` to show `mvn --version` on start instead running just `mvn`, 
because this leads to failing CodeBuild process.

![products](./example-image.jpg)


Ut luctus auctor elementum. Quisque nunc lorem, commodo sit amet massa convallis, tempus pellentesque velit. Suspendisse aliquam, nulla eu tempor vestibulum, nisl dui lobortis turpis, et viverra odio lacus et leo. Vivamus mollis efficitur viverra. Nam neque mi, finibus rhoncus pellentesque non, convallis eu nisi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed ultrices interdum imperdiet. Phasellus pharetra enim ac elementum fringilla. Aliquam ac efficitur ex, eget molestie nisl. Nunc vitae ligula tincidunt, varius nulla at, tempor lacus. Suspendisse risus ligula, pretium nec elementum eget, pellentesque non tortor.



