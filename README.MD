In order to run the application, you should first generate https site keys:

```
cd secrets && sh ./generateSiteCertificate.sh
```
And start the application itself:
```
docker-compose up
```

To view it, you should open http://localhost