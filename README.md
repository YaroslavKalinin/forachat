# ForaChat
### Test task chat application
Clone repository and go to containing folder.
Run:
```sh
$ npm install
```
### Dev mode
**Ensure that your mongodb server is running and ports 3000 and 19006 are not in use.**
First of all, run server dev:
```sh
$ npm run dev-server:unix
```
Then start client:
```sh
$ npm run dev-client:unix
```
### Usage
After authentication you will be redirected to your home user room with unique id.
You are a broadcaster there and multiple users can join you by following that link.
You can also go others rooms and start chatting.
### Additional task

The switch additional task run:
```sh
$ git checkout webrtc
```
Then start previous npm scripts.
```sh
$ npm run dev-server:unix
$ npm run dev-client:unix
```
Now all broadcasters are able to stream.
### Bugs on webrtc
- When new participant joined, broadcaster needs to refresh page to reconnect peer.