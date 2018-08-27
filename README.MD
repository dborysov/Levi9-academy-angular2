In order to run the application, you should first generate https site keys:

```
sh ./generateSecrets.sh
```
And start the application itself:
```
docker-compose up --build
```

To view it, you should open http://localhost

Don't forget to add `secrets/siteCertificate/root-ca.crt` to your keychain as a trusted root authority