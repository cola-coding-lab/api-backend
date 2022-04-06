# VCL API - Documentation

> TODO: Update Documentation!


temporary api configuration on staging server:
```apacheconf
<VirtualHost *:80>
	ServerAdmin web@rigbit.at
	DocumentRoot /home/vcl/html
	Servername vcl-api.rigbit.at

	AssignUserId vcl vcl

	ErrorLog /home/vcl/logs/api_error.log
	CustomLog /home/vcl/logs/api_access.log combined

	ProxyPass / http://127.0.0.1:8065/ timeout=600
	ProxyPassReverse / http://127.0.0.1:8065/
	<Proxy *>
		Order deny,allow
		Allow from all
		ProxyPreserveHost On
	</Proxy>
</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet
```

see also [vclapi.service](../systemd/vclapi.service).
