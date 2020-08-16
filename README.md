# Face Detector/Matcher
![Face Detector](https://github.com/shabbir-sj/face-detector/tree/master/src/assets/images/app_image.png)
## **[Click me for Live Demos!](https://shabbir-sj.github.io/face-detector/)**

# Instructions to start project:

Go to project folder where package.json stay


### Install node and npm:

verify you have stable version of node and npm installed. 


### Project Setup:

- Install all project dependencies, which are required for our project.

```
npm install
```

### Start development server:

```
npm run start.
```

### Make final build:

For production (live):

```
npm run build
```

Above build commands create a new folder ``dist``.


# Instructions to use Applicaiton:

### 1. Upload Your Passport size photo:

- It will detect face and show the square frame arround it. 
- it also show score near frame, it is probability score on the likelihood that the image contains human face.

### 2. Upload your selfie through webcam:

- Here you need to align your face in green frame, and need to click on 'Take photo'.
- It also detect the face and show confidence score.

### 3. If above two steps done then:
- A result card will be shown, which contain information whether two faces are similar or not.
- Here a match score will be shown which is Euclidean distance between two faces.
