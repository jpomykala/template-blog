---
path: "/build-java-11-applications-on-codebuild"
title: Java 11 - CodeBuild environment with Amazon ECR
date: 2018-12-07
image: "./img/pushing-to-ecr.png"
excerpt: "CodeBuild is AWS-hosted tool for building software applications"
category: programming
tags: [software-development, aws]
---


Since faster Java development by Oracle, every tool we use these days 
need to follow up for every Java release or just support only LTS versions like Amazon.
CodeBuild is AWS-hosted tool for building software applications and 3 months after stable 
Java 11 release still it does not support anything newer than Java 9. Time is up, now we will build 
our own build environment which will support Java 11 and Java 12 in future right after stable release.

#Requirements

- AWS CLI
- Docker
- Amazon ECR

We are going to need nothing special for this. AWS CLI with AWS account obliviously. Installed docker on 
our local machine to build image and some basic knowledge how docker works and how proper Dockerfile should looks like.
Basically we will create build environment which will be used during CodeBuild process using docker images.
After that we will push created image to Amazon ECR. ECR is container registry like docker hub but managed by Amazon.
Eventually we will use our image as build environment. 
Now it's time to start "fixing" CodeBuild.


#Build environment

First of all we need to should create our own `Dockerfile` with environment. 
I used official `maven` image from Docker Hub, we can choose there maven and Java version.
https://hub.docker.com/_/maven/
I added few environment variables and own `CMD` to show `mvn --version` on start instead running just `mvn`, 
because this leads to failing CodeBuild process.
```dockerfile{}
FROM maven:3.6-jdk-11
MAINTAINER Jakub Pomykała <hello@jpomykala.me>

ENV PATH                   $PATH:$JAVA_HOME/bin
ENV JAVA_OPTS              "-server -XX:+UseG1GC -XX:+UseStringDeduplication -XX:+OptimizeStringConcat -Dsun.net.inetaddr.ttl=60"
ENV HEAP_SPACE             "-Xms512m -Xmx2g"

CMD ["mvn", "--version"]
```

# Pushing to ECR

Now we can create new repository on [Amazon ECR](https://eu-west-1.console.aws.amazon.com/ecr/repositories?region=eu-west-1) 
with name `java11-codebuild-environemnt`.

Sign in to ECR with 
```bash{}
$(aws ecr get-login --no-include-email --<YOUR REGION>)
```

Build docker image with:
```bash{}
docker build -t java11-codebuild-environemnt .
``` 
and try to run it using:
```bash{}
docker run java11-codebuild-environemnt:latest
``` 
and ensure that maven displays installed version.

![mvn version](./img/docker-run-mvn.png)


If everything work as expected, we can tag and push our image to ECR service.

```bash{}
docker tag java11-codebuild-environment:latest <YOUR_ECR_URL>/java11-codebuild-environment:latest
docker push <YOUR_ECR_URL>/java11-codebuild-environment:latest
```

![pushing to ecr](./img/pushing-to-ecr.png)

Before we start using our container we need to setup proper access policy for CodeBuild service.
This need to be done using internal ECR policy management (not the standard AWS roles/policies!)
`Amazon ECR > Repositories > Permissions > Edit policy JSON`

```json{}
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CodeBuildAccess",
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer"
      ]
    }
  ]
}
```

![pushing to ecr](./img/ecr-permissions.png)


We allow the CodeBuild service to get docker images, download them and check their availability.

# CodeBuild configuration
The last step is to configure CodeBuild environment, like bellow.

![pushing to ecr](./img/codebuild-environment.png)

And here we go! We can finally use latest Java features and push it to the production right away!
Next version is scheduled to March 2019, so we will go through this steps again but on `Dockerfile` 
we will just change `maven:3.6-jdk-11` to `maven:3.6-jdk-12`. Even now we can do this because we can find docker images
with beta releases of Java 12. 
