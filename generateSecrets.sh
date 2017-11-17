rm -rf ./secrets

mkdir secrets && cd secrets
openssl rand -hex -out "jwt.key" 512

mkdir siteCertificate && cd siteCertificate

openssl dhparam -out "dhparam.pem" 2048

openssl genrsa -out "root-ca.key" 4096
openssl req \
    -new -key "root-ca.key" \
    -out "root-ca.csr" -sha256 \
    -subj '/C=NL/L=Amsterdam/O=Dee inc./CN=Testing SSL'

touch root-ca.cnf
echo "[root_ca]" >> root-ca.cnf
echo "basicConstraints = critical,CA:TRUE,pathlen:1" >> root-ca.cnf
echo "keyUsage = critical, nonRepudiation, cRLSign, keyCertSign" >> root-ca.cnf
echo "subjectKeyIdentifier=hash" >> root-ca.cnf
openssl x509 -req  -days 3650  -in "root-ca.csr" \
    -signkey "root-ca.key" -sha256 -out "root-ca.crt" \
    -extfile "root-ca.cnf" -extensions \
    root_ca

openssl genrsa -out "site.key" 4096
openssl req -new -key "site.key" -out "site.csr" -sha256 \
    -subj '/C=NL/L=Amsterdam/O=Dee inc./CN=localhost'
touch site.cnf
echo "[server]" >> site.cnf
echo "authorityKeyIdentifier=keyid,issuer" >> site.cnf
echo "basicConstraints = critical,CA:FALSE" >> site.cnf
echo "extendedKeyUsage=serverAuth" >> site.cnf
echo "keyUsage = critical, digitalSignature, keyEncipherment" >> site.cnf
echo "subjectAltName = DNS:localhost, IP:127.0.0.1" >> site.cnf
echo "subjectKeyIdentifier=hash" >> site.cnf
openssl x509 -req -days 750 -in "site.csr" -sha256 \
    -CA "root-ca.crt" -CAkey "root-ca.key"  -CAcreateserial \
    -out "site.crt" -extfile "site.cnf" -extensions server
