In order to run the application, you should first generate https site keys:

```
sh ./generateSiteCertificate.sh
```
And start the application itself:
```
docker-compose up
```

To view it, you should open http://localhost

Don't forget to add `secrets/siteCertificate/root-ca.crt` to your keychain as a trusted root authority