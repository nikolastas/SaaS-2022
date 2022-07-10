# Super helpfull for certificates on http
Basicly the 2 certificates on CA.pem and localhost.key MUST NOT have the same Common name when creating them so we have to change the certificates for the ftp api to work over https.
## Codes for certificates just in case:
- cert folder: ```sass```

## Read:

1. https://stackoverflow.com/questions/69322515/calling-url-with-self-signed-cert-from-node-js-depth-zero-self-signed-cert
2. https://www.section.io/engineering-education/how-to-get-ssl-https-for-localhost/
3. https://www.smashingmagazine.com/2017/06/guide-switching-http-https/
