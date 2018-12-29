# Generate self-signed ssl certificate

```shell
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

You will be prompt will some generate questions as follows:
```shell
Generating a 2048 bit RSA private key
.............................................................+++
...........................................................................................................+++
writing new private key to 'key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) []:GB
State or Province Name (full name) []:England
Locality Name (eg, city) []:London
Organization Name (eg, company) []:Ayrbox
Organizational Unit Name (eg, section) []:Ayrbox
Common Name (eg, fully qualified host name) []:localhost
Email Address []:test@hotmail.com
```

Following file will be generated:
1. `key.pem`
2. `cert.pem`
